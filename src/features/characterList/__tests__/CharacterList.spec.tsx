import { render, cleanup, waitFor } from "@testing-library/react-native";

import React from "react";
import { MockedProvider } from "@apollo/client/testing";
import { CharacterList } from "..";
import { FETCH_CHARACTERS } from "../../../services/network/Query";
const mockedNavigate = jest.fn();

jest.mock("@react-navigation/native", () => {
  const actualNav = jest.requireActual("@react-navigation/native");
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: mockedNavigate,
    }),
  };
});
describe("CharacterList", () => {
  afterEach(cleanup);
  it("should render and loading when no data", async () => {
    const { getByTestId } = render(
      <MockedProvider addTypename={false} mocks={[]}>
        <CharacterList />
      </MockedProvider>,
    );
    const loading = getByTestId("Loading");
    expect(loading).toBeTruthy();
  });
  it("should render the FlatList when whe loading is false", async () => {
    const { getByTestId } = render(
      <MockedProvider addTypename={false} mocks={[mock]}>
        <CharacterList />
      </MockedProvider>,
    );
    await waitFor(() => {
      const listNode = getByTestId("flat-list");
      expect(listNode).toBeTruthy();
    });
  });
  it("should render the FlatList should have one item", async () => {
    const { getByTestId } = render(
      <MockedProvider addTypename={false} mocks={[mock]}>
        <CharacterList />
      </MockedProvider>,
    );
    await waitFor(() => {
      const listNode = getByTestId("flat-list");
      expect(listNode.children).toHaveLength(1);
    });
  });
  //TODO: more test should be added
});

const mock = {
  request: {
    query: FETCH_CHARACTERS,
    variables: {
      page: 1,
    },
  },
  result: {
    data: {
      characters: {
        __typename: "Characters",
        results: [
          {
            id: "1",
            __typename: "Character",
            name: "Rick Sanchez",
            image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
            species: "Human",
          },
        ],
        info: [
          {
            next: 2,
            count: 33,
            pages: 1,
          },
        ],
      },
    },
  },
};
