import { Text, View } from "react-native";

import QueueFeed from "../../components/expandedPlayer/queue/queueFeed";

export default function QueuePage() {
  return (
    <View style={{ flex: 1, padding: 8 }}>
      <Text>Up Next</Text>
      <QueueFeed />
    </View>
  );
}
