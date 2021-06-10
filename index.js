let canvas = document.getElementById('myCanvas');
let ctx = canvas.getContext('2d');
canvas.style.border = '2px solid black';

// load all images
let bg = new Image();
bg.src = './images/bg.png';

console.log(bg)

let fg = new Image();
fg.src = './images/fg.png';

let bird = new Image();
bird.src = './images/bird.png'

let pipeNorth = new Image();
pipeNorth.src = './images/pipeNorth.png'

let pipeSouth = new Image();
pipeSouth.src = './images/pipeSouth.png'

let intervalId = 0;
let isGameOver = false;
let score = 0;
let positionX = 200

let pipes = [
    {x: 200, y: 0}, 
    {x: 400, y: -100}
]

let birdX = 30, birdY = 40
// bas animation template

let falling = true

function draw(){
   
    ctx.drawImage( bg, 0, 0)
    ctx.drawImage( bird, birdX, birdY )
    let gap = pipeNorth.height + 100
    for(let i=0 ; i< pipes.length; i++){
        ctx.drawImage(pipeNorth, pipes[i].x, pipes[i].y )
        ctx.drawImage(pipeSouth, pipes[i].x,  pipes[i].y + gap)
        pipes[i].x -= 1

       if (pipes[i].x + pipeNorth.width < 0) {
            pipes[i] = {
                x: 400,
                y: -Math.floor(Math.random() * (pipeNorth.height -50))
            }
       }    

        if (pipes[i].x == 20) {
            score++
        }   
       
       // collisions with pipes
        // DONT FREAK OUT READING THIS
        // Breathe in. 
        // Relax.
        // Read slowly
        // Read carefully
        // Visualize it
        if( birdX + bird.width >= pipes[i].x && birdX <= pipes[i].x + pipeNorth.width && (birdY <= pipes[i].y + pipeNorth.height || birdY+bird.height >= pipes[i].y + gap)){
            isGameOver = true
        }


        // collision explanation
        
        // 1. birdX + bird.width >= pipes[i].x && birdX <= pipes[i].x + pipeNorth.width 
        /*
            That line of code actually checks if the bird is between the boundries of the pipe (i.e the left and right hand edges)
        */

        //2.(birdY <= pipes[i].y + pipeNorth.height 
        /*
            That checks if the bird is touching the bottom side of pipeNorth or 
        */

        //3.  birdY+bird.height >= pipes[i].y + gap)   
        /*
            checks the upper side of the pipeSouth
        */
      

    }
    
    if (birdY + bird.height > canvas.height - 70) {
        isGameOver = true
    }
    else {
        if (falling) {
            birdY += 2
        }
        else {
            birdY -= 5
        }    
    }
   
    ctx.drawImage( fg , 0, canvas.height - 70)

    ctx.font = '22px Verdana'
    ctx.fillText(`Score: ${score}`, 20, canvas.height - 20)

    if (isGameOver) {
        cancelAnimationFrame(intervalId)
    }
    else {
        intervalId = requestAnimationFrame(draw)
    } 
}

window.addEventListener('load', () => {
    draw()


    document.addEventListener('mousedown', () => {
        falling = false
    })

    document.addEventListener('mouseup', () => {
        falling = true
    })
    
})
