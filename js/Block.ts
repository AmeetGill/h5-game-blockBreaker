import { allImg } from './common';

// Bricks
export class Block {
    x: number;
    y: number;
    w: number;
    h: number;
    image: HTMLImageElement;
    life: number;
    alive: boolean;

    constructor(x: number, y: number, life: number = 1) {
        this.x = x // x-axis coordinate
        this.y = y // y-axis coordinate
        this.w = 50 // image width
        this.h = 20 // picture height
        this.image = new Image() // Introduce picture object
        this.image.src = life == 1 ? allImg.block1 : allImg.block2 // Image object
        this.life = life // health value
        this.alive = true // Is it alive?
    }

    // Remove bricks
    kill() {
        this.life--;
        if (this.life == 0) {
            this.alive = false;
        } else if (this.life == 1) {
            this.image.src = allImg.block1;
        }
    }

    // Ball and brick collision detection
    collide(ball: any) {
        let b = ball;
        if (Math.abs((b.x + b.w / 2) - (this.x + this.w / 2)) < (b.w + this.w) / 2 &&
            Math.abs((b.y + b.h / 2) - (this.y + this.h / 2)) < (b.h + this.h) / 2) {
            this.kill();
            return true;
        } else {
            return false;
        }
    }

    // Calculate the x-axis velocity direction after the collision between the ball and the brick
    collideBlockHorn(ball: any) {
        let b = ball; // small ball
        let bk = this; // brick
        let rangeX = 0;
        let rangeY = 0;
        rangeX = Math.abs((b.x + b.w / 2) - (bk.x + bk.w / 2));
        rangeY = Math.abs((b.y + b.h / 2) - (bk.y + bk.h / 2));
        if (rangeX > bk.w / 2 && rangeX < (bk.w / 2 + b.w / 2) && rangeY < (bk.h / 2 + b.h / 2)) { // The X-axis direction intersects the four corners of the brick
            if (b.x < bk.x && b.speedX > 0 || b.x > bk.x && b.speedX < 0) { // When the ball is on the left side of the brick
                return false;
            } else { // The ball is on the right side of the brick
                return true;
            }
        }
        return false;
    }
}