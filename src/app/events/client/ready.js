const { ChatInputCommandInteraction, Client } = require("discord.js");
const { loadCommands } = require("../../../structure/handlers");
module.exports = {
    name: "ready",
    once: true,
    async execute(interaction, client) {
        loadCommands(client);
        console.log(`[Commands]`.green, `Loaded ${client.commands.size} commands`);
}}