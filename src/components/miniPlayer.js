import { StyleSheet, Text, View } from "react-native";

import { BottomTabBar } from "@react-navigation/bottom-tabs";
import { useActiveTrack } from "react-native-track-player";

export default function MiniPlayer(props) {
  const activeTRack = useActiveTrack();
  console.log(activeTRack);
  
  return (
    <View style={styles.miniPlayerContainer}>
      
      
      <BottomTabBar {...props} />
    </View>
  );
}

const styles = StyleSheet.create({
  miniPlayerContainer: {
    backgroundColor: "tan",
  },
});
