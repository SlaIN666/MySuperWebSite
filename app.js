const express = require('express')
const app = express()

const PORT = process.env.PORT || 3000

app.use(express.static(__dirname + "/styles"))
app.use(express.static(__dirname + "/scripts"))
app.use(express.json({limit: '1mb'}))

app.post('/send', (req, res) => {
  let data = req.body.data
  let sum = data.split('')
  let c = 1
  
  for (let i = 0; i < sum.length; i++) {
    if(sum[i+1] == sum[i]) {
        c++
    } else {
        sum[i] = c+sum[i]
        c = 1
    }
  }

  let result = sum.filter(el => el.length == 2).join('')

  res.json(result)
})

app.get('*', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

app.listen(PORT, () => {
  console.log(`app listening at http://localhost:${PORT}`)
})
