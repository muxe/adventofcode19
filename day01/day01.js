const { readFile } = require('../helper')
const path = require('path')

const calcFuel = weight => {
  return Math.floor(weight / 3) - 2
}

const calcAllFuel = weight => {
  let total = 0
  let fuel = calcFuel(weight)
  while (fuel > 0) {
    total += fuel
    fuel = calcFuel(fuel)
  }

  return total
}

const fuelSum = async () => {
  const lines = await readFile(path.join(__dirname, './input'))
  const result = lines
    .map(val => Number(val))
    .reduce((acc, cur) => {
      return acc + calcFuel(cur)
    }, 0)
  return result
}

const fuelSumAll = async () => {
  const lines = await readFile(path.join(__dirname, './input'))
  const result = lines
    .map(val => Number(val))
    .reduce((acc, cur) => {
      return acc + calcAllFuel(cur)
    }, 0)
  return result
}

module.exports = {
  calcFuel,
  calcAllFuel,
  fuelSum,
  fuelSumAll
}