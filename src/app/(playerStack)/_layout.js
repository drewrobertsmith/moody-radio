import { Stack, Tabs } from "expo-router";

export default function PlayerStackLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="expandedPlayer" options={{ headerShown: false }} />
      <Tabs.Screen name="queuePage" options={{ headerShown: false }} />
    </Tabs>
  );
}
