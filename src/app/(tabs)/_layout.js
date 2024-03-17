import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "Stations",
        }}
      />
      <Tabs.Screen
        name="(stack)"
        options={{
          title: "Podcasts",
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
