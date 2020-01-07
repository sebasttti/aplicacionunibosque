<?php

//se encarga de poder cargar los modelos y las vistas

class Controller{
    //cargar controlador
    public function model($method,$subcontroller){

        $method = ucfirst($method);
        $subcontroller = ucfirst($subcontroller);
       //
      $string = '../app/models/'.$method.'/'.$subcontroller.'.php';
    
        if (file_exists($string)) {
            require_once '../app/models/'.$method.'/'.$subcontroller.'.php';
            //instanciar el modelo
            return new $subcontroller;
       }else{
      //   //si el archivo no existe imprima un error
         die('el modelo no existe');
       }
    }

    //cargar vista
    public function view($view,$data=[]){
      //chequear si la vista existe
      if (file_exists('../app/views/'.$view.'.php')) {
          require_once('../app/views/'.$view.'.php');
      }else{
        //si el archivo no existe imprima un error
        die('la vista no existe');
      }
    }

}

 ?>
