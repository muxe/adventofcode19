const fs = require('fs')

const defaultParser = data => {
  return data.split('\n')
}

const readFile = async (filePath, parser = defaultParser) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', async (err, data) => {
      if (err) {
        return reject(err)
      }
      const parsed = await parser(data)
      return resolve(parsed)
    })
  })
}

module.exports = {
  readFile
}