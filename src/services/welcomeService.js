// ========================================
// 🥞 BotPANQUE
// Welcome Service v0.3.2
// ========================================

const { EmbedBuilder } = require("discord.js");
const { getSettings } = require("../database/settings");

async function sendWelcome(member) {

    const settings = getSettings(member.guild.id);

    if (!settings) return;

    if (!settings.welcomeChannel) return;

    const channel = await member.guild.channels
        .fetch(settings.welcomeChannel)
        .catch(() => null);

    if (!channel) return;

    let message =
        settings.welcomeMessage ||
        "👋 Bienvenido {mention} a **{server}**!";

    message = message

        .replaceAll("{mention}", `${member}`)

        .replaceAll("{user}", member.user.username)

        .replaceAll("{server}", member.guild.name)

        .replaceAll("{members}", member.guild.memberCount.toString());

    const embed = new EmbedBuilder()

        .setColor(0x57F287)

        .setTitle(`👋 Bienvenido a ${member.guild.name}`)

        .setDescription(message)

        .setThumbnail(
            member.user.displayAvatarURL({
                size: 512
            })
        )

        // 👇 Imagen configurable desde la Dashboard
        .setImage(
            settings.welcomeImage ||
            "https://i.imgur.com/8Km9tLL.png"
        )

        .addFields(
            {
                name: "👤 Usuario",
                value: member.user.tag,
                inline: true
            },
            {
                name: "📅 Cuenta creada",
                value: `<t:${Math.floor(member.user.createdTimestamp / 1000)}:R>`,
                inline: true
            },
            {
                name: "👥 Miembros",
                value: `${member.guild.memberCount}`,
                inline: true
            }
        )

        .setFooter({
            text: `🥞 BotPANQUE • Miembro #${member.guild.memberCount}`
        })

        .setTimestamp();

    await channel.send({
        content: `🎉 ¡Bienvenido ${member}!`,
        embeds: [embed]
    });

}

module.exports = {
    sendWelcome
};