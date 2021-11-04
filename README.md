# Car make and model scraper

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://github.com/msdigital/monarch/blob/master/LICENSE.md)

### Prerequisites

* Works best on linux hosts ;)
* npm > 7.21.1
* node > 16.9.1

#### Prerequisites for puppeteer node module
Only needed if you encounter any problems with puppeteer not being able to start the browser. For example if you want to run the app in WSL2.

`sudo apt-get remove -y gconf-service libasound2 libgbm-dev libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget`

### Install and Setup

1. Fork repo
2. Run `npm install` to install the project
3. Create `.env` File in root folder and set the following settings

- `SCRAPE_URI=https://www.mobile.de/?lang=de` -> Path to the website
- `CHROME_EXE_PATH=` -> Path to Chrome executable. For example: `/mnt/c/Program\ Files\ \(x86\)/Google/Chrome/Application/chrome.exe`
* `CHROME_USERDATA_PATH=` -> Path to temporary userdata folder. For example: `C:\\temp\\chrome_userdata`
* `EXPORT_FILENAME=brand-models.json` -> Filename for brands and model JSON export
* `QUERY_FILENAME=db_query.sql` -> Filename for sql query export
* `BRAND_TABLENAME=brands` -> Database Table Name for brands
* `MODEL_TABLENAME=models` -> Database Table Name for models

### Usage

1. Run `npm run scrape` to get the latest brands and models
2. Run `npm run query` to create the sql queries for brands and models

## Authors

* **msdigital.ch** - *Initial work* - [msdigital](https://github.com/msdigital)

## License

This project is licensed under MIT License (MIT) - see the [LICENSE.md](LICENSE.md) file for details