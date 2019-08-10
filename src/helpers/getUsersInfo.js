import userInfo from "../api/twitchTV";

// bluebird library (Promise.mapSeries) for handling multiple async requests - http://bluebirdjs.com/docs/api/promise.mapseries.html
import {Promise} from "bluebird";

// const users = ["ESL_SC2", "freecodecamp", "RobotCaleb", "Orange_HS"];

const users = [
  "ESL_SC2",
  "cretetion",
  "freecodecamp",
  "storbeck",
  "habathcx",
  "OgamingSC2",
  "RobotCaleb",
  "noobs2ninjas",
  "Orange_HS",
  "Rainbow6",
  "Ninja",
  "MOONMOON_OW"
];

 const getUsersInfo = async () => {

  return await Promise.mapSeries(users, async (user) => {
    return await userInfo(user)
  } )
    // let result = await users.reduce(async (acc, user) => {
    //   let accumulator = await acc;
    //   const info = await userInfo(user);
     
    //   accumulator = [...accumulator, info];
    //   return Promise.resolve(accumulator);
    // }, Promise.resolve([]));

    // return result;
  };

  export default getUsersInfo