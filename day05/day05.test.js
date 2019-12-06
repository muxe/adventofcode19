const { execute } = require('./day05')

test('example', () => {
  expect(execute([1002,4,3,4,33])).toEqual([1002,4,3,4,99])
  expect(execute([1101,100,-1,4,0])).toEqual([1101,100,-1,4,99])
})