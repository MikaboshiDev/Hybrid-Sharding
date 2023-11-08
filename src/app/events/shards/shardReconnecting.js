const Discord = require(`discord.js`)
module.exports = {
    name: `shardReconnecting`,
    async execute(client, id) {
        console.log(`[Shard]`.blue, `Shard ${id} is reconnecting to the WebSocket`);
        console.log(`[Shard]`.blue, `Shard ID: ${client.cluster.id}`);
    }
}