"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Scene = void 0;
const Block_1 = require("./Block");
class Scene {
    constructor(lv) {
        this.lv = lv; // game difficulty level
        this.canvas = document.getElementById("canvas"); // canvas object
        this.blockList = []; // Brick coordinate collection
    }
    // Instantiate all brick objects
    initBlockList() {
        this.creatBlockList();
        let arr = [];
        for (let item of this.blockList) {
            for (let list of item) {
                if (list.type === 1) {
                    let obj = new Block_1.Block(list.x, list.y);
                    arr.push(obj);
                }
                else if (list.type === 2) {
                    let obj = new Block_1.Block(list.x, list.y, 2);
                    arr.push(obj);
                }
            }
        }
        return arr;
    }
    // Create a two-dimensional array of brick coordinates and generate different levels
    creatBlockList() {
        let lv = this.lv, // game difficulty level
        c_w = this.canvas.width, // canvas width
        c_h = this.canvas.height, //canvas height
        xNum_max = c_w / 50, //The maximum number of bricks on the x-axis
        yNum_max = 12, //The maximum number of bricks on the y-axis
        x_start = 0, //x-axis starting coordinate, floating according to the number of bricks
        y_start = 60; // y-axis starting coordinate, default starts from 60
        switch (lv) {
            case 1: // equilateral triangle
                var xNum = 16, //The number of bricks on the first layer on the x-axis
                yNum = 9; //Y-axis brick layer number
                // Loop y-axis
                for (let i = 0; i < yNum; i++) {
                    let arr = [];
                    // Modify the number of x-axis bricks on each layer
                    if (i === 0) {
                        xNum = 1;
                    }
                    else if (i === 1) {
                        xNum = 2;
                    }
                    else {
                        xNum += 2;
                    }
                    x_start = (xNum_max - xNum) / 2 * 50; // Modify the starting coordinates of the x-axis bricks on each layer
                    // loop x axis
                    for (let k = 0; k < xNum; k++) {
                        if (i < 3) { // The first three rows are special bricks
                            arr.push({
                                x: x_start + k * 50,
                                y: y_start + i * 20,
                                type: 2,
                            });
                        }
                        else {
                            arr.push({
                                x: x_start + k * 50,
                                y: y_start + i * 20,
                                type: 1,
                            });
                        }
                    }
                    this.blockList.push(arr);
                }
                break;
            case 2: // inverted triangle
                var xNum = 16, //The number of bricks on the first layer on the x-axis
                yNum = 9; //Y-axis brick layer number
                // Loop y-axis
                for (let i = 0; i < yNum; i++) {
                    let arr = [];
                    // Modify the number of x-axis bricks on each layer
                    if (i === yNum - 1) {
                        xNum = 1;
                    }
                    else if (i === 0) {
                        xNum = xNum;
                    }
                    else {
                        xNum -= 2;
                    }
                    x_start = (xNum_max - xNum) / 2 * 50; // Modify the starting coordinates of the x-axis bricks on each layer
                    // loop x axis
                    for (let k = 0; k < xNum; k++) {
                        if (i < 3) { // The first three rows are special bricks
                            arr.push({
                                x: x_start + k * 50,
                                y: y_start + i * 20,
                                type: 2,
                            });
                        }
                        else {
                            arr.push({
                                x: x_start + k * 50,
                                y: y_start + i * 20,
                                type: 1,
                            });
                        }
                    }
                    this.blockList.push(arr);
                }
                break;
            case 3: // I-shaped
                var xNum = 16, //The number of bricks on the first layer on the x-axis
                yNum = 9; //Y-axis brick layer number
                // Loop y-axis
                for (let i = 0; i < yNum; i++) {
                    let arr = [];
                    // Modify the number of x-axis bricks on each layer
                    if (i === 0) {
                        xNum = xNum;
                    }
                    else if (i > 4) {
                        xNum += 2;
                    }
                    else {
                        xNum -= 2;
                    }
                    x_start = (xNum_max - xNum) / 2 * 50; // Modify the starting coordinates of the x-axis bricks on each layer
                    // loop x axis
                    for (let k = 0; k < xNum; k++) {
                        if (i < 3) { // The first three rows are special bricks
                            arr.push({
                                x: x_start + k * 50,
                                y: y_start + i * 20,
                                type: 2,
                            });
                        }
                        else {
                            arr.push({
                                x: x_start + k * 50,
                                y: y_start + i * 20,
                                type: 1,
                            });
                        }
                    }
                    this.blockList.push(arr);
                }
                break;
        }
    }
}
exports.Scene = Scene;
