let leadingTerm = '';
let trailingTerm = '';
let sign = '';

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
    if (!leadingTerm || !(sign)) {
        leadingTerm += number;
    }
    else if (!trailingTerm && sign) {
        trailingTerm = leadingTerm;
        leadingTerm = '';
        leadingTerm = number;
    }
    else {
        leadingTerm += number;
    }
    updateDisplay(leadingTerm, trailingTerm, sign);
};

function getOperator(op) {
    if (!trailingTerm && leadingTerm) {
        sign = op;
    }
    else if (leadingTerm && trailingTerm) {
        trailingTerm = updateValue(leadingTerm, trailingTerm, sign);
        sign = op;
        leadingTerm = '';
        console.log(trailingTerm);
    }
    else if (!leadingTerm && trailingTerm) {
        sign = op;
    }
    updateDisplay(leadingTerm, trailingTerm, sign);
};

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
        if (!(value.toFixed(3) % 1)) {
            return Math.round(value);
        }
        return (value.toFixed(3));
    }
};

function returnEquals() {
    trailingTerm = updateValue(leadingTerm, trailingTerm, sign);
    leadingTerm = '';
    sign = '';
    updateDisplay(leadingTerm, trailingTerm, sign, true);
};

function allClear() {
    leadingTerm = '';
    trailingTerm = '';
    sign = '';
    result = '';
    lowerDisp.innerText = '';
    upperDisp.innerText = '';
};

function updateDisplay(leadingTerm, trailingTerm, sign, enter = false) {
    if (!trailingTerm) {
        lowerDisp.innerText = `${leadingTerm} ${sign}`;
    }
    else if (trailingTerm && !enter) {
        upperDisp.innerText = `${trailingTerm} ${sign}`;
        lowerDisp.innerText = leadingTerm;
    }
    if (enter) {
        upperDisp.innerText = '';
        lowerDisp.innerText = trailingTerm;
    }
}
