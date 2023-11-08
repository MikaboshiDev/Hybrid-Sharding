const { EmbedBuilder, SlashCommandBuilder, ActionRowBuilder, ChatInputCommandInteraction } = require(`discord.js`);
module.exports = {
    data: new SlashCommandBuilder()
        .setName(`ping`)
        .setDescription(`The command to check the bot's ping`),
    async execute(interaction, client) {
        const embed = new EmbedBuilder()
            .setTitle(`Pong!`)
            .setDescription(`🏓 ${client.ws.ping}ms`)
            .setColor(`#FF0000`)
            .setFooter(`Requested by ${interaction.user.tag}`, interaction.user.avatarURL())
            .setTimestamp();
        interaction.reply({ embeds: [embed], ephemeral: true });
    }}