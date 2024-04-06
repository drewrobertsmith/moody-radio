import { Button, Image, StyleSheet, Text, View } from "react-native";

export default function PodcastPageHeaderInfo({ programQuery }) {
  return (
    <View styles={styles.container}>
      <View>
        <Image
          style={styles.programImage}
          source={{ uri: programQuery.data.ArtworkUrl }}
        />
        <Button title="Subscribe" onPress={() => {}} />
      </View>
      <Text>{programQuery.data.Name}</Text>
      <Text>{programQuery.data.Description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  programImage: {
    resizeMode: "contain",
    height: 200,
    width: "100%",
    shadowColor: "blue",
    shadowOffset: {
      width: 16,
      height: 16,
    },
  },
});
