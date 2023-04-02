// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { AppStackParamsList } from "./AppStack";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends AppStackParamsList {}
  }
}
