// ========================================
// 🥞 BotPANQUE
// Mute Command
// ========================================

const {
    SlashCommandBuilder,
    EmbedBuilder
} = require("discord.js");

const { hasModerationPermission } = require("../../utils/permissions");

const {
    getMutedRole,
    setupMuteRole
} = require("../../utils/mute");

const { sendLog } = require("../../utils/logger");


module.exports = {


    data: new SlashCommandBuilder()

        .setName("mute")

        .setDescription("Mute a user")

        .addUserOption(option =>

            option

                .setName("user")

                .setDescription("User to mute")

                .setRequired(true)

        )

        .addIntegerOption(option =>

            option

                .setName("time")

                .setDescription("Mute duration in minutes")

                .setRequired(true)

        )

        .addStringOption(option =>

            option

                .setName("reason")

                .setDescription("Reason for mute")

                .setRequired(false)

        ),



    async execute(interaction) {


        await interaction.deferReply();



        if(!hasModerationPermission(interaction.member)) {


            return interaction.editReply({

                content: "❌ You don't have permission to use this command."

            });

        }



        const user = interaction.options.getUser("user");


        const time = interaction.options.getInteger("time");


        const reason = interaction.options.getString("reason")
            || "No reason provided";



        const member = await interaction.guild.members
            .fetch(user.id)
            .catch(() => null);



        if(!member) {


            return interaction.editReply({

                content: "❌ User not found."

            });

        }



        const role = await getMutedRole(
            interaction.guild
        );



        await setupMuteRole(

            interaction.guild,

            role

        );



        // 📋 Log mute

        await sendLog(

            interaction.guild,

            "🔇 MUTE",

            user.tag,

            interaction.user.tag,

            `${reason} | Duration: ${time} minutes`

        );



        await member.roles.add(role);



        const embed = new EmbedBuilder()

            .setColor(0x808080)

            .setTitle("🔇 User Muted")

            .setDescription(

                `**User:** ${user.tag}\n` +

                `**Time:** ${time} minutes\n` +

                `**Reason:** ${reason}\n` +

                `**Moderator:** ${interaction.user.tag}`

            )

            .setTimestamp();



        await interaction.editReply({

            embeds: [embed]

        });



        setTimeout(async () => {


            if(member.roles.cache.has(role.id)) {


                await member.roles.remove(role)
                    .catch(() => {});


                await sendLog(

                    interaction.guild,

                    "🔊 AUTO UNMUTE",

                    user.tag,

                    "BotPANQUE",

                    "Mute time expired"

                );


            }


        }, time * 60 * 1000);



    }


};