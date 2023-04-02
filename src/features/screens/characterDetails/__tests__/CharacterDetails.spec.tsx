import React from "react";
import { MockedProvider } from "@apollo/client/testing";
import { FETCH_CHARACTER_DETAILS } from "../../../../services/network/Query";
import { render, cleanup, waitFor } from "@testing-library/react-native";
import { CharacterDetails } from "..";

const mockedNavigate = jest.fn();

jest.mock("@react-navigation/native", () => {
  const actualNav = jest.requireActual("@react-navigation/native");
  return {
    ...actualNav,
    useNavigation: () => ({
      goBack: mockedNavigate,
    }),
    useRoute: () => ({
      params: {
        id: 173,
      },
    }),
  };
});
describe("CharacterDetails", () => {
  afterEach(cleanup);
  it("should render and loading when no data", async () => {
    const { queryByTestId } = render(
      <MockedProvider addTypename={false} mocks={[]}>
        <CharacterDetails />
      </MockedProvider>,
    );
    const loading = queryByTestId("Loading");
    expect(loading).toBeTruthy();
  });
  it("should render the Details when whe loading is false", async () => {
    const { queryByTestId } = render(
      <MockedProvider addTypename={false} mocks={mock}>
        <CharacterDetails />
      </MockedProvider>,
    );
    await waitFor(() => {
      const detailsNode = queryByTestId("details-header");
      expect(detailsNode).toBeTruthy();
    });
  });
  it("should render the FlatList should have one item", async () => {
    const { queryByTestId } = render(
      <MockedProvider addTypename={false} mocks={mock}>
        <CharacterDetails />
      </MockedProvider>,
    );
    await waitFor(() => {
      const listNode = queryByTestId("flat-list");
      expect(listNode?.children).toHaveLength(1);
    });
  });
  //TODO: more test should be added
});

const mock = [
  {
    request: {
      query: FETCH_CHARACTER_DETAILS,
      variables: {
        id: 173,
      },
    },
    result: {
      data: {
        character: {
          __typename: "Character",
          episode: [
            [
              {
                __typename: "Episode",
                air_date: "August 27, 2017",
                episode: "S03E06",
                id: "27",
                name: "Rest and Ricklaxation",
              },
            ],
          ],
          gender: "Female",
          id: "170",
          image: "https://rickandmortyapi.com/api/character/avatar/170.jpeg",
          name: "Jacqueline",
          species: "Human",
          status: "Alive",
        },
      },
    },
  },
];
