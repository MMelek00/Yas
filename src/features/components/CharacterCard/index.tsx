import React from "react";
import { Text, TouchableOpacity, Image } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import { Character } from "../../../services/network/Types";
import { ACTIVE_OPACITY, COLORS } from "../../common";
import styles from "./styles";

interface CharacterCardProps {
  character: Character;
  onPress: () => void;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ character, onPress }: CharacterCardProps) => {
  return (
    <TouchableOpacity testID="CharacterCard" style={styles.card} activeOpacity={ACTIVE_OPACITY} onPress={onPress}>
      <Image testID="ImageCard" source={{ uri: character.image }} style={styles.image} />
      <Text style={styles.name} numberOfLines={2}>
        {character.name}
      </Text>
      <Icon testID="IconCard" name="arrowright" size={25} style={styles.icon} color={COLORS.gray} />
    </TouchableOpacity>
  );
};

export { CharacterCard };
