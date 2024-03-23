import TrackPlayer, {
  AppKilledPlaybackBehavior,
  Capability,
  Event,
  RepeatMode,
} from "react-native-track-player";

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

export async function playTrack(item) {
  await TrackPlayer.load({
    id: item.Id,
    url: item.AudioUrl,
    title: item.Title,
    artist: item.ProgramSlug,
    artwork: item.ImageUrl,
  });
  await TrackPlayer.play();
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
