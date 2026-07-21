// ========================================
// 🥞 BotPANQUE
// Ready Event
// ========================================

module.exports = {

name: "clientReady",

    execute(client) {

        console.log("--------------------------------");
        console.log("🥞 BotPANQUE v0.1.0");
        console.log("--------------------------------");

        console.log(`✅ Logged in as ${client.user.tag}`);

        console.log("--------------------------------");

    }

};