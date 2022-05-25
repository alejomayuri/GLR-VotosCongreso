//Generación del gráfico
let widthDevice = window.innerWidth;
let widthFotChart

if (widthDevice < 500) {
    widthFotChart = 350;
} else {
    widthFotChart = 600;
}

const parliament = d3.parliament().width(widthFotChart).innerRadiusCoef(0.4);
parliament.enter.fromCenter(true).smallToBig(true);
parliament.exit.toCenter(true).bigToSmall(true);
const setData = function (d) {
    d3.select("svg").datum(d).call(parliament);
};
d3.json("elements.json", setData);

window.addEventListener("resize", function () {
    widthDevice = window.innerWidth;
    if (widthDevice < 500) {
        widthFotChart = 350;
    } else {
        widthFotChart = 600;
    }
    
    const parliament = d3.parliament().width(widthFotChart).innerRadiusCoef(0.4);
    parliament.enter.fromCenter(true).smallToBig(true);
    parliament.exit.toCenter(true).bigToSmall(true);
    const setData = function (d) {
        d3.select("svg").datum(d).call(parliament);
    };
    d3.json("elements.json", setData);
    console.log(widthFotChart)
});
