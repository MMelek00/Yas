import React from "react";
import { render } from "@testing-library/react-native";
import { Row } from "..";

test("make sure to render title and value in Row", () => {
  const { getByText } = render(<Row title="Name" value="Rick" />);
  expect(getByText("Name")).not.toBeNull();
  expect(getByText("Rick")).not.toBeNull();
});
