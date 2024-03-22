import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";

import { AntDesign } from "@expo/vector-icons";
import PlayButton from "../../../../components/playButton";
import RenderHTML from "react-native-render-html";
import TrackPlayer from "react-native-track-player";
import { playTrack } from "../../../../../trackPlayerServices";
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
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <Image
            source={{ uri: clipsQuery.data.ImageUrl }}
            width={window.width}
            height={window.width}
          />
        </View>
        <View style={{ alignItems: "center", paddingTop: 8 }}>
          <Text>{clipsQuery.data.Title}</Text>
          <Text>{clipsQuery.data.Program.Name} </Text>
          <View style={{ paddingTop: 8 }}>
            <PlayButton item={clipsQuery.data}/>
          </View>
        </View>
        <RenderHTML
          contentWidth={window.width}
          source={{ html: clipsQuery.data.DescriptionHtml }}
          baseStyle={styles.description}
          tagsStyles={tagsStyles}
        />
      </ScrollView>
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
