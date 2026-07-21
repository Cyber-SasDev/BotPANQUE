// ========================================
// 🥞 BotPANQUE
// User Info Command
// ========================================

const {
    SlashCommandBuilder,
    EmbedBuilder
} = require("discord.js");


module.exports = {

    data: new SlashCommandBuilder()

        .setName("userinfo")

        .setDescription("Show user information")

        .addUserOption(option =>

            option

                .setName("user")

                .setDescription("Select a user")

                .setRequired(false)

        ),



    async execute(interaction) {


        await interaction.deferReply();



        const user = interaction.options.getUser("user") || interaction.user;



        const member = await interaction.guild.members
            .fetch(user.id)
            .catch(() => null);



        const embed = new EmbedBuilder()

            .setColor(0x5865F2)

            .setTitle(`👤 ${user.username}`)

            .setThumbnail(user.displayAvatarURL({ dynamic: true }))

            .addFields(

                {
                    name: "Username",
                    value: user.tag,
                    inline: true
                },

                {
                    name: "User ID",
                    value: user.id,
                    inline: true
                },

                {
                    name: "Account Created",
                    value: `<t:${Math.floor(user.createdTimestamp / 1000)}:D>`,
                    inline: false
                },

                {
                    name: "Joined Server",
                    value: member
                        ? `<t:${Math.floor(member.joinedTimestamp / 1000)}:D>`
                        : "Unknown",
                    inline: false
                }

            )

            .setFooter({
                text: "🥞 BotPANQUE"
            })

            .setTimestamp();



        await interaction.editReply({

            embeds: [embed]

        });


    }

};

 