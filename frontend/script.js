const imageName = 'roulette.png';

const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
const spinBtn = document.getElementById('spin-btn');

const wheelImg = new Image();
wheelImg.src = imageName;

wheelImg.onerror = function() {
    alert('Failed to load roulette.png. Please make sure it is in the correct folder.');
}

let angle = 0;        
let spinning = false;  
let spinSpeed = 0;    
let targetAngle = 0; 

/**
 * Function to draw the wheel
 */
function drawWheel() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate(angle);
    ctx.drawImage(
        wheelImg,
        -canvas.width / 2 + 10,
        -canvas.height / 2 + 10,
        canvas.width - 20,
        canvas.height - 20
    );
    ctx.restore();

    // Draw pointer
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 10);
    ctx.lineTo(canvas.width / 2 - 15, 40);
    ctx.lineTo(canvas.width / 2 + 15, 40);
    ctx.closePath();
    ctx.fillStyle = "#FFD700";
    ctx.fill();
    ctx.strokeStyle = "#222";
    ctx.stroke();
}

/**
 * Function to animate the wheel
 */
function animate() {
    if (spinning) {
        angle += spinSpeed;
        spinSpeed *= 0.98; // 0.98 to ensure the wheel slows down

        // when speed is low enough and angle is near target, stop spinning
        if (spinSpeed < 0.02 && Math.abs(angle % (2 * Math.PI) - targetAngle) < 0.05) {
            angle = targetAngle; // Snap to target
            spinning = false;
            spinBtn.disabled = false;
        } else {
            requestAnimationFrame(animate);
        }
        drawWheel();
    } else {
        drawWheel();
    }
}

// Start spinning
spinBtn.onclick = function () {
    if (spinning) return;
    spinBtn.disabled = true;
    let randomTurns = Math.floor(Math.random() * 4) + 4; // approx 4 to 7 full turns
    targetAngle = Math.random() * 2 * Math.PI;
    let totalSpin = randomTurns * 2 * Math.PI + targetAngle - (angle % (2 * Math.PI));
    spinSpeed = totalSpin / 60;
    spinning = true;
    animate();
};

wheelImg.onload = drawWheel;