"use client";

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

interface ClientProvidersProps {
  children: React.ReactNode;
}

export default function ClientProviders({ children }: ClientProvidersProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
