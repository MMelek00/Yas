import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { SearchBox } from "../index";

test("make sure that search box has it props ", () => {
  const onChangeTextMock = jest.fn();
  const { getByTestId } = render(<SearchBox placeholder="Search" onChangeText={onChangeTextMock} value={"rick"} />);
  const props = getByTestId("SearchBox").props;
  expect(props).toEqual(
    expect.objectContaining({
      placeholder: "Search",
      value: "rick",
      onChangeText: onChangeTextMock,
    }),
  );
  fireEvent.changeText(getByTestId("SearchBox"), "rick");

  expect(onChangeTextMock).toHaveBeenCalled();
  expect(onChangeTextMock).toHaveBeenCalledWith("rick");
});

test("make sure that search box onChangeText has been called with right value", () => {
  const onChangeTextMock = jest.fn();
  const { getByTestId } = render(<SearchBox onChangeText={onChangeTextMock} />);

  fireEvent.changeText(getByTestId("SearchBox"), "rick");

  expect(onChangeTextMock).toHaveBeenCalled();
  expect(onChangeTextMock).toHaveBeenCalledWith("rick");
});
