import { Platform, SafeAreaView, StatusBar, StyleSheet } from "react-native";

export default function SafeArea() {
  return <SafeAreaView style={styles.safeArea} />;
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
