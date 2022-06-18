import { CommandInteraction, Client } from "discord.js";

export default (client: Client, interaction: CommandInteraction) => {
    interaction.reply(`${client.ws.ping}ms!!!! c:`);
};
