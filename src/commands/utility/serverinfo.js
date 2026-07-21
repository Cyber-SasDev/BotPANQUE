// ========================================
// 🥞 BotPANQUE
// Server Info Command
// ========================================

const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");


module.exports = {


    data: new SlashCommandBuilder()

        .setName("serverinfo")

        .setDescription("Show server information"),



    async execute(interaction){


        const guild = interaction.guild;



        const embed = new EmbedBuilder()

            .setColor(0x00FF99)

            .setTitle(`🏠 ${guild.name}`)

            .addFields(

                {
                    name: "Owner",
                    value: `<@${guild.ownerId}>`,
                    inline: true
                },

                {
                    name: "Members",
                    value: `${guild.memberCount}`,
                    inline: true
                },

                {
                    name: "Created",
                    value: `${guild.createdAt.toDateString()}`,
                    inline: false
                }

            )

            .setTimestamp();



        await interaction.reply({

            embeds: [embed]

        });


    }


};