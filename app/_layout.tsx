import SafeScreen from "@/components/SafeScreen";
import { ClerkProvider } from "@clerk/clerk-expo"
import { tokenCache } from '@clerk/clerk-expo/token-cache'
import { Slot } from "expo-router";
import { AppProvider } from "@/context/AppContext";

export default function RootLayout() {
  return (
    <ClerkProvider tokenCache={tokenCache}>
      <AppProvider>
        <SafeScreen>
          <Slot />
        </SafeScreen>
      </AppProvider>
    </ClerkProvider>
  )
}
