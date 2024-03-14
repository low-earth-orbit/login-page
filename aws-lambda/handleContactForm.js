import { randomUUID as uuid } from "crypto";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const dynamo = DynamoDBDocumentClient.from(client);
const tableName = "LoginPageContactFormSubmissions";

export const handler = async (event) => {
  console.log("Received event:", JSON.stringify(event, null, 2));

  // Parse the body
  let body = JSON.parse(event.body);

  // Get the username and additional data from the event object
  const username = body.username;
  const title = body.title;
  const message = body.message;

  let statusCode = 200;
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "https://login.leohong.dev",
  };

  try {
    switch (event.routeKey) {
      case "POST /submit-form":
        await dynamo.send(
          new PutCommand({
            TableName: tableName,
            Item: {
              id: uuid(), // Generate a UUID for the entry
              username: username,
              title: title,
              message: message,
              submittedAt: new Date().toISOString(), // Timestamp for the submission
            },
          })
        );
        body = "Form submitted successfully!";
        break;
      default:
        throw new Error(`Unsupported route: "${event.routeKey}"`);
    }
  } catch (err) {
    statusCode = 400;
    body = err.message;
  } finally {
    body = JSON.stringify(body);
  }

  return {
    statusCode,
    body,
    headers,
  };
};
