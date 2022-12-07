/* This regularly queries the Simkl API and caches the data to DynamoDB.
 * See also: fetch_simkl.ts
 */

import { Handler, HandlerEvent, HandlerContext, schedule } from "@netlify/functions";
import fetch from 'node-fetch';
import AWS from 'aws-sdk';

const myHandler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  console.log('I am inside the scheduled event handler');
  // First fetch from Simkl
  var all_data = {anime: {}, shows: {}, movies: {}}
  for (let status of ['completed', 'watching', 'plan_to_watch', 'hold', 'dropped']) {
    for (let type of ['anime', 'shows', 'movies']) {
      const response = await fetch(`https://api.simkl.com/sync/all-items/${type}/${status}?episode_watched_at=yes`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.SIMKL_ACCESS_TOKEN}`,
          'simkl-api-key': process.env.SIMKL_CLIENT_ID
        }
      });
      console.log(`Making request for ${status} ${type}`)
      const data_type = await response.json();
      if (!data_type) {
        console.log(`Found no ${status} ${type}`)
        continue;
      }
      all_data[type][status] = data_type[type];
      console.log(`Found ${data_type[type].length} ${status} ${type} items`)
      // console.log('simkl response:', response);
      // console.log('simkl response:', data_type);
    }
  }
  console.log('simkl data:', all_data);

  // Now upload to AWS
  const ddb = new AWS.DynamoDB({
    'accessKeyId': process.env.MY_AWS_ACCESS_KEY_ID,
    'secretAccessKey': process.env.MY_AWS_SECRET_KEY
  });
  // console.log(ddb);
  // Call DynamoDB to add the item to the table
  const query = {
    TableName: 'Simkl',
    Item: {
      'Simkl': { S: new Date().toISOString().substring(0, 7) }, // Save with year and month
      'FullDate': { N: Date.now().toString() },
      'simkl_data': { S: JSON.stringify(all_data) }
    }
  };
  /*  Wanted to do synchronous "await" version here instead of callback version
  ddb.putItem(query, function (err, data) {
    if (err) {
      console.log("Error", err);
    } else {
      console.log("Success ", data);
    }
  });
  */
  console.log("about to upload to dynamodb");
  await new Promise((resolve, reject) => ddb.putItem(query, function (err, data) {
    if (err) {
      reject(err);
    } else {
      resolve(data);
    }
  }));
  console.log("uploaded to dynamodb");

  return {
    statusCode: 200,
  };
};

const handler = schedule("@hourly", myHandler)

export { handler };
