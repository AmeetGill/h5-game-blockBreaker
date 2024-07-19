// Game main function
let _main = {
  LV: 1, // Initial level
  MAXLV: 3, // final level
  scene: null, // scene object
  blockList: null, // Collection of all brick objects
  ball: null, // ball object
  paddle: null, // paddle object
  score: null, // scoreboard object
  ball_x: 491, //The default x-axis coordinate of the ball
  ball_y: 432, //The default y-axis coordinate of the ball
  paddle_x: 449, // The default x-axis coordinate of the paddle
  paddle_y: 450, // The default y-axis coordinate of the paddle
  score_x: 10, // The default x-axis coordinate of the scoreboard
  score_y: 30, //The default y-axis coordinate of the scoreboard
  fps: 60, // The number of frames the game runs
  game: null, // main logical object of the game
  start: function () { // Game startup function
    let self = this
    /**
     * Generate scenes (generate different levels according to different difficulty levels of the game)
     */
    self.scene = new Scene(self.LV)
    // Instantiate a collection of all brick objects
    self.blockList = self.scene.initBlockList()
    /**
     * small ball
     */
    self.ball = new Ball(self)
    /**
     * Baffle
     */
    self.paddle = new Paddle(self)
    /**
     * Scoreboard
     */
    self.score = new Score(self)
    /**
     * Main logic of the game
     */
    self.game = new Game(self)
    /**
     * Game initialization
     */
    self.game.init(self)
  }
}
_main.start()