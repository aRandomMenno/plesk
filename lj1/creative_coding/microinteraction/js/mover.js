document.addEventListener('DOMContentLoaded', function () {
    const verticalSlider = document.querySelector('.slider-vertical');
    const verticalKnob = document.querySelector('.slider-vertical-knob');
    const horizontalSlider = document.querySelector('.slider-horizontal');
    const horizontalKnob = document.querySelector('.slider-horizontal-knob');
    const block = document.querySelector('#ontspannend .block');
    const container = document.querySelector('#ontspannend');

    verticalKnob.style.top = '50%';
    horizontalKnob.style.left = '50%';
    
    let currentX = 0;
    let currentY = 0;

    let isDraggingVertical = false;
    let isDraggingHorizontal = false;

    function calculateMaxOffsets() {
        const containerRect = container.getBoundingClientRect();
        const blockRect = block.getBoundingClientRect();
        const horizontalPadding = 3
        const verticalPadding = 3
        const maxHorizontal = (containerRect.width - blockRect.width) / 2 - horizontalPadding;
        const maxVertical = (containerRect.height - blockRect.height) / 2 - verticalPadding;

        return { maxHorizontal, maxVertical };
    }

    verticalKnob.addEventListener('mousedown', function (e) {
        isDraggingVertical = true;
        document.addEventListener('mousemove', moveVerticalKnob);
        document.addEventListener('mouseup', stopDragging);
        e.preventDefault();
    });

    horizontalKnob.addEventListener('mousedown', function (e) {
        isDraggingHorizontal = true;
        document.addEventListener('mousemove', moveHorizontalKnob);
        document.addEventListener('mouseup', stopDragging);
        e.preventDefault();
    });

    verticalSlider.addEventListener('click', function (e) {
        if (e.target !== verticalKnob) {
            const sliderRect = verticalSlider.getBoundingClientRect();
            const percentage = (e.clientY - sliderRect.top) / sliderRect.height * 100;
            updateVerticalPosition(percentage);
        }
    });

    horizontalSlider.addEventListener('click', function (e) {
        if (e.target !== horizontalKnob) {
            const sliderRect = horizontalSlider.getBoundingClientRect();
            const percentage = (e.clientX - sliderRect.left) / sliderRect.width * 100;
            updateHorizontalPosition(percentage);
        }
    });

    function moveVerticalKnob(e) {
        if (!isDraggingVertical) return;
        const sliderRect = verticalSlider.getBoundingClientRect();
        let percentage = (e.clientY - sliderRect.top) / sliderRect.height * 100;
        percentage = Math.max(0, Math.min(percentage, 100));
        updateVerticalPosition(percentage);
    }

    function moveHorizontalKnob(e) {
        if (!isDraggingHorizontal) return;
        const sliderRect = horizontalSlider.getBoundingClientRect();
        let percentage = (e.clientX - sliderRect.left) / sliderRect.width * 100;
        percentage = Math.max(0, Math.min(percentage, 100));
        updateHorizontalPosition(percentage);
    }

    function updateVerticalPosition(percentage) {
        verticalKnob.style.top = `${percentage}%`;
        const { maxVertical } = calculateMaxOffsets();
        const blockOffset = (percentage - 50) * (maxVertical / 50);
        currentY = blockOffset;
        updateBlockPosition();
    }

    function updateHorizontalPosition(percentage) {
        horizontalKnob.style.left = `${percentage}%`;
        const { maxHorizontal } = calculateMaxOffsets();
        const blockOffset = (percentage - 50) * (maxHorizontal / 50);
        currentX = blockOffset;
        updateBlockPosition();
    }

    function updateBlockPosition() {
        block.style.transform = `translate(calc(-50% + ${currentX}px), calc(-50% + ${currentY}px))`;
    }

    function stopDragging() {
        isDraggingVertical = false;
        isDraggingHorizontal = false;
        document.removeEventListener('mousemove', moveVerticalKnob);
        document.removeEventListener('mousemove', moveHorizontalKnob);
        document.removeEventListener('mouseup', stopDragging);
    }

    window.addEventListener('resize', function () {
        const x = parseFloat(horizontalKnob.style.left) || 50;
        const y = parseFloat(verticalKnob.style.top) || 50;

        updateHorizontalPosition(x);
        updateVerticalPosition(y);
    });

    updateVerticalPosition(50);
    updateHorizontalPosition(50);
});