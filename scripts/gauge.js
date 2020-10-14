var gaugePressure = new RadialGauge({
    renderTo: 'canvasPressure',
    width: 400,
    height: 400,
    units: "0",
    startAngle: 70,
    ticksAngle: 220,
    colorPlate: "#222222",
    colorUnits: "#fff",
    colorNumbers: "#fff",
    needleType: "no",
    needleStart: 0,
    needleEnd: 0,
    needleWidth: 0,
    needleCircleSize: 1,
    needleCircleInner: false,
    needleCircleOuter: false,
    needleShadow: false,
    colorNeedle: "#fff",
    colorNeedleEnd: "#222222",
    colorNeedleCircleOuter: "#222222",
    colorNeedleCircleOuterEnd: "#222222",
    colorBarProgress: '#fff',
    colorBar: '#fff',

    colorMajorTicks: ["#fff", "#ffffff", "#ffffff", "#ffffff", "#ffffff",
        "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#fff"],
    colorMinorTicks: "#ffffff",

    minValue: 0,
    maxValue: 100,

    majorTicks: ["0","10","20","30","40","50","60","70","80","90","100"],
    minorTicks: "5",
    strokeTicks: true,

    highlights: [
        {
            "from": 0,
            "to": 100,
            "color": "#fff"
        }
    ],

    highlightsWidth: 20,
    numbersMargin: 12,
    animation: true,
    animationRule: "linear",
    valueBox: false,
    borders: false,
    borderShadowWidth: 0,
    value: 0,
    animateOnInit: true,
    animatedValue: true

}).draw();

var timers = [];

function animateGauges() {
    document.gauges.forEach(function(gauge) {
        timers.push(setInterval(function() {
            gauge.value = Math.random() *
                (gauge.options.maxValue - gauge.options.minValue) +
                gauge.options.minValue;
        }, gauge.animation.duration + 50));
    });
}

window.addEventListener('load', function() {
    document.gauges.forEach(function(gauge) {
        gauge.on('animate', function(percent, value) {
            gauge.update({ units: parseInt(value, 10) + `${(value) > 75 ? 'Poor' : 'Good'}`});
        });
    });
});