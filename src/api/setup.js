const { v4: uuidv4 } = require("uuid");
const { dynamoDb, USERS_TABLE } = require("../lib/dynamodb");

const setupTestUsers = async (req, res) => {
  try {
    // Create sample users for testing
    const users = [
      {
        advisorId: uuidv4(),
        email: "advisor1@example.com",
        name: "John Advisor",
        password: "placeholder",
      },
      {
        advisorId: uuidv4(),
        email: "advisor2@example.com",
        name: "Sarah Advisor",
        password: "placeholder",
      },
    ];

    // Add each user to DynamoDB
    for (const user of users) {
      const params = {
        TableName: USERS_TABLE,
        Item: user,
      };

      await dynamoDb.put(params).promise();
    }

    res.status(200).json({ message: "Test users created", users });
  } catch (error) {
    console.error("Setup error:", error);
    res.status(500).json({ message: "Setup failed", error: error.message });
  }
};

module.exports = setupTestUsers;
