import { View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import { MealAPI } from '@/services/mealApi'
import { searchStyles } from "../../assets/styles/search.styles.js"
import { Recipe } from '@/constants/types';
import { COLORS } from '@/constants/colors';
import { Ionicons } from '@expo/vector-icons';
import RecipeCard from '@/components/RecipeCard';
import LoadingSpinner from '@/components/LoadingSpinner';
import { useDebounce } from '@/hooks/useDebounce';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [recipes, setRecipes] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [initialLoading, setInitialLoading] = useState<boolean>(true);

  const debouncedQuery = useDebounce({ value: searchQuery, delay: 500 })

  const performSearch = async (query: string) => {
    // if no query provided 
    if (!query.trim()) {
      const randomMeals = await MealAPI.getRandomMeals(12);
      return randomMeals.map((meal) => MealAPI.transformMealData(meal))
      .filter((meal) => meal !== null)
    }

    // search using name first, if non, use ingredients 

    const searchByName = await MealAPI.searchMealsByName(query);
    let results = searchByName;

    if (results.length === 0) {
      const searchByIngredient = await MealAPI.filterByIngredient(query);
      results = searchByIngredient;
    }

    return results.map((meal: Recipe) => MealAPI.transformMealData(meal))
      .filter((meal: Recipe) => meal !== null)
      .slice(12)

  }

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const results = await performSearch("")
        setRecipes(results)
      } catch (error) {
        console.log("Error loading initial data", error)
      } finally {
        setInitialLoading(false)
      }
    }

    loadInitialData();
  }, [])

  useMemo(() => {
    if (initialLoading) return;

    const handleSearch = async () => {
      setLoading(true); 

      try {
        const results = await performSearch(debouncedQuery)
        setRecipes(results)
      } catch (error) {
        console.log("Error performing search", error) 
      } finally {
        setLoading(false);
      }
    }

    handleSearch();

  }, [debouncedQuery, initialLoading])

  if (initialLoading) return <LoadingSpinner message="Loading recipes..." />;

return (
    <View style={searchStyles.container}>
      <View style={searchStyles.searchSection}>
        <View style={searchStyles.searchContainer}>
          <Ionicons
            name="search"
            size={20}
            color={COLORS.textLight}
            style={searchStyles.searchIcon}
          />
          <TextInput
            style={searchStyles.searchInput}
            placeholder="Search recipes, ingredients..."
            placeholderTextColor={COLORS.textLight}
            value={searchQuery}
            onChangeText={setSearchQuery}
            returnKeyType="search"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery("")} style={searchStyles.clearButton}>
              <Ionicons name="close-circle" size={20} color={COLORS.textLight} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <View style={searchStyles.resultsSection}>
        <View style={searchStyles.resultsHeader}>
          <Text style={searchStyles.resultsTitle}>
            {searchQuery ? `Results for "${searchQuery}"` : "Popular Recipes"}
          </Text>
          <Text style={searchStyles.resultsCount}>{recipes.length} found</Text>
        </View>

        {loading ? (
          <View style={searchStyles.loadingContainer}>
            <LoadingSpinner message="Searching recipes..." size="small" />
          </View>
        ) : (
          <FlatList
            data={recipes}
            renderItem={({ item }) => <RecipeCard recipe={item} />}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            columnWrapperStyle={searchStyles.row}
            contentContainerStyle={searchStyles.recipesGrid}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={<NoResultsFound />}
          />
        )}
      </View>
    </View>
  );
}

export default Search;

function NoResultsFound() {
  return (
    <View style={searchStyles.emptyState}>
      <Ionicons name="search-outline" size={64} color={COLORS.textLight} />
      <Text style={searchStyles.emptyTitle}>No recipes found</Text>
      <Text style={searchStyles.emptyDescription}>
        Try adjusting your search or try different keywords
      </Text>
    </View>
  );
}