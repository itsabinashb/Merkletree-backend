const express = require('express');
const {saveNft, getNft, getMerkleProof} = require('../controllers/user.controller');
const router = express.Router();

router
    .route('/nfts')
    .post(saveNft)
    .get(getNft)

router
    .route('/merkleproofs')
    .get(getMerkleProof)

module.exports = router;