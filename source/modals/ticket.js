const { EmbedBuilder, ChannelType } = require("discord.js");

module.exports = {
    name: "ticket",
    execute(client, interaction) {
        const subject = interaction.fields.getTextInputValue("subject");
        const description = interaction.fields.getTextInputValue("description");
        interaction.guild.channels.create({
            name: subject,
            type: ChannelType.GuildText,
            parent: "1065848781565874237"
        }).then(async channel => {
            const ticketEmbed = new EmbedBuilder()
            .setColor("cfe4ec")
            .setTitle("Ticket opened")
            .setAuthor({ name: interaction.user.username, iconURL: interaction.user.avatarURL() })
            .setDescription(`Your ticket has been opened <#${channel.id}>`)
            .setThumbnail(interaction.guild.iconURL())
            .addFields(
                { name: "Subject", value: subject },
                { name: "Description", value: description ? description: "No description" }
            )
            .setTimestamp()
            .setFooter({ text: interaction.guild.name, iconURL: interaction.guild.iconURL() });
            await interaction.reply({ embeds: [ticketEmbed], ephemeral: true});
        }).catch(error => console.error(error))
	},
};