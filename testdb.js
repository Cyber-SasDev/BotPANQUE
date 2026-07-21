// ========================================
// 🥞 BotPANQUE
// Database Viewer
// ========================================

const db = require("./src/database/database");


const logs = db.prepare(

    "SELECT * FROM moderation_logs"

).all();



console.log("📋 Moderation Logs:");
console.log("--------------------");


console.table(logs);