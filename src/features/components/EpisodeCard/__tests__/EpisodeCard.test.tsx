import React from "react";
import { render } from "@testing-library/react-native";
import { EpisodeCard } from "..";

test("make sure EpisodeCard to  display name and air_date", () => {
  const { getByText } = render(<EpisodeCard name="TestName" air_date="TestDate" index={0} />);
  expect(getByText("TestName")).not.toBeNull();
  expect(getByText("TestDate")).not.toBeNull();
});
