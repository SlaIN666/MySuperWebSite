const express = require('express')
const app = express()

const port = process.env.port || 3000

app.use(express.static(__dirname + "/styles"))
app.use(express.static(__dirname + "/scripts"))
app.use(express.json({limit: '1mb'}))

app.post('/send', (req, res) => {
  let data = req.body.data
  let sum = []

  data.split('').map(el => {
      el = el.toLowerCase()
      sum[el] = !sum[el] ? 1 : sum[el]+1
  })

  let str =[]
  for (let [key, value] of Object.entries(sum)) {
      str += [value, key].join('')      
  }
  
  res.json(str)

})

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`)
})
