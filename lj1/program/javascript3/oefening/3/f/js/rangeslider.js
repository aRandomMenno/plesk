let slider = document.getElementById("myRange");
let output = document.getElementById("demo");
output.innerHTML = slider.value;

slider.oninput = function () {
    output.innerHTML = this.value;
    rood.style.left = this.value + "px";
    rood.style.top = this.value + "px"
}