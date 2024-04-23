import { Button, Image, StyleSheet, Text, View } from "react-native";

import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";

export default function PodcastPageHeaderInfo({ programQuery }) {
  const [numberOfLines, setNumberOfLines] = useState(2);

  return (
    <View>
      <Image
        style={styles.programImage}
        source={{ uri: programQuery.data?.ArtworkUrl }}
      />
      {/* <AntDesign name="download" size={24} color="black" onPress={() => {}} /> */}
      <Text style={styles.programTitle}>{programQuery.data?.Name}</Text>

      <Text
        style={styles.programDescription}
        numberOfLines={numberOfLines}
        ellipsizeMode="tail"
        onPress={()=>{
          numberOfLines != 2 ? setNumberOfLines(2) : setNumberOfLines(0)
        }}
      >
        {programQuery.data?.Description}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  programImage: {
    resizeMode: "contain",
    height: 200,
  },
  programTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  programDescription: {
    fontSize: 16,
  },
});
