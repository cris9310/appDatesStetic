import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';

import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import '@/global.css';
import { useRouter } from 'expo-router';
import Toast from "react-native-toast-message";
import { SafeAreaProvider } from 'react-native-safe-area-context';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const router = useRouter();


  return (
    <SafeAreaProvider>
      <GluestackUIProvider >
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Stack screenOptions={{
            headerShown: false,
          }}>
            <Stack.Screen name="login" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="businessSelectionOwner" options={{ headerShown: false }} />
            <Stack.Screen name="adminBusinessOwnerPage/[id]" options={{ headerShown: false }} />
            <Stack.Screen name="formRegisterBusiness/formBusinessAll" options={{ headerShown: false }} />
            <Stack.Screen name="formCrud/formUpdateService" options={{ headerShown: false }} />
            <Stack.Screen name="formCrud/formCreateService" options={{ headerShown: false }} />
            <Stack.Screen name="formCrud/formCreateDateFull" options={{ headerShown: false }} />
            <Stack.Screen name="formCrud/formDeleteDate" options={{ headerShown: false }} />


            <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
          </Stack>
          <Toast position="top" topOffset={50} />
          <StatusBar style="auto" />
        </ThemeProvider>
      </GluestackUIProvider>
    </SafeAreaProvider>
  );
}
