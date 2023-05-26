class Calculator{
    constructor(previousOperandTextElement, currentOperandTextElement){
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }

    clear(){
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }

    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    evaluate(){
        let computation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN(current)) return 
        switch (this.operation){
            case "+": 
            computation = prev + current 
            break
            case "-": 
            computation = prev - current 
            break
            case "*": 
            computation = prev * current 
            break
            case "÷": 
            computation = prev / current 
            break 
            default: 
            return
        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ""
    }

    

    chooseOperation(operation){
        if(this.currentOperand === "") return 
        if(this.previousOperand !== ""){
            this.evaluate()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }

    getDisplayNumber(number){
        const stringnumber = number.toString()
        const integerDigits = parseFloat(stringnumber.split('.')[0])
        const decimalDigits = stringnumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = ''}
        else {
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0
            })
        }
        if(decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        }
        else{
            return `${integerDisplay}`
        }

    }
    appendNumber(number){
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString()+number.toString()
    }


    display(){
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand)
        if(this.operation != undefined){
            this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        }else {
            this.previousOperandTextElement.innerText = ""
        }
    }


}





const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

const calculator = new Calculator(previousOperandTextElement,
    currentOperandTextElement)


numberButtons.forEach(button => {
    button.addEventListener("click", () =>{
        calculator.appendNumber(button.innerText)
        calculator.display()
    })
})

operationButtons.forEach(button => {
    button.addEventListener("click", () =>{
        calculator.chooseOperation(button.innerText)
        calculator.display()
    })
})

equalsButton.addEventListener("click", (button) => {
        calculator.evaluate()
        calculator.display()
    })

deleteButton.addEventListener("click", (button) => {
        calculator.delete()
        calculator.display()
    })

allClearButton.addEventListener("click", (button) => {
        calculator.clear()
        calculator.display()
    })

