// ========================================
// 🥞 BotPANQUE
// Help Command
// ========================================

const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");


module.exports = {

    data: new SlashCommandBuilder()

        .setName("help")

        .setDescription("Show BotPANQUE commands"),



    async execute(interaction) {


        const embed = new EmbedBuilder()

            .setColor(0xF5A623)

            .setTitle("🥞 BotPANQUE Commands")

            .setDescription(
`
**General**
🏓 /ping
📋 /help
🤖 /botinfo
🏠 /serverinfo

**Coming Soon**
🛡️ Moderation
🎫 Tickets
⚙️ Settings
`
            )

            .setTimestamp();



        await interaction.reply({

            embeds:[embed]

        });


    }

};