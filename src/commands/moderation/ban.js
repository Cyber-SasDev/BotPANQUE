// ========================================
// 🥞 BotPANQUE
// Ban Command
// ========================================

const {
    SlashCommandBuilder,
    EmbedBuilder
} = require("discord.js");

const { hasModerationPermission } = require("../../utils/permissions");
const { sendLog } = require("../../utils/logger");


module.exports = {


    data: new SlashCommandBuilder()

        .setName("ban")

        .setDescription("Ban a user from the server")

        .addUserOption(option =>

            option

                .setName("user")

                .setDescription("User to ban")

                .setRequired(true)

        )

        .addStringOption(option =>

            option

                .setName("reason")

                .setDescription("Reason for the ban")

                .setRequired(false)

        ),



    async execute(interaction) {


        if(!hasModerationPermission(interaction.member)) {


            return interaction.reply({

                content: "❌ You don't have permission to use this command.",

                ephemeral: true

            });

        }



        const user = interaction.options.getUser("user");


        const reason = interaction.options.getString("reason")
            || "No reason provided";



        const member = await interaction.guild.members
            .fetch(user.id)
            .catch(() => null);



        if(!member) {


            return interaction.reply({

                content: "❌ User not found in this server.",

                ephemeral: true

            });

        }



        // 📋 Send log before ban

        await sendLog(

            interaction.guild,

            "🔨 BAN",

            user.tag,

            interaction.user.tag,

            reason

        );



        // 🔨 Ban user

        await member.ban({

            reason: reason

        });



        const embed = new EmbedBuilder()

            .setColor(0xFF0000)

            .setTitle("🔨 User Banned")

            .setDescription(

                `**User:** ${user.tag}\n` +

                `**Reason:** ${reason}\n` +

                `**Moderator:** ${interaction.user.tag}`

            )

            .setTimestamp();



        await interaction.reply({

            embeds: [embed]

        });


    }


};