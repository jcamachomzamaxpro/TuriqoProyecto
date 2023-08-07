const url = "http://localhost:4020/api/productos/";

export const obtenerProductos = async () =>{
    try {
        const productos = await fetch(url);
        const datosProducto = await productos.json();
        return datosProducto
    } catch (error) {
        console.log(error);
    }
    
}

export const addProducto = async (data) =>{
    try {
        const response = await fetch(url,{
            method: "POST",
            body: JSON.stringify(data),
            headers: {'Content-Type':'application/json'}
        });
        
        const responseError = await response.json();
        console.log(responseError.msg);


        window.location.href = "index.html"
    } catch (error) {
        console.log(error);
    }
};

export const borrarProducto = async (id) =>{
    try {
        await fetch(`${url}/${id}`,{
            method: "DELETE",
            headers: {
                "Content-Type":"application/json",
            }
        });
        window.location.href = "index.html"
    } catch (error) {
        console.log(error);
    }
};
