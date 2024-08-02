"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Main = void 0;
const game_1 = require("./game");
const Ball_1 = require("./Ball");
const paddle_1 = require("./paddle");
const Scene_1 = require("./Scene");
const score_1 = require("./score");
class Main {
    constructor(LV, MAXLV, ball_x, ball_y, paddle_x, paddle_y, score_x, score_y, fps, start_game) {
        this.actions = {};
        this.keydowns = {};
        this.LV = LV;
        this.MAXLV = MAXLV;
        this.scene = new Scene_1.Scene(this.LV);
        this.blockList = [];
        this.ball = new Ball_1.Ball(this);
        this.paddle = new paddle_1.Paddle(this);
        this.score = new score_1.Score(this);
        this.ball_x = ball_x;
        this.ball_y = ball_y;
        this.paddle_x = paddle_x;
        this.paddle_y = paddle_y;
        this.score_x = score_x;
        this.score_y = score_y;
        this.fps = fps;
        this.game = new game_1.Game(this);
        this.start_game = start_game;
    }
    registerAction(key, callback) {
        this.actions[key] = callback;
    }
    start() {
        this.game.init(this);
    }
}
exports.Main = Main;
