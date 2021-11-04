const fs = require('fs')
  , config = require("./config.app")

const brandTable = config.BRAND_TABLENAME;
const modelTable = config.MODEL_TABLENAME;

const brandQry = 'INSERT INTO ' + brandTable + ' (id, name) VALUES \n';
const modelQry = 'INSERT INTO' + modelTable + ' (id, brand_id, name) VALUES \n';

var cleanString = function(str) {
  return str.replace(/'/g, "''");
}

var fixQueryEnd = function(qry){
  return qry.slice(0,-2) + ';\n';
}

var identityInsert = function(table, qry){
  return 'SET IDENTITY_INSERT ' + table + ' ON;\n' + qry + 'SET IDENTITY_INSERT ' + table + ' OFF;\n';
}

var getBrandQuery = function(data){
  var id = 1;
  var qry = brandQry;

  for (const brand of data){
    qry += '(' + id + ', "' + cleanString(brand.name) + '"),\n';
    id++;
  }

  qry = fixQueryEnd(qry);
  qry = identityInsert(brandTable, qry);
  return qry;
}

var getModelQuery = function(data){
  var id = 1;
  var brandId = 1;
  var qry = modelQry;

  for (const brand of data){
    for (const model of brand.models){
      qry += '(' + id + ', ' + brandId + ', "' + cleanString(model) + '"),\n';
      id++;
      if(id % 1000 === 0){
        qry = fixQueryEnd(qry);
        qry += modelQry;
      }
    }
    brandId++;
  }

  qry = fixQueryEnd(qry);
  qry = identityInsert(modelTable, qry);
  return qry;
}

async function run(){
  try {
    const data = fs.readFileSync('./' + config.EXPORT_FILENAME).toString();
    const json = JSON.parse(data);

    const qry = getBrandQuery(json) + getModelQuery(json);

    fs.writeFileSync('./' + config.QUERY_FILENAME, qry);
  }
  catch (err) {
    console.log(err);
  }
}

run();