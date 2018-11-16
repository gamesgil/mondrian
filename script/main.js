const regions = []
const occupied = []
const width = 10
const height = 10
const maxSize = 4

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
        let xSteps = 0
        let cellClass = ''
        const maxSteps = getRandom(1, maxSize)

        // break right
        while(xSteps < maxSteps && ((foundCell + xSteps) % width) < width) {
            occupied.push(foundCell + xSteps)

            if (xSteps) {
                if ((foundCell + xSteps) % width) {
                    getCell(foundCell + xSteps).classList.add('open-left')
                }
            } else if (foundCell % width && !occupied.includes(foundCell - 1)) {
                getCell(foundCell + xSteps).classList.add('open-left')                
            }
            
            
            if (((foundCell + xSteps) % width) < width - 1) {
                getCell(foundCell + xSteps).classList.add('open-right')
            } 


            xSteps++
        }
    }
}

drawTable()


createRegion()
createRegion()
createRegion()
createRegion()

console.log(occupied)