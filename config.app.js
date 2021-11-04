require('dotenv').config();

var config = {};

if (process.env.SCRAPE_URI) config.SCRAPE_URI = process.env.SCRAPE_URI;
if (process.env.CHROME_EXE_PATH) config.CHROME_EXE_PATH = process.env.CHROME_EXE_PATH;
if (process.env.CHROME_USERDATA_PATH) config.CHROME_USERDATA_PATH = process.env.CHROME_USERDATA_PATH;
if (process.env.EXPORT_FILENAME) config.EXPORT_FILENAME = process.env.EXPORT_FILENAME;
if (process.env.QUERY_FILENAME) config.QUERY_FILENAME = process.env.QUERY_FILENAME;
if (process.env.BRAND_TABLENAME) config.BRAND_TABLENAME = process.env.BRAND_TABLENAME;
if (process.env.MODEL_TABLENAME) config.MODEL_TABLENAME = process.env.MODEL_TABLENAME;

module.exports = config;