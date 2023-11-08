const { Client, Collection, GatewayIntentBits, Partials } = require("discord.js");
const { ClusterClient, getInfo } = require("discord-hybrid-sharding");
const { loadEvents } = require("./structure/handlers");
const chalk = require('chalk');
require("dotenv").config();
const fs = require("fs");
require("colors");

const client = new Client({
    shards: getInfo().SHARD_LIST,
    shardCount: getInfo().TOTAL_SHARDS,
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildScheduledEvents,
    ],
    partials: [
        Partials.User,
        Partials.Channel,
        Partials.GuildMember,
        Partials.Message,
    ],
    allowedMentions: {
        parse: ["roles", "users", "everyone"],
        repliedUser: false,
    },
});

client.commands = new Collection();
client.events = new Collection();
loadEvents(client);

client.cluster = new ClusterClient(client);
client.login(process.env.TOKEN).then(() => {
    console.log(`[Client]`.magenta, `Logged in as ${client.user.tag} (${client.user.id})`);
    console.log(`[Client]`.magenta, `Shard All: ${client.cluster.info.TOTAL_SHARDS}`);
});