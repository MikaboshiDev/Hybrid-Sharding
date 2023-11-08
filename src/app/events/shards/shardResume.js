const Discord = require(`discord.js`)
module.exports = {
    name: `shardResume`,
    async execute(client, id, replayedEvents) {
        console.log(`[Shard]`.blue, `Shard ${id} has resumed with ${replayedEvents} replayed events`);
    }
}