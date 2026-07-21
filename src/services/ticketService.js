// ========================================
// 🥞 BotPANQUE
// Ticket Service DEBUG
// ========================================

const {
    ChannelType,
    PermissionFlagsBits
} = require("discord.js");

const db = require("../database/database");


async function createTicket(guild, user) {


    console.log("🎫 Iniciando creación de ticket...");


    try {


        const existing = db.prepare(`

            SELECT *

            FROM tickets

            WHERE guildId = ?

            AND userId = ?

            AND status = 'open'

        `).get(

            guild.id,

            user.id

        );


        console.log("🔎 Ticket existente:", existing);



        if(existing) {


    const oldChannel =
    guild.channels.cache.get(
        existing.channelId
    );


    console.log("📂 Canal existente:", oldChannel?.name);



    if(oldChannel) {

        return oldChannel;

    }



    // El canal ya no existe, limpiamos DB

    db.prepare(`

        DELETE FROM tickets

        WHERE channelId = ?

    `).run(

        existing.channelId

    );


    console.log(
        "🗑️ Ticket viejo eliminado de DB"
    );


}



        console.log("📁 Creando canal...");



        const channel = await guild.channels.create({

            name:`ticket-${user.username}`,

            type: ChannelType.GuildText,


            permissionOverwrites:[

                {

                    id:guild.roles.everyone.id,

                    deny:[

                        PermissionFlagsBits.ViewChannel

                    ]

                },


                {

                    id:user.id,

                    allow:[

                        PermissionFlagsBits.ViewChannel,

                        PermissionFlagsBits.SendMessages

                    ]

                }

            ]

        });



        console.log(
            "✅ Canal creado:",
            channel.id
        );



        db.prepare(`

            INSERT INTO tickets (

                guildId,

                userId,

                channelId,

                status,

                createdAt

            )

            VALUES (?,?,?,?,?)

        `).run(

            guild.id,

            user.id,

            channel.id,

            "open",

            new Date().toISOString()

        );



        console.log("💾 Ticket guardado en DB");


        return channel;



    } catch(error) {


        console.error(
            "❌ ERROR CREATE TICKET:",
            error
        );


        return null;

    }


}



module.exports = {

    createTicket

};