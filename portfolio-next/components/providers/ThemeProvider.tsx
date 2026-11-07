"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";
import { useSearchParams } from "next/navigation";

function ThemeSync() {
  const searchParams = useSearchParams();
  const { setTheme } = useTheme();

  React.useEffect(() => {
    const themeParam = searchParams.get("theme");
    if (themeParam === "light" || themeParam === "dark") {
      setTheme(themeParam);
    }
  }, [searchParams, setTheme]);

  return null;
}

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={true}
      disableTransitionOnChange
      {...props}
    >
      <React.Suspense fallback={null}>
        <ThemeSync />
      </React.Suspense>
      {children}
    </NextThemesProvider>
  );
}
