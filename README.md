# JavaScript Calculator

## Overview

A clean, responsive calculator application built with HTML, CSS, and JavaScript that provides basic arithmetic operations. This calculator features a user-friendly interface with a display screen and buttons for number input and operations.

## Features

- **Basic Arithmetic Operations**: Addition, subtraction, multiplication, and division
- **Clear and Delete Functions**: Clear all input or delete the last character
- **Responsive Design**: Works on desktop and mobile devices
- **Keyboard Support**: Use your keyboard for input and operations
- **Error Handling**: Displays error messages for invalid operations (e.g., division by zero)
- **Calculation History**: View previous calculations (optional feature)
- **Clean UI**: Modern and intuitive user interface

## Technologies Used

- **HTML5**: Structure of the calculator
- **CSS3**: 
  - Styling and layout
  - Flexbox for responsive design
  - CSS Grid for button layout
  - Transitions for button effects
- **JavaScript**: 
  - Calculator logic and operations
  - Event handling
  - DOM manipulation

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/calculator.git
   cd calculator
   ```

2. **Open in a browser**
   - Simply open the `index.html` file in any modern web browser
   - Alternatively, use a local development server:
   ```bash
   # Using Python
   python -m http.server

   # Using Node.js (with http-server installed)
   npx http-server
   ```

## Project Structure

```
calculator/
│
├── index.html          # Main HTML file
├── styles.css          # CSS styles
└── script.js           # JavaScript functionality
```

## Usage

### Basic Operations

1. Click the number buttons to input numbers
2. Click operation buttons (+, -, ×, ÷) to select an operation
3. Click "=" to calculate the result
4. Click "C" to clear all input
5. Click "⌫" to delete the last character

### Keyboard Support

- Numbers: `0-9`
- Decimal point: `.`
- Addition: `+`
- Subtraction: `-`
- Multiplication: `*`
- Division: `/`
- Calculate: `Enter` or `=`
- Clear: `Escape`
- Delete: `Backspace`

## Implementation Details

### Calculator Class

The calculator is implemented using a JavaScript class that encapsulates the calculator's state and behavior:

```javascript
class Calculator {
  constructor(previousOperandElement, currentOperandElement) {
    this.previousOperandElement = previousOperandElement;
    this.currentOperandElement = currentOperandElement;
    this.clear();
  }
  
  // Methods for clear, delete, append number, choose operation, etc.
}
```

### Event Handling

The calculator uses event listeners to handle button clicks and keyboard input:

```javascript
// Button click events
document.querySelectorAll('[data-number]').forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.textContent);
    calculator.updateDisplay();
  });
});

// Keyboard events
document.addEventListener('keydown', event => {
  if (/^[0-9]$/.test(event.key)) calculator.appendNumber(event.key);
  // Other key handlers
});
```

## Customization

### Styling

Modify the `styles.css` file to change the calculator's appearance:

- Change the color scheme
- Adjust button sizes and spacing
- Modify fonts and text sizes

### Adding Features

You can extend the calculator with additional features:

- Scientific functions (square root, powers, trigonometry)
- Memory functions (M+, M-, MR, MC)
- Percentage calculations
- Unit conversions

## Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Opera (latest)

## Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature-branch`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some feature'`)
5. Push to the branch (`git push origin feature-branch`)
6. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.