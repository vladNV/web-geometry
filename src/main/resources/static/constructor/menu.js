var action = 'none';

var paint = document.getElementById("paint");

// buttons
buttons = [
    document.getElementById("point"),
    document.getElementById("line"),
    document.getElementById("polygon"),
    document.getElementById("circle"),
    document.getElementById("corner"),
    // document.getElementById("arrow"),
    document.getElementById("average"),
    document.getElementById("perpendicular"),
    document.getElementById("parallel"),
    document.getElementById("bissec"),
    // document.getElementById("symmetry_line"),
    // document.getElementById("symmetry_point"),
    document.getElementById("revert"),
    document.getElementById("reset")
];

// coordinates
var pageX;
var pageY;

var pointXWidth = 8;
var pointYWidth = 8;

var parallelTransport = 20;
var bissecLength = 100;

var skip = false;

var pointBound = 0;
var pointCount = 0;

// listeners
document.addEventListener('click', doSomething);

function switchAction(action) {
    if (action === 'symmetry-point') {
        alert('Поставьте точку');
    }
    if (action === 'polygon') {
        if (!polygonInput()) return;
    }
    // if (action === 'symmetry-point-polygon') {
    //     if (!polygonInput()) return;
    // }
    this.action = action;
    if (action === this.previousAction) {
        this.action = 'none';
    }
    this.previousAction = this.action;
    this.skip = true;
}

function lock(val) {
    buttons.forEach(function (t) {
        t.disabled = val;
    })
}


function doSomething(e) {
    if (e === null || e === undefined || e.path[0].id !== 'paint') return;
    pageX = e.clientX - paint.offsetLeft;
    pageY = e.clientY - paint.offsetTop;
    // if (skip) {skip = false; return;}
    controller();
    function controller() {
        switch(action) {
            case 'point': {
                makePoint();
                break;
            }
            case 'line': {
                if (pointCount < 2) {
                    addPoint(makePoint());
                    lock(true);
                    pointCount++;
                    if (pointCount === 2) {
                        drawLine(points[0], points[1]);
                        finalizeOperation();
                    }
                }break;
            }
            case 'circle': {

                if (pointCount < 2) {
                    addPoint(makePoint());
                    lock(true);
                    pointCount++;
                    if (pointCount === 2) {
                        drawCircle();
                        finalizeOperation();
                    }
                }break;
            }
            case 'corner': {
                if (pointCount < 3) {
                    addPoint(makePoint());
                    lock(true);
                    pointCount++;
                    if (pointCount === 2) {drawLine(points[0], points[1]);}
                    if (pointCount === 3) {
                        drawLine(points[0], points[2]);
                        drawAngle();
                        finalizeOperation();
                    }
                }break;
            }
            case 'polygon': {
                if (pointCount < pointBound) {
                    addPoint(makePoint());
                    lock(true);
                    pointCount++;
                    if (pointCount === pointBound) {
                        drawPolygon();
                        finalizeOperation();
                    }
                }break;
            }
            case 'arrow': {
                break;
            }
            case 'average': {
                if (pointCount < 2) {
                    addPoint(makePoint());
                    lock(true);
                    pointCount++;
                    if (pointCount === 2) {
                        drawAverage(points[0], points[1]);
                        finalizeOperation();
                    }
                }break;
            }
            case 'perpendicular': {
                if (pointCount < 2) {
                    addPoint(makePoint());
                    lock(true);
                    pointCount++;
                    if (pointCount === 2) {
                        drawPerpendicular(points[0], points[1]);
                        finalizeOperation();
                    }
                }break;
            }
            case 'parallel': {
                if (pointCount < 2) {
                    addPoint(makePoint());
                    lock(true);
                    pointCount++;
                    if (pointCount === 2) {
                        drawParallel(points[0], points[1]);
                        finalizeOperation();
                    }
                }break;
            }
            case 'bissec': {
                if (pointCount < 3) {
                    addPoint(makePoint());
                    lock(true);
                    pointCount++;
                    if (pointCount === 2) {
                        drawLine(points[0], points[1]);
                    }
                    if (pointCount === 3) {
                        drawBissec(points[0], points[1], points[2]);
                        finalizeOperation();
                    }
                }break;
            }
            case 'symmetry-point': {
                addPoint(makePoint());
                lock(true);
                action = 'symmetry-point-polygon';
                polygonInput();
                break;
            }
            case 'symmetry-point-polygon' : {
                if (pointCount < pointBound) {
                    addPoint(makePoint());
                    lock(true);
                    pointCount++;
                    if (pointCount === pointBound) {
                        drawSymmetryRelatively(points[0]);
                        finalizeOperation();
                    }
                }
            }break;
        }
    }
}

function revert() {
    action = 'none';
    if (shapes.length === 0) {
        alert('nothing to revert');
        return;
    }
    var removed = shapes.pop();
    if (document.getElementById(removed.id) !== null
        || document.getElementById(removed.id) !== undefined){
        document.getElementById(removed.id).remove();
    }
}

function resetAll() {
    action = 'none';
    paint.innerHTML = '';
    if (shapes.length === 0) {
        return;
    }
    shapes.forEach(function (t) {
        if ( document.getElementById(t.id) !== null &&  document.getElementById(t.id) !== undefined) {
            document.getElementById(t.id).remove();
        }
    });
    shapes = [];
}

function makePoint() {
    let element = document.createElement('div');
    element.setAttribute('class','point');
    element.style.left = (pageX - pointXWidth / 2) + 'px';
    element.style.top = (pageY - pointYWidth / 2) + 'px';
    element.style.zIndex = 1;
    element.id = shapes.length + 1;
    paint.appendChild(element);
    shapes.push(new Shape(shapes.length + 1, 'point'));
    return new Point(pageX, pageY);
}

function drawAverage(p1, p2) {
    drawLine(p1, p2);
    let middlePoint = avg(p1, p2);
    let element = document.createElement('div');
    element.setAttribute('class','point');
    element.style.left = (middlePoint.x - pointXWidth / 2) + 'px';
    element.style.top = (middlePoint.y - pointYWidth / 2) + 'px';
    element.style.zIndex = 1;
    element.style.background = 'red';
    element.id = shapes.length + 1;
    shapes.push(new Shape(shapes.length + 1, 'point'));
    paint.appendChild(element);
}

function avg(p1, p2) {
    return new Point(((p2.x + p1.x) / 2|0),
        ((p2.y + p1.y) / 2|0));
}

function lenVect(p1, p2) {
    return Math.sqrt((p1.x - p2.x) * (p1.x - p2.x)
        + (p1.y - p2.y) * (p1.y - p2.y));
}

function tg(p1, p2) {
    return Math.atan2((p1.y - p2.y),(p1.x - p2.x)) * (180 / Math.PI);
}

function scalar(p1, p2, p3) {
    var i = new Point(p1.x - p2.x, p1.y - p2.y);
    var j = new Point(p1.x - p3.x, p1.y - p3.y);
    return Math.acos(mult(i, j) / (len(i) * len(j)));

}

function drawPerpendicular(p1, p2) {
    drawLine(p1, p2);
    let middlePoint = avg(p1, p2);
    let length = (lenVect(p1, p2) / 2 | 0);
    let p3 = new Point();
    let p4 = new Point();
    p3.x = middlePoint.x;
    p4.x = middlePoint.x;
    p3.y = middlePoint.y + length;
    p4.y = middlePoint.y - length;
    drawLine(p3, p4, 'red', tg(p1, p2) + 90);
}

function drawParallel(p1, p2) {
    drawLine(p1, p2);
    let p3 = new Point(p1.x + parallelTransport, p1.y + parallelTransport);
    let p4 = new Point(p2.x + parallelTransport, p2.y + parallelTransport);
    drawLine(p3, p4, 'green');
}

function drawBissec(p1, p2, p3) {
    drawLine(p1, p3);
    let arg = scalar(p1, p2, p3) * (180 / Math.PI);
    arg = (arg / 2 | 0);
    let a = lenVect(p1, p2);
    let b = lenVect(p1, p3);
    let L = 2 * a * b * Math.cos(arg) / (a + b);
    // drawLine(p1, new Point(p1.x + L, p1.y + bissecLength), 'green', );
}

function drawSymmetryRelatively(p1) {
    points.splice(0, 1);
    let shape1 = drawPolygon();
    let shape2 = drawPolygon();
    for (let i = 0; i < shape2.length; i++) {
        shape2[i].style.left = (p1.x - parseInt(shape1[i].style.left)) + 'px';
        shape2[i].style.top = (p1.y - parseInt(shape1[i].style.top)) + 'px';
    }
}

function drawLine(p1, p2, colour, angle) {
    let x1 = p1.x;
    let x2 = p2.x;
    let y1 = p1.y;
    let y2 = p2.y;
    let length = Math.sqrt(((x2 - x1) * (x2 - x1)) + ((y2 - y1) * (y2 - y1)));
    let cx = ((x1 + x2) / 2) - (length / 2);
    let cy = ((y1 + y2) / 2) - (1 / 2);
    if (angle === null || angle === undefined) {
        angle = +(Math.atan2((y1 - y2),(x1 - x2)) * (180 / Math.PI));
    }
    let line = document.createElement('div');
    setupStyle(line);
    line.style.height = 1 + 'px';
    if (colour ===  '' || colour === null || colour === undefined) {
        line.style.backgroundColor = 'blue';
    } else {
        line.style.backgroundColor = colour;
    }
    line.style.left = cx + 'px';
    line.style.top = cy + 'px';
    line.style.width = length + 'px';
    line.style.mozTransform = 'rotate(' + angle + 'deg)';
    line.style.webkitTransform = 'rotate(' + angle + 'deg)';
    line.style.oTransform = 'rotate(' + angle + 'deg)';
    line.style.transform = 'rotate(' + angle + 'deg)';
    line.style.msTransform = 'rotate(' + angle + 'deg)';
    shapes.push(new Shape(shapes.length + 1, 'line'));
    paint.appendChild(line);
    return line;
}

function drawCircle() {
    let x1 = points[0].x;
    let x2 = points[1].x;
    let y1 = points[0].y;
    let y2 = points[1].y;
    let radius = (Math.sqrt(((x2 - x1) * (x2 - x1)) + ((y2 - y1) * (y2 - y1)))|0);
    let circle = document.createElement('div');
    setupStyle(circle);
    circle.style.border = '1px solid blue';
    circle.style.left = (x1 - radius) + 'px';
    circle.style.top = (y1 - radius)  + 'px';
    circle.style.width =  radius * 2 + 'px';
    circle.style.height =  radius * 2 + 'px';
    circle.style.borderRadius = radius * 2 + 'px';
    shapes.push(new Shape(shapes.length + 1, 'circle'));
    paint.appendChild(circle);
}

function drawPolygon() {
    let polygon = [];
    for (let i = 0; i < points.length - 1; i++) {
        polygon.push(drawLine(points[i], points[i + 1]));
    }
    polygon.push(drawLine(points[points.length - 1], points[0]));
    return polygon;
}

function drawAngle() {
    let i = new Point(points[0].x - points[1].x, points[0].y - points[1].y);
    let j = new Point(points[0].x - points[2].x, points[0].y - points[2].y);
    let angle = Math.acos(mult(i, j) / (len(i) * len(j)));
    alert(angle * 180 / Math.PI);
}

// some logical methods
function finalizeOperation() {
    pointCount = 0;
    pointBound = 0;
    lock(false);
    clearPointList();
    this.previousAction = 'none';
}

function polygonInput() {
    alert('Введите количество вершин, мин 3 макс 10');
    pointBound = +(prompt('3'));
    if (pointBound === null || pointBound === undefined
        || pointBound < 3 || pointBound > 10) {
        alert('Некорректное количество вершин !');
        action = 'none';
        return false;
    }
    return true;
}

// need to transport to the util.js
function setupStyle(element) {
    element.id = shapes.length + 1;
    element.style.padding = 0;
    element.style.margin = 0;
    element.style.position = 'absolute';
}

// Objects
var points = [];
function addPoint(p) {
    points.push(p);
}

function clearPointList() {
    points = [];
}

function Point(x, y) {
    return {x:x, y:y};
}

function len(P) {
    return Math.sqrt(P.x * P.x + P.y * P.y);
}

function mult(v1, v2) {
    return v1.x * v2.x + v1.y * v2.y;
}

// for cashes
var shapes = [];

function Shape(id, type) {
    return {id:id, type:type}
}

function insert() {
    let HTML = document.getElementById('paint').innerHTML;
    let input = document.getElementById('json_value');
    input.value = HTML;
}