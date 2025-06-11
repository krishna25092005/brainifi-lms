// check-syntax.js
// A simple script to check JavaScript syntax
const fs = require('fs');
const path = require('path');

// Path to the file to check
const filePath = path.join(__dirname, '..', 'components', 'ui', 'Button.jsx');

try {
  // Try to read the file
  const fileContent = fs.readFileSync(filePath, 'utf8');
  console.log(`✅ Successfully read file: ${filePath}`);
  
  // Basic check for unbalanced brackets/parentheses
  let braceCount = 0;
  let parenCount = 0;
  
  for (let i = 0; i < fileContent.length; i++) {
    const char = fileContent[i];
    if (char === '{') braceCount++;
    if (char === '}') braceCount--;
    if (char === '(') parenCount++;
    if (char === ')') parenCount--;
    
    // If counts go negative, we have a closing without an opening
    if (braceCount < 0) {
      console.error(`❌ Unbalanced braces: extra } at position ${i}`);
      process.exit(1);
    }
    if (parenCount < 0) {
      console.error(`❌ Unbalanced parentheses: extra ) at position ${i}`);
      process.exit(1);
    }
  }
  
  // Final check for unbalanced brackets/parentheses
  if (braceCount !== 0) {
    console.error(`❌ Unbalanced braces: missing ${braceCount} closing braces`);
    process.exit(1);
  }
  if (parenCount !== 0) {
    console.error(`❌ Unbalanced parentheses: missing ${parenCount} closing parentheses`);
    process.exit(1);
  }
  
  console.log('✅ Basic syntax check passed');
  
} catch (err) {
  console.error(`❌ Error: ${err.message}`);
  process.exit(1);
}

console.log('✅ All checks passed successfully!');
