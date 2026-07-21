// ========================================
// 🥞 BotPANQUE
// Logger System
// ========================================

const { EmbedBuilder } = require("discord.js");
const { getSettings } = require("../database/settings");

async function sendLog(
    guild,
    action,
    user,
    moderator,
    reason = "No reason provided"
) {

    try {

        const settings = getSettings(guild.id);

        if (!settings || !settings.logChannel) return;

        const channel = await guild.channels.fetch(settings.logChannel).catch(() => null);

        if (!channel) return;

        const embed = new EmbedBuilder()
            .setColor(0x5865F2)
            .setTitle(`📋 ${action}`)
            .addFields(
                {
                    name: "👤 User",
                    value: `${user}`,
                    inline: true
                },
                {
                    name: "🛡️ Moderator",
                    value: `${moderator}`,
                    inline: true
                },
                {
                    name: "📝 Reason",
                    value: `${reason}`,
                    inline: false
                }
            )
            .setTimestamp();

        await channel.send({
            embeds: [embed]
        });

    } catch (error) {

        console.error("❌ Logger Error:", error);

    }

}

module.exports = {
    sendLog
};