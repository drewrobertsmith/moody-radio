import { Platform, StatusBar, StyleSheet, Text, View } from "react-native";

import QueueFeed from "../../components/expandedPlayer/queue/queueFeed";

export default function QueuePage() {
  return (
    <View style={styles.container}>
      <Text>Up Next</Text>
      <QueueFeed />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
