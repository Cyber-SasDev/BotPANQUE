// ========================================
// 🥞 BotPANQUE
// Interaction Handler
// ========================================

const {
    createTicket
} = require("../services/ticketService");


const db = require("../database/database");


const {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle
} = require("discord.js");



module.exports = {


name:"interactionCreate",



async execute(interaction) {



    // ==========================
    // 🎫 Buttons
    // ==========================


    if(interaction.isButton()) {



        // Crear ticket

        if(interaction.customId === "create_ticket") {



            await interaction.deferReply({
                ephemeral:true
            });



            try {



                const channel = await createTicket(

                    interaction.guild,

                    interaction.user

                );



                if(!channel) {


                    return interaction.editReply({

                        content:
                        "❌ No se pudo crear el ticket."

                    });


                }



                const closeButton = new ButtonBuilder()

                .setCustomId("close_ticket")

                .setLabel("🔒 Cerrar Ticket")

                .setStyle(ButtonStyle.Danger);



                const row = new ActionRowBuilder()

                .addComponents(closeButton);



                await channel.send({

                    content:

                    `🎫 Bienvenido ${interaction.user}\n\n`+

                    `Un moderador te atenderá pronto.`,


                    components:[row]

                });



                await interaction.editReply({

                    content:

                    `✅ Ticket creado: ${channel}`

                });



            } catch(error) {


                console.error(error);



                await interaction.editReply({

                    content:

                    "❌ Error creando ticket."

                });


            }


        }




        // Cerrar ticket


        if(interaction.customId === "close_ticket") {



            await interaction.reply({

                content:

                "🔒 Cerrando ticket...",


                ephemeral:true

            });



            db.prepare(`

                UPDATE tickets

                SET status = 'closed'

                WHERE channelId = ?

            `).run(

                interaction.channel.id

            );



            setTimeout(()=>{


                interaction.channel.delete()

                .catch(()=>{});


            },3000);


        }



        return;

    }





    // ==========================
    // Slash Commands
    // ==========================


    if(!interaction.isChatInputCommand())

        return;



    console.log(
        "📩 Command received:",
        interaction.commandName
    );



    const command =

    interaction.client.commands.get(

        interaction.commandName

    );



    if(!command)

        return;



    try {


        await command.execute(interaction);



    } catch(error) {



        console.error(error);



        if(interaction.replied || interaction.deferred){


            await interaction.followUp({

                content:"❌ Command error.",

                ephemeral:true

            });


        } else {


            await interaction.reply({

                content:"❌ Command error.",

                ephemeral:true

            });


        }


    }



}


};