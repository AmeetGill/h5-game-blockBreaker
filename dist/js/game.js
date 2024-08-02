"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const common_1 = require("./common");
class Game {
    constructor(main) {
        this.main = main;
        this.actions = {};
        this.keydowns = {};
        this.state = 1;
        this.state_START = 1;
        this.state_RUNNING = 2;
        this.state_STOP = 3;
        this.state_GAMEOVER = 4;
        this.state_UPDATE = 5;
        this.canvas = document.getElementById("canvas");
        this.context = this.canvas.getContext("2d");
        this.timer = null;
        this.fps = main.fps;
    }
    draw(paddle, ball, blockList, score) {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawBg();
        this.drawImage(paddle);
        this.drawImage(ball);
        this.drawBlocks(blockList);
        this.drawText(score);
    }
    drawImage(obj) {
        this.context.drawImage(obj.image, obj.x, obj.y);
    }
    drawBg() {
        const bg = (0, common_1.imageFromPath)(common_1.allImg.background);
        this.context.drawImage(bg, 0, 0);
    }
    drawBlocks(list) {
        for (const item of list) {
            this.drawImage(item);
        }
    }
    drawText(obj) {
        this.context.font = '24px Microsoft YaHei';
        this.context.fillStyle = '#fff';
        this.context.fillText(obj.text + obj.allScore, obj.x, obj.y);
        this.context.fillText(obj.textLv + obj.lv, this.canvas.width - 100, obj.y);
    }
    gameOver() {
        clearInterval(this.timer);
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawBg();
        this.context.font = '48px Microsoft YaHei';
        this.context.fillStyle = '#fff';
        this.context.fillText('Game over', 404, 226);
    }
    goodGame() {
        clearInterval(this.timer);
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawBg();
        this.context.font = '48px Microsoft YaHei';
        this.context.fillStyle = '#fff';
        this.context.fillText('Congratulations on advancing to the next level', 308, 226);
    }
    finalGame() {
        clearInterval(this.timer);
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawBg();
        this.context.font = '48px Microsoft YaHei';
        this.context.fillStyle = '#fff';
        this.context.fillText('Congratulations on passing all levels', 308, 226);
    }
    registerAction(key, callback) {
        this.actions[key] = callback;
    }
    checkBallBlock(g, paddle, ball, blockList, score) {
        const p = paddle, b = ball;
        if (p.collide(b)) {
            if (Math.abs(b.y + b.h / 2 - p.y + p.h / 2) > Math.abs(b.y + b.h / 2 + b.speedY - p.y + p.h / 2)) {
                b.speedY *= -1;
            }
            else {
                b.speedY *= 1;
            }
            b.speedX = p.collideRange(b);
        }
        blockList.forEach((item, i, arr) => {
            if (item.collide(b)) {
                if (!item.alive) {
                    arr.splice(i, 1);
                }
                if ((b.y < item.y && b.speedY < 0) || (b.y > item.y && b.speedY > 0)) {
                    if (!item.collideBlockHorn(b)) {
                        b.speedY *= -1;
                    }
                    else {
                        b.speedY *= 1;
                    }
                }
                else {
                    b.speedY *= 1;
                }
                if (item.collideBlockHorn(b)) {
                    b.speedX *= -1;
                }
                score.computeScore();
            }
        });
        if (p.x <= 0) {
            p.isLeftMove = false;
        }
        else {
            p.isLeftMove = true;
        }
        if (p.x >= 1000 - p.w) {
            p.isRightMove = false;
        }
        else {
            p.isRightMove = true;
        }
        b.move(g);
    }
    setTimer(paddle, ball, blockList, score) {
        let g = this;
        const main = g.main;
        g.timer = setInterval(() => {
            const actions = Object.keys(g.actions);
            for (const key of actions) {
                if (g.keydowns[key]) {
                    g.actions[key]();
                }
            }
            if (blockList.length === 0) {
                if (main.LV === main.MAXLV) {
                    g.state = g.state_UPDATE;
                    g.finalGame();
                }
                else {
                    g.state = g.state_UPDATE;
                    g.goodGame();
                }
            }
            if (g.state === g.state_GAMEOVER) {
                g.gameOver();
            }
            if (g.state === g.state_RUNNING) {
                g.checkBallBlock(g, paddle, ball, blockList, score);
                g.draw(paddle, ball, blockList, score);
            }
            else if (g.state === g.state_START) {
                g.draw(paddle, ball, blockList, score);
            }
        }, 1000 / g.fps);
    }
    init(m) {
        const g = m;
        const { paddle, ball, blockList, score } = m;
        window.addEventListener('keydown', (event) => {
            g.keydowns[event.keyCode] = true;
        });
        window.addEventListener('keyup', (event) => {
            g.keydowns[event.keyCode] = false;
        });
        g.registerAction = (key, callback) => {
            g.actions[key] = callback;
        };
        g.registerAction('37', () => {
            if (this.state === this.state_RUNNING && paddle.isLeftMove) {
                paddle.moveLeft();
            }
        });
        g.registerAction('39', () => {
            if (this.state === this.state_RUNNING && paddle.isRightMove) {
                paddle.moveRight();
            }
        });
        window.addEventListener('keydown', (event) => {
            switch (event.keyCode) {
                case 32:
                    if (this.state === this.state_GAMEOVER) {
                        this.state = this.state_START;
                        this.main.start();
                    }
                    else {
                        ball.fired = true;
                        this.state = this.state_RUNNING;
                    }
                    break;
                case 78:
                    if (this.state === this.state_UPDATE && this.main.LV !== this.main.MAXLV) {
                        this.state = this.state_START;
                        this.main.start(++this.main.LV);
                    }
                    break;
                case 80:
                    this.state = this.state_STOP;
                    break;
            }
        });
        this.setTimer(paddle, ball, blockList, score);
    }
}
exports.Game = Game;
