import React, { useState, useEffect } from "react";
import { Stack } from "expo-router";
import LoadingScreen from "../components/loadingScreen";

export default function RootLayout() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading (like asset loading or auth checks)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // 2-second delay
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
