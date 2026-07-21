// ========================================
// 🥞 BotPANQUE
// Unban Command
// ========================================

const {
    SlashCommandBuilder,
    EmbedBuilder,
    PermissionFlagsBits
} = require("discord.js");

const { sendLog } = require("../../utils/logger");


module.exports = {


    data: new SlashCommandBuilder()

        .setName("unban")

        .setDescription("Unban a user from the server")

        .addStringOption(option =>

            option

                .setName("userid")

                .setDescription("User ID to unban")

                .setRequired(true)

        ),



    async execute(interaction) {


        if(
            !interaction.member.permissions.has(
                PermissionFlagsBits.BanMembers
            )
        ) {


            return interaction.reply({

                content: "❌ You don't have permission to use this command.",

                ephemeral: true

            });

        }



        const userId = interaction.options.getString("userid");



        try {


            await interaction.guild.members.unban(userId);



            // 📋 Send log

            await sendLog(

                interaction.guild,

                "🔓 UNBAN",

                userId,

                interaction.user.tag,

                "User unbanned manually"

            );



            const embed = new EmbedBuilder()

                .setColor(0x00FF00)

                .setTitle("🔓 User Unbanned")

                .setDescription(

                    `**User ID:** ${userId}\n` +

                    `**Moderator:** ${interaction.user.tag}`

                )

                .setTimestamp();



            await interaction.reply({

                embeds: [embed]

            });



        } catch(error) {


            await interaction.reply({

                content: "❌ Could not unban this user. Check the ID.",

                ephemeral: true

            });


        }


    }


};