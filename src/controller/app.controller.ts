import { Controller, Get } from "@nestjs/common";
import { CreateTableInput, DocumentClient } from "aws-sdk/clients/dynamodb";
import { DynamoDBService } from "../service";
import fs from "fs"
import path from "path"

const exampleTableName = "Movies"
const exampleTableDescription: CreateTableInput = {
  TableName : exampleTableName,
  KeySchema: [
      { AttributeName: "year", KeyType: "HASH"},  //Partition key
      { AttributeName: "title", KeyType: "RANGE" }  //Sort key
  ],
  AttributeDefinitions: [       
      { AttributeName: "year", AttributeType: "N" },
      { AttributeName: "title", AttributeType: "S" }
  ],
  BillingMode: "PAY_PER_REQUEST",
}

@Controller("table")
export class AppController {
  constructor(
    private dynamodbService: DynamoDBService,
  ) {}

  @Get()
  async getTable() {
    return this.dynamodbService.db
    .describeTable({ TableName: exampleTableName })
    .promise()
    .catch((e) => e)
  }
  
  @Get("create")
  async createTable() {
    return this.dynamodbService.db
    .createTable(exampleTableDescription)
    .promise()
    .catch((e) => e)
  }

  @Get("delete")
  async deleteTable() {
    return this.dynamodbService.db
    .deleteTable({ TableName: exampleTableName })
    .promise()
    .catch((e) => e)
  }

  @Get("load")
  async loadTable() {
    const allMovies = JSON.parse(
      fs.readFileSync(path.resolve(__dirname, "./moviedata.json"), "utf-8")
    ) as Movie[]

    console.log(allMovies.length)
    let count = 0

    let error
    const exists = await this.dynamodbService.db
      .describeTable({TableName: exampleTableName})
      .promise()
      .catch((e) => {
        error = e
        return null
      })

    if (!exists) return error

    return Promise.all(
      allMovies.map((movie, i) => {
        
        return this.dynamodbService.doc.put({
          TableName: exampleTableName,
          Item: movie
        }).promise()
        .then((value) => {
          console.log(count += 1)
          return value
        })
      })
    )
  }

}

export interface Movie {
  year:  number;
  title: string;
  info:  Info;
}

export interface Info {
  directors?:         string[];
  release_date?:      string;
  rating?:            number;
  genres?:            Genre[];
  image_url?:         string;
  plot?:              string;
  rank:               number;
  running_time_secs?: number;
  actors?:            string[];
}

export enum Genre {
  Action = "Action",
  Adult = "Adult",
  Adventure = "Adventure",
  Animation = "Animation",
  Biography = "Biography",
  Comedy = "Comedy",
  Crime = "Crime",
  Documentary = "Documentary",
  Drama = "Drama",
  Family = "Family",
  Fantasy = "Fantasy",
  FilmNoir = "Film-Noir",
  History = "History",
  Horror = "Horror",
  Music = "Music",
  Musical = "Musical",
  Mystery = "Mystery",
  News = "News",
  Romance = "Romance",
  SciFi = "Sci-Fi",
  Sport = "Sport",
  Thriller = "Thriller",
  War = "War",
  Western = "Western",
}


export default AppController