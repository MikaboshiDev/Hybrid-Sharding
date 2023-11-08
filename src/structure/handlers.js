const { loadFiles } = require("./loader.js");
const chalk = require("chalk");
const fs = require("node:fs");

module.exports = {
    loadCommands: async function (client) {
        await client.commands.clear();
        let commands_array = [];
        const Files = await loadFiles(`src/app/commands`);
        try {
            Files.forEach((file) => {
                const command = require(file);
                client.commands.set(command.data.name, command);
                commands_array.push(command.data.toJSON());
            });
            client.application.commands.set(commands_array);
        } catch (e) {
            console.log(chalk.red(`[ERROR]`), e);
            console.error(e);
        }
    },

    loadEvents: async function (client) {
        client.events = new Map();
        const events = new Array();
        const files = await loadFiles("src/app/events");
        for (const file of files) {
            try {
                const event = require(file);
                const execute = (...args) => event.execute(...args, client);
                const target = events.rest ? client.rest : client;

                target[event.once ? "once" : "on"](event.name, execute);
                client.events.set(event.name, event);
                events.push({ Event: event.name, Status: "✅" });
            } catch (e) {
                events.push({ Event: file, Status: "❌" });
                console.log(chalk.red(`[ERROR]`), e);
                console.error(e);
            }
        }
    },
}