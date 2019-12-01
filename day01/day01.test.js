const { fuelSum, calcFuel, calcAllFuel, fuelSumAll } = require('./day01')

test('calcs simple fuel', async () => {
  expect(calcFuel(12)).toBe(2)
  expect(calcFuel(14)).toBe(2)
  expect(calcFuel(1969)).toBe(654)
  expect(calcFuel(100756)).toBe(33583)
})

test('right fuel sum', async () => {
  expect(await fuelSum()).toBe(3454942)
})

test('calcs fuel of fuel', async () => {
  expect(calcAllFuel(14)).toBe(2)
  expect(calcAllFuel(1969)).toBe(966)
  expect(calcAllFuel(100756)).toBe(50346)
})

test('calcs fuel sum with fuel of fuel', async () => {
  expect(await fuelSumAll()).toBe(5179544)
})