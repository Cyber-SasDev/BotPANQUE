// ========================================
// 🥞 BotPANQUE
// Unmute Command
// ========================================

const {
    SlashCommandBuilder,
    EmbedBuilder
} = require("discord.js");

const { hasModerationPermission } = require("../../utils/permissions");

const { sendLog } = require("../../utils/logger");


module.exports = {


    data: new SlashCommandBuilder()

        .setName("unmute")

        .setDescription("Remove mute from a user")

        .addUserOption(option =>

            option

                .setName("user")

                .setDescription("User to unmute")

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



        const member = await interaction.guild.members
            .fetch(user.id)
            .catch(() => null);



        if(!member) {


            return interaction.reply({

                content: "❌ User not found.",

                ephemeral: true

            });

        }



        const role = interaction.guild.roles.cache.find(

            r => r.name === "Muted"

        );



        if(!role) {


            return interaction.reply({

                content: "❌ Muted role doesn't exist.",

                ephemeral: true

            });

        }



        if(!member.roles.cache.has(role.id)) {


            return interaction.reply({

                content: "❌ This user is not muted.",

                ephemeral: true

            });

        }



        // 📋 Send log

        await sendLog(

            interaction.guild,

            "🔊 UNMUTE",

            user.tag,

            interaction.user.tag,

            "Mute removed manually"

        );



        await member.roles.remove(role);



        const embed = new EmbedBuilder()

            .setColor(0x00FF00)

            .setTitle("🔊 User Unmuted")

            .setDescription(

                `**User:** ${user.tag}\n` +

                `**Moderator:** ${interaction.user.tag}`

            )

            .setTimestamp();



        await interaction.reply({

            embeds: [embed]

        });


    }


};