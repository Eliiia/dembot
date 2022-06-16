import { Client } from "discord.js";
import { config } from "dotenv";
config();

console.log("\n---\n");

const client = new Client({ intents: 0 });

client.once("ready", () => {
    console.log(`Logged in as ${client.user?.tag}`);
});

client.login(process.env.TOKEN as string);
