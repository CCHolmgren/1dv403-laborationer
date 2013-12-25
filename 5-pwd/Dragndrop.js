/* global JAWM, document, JAWM.dragDrop, window */
JAWM.dragDrop = {
    keyHTML: '<a href="#" class="keyLink">#</a>',
    keySpeed: 10, // pixels per keypress event
    initialMouseX: undefined,
    initialMouseY: undefined,
    startX: undefined,
    startY: undefined,
    dXKeys: undefined,
    dYKeys: undefined,
    draggedObject: undefined,
    initElement: function (element) {
        if (typeof element == 'string')
            element = document.getElementById(element);
        element.onmousedown = JAWM.dragDrop.startDragMouse;
        element.innerHTML += JAWM.dragDrop.keyHTML;
        var links = element.getElementsByTagName('a');
        var lastLink = links[links.length - 1];
        lastLink.relatedElement = element;
        lastLink.onclick = JAWM.dragDrop.startDragKeys;
    },
    startDragMouse: function (e) {
        JAWM.dragDrop.startDrag(this);
        var evt = e || window.event;
        JAWM.dragDrop.initialMouseX = evt.clientX;
        JAWM.dragDrop.initialMouseY = evt.clientY;
        JAWM.addEventSimple(document, 'mousemove', JAWM.dragDrop.dragMouse);
        JAWM.addEventSimple(document, 'mouseup', JAWM.dragDrop.releaseElement);
        return false;
    },
    startDragKeys: function () {
        JAWM.dragDrop.startDrag(this.relatedElement);
        JAWM.dragDrop.dXKeys = JAWM.dragDrop.dYKeys = 0;
        JAWM.addEventSimple(document, 'keydown', JAWM.dragDrop.dragKeys);
        JAWM.addEventSimple(document, 'keypress', JAWM.dragDrop.switchKeyEvents);
        this.blur();
        return false;
    },
    startDrag: function (obj) {
        if (JAWM.dragDrop.draggedObject)
            JAWM.dragDrop.releaseElement();
        JAWM.dragDrop.startX = obj.offsetLeft;
        JAWM.dragDrop.startY = obj.offsetTop;
        JAWM.dragDrop.draggedObject = obj;
        obj.className += ' dragged';
    },
    dragMouse: function (e) {
        var evt = e || window.event;
        var dX = evt.clientX - JAWM.dragDrop.initialMouseX;
        var dY = evt.clientY - JAWM.dragDrop.initialMouseY;
        JAWM.dragDrop.setPosition(dX, dY);
        return false;
    },
    dragKeys: function (e) {
        var evt = e || window.event;
        var key = evt.keyCode;
        switch (key) {
        case 37: // left
        case 63234:
            JAWM.dragDrop.dXKeys -= JAWM.dragDrop.keySpeed;
            break;
        case 38: // up
        case 63232:
            JAWM.dragDrop.dYKeys -= JAWM.dragDrop.keySpeed;
            break;
        case 39: // right
        case 63235:
            JAWM.dragDrop.dXKeys += JAWM.dragDrop.keySpeed;
            break;
        case 40: // down
        case 63233:
            JAWM.dragDrop.dYKeys += JAWM.dragDrop.keySpeed;
            break;
        case 13: // enter
        case 27: // escape
            JAWM.dragDrop.releaseElement();
            return false;
        default:
            return true;
        }
        JAWM.dragDrop.setPosition(JAWM.dragDrop.dXKeys, JAWM.dragDrop.dYKeys);
        if (evt.preventDefault)
            evt.preventDefault();
        return false;
    },
    setPosition: function (dx, dy) {
        JAWM.dragDrop.draggedObject.style.left = JAWM.dragDrop.startX + dx + 'px';
        JAWM.dragDrop.draggedObject.style.top = JAWM.dragDrop.startY + dy + 'px';
    },
    switchKeyEvents: function () {
        // for Opera and Safari 1.3
        JAWM.removeEventSimple(document, 'keydown', JAWM.dragDrop.dragKeys);
        JAWM.removeEventSimple(document, 'keypress', JAWM.dragDrop.switchKeyEvents);
        JAWM.addEventSimple(document, 'keypress', JAWM.dragDrop.dragKeys);
    },
    releaseElement: function () {
        JAWM.removeEventSimple(document, 'mousemove', JAWM.dragDrop.dragMouse);
        JAWM.removeEventSimple(document, 'mouseup', JAWM.dragDrop.releaseElement);
        JAWM.removeEventSimple(document, 'keypress', JAWM.dragDrop.dragKeys);
        JAWM.removeEventSimple(document, 'keypress', JAWM.dragDrop.switchKeyEvents);
        JAWM.removeEventSimple(document, 'keydown', JAWM.dragDrop.dragKeys);
        JAWM.dragDrop.draggedObject.className = JAWM.dragDrop.draggedObject.className.replace(/dragged/, '');
        JAWM.dragDrop.draggedObject = null;
    }
};

JAWM.addEventSimple = function addEventSimple(obj,evt,fn) {
	if (obj.addEventListener)
		obj.addEventListener(evt,fn,false);
	else if (obj.attachEvent)
		obj.attachEvent('on'+evt,fn);
};

JAWM.removeEventSimple = function removeEventSimple(obj,evt,fn) {
	if (obj.removeEventListener)
		obj.removeEventListener(evt,fn,false);
	else if (obj.detachEvent)
		obj.detachEvent('on'+evt,fn);
};