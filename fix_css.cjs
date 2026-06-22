const fs = require('fs');

const oldCss = fs.readFileSync('old_index.css', 'utf8');
let indexCss = fs.readFileSync('src/index.css', 'utf8');

// 1. Fix the @theme block
indexCss = indexCss.replace(
  /@theme\s*\{([\s\S]*?)\}/,
  (match, p1) => {
    // Replace var(--something) with the actual hex value found in :root
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
// The resets start at /* ── Reset & Base ─────────────────────────────────────────── */
// and end before /* ── Utility Classes ─────────────────────────────────────── */
const resetStart = '/* ── Reset & Base ─────────────────────────────────────────── */';
const utilityStart = '/* ── Utility Classes ─────────────────────────────────────── */';
const resetStartIndex = indexCss.indexOf(resetStart);
const utilityStartIndex = indexCss.indexOf(utilityStart);

if (resetStartIndex !== -1 && utilityStartIndex !== -1) {
  const beforeReset = indexCss.substring(0, resetStartIndex);
  const resetBlock = indexCss.substring(resetStartIndex, utilityStartIndex);
  const afterReset = indexCss.substring(utilityStartIndex);
  
  indexCss = beforeReset + '@layer base {\n' + resetBlock + '}\n\n' + afterReset;
}

// 3. Extract @keyframes from old_index.css
const keyframes = [];
const regex = /@keyframes\s+[\w-]+\s*\{[\s\S]*?\}(?=\n\n|\n\/\*|\n@keyframes|$)/g;
let match;
while ((match = regex.exec(oldCss)) !== null) {
  keyframes.push(match[0]);
}

// Append missing keyframes
indexCss += '\n\n/* ── Restored Keyframes ─────────────────────────────────────────── */\n';
const existingKeyframes = new Set();
const existingRegex = /@keyframes\s+([\w-]+)/g;
let m;
while ((m = existingRegex.exec(indexCss)) !== null) {
  existingKeyframes.add(m[1]);
}

let addedCount = 0;
for (const kf of keyframes) {
  const nameMatch = kf.match(/@keyframes\s+([\w-]+)/);
  if (nameMatch && !existingKeyframes.has(nameMatch[1])) {
    indexCss += kf + '\n\n';
    existingKeyframes.add(nameMatch[1]);
    addedCount++;
  }
}

fs.writeFileSync('src/index.css', indexCss);
console.log(`Successfully fixed @theme, wrapped @layer base, and added ${addedCount} missing keyframes!`);
