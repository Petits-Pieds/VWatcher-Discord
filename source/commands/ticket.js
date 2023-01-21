const { SlashCommandBuilder, ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');

module.exports = {
    global: true,
	data: new SlashCommandBuilder()
    .setName("ticket")
    .setDescription("Open a ticket"),
    async execute(client, interaction) {
        const ticketModal = new ModalBuilder()
        .setCustomId("ticket")
        .setTitle("Open a ticket");

        const ticketSubjectInput = new TextInputBuilder()
        .setCustomId("subject")
        .setLabel("Subject")
        .setPlaceholder("Ticket subject (mandatory)")
        .setStyle(TextInputStyle.Short)
        .setRequired(true);

        const ticketDescriptionInput = new TextInputBuilder()
        .setCustomId("description")
        .setMaxLength(500)
        .setLabel("Description")
        .setPlaceholder("Ticket description (optional)")
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