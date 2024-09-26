const { v4: uuidv4 } = require('uuid');
const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.postMessage = async (event) => {
  const data = JSON.parse(event.body);

  if (!data.username || !data.text) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Username and text are required" }),
    };
  }

  const params = {
    TableName: process.env.TABLE_NAME,
    Item: {
      id: uuidv4(),
      username: data.username,
      text: data.text,
      createdAt: new Date().toISOString(),
    },
  };

  try {
    await dynamoDb.put(params).promise();
    return {
      statusCode: 201,
      body: JSON.stringify(params.Item),
    };
  } catch (error) {
    console.error("Error posting message:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Could not post message" }),
    };
  }
};
