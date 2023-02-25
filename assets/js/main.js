const previousOperationText = document.querySelector('#previous-operation');
const currentOperationText = document.querySelector('#current-operation');
const buttons = document.querySelectorAll('#btn-container button');
let nextOperator;
let currentOperator;
class Calculator{
    constructor(previousOperationText, currentOperationText, nextOperator, currentOperator){
        this.previousOperationText = previousOperationText;
        this.currentOperationText = currentOperationText;
        this.currentOperation = "";
        this.nextOperator = nextOperator;
        this.currentOperator = currentOperator;
    }

    addDigit(digit){
        if(digit ==="." && this.currentOperationText.innerText.includes(".")){
            return;
        }
        this.currentOperation = digit;
        this.updateScreen();
    }

    processOperation(operator, equal=false){
        if(this.currentOperationText.innerText === "" && operator!=="C"){
            if(this.previousOperationText.innerText !== ""){
                this.changeOperation(operator);
            }
            return
        }

        if(operator==='DEL' || operator==='CE' || operator==='C' || operator==='='){
            switch(operator){
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
            return;
        }

        let operationValue;
        const previous = +this.previousOperationText.innerText.split(" ")[0];
        const current = +this.currentOperationText.innerText;
        this.currentOperator = this.nextOperator;
        this.nextOperator = operator;
        operator = this.currentOperator;
        if(typeof this.currentOperator === 'undefined'){
            this.updateScreen(current, this.nextOperator);
            return
        }

        switch(operator){
            case "+":
                operationValue = previous + current;
                this.updateScreen(operationValue, this.nextOperator, current, previous, equal);
                break;
            case "-":

                operationValue= previous - current;
                this.updateScreen(operationValue, this.nextOperator, current, previous, equal);
                break;
            case "*":
                operationValue = previous * current;
                this.updateScreen(operationValue, this.nextOperator, current, previous, equal);
                break;
            case "/":
                operationValue = previous/current;
                this.updateScreen(operationValue,this.nextOperator , current, previous, equal);
                break;
            default:
                return;
        }
    }

    updateScreen(operationValue=null, operator=null, current=null, previous=null, equal=false){
        if(operationValue===null){
            this.currentOperationText.innerText += this.currentOperation;
        } else {
            if(previous===0){
                operationValue = current;
            }
            if(equal ===true){
                this.previousOperationText.innerText = ""
                this.currentOperationText.innerText = `${operationValue} `;
                return;
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
        this.processOperation(operation, true);
    }
}

const calc = new Calculator(previousOperationText, currentOperationText, nextOperator, currentOperator);

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