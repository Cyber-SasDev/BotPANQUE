const express = require("express");

const router = express.Router();

let client;


function setClient(bot){

    client = bot;

}



router.get("/roles/:guildId",(req,res)=>{


    const guild =
    client.guilds.cache.get(
        req.params.guildId
    );


    if(!guild){

        return res.json([]);

    }



    const roles =
    guild.roles.cache.map(role => ({

        id: role.id,

        name: role.name

    }));



    res.json(roles);


});



module.exports = {

    router,

    setClient

};