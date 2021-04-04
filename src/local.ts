import {bootstrapServer} from "./app"

const PORT = process.env.PORT || 3000;

(async() => {
  const app = await bootstrapServer()
  app.listen(PORT, () => {
    console.log(`Server started listening on ${PORT}`)
  })
})()