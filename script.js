document.addEventListener('DOMContentLoaded', () => {
    const words = ['PROGRAMACAO', 'JAVASCRIPT', 'HTML', 'CSS', 'ALGORITMO',
        'DESENVOLVIMENTO', 'SOFTWARE', 'HARDWARE', 'COMPUTADOR', 'INTERNET',
        'PYTHON', 'JAVA', 'RUBY', 'SWIFT', 'KOTLIN', 'REACT', 'ANGULAR', 
        'VUE', 'NODE', 'DATABASE', 'SQL', 'NOSQL', 'GITHUB', 'VERSIONAMENTO',
        'INTELIGENCIA', 'ARTIFICIAL', 'MACHINE', 'LEARNING', 'BIGDATA'];
    let selectedWord;
    let guessedLetters;
    let attempts;

    const wordContainer = document.getElementById('word-container');
    const lettersContainer = document.getElementById('letters-container');
    const message = document.getElementById('message');
    const restartButton = document.getElementById('restart-button');

    function initializeGame() {
        selectedWord = words[Math.floor(Math.random() * words.length)];
        guessedLetters = [];
        attempts = 6;
        message.textContent = '';
        restartButton.style.display = 'none';
        displayWord();
        displayLetters();
    }

    function displayWord() {
        wordContainer.innerHTML = '';
        let wordDisplay = '';
        for (let letter of selectedWord) {
            if (guessedLetters.includes(letter)) {
                wordDisplay += `${letter} `;
            } else {
                wordDisplay += '_ ';
            }
        }
        wordContainer.textContent = wordDisplay.trim();
    }

    function displayLetters() {
        lettersContainer.innerHTML = '';
        for (let i = 65; i <= 90; i++) {
            const letter = String.fromCharCode(i);
            const button = document.createElement('button');
            button.textContent = letter;
            button.classList.add('letter-button');
            button.disabled = guessedLetters.includes(letter) || attempts <= 0;
            button.addEventListener('click', () => handleGuess(letter));
            lettersContainer.appendChild(button);
        }
    }

    function handleGuess(letter) {
        if (selectedWord.includes(letter)) {
            guessedLetters.push(letter);
            if (!selectedWord.split('').some(l => !guessedLetters.includes(l))) {
                message.textContent = 'Você venceu!';
                endGame();
            }
        } else {
            attempts--;
            if (attempts === 0) {
                message.textContent = `Você perdeu! A palavra era: ${selectedWord}`;
                endGame();
            }
        }
        displayWord();
        displayLetters();
    }

    function endGame() {
        document.querySelectorAll('.letter-button').forEach(button => {
            button.disabled = true;
        });
        restartButton.style.display = 'inline-block';
    }

    restartButton.addEventListener('click', initializeGame);

    initializeGame();
});
