import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getData = async (req, res) => {
  const filePath = path.join(__dirname, '../data/cards.json');

  try {
    const data = await fs.readFile(filePath, 'utf8');
    const jsonData = JSON.parse(data);  // Parse the data
    return res.json(jsonData);  // Send the parsed data as the response
  } catch (error) {
    console.error("Error reading or parsing the file:", error);
    return res.status(500).json({ error: 'Failed to read or parse the data file.' });
  }
};

export default getData;