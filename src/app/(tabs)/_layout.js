import MiniPlayerContainer from "../../components/miniPlayer/miniPlayerContainer";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    /* Adding the Miniplayer component this way feels wrong but it works */
    <Tabs tabBar={(props) => <MiniPlayerContainer {...props} />}>
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
