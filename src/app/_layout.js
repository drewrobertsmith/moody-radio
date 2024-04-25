import * as Sentry from "@sentry/react-native";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack, useNavigationContainerRef } from "expo-router";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import { useEffect } from "react";

// Construct a new instrumentation instance. This is needed to communicate between the integration and React
const routingInstrumentation = new Sentry.ReactNavigationInstrumentation();

Sentry.init({
  dsn: "https://dc0fec916165c76a4bb2c0234356c357@o4507147687821312.ingest.us.sentry.io/4507147712266240",
  debug: false, // If `true`, Sentry will try to print out useful debugging information if something goes wrong with sending the event. Set it to `false` in production
  integrations: [
    new Sentry.ReactNativeTracing({
      // Pass instrumentation to be used as `routingInstrumentation`
      routingInstrumentation,
      // ...
    }),
  ],
});

function AppLayout() {
  // Capture the NavigationContainer ref and register it with the instrumentation.
  const ref = useNavigationContainerRef();
  useEffect(() => {
    if (ref) {
      routingInstrumentation.registerNavigationContainer(ref);
    }
  }, [ref]);

  const queryClient = new QueryClient({
    // defaultOptions: {
    //   cacheTime: 1000 * 60 * 60 * 24, // 24 hours
    // },
  });
  // const asyncStoragePersister = createAsyncStoragePersister({
  //   storage: AsyncStorage,
  // });

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {/* <PersistQueryClientProvider */}
      <QueryClientProvider
        client={queryClient}
        //persistOptions={{ persister: asyncStoragePersister }}
      >
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="(playerStack)"
            options={{ presentation: "modal", headerShown: false }}
          />
        </Stack>
      </QueryClientProvider>
      {/* </PersistQueryClientProvider> */}
    </GestureHandlerRootView>
  );
}

export default Sentry.wrap(AppLayout);
