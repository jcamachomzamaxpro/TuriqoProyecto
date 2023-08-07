const url = "http://localhost:4020/api/usuarios/";

export const obtenerUsuarios = async () =>{
    try {
        const response = await fetch(url);
        const datosInfo = await response.json();
        return datosInfo
    } catch (error) {
        console.log(error);
    }
    
}

export const addUsuario = async (data) =>{
    try {
        const response = await fetch(url,{
            method: "POST",
            body: JSON.stringify(data),
            headers: {'Content-Type':'application/json'}
        });
        
        const responseError = await response.json();
        console.log(responseError.msg);


        //window.location.href = "index.html"
    } catch (error) {
        console.log(error);
    }
};
