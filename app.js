const express = require('express')
const app = express()

const PORT = process.env.PORT || 3000

app.use(express.static(__dirname + "/styles"))
app.use(express.static(__dirname + "/scripts"))
app.use(express.json({limit: '1mb'}))

app.post('/send', (req, res) => {
  let data = req.body.data
  let sum = data.split('')

  function symbolCounter (array) {    
    let c = 1
  
    for (let i = 0; i < array.length; i++) {
      if(array[i+1] == array[i]) {
          c++
      } else {
        array[i] = c+array[i]
          c = 1
      }
    }

    return array.filter(el => el.length == 2).join('')    
  }
  
  let result = symbolCounter(sum)
  res.json(result)
})

app.get('*', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

app.listen(PORT, () => {
  console.log(`app listening at http://localhost:${PORT}`)
})