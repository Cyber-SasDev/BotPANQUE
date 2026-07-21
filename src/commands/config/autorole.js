// ========================================
// 🥞 BotPANQUE
// AutoRole Command
// ========================================

const {
    SlashCommandBuilder,
    PermissionFlagsBits,
    EmbedBuilder
} = require("discord.js");

const db = require("../../database/database");


module.exports = {


    data: new SlashCommandBuilder()

        .setName("autorole")

        .setDescription("Configure automatic role system")

        .addSubcommand(sub =>

            sub

                .setName("set")

                .setDescription("Set automatic role")

                .addRoleOption(option =>

                    option

                        .setName("role")

                        .setDescription("Role to give new members")

                        .setRequired(true)

                )

        )


        .addSubcommand(sub =>

            sub

                .setName("remove")

                .setDescription("Remove automatic role")

        )


        .addSubcommand(sub =>

            sub

                .setName("view")

                .setDescription("View current automatic role")

        ),



    async execute(interaction) {


        if(
            !interaction.member.permissions.has(
                PermissionFlagsBits.ManageGuild
            )
        ) {

            return interaction.reply({

                content: "❌ You need Manage Server permission.",

                ephemeral: true

            });

        }



        const sub = interaction.options.getSubcommand();



        if(sub === "set") {


            const role = interaction.options.getRole("role");



  db.prepare(`

INSERT INTO server_settings (

    guildId,

    autoRoleId

)

VALUES (?, ?)

ON CONFLICT(guildId)

DO UPDATE SET autoRoleId = excluded.autoRoleId

`).run(

    interaction.guild.id,

    role.id

);



            const embed = new EmbedBuilder()

                .setColor(0x00FF00)

                .setTitle("✅ AutoRole Enabled")

                .setDescription(

                    `New members will receive ${role}\n\n` +

                    `Configured by: ${interaction.user.tag}`

                )

                .setTimestamp();



            return interaction.reply({

                embeds: [embed]

            });


        }



        if(sub === "remove") {


            db.prepare(`

                UPDATE server_settings

                SET autoRoleId = NULL

                WHERE guildId = ?

            `).run(

                interaction.guild.id

            );



            return interaction.reply({

                content: "✅ AutoRole removed."

            });


        }



        if(sub === "view") {


            const data = db.prepare(`

                SELECT autoRoleId

                FROM server_settings

                WHERE guildId = ?

            `).get(

                interaction.guild.id

            );



            if(!data || !data.autoRoleId) {


                return interaction.reply({

                    content: "❌ No AutoRole configured.",

                    ephemeral: true

                });

            }



            return interaction.reply({

                content: `✅ Current AutoRole: <@&${data.autoRoleId}>`

            });


        }


    }


};