// ========================================
// 🥞 BotPANQUE
// Bot Info Command
// ========================================

const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");


module.exports = {

    data: new SlashCommandBuilder()

        .setName("botinfo")

        .setDescription("Show bot information"),



    async execute(interaction) {


        const client = interaction.client;



        const embed = new EmbedBuilder()

            .setColor(0x5865F2)

            .setTitle("🥞 BotPANQUE")

            .addFields(

                {
                    name: "Version",
                    value: "0.1.0",
                    inline: true
                },

                {
                    name: "Servers",
                    value: `${client.guilds.cache.size}`,
                    inline: true
                },

                {
                    name: "Users",
                    value: `${client.users.cache.size}`,
                    inline: true
                },

                {
                    name: "Ping",
                    value: `${client.ws.ping}ms`,
                    inline: true
                }

            )

            .setTimestamp();



        await interaction.reply({

            embeds: [embed]

        });


    }

};