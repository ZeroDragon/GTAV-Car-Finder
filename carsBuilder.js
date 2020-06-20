const fs = require('fs')
const file = fs.readFileSync('./carritos2.csv', { encoding: 'utf8' })

const carsArr = file.split(/\n/).slice(1,-1).map(row => {
  const [name, hex, ...dataRaw] = row.split(',')
  const data = dataRaw.join(',').replace(/\s+/g, ' ').trim()
  return { name, hex, data }
})

const cars = {}
carsArr.filter(car => car.name !== '').forEach(car => {
  cars[car.name] = car
})

fs.writeFileSync('./carritos.json', JSON.stringify(cars, false, 2))

console.log('done')

