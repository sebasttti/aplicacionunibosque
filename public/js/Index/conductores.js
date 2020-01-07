

let conductores;

$(()=>{
  conductores = new Conductores();
})


class Conductores {

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
        for (let conductor of this.conductores) {

            const conductorData = JSON.parse(conductor.info_conductor);

            auxString += `<tr>`;
              auxString += `<td> ${this.conductores.indexOf(conductor) + 1} </td>`;
              auxString += `<td> ${conductorData.nombre} </td>`;
              auxString += `<td> ${conductorData.apellido} </td>`;
              auxString += `<td> ${conductorData.cedula} </td>`;
              auxString += `<td> ${conductorData.licencia} </td>`;
              auxString += `<td> ${this.estados.find(estado => estado.id_estado == conductor.id_estado_conductor).desc_estado} </td>`;
              auxString += `<td> <button class="btn btn-info modificarConductorBtn" id="${this.conductores.indexOf(conductor)}">Modificar</button> </td>`;
            auxString += `</tr>`;
        }

        // console.log(auxString)
        $('table tbody').append(auxString);
      }

      this.funciones['limpiarForm'] = () => {
        $('form').trigger('reset')
      }
    }

    activadores() {

      $(document).on('click','.modificarConductorBtn',(event)=>{

        const id = $(event.target).attr('id')
        this.auxId = parseFloat(id) + 1

        const conductorSelected = this.conductores[id];
        const infoConductor = JSON.parse(conductorSelected.info_conductor);

        $('#nombre').val(infoConductor.nombre);
        $('#apellido').val(infoConductor.apellido);
        $('#cedula').val(infoConductor.cedula);
        $('#licencia').val(infoConductor.licencia);

        $('#agregarConductor').hidden();
        $('#crearInformacion').hidden();
        $('.modificarInfoForm').removeClass('hidden');
        $('#actualizarInformacion').removeClass('hidden');
      })

      $(document).on('click','#actualizarInformacion',(event)=>{

        event.preventDefault();

        //primero verifico que la info este

        if ($('#nombre').val() == "" ||
            $('#apellido').val() == "" ||
            $('#cedula').val() == "" ||
            $('#licencia').val() == "" ||
            isNaN($('#cedula').val()) ||
            isNaN($('#licencia').val())
            ) {
          alert("Por favor verifica la información antes de continuar");
          return;
        }

        //ahora botengo la data
        const data = {
                      nombre: $('#nombre').val(),
                      apellido: $('#apellido').val(),
                      cedula: $('#cedula').val(),
                      licencia: $('#licencia').val()
                    }

        const dataString = JSON.stringify(data);

        updateInfo('conductor',this.auxId,dataString).then(response=>{
          if (response.exito) {
            alert('Información actualizada con éxito');
            window.location.reload()
          }
        })


      })

      $(document).on('click','#agregarConductor',(event)=>{
        $('#agregarConductor').hidden();
        $('.modificarInfoForm').removeClass('hidden');
        $('#crearInformacion').removeClass('hidden');
      })

      $(document).on('click','#crearInformacion',(event)=>{

        event.preventDefault();

        //primero verifico que la info este

        if ($('#nombre').val() == "" ||
            $('#apellido').val() == "" ||
            $('#cedula').val() == "" ||
            $('#licencia').val() == "" ||
            isNaN($('#cedula').val()) ||
            isNaN($('#licencia').val())
            ) {
          alert("Por favor verifica la información antes de continuar");
          return;
        }

        //ahora botengo la data
        const data = {
                      nombre: $('#nombre').val(),
                      apellido: $('#apellido').val(),
                      cedula: $('#cedula').val(),
                      licencia: $('#licencia').val()
                    }

        const dataString = JSON.stringify(data);

        updateInfo('conductor',dataString).then(response=>{
          if (response.exito) {
            alert('Información actualizada con éxito');
            window.location.reload()
          }
        })



      })

    }

    iniciadores() {

        this.funciones.llenarTabla();
        this.funciones.limpiarForm();
        esconderPreloader();
    }

    setters(){
        return new Promise((resolve,reject)=>{
            this.auxId;
            this.funciones;

            let promise1 = traerInfo('estado')
            let promise2 = traerInfo('conductor')

            Promise.all([promise1,promise2]).then(result=>{
              this.estados = result[0];
              this.conductores = result[1];
              resolve(true)
            })
        })
    }
}
