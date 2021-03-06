var paint = document.getElementById("paint");
var trigonometry = document.getElementById("trigonometry");
var graph = document.getElementById("graph");
var load = document.getElementById("load");

function showTrigonometry() {
    lock(true);
    paint.style.display = 'none';
    graph.style.display = 'none';
    trigonometry.style.display = 'block';
    load.style.display = 'none';
    document.removeEventListener('click', doSomething);
    action = 'none';
}

function showPaint() {
    lock(false);
    paint.style.display = 'block';
    graph.style.display = 'none';
    trigonometry.style.display = 'none';
    load.style.display = 'none';
    document.addEventListener('click', doSomething);
    action = 'none';
}

function showGraph() {
    lock(true);
    paint.style.display = 'none';
    graph.style.display = 'block';
    trigonometry.style.display = 'none';
    load.style.display = 'none';
    document.removeEventListener('click', doSomething);
    action = 'none';
}

function loadData() {
    lock(true);
    paint.style.display = 'none';
    graph.style.display = 'none';
    trigonometry.style.display = 'none';
    load.style.display = 'block';
    document.removeEventListener('click', doSomething);
    action = 'none';
}