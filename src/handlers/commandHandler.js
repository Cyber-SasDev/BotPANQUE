// ========================================
// 🥞 BotPANQUE
// Command Handler
// ========================================

const fs = require("fs");
const path = require("path");


module.exports = (client) => {

    client.commands = new Map();

    loadCommands("./src/commands");



    function loadCommands(directory) {

        const files = fs.readdirSync(directory);

        for (const file of files) {

            const filePath = path.join(directory, file);

            const stat = fs.statSync(filePath);



            if (stat.isDirectory()) {

                loadCommands(filePath);

            } else if (file.endsWith(".js")) {

                const command = require(
                    path.resolve(filePath)
                );



                client.commands.set(
                    command.data.name,
                    command
                );



                console.log(
                    `📌 Command loaded: ${command.data.name}`
                );

            }

        }

    }

};