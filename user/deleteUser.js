const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const { sendResponse } = require("../functions");
const TABLE_NAME = 'Users';

module.exports.delete = async (event) => {
    const { id } = event.pathParameters;

    const params = {
        TableName: TABLE_NAME,
        Key: { id }
    };

    try {
        await dynamoDb.delete(params).promise();
        return sendResponse({
            statusCode: 204,
            body: JSON.stringify({ message: 'User deleted successfully' }),
        });
    } catch (error) {
        return sendResponse({
            statusCode: 500,
            body: JSON.stringify({ error: 'Could not delete user' }),
        });
    }
};