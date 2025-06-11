/**
 * This script suppresses hydration warnings related to browser extensions
 * This runs in the browser and should be included in apps with hydration issues
 */

// Wait for the DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
  // Short delay to ensure extensions have had a chance to modify the DOM
  setTimeout(() => {
    try {
      // Find all elements with fdprocessedid attributes added by browser extensions
      const elementsWithFdProcessedId = document.querySelectorAll('[fdprocessedid]');
      
      if (elementsWithFdProcessedId.length > 0) {
        console.log(`Found ${elementsWithFdProcessedId.length} elements with fdprocessedid attributes. Cleaning up...`);
        
        // Remove the attributes
        elementsWithFdProcessedId.forEach(el => {
          el.removeAttribute('fdprocessedid');
        });
      }
      
      // Set up an observer to catch any attributes added after initial load
      const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
          if (mutation.type === 'attributes' && mutation.attributeName === 'fdprocessedid') {
            mutation.target.removeAttribute('fdprocessedid');
          }
        });
      });
      
      // Start observing the entire document
      observer.observe(document.body, {
        attributes: true,
        subtree: true,
        attributeFilter: ['fdprocessedid']
      });
      
      // Stop observing after 10 seconds to avoid ongoing performance impact
      setTimeout(() => {
        observer.disconnect();
        console.log('Hydration warning suppressor disconnected after timeout.');
      }, 10000);
      
    } catch (err) {
      console.error('Error in hydration warning suppressor:', err);
    }
  }, 100);
});
