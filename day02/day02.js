const { readFile } = require('../helper')
const path = require('path')

const execute = (input) => {
  for (let i = 0; i < input.length; i += 4) {
    const command = input[i]
    if (command === 1) {
      input[input[i + 3]] = input[input[i + 1]] + input[input[i + 2]]
    } else if (command === 2) {
      input[input[i + 3]] = input[input[i + 1]] * input[input[i + 2]]
    } else if (command === 99) {
      return input
    } else {
      throw new Error('Invalid Command')
    }
  }
  throw new Error('Program does not exit correctly')
}

const executeWithReplace = (input, noun, verb) => {
  const copy = [...input]
  copy[1] = noun
  copy[2] = verb
  const result = execute(copy)
  return result[0]
}

const part1 = async () => {
  const numbers = await readFile(path.join(__dirname, './input'), (data) => {
    return data.split(',').map(value => Number(value.trim()))
  })
  return executeWithReplace(numbers, 12, 2)
}

const part2 = async (searchResult = 19690720) => {
  const numbers = await readFile(path.join(__dirname, './input'), (data) => {
    return data.split(',').map(value => Number(value.trim()))
  })

  for (let noun = 0; noun < 100; noun++) {
    for (let verb = 0; verb < 100; verb++) {
      const result = executeWithReplace(numbers, noun, verb)
      if (result === searchResult) {
        return 100 * noun + verb
      }
    }
  }
  throw new Error('No combination found')
}

module.exports = {
  execute,
  part1,
  part2
}