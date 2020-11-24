let scores, roundScore, activePlayer;


function init() {
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;

    document.querySelector('.dice').style.display = 'none';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}

init();

function nextPlayer() { 
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.querySelector('.dice').style.display = 'none';
}

document.querySelector('.btn-roll').addEventListener('click', function(){ //função anonima
    //1- Random Number
    let dice = Math.floor(Math.random() * 6) + 1;

    //2- Display result
    let diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + dice + '.png';

    //3. Update the round score IF the rolled number was NOT a 1
    if(dice !== 1) {
        //add score
        roundScore += dice;
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
    } else {
        //Next player 
        nextPlayer();
       
    }
})

document.querySelector('.btn-hold').addEventListener('click', function(){
    scores[activePlayer] += roundScore

    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

    if(scores[activePlayer] >= 20) {
        document.querySelector('#name-' + activePlayer).textContent = 'Winner !';
        document.querySelector('.dice').style.display = 'none'
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner')
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active')
    } else {
        nextPlayer();
    }
})

document.querySelector('.btn-new').addEventListener('click', init);


//document.getElementById('current-' + activePlayer).textContent = dice;
//document.getElementById('current-' + activePlayer).innerHTML = '<em>'+ dice + '</em>';



//tooltip
function initTooltip() {
    const tooltips = document.querySelectorAll('.btn-help');
  
    tooltips.forEach((item) => {
        item.addEventListener('mouseover', onMouseOver)
    })

    
    
    function onMouseOver(event) {
        const tooltipBox = criarTooltipBox(this)
        tooltipBox.style.top = event.pageY + 'px'
        tooltipBox.style.left = event.pageX + 'px'
    
        onMouseMove.tooltipBox = tooltipBox
        this.addEventListener('mousemove', onMouseMove)
    
        onMouseLeave.tooltipBox = tooltipBox;
        onMouseLeave.element = this;
        this.addEventListener('mouseleave', onMouseLeave)
        
    }

    
    const onMouseLeave = {  
        handleEvent() {
        this.tooltipBox.remove()
        this.element.removeEventListener('mouseleave', onMouseLeave)
        this.element.removeEventListener('mousemove', onMouseMove)
    
        }
    }
    
    const onMouseMove = {
        handleEvent(event) {
        this.tooltipBox.style.top = event.pageY + 20 + 'px'
        this.tooltipBox.style.left = event.pageX + 20 + 'px'
        }
    }
    
    function criarTooltipBox(element) {
        const tooltipBox = document.createElement('div');
        const text = element.getAttribute('aria-label')
        tooltipBox.classList.add('tooltip');
        tooltipBox.innerText = text;
        document.body.appendChild(tooltipBox)
        return tooltipBox;
    }

}
initTooltip()