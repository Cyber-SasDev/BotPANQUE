// ========================================
// 🥞 BotPANQUE
// Warn Command
// ========================================
const { sendLog } = require("../../utils/logger");
const {
    SlashCommandBuilder,
    EmbedBuilder
} = require("discord.js");

const { hasModerationPermission } = require("../../utils/permissions");

const { 
    addLog, 
    getWarnings 
} = require("../../database/moderation");


module.exports = {


    data: new SlashCommandBuilder()

        .setName("warn")

        .setDescription("Warn a user")

        .addUserOption(option =>

            option

                .setName("user")

                .setDescription("User to warn")

                .setRequired(true)

        )

        .addStringOption(option =>

            option

                .setName("reason")

                .setDescription("Reason for the warning")

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

        const reason = interaction.options.getString("reason");



        addLog(

            interaction.guild.id,

            user.id,

            interaction.user.id,

            "WARN",

            reason

        );

sendLog(
    interaction.guild,
    "⚠️ WARN",
    user.tag,
    interaction.user.tag,
    reason
);

        const warnings = getWarnings(

            interaction.guild.id,

            user.id

        );



        const embed = new EmbedBuilder()

            .setColor(0xFFFF00)

            .setTitle("⚠️ Warning Added")

            .setDescription(

                `**User:** ${user.tag}\n` +

                `**Reason:** ${reason}\n` +

                `**Moderator:** ${interaction.user.tag}\n` +

                `**Total Warnings:** ${warnings}`

            )

            .setTimestamp();



        await interaction.reply({

            embeds: [embed]

        });


    }


};