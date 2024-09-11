const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const { sendResponse } = require("../functions");
const TABLE_NAME = 'Users';

module.exports.get = async (event) => {
    const { id } = event.pathParameters;

    const params = {
        TableName: TABLE_NAME,
        Key: { id }
    };

    try {
        const result = await dynamoDb.get(params).promise();
        if (result.User) {
            return sendResponse({
                statusCode: 200,
                body: JSON.stringify(result.User),
            });
        } else {
            return sendResponse({
                statusCode: 404,
                body: JSON.stringify({ error: 'User not found' }),
            });
        }
    } catch (error) {
        return sendResponse({
            statusCode: 500,
            body: JSON.stringify({ error: 'Could not retrieve user' }),
        });
    }
};
