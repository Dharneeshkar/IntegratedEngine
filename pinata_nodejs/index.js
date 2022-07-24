const express = require("express");
const pinata = require('./pinata');

const PORT =  3001;

const app = express();
const imageDirName = "./../art-engine-main/build/images"
app.get("/callPinata", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  result = pinata.pinDirectoryToPinata(imageDirName);
  //res.json({ message: JSON.stringify(result) });
  res.json({ "status":"Success" });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});