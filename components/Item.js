import React from 'react';
import { StyleSheet,  Text, TouchableOpacity } from 'react-native';

export default function Item({ id, title, selected, onSelect }) {
  return (
    <TouchableOpacity
      onPress={() => onSelect(title)}
      style={[
        styles.listItem,
        { backgroundColor: selected ? '#fae5d3' : '#fffff' },
      ]}
    >
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
}


const styles = StyleSheet.create({
  listItem: {
    padding: 10,
    textAlign: 'center',
    borderStyle: 'solid',
    borderColor: '#d3d3d3',
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
  },
});
