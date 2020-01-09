let informes

$(()=>{
    informes = new Informes
})


class Informes {
    constructor(){
        console.log('clase informes instanciada')
        this.setters().then(()=>{
            this.funciones()
            this.activadores()
            this.iniciadores()            
        })
    }

    funciones(){

        this.funciones['llenarTabla1'] = () =>{
            
            $('#tabla1 tbody').empty()

            let auxStr = ""

            for (let viaje of this.viajes) {

                if(viaje.id_estado_viaje == '1'){

                    const infoViaje = JSON.parse(viaje.info_viaje)
                    

                    auxStr += `<tr>`
                    auxStr += `<td>${infoViaje.fecha}</td>`
                    auxStr += `<td>${JSON.parse(this.vehiculos.find(vehiculo=>vehiculo.id_vehiculo == infoViaje.vehiculo).info_vehiculo).nombre}</td>`
                    auxStr += `<td>${JSON.parse(this.conductores.find(conductor=>conductor.id_conductor == infoViaje.conductor).info_conductor).nombre} ${JSON.parse(this.conductores.find(conductor=>conductor.id_conductor == infoViaje.conductor).info_conductor).apellido}</td>`
                    auxStr += `<td>${this.funciones.traerMateriales(infoViaje.material)}</td>`

                    auxStr += `</tr>`

                }
            }

            $('#tabla1 tbody').append(auxStr)

        }

        this.funciones['llenarTabla2'] = () =>{

            $('#tabla2 tbody').empty()

            let auxStr = ""

            for (const viaje of this.viajes) {

                const infoViaje = JSON.parse(viaje.info_viaje)
                const materiales = JSON.parse(infoViaje.material)                

                

                    for (const uMaterial of materiales) {

                        auxStr += `<tr>`

                        if(materiales.indexOf(uMaterial) == 0){
                            auxStr += `<td rowspan="${materiales.length}">${infoViaje.fecha}</td>`
                        }

                        auxStr += `<td>${this.materiales.find(element => element.id_material == uMaterial.id).desc_material}</td>`
                        auxStr += `<td>${uMaterial.cantidad}</td>`
                        auxStr += `<td>${((parseFloat(uMaterial.cantidad)*800000)*(parseFloat(infoViaje.distancia)/5)).toFixed(2)}</td>`

                        auxStr += `</tr>`
                    }
                              
            }

            $('#tabla2 tbody').append(auxStr)
            
        }

        this.funciones['llenarTabla3'] = () =>{

            const nVehiculos = this.funciones.organizarVehiculos()
            console.log(nVehiculos)

            $('#tabla3 tbody').empty()

            let auxStr = ""

            for (const vehiculo of nVehiculos) {
                const infoVehiculo = JSON.parse(vehiculo.info_vehiculo)

                auxStr += `<tr>`
                auxStr += `<td>${infoVehiculo.nombre}</td>`
                auxStr += `<td>${infoVehiculo.fechasoat}</td>`
                auxStr += `<td>${infoVehiculo.fechatecno}</td>`
                auxStr += `<td>${this.estadoPapeles.find(element => element.id == vehiculo.estadoPapeles).desc}</td>`
                auxStr += `</tr>`

            }

            $('#tabla3 tbody').append(auxStr)
            
        }

        this.funciones['traerMateriales'] = (arrMateriales) =>{
            const materiales = JSON.parse(arrMateriales)

            let auxString = ""

            for (const lookMaterial of materiales) {

                auxString += this.materiales.find(material=>material.id_material == lookMaterial.id ).desc_material
                auxString += ", "
                
            }

            auxString = auxString.substring(0,auxString.length -2)

            return auxString
        }

        this.funciones['organizarVehiculos'] = ()=>{
            const siPasa = []
            const noPasa = []
            const nVehiculos = []
            const today = moment()

            for (const vehiculo of this.vehiculos) {

                const infoVehiculo = JSON.parse(vehiculo.info_vehiculo)
                const fechasoat = moment(infoVehiculo.fechasoat,"DD/MM/YYYY")
                const fechatecno = moment(infoVehiculo.fechatecno,"DD/MM/YYYY")

                if( today.diff(fechasoat) > 0 || today.diff(fechatecno) > 0 ){
                    vehiculo['estadoPapeles'] = '1'
                    noPasa.push(vehiculo)

                }else{
                    vehiculo['estadoPapeles'] = '2'
                    siPasa.push(vehiculo)                    
                }                
            }

            //console.log(noPasa, siPasa)

            return noPasa.concat(siPasa);
        }

    }

    activadores(){
        
    }

    iniciadores(){

        this.funciones.llenarTabla1()
        this.funciones.llenarTabla2()
        this.funciones.llenarTabla3()
        esconderPreloader();

    }

    setters(){

        return new Promise((resolve,reject)=>{
            this.vehiculos
            this.viajes
            this.materiales
            this.funciones
            this.conductores
            this.estadoPapeles = [{id:'1',desc:'Vehículo No apto'},{id:'2',desc:'Vehículo apto'}]
    
            const promise1 = traerInfo('viaje')
            const promise2 = traerInfo('vehiculo')
            const promise3 = traerInfo('material')
            const promise4 = traerInfo('conductor')            
            
            Promise.all([promise1,promise2,promise3,promise4])
            .then(response=>{

                // console.log(response)


                this.viajes = response[0]
                this.vehiculos = response[1]
                this.materiales = response[2]
                this.conductores = response[3]
    
                resolve(true)
            }).catch(failure=>console.log(failure))
        })

        

    }
}