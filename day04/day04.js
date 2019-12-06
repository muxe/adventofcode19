const passwordMatches = (input) => {
  const inputAsString = input.toString()
  if (inputAsString.length !== 6) {
    // console.log('not 6 digits', input)
    return false
  }
  // Two adjacent digits are the same
  let hasDouble = false
  let lastNum = null
  for (let i = 0; i < inputAsString.length; i++) {
    const number = Number(inputAsString[i])
    if (lastNum === number) {
      hasDouble = true
    }
    if (number < lastNum) {
      // console.log('not descreasing', input)
      return false
    }
    lastNum = number
  }
  if (!hasDouble) {
    // console.log('not double', input)
  }
  return hasDouble
}

const passwordMatches2 = (input) => {
  const inputAsString = input.toString()
  if (inputAsString.length !== 6) {
    // console.log('not 6 digits', input)
    return false
  }
  // Two adjacent digits are the same
  let doubleCount = 0
  let hasDouble = false
  let lastNum = null
  for (let i = 0; i < inputAsString.length; i++) {
    const number = Number(inputAsString[i])
    if (lastNum === number) {
      doubleCount++
    } else {
      if (doubleCount === 1) {
        hasDouble = true
      }
      doubleCount = 0
    }
    if (number < lastNum) {
      return false
    }
    lastNum = number
  }
  if (doubleCount === 1) {
    hasDouble = true
  }
  return hasDouble
}

const part1 = (min, max) => {
  let validCount = 0
  for (let i = min; i <= max; i++) {
    if (passwordMatches(i)) {
      validCount++
    }
  }
  return validCount
}

const part2 = (min, max) => {
  let validCount = 0
  for (let i = min; i <= max; i++) {
    if (passwordMatches2(i)) {
      validCount++
    }
  }
  return validCount
}

module.exports = {
  passwordMatches,
  passwordMatches2,
  part1,
  part2
}