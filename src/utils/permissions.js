// ========================================
// 🥞 BotPANQUE
// Permission System
// ========================================

const { PermissionFlagsBits } = require("discord.js");


function hasModerationPermission(member) {


    return member.permissions.has(
        PermissionFlagsBits.ModerateMembers
    );


}


module.exports = {

    hasModerationPermission

};