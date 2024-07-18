const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

const ScoreEl = document.querySelector('#ScoreEl')


var lives = 5
var okLeft = false
var okRight = false
var okUp = false
var okDown = false


var Health = new Image()
Health.src = "img/Health.png"

var stopper = new Image()
stopper.src = "img/StopBackGround.png"

var line = new Image()
line.src = "img/line.png"
line.X = 200
line.Y = 250

var line2 = new Image()
line2.src = "img/line.png"
line2.X = 200
line2.Y = 0

var line3 = new Image()
line3.src = "img/line.png"
line3.X = 200
line3.Y = 500

var line4 = new Image()
line4.src = "img/line.png"
line4.X = 550
line4.Y = 0

var line5 = new Image()
line5.src = "img/line.png"
line5.X = 550
line5.Y = 250

var line6 = new Image()
line6.src = "img/line.png"
line6.X = 550
line6.Y = 500


var UserCar = new Image()
UserCar.src = "img/UserCar.png"
UserCar.X = 330
UserCar.Y = 430

var EnCar1 = new Image()
EnCar1.src = "img/EnCar1.png"
EnCar1.X = 0
EnCar1.Y = 0

let score = 0

var Road = new Image()
Road.src = "img/Road.png"

function drawRoad() {
    ctx.drawImage(Road, 0, 0)
}

function liveCounter() {
    
    ctx.font = "20px Arial"
    ctx.fillStyle = "Red"
    ctx.fillText("   :   " + lives, 50, 650)
    ctx.drawImage(Health, 4, 615)
}

function drawLines() {

    ctx.drawImage(line, line.X, line.Y)
    line.Y += 3
    if (line.Y > 600) {
        line.Y = -150
    }


    ctx.drawImage(line2, line2.X, line2.Y)
    line2.Y += 3
    if (line2.Y > 600) {
        line2.Y = -150
    }

    ctx.drawImage(line3, line3.X, line3.Y)
    line3.Y += 3
    if (line3.Y > 600) {
        line3.Y = -150
    }

    ctx.drawImage(line4, line4.X, line4.Y)
    line4.Y += 3
    if (line4.Y > 600) {
        line4.Y = -150
    }

    ctx.drawImage(line5, line5.X, line5.Y)
    line5.Y += 3
    if (line5.Y > 600) {
        line5.Y = -150
    }

    ctx.drawImage(line6, line6.X, line6.Y)
    line6.Y += 3
    if (line6.Y > 600) {
        line6.Y = -150
    }
}

function stopGame() {
    cancelAnimationFrame(myReq)
    ctx.drawImage(stopper, 10, 150)
    ctx.font = "60px Arial"
    ctx.fillStyle = "gray"
    ctx.fillText("Press ENTER to continue", 65, 350)
    stop = true
    
}

function drawMyCar() {
    if ((okLeft === true) && (UserCar.X > 3)) {
        UserCar.X -= 4
        
    }

    if ((okRight === true) && (UserCar.X < 650)) {
        UserCar.X += 4
        
    }

    if ((okUp === true) && (UserCar.Y > -25)) {
        UserCar.Y -= 2
        
    }

    if ((okDown === true) && (UserCar.Y < 440)) {
        UserCar.Y += 2
        
    }
    
     score+=0.01
     ScoreEl.innerHTML = Math.floor(score)
     
    ctx.drawImage(UserCar, UserCar.X, UserCar.Y)
    
}

function drawEnCar() {

    if((EnCar1.Y + 115 > UserCar.Y) && (EnCar1.X + 65 > UserCar.X) && (EnCar1.X < UserCar.X + 65)){
        crash = true
        EnCar1.X = Math.floor(Math.random() * 500)
        EnCar1.Y -= 650
        lives--
        ctx.clearRect(4, 615, 100, 650)
        if(lives < 1){
            stopGame()
        }
    }else if(UserCar.Y > EnCar1.Y){
        crash = false
    }else {crash = false}


    if(!crash){
    ctx.drawImage(EnCar1,EnCar1.X,EnCar1.Y)
    EnCar1.Y += 2
    
    if(EnCar1.Y > 440){
        EnCar1.Y -= 650
        EnCar1.X = Math.floor(Math.random() * 500)
    }
    }

}

function ScoreCount(){
    if(stop === true){
        var name = prompt("Enter your name", "Enter name");
        score = ScoreEl.innerHTML
        console.log(score)
            if (name != null) {

                if(localStorage.getItem("leaderboard") == null){
                    let leaderboardData = [{
                        "name": name,
                        "score": score
                    }]
                    localStorage.setItem("leaderboard", JSON.stringify(leaderboardData))
                }
                else
                {
                    let leaderboardData = JSON.parse(localStorage.getItem("leaderboard"))

                    leaderboardData.push({
                        "name": name,
                        "score": score
                    });

                    localStorage.setItem("leaderboard", JSON.stringify(leaderboardData))
                }
                alert(`Congrulations, ${name}!\nYou did it in with ${score}`)
                //location.href='http://127.0.0.1:5500/leaderboard.html'
            }
    }
}

function render() {

    

    if (stop === true) { return }

    drawRoad()
    liveCounter()
    drawLines()
    drawMyCar()
    drawEnCar()
    ScoreCount()

    myReq = requestAnimationFrame(render)
}
render()

addEventListener("keydown", function (event) {
    var newDirect = event.key

    if ((newDirect === 'a') || (newDirect === 'ф')) {
        okLeft = true
    }

    if ((newDirect === 'd') || (newDirect === 'в')) {
        okRight = true
    }

    if ((newDirect === 'w') || (newDirect === 'ц')) {
        okUp = true
    }

    if ((newDirect === 's') || (newDirect === 'ы')) {
        okDown = true
    }

    if((newDirect === 'Enter' ) && (stop === true)){
        console.log("Я нажал ")
        stop = false 
        score = 0
        lives = 5
        render()
        
    }
})

addEventListener("keyup", function (event) {
    var newDirect = event.key

    if ((newDirect === 'a') || (newDirect === 'ф')) {
        okLeft = false
    }

    if ((newDirect === 'd') || (newDirect === 'в')) {
        okRight = false
    }

    if ((newDirect === 'w') || (newDirect === 'ц')) {
        okUp = false
    }

    if ((newDirect === 's') || (newDirect === 'ы')) {
        okDown = false
    }
})

