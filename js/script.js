const settingsBtn = document.querySelector('.settings-icon');
const closeSettingsBtn = document.querySelector('.settings__close');
const settings = document.querySelector('.settings');
const symbolBtns = document.querySelectorAll('.symbol');
const wrapper = document.querySelector('.wrapper');
const get = document.querySelector('.get');
const darkBtn = document.querySelector('#dark-theme');

const expression = document.querySelector('.expression');
const answer = document.querySelector('.answer');
const isEval = document.querySelector('#is-eval');
const isRpn = document.querySelector('#is-rpn');
const deleteOneSymbol = document.querySelector('[data-delete]');
const clear = document.querySelector('[data-clear]');
const multiply = document.querySelector('[data-multiply]');

const toggleBracket = toggle('(', ')');

let useEval = isEval.checked;
let useRpn = isRpn.checked;


deleteOneSymbol.addEventListener('click', () => {
    const text = expression.textContent;
    expression.textContent = text.substring(0, text.length - 1);
});
clear.addEventListener('click', () => {
    expression.textContent = '0';
});
isEval.addEventListener('change', () => {
    useEval = !useEval;
});
isRpn.addEventListener('change', () => {
    useRpn = !useRpn;
});
darkBtn.addEventListener('change', () => {
    wrapper.classList.toggle('dark');
});
get.addEventListener('click', () => {
    const raw = expression.textContent;
    if (useEval) answer.textContent = evalFromRaw(raw);
    else if (useRpn) answer.textContent = rpnFromRaw(raw);
});

multiply.addEventListener('click', () => {
    expression.textContent += 'x';
});

symbolBtns.forEach(btn => {
    switch (btn.textContent) {
        case '()':
            btn.addEventListener('click', () => {
                expression.textContent += toggleBracket();
            });
            break;
        default:
            btn.addEventListener('click', () => {
                if (expression.textContent === '0')
                    expression.textContent = btn.textContent;
                else expression.textContent += btn.textContent;
            });
            break;
    }
});

function evalFromRaw(str) {
    return eval(str.replace('x', '*'));
}
const operations = ['+', '-', '*', '/'];
function rpnFromRaw(str = '') {
    str = str.replace('x', '*');
    const stack = [];
    const arr = [...str];
    let startIndexDigit = 0;
    for (let i = 0; i < arr.length; i++) {
        if (operations.includes(str[i])) {
            stack.push(str.slice(startIndexDigit, i));
            startIndexDigit = i + 1;
            checkStack(stack, str[i]);
        }
    }
    stack.push(str.slice(startIndexDigit));
    checkStack(stack, str[startIndexDigit - 1]);
    return stack.pop();
}

function checkStack(stack, currentSymbol) {
    if (stack.length === 2) {
        const a = +stack.pop();
        const b = +stack.pop();
        switch (currentSymbol) {
            case operations[0]:
                stack.push(a + b);
                break;
            case operations[1]:
                stack.push(a - b);
                break;
            case operations[2]:
                stack.push(a * b);
                break;
            case operations[3]:
                stack.push(Math.round(a / b));
                break;
            default:
                console.error('Error in ', currentSymbol);
                break;
        }
    }
}










settingsBtn?.addEventListener('click', () => {
    settings?.classList.add('open');
});
closeSettingsBtn?.addEventListener('click', () => {
    settings?.classList.remove('open');
});

function toggle(firstSymbol, secondSymbol) {
    let isOpenBracket = false;
    return () => {
        isOpenBracket = !isOpenBracket;
        return isOpenBracket ? '(' : ')';
    }
}

