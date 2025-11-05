import LoadingSpinner from '@/components/LoadingSpinner';
import { COLORS } from '@/constants/colors';
import { AppContext } from '@/context/AppContext';
import { useAuth } from '@clerk/clerk-expo'
import { Ionicons } from '@expo/vector-icons';
import { Redirect, Tabs } from 'expo-router'
import { useContext, useEffect } from 'react';

const TabsLayout = () => {
  const { isSignedIn, isLoaded } = useAuth();
  const { isLoading, setIsLoading } = useContext(AppContext)

  useEffect(() => {
    if (!isLoaded) {
      setIsLoading(true)
    } else {
      setIsLoading(false)
    }
  }, [isLoaded, setIsLoading]);

  // render spinner component if clerk instance is not loaded 
  if(isLoading) return <LoadingSpinner message="Loading App..." />

  if (!isSignedIn) return <Redirect href="/(auth)/sign-in" />

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarStyle: {
          backgroundColor: COLORS.white,
          borderTopColor: COLORS.border,
          borderTopWidth: 1,
          height: 60,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600'
        },
      }}
    >
      <Tabs.Screen
        name='index'
        options={{
          title: "Recipes",
          tabBarIcon: ({ color, size }) => <Ionicons name="restaurant-outline" size={size} color={color} /> 
        }} />
      <Tabs.Screen
        name='search'
        options={{
          title: "Search",
          tabBarIcon: ({ color, size }) => <Ionicons name="search" size={size} color={color} /> 
        }} />
      <Tabs.Screen
        name='favourites'
        options={{
          title: "Favourites",
          tabBarIcon: ({ color, size }) => <Ionicons name="heart" size={size} color={color} /> 
        }} />
    </Tabs>
  )
}

export default TabsLayout