import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Stack } from "expo-router";

export default function AppLayout() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </QueryClientProvider>
  );
}
