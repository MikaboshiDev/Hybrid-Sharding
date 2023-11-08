const { ClusterManager, ReClusterManager, HeartbeatManager, fetchRecommendedShards } = require("discord-hybrid-sharding");
const chalk = require('chalk');
const shardsPerClusters = 16;
require("dotenv").config();
require("colors");

const config = {
    totalShards: 6,
    shardsPerClusters: shardsPerClusters,
    totalClusters: 6,
    mode: "process",
    token: process.env.TOKEN,
    restarts: {
        max: 5,
        interval: 60 * 60000,
    },
    heartbeat: {
        interval: 2000,
        maxMissedHeartbeats: 5,
    }
};

const manager = new ClusterManager("./src/client.js", config);
manager.extend(new HeartbeatManager(config.heartbeat));
manager.extend(new ReClusterManager());
manager.on("debug", (message) => console.log(`[Cluster]`.blue, message));
manager.on('clusterCreate', cluster => {
    cluster.on('message', message => {
        console.log(message);
        if (message._type !== messageType.CUSTOM_REQUEST) return;
        console.log(`[Cluster]`.blue, `Received message from client: ${message.content}`);
    });
    setInterval(() => {
        cluster.send({ content: 'I am alive' });
        cluster.request({ content: 'Are you alive?', alive: true }).then(e => console.log(e));
    }, 5000);
});
async function spawnClusters() {
    await manager.spawn(undefined, undefined, -1).then(() => {
        setInterval(async () => {
            await manager.broadcastEval(`this.ws.status && this.isReady() ? this.ws.reconnect() : 0`);
        }, 60000);
    });
    setInterval(reclusterShards, 24 * 60 * 60 * 1000);
}

async function reclusterShards() {
    try {
        const recommendedShards = await fetchRecommendedShards(config.token);

        if (recommendedShards !== manager.totalShards) {
            const reclusterConfig = {
                restartMode: "gracefulSwitch",
                totalShards: recommendedShards,
                shardsPerClusters: shardsPerClusters,
                shardList: null,
                shardClusterList: null,
            };
            manager.recluster.start(reclusterConfig);
        }
    } catch (error) {
        console.log(`[Cluster]`.blue, `Error en reclusterShards: ${error}`);
        console.error(error);
    }
}
spawnClusters();
