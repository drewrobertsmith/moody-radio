import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";

import RenderHTML from "react-native-render-html";
import { useGetClipById } from "../../../../services/omnyApiRequests";
import { useLocalSearchParams } from "expo-router";

export default function EpisodePage() {
  const { clipId } = useLocalSearchParams();
  const clipsQuery = useGetClipById(clipId);
  const window = useWindowDimensions();

  if (clipsQuery.isPending) {
    return <ActivityIndicator size="large" />;
  } else if (clipsQuery.error) {
    return <Text>Error: {error.message}</Text>;
  } else {
    return (
      <View>
        <RenderHTML
          contentWidth={window.width}
          source={{ html: clipsQuery.data.DescriptionHtml }}
          baseStyle={styles.description}
          tagsStyles={tagsStyles}
        />
      </View>
    );
  }
}
const tagsStyles = {
  a: {
    color: "#74a433",
  },
};

const styles = StyleSheet.create({
  description: {
    padding: 8,
  },
});