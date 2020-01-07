<?php



class Index extends Controller{

      private $method;
      private $subcontroller;
      private $action;

      public function __construct($method,$parameters=null){          

           $this->method = $method;

           if ($parameters) {
             $this->subcontroller = ucfirst($parameters[0]);
             $this->action = $parameters[1];
           }

           $callable_method = $this->method;
           $this->$callable_method();
      }

      public function main(){ //este es el metodo que carga la pagina
        $data = array();   
        $data['contenido'] = 'inicio';
        $this->view('pages/mainPage',$data); //esta es la funcion heredada que carga la pagina
      }

}

 ?>