const fs = require('fs');
const path = './index.html';

try {
  const content = fs.readFileSync(path, 'utf8');
  const timestamp = Date.now();
  const updated = content.replace(/style\.css\?v=__BUILD__/g, `style.css?v=${timestamp}`);
  fs.writeFileSync(path, updated, 'utf8');
  console.log(`✅ Updated style.css version to: ${timestamp}`);
} catch (error) {
  console.error('❌ Error updating cache version:', error);
}