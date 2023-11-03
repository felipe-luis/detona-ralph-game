const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft:document.querySelector("#time-left"),
        score:document.querySelector("#score"),
        lives: document.querySelector("#lives-number"),

    },
    values: {
        
        gameVelocity: 700,
        hitPosition: 0,
        result: 0,
        currentTime: 60,
        livesCount: 3,
    },
    actions: {
        timerId: setInterval(randomSquare, 700),
        countDownTimerId: setInterval(countDown, 1000),
    }
};


function playSound(audioName){
    let audio = new Audio(`./src/audios/${audioName}.m4a`);
    audio.volume = 0.2;
    audio.play()
}


function countDown(){
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;
    

    if(state.values.currentTime === 0){
        clearInterval(state.actions.timerId);
        clearInterval(state.actions.countDownTimerId);
        alert(`Fim de jogo. Sua pontuação foi de ${state.values.result}`);
    }
}


function randomSquare(){
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    });

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
}


function addListenerHitBox(){
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", ()=> {
            if(square.id === state.values.hitPosition) {
                state.values.result++
                state.view.score.textContent = state.values.result
                state.values.hitPosition = null
                playSound("hit")
            }else{
                state.values.livesCount--
                state.view.lives.textContent = state.values.livesCount

                if(state.values.livesCount < 0){
                    state.values.currentTime = 0;
                    state.view.timeLeft.textContent = state.values.currentTime;
                    clearInterval(state.actions.timerId);
                    clearInterval(state.actions.countDownTimerId);
                    location.reload();
                    alert(`Fim de jogo. Sua pontuação foi de ${state.values.result}`)
                }
            }
        }  )
    });
}

function initialize(){
    addListenerHitBox()
}


initialize()