// Elementos del DOM
const timerDisplay = document.getElementById('timer');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const launchMessage = document.getElementById('launchMessage');

// Variables de estado
let timeLeft = 60;
let timerId;
let isRunning = false;
let isPaused = false;

// Crear estrellas de fondo
createStars();

// Event listeners para los botones
startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);

// Función para iniciar el temporizador
function startTimer() {
    // Si el temporizador ya está corriendo, no hacer nada
    if (isRunning && !isPaused) return;
    
    // Si estaba pausado, continuar sin reiniciar
    if (isPaused) {
        isPaused = false;
    } else {
        timeLeft = 60;
        timerDisplay.textContent = timeLeft;
    }
    
    // Actualizar estado y botones
    isRunning = true;
    startBtn.disabled = true;
    pauseBtn.disabled = false;
    resetBtn.disabled = false;
    launchMessage.classList.remove('show');
    
    // Iniciar el intervalo del temporizador
    timerId = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = timeLeft;
        
        // Efecto visual cuando quedan 5 segundos o menos
        if (timeLeft <= 5) {
            timerDisplay.classList.add('blink');
        } else {
            timerDisplay.classList.remove('blink');
        }
        
        // Cuando llega a cero
        if (timeLeft <= 0) {
            clearInterval(timerId);
            timerDisplay.textContent = '0';
            showLaunch();
            isRunning = false;
            startBtn.disabled = false;
            pauseBtn.disabled = true;
        }
    }, 1000);
}

// Función para pausar el temporizador
function pauseTimer() {
    if (!isRunning) return;
    
    clearInterval(timerId);
    isPaused = true;
    isRunning = false;
    pauseBtn.disabled = true;
    startBtn.disabled = false;
}

// Función para reiniciar el temporizador
function resetTimer() {
    clearInterval(timerId);
    timeLeft = 60;
    timerDisplay.textContent = timeLeft;
    isRunning = false;
    isPaused = false;
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    timerDisplay.classList.remove('blink');
    launchMessage.classList.remove('show');
}

// Función para mostrar el mensaje de despegue
function showLaunch() {
    launchMessage.classList.add('show');
    
    // Reiniciar la animación del cohete si se vuelve a mostrar
    const rocket = document.querySelector('.rocket');
    rocket.style.animation = 'none';
    setTimeout(() => {
        rocket.style.animation = '';
    }, 10);
}

// Función para crear estrellas de fondo decorativas
function createStars() {
    const container = document.createElement('div');
    container.className = 'stars-container';
    document.body.appendChild(container);
    
    // Crear 100 estrellas
    for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        // Posición aleatoria
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        
        // Tamaño aleatorio entre 1 y 3 píxeles
        const size = Math.random() * 2 + 1;
        
        // Duración de animación aleatoria
        const duration = Math.random() * 3 + 2;
        
        // Aplicar estilos
        star.style.left = `${x}vw`;
        star.style.top = `${y}vh`;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.setProperty('--duration', `${duration}s`);
        
        // Retraso aleatorio para que no todas parpadeen a la vez
        star.style.animationDelay = `${Math.random() * 5}s`;
        
        container.appendChild(star);
    }
}