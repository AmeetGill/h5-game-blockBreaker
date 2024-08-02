"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Score = void 0;
class Score {
    constructor(_main) {
        this.x = _main.score_x; // x-axis coordinate
        this.y = _main.score_y; // y-axis coordinate
        this.text = 'Score:'; // text score
        this.textLv = 'Level:'; //Level text
        this.score = 200; //The score corresponding to each brick
        this.allScore = 0; // total score
        this.blockList = _main.blockList; // Collection of brick objects
        this.blockListLen = _main.blockList.length; // Total number of bricks
        this.lv = _main.LV; // current level
    }
    // Calculate total score
    computeScore() {
        let num = 0;
        let allNum = this.blockListLen;
        num = this.blockListLen - this.blockList.length;
        this.allScore = this.score * num;
    }
}
exports.Score = Score;
