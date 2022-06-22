/**
 * Redis memory cache
 * This Service connects with Redis cache to get the desired data.
 * The data is mapped to desired format and returned.
 */

const Redis = require("redis");
const config = require("../config/config");

module.exports = {
  redisConnection: async function (redisKey) {
    console.log("RedisKey", redisKey);
    return new Promise(async (resolve, reject) => {
      const redisClient = await Redis.createClient(config.redisConfig);
      redisClient.connect();
      redisClient.on("error", (err) => {
        console.log("*** redisService|reddiConnectFailure ***", err);
        reject("Could Not Create Redis Client");
      });
      redisClient.on("connect", async () => {
        const redisData = await redisClient.get(redisKey);
        if (redisData != null) {
          resolve(JSON.parse(redisData));
        } else {
          resolve(null);
        }
      });
    });
  },
  redisSetData: async function (redisKey, redisData) {
    const redisClient = await Redis.createClient(config.redisConfig);
    redisClient.connect();
    redisClient.setEx(redisKey, 300, JSON.stringify(redisData));
  },
};
