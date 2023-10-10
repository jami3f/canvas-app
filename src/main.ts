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
const num = 1000;
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

for (const ball of balls) {
	drawBall(ball);
}

function loop() {
	const mousePos = { x: 0, y: 0 };

	document.onmousemove = (e: MouseEvent) => {
		mousePos.x = e.clientX;
		mousePos.y = e.clientY;
	};

	for (const ball of balls) {
		const dx = ball.x - mousePos.x;
		const dy = ball.y - mousePos.y;
		const distance = Math.sqrt(dx * dx + dy * dy);
		const minDistance = 500000;
		if (distance < minDistance) {
			console.log("distance", distance);
			const angle = Math.atan2(dy, dx);
			const targetX = mousePos.x + Math.cos(angle) * distance;
			const targetY = mousePos.y + Math.sin(angle) * distance;
			ball.x += targetX;
			ball.y += targetY;
		}
		drawBall(ball);
	}
	window.requestAnimationFrame(loop);
}

window.requestAnimationFrame(loop);
