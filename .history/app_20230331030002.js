const express = require('express')
const app = express()
const port = 3000

const cors = require("cors")
app.use(cors()) //跨域
app.use(express.urlencoded({
  extended: false
}))

const userrouter = require("./router/user")
app.use("/user", userrouter)

const cepingrouter = require("./router/ceping")
app.use("/ceping", cepingrouter)

const goodrouter = require("./router/good")
app.use("/good", goodrouter)

const shenqingrouter = require("./router/shenqing")
app.use("/shenqing", shenqingrouter)


app.listen(port, () => console.log(`Example app listening on port ${port}!`))