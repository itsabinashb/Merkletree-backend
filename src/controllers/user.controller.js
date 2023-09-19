const {nft, merkleproof} = require('../models/userModal');
// FOR NFTs ///

const saveNft = async(req,res) => {
    const nfts = new nft(req.body);
    try {
        await nfts.save();
        console.log("NFT saved");
        res.json({nfts: nfts})
    } catch (e) {
        res.status(400).json({error: e.message});
    }
}
const getNft = async(req,res) => {
    // For finding NFT using the unique ID given by mongoDB
    // const nftId = req.params.id;

    // For finding NFT Using the Token ID
    const nftId = nft(req.body);
    try {
        // const nfts = await nft.findById(nftId);
        const nfts = await nft.find({tokenId : nftId.tokenId});
        res.json({nfts});
    } catch (e) {
        res.status(400).json({error: e.message});
    }
}
const getMerkleProof = async(req, res) => {
    const walletAddress = merkleproof(req.body);
    try {
        const merkleProofs = await merkleproof.findOne({address: walletAddress.address});
        res.json({merkleProofs});
    } catch (e) {
        res.status(400).json({error: e.message});
    }
}

module.exports = {saveNft, getNft, getMerkleProof}