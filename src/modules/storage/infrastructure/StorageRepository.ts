const APP_KEY = '@easybus';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { StorageRepository } from '../domain/StorageRepository';

export function generateStorageRepository(): StorageRepository {
  return {
    set: async (name, value) => {
      const keyItem = `${APP_KEY}-${name}`;
      try {
        await AsyncStorage.setItem(keyItem, JSON.stringify(value));
      } catch (e) {
        console.log(`Error on setting ${keyItem}`);
        return null;
      }
    },
    get: async (name) => {
      const keyItem = `${APP_KEY}-${name}`;

      try {
        const value = await AsyncStorage.getItem(keyItem);

        if (value !== null) {
          return JSON.parse(value);
        }

        return null;
      } catch (e) {
        console.log(`Error on setting ${keyItem}`);
        return null;
      }
    },
    delete: async (name): Promise<void> => {
      const keyItem = `${APP_KEY}-${name}`;
      try {
        await AsyncStorage.removeItem(keyItem);
      } catch (e) {
        console.log(`Error on setting ${keyItem}`);
      }
    },
  };
}
