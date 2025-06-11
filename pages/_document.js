import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Favicons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <body>
        <Main />
        <NextScript />
        {/* 
          This script helps prevent hydration errors by removing attributes like 
          fdprocessedid that may be added by browser extensions before hydration.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  // Function to clean attributes added by browser extensions
                  function cleanDom() {
                    document.querySelectorAll('[fdprocessedid]').forEach(el => {
                      el.removeAttribute('fdprocessedid');
                    });
                  }
                  
                  // Run before React hydration
                  cleanDom();
                  
                  // Continue cleaning for a brief period after load
                  // This catches any extensions that might add attributes after initial load
                  const observer = new MutationObserver((mutations) => {
                    mutations.forEach((mutation) => {
                      if (mutation.type === 'attributes' && mutation.attributeName === 'fdprocessedid') {
                        mutation.target.removeAttribute('fdprocessedid');
                      }
                    });
                  });
                  
                  // Start observing once DOM is ready
                  document.addEventListener('DOMContentLoaded', () => {
                    observer.observe(document.body, {
                      attributes: true,
                      subtree: true,
                      attributeFilter: ['fdprocessedid']
                    });
                    
                    // Stop observing after 5 seconds
                    setTimeout(() => observer.disconnect(), 5000);
                  });
                } catch (e) {
                  console.error('Error in hydration fix script:', e);
                }
              })();
            `,
          }}
        />
      </body>
    </Html>
  )
}
