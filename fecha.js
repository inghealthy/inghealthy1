/* fecha */

function actualizarFecha () {

    const fecha = new Date ();   
    let mesAnyo = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre','Noviembre', 'Diciembre' ];
    
    document.querySelector('#fecha').textContent = fecha.getFullYear ();
    document.querySelector('#fecha2').textContent = fecha.getFullYear ();
    document.querySelector('#mes').textContent = mesAnyo[fecha.getMonth ()];
}
    
window.addEventListener ('load', actualizarFecha);

