import { APIGatewayProxyResult } from "aws-lambda";

export const createResponse = (
    statusCode: number = 200,
    status: boolean = true,
    body?: object,
    message?: string
): APIGatewayProxyResult => ({
    statusCode,
    headers: {
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Origin': process.env.CORS_ORIGIN,
        'Access-Control-Allow-Methods': 'GET,PUT,PATCH,POST,DELETE,OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, X-Requested-With, X-HTTP-Method-Override, Origin, Accept, Authorization, file-name, file-mime-type',
    },
    body: JSON.stringify({ status, message, ...body }),
})
