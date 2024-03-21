import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  Text,
  View,
} from "react-native";

import { FlashList } from "@shopify/flash-list";
import { Link } from "expo-router";
import { useGetPrograms } from "../../../services/omnyApiRequests";

export default function Podcasts() {
  const { isPending, error, data } = useGetPrograms();

  if (isPending) {
    return <ActivityIndicator size="large" />;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      <FlashList
        data={data}
        keyExtractor={(item) => item.Id}
        estimatedItemSize={37}
        renderItem={({ item }) => (
          <Link
            href={{
              pathname: `/${item.Name}`,
              params: { Name: item.Name, Id: item.Id },
            }}
            asChild
          >
            <Pressable>
              <Text>{item.Name}</Text>
            </Pressable>
          </Link>
        )}
      />
    </View>
  );
}
