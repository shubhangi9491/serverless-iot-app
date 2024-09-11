const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const { sendResponse } = require("../functions");
const TABLE_NAME = 'Users';

module.exports.update = async (event) => {
    const { id } = event.pathParameters;
    const { data } = JSON.parse(event.body);

    const params = {
        TableName: TABLE_NAME,
        Key: { id },
        UpdateExpression: 'set data = :data',
        ExpressionAttributeValues: { ':data': data },
        ReturnValues: 'ALL_NEW'
    };

    try {
        const result = await dynamoDb.update(params).promise();
        return sendResponse({
            statusCode: 200,
            body: JSON.stringify(result.Attributes),
        });
    } catch (error) {
        return sendResponse({
            statusCode: 500,
            body: JSON.stringify({ error: 'Could not update user' }),
        });
    }
};
