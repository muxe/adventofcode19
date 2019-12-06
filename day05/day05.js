const { readFile } = require('../helper')
const path = require('path')

const readline = require('readline')
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const readInput = () => {
  return new Promise((resolve, reject) => {
    rl.question("Input:", function(readString) {
      return resolve(readString)
    })
  })
}

const execute = async (input) => {
  let i = 0
  while (i < input.length) {
    console.log('i', i)
    const command = input[i].toString().padStart(5, '0')
    const opcode = Number(command.slice(3))
    const modes = [Number(command[2]), Number(command[1]), Number(command[0])]
    // console.log('command', command, opcode, modes)

    if (opcode === 1) {
      // addition
      const param0 = modes[0] === 0 ? input[input[i + 1]] : input[i + 1]
      const param1 = modes[1] === 0 ? input[input[i + 2]] : input[i + 2]
      const param2 = modes[1] === 0 ? input[input[i + 3]] : input[i + 3]
      input[param2] = param0 + param1
      i+=4
    } else if (opcode === 2) {
      // multi
      const param0 = modes[0] === 0 ? input[input[i + 1]] : input[i + 1]
      const param1 = modes[1] === 0 ? input[input[i + 2]] : input[i + 2]
      const param2 = modes[1] === 0 ? input[input[i + 3]] : input[i + 3]
      input[param2] = param0 * param1
      i+=4
    } else if (opcode === 3) {
      // input
      const readString = await readInput()
      const input1 = Number(readString)
      const param0 = modes[0] === 0 ? input[input[i + 1]] : input[i + 1]
      input[param0] = input1
      i+=2
    } else if (opcode === 4) {
      // output
      const param0 = modes[0] === 0 ? input[input[i + 1]] : input[i + 1]
      console.log('OUTPUT:', param0)
      i+=2
    } else if (opcode === 99) {
      return input
    }
  }
  throw new Error('Does not exit')
}

const part1 = async () => {
  const numbers = await readFile(path.join(__dirname, './input'), (data) => {
    return data.split(',').map(value => Number(value.trim()))
  })
  return execute(numbers)
}

module.exports = {
  execute,
  part1
}