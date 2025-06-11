"use client";

import { useUser } from "@clerk/nextjs";
import axios from "axios";
import React, { useEffect } from "react";
import { ThemeProvider } from "next-themes";
import HydrationFix from "../components/HydrationFix";

function Provider({ children }) {
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      CheckIsNewUser();
    }
  }, [user]);

  const CheckIsNewUser = async () => {
    if (!user?.primaryEmailAddress?.emailAddress) return;
    
    try {
      // Add delay to ensure Clerk auth is fully initialized
      setTimeout(async () => {
        try {
          // Handle user creation entirely through the API endpoint
          // instead of accessing the database directly from the client
          const resp = await axios.post('/api/create-user', {
            user: {
              fullName: user.fullName,
              email: user.primaryEmailAddress.emailAddress
            }
          });
          console.log("User check/creation response:", resp.data);
        } catch (error) {
          // Silently handle the error without console.error to avoid red error messages
          console.log("Note: User creation will be tried again on next login", error.message || "");
        }
      }, 1000);
    } catch (error) {
      // Silently handle the error without console.error to avoid red error messages
      console.log("User check/creation handling error:", error.message || "Unknown error");
    }
  };

  return (
    <ThemeProvider 
      attribute="class" 
      defaultTheme="light" 
      enableSystem={true}
      enableColorScheme={true}
      storageKey="brainifi-theme"
      forcedTheme={null}
      disableTransitionOnChange={true}
      suppressHydrationWarning
    >
      {/* Add HydrationFix component to clean up fdprocessedid attributes */}
      <HydrationFix />
      {children}
    </ThemeProvider>
  );
}

export default Provider;
