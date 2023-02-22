const previousOperationText = document.querySelector('#previous-operation');
const currentOperationText = document.querySelector('#current-operation');
const buttons = document.querySelectorAll('#btn-container button');

class Calculator{
    constructor(previousOperationText, currentOperationText){
        this.previousOperationText = previousOperationText;
        this.currentOperationText = currentOperationText;
        this.currentOperation = "";
    }

    addDigit(digit){
        if(digit ==="." && this.currentOperationText.innerText.includes(".")){
            return;
        }
        this.currentOperation = digit;
        this.updateScreen();
    }

    processOperation(operator){
        if(this.currentOperationText.innerText === "" && operator!=="C"){
            if(this.previousOperationText.innerText !== ""){
                this.changeOperation(operator);
            }
            return
        }

        let operationValue;
        const previous = +this.previousOperationText.innerText.split(" ")[0];
        const current = +this.currentOperationText.innerText;

        switch(operator){
            case "+":
                operationValue = previous + current;
                console.log(previous, operator, current, '=', operationValue)
                this.updateScreen(operationValue, operator, current, previous)
                break;
            case "-":
                operationValue= previous - current;
                console.log(previous, operator, current, '=', operationValue)
                this.updateScreen(operationValue, operator, current, previous);
                break;
            case "*":
                operationValue = previous * current;
                console.log(previous, operator, current, '=', operationValue)
                this.updateScreen(operationValue, operator, current, previous);
                break;
            case "/":
                operationValue = previous/current;
                console.log(previous, operator, current, '=', operationValue)
                this.updateScreen(operationValue, operator, current, previous);
                break;
            case 'DEL':
                this.processDelOperator();
                break;
            case "CE":
                this.processClearCurrentOperation();
                break;
            case "C":
                this.processClearOperation();
                break;
            case "=":
                this.processEqualOperator();
                break;
            default:
                return;
        }
    }

    updateScreen(operationValue=null, operator=null, current=null, previous=null){
        if(operationValue===null){
            this.currentOperationText.innerText += this.currentOperation;
        } else {
            if(previous===0){
                operationValue = current;
            }
            this.previousOperationText.innerText = `${operationValue} ${operator}`;
            this.currentOperationText.innerText = "";
        }
    }

    changeOperation(operation){
        const mathOperations = ["*", "/", "+", "-"]
        if(!mathOperations.includes(operation)){
            return;
        }
        this.previousOperationText.innerText = this.previousOperationText.innerText.slice(0,-1) + operation;
    }

    processDelOperator(){
        this.currentOperationText.innerText = this.currentOperationText.innerText.slice(0,-1);
    }

    processClearCurrentOperation(){
        this.currentOperationText.innerText="";
    }

    processClearOperation(){
        this.currentOperationText.innerText="";
        this.previousOperationText.innerText="";
    }

    processEqualOperator(){
        let operation = previousOperationText.innerText.split(' ')[1];
        this.processOperation(operation);
    }
}

const calc = new Calculator(previousOperationText, currentOperationText)

buttons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        const value = e.target.innerText;
        
        if(parseInt(value)>=0 || value ==='.'){
            calc.addDigit(value);
        } else {
            calc.processOperation(value);
        }
    })
})