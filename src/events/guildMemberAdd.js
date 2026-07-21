// ========================================
// 🥞 BotPANQUE
// Guild Member Add Event
// ========================================

const { sendWelcome } = require("../services/welcomeService");
const { getSettings } = require("../database/settings");

module.exports = {

    name: "guildMemberAdd",

    async execute(member) {

        const settings = getSettings(member.guild.id);

        if (!settings) return;

        // ==========================
        // 🎭 AutoRole
        // ==========================

        if (settings.autoRoleId) {

            const role = member.guild.roles.cache.get(
                settings.autoRoleId
            );

            if (role) {

                await member.roles.add(role)
                    .catch(() => {});

                console.log(
                    `🎭 AutoRole given to ${member.user.tag}`
                );

            }

        }

        // ==========================
        // 👋 Welcome
        // ==========================

        await sendWelcome(member);

    }

};