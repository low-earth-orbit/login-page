# login-page

A toy project achieving user registration, login, logout, password reset, and contact form submission functionalities.

Click [HERE](https://login.leohong.dev/) for the latest deployed version; You're welcome to test it, but please don't abuse it (e.g. create too many accounts; or fetch the website too many times).

## Architecture

- Static content hosted on S3, fronted by CloudFront for content delivery
- Data in transit encrypted by HTTPS / TLS
- Data at rest handled by AWS-managed encryption
- Backend is a Lambda function fronted by API Gateway
- The Lambda function then stores data in DynamoDB

## Tech Stack

A toy project leveraging some AWS services:

- S3 (static web hosting and website endpoint)
- ACM (for TLS certificate)
- CloudFront (content delivery network)
- Cognito (authentication/user pool)
- API Gateway
- Lambda
- DynamoDB

Plus HTTP, CSS, JavaScript and NodeJS (for Lambda function) as usual.

## Security

- User input validated & sanitized
- Data encrypted in transit (HTTPS) and at rest (by AWS)
- User authentication using Cognito
- JWT for API call
