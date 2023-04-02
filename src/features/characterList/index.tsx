import React, { useEffect, useRef, useState } from "react";
import { View, Text, FlatList, ActivityIndicator, Platform, TouchableOpacity } from "react-native";
import { useLazyQuery } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import _ from "lodash";
import { FETCH_CHARACTERS } from "../../services/network/Query";
import { Character, CharactersQueryType } from "../../services/network/Types";
import styles from "./styles";
import { ACTIVE_OPACITY, COLORS, STRINGS, STYLES } from "../common";
import { errorHandler } from "../../utils";
import { CharacterCard, SearchBox } from "../components";
import Icon from "react-native-vector-icons/AntDesign";

export const CharacterList: React.FC = () => {
  const navigation = useNavigation();
  const flatListRef = useRef<any>();

  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [searchName, setSearchName] = useState<string>("");

  /** fetch characters query */
  const [getCharacters, { data, fetchMore, loading, error }] = useLazyQuery<CharactersQueryType>(FETCH_CHARACTERS, {
    variables: {
      page: 1,
    },
  });
  /** debounce search function used to call the query after 500ms  */
  const searchHandler: (value: string) => void = _.debounce(async (name: string) => {
    getCharacters({
      variables: {
        filter: {
          name: name,
        },
      },
    });
  }, 500);

  // fetch character at the beginning
  useEffect(() => {
    getCharacters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /** variables section */
  const queryData = data && data.characters;
  const showNoMoreMessage = queryData && !queryData.info.next && queryData.info.pages > 1;
  const characters = queryData ? queryData.results : null;
  const canLoadMore = queryData && queryData.info.next && !loadingMore;

  /** render footer (loading | no more message | nothing) */
  const renderFooter = () => {
    if (data && loadingMore) {
      return <ActivityIndicator style={styles.indicator} color={COLORS.secondary} />;
    } else if (showNoMoreMessage) {
      return (
        <View style={styles.noMoreContainer}>
          <Text style={styles.noMoreText}>{STRINGS.noMoreChars}</Text>
          <TouchableOpacity
            style={styles.upIcon}
            activeOpacity={ACTIVE_OPACITY}
            onPress={() => flatListRef.current.scrollToIndex({ index: 0 })}>
            <Icon name={"arrowup"} size={25} color={COLORS.black} />
          </TouchableOpacity>
        </View>
      );
    } else {
      return null;
    }
  };

  /** function used to load more characters * */
  const loadMoreHandler = async () => {
    if (canLoadMore && fetchMore) {
      setLoadingMore(true);
      await fetchMore({
        variables: {
          page: data?.characters.info.next,
        },
      });
      setLoadingMore(false);
    }
  };

  const onPressCharacter = (character: Character) => {
    navigation.navigate("CharacterDetails", {
      id: character.id,
      name: character.name,
    });
  };

  return (
    <>
      <SearchBox
        placeholder="Search"
        value={searchName}
        onChangeText={name => {
          setSearchName(name);
          searchHandler(name);
        }}
      />
      {loading && (
        <ActivityIndicator testID="Loading" color={COLORS.secondary} style={styles.indicator} size={"small"} />
      )}
      {error ? (
        <Text style={STYLES.errorText}>{errorHandler(error)}</Text>
      ) : (
        characters && (
          <FlatList
            ref={flatListRef}
            testID="flat-list"
            data={characters}
            renderItem={({ item }) => <CharacterCard character={item} onPress={() => onPressCharacter(item)} />}
            ItemSeparatorComponent={() => <View style={STYLES.separator} />}
            ListFooterComponent={renderFooter}
            contentContainerStyle={styles.list}
            keyExtractor={item => `${item.id}`}
            onEndReachedThreshold={Platform.OS === "ios" ? 0 : 0.2}
            onEndReached={loadMoreHandler}
          />
        )
      )}
    </>
  );
};
