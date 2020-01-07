<?php

class Pages extends Controller{

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

        echo "Hola mundo";

        //$this->view('pages/inicio',$data); //esta es la funcion heredada que carga la pagina
      }

}

 ?>
