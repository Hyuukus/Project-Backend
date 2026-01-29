const express = require('express')
const app = express()
const port = 3006
const router=require('./router/router')
const errorHandler=require('./middleware/errorhandler')
app.use(express.json())
app.use('/',router)
app.use(errorHandler)

app.listen(port,()=>{
    console.log(`server running on http://localhost:${port}`)
})