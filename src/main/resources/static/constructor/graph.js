var graph = document.getElementById("graph");

var N = 100;

var f;
var a;
var b;

var X;
var Y;

function define() {
    let X = [];
    let h = Math.abs(b - a) / N;
    X[0] = a;
    for (let i = 1; i < N; i++) {
        X[i] = parseFloat(X[i - 1]) + h;
    }
    return X;
}

function calculate() {
    let X = define();
    let Y = [];
    for (let i = 0; i < X.length; i++) {
        Y[i] = function () {
            return eval(f.split('x').join(X[i]));
        }();
    }
    this.X = X;
    this.Y = Y;
}

function drawFunc() {
    let from = document.getElementById('from').value;
    let to = document.getElementById('to').value;
    let func = document.getElementById('func').value;
    // first validation
    if (from === null || from === undefined
        || to === null || to === undefined
        || func === null || func === undefined) {
        alert('Неправильно введены данные');
        return;
    }
    // second validation
    if (from < -100 || from > 100 || to < -100 || to > 100) {
        alert('Слишком большой интервал');
        return;
    }
    this.a = parseFloat(from);
    this.b = parseFloat(to);
    this.f = func;
    calculate();
    Plotly.plot(graph, [{
        x: X, y: Y }], {
        margin:{ t: 0 }
    });
}
