var trigonometry = document.getElementById("trigonometry");
var cos = 0;
var sin = 0;
var tan = 0;

let circle = document.createElement('div');
circle.id = 'euler';
circle.style.padding = 0;
circle.style.margin = 0;
circle.style.position = 'absolute';
circle.style.left = 300 + 'px';
circle.style.top = 50 + 'px';
circle.style.width = 600 + 'px';
circle.style.height =  600 + 'px';
circle.style.borderRadius = 600 + 'px';
circle.style.border = '8px solid red';
circle.onclick = function s(e) {
    let prev = document.getElementById('trigonometryPointer');
    if (prev !== null && prev !== undefined)
        document.getElementById('trigonometryPointer').remove();
    let point = document.createElement('div');
    let x = e.clientX - trigonometry.offsetLeft;
    let y = e.clientY - trigonometry.offsetTop;
    point.id = 'trigonometryPointer';
    point.style.left = x + 'px';
    point.style.top = y + 'px';
    point.className = 'point';
    point.style.width = '10px';
    point.style.height = '10px';
    trigonometry.appendChild(point);
    if (inCircle(x, y)) {
        evaluate(x, y);
    }
};
document.addEventListener('click', circle.onclick);

trigonometry.appendChild(circle);

let xLine = document.createElement('div');
xLine.id = 'abcissa';
xLine.style.padding = 0;
xLine.style.margin = 0;
xLine.style.position = 'absolute';
xLine.style.border = '1px solid black';
xLine.style.left = 100 + 'px';
xLine.style.top = 350 + 'px';
xLine.style.width = 1000 + 'px';
trigonometry.appendChild(xLine);

let yLine = document.createElement('div');
yLine.id = 'ordinata';
yLine.style.padding = 0;
yLine.style.margin = 0;
yLine.style.position = 'absolute';
yLine.style.border = '1px solid black';
yLine.style.left = 100 + 'px';
yLine.style.top = 250 + 'px';
yLine.style.width = 1000 + 'px';
yLine.style.transform = 'rotate(90deg)';
trigonometry.appendChild(yLine);

let result = document.createElement('div');
result.style.left = 600 + 'px';
result.style.top = 600 + 'px';
result.innerHTML = '<h3>Cos: ' +  cos + '</h3><br><h3>Sin: ' + sin + '</h3><br><h3>Tan: ' + tan + '</h3>';
trigonometry.appendChild(result);

function resreshValues() {
    result.innerHTML = '<h3>Cos: ' +  cos + '</h3><br><h3>Sin: ' + sin + '</h3><br><h3>Tan: ' + tan + '</h3>';
}

var R = 300;
var Y0 = 350;
var X0 = 600;

var X = 100;
var Y = 350;

function inCircle(x, y) {
    return ((X0 - x) * (X0 - x) + (Y0 - y) * (Y0 - y)) <= (R + 10) * (R + 10) &&
        ((X0 - x) * (X0 - x) + (Y0 - y) * (Y0 - y)) >= (R - 10) * (R - 10);
}

function evaluate(x, y) {
    deleteIfExists('a');
    deleteIfExists('c');
    let p1 = new Point(x, Y);
    let p2 = new Point(x, y);
    let p3 = new Point(X0, Y0);
    let p4 = new Point(x, y);
    let a = lenVect(p1, p2);
    let b = Math.abs(x - X0);
    let c = lenVect(p3, p4);
    let line1 = drawLine(p1, p2);
    let line2 = drawLine(p3, p4);
    line1.id = 'a';
    line2.id = 'c';
    trigonometry.appendChild(line1);
    trigonometry.appendChild(line2);
    this.cos = b/c;
    this.sin = a/c;
    this.tan = a/b;
    resreshValues();
}

function deleteIfExists(id) {
    if (document.getElementById(id) !== null &&
        document.getElementById(id) !== undefined) {
        document.getElementById(id).remove();
    }
}

