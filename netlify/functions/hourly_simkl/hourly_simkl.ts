/* This regularly queries the Simkl API and caches the data to DynamoDB.
 * See also: fetch_simkl.ts
 */

import { Handler, HandlerEvent, HandlerContext, schedule } from "@netlify/functions";
import fetch from 'node-fetch';
import AWS from 'aws-sdk';

const myHandler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  // First fetch from Simkl
  var all_data = {}
  for (let type of ['anime', 'shows', 'movies']) {
    const response = await fetch(`https://api.simkl.com/sync/all-items/${type}/completed`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.SIMKL_ACCESS_TOKEN}`,
        'simkl-api-key': process.env.SIMKL_CLIENT_ID
      }
    });
    const data_type = await response.json();
    all_data[type] = data_type[type];
  }

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
  ddb.putItem(query, function (err, data) {
    if (err) {
      console.log("Error", err);
    } else {
      console.log("Success ", data);
    }
  });

  return {
    statusCode: 200,
  };
};

const handler = schedule("@hourly", myHandler)

export { handler };
