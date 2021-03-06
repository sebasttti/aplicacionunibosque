

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

        if (this.viajes.length <= 0) {
          $('.contenedorTabla').hidden()
          $('.noViajes').removeClass('hidden')
          return;
        }


        let auxString = "";
        for (let viaje of this.viajes) {

            const viajeData = JSON.parse(viaje.info_viaje);

            auxString += `<tr>`;
              auxString += `<td> ${this.viajes.indexOf(viaje) + 1} </td>`;
              auxString += `<td> ${viajeData.fecha} </td>`;
              auxString += `<td> ${viajeData.destino} </td>`;
              auxString += `<td> ${viajeData.distancia} </td>`;
              auxString += `<td> ${this.funciones.materiales(viajeData.material)} </td>`;
              auxString += `<td> ${viajeData.costo} </td>`;
              auxString += `<td> ${JSON.parse(this.conductores.find(conductor=>conductor.id_conductor == viajeData.conductor).info_conductor).nombre} ${JSON.parse(this.conductores.find(conductor=>conductor.id_conductor == viajeData.conductor).info_conductor).apellido} </td>`;
              auxString += `<td> ${JSON.parse(this.vehiculos.find(vehiculo=>vehiculo.id_vehiculo == viajeData.vehiculo).info_vehiculo).nombre} </td>`;
              auxString += `<td> ${this.estado_viaje.find(estado=>estado.id_estado_viaje == viaje.id_estado_viaje).desc_estado_viaje} </td>`;
              auxString += `<td><button class="btn btn-info confirmarViaje" idViaje="${viaje.id_viaje}">Concluir viaje</button></td>`
            auxString += `</tr>`;
        }

        // console.log(auxString)
        $('table tbody').append(auxString);

        $('.contenedorTabla').removeClass('hidden')
        $('.noViajes').hidden()
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

        this.nVehiculos = auxVehiculos;

      }

      this.funciones['filtrarConductores'] = () => {
        const auxConductores = this.conductores.filter(conductor => conductor.id_estado_conductor == 2)
        this.nConductores = auxConductores
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
        this.funciones.llenarSelectInfo('vehiculo',this.nVehiculos,'nombre')
        this.funciones.llenarSelectInfo('conductor',this.nConductores,'nombre', 'apellido')
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

      this.funciones['materiales'] = (arrMateriales) =>{
        const materiales = JSON.parse(arrMateriales)

            let auxString = ""

            for (const lookMaterial of materiales) {

                auxString += this.materiales.find(material=>material.id_material == lookMaterial.id ).desc_material
                auxString += ", "
                
            }

            auxString = auxString.substring(0,auxString.length -2)

            return auxString
      }
    }

    activadores() {


      $(document).on('click','#agregarViaje',(event)=>{
        $('#agregarViaje').hidden();
        $('.modificarInfoForm').removeClass('hidden');
        $('#crearViaje').removeClass('hidden');
      })

      $(document).on('click','#crearViaje',(event)=>{

        event.preventDefault();

        //primero verifico que la info este

        if ($('#fecha').val() == "" ||
            $('#destino').val() == "" ||
            $('#distancia').val() == "" ||
            isNaN( $('#distancia').val() ) ||
            $('#conductor').val() == "" ||
            $('#vehiculo').val() == "" ||
            this.materialesViaje.length < 1
            ) {
          alert("Por favor verifica la información antes de continuar");
          return;
        }

        //obtengo el costo del viaje
        let suma = 0;
        for (let element of this.materialesViaje) {
          suma = suma + parseFloat(element.cantidad)
        }

        let costo = (suma*800000)*(parseFloat($('#distancia').val()) / 5).toFixed(2)
        let auxMaterial = JSON.stringify(this.materialesViaje)

        //ahora botengo la data
        const data = {
                      fecha: $('#fecha').val(),
                      destino: $('#destino').val(),
                      distancia: $('#distancia').val(),
                      costo: costo,
                      material: auxMaterial,
                      conductor: $('#conductor').val(),
                      vehiculo: $('#vehiculo').val()
                    }

        const dataString = JSON.stringify(data);

        createInfo('viaje',dataString).then(response=>{
          if (response.exito) {


            let promise1 = updateEstado('conductor', $('#conductor').val(), '1')
            let promise2 = updateEstado('vehiculo', $('#conductor').val(), '1')

            promise1.then(response=>console.log(response));

            Promise.all([promise1,promise2]).then((response)=>{
              if (response[0].exito && response[1].exito) {
                alert('Información actualizada con éxito');
                window.location.reload()
              }
            })

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

      $(document).on('click','.confirmarViaje',(event)=>{
        event.preventDefault();

        const id = $(event.target).attr('idViaje');
        console.log(id)

        const cn = confirm("¿Deseas dar por concluido este viaje?")

        if(cn){

          // necesito obtener el conductor y el vehiculo
          const infoViaje = JSON.parse(this.viajes.find(viaje=>viaje.id_viaje == id).info_viaje);
          const conductor = infoViaje.conductor
          const vehiculo = infoViaje.vehiculo

          //ahora hago las promesas

          //le digo la viaje que este finalizado
          let promise1 = updateEstado('viaje',id,'2')
          //le digo al conductor que este disponible
          let promise2 = updateEstado('conductor',conductor,'2')
          // le digo al vehiculo quye este disponible
          let promise3 = updateEstado('vehiculo',vehiculo,'2')

          Promise.all([promise1,promise2,promise3])
          .then((response)=>{
            console.log(response)

            if(response[0].exito && response[1].exito && response[2].exito){
              alert("Información actualizada con ecito")
              window.location.reload()
            }
          })


         /*  let promise1 = updateEstado('conductor', $('#conductor').val(), '1')
          let promise2 = updateEstado('vehiculo', $('#conductor').val(), '1') */
        }
      })

    }

    iniciadores() {

        $("#fecha").datetimepicker(
        {locale: 'es',format: 'DD/MM/YYYY'});

        this.funciones.filtrarVehiculos()
        this.funciones.filtrarConductores()
        this.funciones.llenarSelects()

        this.funciones.llenarTabla();
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
            let promise6 = traerInfo('estado_viaje')

            Promise.all([promise1,promise2,promise3, promise4, promise5, promise6]).then(result=>{
              this.estados = result[0];
              this.conductores = result[1];
              this.vehiculos = result[2],
              this.materiales = result[3],
              this.viajes = result[4],
              this.estado_viaje = result[5]
              resolve(true)
            })
        })
    }
}
