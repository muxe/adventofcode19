const { passwordMatches, part1, passwordMatches2, part2 } = require('./day04')

test('example cases', () => {
  expect(passwordMatches(111111)).toBe(true)
  expect(passwordMatches(223450)).toBe(false)
  expect(passwordMatches(123789)).toBe(false)
})

test('part1', () => {
  expect(part1(145852, 616942)).toBe(1767)
})

test('example cases 2', () => {
  expect(passwordMatches2(112233)).toBe(true)
  expect(passwordMatches2(123444)).toBe(false)
  expect(passwordMatches2(111122)).toBe(true)
})

test('part1', () => {
    expect(part2(145852, 616942)).toBe(1192)
  })