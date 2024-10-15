import React from 'react';
import DetailScreen from '@/src/screens/DetailScreen/DetailScreen';
import HomeScreen from '@/src/screens/HomeScreen/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import FavoritesScreen from '@/src/screens/FavoritesScreen/FavoritesScreen';

export type RootStackParamList = {
  Home: undefined;
  Detail: { id: number };
  Favorites: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export type HomeScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Home'
>;

export type DetailScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Detail'
>;

export type FavoritesScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Favorites'
>;

export const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Detail" component={DetailScreen} />
        <Stack.Screen name="Favorites" component={FavoritesScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
