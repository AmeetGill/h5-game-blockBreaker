"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Paddle = void 0;
const common_1 = require("./common");
// Define bezel objects
class Paddle {
    constructor(_main) {
        this.x = _main.paddle_x; // x-axis coordinate
        this.y = _main.paddle_y; // y-axis coordinate
        this.w = 102; // Image width
        this.h = 22; // Image height
        this.speed = 10; // x-axis moving speed
        this.ballSpeedMax = 8; // The maximum rebound speed of the ball
        this.image = (0, common_1.imageFromPath)(common_1.allImg.paddle); // Introduce picture object
        this.isLeftMove = true; // Can it be moved left
        this.isRightMove = true; // Can it be moved right
    }
    moveLeft() {
        this.x -= this.speed;
    }
    moveRight() {
        this.x += this.speed;
    }
    // Ball and baffle collision detection
    collide(ball) {
        let b = ball;
        let p = this;
        if (Math.abs((b.x + b.w / 2) - (p.x + p.w / 2)) < (b.w + p.w) / 2 &&
            Math.abs((b.y + b.h / 2) - (p.y + p.h / 2)) < (b.h + p.h) / 2) {
            return true;
        }
        return false;
    }
    // Calculate the x-axis velocity value after the collision between the ball and the baffle
    collideRange(ball) {
        let b = ball;
        let p = this;
        let rangeX = 0;
        rangeX = (p.x + p.w / 2) - (b.x + b.w / 2);
        if (rangeX < 0) { // The ball hits the left side of the baffle
            return rangeX / (b.w / 2 + p.w / 2) * p.ballSpeedMax;
        }
        else if (rangeX > 0) { // The ball hits the right side of the baffle
            return rangeX / (b.w / 2 + p.w / 2) * p.ballSpeedMax;
        }
    }
}
exports.Paddle = Paddle;
