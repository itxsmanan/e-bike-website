const fs = require('fs');

const oldCss = fs.readFileSync('old_index.css', 'utf8');
let indexCss = fs.readFileSync('src/index.css', 'utf8');

// 1. Fix the @theme block
indexCss = indexCss.replace(
  /@theme\s*\{([\s\S]*?)\}/,
  (match, p1) => {
    let newTheme = match;
    const rootMatch = indexCss.match(/:root\s*\{([\s\S]*?)\}/);
    if (rootMatch) {
      const rootVars = {};
      const lines = rootMatch[1].split('\n');
      for (const line of lines) {
        const parts = line.split(':');
        if (parts.length >= 2) {
          const key = parts[0].trim();
          const val = parts[1].split(';')[0].trim();
          rootVars[key] = val;
        }
      }
      
      newTheme = newTheme.replace(/var\((--[\w-]+)\)/g, (m, varName) => {
        return rootVars[varName] || m;
      });
    }
    return newTheme;
  }
);

// 2. Wrap resets in @layer base
const resetStart = '/* ── Reset & Base ─────────────────────────────────────────── */';
const utilityStart = '/* ── Utility Classes ─────────────────────────────────────── */';
const resetStartIndex = indexCss.indexOf(resetStart);
const utilityStartIndex = indexCss.indexOf(utilityStart);

if (resetStartIndex !== -1 && utilityStartIndex !== -1 && indexCss.indexOf('@layer base') === -1) {
  const beforeReset = indexCss.substring(0, resetStartIndex);
  const resetBlock = indexCss.substring(resetStartIndex, utilityStartIndex);
  const afterReset = indexCss.substring(utilityStartIndex);
  
  indexCss = beforeReset + '@layer base {\n' + resetBlock + '}\n\n' + afterReset;
}

// 3. Extract @keyframes from old_index.css using a brace counter
const keyframes = [];
let insideKeyframe = false;
let braceCount = 0;
let currentKeyframe = '';

const oldLines = oldCss.split('\n');
for (const line of oldLines) {
  if (!insideKeyframe) {
    if (line.includes('@keyframes')) {
      insideKeyframe = true;
      currentKeyframe = line + '\n';
      braceCount += (line.match(/\{/g) || []).length;
      braceCount -= (line.match(/\}/g) || []).length;
    }
  } else {
    currentKeyframe += line + '\n';
    braceCount += (line.match(/\{/g) || []).length;
    braceCount -= (line.match(/\}/g) || []).length;
    
    if (braceCount <= 0) {
      keyframes.push(currentKeyframe.trim());
      insideKeyframe = false;
      currentKeyframe = '';
      braceCount = 0;
    }
  }
}

// Append missing keyframes
indexCss += '\n\n/* ── Restored Keyframes ─────────────────────────────────────────── */\n';
let addedCount = 0;
for (const kf of keyframes) {
  const nameMatch = kf.match(/@keyframes\s+([\w-]+)/);
  if (nameMatch) {
    // Check if it already exists in index.css
    if (!indexCss.includes(`@keyframes ${nameMatch[1]}`)) {
      indexCss += kf + '\n\n';
      addedCount++;
    }
  }
}

fs.writeFileSync('src/index.css', indexCss);
console.log(`Successfully fixed @theme, wrapped @layer base, and added ${addedCount} missing keyframes!`);
