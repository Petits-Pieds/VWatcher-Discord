const { Translations } = require("../locale");
const { EmbedBuilder, ChannelType } = require("discord.js");

module.exports = {
    name: "ticket",
    execute(client, interaction) {
        const locale = new Translations(interaction.guild.preferredLocale, "ticket_opened");
        const subject = interaction.fields.getTextInputValue("subject");
        const description = interaction.fields.getTextInputValue("description");
        interaction.guild.channels.create({
            name: subject,
            type: ChannelType.GuildText,
            parent: "1065848781565874237"
        }).then(async channel => {
            const replyEmbed = new EmbedBuilder()
            .setColor("cfe4ec")
            .setTitle(locale.get("title"))
            .setAuthor({ name: interaction.user.username, iconURL: interaction.user.avatarURL() })
            .setDescription(locale.get("description", channel.id))
            .setThumbnail(interaction.guild.iconURL())
            .addFields(
                { name: locale.get("subject_name"), value: subject },
                { name: locale.get("description_name"), value: description ? description: locale.get("no_description") }
            )
            .setTimestamp()
            .setFooter({ text: interaction.guild.name, iconURL: interaction.guild.iconURL() });
            await interaction.reply({ embeds: [replyEmbed], ephemeral: true});
            channel.send({ embeds: [replyEmbed] })
        }).catch(error => console.error(error))
	},
};