// ========================================
// 🥞 BotPANQUE
// Main Database
// ========================================

const Database = require("better-sqlite3");
const path = require("path");


const db = new Database(

    path.join(__dirname, "botpanque.db")

);



// ===============================
// Moderation Logs
// ===============================

db.prepare(`

CREATE TABLE IF NOT EXISTS moderation_logs (

    id INTEGER PRIMARY KEY AUTOINCREMENT,

    guildId TEXT NOT NULL,

    userId TEXT NOT NULL,

    moderatorId TEXT NOT NULL,

    action TEXT NOT NULL,

    reason TEXT,

    date TEXT NOT NULL

)

`).run();





// ===============================
// Server Settings
// ===============================

db.prepare(`

CREATE TABLE IF NOT EXISTS server_settings (

    guildId TEXT PRIMARY KEY,

    logChannel TEXT,

    welcomeChannel TEXT,

    welcomeMessage TEXT,

    welcomeImage TEXT,

    goodbyeChannel TEXT,

    goodbyeMessage TEXT,

    autoRoleId TEXT,

    prefix TEXT DEFAULT "!",

    automod INTEGER DEFAULT 0

)

`).run();





// ===============================
// Database Updates
// ===============================


try {

    db.prepare(`

        ALTER TABLE server_settings

        ADD COLUMN goodbyeChannel TEXT

    `).run();

} catch(e) {}




try {

    db.prepare(`

        ALTER TABLE server_settings

        ADD COLUMN goodbyeMessage TEXT

    `).run();

} catch(e) {}




try {

    db.prepare(`

        ALTER TABLE server_settings

        ADD COLUMN welcomeImage TEXT

    `).run();

} catch(e) {}






// ===============================
// Users
// ===============================

db.prepare(`

CREATE TABLE IF NOT EXISTS users (

    userId TEXT PRIMARY KEY,

    warnings INTEGER DEFAULT 0,

    notes TEXT

)

`).run();






// ===============================
// Tickets
// ===============================

db.prepare(`

CREATE TABLE IF NOT EXISTS tickets (

    id INTEGER PRIMARY KEY AUTOINCREMENT,

    guildId TEXT NOT NULL,

    userId TEXT NOT NULL,

    channelId TEXT NOT NULL,

    status TEXT DEFAULT 'open',

    createdAt TEXT NOT NULL

)

`).run();






console.log("🗄️ Database ready");



module.exports = db;