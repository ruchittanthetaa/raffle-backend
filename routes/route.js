const express = require("express");
const WalletUser = require("../model/usermodel");
const HTTP = require("../constant/response.code")
const app = express();
const axios = require("axios");

// get Devnet-solana nftItems
// (async ()=>{
// try {
//     const config = {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       };
//       const data = {
//         jsonrpc: "2.0",
//         method: "qn_fetchNFTs",
//         params: {
//           wallet: "AmUD55oiVg9qHPchtDVuUpi4PoeVxBaUNnt31Rq5ueaa",
//           omitFields: ["provenance", "traits"],
//         },
//       };
//       axios
//         .post(
//           "https://magical-neat-sound.solana-devnet.discover.quiknode.pro/2973528e9f79d9e372a733ec87d9176ad475b402/",
//           data,
//           config
//         )
//         .then(function (response) {
//           // handle success
//           console.log(response.data.result.assets, "solana");
  
//         })
//         .catch((err) => {
//           // handle error
//           console.log(err);
//         });
// } catch (error) {
//     // handle error
//     console.log(error);
// }
// })()



// post
app.post("/addWallet", async (req, res) => {
    try {
        const { wallet,collection_name,nft_name ,token_address} = req.body;
        if (!req.body || !wallet || !collection_name || !nft_name || !token_address)
            return res.status(HTTP.SUCCESS).send({
                status: false,
                code: HTTP.NOT_FOUND,
                message: 'All fields are required!',
                data: {},
            });
  

        // const walletExists = await WalletUser.findOne({
        //     wallet
        // });
        // if (walletExists)
        //     return res.status(HTTP.SUCCESS).send({
        //         success: false,
        //         code: HTTP.BAD_REQUEST,
        //         message: 'Wallet already exists with same name!',
        //         data: {},
        //     });
        const walletData = await new WalletUser({
            wallet,collection_name,nft_name ,token_address
        }).save();
        if (!walletData)
            return res.status(HTTP.SUCCESS).send({
                status: false,
                code: HTTP.BAD_REQUEST,
                message: 'Unable to save wallet data',
                data: {},
            });
        return res.status(HTTP.SUCCESS).send({
            status: true,
            code: HTTP.SUCCESS,
            message: 'wallet data.',
            data: {walletData},
        });
    } catch (err) {
        console.log(err);
        return res.status(HTTP.SUCCESS).send({
            status: false,
            code: HTTP.INTERNAL_SERVER_ERROR,
            message: 'Something went wrong!',
            data: {},
        });
    }
});


// get
app.get("/getWallet", async (request, response) => {
    const users = await WalletUser.find({});
    try {
      response.send(users);
    } catch (error) {
      response.status(500).send(error);
    }
  });

  module.exports = app;
