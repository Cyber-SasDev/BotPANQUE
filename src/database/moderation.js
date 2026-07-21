// ========================================
// 🥞 BotPANQUE
// Moderation Database
// ========================================

const db = require("./database");


// Add moderation log

function addLog(
    guildId,
    userId,
    moderatorId,
    action,
    reason
) {

    const stmt = db.prepare(`

        INSERT INTO moderation_logs

        (
            guildId,
            userId,
            moderatorId,
            action,
            reason,
            date
        )

        VALUES (?, ?, ?, ?, ?, ?)

    `);


    stmt.run(

        guildId,

        userId,

        moderatorId,

        action,

        reason,

        new Date().toISOString()

    );

}



// Get user history

function getHistory(
    guildId,
    userId
) {


    const stmt = db.prepare(`

        SELECT *

        FROM moderation_logs

        WHERE guildId = ?

        AND userId = ?

        ORDER BY id DESC

    `);


    return stmt.all(

        guildId,

        userId

    );

}



// Count warnings

function getWarnings(
    guildId,
    userId
) {


    const stmt = db.prepare(`

        SELECT COUNT(*) as total

        FROM moderation_logs

        WHERE guildId = ?

        AND userId = ?

        AND action = 'WARN'

    `);


    return stmt.get(

        guildId,

        userId

    ).total;

}



module.exports = {

    addLog,

    getHistory,

    getWarnings

};