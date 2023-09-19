const fs = require("fs");
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { MerkleTree } = require('merkletreejs')
const keccak256 = require('keccak256');
const {merkleproof} = require('../src/models/userModal');
mongoose.set('strictQuery', false);

if(process.env.NODE_ENV != 'production') {
  dotenv.config();
}

const CONNECTION = process.env.CONNECTION;  // Got the connection url

let storedData = [];

function readCSVFile(filePath, callback) {
const dataArray = [];

  fs.createReadStream(filePath)
    .on("data", function (chunk) {
      const lines = chunk.toString().split("\n");
      lines.forEach(function (line) {
        const cleanedLine = line.trim();
        if (cleanedLine !== "") {
          dataArray.push(cleanedLine);  // pushing the line in the array
        }
      });
    })
    .on("error", function (error) {
      callback(error, null);
    })
    .on("end", function () {
      callback(null, dataArray);
   });
}

async function connectToMongoDB() {
  try {
    await mongoose.connect(CONNECTION);
    console.log('Connected to MongoDB');

    const leafNodes = whitelistedAddresses.map(addr=>keccak256(addr))
    const merkleTree = new MerkleTree(leafNodes, keccak256, {sortPairs:true}) 
    
    // Root hash and Merkle tree can be found here.
    const roothash = merkleTree.getHexRoot();
    console.log('Root hash',roothash);
    console.log('Whitelist Merkle tree\n', merkleTree.toString());

    // Prepare the data to be inserted
    const data = whitelistedAddresses.map((address, index) => ({
        address: address,
        proof: merkleTree.getHexProof(leafNodes[index]).toString().split(',')
    }));
    console.log('Data prepared successfully!!');
    // Insert the data into the collection
    merkleproof.insertMany(data)
    .then((result) => {
        console.log('Data inserted successfully');
       
    })
    .catch((error) => {
        console.error('Error inserting data into MongoDB:', error);
    });
} catch (error) {
    console.error('Error connecting to MongoDB:', error);
}
  
}

let whitelistedAddresses = [];

readCSVFile("./src/Addresses.csv", function (error, data) {
  if (error) {
    console.log("Error:", error.message);
  } else {
    const cleanedData = data.map((line) => line.replace("\r",""));
    storedData = storedData.concat(cleanedData);
    whitelistedAddresses = storedData;
    connectToMongoDB();

  }
}); 


