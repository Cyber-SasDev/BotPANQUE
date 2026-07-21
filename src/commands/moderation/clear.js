// ========================================
// 🥞 BotPANQUE
// Clear Command
// ========================================

const {
    SlashCommandBuilder,
    EmbedBuilder,
    PermissionFlagsBits
} = require("discord.js");

const { sendLog } = require("../../utils/logger");


module.exports = {


    data: new SlashCommandBuilder()

        .setName("clear")

        .setDescription("Delete messages from the channel")

        .addIntegerOption(option =>

            option

                .setName("amount")

                .setDescription("Number of messages to delete (1-50)")

                .setRequired(true)

        ),



    async execute(interaction) {


        if(
            !interaction.member.permissions.has(
                PermissionFlagsBits.ManageMessages
            )
        ) {


            return interaction.reply({

                content: "❌ You don't have permission to use this command.",

                ephemeral: true

            });

        }



        const amount = interaction.options.getInteger("amount");



        if(amount < 1 || amount > 50) {


            return interaction.reply({

                content: "❌ Amount must be between 1 and 50.",

                ephemeral: true

            });

        }



        const messages = await interaction.channel.bulkDelete(

            amount,

            true

        );



        // 📋 Send log

        await sendLog(

            interaction.guild,

            "🧹 CLEAR",

            interaction.channel.name,

            interaction.user.tag,

            `Deleted ${messages.size} messages`

        );



        const embed = new EmbedBuilder()

            .setColor(0x00FF00)

            .setTitle("🧹 Messages Cleared")

            .setDescription(

                `**Deleted:** ${messages.size} messages\n` +

                `**Moderator:** ${interaction.user.tag}`

            )

            .setTimestamp();



        await interaction.reply({

            embeds: [embed],

            ephemeral: true

        });


    }


};