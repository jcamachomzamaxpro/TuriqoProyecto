import { obtenerReciclaje } from "./API.js";

document.addEventListener('DOMContentLoaded', () => {
    loadDatos();
})

async function loadDatos() {
    const reciclaje = await obtenerReciclaje();
    const contenedor = document.querySelector('#divInsertDatos');
    
    const arrayReciclaje = reciclaje.reciclaje
    console.log(arrayReciclaje);

    arrayReciclaje.forEach(element => {
       const {imagen, _id, color, cssColor, descripcion} = element;
        
       contenedor.innerHTML += `
       <div class="mb-4" style="width: 320px; height: 460px; background-color: #3B3B3B; border-radius: 20px;">
                        <div class="d-flex flex-wrap justify-content-center align-items-center" style="height: 290px; width: 100%;backdrop-filter: blur(20px); background-image: linear-gradient(#fb795c00, ${cssColor}), url('${imagen}'); background-position: center; background-size: cover; background-repeat: no-repeat;">
                            <img src="../img/Vector.png" alt="" width="50%" height="50%" style="border-top-left-radius: 20px; border-top-right-radius: 20px;">
                        </div>
                        <div class="d-flex flex-wrap p-3">
                          <div class="w-100">
                              <div>
                                <h5 class="overflow-auto" style="overflow: scroll;">Color ${color} </h5>
                              </div>
                              <div class="mt-4 d-flex flex-wrap align-items-center" style="font-family: Space Mono; font-size: 13px;">
                                ${descripcion}
                              </div>
                          </div>

                                                   
                        </div>

                    </div>
       `

    });
}


