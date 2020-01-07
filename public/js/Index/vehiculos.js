

let vehiculos;

$(()=>{
  vehiculos = new Vehiculos();
})


class Vehiculos {

    constructor() {
      console.log('clase vehiculos instanciada');
      this.setters().then(()=>{
        this.funciones();
        this.activadores();
        this.iniciadores();
      })
    }

    funciones() {
      this.funciones['llenarTabla'] = () => {

        let auxString = "";
        for (let vehiculo of this.vehiculos) {

            const vehiculoData = JSON.parse(vehiculo.info_vehiculo);

            auxString += `<tr>`;
              auxString += `<td> ${this.vehiculos.indexOf(vehiculo) + 1} </td>`;
              auxString += `<td> ${vehiculoData.nombre} </td>`;
              auxString += `<td> ${vehiculoData.fechasoat} </td>`;
              auxString += `<td> ${vehiculoData.fechatecno} </td>`;
              auxString += `<td> <button class="btn btn-info modificarVehiculoBtn" id="${this.vehiculos.indexOf(vehiculo)}">Modificar información</button> </td>`;
            auxString += `</tr>`;
        }

        // console.log(auxString)
        $('table tbody').append(auxString);
      }
    }

    activadores() {

      $(document).on('click','.modificarVehiculoBtn',(event)=>{

        const id = $(event.target).attr('id')
        this.auxId = parseFloat(id) + 1

        const vehiculoSelected = this.vehiculos[id];
        const infoVehiculo = JSON.parse(vehiculoSelected.info_vehiculo);

        $('#nombreVehiculo').val(infoVehiculo.nombre);
        $('#fechaSoat').val(infoVehiculo.fechasoat);
        $('#fechaTecno').val(infoVehiculo.fechatecno);

        $('.modificarInfoForm').removeClass('hidden');
      })

      $(document).on('click','#actualizarInformacion',(event)=>{

        event.preventDefault();

        //primero verifico que la info este

        if ($('#nombreVehiculo').val() == "" || $('#fechaSoat').val() == "" || $('#fechaTecno').val() == "" ) {
          alert("Por favor verifica la información antes de continuar");
        }

        //ahora botengo la data
        const data = {
                      nombre: $('#nombreVehiculo').val(),
                      fechasoat: $('#fechaSoat').val(),
                      fechatecno: $('#fechaTecno').val()
                    }

        const dataString = JSON.stringify(data);

        updateInfo('vehiculo',this.auxId,dataString).then(response=>{
          if (response.exito) {
            alert('Información actualizada con éxito');
            window.location.reload()
          }
        })


      })



    }

    iniciadores() {

        $("#fechaSoat").datetimepicker(
        {locale: 'es',format: 'DD/MM/YYYY'});

        $("#fechaTecno").datetimepicker(
        {locale: 'es',format: 'DD/MM/YYYY'});


        this.funciones.llenarTabla();
        esconderPreloader();
    }

    setters(){
        return new Promise((resolve,reject)=>{
            this.auxId;
            this.funciones;

            traerInfo('vehiculo').then(response=>{
              this.vehiculos = response;
              resolve(true);
            });
        })
    }
}
