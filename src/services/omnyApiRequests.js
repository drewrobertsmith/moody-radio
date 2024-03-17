import axios from "axios";
import { useQuery } from "@tanstack/react-query";

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
        return networkFilteredPrograms;
      } catch (err) {
        console.error(err.toJSON());
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
        const response = await axios.get(URL + `/${Id}/clips`);
        return response.data.Clips;
      } catch (err) {
        console.error(err.toJSON());
        throw err;
      }
    },
  });
}
