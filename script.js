// script.js
document.addEventListener('DOMContentLoaded', () => {
    const glider = document.getElementById('glider');
    const obstacle = document.getElementById('obstacle');
    const scoreDisplay = document.getElementById('score');
    let score = 0;
    let obstacleSpeed = 5;

    // Move glider
    document.addEventListener('keydown', (e) => {
        const step = 15;
        let rect = glider.getBoundingClientRect();

        switch (e.key) {
            case 'ArrowUp':
                if (rect.top > 0) glider.style.top = `${rect.top - step}px`;
                break;
            case 'ArrowDown':
                if (rect.bottom < window.innerHeight) glider.style.top = `${rect.top + step}px`;
                break;
            case 'ArrowLeft':
                if (rect.left > 0) glider.style.left = `${rect.left - step}px`;
                break;
            case 'ArrowRight':
                if (rect.right < window.innerWidth) glider.style.left = `${rect.left + step}px`;
                break;
        }
    });

    // Generate and move obstacle
    function createObstacle() {
        let obstacleWidth = 80;
        let obstacleHeight = 60;
        let obstacleX = window.innerWidth;
        let obstacleY = Math.random() * (window.innerHeight - obstacleHeight);

        obstacle.style.width = `${obstacleWidth}px`;
        obstacle.style.height = `${obstacleHeight}px`;
        obstacle.style.top = `${obstacleY}px`;
        obstacle.style.left = `${obstacleX}px`;
        obstacle.style.transition = `left ${obstacleSpeed}s linear`;

        setTimeout(() => {
            obstacle.style.left = `-${obstacleWidth}px`;
        }, 100);

        let obstacleTimer = setInterval(() => {
            let gliderRect = glider.getBoundingClientRect();
            let obstacleRect = obstacle.getBoundingClientRect();

            if (gliderRect.right > obstacleRect.left &&
                gliderRect.left < obstacleRect.right &&
                gliderRect.bottom > obstacleRect.top &&
                gliderRect.top < obstacleRect.bottom) {
                    score ++;
                alert('Game Over! Your score: ' + score);
                
                scoreDisplay.textContent = `Score: ${score}`;
                resetGame();
                clearInterval(obstacleTimer);
            }

            if (parseFloat(obstacle.style.left) < -obstacleWidth) {
                score += 10;
                scoreDisplay.textContent = `Score: ${score}`;
                resetGame();
                clearInterval(obstacleTimer);
            }
        }, 100);
    }

    // Reset the game
    function resetGame() {
        obstacle.style.transition = 'none';
        obstacle.style.left = `${window.innerWidth}px`;
        setTimeout(() => {
            obstacle.style.transition = `left ${obstacleSpeed}s linear`;
            createObstacle();
        }, 1000); // Create a new obstacle after a delay
    }

    createObstacle(); // Start the game by creating the first obstacle
});
