import {Game} from './game';
import {Block} from "./Block";
import {Ball} from "./Ball";
import {Paddle} from "./paddle";
import {Scene} from "./Scene";
import {Score} from "./score";
import "../css/common.css";
import "../css/style.css";


export interface IMain {
  keydowns: any;
  LV: number;
  MAXLV: number;
  scene: Scene;
  blockList: Block[];
  ball: Ball;
  paddle: Paddle;
  score: Score;
  ball_x: number;
  ball_y: number;
  paddle_x: number;
  paddle_y: number;
  score_x: number;
  score_y: number;
  fps: number;
  game: Game | null;
  start_game: boolean;
  start: () => void;
}

export class Main implements IMain {
  actions: any;
  keydowns: any;
  LV: number;
  MAXLV: number;
  scene: Scene;
  blockList: Block[];
  ball: Ball;
  paddle: Paddle;
  score: Score;
  ball_x: number;
  ball_y: number;
  paddle_x: number;
  paddle_y: number;
  score_x: number;
  score_y: number;
  fps: number;
  game: Game;
  start_game: boolean;

  constructor(LV: number, MAXLV: number, ball_x: number, ball_y: number, paddle_x: number, paddle_y: number, score_x: number, score_y: number, fps: number, start_game: boolean) {
    this.actions = {};
    this.keydowns = {};
    this.LV = LV;
    this.MAXLV = MAXLV;
    this.scene = new Scene(this.LV);
    this.blockList = this.scene.initBlockList();
    this.ball_x = ball_x;
    this.ball_y = ball_y;
    this.paddle_x = paddle_x;
    this.paddle_y = paddle_y;
    this.score_x = score_x;
    this.score_y = score_y;
    this.ball = new Ball(this);
    this.paddle = new Paddle(this);
    this.score = new Score(this);
    this.fps = fps;
    this.game = new Game(this);
    this.start_game = start_game;
  }

  reinit() {
    this.scene = new Scene(this.LV);
    this.blockList = this.scene.initBlockList();
    this.ball = new Ball(this);
    this.paddle = new Paddle(this);
    this.score = new Score(this);
    this.game = new Game(this);
  }

  start() {
    this.reinit()
    this.game.init(this);
  }
}


let main = new Main(1, 3, 491, 431, 449, 450, 10, 30, 60, true);
main.start();
