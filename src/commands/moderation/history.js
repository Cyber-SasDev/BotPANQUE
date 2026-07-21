// ========================================
// 🥞 BotPANQUE
// History Command
// ========================================

const {
    SlashCommandBuilder,
    EmbedBuilder
} = require("discord.js");

const { hasModerationPermission } = require("../../utils/permissions");

const { getHistory } = require("../../database/moderation");


module.exports = {


    data: new SlashCommandBuilder()

        .setName("history")

        .setDescription("View a user's moderation history")

        .addUserOption(option =>

            option

                .setName("user")

                .setDescription("User history to view")

                .setRequired(true)

        ),



    async execute(interaction) {


        if(!hasModerationPermission(interaction.member)) {


            return interaction.reply({

                content: "❌ You don't have permission to use this command.",

                ephemeral: true

            });

        }



        const user = interaction.options.getUser("user");



        const logs = getHistory(

            interaction.guild.id,

            user.id

        );



        if(logs.length === 0) {


            return interaction.reply({

                content: "✅ This user has no moderation history.",

                ephemeral: true

            });

        }



        let historyText = "";



        for(const log of logs.slice(0, 10)) {


            let icon = "📋";


            if(log.action === "WARN") icon = "⚠️";

            if(log.action === "KICK") icon = "👢";

            if(log.action === "BAN") icon = "🔨";

            if(log.action === "UNBAN") icon = "🔓";

            if(log.action === "MUTE") icon = "🔇";

            if(log.action === "UNMUTE") icon = "🔊";

            if(log.action === "CLEAR") icon = "🧹";



            historyText +=

            `${icon} **${log.action}**\n` +

            `Reason: ${log.reason || "No reason"}\n` +

            `Moderator: <@${log.moderatorId}>\n` +

            `Date: <t:${Math.floor(new Date(log.date).getTime()/1000)}:R>\n\n`;



        }



        const embed = new EmbedBuilder()

            .setColor(0x5865F2)

            .setTitle(`📋 Moderation History`)

            .setDescription(

                `User: ${user.tag}\n\n${historyText}`

            )

            .setFooter({

                text: `Total actions: ${logs.length}`

            })

            .setTimestamp();



        await interaction.reply({

            embeds: [embed]

        });


    }


};