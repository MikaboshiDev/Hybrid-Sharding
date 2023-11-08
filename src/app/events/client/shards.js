const Discord = require(`discord.js`)
module.exports = {
    name: `ready`,
    async execute(client) {
        setInterval(() => {
            client.cluster.fetchClientValues(`ws.ping`).then(pings => {
                console.log(`[Shard]`.blue, `Shard ${client.cluster.id} has pinged ${pings}ms to the WebSocket`);
                console.log(`[Shard]`.blue, `Shard total ping: ${pings.reduce((prev, p) => prev + p, 0) / client.cluster.info.TOTAL_SHARDS}ms`);
                console.log(`[Shard]`.blue, `Shard All: ${client.cluster.info.TOTAL_SHARDS}`);
            })
        }, 300000) // 5 minutes
    }
}