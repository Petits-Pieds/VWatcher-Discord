module.exports = {
    name: "InteractionCreate",
    async execute(client, interaction) {
        if (interaction.isChatInputCommand()) {
            const command = interaction.client.commands.get(interaction.commandName);
            
            if (!command) {
                return;
            }

            try {
                await command.execute(client, interaction);
            } catch (error) {
                await interaction.reply({ content: "There was an error while executing this command!", ephemeral: true });
            }
        } else if (interaction.isModalSubmit()) {
            const modal = interaction.client.modals.get(interaction.customId);

            if (!modal) {
                //console.error(`No modal matching ${interaction.customId} was found.`);
                return;
            }

            try {
                await modal.execute(client, interaction);
            } catch (error) {
                await interaction.reply({ content: "There was an error while submitting this modal!", ephemeral: true });
            }
        };
    }
}