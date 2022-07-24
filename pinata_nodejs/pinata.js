
const fs = require("fs");
const pinataSDK = require('@pinata/sdk');
const path = require('path');
const key = "2e24b4b7b0095b5f757e"
const value = "38c6aa6c8cc0c903767e7f0b31dea155aa0881334a7dee504228b04fb4a992bd"
const pinata = pinataSDK('2e24b4b7b0095b5f757e', '38c6aa6c8cc0c903767e7f0b31dea155aa0881334a7dee504228b04fb4a992bd');
jsonDirName = "./../art-engine-main/build/json/"

async function modifyJson(hash, fileName) {
    data = "https://gateway.pinata.cloud/ipfs/"+ hash ;
    console.log(data, fileName);
    jsonName = jsonDirName+fileName + '.json';

    console.log("jsonName: ", jsonName);
    fs.readFile(jsonName, 'utf8', (err,jsonString) =>{
        // console.log("json Data: ", jsonString);
        jsonObj = JSON.parse(jsonString); 
        console.log("json Obj: ", jsonObj.image);
        jsonObj.image = data;
        fs.writeFile(jsonName, JSON.stringify(jsonObj), function(err){
            console.log("write completed");

        });
    });

}

async function pinDirectoryToPinata(imgPath){
    const files = fs.readdirSync(imgPath)
    let hashes = []
    for (var i = 0; i < files.length; i++) {
        console.log("Pinning file "+ (i+1) +" to Pinata...")
        console.log(imgPath + `/${files[i]}`);
        const readableStreamForFile = fs.createReadStream(imgPath + `/${files[i]}`);
        let result = await pinata.pinFileToIPFS(readableStreamForFile)
        
        modifyJson(result.IpfsHash,path.parse(files[i]).name )

      



    }
    console.log(hashes);
    return "completed";
};

//pinDirectoryToPinata("xx");
module.exports = { pinDirectoryToPinata }


//  API Key: 2e24b4b7b0095b5f757e
//  API Secret: 38c6aa6c8cc0c903767e7f0b31dea155aa0881334a7dee504228b04fb4a992bd
//  JWT: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI0OWVhOWZkYi0zMTU0LTRjNDgtOTYwNy03NTU1ZTZhMTcwNGUiLCJlbWFpbCI6ImtfYXJhc3VAaG90bWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiMmUyNGI0YjdiMDA5NWI1Zjc1N2UiLCJzY29wZWRLZXlTZWNyZXQiOiIzOGM2YWE2YzhjYzBjOTAzNzY3ZTdmMGIzMWRlYTE1NWFhMDg4MTMzNGE3ZGVlNTA0MjI4YjA0ZmI0YTk5MmJkIiwiaWF0IjoxNjU4NjAxODEzfQ.Bt5Wis1DDRsMnDiu6ZSIsKcziOHgeyMBzyGW-FMakOI