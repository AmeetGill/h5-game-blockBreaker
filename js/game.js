// The main running logic of the game
class Game {
  constructor(main) {
    let g = {
      main: main, // Game main function
      actions: {}, // record key actions
      keydowns: {}, // record keycode
      state: 1, // Game state value, the initial default is 1
      state_START: 1, // Start the game
      state_RUNNING: 2, //The game starts running
      state_STOP: 3, // Pause the game
      state_GAMEOVER: 4, // Game over
      state_UPDATE: 5, // Game cleared
      canvas: document.getElementById("canvas"), // canvas element
      context: document.getElementById("canvas").getContext("2d"), // canvas canvas
      timer: null, // Polling timer
      fps: main.fps, // animation frame number, default 60
    }
    Object.assign(this, g)
  }
  // Draw all materials on the page
  draw(paddle, ball, blockList, score) {
    let g = this
    // clear canvas
    g.context.clearRect(0, 0, g.canvas.width, g.canvas.height)
    // draw background image
    g.drawBg()
    // draw baffle
    g.drawImage(paddle)
    //Draw the ball
    g.drawImage(ball)
    // draw bricks
    g.drawBlocks(blockList)
    // draw fractions
    g.drawText(score)
  }
  // draw pictures
  drawImage(obj) {
    this.context.drawImage(obj.image, obj.x, obj.y)
  }
  // draw background image
  drawBg() {
    let bg = imageFromPath(allImg.background)
    this.context.drawImage(bg, 0, 0)
  }
  // Draw all bricks
  drawBlocks(list) {
    for (let item of list) {
      this.drawImage(item)
    }
  }
  //Draw the counting board
  drawText(obj) {
    this.context.font = '24px Microsoft YaHei'
    this.context.fillStyle = '#fff'
    // draw fractions
    this.context.fillText(obj.text + obj.allScore, obj.x, obj.y)
    // draw level
    this.context.fillText(obj.textLv + obj.lv, this.canvas.width - 100, obj.y)
  }
  // game over
  gameOver() {
    // Clear timer
    clearInterval(this.timer)
    // clear canvas
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    // draw background image
    this.drawBg()
    // Draw prompt text
    this.context.font = '48px Microsoft YaHei'
    this.context.fillStyle = '#fff'
    this.context.fillText('Game over', 404, 226)
  }

  // Game promotion
  goodGame() {
    // Clear timer
    clearInterval(this.timer)
    // clear canvas
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    // draw background image
    this.drawBg()
    // Draw prompt text
    this.context.font = '48px Microsoft YaHei'
    this.context.fillStyle = '#fff'
    this.context.fillText('Congratulations on advancing to the next level', 308, 226)
  }
  // Game cleared
  finalGame() {
    // Clear timer
    clearInterval(this.timer)
    // clear canvas
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    // draw background image
    this.drawBg()
    // Draw prompt text
    this.context.font = '48px Microsoft YaHei'
    this.context.fillStyle = '#fff'
    this.context.fillText('Congratulations on passing all levels', 308, 226)
  }
  // Registration issue
  registerAction(key, callback) {
    this.actions[key] = callback
  }
  // Detection of ball collision with bricks
  checkBallBlock(g, paddle, ball, blockList, score) {
    let p = paddle, b = ball
    // Detection of ball collision with baffle
    if (p.collide(b)) {
      // When the ball moves in the direction of the baffle center, the Y-axis speed is inverted, otherwise it remains unchanged.
      if (Math.abs(b.y + b.h / 2 - p.y + p.h / 2) > Math.abs(b.y + b.h / 2 + b.speedY - p.y + p.h / 2)) {
        b.speedY *= -1
      } else {
        b.speedY *= 1
      }
      //Set X-axis speed
      b.speedX = p.collideRange(b)
    }
    // Detection of ball collision with bricks
    blockList.forEach(function (item, i, arr) {
      if (item.collide(b)) { // The ball and brick have collided
        if (!item.alive) { // When the health of the brick is 0, remove it
          arr.splice(i, 1)
        }
        // When the direction of movement of the ball is towards the center of the brick, the speed is inverted, otherwise it remains unchanged.
        if ((b.y < item.y && b.speedY < 0) || (b.y > item.y && b.speedY > 0)) {
          if (!item.collideBlockHorn(b)) {
            b.speedY *= -1
          } else { // When the ball hits the four corners of the brick, the Y-axis speed remains unchanged
            b.speedY *= 1
          }
        } else {
          b.speedY *= 1
        }
        // When the ball hits the four corners of the brick, the X-axis velocity is inverted
        if (item.collideBlockHorn(b)) {
          b.speedX *= -1
        }
        // Calculate the score
        score.computeScore()
      }
    })
    // Boundary detection when the baffle moves
    if (p.x <= 0) { // When reaching the left boundary
      p.isLeftMove = false
    } else {
      p.isLeftMove = true
    }
    if (p.x >= 1000 - p.w) { // When reaching the right boundary
      p.isRightMove = false
    } else {
      p.isRightMove = true
    }
    //Move the ball
    b.move(g)
  }
  //Set frame-by-frame animation
  setTimer(paddle, ball, blockList, score) {
    let g = this
    let main = g.main
    g.timer = setInterval(function () {
      // actions collection
      let actions = Object.keys(g.actions)
      for (let i = 0; i < actions.length; i++) {
        let key = actions[i]
        if (g.keydowns[key]) {
          //If the button is pressed, call the registered action
          g.actions[key]()
        }
      }
      // When the number of bricks is 0, the challenge is successful
      if (blockList.length == 0) {
        if (main.LV === main.MAXLV) { // The last level is cleared
          // Upgrade and pass
          g.state = g.state_UPDATE
          // Challenge successful, render the clearance scene
          g.finalGame()
        } else { //Remaining levels
          // Upgrade and pass
          g.state = g.state_UPDATE
          // Challenge successful, render the next level scene
          g.goodGame()
        }
      }
      // Determine whether the game is over
      if (g.state === g.state_GAMEOVER) {
        g.gameOver()
      }
      // Determine the execution event when the game starts
      if (g.state === g.state_RUNNING) {
        g.checkBallBlock(g, paddle, ball, blockList, score)
        // Draw all game materials
        g.draw(paddle, ball, blockList, score)
      } else if (g.state === g.state_START) {
        // Draw all game materials
        g.draw(paddle, ball, blockList, score)
      }
    }, 1000 / g.fps)
  }
  /**
   * Initialization function
   */
  init() {
    let g = this,
      paddle = g.main.paddle,
      ball = g.main.ball,
      blockList = g.main.blockList,
      score = g.main.score
    //Set related registration functions for keyboard press and release
    window.addEventListener('keydown', function (event) {
      g.keydowns[event.keyCode] = true
    })
    window.addEventListener('keyup', function (event) {
      g.keydowns[event.keyCode] = false
    })
    g.registerAction = function (key, callback) {
      g.actions[key] = callback
    }
    //Register left arrow key movement event
    g.registerAction('37', function () {
      // Determine whether the game is in the running stage
      if (g.state === g.state_RUNNING && paddle.isLeftMove) {
        paddle.moveLeft()
      }
    })
    //Register the right arrow key movement event
    g.registerAction('39', function () {
      // Determine whether the game is in the running stage
      if (g.state === g.state_RUNNING && paddle.isRightMove) {
        paddle.moveRight()
      }
    })
    window.addEventListener('keydown', function (event) {
      switch (event.keyCode) {
        //Register space bar emission event
        case 32:
          if (g.state === g.state_GAMEOVER) { // When the game ends
            // Start game
            g.state = g.state_START
            // initialization
            g.main.start()
          } else {
            // Start game
            ball.fired = true
            g.state = g.state_RUNNING
          }
          break
        // N key to enter the next level
        case 78:
          // When the game status is clearance and not the final level
          if (g.state === g.state_UPDATE && g.main.LV !== g.main.MAXLV) { // Enter the next level
            // Start game
            g.state = g.state_START
            //Initialize the next level
            g.main.start(++g.main.LV)
          }
          break
        // P key pauses game event
        case 80:
          g.state = g.state_STOP
          break
      }
    })
    //Set polling timer
    g.setTimer(paddle, ball, blockList, score)
  }
}