"use client";

import React, { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
  if (typeof window === "undefined") {
    return new QueryClient();
  } else {
    if (!browserQueryClient) browserQueryClient = new QueryClient();
    return browserQueryClient;
  }
}

export const Providers = ({ children }: { children: React.ReactNode }) => {
  const queryClient = getQueryClient();
  const [mounted, setMounted] = useState(false);

  // Wait until the component is mounted on the client side
  useEffect(() => {
    setMounted(true);
  }, []);

  // During static generation (like /_not-found), render the tree WITHOUT ThemeProvider
  if (!mounted) {
    return (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
  }

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
