import * as React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { Navigation } from '@/src/components/features/navigation/Navigation';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const Stack = createNativeStackNavigator();

export type RootStackParamList = {
  Home: undefined;
  Details: { id: number };
};

export type HomeScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Home'
>;

export type DetailsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Details'
>;

function App() {
  const queryClient = new QueryClient();

  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <Navigation />
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}

export default App;
