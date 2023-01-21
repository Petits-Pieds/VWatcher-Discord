const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    global: true,
	data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with Pong!"),
    async execute(client, interaction) {
        const latencyEmbed = new EmbedBuilder()
        .setColor("cfe4ec")
        .setTitle("Latency")
        .setDescription(`🏓 ︵ ${interaction.createdTimestamp - Date.now()}ms`)
        .setTimestamp()
        .setFooter({ text: interaction.guild.name, iconURL: interaction.guild.iconURL() });
		await interaction.reply({ embeds: [ latencyEmbed ], ephemeral: true });
	},
};