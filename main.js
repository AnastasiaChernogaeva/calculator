require('./css/style.css');
require('./css/theme-dark.css');
require('./css/theme-light.css');



let display = document.querySelector(".display");
let buttons = Array.from(document.querySelectorAll(".button"));

let firstNum = '';
let secNum = '';
let sign = '';

const numButtons = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
const actions = ['-', '+', '*', '/'];

const clearAll = () => {
    firstNum = '';
    secNum = '';
    sign = '';
    display.innerText = '0'; 
}

buttons.map((button) => {
  button.addEventListener("click", (e) => {    
    display.innerText = '';
    const key = e.target.innerText;

    if (key == "AC")  clearAll();

    if (numButtons.includes(key)){
        if (secNum === '' && sign === '') {
            firstNum += key;
            display.innerText = firstNum;
        }else {
            secNum += key;
            display.innerText = secNum;
        }
        return;
    }

    if (actions.includes(key)) {
        sign = key;
        display.innerText = sign;
        return;
    }
    
    if (key === '%') {        
        display.innerText = secNum + '%';
        secNum = (firstNum*secNum*0.01);
    }


    if (key === '=') {
        if (secNum === '') secNum = firstNum;
        switch (sign) {
            case '+':
                firstNum = (+firstNum) + (+secNum);
                break;
            case '-':
                firstNum = firstNum - secNum;
                break;
            case '*':
                firstNum = firstNum * secNum;
                break;
            case '/':
                if (secNum == 0) {
                    firstNum = 'Error...';
                    secNum = '';
                    sign = '';
                } else {
                    firstNum = firstNum / secNum;
                }
                break;
        }
        secNum = '';
        sign = '';
        display.innerText = firstNum;
    }

    if (key === '+/-') { 
        const str = firstNum.toString();
        if (str.includes('-')) {
            firstNum = str.replace('-', '');
        } else {
            firstNum = str.replace('', '-');
        }
        display.innerText = firstNum;
    }

  });
});


let prevTheme = '';

let themeToggler = document.querySelector(".toggle");
themeToggler.addEventListener("click", () => {
    applyTheme();
});

const applyTheme = () => {
    let themeUrl 
    switch (prevTheme) {
        case 'dark':
            prevTheme = 'light';
            themeUrl = `css/theme-${prevTheme}.css`;
            break;
        case 'light':
            prevTheme = 'dark';
            themeUrl = `css/theme-${prevTheme}.css`;
            break;
        default: 
            prevTheme = 'dark';
            themeUrl = `css/theme-${prevTheme}.css`;
            break;
    }
    document.querySelector('[title="theme"]').setAttribute('href', themeUrl);
};

