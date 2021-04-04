import { bootstrapServer } from "./app"
import serverlessExpress from "@vendia/serverless-express"
import { APIGatewayProxyHandler } from "aws-lambda"

export const main: APIGatewayProxyHandler = async(event, context, callback) => {
  const app = await bootstrapServer()
  return serverlessExpress({ app })(event, context, callback)
}