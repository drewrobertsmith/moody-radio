import MiniPlayer from "../../components/miniPlayer";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs tabBar={(props) => <MiniPlayer {...props} />}>
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
