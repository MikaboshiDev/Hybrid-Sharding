const Discord = require(`discord.js`)
module.exports = {
    name: `shardDisconnect`,
    async execute(client, event, id) {
        console.log(`[Shard]`.blue, `Shard ${id} has disconnected with event: ${event}`);
        console.log(`[Shard]`.blue, `Shard ID: ${client.cluster.id}`);
    }
}