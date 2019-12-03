const { readFile } = require('../helper')
const path = require('path')

const getCoordinates = lineDescs => {
  const coordinates = []
  coordinates.push({x: 0, y: 0})
  for (let i = 0; i < lineDescs.length; i++) {
    const lineDesc = lineDescs[i]
    const regex = /^(D|U|R|L)(\d*)$/gm;
    const matches = regex.exec(lineDesc)
    const direction = matches[1]
    const distance = Number(matches[2])
    if (direction === 'R') {
      for (let j = 0; j < distance; j++) {
        const lastPos = coordinates[coordinates.length - 1]
        coordinates.push({x: lastPos.x + 1, y: lastPos.y})
      }
    } else if (direction === 'U') {
      for (let j = 0; j < distance; j++) {
        const lastPos = coordinates[coordinates.length - 1]
        coordinates.push({x: lastPos.x, y: lastPos.y - 1})
      }
    } else if (direction === 'L') {
      for (let j = 0; j < distance; j++) {
        const lastPos = coordinates[coordinates.length - 1]
        coordinates.push({x: lastPos.x - 1, y: lastPos.y})
      }
    } else if (direction === 'D') {
      for (let j = 0; j < distance; j++) {
        const lastPos = coordinates[coordinates.length - 1]
        coordinates.push({x: lastPos.x, y: lastPos.y + 1})
      }
    } else {
      throw new Error('Invalid direction')
    }
  }
  return coordinates
}

const getIntersections = (coordinates1, coordinates2) => {
  return coordinates1.filter(coordinate1 => {
    return -1 !== coordinates2.findIndex(coordinate2 => {
      return coordinate1.x === coordinate2.x && coordinate1.y === coordinate2.y
    })
  })
}

const getIntersectionLeastDistance = (intersections) => {
  const intersectionsCopy = [...intersections]
  intersectionsCopy.forEach(intersection => {
    intersection.distance = Math.abs(intersection.x) + Math.abs(intersection.y)
  })
  intersectionsCopy.sort((a, b) => (a.distance > b.distance) ? 1 : -1)
  if (intersectionsCopy.length > 1) {
    return intersectionsCopy[1].distance
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

const part1 = async () => {
  const inputs = await readFile(path.join(__dirname, './input'), (data) => {
    return data.split('\n').map(line => {
      return line.split(',')
    })
  })
  const distance = findIntersectionDistance(inputs[0], inputs[1])
  console.log(distance)
  return distance
}

module.exports = {
  findIntersectionDistance,
  part1
}