let leadingTerm = '';
let trailingTerm = '';
let sign = '';
let solved = true;
let isSolvedTerm = false;

let number = document.querySelectorAll("#number");
let operator = document.querySelectorAll("#operator");
let equals = document.querySelector("#equal");
let AC = document.querySelector("#AC");
let upperDisp = document.querySelector("#upper-display");
let lowerDisp = document.querySelector("#lower-display");

number.forEach(num => num.addEventListener("click", e => getNumber(e.target.value)));
operator.forEach(op => op.addEventListener("click", e => getOperator(e.target.value)));
equals.addEventListener("click", () => returnEquals());
AC.addEventListener("click", () => allClear());


function getNumber(number) {
    if (!isSolvedTerm) {
        //Disallow more than one '.' per leadingTerm.
        if (number === '.' && leadingTerm.includes('.')) {
            number = '';
        }
        //After page refresh or allClear()
        if (!leadingTerm || !sign) {
            leadingTerm += number;  
        }
        //Move initial variable and sign to trailingTerm; start new leadingTerm
        else if (!trailingTerm && sign) { 
            solved = false;
            trailingTerm = leadingTerm;
            leadingTerm = '';
            leadingTerm = number;
        }
        //TrailingTerm, leadingTerm and sign established. Solved set to false to allow use of 'equals' button. 
        else {
            solved = false;
            leadingTerm += number;
        }
        updateDisplay(leadingTerm, trailingTerm, sign);
    }
}


function getOperator(op) {
    isSolvedTerm = false;
    //Declare sign operator after establishing initial term. 
    if (!trailingTerm && leadingTerm && leadingTerm != '-') {
        sign = op;
    }
    //Keep running total in trailingTerm slot, establish new sign and free leadingTerm for new number entry. 
    else if (leadingTerm && trailingTerm) {
        trailingTerm = updateValue(leadingTerm, trailingTerm, sign);
        sign = op;
        leadingTerm = '';
    }
    //Allow changing sign after running total if leadingTerm not yet established. 
    else if (!leadingTerm && trailingTerm) {
        sign = op;
    }
    //Allow initial negative signed int after page refresh or allClear().
    else if (!leadingTerm && !trailingTerm && op == '-') {
        leadingTerm = op;
    }
    updateDisplay(leadingTerm, trailingTerm, sign);
}


function updateValue(a, b, op) {
    let value = 0;
    if (a && b && op) {
        a = Number(a);
        b = Number(b);
        switch (op) {
            case '+':
                value = b + a;
                break;
            case '-':
                value = b - a;
                break;
            case 'x':
                value = b * a;
                break;
            case '÷':
                value = b / a;
                break;
        }
        //mitigate floating point artifacts. 
        if (!(value.toFixed(3) % 1)) {
            return Math.round(value);
        }
        return (value.toFixed(3));
    }
}


function returnEquals() {
    //'solved' boolean check prevents 'equals' event if new sign and leadingTerm haven't been selected.
    if (!solved) {
        solved = true;
        leadingTerm = updateValue(leadingTerm, trailingTerm, sign);
        trailingTerm = '';
        sign = '';
        updateDisplay(leadingTerm, trailingTerm, sign);
        isSolvedTerm = true;
    }
}


function allClear() {
    leadingTerm = '';
    trailingTerm = '';
    sign = '';
    result = '';
    lowerDisp.innerText = '';
    upperDisp.innerText = '';
    solved = true;  //Disallows 'equals' to trigger.  Prevents undefined error.  
    isSolvedTerm = false;
}


function updateDisplay(leadingTerm, trailingTerm, sign) {  
    //After page refresh or allClear().  Initial variable entry. 
    if (!trailingTerm) {
        lowerDisp.innerText = `${leadingTerm} ${sign}`;
    }
    //Everything else...  Displays running total and sign on top, working variable on bottom. 
    else if (trailingTerm) {
        upperDisp.innerText = `${trailingTerm} ${sign}`;
        lowerDisp.innerText = leadingTerm;
    }
}
