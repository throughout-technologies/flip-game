const selectors = {
    boardContainer: document.querySelector('.board-container'),
    board: document.querySelector('.board'),
    moves: document.querySelector('.moves'),
    timer: document.querySelector('.timer'),
    start: document.querySelector('button'),
    win: document.querySelector('.win'),
    progress: document.querySelector('.progress-bar'),
    score: document.querySelector('.score')
}

const state = {
    gameStarted: false,
    flippedCards: 0,
    totalFlips: 0,
    totalTime: 0,
    loop: null,
    count: 0,
}

const shuffle = array => {
    const clonedArray = [...array]

    for (let i = clonedArray.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1))
        const original = clonedArray[i]

        clonedArray[i] = clonedArray[randomIndex]
        clonedArray[randomIndex] = original
    }

    return clonedArray
}

const pickRandom = (array, items) => {
    const clonedArray = [...array]
    const randomPicks = []

    for (let i = 0; i < items; i++) {
        const randomIndex = Math.floor(Math.random() * clonedArray.length)

        randomPicks.push(clonedArray[randomIndex])
        clonedArray.splice(randomIndex, 1)
    }

    return randomPicks
}

const generateGame = () => {
    const dimensions = selectors.board.getAttribute('data-dimension')

    if (dimensions % 2 !== 0) {
        throw new Error("The dimension of the board must be an even number.")
    }

    const emojis = ['🐱', '🦉', '🦎', '🐍', '🐢', '🦆']
    const picks = pickRandom(emojis, (dimensions * dimensions) / 6)
    // alert(picks)
    const items = shuffle([...picks, ...picks])
    const cards = `
        <div class="board" style="repeat(${dimensions}, auto)">
            ${items.map(item => `
                <div class="card">
                    <div class="card-front"></div>
                    <div class="card-back">${item}</div>
                </div>
            `).join('')}
       </div>
    `

    const parser = new DOMParser().parseFromString(cards, 'text/html')

    selectors.board.replaceWith(parser.querySelector('.board'))
}

const startGame = () => {

    $('.startButton').attr('style', 'display:none')
    $('#row').attr('style', 'visibility: visible;')
    $('#txt1').attr('style', 'display:none')
    $('.btn2').attr('disabled', true)
    $('.board-container').attr('style', 'visibility: visible;')
    const field = ["first", "last", "email", "mobile", "desig", "organ"]
    generateGame()
    state.gameStarted = true
    selectors.start.classList.add('disabled')

    state.loop = setInterval(() => {
        state.totalTime++
        console.log(state.totalTime)

        //    selectors.moves.innerText = `${state.totalFlips} moves`
        //    selectors.timer.innerText = `Time: ${state.totalTime} sec`
        var fill = state.totalTime * 3.3
        selectors.progress.style.width = `${fill}%`
        if (state.totalTime == '31') {
            confirm('Game Over')
            for (let x = 0; x < id.length; x++) {
                document.getElementById(id[x].entry).disabled = false;
                $('.btn').attr('disabled', false)
            }
        }

    }, 1000)
}

const flipBackCards = () => {
    document.querySelectorAll('.card:not(.matched)').forEach(card => {
        card.classList.remove('flipped')
    })

    state.flippedCards = 0
}

const id = [{ entry: 'FirstName', type: 'text' }, { entry: 'LastName', type: 'text' }, { entry: 'Email', type: 'email' }, { entry: 'Designation', type: 'text' }, { entry: 'Mobile', type: 'number' }, { entry: 'Organization', type: 'text' }]
const field = ["first", "last", "email", "mobile", "desig", "organ"]
const flipCard = card => {
    const emojis = ['🐱', '🦉', '🦎', '🐍', '🐢', '🦆']
    state.flippedCards++
    state.totalFlips++

    if (!state.gameStarted) {
        startGame()
    }

    if (state.flippedCards <= 2) {
        card.classList.add('flipped')
    }

    if (state.flippedCards === 2) {
        const flippedCards = document.querySelectorAll('.flipped:not(.matched)')

        if (flippedCards[0].innerText === flippedCards[1].innerText) {
            flippedCards[0].classList.add('matched')
            flippedCards[1].classList.add('matched')
            for (let x = 0; x < id.length; x++) {
                if (flippedCards[0].innerText == emojis[x]) {
                    state.count++;
                    document.getElementById(id[x].entry).disabled = false;
                    // document.getElementById(field[x]).innerHTML = `<input required class='form-control' id=${id[x].entry} type="${id[x].type}" name="${id[x].entry}" placeholder="${id[x].entry}"></input>`; 
                    selectors.score.innerText = `🏆${state.count} /6`
                }
                $('.btn').attr('disabled', false)
                if(state.totalTime<31)
                
                modal();
                clearInterval(state.totalTime)
            }


        }

        setTimeout(() => {
            flipBackCards()
        }, 1000)
    }
    if (!document.querySelectorAll('.card:not(.flipped)').length) {
        setTimeout(() => {
            selectors.boardContainer.classList.add('flipped')
            if (state.totalTime < '31') {

                selectors.win.innerHTML = modal()
                // `
                // <span class="win-text">
                // Congratulation You won!<br />
                // with <span class="highlight">${state.totalFlips}</span> moves<br />
                // under <span class="highlight">${state.totalTime}</span> seconds
                // </span>
                
                // `
            }
            else {
                selectors.win.innerHTML = `
                <span class="win-text">
                Thank you for participating!<br />
                with <span class="highlight">${state.totalFlips}</span> moves<br />
                under <span class="highlight">${state.totalTime}</span> seconds
                </span>
                
                `

            }

            clearInterval(state.loop)
        }, 1000)
    }
}

const attachEventListeners = () => {
    document.addEventListener('click', event => {
        const eventTarget = event.target
        const eventParent = eventTarget.parentElement
        if (eventTarget.className.includes('card') && !eventParent.className.includes('flipped')) {
            flipCard(eventParent)
        } else if (eventTarget.className.includes('startButton') && !eventTarget.className.includes('disabled')) {
            for (let x = 0; x < id.length; x++)
                document.getElementById("txtfield").innerHTML += `
            <div class="col-md-6 col-lg-4 col-sm-12 mt-3 control-form">
            <input required class='form-control bg-secondary.bg-gradient' type="${id[x].type}" id=${id[x].entry} name="${id[x].entry}" placeholder="${id[x].entry}" disabled></input>
            </div>
            `;
            startGame()
        }
    })
}


 function validation(e){
   e.preventDefault()

    myobj={}

for(let i=0;i<id.length;i++){
   myobj[id[i].entry]= document.getElementById(`${id[i].entry}`).value;
}
if(myobj)
modal();
console.log(myobj)


}

function modal(){
   document.getElementById('modal').innerHTML=`<!-- The Modal -->
    <div class="modal fade" id="myModal">
      <div class="modal-dialog">
        <div class="modal-content">
    
          <!-- Modal Header -->
          <div class="modal-header">
            <h4 class="modal-title"></h4>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
    
          <!-- Modal body -->
          <div class="modal-body">
            Thankyou For partitipating!
          </div>
    
    
        </div>
      </div>
    </div>`
}



attachEventListeners()