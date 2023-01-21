const { Translations } = require("../locale");
const { SlashCommandBuilder, ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');

module.exports = {
    global: true,
	data: new SlashCommandBuilder()
    .setName("ticket")
    .setDescription("Open a ticket"),
    async execute(client, interaction) {
        const locale = new Translations(interaction.guild.preferredLocale, "ticket_opening");
        const ticketModal = new ModalBuilder()
        .setCustomId("ticket")
        .setTitle(locale.get("open_ticket"));

        const ticketSubjectInput = new TextInputBuilder()
        .setCustomId("subject")
        .setLabel(locale.get("subject_label"))
        .setPlaceholder(locale.get("subject_placeholder"))
        .setStyle(TextInputStyle.Short)
        .setRequired(true);

        const ticketDescriptionInput = new TextInputBuilder()
        .setCustomId("description")
        .setMaxLength(500)
        .setLabel(locale.get("description_label"))
        .setPlaceholder(locale.get("description_placeholder"))
        .setStyle(TextInputStyle.Paragraph)
        .setRequired(false);

        const firstActionRow = new ActionRowBuilder().addComponents(ticketSubjectInput);
        const secondActionRow = new ActionRowBuilder().addComponents(ticketDescriptionInput);

        // Add inputs to the modal
        ticketModal.addComponents(firstActionRow, secondActionRow);

        // Show the modal to the user
        await interaction.showModal(ticketModal);
	},
};