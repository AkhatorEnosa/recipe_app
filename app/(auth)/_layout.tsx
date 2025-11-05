import { Redirect, Stack } from 'expo-router'
import { useAuth } from '@clerk/clerk-expo'
import { useContext, useEffect } from 'react';
import { AppContext } from '@/context/AppContext';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function AuthRoutesLayout() {
  const { isSignedIn, isLoaded } = useAuth()
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

  if (isSignedIn) {
    return <Redirect href={'/'} />
  }
  return <Stack screenOptions={{ headerShown: false }}/>
}