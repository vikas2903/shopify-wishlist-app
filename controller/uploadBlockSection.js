import dotenv from "dotenv";
import axios from "axios";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const BLOCK_FILE_MAP = {
  '011': 'offers-with-copycode.liquid',
  'block-2': 'hero-banner.liquid',
  'block-3': 'testimonial.liquid',
  // Add more mappings as needed
};

const uploadBlockSection = async (req, res) => {
  const { shop, blockId } = req.body;
  console.log('Received request to upload section:', { shop, blockId });
  const accessToken = process.env.SHOPIFY_ACCESS_TOKEN;

  const matchedFile = BLOCK_FILE_MAP[blockId];
  if (!matchedFile) {
    return res.status(400).json({ error: `No section mapped for blockId: ${blockId}` });
  }

  const sectionKey = `sections/${matchedFile}`;
  const sectionPath = path.join(__dirname, '../files', matchedFile);

  try {
    if (!fs.existsSync(sectionPath)) {
      return res.status(404).json({ error: `File not found: ${matchedFile}` });
    }

    const sectionContent = fs.readFileSync(sectionPath, 'utf-8');

    const themesResponse = await axios.get(`https://${shop}/admin/api/2023-10/themes.json`, {
      headers: {
        'X-Shopify-Access-Token': accessToken,
      },
    });

    const activeTheme = themesResponse.data.themes.find(t => t.role === 'main');
    if (!activeTheme) {
      return res.status(404).json({ error: 'Active theme not found' });
    }

    const themeId = activeTheme.id;
    console.log('Active theme found:', activeTheme.name);

    await axios.put(
      `https://${shop}/admin/api/2023-10/themes/${themeId}/assets.json`,
      {
        asset: {
          key: sectionKey,
          value: sectionContent,
        },
      },
      {
        headers: {
          'X-Shopify-Access-Token': accessToken,
        },
      }
    );

    res.status(200).json({ message: `${matchedFile} uploaded successfully` });
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: 'Failed to upload section', detail: err.message });
  }
};

export default uploadBlockSection;
