//Variables o constantes?
const ctx = document.getElementById("myChart");
const button = document.querySelector("#button");
const select = document.querySelector("#select");

const apiURL = "https://mindicador.cl/api/";

//variable para capturar el gráfico y usarlo en la destrucción
//del anterior.
let chart;


//Evento de click en el boton y realizar try-catch para API
button.addEventListener("click", async (x) => {
  x.preventDefault();
  try {
    const info = await fetch(apiURL + select.value);
    const valores = await info.json();
    console.log(valores);
    mostrarInfo(valores);
  } catch (error) {
    alert("API no disponible");
  }

  //check de valores al input, calculo de moneda y gráfico
  function convertir() {
    const input = parseFloat(document.querySelector("#number").value);
    let resultado = 0;
    if (input <= 0) {//el tema de que solo sean valores numericos esta definido en el html.
      alert("Favor de ingresar valores superiores a 0");
      return;
      
    } 
    
    const select = document.querySelector("#select").value;
    const datos = chart.data.datasets[0].data;
    if (select === "uf") {
        resultado = input / datos[datos.length - 1];
    }   else if (select === "euro") {
        resultado = input / datos[datos.length - 1];
    }   else if (select === "dolar") {
        resultado = input / datos[0];
    }
    document.querySelector("#valor").innerHTML = resultado.toFixed(2);
  }

  convertir();

  function mostrarInfo(data) {
    let arrayInfo = [];

    for (let i = 0; i <10; i++) {// es mi idea o en el gráfico se vee que los fin de semana no varia o no se muestra?
      arrayInfo.push(data.serie[i]);
    }

    console.log(arrayInfo);

    renderCanvas(arrayInfo);
  }

  function renderCanvas(data) {
    if (chart) {
      chart.destroy();
    }

    const labels = data.map((element) => {
      return element.fecha.slice(0, 10);
    });

    labels.reverse();

    const datos = data.map((element) => {
      return element.valor;
    });

    datos.reverse();

    chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: `${select.value}`,
            data: datos,
            borderWidth: 3,
          },
        ]
        ,
      },
    });
  }
});