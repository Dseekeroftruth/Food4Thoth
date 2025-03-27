console.log('Renderer script loaded');

// Ensure math.js is accessed after the DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    try {
        console.log('Math.js version:', math.version);

        const result = math.evaluate('2 + 3');
        console.log('2 + 3 =', result);
    } catch (error) {
        console.error('Failed to load or use math.js:', error);
    }
});

const display = document.getElementById('display');
const buttons = document.querySelectorAll('.button'); // For clickable buttons
const outputImage = document.getElementById('outputImage'); // Reference
const clearButton = document.getElementById('clearButton');


let isFirstPress = true; // Track the first button press



let clearPressedOnce = false;
let lastResult = null;

function clearDisplay() {
    if (!clearPressedOnce) {
        // First press: Clear current input but keep last result
        display.textContent = '0';
        resetDisplayStyles(); // Reset font and display styles

        // Change 'C' button to 'AC'
        document.getElementById('clearButton').textContent = 'AC';

        clearPressedOnce = true;
    } else {
        // Second press: All Clear, reset everything
        display.textContent = '0';
        resetDisplayStyles(); // Reset font and display styles

        lastResult = null;

        // Change 'AC' button back to 'C'
        document.getElementById('clearButton').textContent = 'C';

        clearPressedOnce = false;
    }
}

function deleteLast() {
    display.textContent = display.textContent.slice(0, -1) || '0';
    adjustFontSize(); // Adjust font size after deletion

    // Reset clearPressedOnce and button label
    resetClearButton();
}

function appendCharacter(char) {
    // Reset clearPressedOnce and button label
    resetClearButton();

    // Handle square root symbol
    if (char === '√') {
        char = 'sqrt(';
    } else if (['sin', 'cos', 'tan', 'log', 'ln'].includes(char)) {
        char += '(';
    }

    if (display.textContent === '0' && isOperator(char) && lastResult !== null) {
        // Start new expression with last result
        display.textContent = lastResult + char;
    } else if (display.textContent === '0' && char !== '.') {
        display.textContent = char;
    } else {
        display.textContent += char;
    }
    adjustFontSize(); // Adjust font size to fit content
}

function calculateResult() {
    // Reset clearPressedOnce and button label
    resetClearButton();

    const expression = display.textContent;
    try {
        // Validate expression to prevent evaluation errors
        if (isOperator(expression.slice(-1))) {
            displayError('Incomplete expression');
            return;
        }

        // Evaluate the expression using Math.js
        let result = evaluateExpression(expression);

        if (result === Infinity || result === -Infinity) {
            displayError('Cannot divide by zero');
        } else if (isNaN(result)) {
            displayError('Invalid expression');
        } else {
            result = formatLargeNumber(result);
            display.textContent = result;
            lastResult = result; // Store the last result
        }
    } catch (error) {
        displayError('Error');
        console.error(error);
    }

    adjustFontSize(); // Adjust font size after calculation
}

// Evaluation of the expression using Math.js
function evaluateExpression(expr) {
    // Allow only valid characters (digits, operators, parentheses, decimal point, function names)
    if (!/^[\d+\-*/^().\sA-Za-z]+$/.test(expr)) {
        throw new Error('Invalid characters in expression');
    }

    // Evaluate the expression using Math.js
    return math.evaluate(expr);
}

function isOperator(char) {
    return ['+', '-', '*', '/', '^'].includes(char);
}

function adjustFontSize() {
    const length = display.textContent.length;
    const baseFontSize = Math.min(window.innerWidth, window.innerHeight) * 0.09; // Base size proportional to screen

    // Adjust the font size based on content length and screen size
    const fontSize =
        length > 21 ? baseFontSize * 0.7 + 'px' :
        length > 14 ? baseFontSize * 0.75 + 'px' :
        length > 7 ? baseFontSize * 0.8 + 'px' :
                      baseFontSize + 'px';

    display.style.fontSize = fontSize;
    display.style.whiteSpace = 'pre-wrap';
    display.style.overflowWrap = 'break-word';
}

function adjustErrorFontSize() {
    const errorFontSize = Math.min(window.innerWidth, window.innerHeight) * 0.09; // Responsive error font size
    display.style.fontSize = errorFontSize + 'px';
}

function resetDisplayStyles() {
    const baseFontSize = Math.min(window.innerWidth, window.innerHeight) * 0.09; // Base size proportional to screen
    display.style.fontSize = baseFontSize + 'px';
    display.style.whiteSpace = 'nowrap';
    display.style.overflowWrap = 'normal';
}

function displayError(message) {
    display.textContent = message.length > 18 ? message.slice(0, 40) + '...' : message;
    display.classList.add('error');
    adjustErrorFontSize();

    setTimeout(() => {
        clearDisplay();
        display.classList.remove('error');
    }, 1000);
}

function formatLargeNumber(number) {
    if (Math.abs(number) < 1e15) {
        return number.toString();
    }

    // Convert large numbers to string without scientific notation
    let numberString = number.toLocaleString('fullwide', { useGrouping: false });

    // Trim trailing zeros from decimals, if any
    if (numberString.includes('.')) {
        numberString = numberString.replace(/(\.\d*?[1-9])0+$/, '$1');
        numberString = numberString.replace(/\.0+$/, '');
    }

    return numberString;
}

// Reset the clear button to its default state
function resetClearButton() {
    if (clearPressedOnce) {
        clearPressedOnce = false;
        document.getElementById('clearButton').textContent = 'C';
    }
}

// Event listener for key presses
document.addEventListener('keydown', (event) => {
    const key = event.key;

    // Define valid input keys
    if (
        /\d/.test(key) || // Numbers
        key === '.' ||
        key === '(' ||
        key === ')' ||
        isOperator(key) ||
        isFunctionKey(key)
    ) {
        // Fade out the image and reset display on first key press
        if (isFirstPress) {
            fadeOutImage();
        }
        appendCharacter(key);
    } else if (key === 'Enter' || key === '=') {
        event.preventDefault(); // Prevent page scroll
        calculateResult();
    } else if (key === 'Backspace' || key === 'DEL') {
        event.preventDefault(); // Prevent navigation
        deleteLast();
    } else if (key === 'Escape' || key === 'C' || key === 'AC') {
        event.preventDefault(); // Prevent unwanted behavior
        clearDisplay();
    }
});

// Check if the key is a function name
function isFunctionKey(key) {
    return ['sin', 'cos', 'tan', 'log', 'ln', 'sqrt'].includes(key);
}

// Function to handle image fade-out
function fadeOutImage() {
    if (isFirstPress) {
        outputImage.classList.add('hidden'); // Apply the fade-out effect
				resetDisplayStyles();
        isFirstPress = false; // Prevent further image hiding
    }
}

// Add click event listeners to all buttons
buttons.forEach(button => {
    button.addEventListener('click', () => {
        fadeOutImage(); // Fade out the image on first button press
        let char = button.textContent.trim();

        switch (char) {
            case 'C':
            case 'AC':
                clearDisplay();
                break;
            case 'DEL':
                deleteLast();
                break;
            case '=':
                calculateResult();
                break;
            default:
                appendCharacter(char);
                break;
        }
    });
});

// Reset display styles after the image fades
function resetDisplayStyles() {
    display.textContent = '0'; // Reset to initial value
    display.style.alignItems = 'flex-start'; // Align content to the top
}

window.addEventListener('resize', () => {
    adjustFontSize(); // Adjust font size on window resize
});

