const pup = require('puppeteer')
  , fs = require('fs')
  , config = require("./config.app")

var saveBrands = function(brands){
  const dataString = JSON.stringify(brands);
  fs.writeFileSync('./' + config.EXPORT_FILENAME, dataString);
}

var scrapeModels = async function (page){
  const options = await page.$$('select#qsmodelBuy option');
  const models = [];

  for (const elem of options){
    const name = await (await elem.getProperty('innerText')).jsonValue();
    const val = await (await elem.getProperty('value')).jsonValue();

    if(name !== '' && name !== 'Beliebig'){
      if(val.startsWith('g')){
        continue;
      }
      else {
        models.push(name.trim());
      }
    }
  }
  return models;
}

var scrapeBrands = async function(page){
  const options = await page.$$('select#qsmakeBuy option:not(.pmak)');
  const brands = [];

  for(const elem of options){
    const elemHtml = await elem.getProperty('innerText');

    const name = await (elemHtml).jsonValue();

    if(name !== '' && name !== 'Beliebig') {
      const valHtml = await elem.getProperty('value');

      const val = await (valHtml).jsonValue();

      console.log('Scraping ' + name + '...');
      await page.select('select#qsmakeBuy', val);
      await page.waitForTimeout(500);

      const models = await scrapeModels(page);
      brands.push({ name, models });
    }
  }
  return brands;
}

var run = async function(){
  console.log('start app')
  try {
    const client = await pup.launch({
      executablePath: config.CHROME_EXE_PATH,
      headless: false,
      args: [
        '--user-data-dir=' + config.CHROME_USERDATA_PATH,
        '--no-sandbox',
        '--disable-setuid-sandbox'
      ]
    });

    const page = await client.newPage();
    await page.goto(config.SCRAPE_URI)

    const brands = await scrapeBrands(page);
    client.close();
    saveBrands(brands);
  } 
  catch (err){
    console.log(err);
  }
}

run();