import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

import axios from "axios";

const BASE_URL = "https://api.omny.fm";
const ORG_ID = "a8cdbf10-d816-4c77-9e79-aa1c012547e1";
const URL = `${BASE_URL}/orgs/${ORG_ID}/programs`;

export function useGetPrograms() {
  return useQuery({
    queryKey: ["allPrograms"],
    queryFn: async () => {
      try {
        const response = await axios.get(URL);
        const networkFilteredPrograms = response.data.Programs.filter(
          (n) => n.Network === "Moody Radio"
          );
          console.log("Get programs query ran");
          return networkFilteredPrograms;
      } catch (err) {
        console.error(err);
        throw err;
      }
    },
  });
}

export function useGetProgramById(Id) {
  return useQuery({
    queryKey: ["programById", Id],
    queryFn: async () => {
      try {
        console.log("getProgramsById ran");
        const response = await axios.get(URL + `/${Id}`);
        return response.data;
      } catch (err) {
        console.error(err.toJSON());
        throw err;
      }
    },
  });
}

export function useGetClipsByProgramId(Id) {
  return useQuery({
    queryKey: ["podcastEpisode", Id],
    queryFn: async () => {
      try {
        console.log("getClipsByProgramsById ran");
        const response = await axios.get(URL + `/${Id}/clips`);
        return response.data.Clips;
      } catch (err) {
        console.error(err.toJSON());
        throw err;
      }
    },
  });
}

export function useInfiniteGetClipsByProgram(Id) {
  return useInfiniteQuery({
    queryKey: ["podcastEpisodes", Id],
    queryFn: async ({ pageParam }) => {
      try {
        console.log("InfiniteGetClipsByProgramsById ran");
        const response = await axios.get(
          URL + `/${Id}/clips?cursor=${pageParam}&pageSize=5`
        );
        return response.data.Clips;
      } catch (err) {
        console.error(err.toJSON());
        throw err;
      }
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
  });
}

export function useGetClipById(clipId) {
  return useQuery({
    queryKey: ["clipById", clipId],
    queryFn: async () => {
      try {
        console.log("getClipsById ran");
        const response = await axios.get(
          `${BASE_URL}/orgs/${ORG_ID}/clips/${clipId}?includeProgramDetail=true`
        );
        return response.data;
      } catch (err) {
        console.error(err.toJSON());
        throw err;
      }
    },
  });
}
