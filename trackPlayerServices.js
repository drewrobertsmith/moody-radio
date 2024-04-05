import TrackPlayer, {
  AppKilledPlaybackBehavior,
  Capability,
  Event,
  RepeatMode,
} from "react-native-track-player";

import { Alert } from "react-native";

export async function setupPlayer() {
  let isSetup = false;
  try {
    await TrackPlayer.getActiveTrack();
    isSetup = true;
  } catch {
    await TrackPlayer.setupPlayer();
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

//function to deal with handling incoming audio, be it from a play button or a queue button and where it ends up in the queue position
export async function handleAudioPlayback(playbackAction, item) {
  const queue = await TrackPlayer.getQueue();
  const trackIndex = queue.findIndex((track) => track.id === item.Id);

  //if track is not in queue & playback initiated from playbutton
  if (trackIndex === -1 && playbackAction === "playButton") {
    //adds track to first position in queue
    await TrackPlayer.add(
      {
        id: item.Id,
        url: item.AudioUrl,
        title: item.Title,
        artist: item.ProgramSlug,
        artwork: item.ImageUrl,
        date: item.PublishedUtc,
        duration: item.DurationSeconds,
      },
      0
    );
    await TrackPlayer.skip(0); //skip to frist position in queue
    await TrackPlayer.play(); //play track
    //if not in queue and queue button pressed
  } else if (trackIndex === -1 && playbackAction === "addToQueueButton") {
    //adds track to last position in queue
    await TrackPlayer.add({
      id: item.Id,
      url: item.AudioUrl,
      title: item.Title,
      artist: item.ProgramSlug,
      artwork: item.ImageUrl,
      date: item.PublishedUtc,
      duration: item.DurationSeconds,
    });
  } else if (trackIndex != -1 && playbackAction === "playButton") {
    //if track is already in queue
    await TrackPlayer.skip(trackIndex); //skip to track in queue
    await TrackPlayer.move(trackIndex, 0); //move track item to first position
    await TrackPlayer.play(); //play track
  } else if (trackIndex != -1 && playbackAction === "addToQueueButton") {
    Alert.alert("Episode is already in the queue!");
  }
}

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
  TrackPlayer.addEventListener(Event.PlaybackProgressUpdated, () => {
    console.log("Playback progress updated");
  });
  TrackPlayer.addEventListener(Event.PlaybackActiveTrackChanged, () => {
    console.log("Playback Active Tracked Changed");
  });
}
