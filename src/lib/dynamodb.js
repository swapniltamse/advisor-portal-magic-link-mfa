// src/lib/dynamodb.js
const AWS = require("aws-sdk");

// Configure AWS SDK
AWS.config.update({
  region: process.env.AWS_REGION || "us-east-1",
});

// Create DynamoDB document client
const dynamoDb = new AWS.DynamoDB.DocumentClient();

// Table name - read from environment variable
const USERS_TABLE = process.env.USERS_TABLE || "insurance-advisors-dev";

// Helper functions for common DynamoDB operations
const dynamoDbHelpers = {
  // Get user by email
  getUserByEmail: async (email) => {
    const params = {
      TableName: USERS_TABLE,
      IndexName: "EmailIndex",
      KeyConditionExpression: "email = :email",
      ExpressionAttributeValues: {
        ":email": email,
      },
    };

    const result = await dynamoDb.query(params).promise();
    return result.Items.length > 0 ? result.Items[0] : null;
  },

  // Get user by reset token
  getUserByToken: async (token) => {
    const params = {
      TableName: USERS_TABLE,
      IndexName: "TokenIndex",
      KeyConditionExpression: "resetToken = :token",
      ExpressionAttributeValues: {
        ":token": token,
      },
    };

    const result = await dynamoDb.query(params).promise();
    return result.Items.length > 0 ? result.Items[0] : null;
  },

  // Save reset token to user
  saveResetToken: async (userId, token, expiry) => {
    const params = {
      TableName: USERS_TABLE,
      Key: {
        advisorId: userId,
      },
      UpdateExpression: "set resetToken = :token, resetTokenExpiry = :expiry",
      ExpressionAttributeValues: {
        ":token": token,
        ":expiry": expiry,
      },
      ReturnValues: "UPDATED_NEW",
    };

    return dynamoDb.update(params).promise();
  },

  // Update password and clear token
  updatePassword: async (userId, password) => {
    const params = {
      TableName: USERS_TABLE,
      Key: {
        advisorId: userId,
      },
      UpdateExpression:
        "remove resetToken, resetTokenExpiry, set password = :password",
      ExpressionAttributeValues: {
        ":password": password,
      },
    };

    return dynamoDb.update(params).promise();
  },
};

module.exports = {
  dynamoDb,
  USERS_TABLE,
  ...dynamoDbHelpers,
};
