import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

import axios from "axios";

const BASE_URL = "https://api.omny.fm";
const ORG_ID = "/orgs/a8cdbf10-d816-4c77-9e79-aa1c012547e1";

const axiosInstance = axios.create({
  baseURL: BASE_URL + ORG_ID,
});

export function useGetPrograms() {
  return useQuery({
    queryKey: ["allPrograms"],
    queryFn: async () => {
      try {
        const response = await axiosInstance.get(`/programs`);
        const networkFilteredPrograms = response.data.Programs.filter(
          (n) => n.Network === "Moody Radio"
        );
        return networkFilteredPrograms;
      } catch (err) {
        console.error(err);
        throw err;
      }
    },
    retry: 3, // Retry up to 3 times
  });
}

export function useGetProgramById(Id) {
  return useQuery({
    queryKey: ["programById", Id],
    queryFn: async () => {
      try {
        const response = await axiosInstance.get(`/programs/${Id}`, {
          params: { Id },
        });
        return response.data;
      } catch (err) {
        console.error(err.toJSON());
        throw err;
      }
    },
    retry: 3, // Retry up to 3 times
  });
}

export function useInfiniteGetClipsByProgram(Id) {
  return useInfiniteQuery({
    queryKey: ["podcastEpisodes", Id],
    queryFn: async ({ pageParam }) => {
      try {
        const response = await axiosInstance.get(
          `/programs/${Id}/clips?cursor=${pageParam}&pageSize=10`,
          {
            params: { Id, pageParam },
          }
        );
        return response.data;
      } catch (err) {
        console.error(err.toJSON());
        throw err;
      }
    },
    retry: 3, // Retry up to 3 times
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === 0 ? null : allPages.length + 1;
    },
  });
}

export function useGetClipById(clipId) {
  return useQuery({
    queryKey: ["clipById", clipId],
    queryFn: async () => {
      try {
        const response = await axiosInstance.get(
          `/clips/${clipId}?includeProgramDetail=true`,
          {
            params: { clipId },
          }
        );
        return response.data;
      } catch (err) {
        console.error(err.toJSON());
        throw err;
      }
    },
    retry: 3, // Retry up to 3 times
  });
}
