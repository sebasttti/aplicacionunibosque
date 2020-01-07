<?php

//cargamos librerias
require_once 'config/config.php';

spl_autoload_register(function($className){
    require_once 'libs/'.$className.'.php';
});

//aca llamo a todos los archivos de helpers
foreach ( glob('../app/helpers/*.php') as $filename)
{
  include_once $filename;
}

 ?>
