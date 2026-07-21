// ========================================
// 🥞 BotPANQUE
// Setup Command
// ========================================

const {
    SlashCommandBuilder,
    PermissionFlagsBits,
    EmbedBuilder
} = require("discord.js");


const {

    setLogChannel,

    setWelcomeChannel,

    setWelcomeMessage,

    setGoodbyeChannel,

    setGoodbyeMessage

} = require("../../database/settings");



module.exports = {


data: new SlashCommandBuilder()

.setName("setup")

.setDescription("Configure BotPANQUE")



// Logs
.addSubcommand(sub =>
sub

.setName("logs")

.setDescription("Set moderation logs channel")

.addChannelOption(option =>
option

.setName("channel")

.setDescription("Logs channel")

.setRequired(true)

)

)



// Welcome Channel
.addSubcommand(sub =>
sub

.setName("welcome-channel")

.setDescription("Set welcome channel")

.addChannelOption(option =>
option

.setName("channel")

.setDescription("Welcome channel")

.setRequired(true)

)

)



// Welcome Message
.addSubcommand(sub =>
sub

.setName("welcome-message")

.setDescription("Set welcome message")

.addStringOption(option =>
option

.setName("message")

.setDescription("Welcome message")

.setRequired(true)

)

)



// Goodbye Channel
.addSubcommand(sub =>
sub

.setName("goodbye-channel")

.setDescription("Set goodbye channel")

.addChannelOption(option =>
option

.setName("channel")

.setDescription("Goodbye channel")

.setRequired(true)

)

)



// Goodbye Message
.addSubcommand(sub =>
sub

.setName("goodbye-message")

.setDescription("Set goodbye message")

.addStringOption(option =>
option

.setName("message")

.setDescription("Goodbye message")

.setRequired(true)

)

),



async execute(interaction) {


if(
!interaction.member.permissions.has(
PermissionFlagsBits.ManageGuild
)

) {

return interaction.reply({

content:"❌ You need Manage Server permission.",

ephemeral:true

});

}



const subcommand = interaction.options.getSubcommand();



if(subcommand === "logs") {

const channel =
interaction.options.getChannel("channel");


setLogChannel(
interaction.guild.id,
channel.id
);


return interaction.reply({

content:`✅ Logs set to ${channel}`

});

}



if(subcommand === "welcome-channel") {


const channel =
interaction.options.getChannel("channel");


setWelcomeChannel(
interaction.guild.id,
channel.id
);


return interaction.reply({

content:`👋 Welcome channel set to ${channel}`

});

}



if(subcommand === "welcome-message") {


const message =
interaction.options.getString("message");


setWelcomeMessage(
interaction.guild.id,
message
);


return interaction.reply({

content:"💬 Welcome message saved!"

});

}



if(subcommand === "goodbye-channel") {


const channel =
interaction.options.getChannel("channel");


setGoodbyeChannel(
interaction.guild.id,
channel.id
);


return interaction.reply({

content:`👋 Goodbye channel set to ${channel}`

});

}



if(subcommand === "goodbye-message") {


const message =
interaction.options.getString("message");


setGoodbyeMessage(
interaction.guild.id,
message
);


return interaction.reply({

content:"👋 Goodbye message saved!"

});

}


}


};