"use client";

import { QueryClient } from "@tanstack/react-query";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { ReactQueryStreamedHydration } from "@tanstack/react-query-next-experimental";

const queryClient = new QueryClient({});

const persister = createSyncStoragePersister({
  storage: typeof window !== "undefined" ? window.localStorage : null,
  key: "stefantekstil-Cache",
  serialize: JSON.stringify,
  deserialize: JSON.parse,
  retry: 3,
});

export const QueryProvider = ({ children }) => {
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{
        persister: persister,
        buster: "stefantekstil-Cache",
        maxAge: 1000 * 60 * 60 * 24 * 30, //1 month
      }}
    >
      <ReactQueryStreamedHydration>{children}</ReactQueryStreamedHydration>
    </PersistQueryClientProvider>
  );
};
