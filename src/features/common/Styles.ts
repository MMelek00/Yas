import { StyleSheet } from "react-native";

export const COLORS = {
  white: "#FFF",
  offWhite: "#DFDFDF",
  gray: "#888",
  dark: "#222",
  black: "#000",
  green: "green",
  red: "red",
  orange: "orange",
  secondary: "#ffba5e",
};
export const STYLES = StyleSheet.create({
  container: {
    flex: 1,
  },
  separator: {
    borderTopWidth: 1,
    borderTopColor: COLORS.offWhite,
  },
  errorText: {
    alignSelf: "center",
    textAlign: "center",
    fontSize: 16,
    marginTop: 20,
  },
  shadow: {
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});

export const ACTIVE_OPACITY = 0.7;
