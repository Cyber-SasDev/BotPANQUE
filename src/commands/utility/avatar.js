// ========================================
// 🥞 BotPANQUE
// Avatar Command
// ========================================

const {
    SlashCommandBuilder,
    EmbedBuilder
} = require("discord.js");


module.exports = {

    data: new SlashCommandBuilder()

        .setName("avatar")

        .setDescription("Show a user's avatar")

        .addUserOption(option =>

            option

                .setName("user")

                .setDescription("Select a user")

                .setRequired(false)

        ),



    async execute(interaction) {


        await interaction.deferReply();



        const user = interaction.options.getUser("user") || interaction.user;



        const avatar = user.displayAvatarURL({

            size: 1024,

            dynamic: true

        });



        const embed = new EmbedBuilder()

            .setColor(0x5865F2)

            .setTitle(`🖼️ ${user.username}'s Avatar`)

            .setImage(avatar)

            .setFooter({

                text: "🥞 BotPANQUE"

            })

            .setTimestamp();



        await interaction.editReply({

            embeds: [embed]

        });


    }

};