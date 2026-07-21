// ========================================
// 🥞 BotPANQUE
// Command Registration
// ========================================

require("dotenv").config();

const { REST, Routes } = require("discord.js");
const fs = require("fs");
const path = require("path");

const commands = [];


// ===============================
// Load Commands
// ===============================

function loadCommands(directory) {

    const files = fs.readdirSync(directory);

    for (const file of files) {

        const filePath = path.join(directory, file);

        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {

            loadCommands(filePath);

        } else if (file.endsWith(".js")) {

            const command = require(path.resolve(filePath));

            commands.push(command.data.toJSON());

            console.log(`📌 Registered: ${command.data.name}`);

        }

    }

}


loadCommands("./src/commands");


// ===============================
// Discord REST
// ===============================

const rest = new REST({ version: "10" })
    .setToken(process.env.DISCORD_TOKEN);


// ===============================
// Register
// ===============================

(async () => {

    try {

        console.log("🔄 Registering commands...");
console.log(
    JSON.stringify(
        commands.find(c => c.name === "setup"),
        null,
        2
    )
);
        await rest.put(

            Routes.applicationGuildCommands(

                process.env.CLIENT_ID,

                process.env.GUILD_ID

            ),

            {

                body: commands

            }

        );

        console.log("✅ Commands registered!");

    } catch (error) {

        console.error(error);

    }

})();