import React from 'react';
import DetailScreen from '@/src/screens/DetailScreen/DetailScreen';
import HomeScreen from '@/src/screens/HomeScreen/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

export type RootStackParamList = {
  Home: undefined;
  Detail: { id: number };
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

export const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="Detail" component={DetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
