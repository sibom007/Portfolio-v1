"use client";

import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";

// Singleton instance to prevent recreation on the client side
let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
  if (typeof window === "undefined") {
    // Server: Always create a new client for isolation
    return new QueryClient();
  } else {
    // Client: Create client if it doesn't exist, reuse if it does
    if (!browserQueryClient) browserQueryClient = new QueryClient();
    return browserQueryClient;
  }
}

export const Providers = ({ children }: { children: React.ReactNode }) => {
  // Safe: No hooks used to instantiate the QueryClient
  const queryClient = getQueryClient();

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </ThemeProvider>
  );
};
