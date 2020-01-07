

let viajes;

$(()=>{
  viajes = new Viajes();
})


class Viajes {

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

      this.funciones['filtrarVehiculos'] = () => {
        const today = moment();
        const auxVehiculos = this.vehiculos.filter((vehiculo)=>{

            const infoVehiculo = JSON.parse(vehiculo.info_vehiculo);

            const fechasoat = moment(infoVehiculo.fechasoat, "DD/MM/YYYY");
            const fechatecno = moment(infoVehiculo.fechatecno, "DD/MM/YYYY");

            return fechasoat.diff(today) > 0 && fechatecno.diff(today) > 0 && vehiculo.id_estado_vehiculo ==2

        })

        this.vehiculos = auxVehiculos;

      }

      this.funciones['filtrarConductores'] = () => {
        const auxConductores = this.conductores.filter(conductor => conductor.id_estado_conductor == 2)
        this.conductores = auxConductores
      }

      this.funciones['llenarSelectInfo'] = (select,array, param, param2 = null) => {

          $(`#${select}`).find("option").not(":first").remove();
          let auxStr = ""

          for (let element of array) {
              const subElement = JSON.parse(element[`info_${select}`]);

              if (param2) {
                auxStr += `<option value="${element[`id_${select}`]}">${subElement[param]} ${subElement[param2]}</option>`
              }else{
                auxStr += `<option value="${element[`id_${select}`]}">${subElement[param]}</option>`

              }
          }

          $(`#${select}`).append(auxStr)

      }

      this.funciones['llenarSelectDesc'] = (select,array) => {

        $(`#${select}`).find("option").not(":first").remove();
        let auxStr = ""

        for (let element of array) {
              auxStr += `<option value="${element[`id_${select}`]}">${element[`desc_${select}`]}</option>`
        }

        $(`#${select}`).append(auxStr)

      }

      this.funciones['llenarSelects'] = () => {
        this.funciones.llenarSelectInfo('vehiculo',this.vehiculos,'nombre')
        this.funciones.llenarSelectInfo('conductor',this.conductores,'nombre', 'apellido')
        this.funciones.llenarSelectDesc('material',this.materiales)
      }

      this.funciones['llenarTablaMateriales'] = () => {

        if (this.materialesViaje.length <= 0) {
          $('#tablaMaterial').hidden()
          return;
        }else{

          let auxStr = ""
          for (let element of this.materialesViaje) {
              auxStr += `<tr>`
              auxStr += `<td>${this.materiales.find(material => material.id_material == element.id).desc_material}</td>`
              auxStr += `<td>${element.cantidad}</td>`
              auxStr += `</tr>`
          }

          $('#tablaMaterial tbody').empty()
          $('#tablaMaterial tbody').append(auxStr)
          $('#tablaMaterial').removeClass('hidden')

        }
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

      $(document).on('click','#agregarViaje',(event)=>{
        $('#agregarViaje').hidden();
        $('.modificarInfoForm').removeClass('hidden');
        $('#crearViaje').removeClass('hidden');
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

      $(document).on('click','#agregarMaterial',(event)=>{

        event.preventDefault();

        if ($('#material').val() == "" || $('#cantidad').val() == "" || isNaN($('#cantidad').val()) ) {
          alert("Por favor revisa la información antes de continuar")
          return;
        }

        if (this.materialesViaje.length > 0) {
            let total = 0;
            let suma = 0;

            for (let element of this.materialesViaje) {
              suma = suma + parseFloat(element.cantidad)
            }

            if (suma + parseFloat($('#cantidad').val()) > 1000) {
              alert("La cantidad total de materiales excede los 1000 kg")
              return
            }
        }

        const auxObj = {id: $('#material').val(), cantidad: $('#cantidad').val()}

        this.materialesViaje.push(auxObj)

        $('#material').val("")
        $('#cantidad').val("")

        this.funciones.llenarTablaMateriales();

      })

    }

    iniciadores() {

        this.funciones.filtrarVehiculos()
        this.funciones.filtrarConductores()
        this.funciones.llenarSelects()

        // this.funciones.llenarTabla();
        this.funciones.limpiarForm();
        esconderPreloader();
    }

    setters(){
        return new Promise((resolve,reject)=>{
            this.auxId;
            this.funciones;
            this.materialesViaje = [];

            let promise1 = traerInfo('estado')
            let promise2 = traerInfo('conductor')
            let promise3 = traerInfo('vehiculo')
            let promise4 = traerInfo('material')
            let promise5 = traerInfo('viaje')

            Promise.all([promise1,promise2,promise3, promise4, promise5]).then(result=>{
              this.estados = result[0];
              this.conductores = result[1];
              this.vehiculos = result[2],
              this.materiales = result[3],
              this.viajes = result[4]
              resolve(true)
            })
        })
    }
}
