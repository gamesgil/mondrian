const regions = []
const occupied = []
const width = 20
const height = 10
const maxSize = Math.min(width, height) / 2
const colors = ['rgb(245,197,39)', 'white', 'rgb(231,51,60)', 'rgb(60,73,152)', 'white', 'black', 'white', 'rgb(245,197,39)', 'white', 'rgb(231,51,60)', 'rgb(60,73,152)']

const drawTable = _ => {
    const table = document.createElement('table')
    const tBody = document.createElement('tbody')
    
    table.appendChild(tBody)
    
    for (let i = 0; i < height; i++) {
        const row = document.createElement('tr')
    
        tBody.appendChild(row)
    
        for (let j = 0; j < width; j++) {
            const td = document.createElement('td')
    
            row.appendChild(td)
        }
    }
    
    document.body.appendChild(table)
}

const getRandom = (from, to) => {
    return from + Math.floor(Math.random() * (to - from))
}

const getCell = idx => {
    return document.querySelectorAll('td')[idx]
}

const createRegion = _ => {
    let foundCell = -1

    for (let i = 0; i < width * height; i++) {
        if (!occupied.includes(i)) {
            foundCell = i
            break
        }
    }

    if (foundCell > -1) {
        let maxStepsX = getRandom(1, maxSize)
        const maxStepsY = getRandom(1, maxSize)
        const localOccupied = []


        for (let i = 0; i < maxStepsY; i++) {
            let xSteps = 0
    
            // break right
            while(xSteps < maxStepsX && ((foundCell + xSteps) % width) < width) {
                if (occupied.includes(foundCell + xSteps) || (foundCell + xSteps) >= (width * height)) {
                    maxStepsX = xSteps
                    break
                }

                localOccupied.push(foundCell + xSteps)
                if ((foundCell + xSteps) % width) {
                    if ((foundCell + xSteps) % width && !occupied.includes(foundCell + xSteps - 1)) {
                        getCell(foundCell + xSteps).classList.add('open-left')                
                    }
                } 
                
                if (((foundCell + xSteps) % width) < width - 1 &&
                    (xSteps < maxStepsX - 1) &&
                    !occupied.includes((foundCell + xSteps + 1))) {

                    getCell(foundCell + xSteps).classList.add('open-right')
                }

                if (i) {
                    getCell(foundCell + xSteps).classList.add('open-top')
                }

                if (i < maxStepsY - 1) {
                    if (Math.floor((foundCell + xSteps) / width) < height - 1) {
                        getCell(foundCell + xSteps).classList.add('open-bottom')
                    }
                }
    
                
                // getCell(foundCell + xSteps).innerHTML = `${xSteps},${maxStepsX},${maxStepsY}`
                getCell(foundCell + xSteps).style.background = colors[0]

                xSteps++
            }

            if (foundCell + width < width * height) {
                foundCell += width
            } else {
                break
            }
        }

        while (localOccupied.length) {
            occupied.push(localOccupied.shift())
        }

        colors.unshift(colors.pop())
    }
}

drawTable()


for (let i = 0; i < width * height; i++)
    createRegion()