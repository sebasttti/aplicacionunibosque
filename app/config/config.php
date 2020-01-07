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
define('SITE_NAME','Aplicativo Prueba Técnica UniBosque');

//acceso a la base de datos
define('DB_HOST','localhost');
define('DB_USER','root');
define('DB_PASSWORD','');
define('DB_NAME', APP_PATH.'/db/aplicacionUnibosque.db');

 ?>
