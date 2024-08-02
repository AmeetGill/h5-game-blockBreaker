"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.allImg = exports.isPageHidden = exports.imageFromPath = exports.log = void 0;
// Encapsulate printing log method
const log = console.log.bind(console);
exports.log = log;
// Generate image object method
const imageFromPath = function (src) {
    let img = new Image();
    img.src = './images/' + src;
    return img;
};
exports.imageFromPath = imageFromPath;
// How to automatically pause the game when detecting that the page is invisible
const isPageHidden = function (game) {
    let hiddenProperty = 'hidden' in document ? 'hidden' :
        'webkitHidden' in document ? 'webkitHidden' :
            'mozHidden' in document ? 'mozHidden' :
                null;
    if (hiddenProperty === null) {
        log('This browser does not support page visibility API');
        return;
    }
    let visibilityChangeEvent = hiddenProperty.replace(/hidden/i, 'visibilitychange');
    // Listen for page visibility events
    document.addEventListener(visibilityChangeEvent, function () {
        // @ts-ignore
        if (!document[hiddenProperty]) { // Visible status
            setTimeout(function () {
                game.state = game.state_RUNNING;
            }, 100);
        }
        else { // invisible state
            game.state = game.state_STOP;
        }
    });
};
exports.isPageHidden = isPageHidden;
// Picture material path
const allImg = {
    background: 'background.jpg',
    paddle: 'paddle.png',
    ball: 'ball.png',
    block1: 'block001.png',
    block2: 'block002.png',
};
exports.allImg = allImg;
