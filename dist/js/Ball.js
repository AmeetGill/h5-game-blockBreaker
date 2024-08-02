"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ball = void 0;
const common_1 = require("./common");
// ball object
class Ball {
    constructor(_main) {
        this.x = _main.ball_x; // x-axis coordinate
        this.y = _main.ball_y; // y-axis coordinate
        this.w = 18; // image width
        this.h = 18; // picture height
        this.speedX = 1; // x-axis speed
        this.speedY = 5; // y-axis speed
        this.image = (0, common_1.imageFromPath)(common_1.allImg.ball); // Image object
        this.fired = false; // Whether to move, default is stationary
    }
    move(game) {
        if (this.fired) {
            // Collision boundary detection
            if (this.x < 0 || this.x > 1000 - this.w) {
                this.speedX *= -1;
            }
            if (this.y < 0) {
                this.speedY *= -1;
            }
            if (this.y > 500 - this.h) {
                // game over
                game.state = game.state_GAMEOVER;
            }
            // move
            this.x -= this.speedX;
            this.y -= this.speedY;
        }
    }
}
exports.Ball = Ball;
