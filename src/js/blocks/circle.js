var radius = 100;
var circles = document.querySelectorAll(".circle__item");
var total_circles = circles.length;

/* Set radius for all circles */
for (var i = 0; i < total_circles; i++) {
	circles[i].setAttribute('r', radius);
}

/* Set meter's wrapper dimension */
var wrapper = document.querySelector(".circle--wrapper");
wrapper.style.width = "256px";
wrapper.style.height = "296px";

/* Add strokes to circle-mask  */
var cf = 2 * Math.PI * radius;
var semi_cf = cf / 2;

document.querySelector(".circle__item-mask")
	.setAttribute("stroke-dasharray", semi_cf + "," + cf);

/* Bind range slider event*/
var mask = document.querySelector(".circle__item-mask");
var meter_needle =  document.querySelector(".circle__needle");
var slider = document.querySelector(".circle__slider");
var sliderNumber = document.querySelector(".circle__slider-number");
var currentValue = 500;
var maxValue = slider.max;
var minValue = slider.min;

function range_change_event() {
	var meter_value = semi_cf - ((currentValue * semi_cf) / maxValue);

	mask.setAttribute("stroke-dasharray", meter_value + "," + cf);

	for (var j = 0; j <= currentValue; j++) {
			meter_needle.style.transform = "rotate(" +
				(270 + ((j * 180) / maxValue)) + "deg)";
			sliderNumber.textContent = j;
	}
}
//slider.addEventListener("input", range_change_event);

/* Slider Animation */
function range_move_event() {

	for (var i = 0; i <= currentValue; i++) {
		setInterval(function(){
			slider.value = i++;
			range_change_event();
		}, 1000);

	}
}

window.onload = range_move_event;
