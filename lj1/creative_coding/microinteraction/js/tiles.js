document.addEventListener('DOMContentLoaded', function () {
	const tilesContainer = document.getElementById('energie_gevend');
	const tiles = tilesContainer.querySelectorAll('.tile');
	let infectionInterval = null;
	let pulseInterval = null;

	tiles.forEach(tile => {
		tile.infected = false;
		tile.addEventListener('click', () => {
			if (!tile.infected) {
				infectTile(tile);
				if (!infectionInterval) {
					startInfection();
					startPulseEffect();
				}
			} else {
				cureTile(tile);
			}
		});
	});

	const grid = [];
	const ROWS = 12;
	const COLS = 12;

	for (let r = 0; r < ROWS; r++) {
		grid[r] = [];
		for (let c = 0; c < COLS; c++) {
			grid[r][c] = tiles[r * COLS + c];
		}
	}

	function getTilePosition(tile) {
		const index = Array.from(tiles).indexOf(tile);
		return {
			row: Math.floor(index / COLS),
			col: index % COLS
		};
	}

	function getNeighbors(tile) {
		const pos = getTilePosition(tile);
		const neighbors = [];
		const directions = [
			[-1, -1], [-1, 0], [-1, 1],
			[0, -1], [0, 1],
			[1, -1], [1, 0], [1, 1]
		];

		directions.forEach(dir => {
			const newRow = pos.row + dir[0];
			const newCol = pos.col + dir[1];
			if (newRow >= 0 && newRow < ROWS && newCol >= 0 && newCol < COLS) {
				neighbors.push(grid[newRow][newCol]);
			}
		});
		return neighbors;
	}

	function infectTile(tile) {
		if (!tile.infected) {
			tile.infected = true;
			tile.classList.add('infected');
		}
	}

	function cureTile(tile) {
		if (tile.infected) {
			tile.infected = false;
			tile.classList.remove('infected');
			tile.classList.remove('pulse');
		}
	}

	function resetBoard() {
		clearInterval(infectionInterval);
		infectionInterval = null;
		clearInterval(pulseInterval);
		pulseInterval = null;

		tiles.forEach(tile => {
			if (tile.infected) {
				tile.classList.add('curing');
			}
			tile.classList.remove('pulse');
		});

		setTimeout(() => {
			tiles.forEach(tile => {
				tile.infected = false;
				tile.classList.remove('infected');
				tile.classList.remove('curing');
			});
		}, 800);
	}

	function checkAllInfected() {
		const allInfected = Array.from(tiles).every(tile => tile.infected);
		if (allInfected) {
			setTimeout(resetBoard, 500);
		}
	}

	function spreadInfection() {
		const infectedTiles = Array.from(tiles).filter(tile => tile.infected);
		infectedTiles.forEach(tile => {
			const neighbors = getNeighbors(tile).filter(n => !n.infected);
			if (neighbors.length === 0) return;
			const randomVal = Math.random() * 100;
			let tilesToInfect = 0;

			if (randomVal < 5) {
				tilesToInfect = 3;
			} else if (randomVal < 25) {
				tilesToInfect = 2;
			} else if (randomVal < 75) {
				tilesToInfect = 1;
			} else {
				tilesToInfect = 0;
			}

			tilesToInfect = Math.min(tilesToInfect, neighbors.length);
			const shuffled = [...neighbors].sort(() => 0.5 - Math.random());
			for (let i = 0; i < tilesToInfect; i++) {
				setTimeout(() => {
					infectTile(shuffled[i]);
					checkAllInfected();
				}, i * 200);
			}
		});
	}

	function startInfection() {
		infectionInterval = setInterval(spreadInfection, 1200);
	}

	function startPulseEffect() {
		pulseInterval = setInterval(() => {
			const infectedTiles = Array.from(tiles).filter(tile => tile.infected);

			tiles.forEach(t => t.classList.remove('pulse'));

			let index = 0;
			const animationStep = 50;

			const animateNextTile = () => {
				if (index < infectedTiles.length) {
					const currentTile = infectedTiles[index];
					const infectedNeighbors = getNeighbors(currentTile).filter(n => n.infected);

					if (infectedNeighbors.length > 0) {
						currentTile.classList.add('pulse');
					}

					index++;
					setTimeout(animateNextTile, animationStep);
				}
			};

			animateNextTile();
		}, 500);
	}

	const style = document.createElement('style');
	style.textContent = `
        .tile {
            transition: background-color 0.3s ease;
            cursor: pointer;
            position: relative;
        }
        .infected {
            background-color: #ff5252;
            box-shadow: 0 0 8px rgba(255, 82, 82, 0.7);
        }
        .pulse {
            animation: pulse-effect 0.5s ease;
        }
        .curing {
            animation: fade-out 0.8s forwards;
        }
        @keyframes fade-out {
            from { background-color: #ff5252; }
            to { background-color: transparent; }
        }
        @keyframes pulse-effect {
            0% { box-shadow: 0 0 8px rgba(255, 82, 82, 0.7); }
            50% { box-shadow: 0 0 16px rgba(255, 82, 82, 1); }
            100% { box-shadow: 0 0 8px rgba(255, 82, 82, 0.7); }
        }
    `;
	document.head.appendChild(style);
});