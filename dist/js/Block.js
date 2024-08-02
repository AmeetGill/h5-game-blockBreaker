"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Block = void 0;
const common_1 = require("./common");
// Bricks
class Block {
    constructor(x, y, life = 1) {
        this.x = x; // x-axis coordinate
        this.y = y; // y-axis coordinate
        this.w = 50; // image width
        this.h = 20; // picture height
        this.image = life == 1 ? (0, common_1.imageFromPath)(common_1.allImg.block1) : (0, common_1.imageFromPath)(common_1.allImg.block2); // Image object
        this.life = life; // health value
        this.alive = true; // Is it alive?
    }
    // Remove bricks
    kill() {
        this.life--;
        if (this.life == 0) {
            this.alive = false;
        }
        else if (this.life == 1) {
            this.image = (0, common_1.imageFromPath)(common_1.allImg.block1);
        }
    }
    // Ball and brick collision detection
    collide(ball) {
        let b = ball;
        if (Math.abs((b.x + b.w / 2) - (this.x + this.w / 2)) < (b.w + this.w) / 2 &&
            Math.abs((b.y + b.h / 2) - (this.y + this.h / 2)) < (b.h + this.h) / 2) {
            this.kill();
            return true;
        }
        else {
            return false;
        }
    }
    // Calculate the x-axis velocity direction after the collision between the ball and the brick
    collideBlockHorn(ball) {
        let b = ball; // small ball
        let bk = this; // brick
        let rangeX = 0;
        let rangeY = 0;
        rangeX = Math.abs((b.x + b.w / 2) - (bk.x + bk.w / 2));
        rangeY = Math.abs((b.y + b.h / 2) - (bk.y + bk.h / 2));
        if (rangeX > bk.w / 2 && rangeX < (bk.w / 2 + b.w / 2) && rangeY < (bk.h / 2 + b.h / 2)) { // The X-axis direction intersects the four corners of the brick
            if (b.x < bk.x && b.speedX > 0 || b.x > bk.x && b.speedX < 0) { // When the ball is on the left side of the brick
                return false;
            }
            else { // The ball is on the right side of the brick
                return true;
            }
        }
        return false;
    }
}
exports.Block = Block;
