let symbolPrecedence = {
    '*': 3,
    '/': 3,
    '+': 2,
    '-': 2,
};

let oprands = [];
let operators = [];
let possibleOperators = ['/', '*', '+', '-', '(', ')'];

const calculator = (term) => {
    for (const et of term) {
        if (possibleOperators.indexOf(et) > -1) {
            if (et === ')') {
                processString();
            } else {
                let latestOperator = operators[operators.length - 1];
                if (
                    operators.length < 1 ||
                    latestOperator === '(' ||
                    checkPrecedence(latestOperator, et)
                ) {
                    operators.push(et);
                } else {
                    evaluate();
                    operators.push(et);
                }
            }
        } else {
            oprands.push(parseInt(et));
        }
    }
    processString();
    return oprands[0]
};

const checkPrecedence = (latestOperator, currentOperator) => {
    return symbolPrecedence[latestOperator] <= symbolPrecedence[currentOperator];
};

const processString = () => {
    while (operators.length > 0) {
        evaluate();
    }
};

const evaluate = () => {
    let lop = operators.pop();
    if (lop === '(') {
        return;
    }
    let lot = oprands.length > 0 && oprands.pop();
    let slot = oprands.length > 0 && oprands.pop();
    let output = calculate(slot, lot, lop);
    oprands.push(output);
};

const calculate = (slot, lot, lop) => {
    switch (lop) {
        case '+':
            return slot + lot;
        case '-':
            return slot - lot;
        case '*':
            return slot * lot;
        case '/':
            return slot / lot;
    }
};