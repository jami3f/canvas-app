const canvas = document.querySelector<HTMLCanvasElement>("#canvas")!;
const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);
const ctx = canvas.getContext("2d")!;
const balls: IBall[] = [];

interface IBall {
	x: number;
	y: number;
	radius: number;
}

console.log(width, height);

const rowLength = 20;
const gap = 30;
const num = 1;
for (let i = 0; i < num; i++) {
	balls.push({
		x: width / 4 + (i % (rowLength / 2)) * gap,
		y: height / 8 + Math.floor(i / rowLength) * gap,
		radius: 5,
	});
}

function drawBall(ball: IBall) {
	ctx.beginPath();
	ctx.arc(ball.x, ball.y, ball.radius, 0, 2 * Math.PI);
	ctx.fill();
}

function loop() {
	ctx.clearRect(0, 0, width, height);
	const mousePos = { x: 0, y: 0 };

	document.onmousemove = (e: MouseEvent) => {
		mousePos.x = e.clientX;
		mousePos.y = e.clientY;
	};

	for (const ball of balls) {
		const MAX_SPEED = 0.1;
		const MIN_SPEED = 0.1; // Very slow if close but not frozen.
		const ATTRACTION = 0.5;
		const diff_x = mousePos.x - ball.x;
		const diff_y = mousePos.y - ball.y;
		// const distance = Math.sqrt(diff_x * diff_x + diff_y * diff_y);
		// let speed = distance * ATTRACTION;
		// if (speed > MAX_SPEED) speed = MAX_SPEED;
		// if (speed < MIN_SPEED) speed = MIN_SPEED;
		ball.x += diff_x * 0.02;
		// The rates along axes are proportional to speed;
		// we use ratios instead of sine / cosine.
		// ball.x += (diff_x / distance) * speed;
		// ball.y += (diff_y / distance) * speed;

		drawBall(ball);
	}
	window.requestAnimationFrame(loop);
}

setInterval(loop, 1000 / 60);
