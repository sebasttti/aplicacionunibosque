

let inicio;

$(()=>{
  inicio = new Inicio();
})


class Inicio {

    constructor() {
      console.log('clase inicio instanciada');
      this.setters().then(()=>{
        this.funciones();
        this.activadores();
        this.iniciadores();
      })
    }

    funciones() {
      this.funciones['goTo'] = (page) => {
        window.location.href = window.location.href + `${page}/`
      }
    }

    activadores() {
      $(document).on('click', '.btn', (event)=>{

          const target = event.target
          const link = $(target).attr('link')

          this.funciones.goTo(link);

      })
    }

    iniciadores() {
        esconderPreloader();
    }

    setters(){
        return new Promise((resolve,reject)=>{
            this.funciones;
            resolve(true);
        })
    }
}
