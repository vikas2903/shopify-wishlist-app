import dotenv from "dotenv";
import axios from "axios";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

// Template file mappings
const BLOCK_FILE_MAP = {
  '011': 'offers-with-copycode.liquid',
  'block-2': 'hero-banner.liquid',
  'block-3': 'testimonial.liquid',
};

const uploadBlockSection = async (req, res) => {
  try {
    const { shop, blockId } = req.body;
    
    // Basic validation
    if (!shop || !blockId) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields',
        details: 'Both shop and blockId are required'
      });
    }

    // Get access token
    const accessToken = process.env.SHOPIFY_TEMP_TOKEN;
    if (!accessToken) {
      return res.status(500).json({
        success: false,
        error: 'Server configuration error',
        details: 'SHOPIFY_TEMP_TOKEN is not configured'
      });
    }

    // Get template file
    const templateFile = BLOCK_FILE_MAP[blockId];
    if (!templateFile) {
      return res.status(400).json({
        success: false,
        error: 'Invalid block ID',
        details: `No template found for blockId: ${blockId}`
      });
    }

    // Read template file
    const templatePath = path.join(__dirname, '../files', templateFile);
    if (!fs.existsSync(templatePath)) {
      return res.status(404).json({
        success: false,
        error: 'Template file not found',
        details: `File not found: ${templateFile}`
      });
    }

    const templateContent = fs.readFileSync(templatePath, 'utf-8');
    const shopUrl = `${shop}.myshopify.com`;

    // Get active theme
    const themesResponse = await axios.get(
      `https://${shopUrl}/admin/api/2023-10/themes.json`,
      {
        headers: {
          'X-Shopify-Access-Token': accessToken,
        },
      }
    );

    const activeTheme = themesResponse.data.themes.find(t => t.role === 'main');
    if (!activeTheme) {
      return res.status(404).json({
        success: false,
        error: 'Theme not found',
        details: 'No active theme found in the store'
      });
    }

    // Upload template to theme
    await axios.put(
      `https://${shopUrl}/admin/api/2023-10/themes/${activeTheme.id}/assets.json`,
      {
        asset: {
          key: `sections/${templateFile}`,
          value: templateContent,
        },
      },
      {
        headers: {
          'X-Shopify-Access-Token': accessToken,
        },
      }
    );

    // Success response
    res.status(200).json({
      success: true,
      message: `${templateFile} uploaded successfully`,
      details: {
        theme: activeTheme.name,
        section: templateFile,
        shop: shopUrl
      }
    });

  } catch (err) {
    console.error('Upload error:', err.message);

    // Handle specific errors
    if (err.code === 'ENOTFOUND') {
      return res.status(400).json({
        success: false,
        error: 'Invalid shop name',
        details: 'Please provide a valid shop name'
      });
    }

    if (err.response) {
      return res.status(err.response.status).json({
        success: false,
        error: 'Shopify API error',
        details: err.response.data
      });
    }

    // Generic error
    res.status(500).json({
      success: false,
      error: 'Upload failed',
      details: err.message
    });
  }
};

export default uploadBlockSection;
