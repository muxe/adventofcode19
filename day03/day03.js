const { readFile } = require('../helper')
const path = require('path')

const getCoordinates = lineDescs => {
  const coordinates = []
  let totalSteps = 0
  coordinates.push({x: 0, y: 0, step: 0})
  for (let i = 0; i < lineDescs.length; i++) {
    const lineDesc = lineDescs[i]
    const regex = /^(D|U|R|L)(\d*)$/gm;
    const matches = regex.exec(lineDesc)
    const direction = matches[1]
    const distance = Number(matches[2])
    if (direction === 'R') {
      for (let j = 0; j < distance; j++) {
        totalSteps++
        const lastPos = coordinates[coordinates.length - 1]
        coordinates.push({x: lastPos.x + 1, y: lastPos.y, step: totalSteps})
      }
    } else if (direction === 'U') {
      for (let j = 0; j < distance; j++) {
        totalSteps++
        const lastPos = coordinates[coordinates.length - 1]
        coordinates.push({x: lastPos.x, y: lastPos.y - 1, step: totalSteps})
      }
    } else if (direction === 'L') {
      for (let j = 0; j < distance; j++) {
        totalSteps++
        const lastPos = coordinates[coordinates.length - 1]
        coordinates.push({x: lastPos.x - 1, y: lastPos.y, step: totalSteps})
      }
    } else if (direction === 'D') {
      for (let j = 0; j < distance; j++) {
        totalSteps++
        const lastPos = coordinates[coordinates.length - 1]
        coordinates.push({x: lastPos.x, y: lastPos.y + 1, step: totalSteps})
      }
    } else {
      throw new Error('Invalid direction')
    }
  }
  return coordinates
}

const getIntersections = (coordinates1, coordinates2) => {
  const intersections = []
  coordinates1.forEach(coordinate1 => {
    coordinates2.forEach(coordinate2 => {
      if (coordinate1.x === coordinate2.x && coordinate1.y === coordinate2.y) {
        intersections.push({
          x: coordinate1.x,
          y: coordinate1.y,
          steps: coordinate1.step + coordinate2.step,
          distance: Math.abs(coordinate1.x) + Math.abs(coordinate2.y)
        })
      }
    })
  })
  return intersections
}

const getIntersectionLeastDistance = (intersections) => {
  const intersectionsCopy = [...intersections]
  intersectionsCopy.sort((a, b) => (a.distance > b.distance) ? 1 : -1)
  if (intersectionsCopy.length > 1) {
    return intersectionsCopy[1].distance
  } else {
    throw new Error('No Intersections')
  }
}

const getIntersectionLeastSteps = (intersections) => {
  const intersectionsCopy = [...intersections]
  intersectionsCopy.sort((a, b) => (a.steps > b.steps) ? 1 : -1)
  if (intersectionsCopy.length > 1) {
    return intersectionsCopy[1].steps
  } else {
    throw new Error('No Intersections')
  }
}

const findIntersectionDistance = (line1, line2) => {
  const line1Coordinates = getCoordinates(line1)
  const line2Coordinates = getCoordinates(line2)
  const intersections = getIntersections(line1Coordinates, line2Coordinates)
  const leastDistance = getIntersectionLeastDistance(intersections)
  return leastDistance
}

const findIntersectionDistanceSteps = (line1, line2) => {
  const line1Coordinates = getCoordinates(line1)
  const line2Coordinates = getCoordinates(line2)
  const intersections = getIntersections(line1Coordinates, line2Coordinates)
  const leastSteps = getIntersectionLeastSteps(intersections)
  return leastSteps
}

const part1 = async () => {
  const inputs = await readFile(path.join(__dirname, './input'), (data) => {
    return data.split('\n').map(line => {
      return line.split(',')
    })
  })
  return findIntersectionDistance(inputs[0], inputs[1])
}

const part2 = async () => {
  const inputs = await readFile(path.join(__dirname, './input'), (data) => {
    return data.split('\n').map(line => {
      return line.split(',')
    })
  })
  return findIntersectionDistanceSteps(inputs[0], inputs[1])
}

module.exports = {
  findIntersectionDistance,
  findIntersectionDistanceSteps,
  part1,
  part2
}