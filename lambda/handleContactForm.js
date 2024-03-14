export const handler = async (event) => {
  console.log("Received event:", JSON.stringify(event, null, 2));
  let responseBody = { message: "Form submitted successfully!" };
  let responseCode = 200;

  const decodedToken = decode(event.headers.Authorization.split(" ")[1]);
  const username = decodedToken["cognito:username"];

  return {
    statusCode: responseCode,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(responseBody),
  };
};
