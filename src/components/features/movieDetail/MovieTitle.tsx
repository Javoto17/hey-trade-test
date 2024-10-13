import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const MovieTitle: React.FC<{ title: string; tagline: string }> = ({
  title,
  tagline,
}) => (
  <View style={styles.titleSection}>
    <Text style={styles.title}>{title}</Text>
    {tagline ? <Text style={styles.tagline}>{tagline}</Text> : null}
  </View>
);

export default MovieTitle;

const styles = StyleSheet.create({
  titleSection: {
    padding: 16,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  tagline: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#666',
  },
});
