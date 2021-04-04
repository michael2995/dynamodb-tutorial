import { Module } from "@nestjs/common";
import { AppController } from "../controller";
import { DynamoDBService } from "../service";

@Module({
  providers: [DynamoDBService],
  controllers: [AppController]
})
export class AppModule {}