import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, FlatList, RefreshControl } from 'react-native'
import { MealAPI } from "../../services/mealApi.js";
import { homeStyles } from "../../assets/styles/home.styles.js"
import { COLORS } from '@/constants/colors.js';
import { Ionicons } from '@expo/vector-icons';
import CategoryFilter from '../../components/CategoryFilter';
import { Recipe } from '@/constants/types.js';
import RecipeCard from '@/components/RecipeCard';
import LoadingSpinner from '@/components/LoadingSpinner';

const HomeScreen = () => {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [categories, setCategories] = useState([]);
  const [featuredRecipe, setFeaturedRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadData = async () => {
    try {
      setLoading(true);

      const [apiCategories, randomMeals, featuredMeal] = await Promise.all([
        MealAPI.getCategories(),
        MealAPI.getRandomMeals(12),
        MealAPI.getRandomMeal(),
      ]);

      const transformedCategories = apiCategories.map(
        (cat: { strCategory: string; strCategoryThumb: string; strCategoryDescription: string }, index: number) => ({
          id: index + 1,
          name: cat.strCategory,
          image: cat.strCategoryThumb,
          description: cat.strCategoryDescription,
        })
      );

      setCategories(transformedCategories);

      if (!selectedCategory) setSelectedCategory(transformedCategories[0].name);

      const transformedMeals = randomMeals
        .map((meal: any) => MealAPI.transformMealData(meal))
        .filter((meal) => meal !== null);

      setRecipes(transformedMeals);

      const transformedFeatured = MealAPI.transformMealData(featuredMeal);
      setFeaturedRecipe(transformedFeatured);
    } catch (error) {
      console.log("Error loading the data", error);
    } finally {
      setLoading(false);
    }
  };

  const loadCategoryData = async (category: string) => {
    try {
      const meals = await MealAPI.filterByCategory(category);
      const transformedMeals = meals
        .map((meal : Recipe) => MealAPI.transformMealData(meal))
        .filter((meal : Recipe) => meal !== null);
      setRecipes(transformedMeals);
    } catch (error) {
      console.error("Error loading category data:", error);
      setRecipes([]);
    }
  };

  const handleCategorySelect = async (category: string) => {
    setSelectedCategory(category);
    await loadCategoryData(category);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    // await sleep(2000);
    await loadData();
    setRefreshing(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading && !refreshing) return <LoadingSpinner message="Loading recipes..." size='large'/>;

  return (
    <View style={ homeStyles.container }>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={ <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor={COLORS.primary}
        />}
        contentContainerStyle={ homeStyles.scrollContent}
      >
        {/* featured section  */}

        {
          featuredRecipe && (
            <View style={[homeStyles.featuredSection, {marginTop : 20}]}>
              <TouchableOpacity
                style={homeStyles.featuredCard}
                activeOpacity={0.9}
                onPress={() => router.push({ pathname: "/recipe/[id]", params: { id: featuredRecipe.id } })}
              >
                <View style={homeStyles.featuredImageContainer}>
                  <Image
                    source={{ uri: featuredRecipe.image }}
                    style={homeStyles.featuredImage}
                    resizeMode="cover"
                    transition={500}
                  />
                  <View style={homeStyles.featuredOverlay}>
                    <View style={homeStyles.featuredBadge}>
                      <Text style={homeStyles.featuredBadgeText}>Featured</Text>
                    </View>

                    <View style={homeStyles.featuredContent}>
                      <Text style={homeStyles.featuredTitle} numberOfLines={2}>
                        {featuredRecipe.title}
                      </Text>

                      <View style={homeStyles.featuredMeta}>
                        <View style={homeStyles.metaItem}>
                          <Ionicons name="time-outline" size={16} color={COLORS.white} />
                          <Text style={homeStyles.metaText}>{featuredRecipe.cookTime}</Text>
                        </View>
                        <View style={homeStyles.metaItem}>
                          <Ionicons name="people-outline" size={16} color={COLORS.white} />
                          <Text style={homeStyles.metaText}>{featuredRecipe.servings}</Text>
                        </View>
                        {featuredRecipe.area && (
                          <View style={homeStyles.metaItem}>
                            <Ionicons name="location-outline" size={16} color={COLORS.white} />
                            <Text style={homeStyles.metaText}>{featuredRecipe.area}</Text>
                          </View>
                        )}
                      </View>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          )
        }

        {
          categories.length > 0 && (
            <CategoryFilter
              categories={categories}
              selectedCategory={selectedCategory!}
              onSelectCategory={handleCategorySelect}
            />
          )
        }

        <View style={homeStyles.recipesSection}>
          <View style={homeStyles.sectionHeader}>
            <Text style={homeStyles.sectionTitle}>{selectedCategory}</Text>
          </View>


          {recipes.length > 0 ? (
            <FlatList
              data={recipes}
              renderItem={({ item }) => <RecipeCard recipe={item} />}
              keyExtractor={(item) => item.id.toString()}
              numColumns={2}
              columnWrapperStyle={homeStyles.row}
              contentContainerStyle={homeStyles.recipesGrid}
              scrollEnabled={false}
              // ListEmptyComponent={}
            />
          ) : (
            <View style={homeStyles.emptyState}>
              <Ionicons name="restaurant-outline" size={64} color={COLORS.primary} />
              <Text style={homeStyles.emptyTitle}>No recipes found</Text>
              <Text style={homeStyles.emptyDescription}>Try a different category</Text>
            </View>
          )}
        </View>
        
      </ScrollView>
    </View>
  )
}

export default HomeScreen