const canvas = document.querySelector<HTMLCanvasElement>("#canvas")!;
const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);
const ctx = canvas.getContext("2d")!;
const balls: IBall[] = [];

interface IBall {
	x: number;
	y: number;
	radius: number;
	originalPos: { x: number; y: number };
}

console.log(width, height);

const num = 400;
const rowLength = Math.round(Math.sqrt(num));
const gap = 30;
for (let i = 0; i < num; i++) {
	const gridX = width / 4 + (i % rowLength) * gap;
	const gridY = height / 8 + Math.floor(i / rowLength) * gap;
	balls.push({
		x: gridX,
		y: gridY,
		radius: 5,
		originalPos: { x: gridX, y: gridY },
	});
	drawBall(balls[i]);
}

function drawBall(ball: IBall) {
	ctx.beginPath();
	ctx.arc(ball.x, ball.y, ball.radius, 0, 2 * Math.PI);
	ctx.fill();
}

const mousePos = { x: 0, y: 0 };
document.onmousemove = (e: MouseEvent) => {
	mousePos.x = e.clientX;
	mousePos.y = e.clientY;
};

document.onclick = () => {
	for (const ball of balls) {
		randomisePosition(ball);
	}
};

let i = 0;
function loop() {
	ctx.clearRect(0, 0, width, height);

	for (const ball of balls) {
		const target = ball.originalPos;
		const mouseDirection = {
			x: mousePos.x - ball.x,
			y: mousePos.y - ball.y,
		};
		const targetDirection = {
			x: target.x - ball.x,
			y: target.y - ball.y,
		};

		console.log(ball);

		const mouseDistance = Math.max(
			Math.sqrt(mouseDirection.x * mouseDirection.x + mouseDirection.y * mouseDirection.y),
			0.01
		);

		console.log(mouseDistance);

		let targetDistance = Math.sqrt(targetDirection.x * targetDirection.x + targetDirection.y * targetDirection.y);

		console.log(targetDistance);

		console.log(mouseDistance);

		const targetForce = {
			x: targetDirection.x,
			y: targetDirection.y,
		};
		console.log(targetForce);

		const mouseForce = {
			x: -mouseDirection.x * (1 / (mouseDistance * mouseDistance)) * 10000,
			y: -mouseDirection.y * (1 / (mouseDistance * mouseDistance)) * 10000,
		};

		console.log(mouseForce);

		const force = {
			x: targetForce.x + mouseForce.x,
			y: targetForce.y + mouseForce.y,
		};

		console.log(force);

		ball.x += force.x / 1;
		ball.y += force.y / 1;

		ball.x = Math.max(ball.radius, Math.min(width - ball.radius, ball.x));
		ball.y = Math.max(ball.radius, Math.min(height - ball.radius, ball.y));
		if (ball.x < ball.radius) ball.x = ball.radius;
		if (ball.y < ball.radius) ball.y = ball.radius;

		drawBall(ball);
		i += 0.01;
	}
}

function randomisePosition(ball: IBall) {
	ball.x = Math.random() * width;
	ball.y = Math.random() * height;
}

setInterval(loop, 1000 / 60);
