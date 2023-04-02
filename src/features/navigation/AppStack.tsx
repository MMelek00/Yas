import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { CharacterList } from "../characterList";
import { CharacterDetails } from "../characterDetails";

export type AppStackParamsList = {
  CharacterList: undefined;
  CharacterDetails: {
    id: number | string;
    name: string;
  };
};

const Stack = createStackNavigator<AppStackParamsList>();

export const AppStack: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="CharacterList">
      <Stack.Screen name="CharacterList" component={CharacterList} />
      <Stack.Screen name="CharacterDetails" component={CharacterDetails} />
    </Stack.Navigator>
  );
};
