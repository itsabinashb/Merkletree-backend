const mongoose = require('mongoose');

const nftSchema = new mongoose.Schema({
    tokenId: {
        type: Number,
        required: true
    },
    uri: {
        type: String,
        required: true
    }
});
const merkleproofSchema = new mongoose.Schema({
    address: {
        type: String,
        required: true
    },
    proof: {
        type: Array
    }
});

const nft = mongoose.model('nft', nftSchema);
const merkleproof = mongoose.model('merkleproof', merkleproofSchema);

module.exports = {
    nft: nft,
    merkleproof: merkleproof
}