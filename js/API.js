class API{

    async obtenerDatos(){
        const total = 100;
        const datos = await fetch(`https://api.datos.gob.mx/v1/precio.gasolina.publico?pageSize=${total}`);
        const respuestaJson = await datos.json();
        return {
            respuestaJson
        }
    }
}