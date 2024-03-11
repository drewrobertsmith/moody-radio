import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import axios from "axios";

const BASE_URL = "https://api.omny.fm";
const ORG_ID = "a8cdbf10-d816-4c77-9e79-aa1c012547e1";

export default function Podcasts() {
  const { isPending, error, data } = useQuery({
    queryKey: ["allPrograms"],
    queryFn: async () => {
      try {
        const response = await axios.get(`${BASE_URL}/orgs/${ORG_ID}/programs`);
        const networkFilteredPrograms = response.data.Programs.filter(
          (n) => n.Network === "Moody Radio"
        );
        return networkFilteredPrograms;
      } catch (err) {
        console.error(err);
        throw err;
      }
    },
  });

  if (isPending) {
    return <ActivityIndicator size="large" />;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={data}
        renderItem={({ item }) => <Text>{item.Name}</Text>}
      />
    </View>
  );
}
