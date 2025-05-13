class Calculator {
  constructor(previousOperandElement, currentOperandElement) {
    this.previousOperandElement = previousOperandElement
    this.currentOperandElement = currentOperandElement
    this.clear()
  }

  clear() {
    this.currentOperand = "0"
    this.previousOperand = ""
    this.operation = undefined
    this.shouldResetScreen = false
  }

  delete() {
    if (this.currentOperand === "0") return
    if (this.currentOperand.length === 1) {
      this.currentOperand = "0"
    } else {
      this.currentOperand = this.currentOperand.slice(0, -1)
    }
  }

  appendNumber(number) {
    if (this.shouldResetScreen) {
      this.currentOperand = ""
      this.shouldResetScreen = false
    }

    if (number === "." && this.currentOperand.includes(".")) return
    if (this.currentOperand === "0" && number !== ".") {
      this.currentOperand = number
    } else {
      this.currentOperand += number
    }
  }

  chooseOperation(operation) {
    if (this.currentOperand === "") return

    if (this.previousOperand !== "") {
      this.compute()
    }

    this.operation = operation
    this.previousOperand = this.currentOperand
    this.currentOperand = ""
  }

  compute() {
    let computation
    const prev = Number.parseFloat(this.previousOperand)
    const current = Number.parseFloat(this.currentOperand)

    if (isNaN(prev) || isNaN(current)) return

    switch (this.operation) {
      case "+":
        computation = prev + current
        break
      case "-":
        computation = prev - current
        break
      case "×":
        computation = prev * current
        break
      case "÷":
        if (current === 0) {
          this.currentOperand = "Error"
          this.previousOperand = ""
          this.operation = undefined
          this.shouldResetScreen = true
          return
        }
        computation = prev / current
        break
      default:
        return
    }

    this.currentOperand = computation.toString()
    this.operation = undefined
    this.previousOperand = ""
    this.shouldResetScreen = true
  }

  getDisplayNumber(number) {
    if (number === "Error") return "Error"

    const stringNumber = number.toString()
    const integerDigits = Number.parseFloat(stringNumber.split(".")[0])
    const decimalDigits = stringNumber.split(".")[1]

    let integerDisplay

    if (isNaN(integerDigits)) {
      integerDisplay = ""
    } else {
      integerDisplay = integerDigits.toLocaleString("en", {
        maximumFractionDigits: 0,
      })
    }

    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`
    } else {
      return integerDisplay
    }
  }

  updateDisplay() {
    this.currentOperandElement.textContent = this.getDisplayNumber(this.currentOperand)

    if (this.operation != null) {
      this.previousOperandElement.textContent = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
    } else {
      this.previousOperandElement.textContent = ""
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const previousOperandElement = document.getElementById("previous-operand")
  const currentOperandElement = document.getElementById("current-operand")
  const calculator = new Calculator(previousOperandElement, currentOperandElement)

  // Number buttons
  document.querySelectorAll("[data-number]").forEach((button) => {
    button.addEventListener("click", () => {
      calculator.appendNumber(button.getAttribute("data-number"))
      calculator.updateDisplay()
    })
  })

  // Operation buttons
  document.querySelectorAll("[data-action]").forEach((button) => {
    button.addEventListener("click", () => {
      const action = button.getAttribute("data-action")

      switch (action) {
        case "add":
          calculator.chooseOperation("+")
          break
        case "subtract":
          calculator.chooseOperation("-")
          break
        case "multiply":
          calculator.chooseOperation("×")
          break
        case "divide":
          calculator.chooseOperation("÷")
          break
        case "equals":
          calculator.compute()
          break
        case "clear":
          calculator.clear()
          break
        case "delete":
          calculator.delete()
          break
      }

      calculator.updateDisplay()
    })
  })

  // Keyboard support
  document.addEventListener("keydown", (event) => {
    if (/^[0-9]$/.test(event.key)) {
      calculator.appendNumber(event.key)
    } else if (event.key === ".") {
      calculator.appendNumber(".")
    } else if (event.key === "+") {
      calculator.chooseOperation("+")
    } else if (event.key === "-") {
      calculator.chooseOperation("-")
    } else if (event.key === "*") {
      calculator.chooseOperation("×")
    } else if (event.key === "/") {
      event.preventDefault()
      calculator.chooseOperation("÷")
    } else if (event.key === "Enter" || event.key === "=") {
      event.preventDefault()
      calculator.compute()
    } else if (event.key === "Escape") {
      calculator.clear()
    } else if (event.key === "Backspace") {
      calculator.delete()
    }

    calculator.updateDisplay()
  })
})
