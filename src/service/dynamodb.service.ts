import AWS from "aws-sdk"
import { Injectable } from "@nestjs/common"

AWS.config.update({
  region: process.env.AWS_REGION,
})

const db = new AWS.DynamoDB({
  endpoint: process.env.DYNAMODB_ENDPOINT
})

const doc = new AWS.DynamoDB.DocumentClient({
  endpoint: process.env.DYNAMODB_ENDPOINT
})

@Injectable()
export class DynamoDBService {
  public db = db
  public doc = doc
}
