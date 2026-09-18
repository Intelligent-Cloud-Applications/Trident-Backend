const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, ScanCommand, PutCommand } = require('@aws-sdk/lib-dynamodb');
require('dotenv').config();

const client = new DynamoDBClient({ region: 'us-east-1' });
const docClient = DynamoDBDocumentClient.from(client);
const TABLE_NAME = process.env.DYNAMODB_TABLE || 'TridentData-prod';

async function fixUrls() {
  const { Items } = await docClient.send(new ScanCommand({ TableName: TABLE_NAME }));
  
  for (let item of Items) {
    let updated = false;
    const itemString = JSON.stringify(item);
    
    // Check if the item contains the old URL format
    if (itemString.includes('https://s3.us-east-1.amazonaws.com/trident-notice/')) {
      // Replace with new virtual-hosted format
      const fixedString = itemString.replace(/https:\/\/s3\.us-east-1\.amazonaws\.com\/trident-notice\//g, 'https://trident-notice.s3.us-east-1.amazonaws.com/');
      const fixedItem = JSON.parse(fixedString);
      
      await docClient.send(new PutCommand({ TableName: TABLE_NAME, Item: fixedItem }));
      console.log(`Fixed item: ${item.title || item.id}`);
      updated = true;
    }
  }
  console.log('Done fixing URLs in database.');
}

fixUrls().catch(console.error);
