//formats the duration
export function formatDuration(durationSeconds) {
  const hours = Math.floor(durationSeconds / 3600);
  const minutes = Math.floor((durationSeconds % 3600) / 60);
  const seconds = Math.floor(durationSeconds);

  let formattedDuration = "";
  if (hours > 0) {
    formattedDuration += `${hours}h `;
  }
  if (minutes > 0) {
    formattedDuration += `${minutes}m`;
  }
  if (minutes <= 0) {
    formattedDuration += `${seconds}s`;
  }
  return formattedDuration;
}

//formats the date
export function formatDate(publishedUtc) {
  const date = new Date(publishedUtc);
  const options = { month: "long", day: "numeric" };
  const currentYear = new Date().getFullYear();

  if (date.getFullYear() === currentYear) {
    return date.toLocaleDateString("en-US", options);
  } else {
    return date.toLocaleDateString("en-US", { ...options, year: "numeric" });
  }
}

//formats that season and episode
export function formatSeasonAndEpisode(seasonNumber, episodeNumber) {
  return seasonNumber && episodeNumber
    ? `S${seasonNumber} E${episodeNumber} - `
    : "";
}

export function formatEpisodeType(episodeType) {
  return episodeType && episodeType === "Trailer" ? "Trailer - " : null;
}
