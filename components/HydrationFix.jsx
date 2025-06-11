"use client";

import { useEffect } from 'react';

/**
 * This component helps prevent hydration mismatches by cleaning up DOM attributes
 * that may be injected by browser extensions (like form autofill extensions that add fdprocessedid).
 */
export default function HydrationFix() {
  useEffect(() => {
    // Clean fdprocessedid attributes which can cause hydration mismatches
    const cleanAttributes = () => {
      document.querySelectorAll('[fdprocessedid]').forEach(element => {
        element.removeAttribute('fdprocessedid');
      });
    };

    // Clean immediately
    cleanAttributes();

    // Set up observer to clean any new attributes
    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'fdprocessedid') {
          mutation.target.removeAttribute('fdprocessedid');
        }
      });
    });

    // Start observing
    observer.observe(document.body, {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: ['fdprocessedid']
    });

    // Clean up observer on unmount
    return () => observer.disconnect();
  }, []);

  return null; // This component doesn't render anything
}
