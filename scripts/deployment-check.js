// deployment-check.js
/**
 * This script validates if the project is ready for deployment
 * Run it with: node deployment-check.js
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('\n🔍 Checking project for deployment readiness...\n');

// Function to check if a file exists
function fileExists(filePath) {
  try {
    return fs.existsSync(filePath);
  } catch (err) {
    console.error(`Error checking if file exists: ${filePath}`, err);
    return false;
  }
}

// Check for critical files
const criticalFiles = [
  { path: 'app/layout.js', name: 'Root Layout' },
  { path: 'app/page.js', name: 'Home Page' },
  { path: 'next.config.mjs', name: 'Next.js Config' },
  { path: 'public/favicon.ico', name: 'Favicon' },
  { path: 'public/apple-touch-icon.png', name: 'Apple Touch Icon' },
  { path: 'public/favicon-16x16.png', name: 'Favicon 16x16' },
  { path: 'public/favicon-32x32.png', name: 'Favicon 32x32' },
  { path: 'components/HydrationFix.jsx', name: 'Hydration Fix Component' }
];

let failedChecks = 0;

console.log('📋 Checking critical files:');
criticalFiles.forEach(file => {
  if (fileExists(file.path)) {
    console.log(`✅ ${file.name} found`);
  } else {
    console.log(`❌ ${file.name} missing (${file.path})`);
    failedChecks++;
  }
});

// Check Next.js config
try {
  const nextConfig = fs.readFileSync('next.config.mjs', 'utf8');
  if (nextConfig.includes('reactRemoveProperties') && nextConfig.includes('fdprocessedid')) {
    console.log('✅ Next.js config has hydration fix for fdprocessedid');
  } else {
    console.log('❌ Next.js config missing hydration fix for fdprocessedid');
    failedChecks++;
  }
} catch (err) {
  console.log('❌ Could not check Next.js config');
  failedChecks++;
}

// Check next build
console.log('\n🏗️ Running a test build to check for errors:');
try {
  execSync('npm run build', { stdio: 'inherit' });
  console.log('✅ Build completed successfully');
} catch (err) {
  console.log('❌ Build failed');
  failedChecks++;
}

// Summary
console.log('\n📊 Deployment Readiness Summary:');
if (failedChecks === 0) {
  console.log('🎉 All checks passed! Your project is ready for deployment to Vercel.');
  console.log('\nTo deploy to Vercel, run:');
  console.log('1. vercel login (if not already logged in)');
  console.log('2. vercel');
} else {
  console.log(`❌ ${failedChecks} check(s) failed. Please fix the issues before deploying.`);
}

console.log('\n✨ Check complete!\n');
