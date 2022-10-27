/*
مثال : https://www.improvememory.org/brain-games/memory-games/happy-halloween/
    [1] تصميم متجاوبا
    [2] موسيقى في الخلفة
    [3] background-img في الخلفية
    [4] مصفوفة تحتوي على عدت صور نحدد العدد كما نريد
    [5] يوجد في اللعبة اثنين لفل
    [6] يوجد وقت عد تنازلي للعبة عندما ينتهي قيم اوفر
    [7] يمكن فتح الورق اثناء اللعب ولكن سرعة الوقت سوف تضرب ب اثنين
    [8] يحفظ في لوكل ستوريج الاسم + عدد المحاولات
    
*/

// Button to start game
document.querySelector('#start button').onclick = _=>{
    
    let usersName = window.prompt(`What's your name ?`);

    if(usersName == '' || usersName == null){
        document.querySelector('.info-container .name span').innerHTML = 'UnKnown'
    }else{
        document.querySelector('.info-container .name span').innerHTML = usersName
    }
    
    document.getElementById('start').remove();
}

let duration = 1000;

let blocksContainer = document.querySelector('.memory-game-blocks');

let blocks = Array.from(document.querySelectorAll('.memory-game-blocks .game-block'));

// the array is content Numbers[0,19] index for blocks
let orderRange = [...Array(blocks.length).keys()];

shuffle(orderRange);

blocks.forEach((b, i) =>{

    b.style.order = orderRange[i];

    b.addEventListener('click',_=>{

        flipBlock(b)

    });
});

function flipBlock(selectBlock){

    selectBlock.classList.add('is-flipped');

    let allFlip = blocks.filter((b)=> b.classList.contains('is-flipped'));
    
    if(allFlip.length === 2){

    // Stop clicking function 
    stopClicking()

    // Check Matched Block Function
    checkMatched(allFlip[0], allFlip[1]);

    }
}

function stopClicking(){
    blocksContainer.classList.add('no-click');

    setTimeout(()=>{
        blocksContainer.classList.remove('no-click');
    },duration)
}

function checkMatched(firstBlock, secondBlock){

    let tries = document.querySelector('#tries span')

    if(firstBlock.dataset.tech === secondBlock.dataset.tech){

        firstBlock.classList.remove('is-flipped');
        secondBlock.classList.remove('is-flipped');


        firstBlock.classList.add('matched');
        secondBlock.classList.add('matched');

    }else{
        tries.innerHTML = +tries.innerHTML + 1;
        setTimeout(()=>{
            firstBlock.classList.remove('is-flipped');
            secondBlock.classList.remove('is-flipped');

        },duration)
    }
    
}


function shuffle(arry){
    let current = arry.length,
    temp,  // القيمة المؤقتة
    random;
    
    while(current > 0){
        // Get Random Number
        random = Math.floor(Math.random() * current);
        
        // Decresase Length By One
        current --;

        temp = arry[current];
        
        arry[current] = arry[random];

        arry[random] = temp;
    }
    return arry;
}