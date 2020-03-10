class UI {
    constructor() {

        this.api = new API();

        this.markers = new L.layerGroup();
         // Iniciar el mapa
        this.mapa = this.inicializarMapa();

    }

    inicializarMapa() {
         // Inicializar y obtener la propiedad del mapa
        const map = L.map('mapa').setView([19.390519, -99.3739778], 6);
        const enlaceMapa = '<a href="http://openstreetmap.org">OpenStreetMap</a>';
        L.tileLayer(
            'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; ' + enlaceMapa + ' Contributors',
            maxZoom: 18,
            }).addTo(map);
        return map;

    }

    mostrarEstablecimientos(){
        this.api.obtenerDatos()
            .then(datos =>{
                const resultados = datos.respuestaJson.results;
                this.mostrarPines(resultados)
            })

    }

    mostrarPines(datos){
        // siempre limpiar antes de mandar
        this.markers.clearLayers();

        // recorrer los establecimientos
        datos.forEach(dato =>{
            const {latitude, longitude, calle, regular, premium} = dato;
            const opcionesPopUp = L.popup().setContent(`
                <p>Calle: ${calle}</p>
                <p><b>Regular: $${regular}</b></p>
                <p><b>Premium: $${premium}</b></p>
            `)
            const marker = new L.marker([
                parseFloat(latitude),
                parseFloat(longitude)

            ]).bindPopup(opcionesPopUp);
            this.markers.addLayer(marker);
        });

        this.markers.addTo(this.mapa);
    }


    // Buscador
    obtenerSugerencias(busqueda){
        this.api.obtenerDatos()
        .then(datos => {
            const resultados = datos.respuestaJson.results;
            this.filtrarSugerencias(resultados, busqueda);
        })
    }

    // 
    filtrarSugerencias(resultado, busqueda){
        // filtrar una busqueda
        const filtro = resultado.filter((filtro) => filtro.calle.indexOf(busqueda) !== -1);
        this.mostrarPines(filtro);
    }
}