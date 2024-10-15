import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';

import TextField from '../shared/TextField';

import { useForm } from 'react-hook-form';

interface MovieFilterProps {
  onChange: (text: string) => void;
  value?: string;
}

const MovieFilter: React.FC<MovieFilterProps> = ({ onChange, value }) => {
  return (
    <View style={styles.container}>
      <TextField
        placeholder="Search"
        keyboardType="web-search"
        onChangeText={(text) => {
          if (typeof onChange === 'function') {
            onChange(text);
          }
        }}
        value={value}
        clearButtonMode="while-editing"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#F4F4F4',
  },
});
export default MovieFilter;
