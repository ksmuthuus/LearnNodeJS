const fs = require('fs')

const fileName = '1-json.json'

const fileBuffer = fs.readFileSync(fileName)
const fileContent = fileBuffer.toString()
const data = JSON.parse(fileContent)

//Change Data
data.name = 'Muthu'
data.Age = '40'

const dataJSON = JSON.stringify(data)
fs.writeFileSync(fileName, dataJSON)