import { Client } from "discord.js";
import { SlashCommandBuilder } from "@discordjs/builders";
import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import { config } from "dotenv";
config();

(async () => {
    const token = process.env.TOKEN as string;
    const devGuildId = process.env.DEVGUILDID as string;

    const client = new Client({ intents: 0 });
    await client.login(token);

    const clientId = client.user?.id as string;

    if (
        token === undefined ||
        devGuildId === undefined ||
        clientId === undefined
    )
        throw new Error("Missing token, dev guild id, or client id");

    const commands = [
        new SlashCommandBuilder()
            .setName("ping")
            .setDescription("Replies with pong!"),
    ]; //.map((command) => command.toJSON());

    const rest = new REST({ version: "9" }).setToken(token);

    rest.put(Routes.applicationGuildCommands(clientId, devGuildId), {
        body: commands,
    })
        .then(() => console.log("Successfully registered guild commands."))
        .catch(console.error);

    rest.put(Routes.applicationCommands(clientId), {
        body: commands,
    })
        .then(() =>
            console.log("Successfully registered application commands."),
        )
        .catch(console.error);
})();
