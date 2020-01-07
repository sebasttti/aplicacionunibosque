<?php

class API extends Controller{

    private $method;
    private $subcontroller;
    private $action;

    function __construct($method,$parameters=null) {
      
      $this->method = $method;

      if ($parameters) {
        $this->subcontroller = ucfirst($parameters[0]);

          if (isset($parameters[1])) {
            $this->action = $parameters[1];
          }

      }

      //creo el modelo
      $this->modelo = $this->model($this->method,$this->subcontroller);

      $callable_action = $this->action;

      if (method_exists($this->modelo,$callable_action)) {
        $this->modelo->$callable_action($_REQUEST);
      }else{
        die("el metodo del subcontrolador no existe");
      }


    }   
      

    public function main(){
      echo "Por favor ingresa una url adecuada para manejar este archivo";
    }
}


 ?>
