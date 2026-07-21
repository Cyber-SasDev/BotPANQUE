// ========================================
// 🥞 BotPANQUE
// Ticket Command
// ========================================

const {
    SlashCommandBuilder,
    PermissionFlagsBits,
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle
} = require("discord.js");


module.exports = {


data: new SlashCommandBuilder()

.setName("ticket")

.setDescription("Ticket system")

.addSubcommand(sub =>
sub

.setName("setup")

.setDescription("Create ticket panel")

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



// Respondemos primero
await interaction.deferReply({
    ephemeral:true
});



const embed = new EmbedBuilder()

.setColor(0x5865F2)

.setTitle("🎫 Support Tickets")

.setDescription(

"Need help?\n\n" +
"Press the button below to create a private ticket."

)

.setTimestamp();



const button = new ButtonBuilder()

.setCustomId("create_ticket")

.setLabel("🎫 Create Ticket")

.setStyle(ButtonStyle.Primary);



const row = new ActionRowBuilder()

.addComponents(button);



await interaction.channel.send({

embeds:[embed],

components:[row]

});



await interaction.editReply({

content:"✅ Ticket panel created!"

});


}


};