/* This is a Netlify function that fetches the latest Simkl data cached in DynamoDB.
 * It serves as the serverless API endpoint for my Simkl feed.
 * I don't directly fetch data from the Simkl API to:
 *  1. avoid rate limits
 *  2. have a backup in case Simkl goes down or changes its API
 * See also: hourly_simkl.ts
 */

import { Handler } from '@netlify/functions'
import AWS from 'aws-sdk';

export const handler: Handler = async (event, context) => {
  const ddb = new AWS.DynamoDB({
    'accessKeyId': process.env.MY_AWS_ACCESS_KEY_ID,
    'secretAccessKey': process.env.MY_AWS_SECRET_KEY
  });

  // Call DynamoDB to get the last item from the table
  params = {
    TableName: 'Simkl',
    Key: { 'Simkl': { S: new Date().toISOString().substring(0, 7) } }
  };
  /*  Wanted to do synchronous "await" version here instead of callback version
  ddb.getItem(params, function (err, data) {
    if (err) {
      console.log("Error", err);
    } else {
      console.log("Success", data.Item);
    }
  });
  */
  const ret = await new Promise((resolve, reject) => ddb.getItem(params, function (err, data) {
    if (err) {
      reject(err);
    } else {
      resolve(data);
    }
  }));

  var data = ret.Item;
  data.simkl_data.S = JSON.parse(data.simkl_data.S);
  console.log(data);

  return {
    statusCode: 200,
    body: JSON.stringify(data),
  }
}
