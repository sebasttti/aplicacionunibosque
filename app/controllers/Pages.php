<?php

class Pages extends Controller{

      protected $articuloModelo;

      public function __construct(){

      }

      public function index(){ //este es el metodo que carga la pagina

        $this->view('pages/inicio',$data); //esta es la funcion heredada que carga la pagina
      }

}

 ?>
