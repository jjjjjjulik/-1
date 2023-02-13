"use strict"
let diagram = document.querySelector('.text-data__diagramm');
var trace1 = {
    x: [],
    y: [],
    type: 'bar',
    textposition: 'auto',
    hoverinfo: 'none',
    marker: {
        color: 'rgb(158,202,225)',
        opacity: 0.6,
        line: {
            color: 'rgb(8,48,107)',
            width: 1.5
        }
    }
};

var data = [trace1];

var layout = {
    barmode: 'stack'
};

Plotly.newPlot(diagram, data, layout);

document.getElementById('but').addEventListener('click', function () {     // вешаем клик на кнопку с id="but"
    let textAreaData = document.getElementById('textArea').value;
    let strArr = [];
    strArr = textAreaData.split("");
    let i = 0;
    let result = [];
    let allSymbols = [];
    let symbols = [];
    for (let i = 0; i < strArr.length; i++) {
        if (strArr[i] !== ' ' && strArr[i] !== '\n') {
            allSymbols.push(strArr[i]);
            result.push(textAreaData.split(strArr[i]).length - 1);
        }

    }

    let textData = [];
    for (let i = 0; i < allSymbols.length; i++) {
        textData.push({ symbol: allSymbols[i], result: result[i] },);

    }
    const filteredArray = [];
    textData.filter((item) => {
        if (!filteredArray.some((element) => element.symbol === item.symbol)) {
            filteredArray.push(item);
        }
    });

    function getMinOfArray(numArray) {
        return Math.min.apply(null, numArray);
    }
    function getMaxOfArray(numArray) {
        return Math.max.apply(null, numArray);
    }
    let extremum = [];
    let length = textData.length;
    console.log(textData);
    console.log(length);
    for (let i = 0; i < filteredArray.length; i++) {

        let number = (filteredArray[i].result / length * 100).toFixed(4);
        extremum.push(number);
    }
    console.log(extremum);
    let symbol = [];
    for (let i = 0; i < filteredArray.length; i++) {
        symbol.push(filteredArray[i].symbol);
    }
    const table = document.querySelector('.text-data__table');
    for (let i = 0; i < filteredArray.length; i++) {
        table.insertAdjacentHTML(
            'beforeend',
            `<div class="table__line">
        <p class="table__symbol">${filteredArray[i].symbol}</p>
        <p class="table__count">${filteredArray[i].result}</p>
        <p class="table__frequency">${extremum[i]}</p>
    </div>`);
    }
    table.insertAdjacentHTML(
        'beforeend',
        `<div class="table__extremums">
        <div class="table__line">
            <p class="table__extremum-caption">Мінімальна частота проявлення символу:</p>
            <p class="table__count-min">${getMinOfArray(extremum)}</p>
        </div>
        <div class="table__line">
            <p class="table__extremum-caption">Максимальна частота проявлення символу:</p>
            <p class="table__count-max">${getMaxOfArray(extremum)}</p>
        </div>
    </div>`);
    let diagram = document.querySelector('.text-data__diagramm');
    var xValue = symbol;

    var yValue = extremum;

    var trace1 = {
        x: xValue,
        y: yValue,
        type: 'bar',
        text: yValue.map(String),
        textposition: 'auto',
        hoverinfo: 'none',
        marker: {
            color: 'rgb(158,202,225)',
            opacity: 0.6,
            line: {
                color: 'rgb(8,48,107)',
                width: 1.5
            }
        }
    };

    var data = [trace1];

    var layout = {
        barmode: 'stack'
    };

    Plotly.newPlot(diagram, data, layout);
}, false);
