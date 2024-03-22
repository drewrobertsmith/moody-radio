import { StyleSheet, Text, View } from "react-native";

import { BottomTabBar } from "@react-navigation/bottom-tabs";

export default function MiniPlayer(props) {
  return (
    <View style={styles.miniPlayerContainer}>
      <Text>MiniPlayer</Text>
      <BottomTabBar {...props} />
    </View>
  );
}

const styles = StyleSheet.create({
  miniPlayerContainer: {
    backgroundColor: "red",
  },
});
