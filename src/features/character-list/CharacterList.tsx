import * as React from "react";
import { View, Text, StyleSheet } from "react-native";

interface CharacterListProps {}

export const CharacterList: React.FC<CharacterListProps> = () => {
  return (
    <View style={styles.container}>
      <Text>CharacterList</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
