// ========================================
// 🥞 BotPANQUE
// Main File
// Version 0.4.0
// ========================================

require("dotenv").config();

const {
    Client,
    GatewayIntentBits
} = require("discord.js");

const eventHandler = require("./src/handlers/eventHandler");
const commandHandler = require("./src/handlers/commandHandler");

const dashboard = require("./dashboard/server");

const client = new Client({

    intents: [

        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers

    ]

});

// ========================================
// Load Events & Commands
// ========================================

eventHandler(client);
commandHandler(client);

// ========================================
// Dashboard
// ========================================

// Pasar el cliente de Discord al Dashboard
dashboard.setClient(client);

const PORT = process.env.PORT || 3000;

dashboard.listen(PORT, () => {

    console.log("--------------------------------");
    console.log("🥞 BotPANQUE Dashboard");
    console.log("--------------------------------");
    console.log(`🌐 Dashboard Online : ${PORT}`);

});

// ========================================
// Login Discord Bot
// ========================================

client.login(process.env.DISCORD_TOKEN);