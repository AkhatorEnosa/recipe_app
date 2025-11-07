import { View, Text, Alert, FlatList, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useClerk, useUser } from '@clerk/clerk-expo'
import { API_URL } from "@/constants/api"
import { favoritesStyles } from "../../assets/styles/favourites.styles";
import LoadingSpinner from '@/components/LoadingSpinner';
import { COLORS } from '@/constants/colors';
import RecipeCard from '@/components/RecipeCard';
import { Ionicons } from '@expo/vector-icons';
import NoFavoritesFound from '@/components/NoFavoritesFound';
import { Recipe } from '@/constants/types';

const Favourites = () => {
  const { signOut } = useClerk();
  const { user } = useUser();
  // const { isLoading, setIsLoading } = useContext(AppContext)
  const [favourites, setFavourites] = useState([])
  const [loading, setLoading] = useState<boolean>(false)
  

  useEffect(() => {
    const loadFavourites = async () => {
      try {
        setLoading(true);
        const apiResponse = await fetch(`${API_URL}/favourites/${user?.id}`);

        if (!apiResponse.ok) throw new Error('Failed to fetch favourites')
        
        const favouritesData = await apiResponse.json();
        console.log(favouritesData)

        // transform the data to match the RecipeCard component's expected format
        const transformedFavorites = favouritesData.map((favourite: any) => ({
          ...favourite,
          id: favourite.recipeId,
        }));

        setFavourites(transformedFavorites);

      } catch (error) {
        console.log(`Error fetching favourites: ${user?.id}`, error);
        Alert.alert("Error", "Failed to load favourites");
      } finally {
        setLoading(false);
      }
    }

    loadFavourites()
  }, [user?.id])

  const handleSignOut = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      { text: "Logout", style: "destructive", onPress: () => signOut() },
    ]);
  };

if (loading) return <LoadingSpinner message="Loading your favorites..." />;

  return (
    <View style={favoritesStyles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={favoritesStyles.header}>
          <Text style={favoritesStyles.title}>Favorites</Text>
          <TouchableOpacity style={favoritesStyles.logoutButton} onPress={handleSignOut}>
            <Ionicons name="log-out-outline" size={22} color={COLORS.text} />
          </TouchableOpacity>
        </View>

        <View style={favoritesStyles.recipesSection}>
          <FlatList
            data={favourites}
            renderItem={({ item }: {item: Recipe}) => <RecipeCard recipe={item} />}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            columnWrapperStyle={favoritesStyles.row}
            contentContainerStyle={favoritesStyles.recipesGrid}
            scrollEnabled={false}
            ListEmptyComponent={<NoFavoritesFound />}
          />
        </View>
      </ScrollView>
    </View>
  );
}

export default Favourites