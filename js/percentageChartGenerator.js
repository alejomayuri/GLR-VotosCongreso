const percentageChartGenerator = dataJson => {
    fetch(dataJson)
         .then(response => response.json())
         .then(data => {

            const a_favor = data.filter(item => item.Vacancia == "A favor").length;
            const en_contra = data.filter(item => item.Vacancia == "En contra").length;
            const abstencion = data.filter(item => item.Vacancia == "Abstención").length;
            const no_voto = data.filter(item => item.Vacancia == "No votó").length;

            const percentage__chart_data = {
               labels: ["A favor", "En contra", "Abstención", "No votó"],
               datasets: [
                  {
                     data: [a_favor, en_contra, abstencion, no_voto],
                     backgroundColor: [
                        "#46a71f",
                        "#db060a",
                        "#e1cf0b",
                        "#000000"
                     ]
                  }
               ]
            }

            percentage__chart_data.labels.map((item, index) => {
               return (
                  percentage__chart.innerHTML += `<div style="width:${percentage__chart_data.datasets[0].data[index]}%">
                  <p>
                     ${item}
                  </p>
                  <div class="segment" style="background-color:${percentage__chart_data.datasets[0].backgroundColor[index]};">
                     <p>
                        ${percentage__chart_data.datasets[0].data[index]} votos
                     </p>
                  </div>
               </div>`
               );
            })

         });
}