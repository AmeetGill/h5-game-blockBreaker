// Define bezel objects
class Paddle {
  constructor(_main) {
    let p = {
      x: _main.paddle_x, // x-axis coordinate
      y: _main.paddle_y, // y-axis coordinate
      w: 102, // Image width
      h: 22, // Image height
      speed: 10, // x-axis moving speed
      ballSpeedMax: 8, // The maximum rebound speed of the ball
      image: imageFromPath(allImg.paddle), // Introduce picture object
      isLeftMove: true, // Can it be moved left
      isRightMove: true, // Can it be moved right
    }
    Object.assign(this, p)
  }
  moveLeft() {
    this.x -= this.speed
  }
  moveRight() {
    this.x += this.speed
  }
  // Ball and baffle collision detection
  collide(ball) {
    let b = ball
    let p = this
    if (Math.abs((b.x + b.w / 2) - (p.x + p.w / 2)) < (b.w + p.w) / 2 &&
      Math.abs((b.y + b.h / 2) - (p.y + p.h / 2)) < (b.h + p.h) / 2) {
      return true
    }
    return false
  }
  // Calculate the x-axis velocity value after the collision between the ball and the baffle
  collideRange(ball) {
    let b = ball
    let p = this
    let rangeX = 0
    rangeX = (p.x + p.w / 2) - (b.x + b.w / 2)
    if (rangeX < 0) { // The ball hits the left side of the baffle
      return rangeX / (b.w / 2 + p.w / 2) * p.ballSpeedMax
    } else if (rangeX > 0) { // The ball hits the right side of the baffle
      return rangeX / (b.w / 2 + p.w / 2) * p.ballSpeedMax
    }
  }
}
// ball object
class Ball {
  constructor(_main) {
    let b = {
      x: _main.ball_x, // x-axis coordinate
      y: _main.ball_y, // y-axis coordinate
      w: 18, // image width
      h: 18, // picture height
      speedX: 1, // x-axis speed
      speedY: 5, // y-axis speed
      image: imageFromPath(allImg.ball), // Image object
      fired: false, // Whether to move, default is stationary
    }
    Object.assign(this, b)
  }
  move(game) {
    if (this.fired) {
      // Collision boundary detection
      if (this.x < 0 || this.x > 1000 - this.w) {
        this.speedX *= -1
      }
      if (this.y < 0) {
        this.speedY *= -1
      }
      if (this.y > 500 - this.h) {
        // game over
        game.state = game.state_GAMEOVER
        // game.isGameOver = true
      }
      // move
      this.x -= this.speedX
      this.y -= this.speedY
    }
  }
}
// Bricks
class Block {
  constructor(x, y, life = 1) {
    let bk = {
      x: x, // x-axis coordinate
      y: y, // y-axis coordinate
      w: 50, // image width
      h: 20, // picture height
      image: life == 1 ? imageFromPath(allImg.block1) : imageFromPath(allImg.block2), // Image object
      life: life, // health value
      alive: true, // Is it alive?
    }
    Object.assign(this, bk)
  }
  // Remove bricks
  kill() {
    this.life--
    if (this.life == 0) {
      this.alive = false
    } else if (this.life == 1) {
      this.image = imageFromPath(allImg.block1)
    }
  }
  // Ball and brick collision detection
  collide(ball) {
    let b = ball
    if (Math.abs((b.x + b.w / 2) - (this.x + this.w / 2)) < (b.w + this.w) / 2 &&
      Math.abs((b.y + b.h / 2) - (this.y + this.h / 2)) < (b.h + this.h) / 2) {
      this.kill()
      return true
    } else {
      return false
    }
  }
  // Calculate the x-axis velocity direction after the collision between the ball and the brick
  collideBlockHorn(ball) {
    let b = ball // small ball
    let bk = this // brick
    let rangeX = 0
    let rangeY = 0
    rangeX = Math.abs((b.x + b.w / 2) - (bk.x + bk.w / 2))
    rangeY = Math.abs((b.y + b.h / 2) - (bk.y + bk.h / 2))
    if (rangeX > bk.w / 2 && rangeX < (bk.w / 2 + b.w / 2) && rangeY < (bk.h / 2 + b.h / 2)) { // The X-axis direction intersects the four corners of the brick
      if (b.x < bk.x && b.speedX > 0 || b.x > bk.x && b.speedX < 0) { // When the ball is on the left side of the brick
        return false
      } else { // The ball is on the right side of the brick
        return true
      }
    }
    return false
  }
}
// scoreboard
class Score {
  constructor(_main) {
    let s = {
      x: _main.score_x, // x-axis coordinate
      y: _main.score_y, // y-axis coordinate
      text: 'Score:', // text score
      textLv: 'Level:', //Level text
      score: 200, //The score corresponding to each brick
      allScore: 0, // total score
      blockList: _main.blockList, // Collection of brick objects
      blockListLen: _main.blockList.length, // Total number of bricks
      lv: _main.LV, // current level
    }
    Object.assign(this, s)
  }
  // Calculate total score
  computeScore() {
    let num = 0
    let allNum = this.blockListLen
    num = this.blockListLen - this.blockList.length
    this.allScore = this.score * num
  }
}
// define scene
class Scene {
  constructor(lv) {
    let s = {
      lv: lv, // game difficulty level
      canvas: document.getElementById("canvas"), // canvas object
      blockList: [], // Brick coordinate collection
    }
    Object.assign(this, s)
  }
  // Instantiate all brick objects
  initBlockList() {
    this.creatBlockList()
    let arr = []
    for (let item of this.blockList) {
      for (let list of item) {
        if (list.type === 1) {
          let obj = new Block(list.x, list.y)
          arr.push(obj)
        } else if (list.type === 2) {
          let obj = new Block(list.x, list.y, 2)
          arr.push(obj)
        }
      }
    }
    return arr
  }
  // Create a two-dimensional array of brick coordinates and generate different levels
  creatBlockList() {
    let lv = this.lv, // game difficulty level
      c_w = this.canvas.width, // canvas width
      c_h = this.canvas.height, //canvas height
      xNum_max = c_w / 50, //The maximum number of bricks on the x-axis
      yNum_max = 12, //The maximum number of bricks on the y-axis
      x_start = 0, //x-axis starting coordinate, floating according to the number of bricks
      y_start = 60 // y-axis starting coordinate, default starts from 60

    switch (lv) {
      case 1: // equilateral triangle
        var xNum = 16, //The number of bricks on the first layer on the x-axis
          yNum = 9 //Y-axis brick layer number
        // Loop y-axis
        for (let i = 0; i < yNum; i++) {
          let arr = []
          // Modify the number of x-axis bricks on each layer
          if (i === 0) {
            xNum = 1
          } else if (i === 1) {
            xNum = 2
          } else {
            xNum += 2
          }
          x_start = (xNum_max - xNum) / 2 * 50 // Modify the starting coordinates of the x-axis bricks on each layer
          // loop x axis
          for (let k = 0; k < xNum; k++) {
            if (i < 3) { // The first three rows are special bricks
              arr.push({
                x: x_start + k * 50,
                y: y_start + i * 20,
                type: 2,
              })
            } else {
              arr.push({
                x: x_start + k * 50,
                y: y_start + i * 20,
                type: 1,
              })
            }
          }
          this.blockList.push(arr)
        }
        break
      case 2: // inverted triangle
        var xNum = 16, //The number of bricks on the first layer on the x-axis
          yNum = 9 //Y-axis brick layer number
        // Loop y-axis
        for (let i = 0; i < yNum; i++) {
          let arr = []
          // Modify the number of x-axis bricks on each layer
          if (i === yNum - 1) {
            xNum = 1
          } else if (i === 0) {
            xNum = xNum
          } else {
            xNum -= 2
          }
          x_start = (xNum_max - xNum) / 2 * 50 // Modify the starting coordinates of the x-axis bricks on each layer
          // loop x axis
          for (let k = 0; k < xNum; k++) {
            if (i < 3) { // The first three rows are special bricks
              arr.push({
                x: x_start + k * 50,
                y: y_start + i * 20,
                type: 2,
              })
            } else {
              arr.push({
                x: x_start + k * 50,
                y: y_start + i * 20,
                type: 1,
              })
            }
          }
          this.blockList.push(arr)
        }
        break
      case 3: // I-shaped
        var xNum = 16, //The number of bricks on the first layer on the x-axis
          yNum = 9 //Y-axis brick layer number
        // Loop y-axis
        for (let i = 0; i < yNum; i++) {
          let arr = []
          // Modify the number of x-axis bricks on each layer
          if (i === 0) {
            xNum = xNum
          } else if (i > 4) {
            xNum += 2
          } else {
            xNum -= 2
          }
          x_start = (xNum_max - xNum) / 2 * 50 // Modify the starting coordinates of the x-axis bricks on each layer
          // loop x axis
          for (let k = 0; k < xNum; k++) {
            if (i < 3) { // The first three rows are special bricks
              arr.push({
                x: x_start + k * 50,
                y: y_start + i * 20,
                type: 2,
              })
            } else {
              arr.push({
                x: x_start + k * 50,
                y: y_start + i * 20,
                type: 1,
              })
            }
          }
          this.blockList.push(arr)
        }
        break
    }
  }
}