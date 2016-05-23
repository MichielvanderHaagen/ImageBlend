/* Credits: To have the canvas as large as the size of the window
 * I followd istructions from http://stackoverflow.com/questions/1664785/resize-html5-canvas-to-fit-window
 * 17-4-2015
 *
 * In order to make the text fade out if the mouse is inactive I used:
 * http://blog.videojs.com/post/57828375480/hiding-and-showing-video-player-controls
 * 25-4-2015
 *
 * In order to check wether an URL is an image I used 
 * http://stackoverflow.com/questions/9809015/image-onerror-event-never-fires-but-image-isnt-valid-data-need-a-work-around
 * 10-05-2015 
 */


var img = new Image();
var x = -5;
var y = -50;
var vx = -1;
var vy = -1;
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var userActivity = true;
var activityCheck, inactivityTimeout;

function draw() {
  "use strict";
  ctx.canvas.width  = window.innerWidth;
  ctx.canvas.height = window.innerHeight;
  ctx.globalCompositeOperation = 'destination-over';
  ctx.save();
  if (x < ctx.canvas.width - img.width) {vx = -vx; }
  if (y < ctx.canvas.height - img.height) {vy = -vy; }
  if (x > -1) {vx = -vx; }
  if (y > -1) {vy = -vy; }
  x = x + vx;
  y = y + vy;
  ctx.globalAlpha = 0.5;
  ctx.drawImage(img, x, y);
  ctx.globalAlpha = 1;
  ctx.scale(-1, 1);
  ctx.translate(-ctx.canvas.width, 0);
  ctx.drawImage(img, x, y);
  ctx.restore();
  window.requestAnimationFrame(draw);
}

function resize_canvas() {
  if (canvas.width < window.innerWidth) {
    canvas.width = window.innerWidth;
  }
  if (canvas.height < window.innerHeight) {
    canvas.height = window.innerHeight;
  }
  if (x < ctx.canvas.width - img.width) { x = ctx.canvas.width - img.width; }
  if (y < ctx.canvas.height - img.height) { y = ctx.canvas.height - img.height; }
  if (x > 0) {x = 0; }
  if (y > 0) {y = 0; }
}


function loadImage(src) {
		document.getElementById("errorMessage").innerHTML = "";
    img.onload = function() {
        if ('naturalHeight' in this) {
            if (this.naturalHeight + this.naturalWidth === 0) {
                this.onerror();
                return;
            }
        } else if (this.width + this.height == 0) {
            this.onerror();
            return;
        }
        // At this point, there's no error.
        
    };
    img.onerror = function() {
        //display error
        loadImage('http://vanderhaagen.org/michiel/html5/media/pioen.jpg');
        document.getElementById("errorMessage").innerHTML = "That's not an image URL";
    };
    img.src = src;
}

function changeImage() {
	loadImage(document.imageform.imageUrl.value);
  x = -5;
  y = -50;
  vx = -1;
  vy = -1;
  return false;
}

function init() {
	loadImage('http://vanderhaagen.org/michiel/html5/media/pioen.jpg');
  window.requestAnimationFrame(draw);
}

document.getElementById("myCanvas").onmousemove = function () {userActivity = true; document.getElementById("myText").style.visibility = "visible"; };

activityCheck = setInterval(function () {
  // Check to see if the mouse has been moved
  if (userActivity) {

    // Reset the activity tracker
    userActivity = false;



    // Clear any existing inactivity timeout to start the timer over
    clearTimeout(inactivityTimeout);

    // In X seconds, if no more activity has occurred
    // the user will be considered inactive

    inactivityTimeout = setTimeout(function () {
      document.getElementById("myText").style.visibility = "hidden";
      // Protect against the case where the inactivity timeout can trigger
      // before the next user activity is picked up  by the
      // activityCheck loop.
      if (!userActivity) {
        this.userActive(false);
      }
    }, 6000);
  }
}, 250);
init();
