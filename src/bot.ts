import { Client } from "discord.js"
import { readdirSync } from "fs"
import { token } from "./config.json"

console.log("\n---\n")

const client = new Client({ intents: 0 })

client.once("ready", () => {
    console.log(`Logged in as ${client.user?.tag}`)
})

client.login(token)