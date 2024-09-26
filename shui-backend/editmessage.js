const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.editMessage = async (event) => {
  const data = JSON.parse(event.body);

  if (!data.id || !data.text) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "ID and text are required" }),
    };
  }

  const params = {
    TableName: process.env.TABLE_NAME,
    Key: {
      id: data.id,
    },
    UpdateExpression: 'SET text = :text',
    ExpressionAttributeValues: {
      ':text': data.text,
    },
    ReturnValues: 'UPDATED_NEW',
  };

  try {
    const result = await dynamoDb.update(params).promise();
    if (!result.Attributes) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: "Message not found" }),
      };
    }
    return {
      statusCode: 200,
      body: JSON.stringify(result.Attributes),
    };
  } catch (error) {
    console.error("Error editing message:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Could not edit message" }),
    };
  }
};
