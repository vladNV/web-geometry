var action = 'none';
var paint = document.getElementById("paint");

function switchAction(action) {
    this.action = action
}

function doSomething() {
    controller();
    function controller() {
        switch(action) {
            case 'point': {
                makePoint()
            }
        }
    }
}

function makePoint() {
    let element = document.createElement('div');
    element.setAttribute('class','point');
    alert(element);
    paint.appendChild(element);
}
