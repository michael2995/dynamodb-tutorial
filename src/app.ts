import "reflect-metadata"
import "source-map-support"
import "./config"

import express, {Express} from "express"
import { NestFactory } from "@nestjs/core"
import { ExpressAdapter } from "@nestjs/platform-express"

import { AppModule } from "./module"

let app: Express
export const bootstrapServer = async() => {
  if (!app) {
    const expressApp = express()
    const nestApp = await NestFactory.create(AppModule, new ExpressAdapter(expressApp))
    nestApp.use(express.json())
    nestApp.use(express.text({type: "html/text"}))
    nestApp.use(express.urlencoded({extended: false}))
    await nestApp.init()
    app = expressApp
  }
  return app
}