// tablet-overlay.js - Floating Drag & Drop EFB Controller for AEROBRIEF

export function initializeFloatingTablet(tabletId, dragHeaderId) {
    const tablet = document.getElementById(tabletId);
    const header = document.getElementById(dragHeaderId);
    
    if (!tablet || !header) return;

    let posX = 0, posY = 0, mouseX = 0, mouseY = 0;

    header.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
        e.preventDefault();
        mouseX = e.clientX;
        mouseY = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e.preventDefault();
        posX = mouseX - e.clientX;
        posY = mouseY - e.clientY;
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        tablet.style.top = (tablet.offsetTop - posY) + "px";
        tablet.style.left = (tablet.offsetLeft - posX) + "px";
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}
