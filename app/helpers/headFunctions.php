<?php
  
  function titulo($titulo){
    if  (!isset($titulo)) {
      $titulo = "POR FAVOR INGRESA EL TÍTULO!!!!!!";
    }

    return $titulo;
  }


  function agregarCSS($data){
      $acumCSS = array();

      //primero limpio la variable css
      unset($css);
      //aca incluyo el default href
      include_once APP_PATH.'/views/Href/Index/default.php';
        //ahora leo la variable css
        if (isset($css)) {
          foreach ($css as $key => $value) {
            array_push($acumCSS,array($value[0],$value[1]));
          }
        }


      //aca incluyo los css que llame
          if (isset($data['librerias'])) {

            foreach ($data['librerias'] as $componente) {
                if (file_exists(APP_PATH.'/views/Href/Index/'.$componente.'.php')) {
                    //primero limpio la variable css
                    unset($css);
                    //aca incluyo el archivo
                    include_once APP_PATH.'/views/Href/Index/'.$componente.'.php';
                    //ahora leo la variable css
                    if (isset($css)) {
                      foreach ($css as $key => $value) {
                        array_push($acumCSS,array($value[0],$value[1]));
                      }
                    }

                }
            }

                  //busco dentro de user o admin
                  if (isset($_SESSION['tipoString'])) {

                      $tipo = $_SESSION['tipoString'];

                      foreach ($data['librerias'] as $componente) {
                          if (file_exists(APP_PATH.'/views/Href/'.$tipo.'/'.$componente.'.php')) {

                              //primero limpio la variable css
                              unset($css);
                              //aca incluyo el archivo
                              include_once APP_PATH.'/views/Href/'.$tipo.'/'.$componente.'.php';
                              //ahora leo la variable css
                              if (isset($css)) {
                                foreach ($css as $key => $value) {
                                  array_push($acumCSS,array($value[0],$value[1]));
                                }
                              }

                          }
                      }
                  }


          }

      //===========================================

      foreach ($acumCSS as $key => $value) {
         echo "  <link rel='stylesheet' href='".$value[0]."' ".$value[1].">". "\n";
      }
  }

  function quitarCache(){
    echo "<meta http-equiv='Expires' content='0'>";
    echo "<meta http-equiv='Last-Modified' content='0'>";

    echo "<meta http-equiv='Cache-Control' content='no-cache, mustrevalidate'>";

    echo "<meta http-equiv='Pragma' content='no-cache'>";
  }

 ?>
