// ========================================
// 🥞 BotPANQUE
// Goodbye Service
// ========================================

const {
    EmbedBuilder
} = require("discord.js");

const {
    getSettings
} = require("../database/settings");


async function sendGoodbye(member) {


    const settings = getSettings(
        member.guild.id
    );


    if(!settings || !settings.goodbyeChannel) {

        return;

    }


    const channel = member.guild.channels.cache.get(
        settings.goodbyeChannel
    );


    if(!channel) {

        return;

    }



    let message = settings.goodbyeMessage
        || "👋 {user} has left the server.";



    message = message

        .replace("{user}", member.user.tag)

        .replace("{server}", member.guild.name)

        .replace("{members}", member.guild.memberCount);



    const embed = new EmbedBuilder()

        .setColor(0xFF5555)

        .setTitle("👋 Goodbye")

        .setDescription(message)

        .setThumbnail(member.user.displayAvatarURL())

        .setTimestamp();



    await channel.send({

        embeds: [embed]

    });


}


module.exports = {

    sendGoodbye

};