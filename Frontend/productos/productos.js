import { obtenerProductos } from "./API.js";

document.addEventListener('DOMContentLoaded', () => {
    loadDatos();
})

async function loadDatos() {
    const productos = await obtenerProductos();
    const contenedor = document.querySelector('#divInsertDatos');
    
    const arrayProductos = productos.productos
    console.log(arrayProductos);

    arrayProductos.forEach(element => {
       const {ciudad, departamento, imagen, pais, precioMaximo, precioPromedio, _id, nombre} = element;
        
       contenedor.innerHTML += `
       <div class="mb-4" style="width: 320px; height: 460px; background-color: #3B3B3B; border-radius: 20px;">
                        <div style="height: 290px; width: 100%;">
                            <img src="${imagen}" alt="" width="100%" height="100%" style="border-top-left-radius: 20px; border-top-right-radius: 20px;">
                        </div>
                        <div class="d-flex flex-wrap p-3">
                          <div class="w-100">
                              <div>
                                <h5 class="overflow-auto" style="overflow: scroll;">${nombre} </h5>
                              </div>
                              <div class="d-flex align-items-center">
                                <img src="../img/colombia.jpg" alt="" height="22px" width="22px" style="border-radius: 100px;">
                                <p class="my-auto mx-2 text-light">${ciudad}, ${departamento}</p>   
                              </div>
                          </div>

                          <div class="w-100 mt-3 d-flex justify-content-between align-items-center" style="font-family: Space Mono; font-size: 18px;">
                              <div>
                                <span style="font-size: 11px;">Precio Promedio</span>
                                <p>${precioPromedio} </p>
                              </div>
                              <div style="text-align: end; font-size: 18px;">
                                <span style="font-size: 11px;">Precio Maximo</span>
                                <p>$${precioMaximo}</p>
                              </div>
                          </div>                          
                        </div>

                    </div>
       `

    });
}


