var radius = 100;
var circles = document.querySelectorAll(".circle__item");
var totalСircles = circles.length;

/* Set radius for all circles */
for (var i = 0; i < totalСircles; i++) {
	circles[i].setAttribute('r', radius);
}

/* Set circle's wrapper dimension */
var wrapper = document.querySelector(".circle--wrapper");
wrapper.style.width = "256px";
wrapper.style.height = "296px";

/* Add strokes to circle-mask  */
var circleForm = 2 * Math.PI * radius;
var semicircleForm = circleForm / 2;

document.querySelector(".circle__item-mask")
	.setAttribute("stroke-dasharray", semicircleForm + "," + circleForm);

/* Bind range slider event*/
var slider = document.querySelector(".circle__slider");
var sliderNumber = document.querySelector(".circle__slider-number");
var mask = document.querySelector(".circle__item-mask");
var circleNeedle =  document.querySelector(".circle__needle");
var intervalCount;
var startCount = slider.min;
var endCount = 500;
var currentCount = startCount;
var maxCount = slider.max;

var countUp = function() {
	currentCount++;

	var circleValue = semicircleForm - ((currentCount * semicircleForm) / maxCount);
	mask.setAttribute("stroke-dasharray", circleValue + "," + circleForm);

	slider.value = currentCount;
	circleNeedle.style.transform = "rotate(" +
		(270 + ((currentCount * 180) / maxCount)) + "deg)";
	sliderNumber.textContent = currentCount;

	if (currentCount === endCount) {
		clearInterval(intervalCount);
	}
};

intervalCount = setInterval(countUp, (1000 / (endCount + 1)));

