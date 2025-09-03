import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Directory containing JSON files
const jsonDir = path.join(__dirname, '../docs/san-maximo-confesor/mystagogia');
// Output directory for markdown files
const mdDir = jsonDir;

// Template for markdown file
function generateMarkdown(jsonFilename) {
  const baseName = path.basename(jsonFilename, '.json');
  const title = baseName.replace(/chapter_/, 'Capítulo ');
  return `---\ntitle: ${title}\n---\n\nimport Content from '@site/docs/san-maximo-confesor/mystagogia/${baseName}.json';\nimport Display, {generateTOC} from '@site/src/components/ChapterDisplay.js';\n\n<Display data={Content} />\n\nexport const toc = [\n  ...generateTOC(Content)\n]\n`;
}

fs.readdirSync(jsonDir)
  .filter(f => f.endsWith('.json'))
  .forEach(jsonFile => {
    const mdFile = path.join(mdDir, `${path.basename(jsonFile, '.json')}.md`);
    const content = generateMarkdown(jsonFile);
    fs.writeFileSync(mdFile, content, 'utf8');
    console.log(`Created: ${mdFile}`);
  });
