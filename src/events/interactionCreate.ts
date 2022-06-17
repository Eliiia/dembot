import { Interaction, Client } from "discord.js";
import { readdirSync } from "fs";

const commands: { [key: string]: Function } = {};

for (const file of readdirSync(`${__dirname}/../commands/`)) {
    const command = require(`../commands/${file}`);
    const name = file.split(".")[0];
    commands[name] = command.run;

    console.log(`Loaded in ${file}`);
}

export async function run(client: Client, interaction: Interaction) {
    if (interaction.isCommand()) {
        const command = commands[interaction.commandName];

        if (!command) return interaction.reply("Command not found :c");

        try {
            command(interaction, client);
        } catch (e) {
            interaction.reply(`Ran into an error!!! :ccc\n\n\`\`\`${e}\`\`\``);
            return console.log(
                `${interaction.user.tag} (${interaction.user.id}) ran \x1b[31m${interaction.commandName}\x1b[39m`,
            );
        }

        return console.log(
            `${interaction.user.tag} (${interaction.user.id}) ran \x1b[32m${interaction.commandName}\x1b[39m`,
        );
    }
}
