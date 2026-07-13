/**
 * DynamoDB Service Layer
 */
const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const {
  DynamoDBDocumentClient,
  QueryCommand,
  PutCommand,
  UpdateCommand,
} = require('@aws-sdk/lib-dynamodb');

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);
const TABLE_NAME = process.env.TABLE_NAME || 'TridentData-prod';

async function queryItemsByType(type) {
  const command = new QueryCommand({
    TableName: TABLE_NAME,
    KeyConditionExpression: 'PK = :pk',
    ExpressionAttributeValues: {
      ':pk': `TYPE#${type}`,
    },
  });

  const response = await docClient.send(command);
  const activeItems = (response.Items || []).filter((item) => !item.isArchived);
  activeItems.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  return activeItems;
}

async function putItem(item) {
  const command = new PutCommand({
    TableName: TABLE_NAME,
    Item: item,
  });
  await docClient.send(command);
  return item;
}

async function updateItemFields(id, type, fieldsToUpdate) {
  const timestamp = new Date().toISOString();
  let UpdateExpression = 'set updatedAt = :updatedAt';
  let ExpressionAttributeValues = { ':updatedAt': timestamp };
  let ExpressionAttributeNames = {};

  for (const [key, value] of Object.entries(fieldsToUpdate)) {
    if (value !== undefined && key !== 'id' && key !== 'PK' && key !== 'SK') {
      UpdateExpression += `, #f_${key} = :v_${key}`;
      ExpressionAttributeNames[`#f_${key}`] = key;
      ExpressionAttributeValues[`:v_${key}`] = value;
    }
  }

  const command = new UpdateCommand({
    TableName: TABLE_NAME,
    Key: {
      PK: `TYPE#${type}`,
      SK: `ID#${id}`,
    },
    UpdateExpression,
    ExpressionAttributeNames,
    ExpressionAttributeValues,
    ReturnValues: 'ALL_NEW',
  });

  const response = await docClient.send(command);
  return response.Attributes;
}

async function archiveItemById(id, type) {
  const command = new UpdateCommand({
    TableName: TABLE_NAME,
    Key: {
      PK: `TYPE#${type}`,
      SK: `ID#${id}`,
    },
    UpdateExpression: 'set isArchived = :true, updatedAt = :updatedAt',
    ExpressionAttributeValues: {
      ':true': true,
      ':updatedAt': new Date().toISOString(),
    },
    ReturnValues: 'ALL_NEW',
  });

  await docClient.send(command);
  return { id, isArchived: true };
}

module.exports = {
  queryItemsByType,
  putItem,
  updateItemFields,
  archiveItemById,
};
