// ========================================
// 🥞 BotPANQUE
// Guild Member Remove Event
// ========================================

const {
    sendGoodbye
} = require("../services/goodbyeService");


module.exports = {

    name: "guildMemberRemove",


    async execute(member) {


        await sendGoodbye(member);


        console.log(
            `👋 ${member.user.tag} left ${member.guild.name}`
        );


    }

};