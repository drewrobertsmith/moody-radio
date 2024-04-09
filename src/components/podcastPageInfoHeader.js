import { Button, Image, StyleSheet, Text, View } from "react-native";

import { AntDesign } from "@expo/vector-icons";

export default function PodcastPageHeaderInfo({ programQuery }) {
  return (
    <View styles={styles.container}>
      <View>
        <Image
          style={styles.programImage}
          source={{ uri: programQuery.data.ArtworkUrl }}
        />
        {/* <AntDesign name="download" size={24} color="black" onPress={() => {}} /> */}
      </View>
      <Text>{programQuery.data.Name}</Text>
      <Text>{programQuery.data.Description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  programImage: {
    resizeMode: "contain",
    height: 150,
    width: "100%",
  },
});
