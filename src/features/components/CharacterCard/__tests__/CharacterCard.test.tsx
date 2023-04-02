import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { CharacterCard } from "../index";

const testCharacter = { id: "5", name: "TestName", image: "image" };
describe("<CharacterCard>", () => {
  const onPressMock = jest.fn();
  const renderCard = () => {
    return render(<CharacterCard character={testCharacter} onPress={onPressMock} />);
  };
  test("make sure that CharacterCard has been rendered", async () => {
    const { getByText } = renderCard();
    expect(true).toBe(true);

    expect(getByText(testCharacter.name)).not.toBeNull();
  });
  test("make sure that CharacterCard has been called", () => {
    const { getByTestId } = renderCard();

    const card = getByTestId("CharacterCard");
    fireEvent.press(card);
    expect(onPressMock).toHaveBeenCalled();
  });
});
