const numbersInGame = Array.from({length: 15}, (_, i) => i + 1)
const randomInt = (num) =>  Math.floor(Math.random() * num) + 0

function randomizer() {
    const randomIndex = randomInt(numbersInGame.length)
    const drawnNumber = numbersInGame[randomIndex]
    numbersInGame.splice(randomIndex,1)
    return drawnNumber
}

const gameInit = () => {
    document.addEventListener("dragover", function(event) {
        event.preventDefault();
    });

    const tiles = document.querySelectorAll("#game > div")
    const index = randomInt(15)

    tiles[index].setAttribute('dropzone','')

    tiles.forEach(element => {
        if(!element.hasAttribute('dropzone')){
            element.setAttribute('tile','')
            element.innerText = randomizer()
        }
    })
    setTilesEvents()
    setDropzoneEvents()
}

const setTilesEvents = () => {
    document.querySelectorAll("[tile]").forEach( tile => {
        tile.draggable = true
        tile.addEventListener('dragstart', dragHandler)
    })
}

const setDropzoneEvents = () => {
    const dropzone = document.querySelector("[dropzone]")
    dropzone.addEventListener('drop', dropHandler)
}

const gameUpdate = (targeted,dropzone) => {
    const newDropzone = () => {
        dropzone.innerText = targeted.innerText
        dropzone.setAttribute("tile",'')
        dropzone.removeAttribute("dropzone")
        dropzone.draggable = true
        dropzone.removeEventListener('drop', dropHandler)
    }
    const updateTiles = () => {
        targeted.removeAttribute("tile")
        targeted.setAttribute("dropzone",'')
        targeted.innerText = ''
        targeted.draggable = false
        targeted.removeEventListener('dragstart', dragHandler)
    }
    newDropzone()
    updateTiles()
    setTilesEvents()
    setDropzoneEvents()
}

const dropHandler = (event) => {
    const dropzone = event.target
    const tileId = event.dataTransfer.getData('objId')
    const tileTargeted = document.getElementById(tileId)
    console.log(tileTargeted,dropzone)
    gameUpdate(tileTargeted,dropzone)
}

const dragHandler = (event) => {
    event.dataTransfer.setData('objId', event.target.id)
}

gameInit()