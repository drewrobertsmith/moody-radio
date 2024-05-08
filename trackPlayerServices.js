import TrackPlayer, {
  AppKilledPlaybackBehavior,
  Capability,
  Event,
  RepeatMode,
  useActiveTrack,
  useIsPlaying,
} from "react-native-track-player";

import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function setupPlayer() {
  let isSetup = false;
  try {
    await TrackPlayer.getActiveTrack();
    isSetup = true;
  } catch {
    await TrackPlayer
      .setupPlayer
      //minBuffer: 15  //Minimum time in seconds that needs to be buffered -> 15 (android), automatic (ios)
      //maxBuffer: 50 //Maximum time in seconds that needs to be buffered -> android only
      //playBuffer: 2.5 //Minimum time in seconds that needs to be buffered to start playing -> android only
      //backBuffer: 0 //Time in seconds that should be kept in the buffer behind the current playhead time. -> android only
      //maxCacheSize: 0 //Maximum cache size in kilobytes	 -> android only
      ();
    await TrackPlayer.updateOptions({
      android: {
        appKilledPlaybackBehavior:
          AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification,
      },
      capabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
        Capability.SeekTo,
      ],
      compactCapabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.JumpForward,
        Capability.JumpBackward,
      ],
      progressUpdateEventInterval: 1,
    });

    isSetup = true;
  } finally {
    return isSetup;
  }
}

export async function addTracks() {
  await TrackPlayer.add([]);
  await TrackPlayer.setRepeatMode(RepeatMode.Off);
}

export async function handleQueueItemSelection(index, refetch) {
  await TrackPlayer.skip(index); //skips to selected track in queue,
  await TrackPlayer.move(index, 0); //moves selected track to top position
  await TrackPlayer.play(); //begins playing slected track
  refetch; //trigger a useQuery refresh to refresh the view
}

export async function handlePlayButtonPress(item, isPlaying, activeTrack) {
  if (activeTrack?.id === item.Id && isPlaying.playing === true) {
    await TrackPlayer.pause();
  } else if (activeTrack?.id === item.Id && isPlaying.playing === false) {
    await TrackPlayer.play();
  } else {
    handleAudioPlayback("playButton", item);
  }
}

//function to deal with handling incoming audio, be it from a play button or a queue button and where it ends up in the queue position
export async function handleAudioPlayback(playbackAction, item) {
  const queue = await TrackPlayer.getQueue();
  const trackIndex = queue.findIndex((track) => track.id === item.Id); // "0" means track is in queue, "-1" means track is not in queue

  //this is the track object for any new tracks
  const trackObject = {
    id: item.Id,
    url: item.AudioUrl,
    title: item.Title,
    artist: item.ProgramSlug,
    artwork: item.ImageUrl,
    date: item.PublishedUtc,
    duration: item.DurationSeconds,
  };

  //if track is not in queue & playback initiated from playbutton
  if (trackIndex === -1 && playbackAction === "playButton") {
    await TrackPlayer.add(trackObject, 0); //adds track to first position in queue
    await TrackPlayer.skip(0); //skip to first position in queue
    await TrackPlayer.play(); //play track
  }
  //if track is already in queue and action is play
  else if (trackIndex === 0 && playbackAction === "playButton") {
    await TrackPlayer.skip(trackIndex); //skip to track in queue
    await TrackPlayer.move(trackIndex, 0); //move track item to first position
    await TrackPlayer.play(); //play track
  }
  //if not in queue and queue button pressed
  else if (trackIndex === -1 && playbackAction === "addToQueueButton") {
    await TrackPlayer.add(trackObject); //adds track to the queue in the last position
  }
  //if track is already in queue and action is queue
  else if (trackIndex === 0 && playbackAction === "addToQueueButton") {
    Alert.alert("Episode is already in the queue!");
  }
  return trackIndex;
}

// export const storePlaybackData = async (trackObject) => {
//   try {
//     const jsonValue = JSON.stringify(trackObject);
//     await AsyncStorage.setItem(`${trackObject.id}`, jsonValue);
//     console.log(`${trackObject.id} saved`);
//   } catch (e) {
//     console.error(e);
//   }
// };

// const logAsyncStorage = async () => {
//   const keys = await AsyncStorage.getAllKeys();
//   keys.forEach(async (key) => {
//     const value = await AsyncStorage.getItem(key);
//     //console.log(`Key: ${key}, Value: ${value}`);
//   });
// };
// logAsyncStorage();

// const clearAll = async () => {
//   try {
//     await AsyncStorage.clear()
//   } catch(e) {
//     console.error(e);
//   }
//   console.log("AsyncStorage Cleared");
// }
// clearAll();

const mergePlaybackData = async (trackObject) => {
  const jsonValue = JSON.stringify(trackObject);
  await AsyncStorage.mergeItem(`${trackObject.id}`, jsonValue);
  const updatedTrack = await AsyncStorage.getItem(`${trackObject.id}`);
  //console.log("new an updated track ", updatedTrack);
};

// const getStoredPlaybackData = async () => {
//   try {
//     const jsonValue = await AsyncStorage.getItem(/*`${trackObject.id}`*/ "cd1fafc1-b429-438b-85ae-af7b0183b12b");
//     return jsonValue != null ? JSON.parse(jsonValue) : null;
//   } catch (e) {
//     console.error(e);
//   }
// };

export async function playbackService() {
  //these are remote events to listen to from places where the ui IS NOT MOUNTED: android auto, lockscreen, notifications, bluetooth headset etc
  TrackPlayer.addEventListener(Event.RemotePause, () => {
    console.log("Event.RemotePause");
    TrackPlayer.pause();
  });

  TrackPlayer.addEventListener(Event.RemotePlay, () => {
    console.log("Event.RemotePlay");
    TrackPlayer.play();
  });

  TrackPlayer.addEventListener(Event.RemoteJumpForward, () => {
    console.log("Event.RemoteJumpForward");
    TrackPlayer.seekBy(30);
  });
  TrackPlayer.addEventListener(Event.RemoteJumpBackward, () => {
    console.log("Event.RemoteJumpBackward");
    TrackPlayer.seekBy(-30);
  });

  TrackPlayer.addEventListener(Event.RemotePrevious, () => {
    console.log("Event.RemotePrevious");
    TrackPlayer.skipToPrevious();
  });
  TrackPlayer.addEventListener(
    Event.PlaybackProgressUpdated,
    async (playbackProgress) => {
      // console.log(
      //   "Position: ",
      //   playbackProgress.position,
      //   "Duration: ",
      //   playbackProgress.duration,
      //   "Track: ",
      //   playbackProgress.track
      // );
      //await mergePlaybackData(playbackProgress.position);
    }
  );

  TrackPlayer.addEventListener(
    Event.PlaybackActiveTrackChanged,
    async (activeTrack) => {
      // console.log(
      //   "last Track",
      //   activeTrack.lastIndex,
      //   activeTrack.lastTrack,
      //   activeTrack.lastPosition
      // );
      //console.log("current Track", activeTrack.index, activeTrack.track);
      //await storePlaybackData(activeTrack.track);
    }
  );
}
