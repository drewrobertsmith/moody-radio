import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { Stack } from "expo-router";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";

export default function AppLayout() {
  const queryClient = new QueryClient({
    defaultOptions: {
      cacheTime: 1000 * 60 * 60 * 24, // 24 hours
    },
  });
  const asyncStoragePersister = createAsyncStoragePersister({
    storage: AsyncStorage,
  });

  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister: asyncStoragePersister }}
    >
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="(playerStack)"
          options={{ presentation: "modal", headerShown: false }}
        />
      </Stack>
    </PersistQueryClientProvider>
  );
}
