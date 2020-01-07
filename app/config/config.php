<?php

function getUrl(){

    $auxUrl;

    if(isset($_SERVER['SCRIPT_URI'])){
        $auxUrl = "http://aplicacionunibosque.sebasjoya.com";
    }else{
        $auxUrl = "http://localhost/aplicacionunibosque";
    }

    return $auxUrl;
}

//ruta de la aplicación
define('APP_PATH',dirname(dirname(__FILE__)));
//ruta URL ejemplo http://localhost/grigat/v2/
define('URL_PATH', getUrl() );
//nombre del sitio
define('SITE_NAME','_SITENAME_');

//acceso a la base de datos
define('DB_HOST','localhost');
define('DB_USER','_USER_');
define('DB_PASSWORD','_PASSWORD_');
define('DB_NAME','_DATABASE_');

 ?>
