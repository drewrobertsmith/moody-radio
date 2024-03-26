import {
  ActivityIndicator,
  Button,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { FlashList, MasonryFlashList } from "@shopify/flash-list";

import { Link } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { useGetPrograms } from "../../../services/omnyApiRequests";
import { useState } from "react";

export default function Podcasts() {
  const { isPending, error, data } = useGetPrograms();
  const window = useWindowDimensions();
  const [view, setView] = useState("list");

  if (isPending) {
    return <ActivityIndicator size="large" />;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  const PodcastListItem = ({ item }) => {
    return (
      <Link
        href={{
          pathname: `/${item.Name}`,
          params: { Name: item.Name, Id: item.Id },
        }}
        asChild
      >
        <Pressable>
          <View style={styles.listItemContainer}>
            <Image source={{ uri: item.ArtworkUrl }} width={50} height={50} />
            <Text style={styles.title}>{item.Name}</Text>
          </View>
        </Pressable>
      </Link>
    );
  };

  const PodcastMasonryItem = ({ item }) => {
    return (
      <Link
        href={{
          pathname: `/${item.Name}`,
          params: { Name: item.Name, Id: item.Id },
        }}
        asChild
      >
        <Pressable>
          <View>
            <Image
              source={{ uri: item.ArtworkUrl }}
              width={window.width / 4}
              height={window.width / 4}
            />
          </View>
        </Pressable>
      </Link>
    );
  };

  const handleButtonPress = () => {
    setView(view === "list" ? "images" : "list");
  };

  return (
    <View style={{ flex: 1 }}>
      <MaterialIcons
        name={view === "list" ? "view-module" : "view-list"}
        size={32}
        color="black"
        onPress={handleButtonPress}
        style={{
          alignSelf: "flex-end",
          marginRight: 8,
        }}
      />
      {view === "list" ? (
        <FlashList
          data={data}
          keyExtractor={(item) => item.Id}
          estimatedItemSize={58}
          renderItem={({ item }) => <PodcastListItem item={item} />}
          contentContainerStyle={styles.podcastFeedContainer}
        />
      ) : (
        <MasonryFlashList
          data={data}
          numColumns={4}
          keyExtractor={(item) => item.Id}
          renderItem={({ item }) => <PodcastMasonryItem item={item} />}
          estimatedItemSize={98}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    paddingLeft: 8,
  },
  podcastFeedContainer: {
    padding: 8,
  },
  listItemContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    padding: 4,
  },
});
