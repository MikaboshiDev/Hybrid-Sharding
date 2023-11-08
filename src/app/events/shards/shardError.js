const Discord = require(`discord.js`)
module.exports = {
    name: `shardError`,
    async execute(client, error, shardID) {
        console.log(`[Shard]`.blue, `Shard ${shardID} has encountered an error: ${error}`);
        console.log(`[Shard]`.blue, `Shard ID: ${client.cluster.id}`);
    }
}