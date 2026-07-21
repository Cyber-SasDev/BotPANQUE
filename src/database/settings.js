// ========================================
// 🥞 BotPANQUE
// Server Settings Database
// ========================================

const db = require("./database");


// Obtener configuración completa
function getSettings(guildId) {

    return db.prepare(`

        SELECT *

        FROM server_settings

        WHERE guildId = ?

    `).get(guildId);

}



// Crear configuración si no existe
function createSettings(guildId) {

    db.prepare(`

        INSERT OR IGNORE INTO server_settings (

            guildId

        )

        VALUES (?)

    `).run(guildId);

}



// Logs
function setLogChannel(guildId, channelId) {

    createSettings(guildId);

    db.prepare(`

        UPDATE server_settings

        SET logChannel = ?

        WHERE guildId = ?

    `).run(channelId, guildId);

}



// AutoRole
function setAutoRole(guildId, roleId) {

    createSettings(guildId);

    db.prepare(`

        UPDATE server_settings

        SET autoRoleId = ?

        WHERE guildId = ?

    `).run(roleId, guildId);

}



// Welcome Channel
function setWelcomeChannel(guildId, channelId) {

    createSettings(guildId);

    db.prepare(`

        UPDATE server_settings

        SET welcomeChannel = ?

        WHERE guildId = ?

    `).run(channelId, guildId);

}



// Welcome Message
function setWelcomeMessage(guildId, message) {

    createSettings(guildId);

    db.prepare(`

        UPDATE server_settings

        SET welcomeMessage = ?

        WHERE guildId = ?

    `).run(message, guildId);

}



// Goodbye Channel
function setGoodbyeChannel(guildId, channelId) {

    createSettings(guildId);

    db.prepare(`

        UPDATE server_settings

        SET goodbyeChannel = ?

        WHERE guildId = ?

    `).run(channelId, guildId);

}



// Goodbye Message
function setGoodbyeMessage(guildId, message) {

    createSettings(guildId);

    db.prepare(`

        UPDATE server_settings

        SET goodbyeMessage = ?

        WHERE guildId = ?

    `).run(message, guildId);

}



module.exports = {

    getSettings,

    createSettings,

    setLogChannel,

    setAutoRole,

    setWelcomeChannel,

    setWelcomeMessage,

    setGoodbyeChannel,

    setGoodbyeMessage

};