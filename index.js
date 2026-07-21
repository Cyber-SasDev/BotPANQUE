// ========================================
// 🥞 BotPANQUE
// Main File
// Version 0.1.0
// ========================================

require("dotenv").config();

const { 
    Client, 
    GatewayIntentBits 
} = require("discord.js");

const eventHandler = require("./src/handlers/eventHandler");
const commandHandler = require("./src/handlers/commandHandler");


const client = new Client({

    intents: [

        GatewayIntentBits.Guilds,

        GatewayIntentBits.GuildMembers

    ]

});



// Load events
eventHandler(client);

commandHandler(client);



// Login
// ========================================
// 🌐 BotPANQUE API Dashboard
// ========================================

const express = require("express");
const cors = require("cors");

const rolesApi = require("./src/api/rolesApi");


const api = express();


// Permitir conexión desde Dashboard
api.use(cors());


api.use(express.json());


// Conectar API con Discord
rolesApi.setClient(client);


// Rutas
api.use(
    "/api",
    rolesApi.router
);



// Encender API
api.listen(3001,()=>{

    console.log(
        "🌐 Bot API online :3001"
    );

});
client.login(process.env.DISCORD_TOKEN);