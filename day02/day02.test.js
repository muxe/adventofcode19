const { execute, part1, part2 } = require('./day02')

test('does example cases', async () => {
  expect(execute([1,0,0,0,99])).toEqual([2,0,0,0,99])
  expect(execute([2,3,0,3,99])).toEqual([2,3,0,6,99])
  expect(execute([2,4,4,5,99,0])).toEqual([2,4,4,5,99,9801])
  expect(execute([1,1,1,4,99,5,6,0,99])).toEqual([30,1,1,4,2,5,6,0,99])
})

test('does part1', async () => {
  const result = await part1()
  expect(result).toEqual(5305097)
})

test('does part2', async () => {
  const result = await part2()
  expect(result).toEqual(4925)
})