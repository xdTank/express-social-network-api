import { app } from "./app"
import { run } from "./db"
const port = process.env.PORT || 5000
const startApp = async () => {
  await run()
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
}

startApp()