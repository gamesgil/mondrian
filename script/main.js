const regions = []
const occupied = []
const width = 10
const height = 10
const maxSize = 4
const colors = ['red', 'green', 'blue', 'yellow', 'purple', 'beige', 'cyan']

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
        const maxSteps = getRandom(1, maxSize)
        const localOccupied = []


        for (let i = 0; i < maxSteps; i++) {
            let xSteps = 0
    
            // break right
            while(xSteps < maxSteps && ((foundCell + xSteps) % width) < width) {
                if (occupied.includes(foundCell + xSteps) || foundCell + xSteps >= width * height) {
                    return
                }

                localOccupied.push(foundCell + xSteps)
    
                if ((foundCell + xSteps) % width) {
                    if ((foundCell + xSteps) % width && !occupied.includes(foundCell + xSteps - 1)) {
                        getCell(foundCell + xSteps).classList.add('open-left')                
                    }
                } 
                
                if (((foundCell + xSteps) % width) < width - 1 &&
                    (xSteps < maxSteps - 1) &&
                    !occupied.includes((foundCell + xSteps + 1))) {
                    getCell(foundCell + xSteps).classList.add('open-right')
                }

                if (i) {
                    getCell(foundCell + xSteps).classList.add('open-top')
                }

                if (i < maxSize - 1) {
                    if (Math.floor((foundCell + xSteps) / width) < height - 1) {
                        getCell(foundCell + xSteps).classList.add('open-bottom')
                    }
                }
    
                getCell(foundCell).innerHTML = xSteps + ',' + maxSteps

                getCell(foundCell + xSteps).style.background = colors[0]

                xSteps++
            }

            foundCell += width
        }

        while (localOccupied.length) {
            occupied.push(localOccupied.pop())
        }

        colors.unshift(colors.pop())
    }
}

drawTable()


for (let i = 0; i < 150; i++)
    createRegion()

console.log(occupied)