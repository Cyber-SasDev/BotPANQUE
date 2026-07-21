// ========================================
// 🥞 BotPANQUE
// Mute System
// ========================================

const { PermissionFlagsBits } = require("discord.js");


// Get or create Muted role

async function getMutedRole(guild) {


    let role = guild.roles.cache.find(

        r => r.name === "Muted"

    );



    if(!role) {


        role = await guild.roles.create({

            name: "Muted",

            color: "Grey",

            reason: "BotPANQUE mute system"

        });


        console.log(
            `🔇 Created Muted role in ${guild.name}`
        );


    }



    return role;

}



// Apply mute permissions

async function setupMuteRole(guild, role) {


    for(const channel of guild.channels.cache.values()) {


        if(channel.isTextBased()) {


            await channel.permissionOverwrites.edit(

                role,

                {

                    SendMessages: false,

                    AddReactions: false

                }

            );


        }


    }


}



module.exports = {

    getMutedRole,

    setupMuteRole

};