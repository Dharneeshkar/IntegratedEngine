const fs = require("fs");

const dir = "./build/solana/json";

// list all files in the directory
fs.readdir(dir, (err, files) => {
  if (err) {
    throw err;
  }
  files.forEach((fileName) => {
    const file = require("./build/solana/json/" + fileName);
    delete file.properties.compiler;
    fs.writeFile(
      "./build/solana/json/" + fileName,
      JSON.stringify(file),
      function writeJSON(err) {
        if (err) return console.log(err);
      }
    );
  });
});
