import  '../images/background.jpg'
import '../images/paddle.png';
import '../images/ball.png';
import '../images/block001.png';
import '../images/block002.png';

// Encapsulate printing log method
const log = console.log.bind(console);

// Generate image object metho

// How to automatically pause the game when detecting that the page is invisible
const isPageHidden = function (game: any) {
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
    if (!document[hiddenProperty]) {  // Visible status
      setTimeout(function () {
        game.state = game.state_RUNNING;
      }, 100);
    } else { // invisible state
      game.state = game.state_STOP;
    }
  });
};

// Picture material path
const allImg = {
  background: "images/background.jpg",
  paddle: "images/paddle.png",
  ball: "images/ball.png",
  block1: "images/block001.png",
  block2: "images/block002.png",
};

export { log, isPageHidden, allImg };