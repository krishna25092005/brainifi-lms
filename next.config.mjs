import createMDX from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure `pageExtensions` to include markdown and MDX files
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  // Optionally, add any other Next.js config below
  
  // Add React strict mode for better development experience
  reactStrictMode: true,
  
  // Configure the React runtime
  compiler: {
    // Suppress hydration warnings for specific attributes
    // This will solve the fdprocessedid hydration mismatch
    reactRemoveProperties: process.env.NODE_ENV === 'production' ? { properties: ['^fdprocessedid$'] } : false,
  },
};

const withMDX = createMDX({
  // Add markdown plugins here, as desired
});

// Merge MDX config with Next.js config
export default withMDX(nextConfig);
