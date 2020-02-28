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
var intervalCount;
var startCount = slider.min;
var endCount = 500;
var currentCount = startCount;
var maxCount = slider.max;

var countUp = function() {
	currentCount++;

	var meter_value = semi_cf - ((currentCount * semi_cf) / maxCount);
	mask.setAttribute("stroke-dasharray", meter_value + "," + cf);

	slider.value = currentCount;
	meter_needle.style.transform = "rotate(" +
		(270 + ((currentCount * 180) / maxCount)) + "deg)";
	sliderNumber.textContent = currentCount;

	if (currentCount === endCount) {
		clearInterval(intervalCount);
	}
};

intervalCount = setInterval(countUp, (1000 / (endCount + 1)));

