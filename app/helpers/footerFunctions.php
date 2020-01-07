<?php

function agregarJS($data){
  $acumJS = array();

  //primero limpio la variable js
  unset($js);
  //aca incluyo el default href
  include APP_PATH.'/views/Href/Index/default.php';

    //ahora leo la variable js
    if (isset($js)) {
      foreach ($js as $key => $value) {
        array_push($acumJS,array($value[0],$value[1]));
      }
    }

    //aca incluyo los css que llame
        if (isset($data['librerias'])) {
          foreach ($data['librerias'] as $componente) {
              if (file_exists(APP_PATH.'/views/Href/Index/'.$componente.'.php')) {

                  //primero limpio la variable css
                  unset($js);
                  //aca incluyo el archivo
                  include APP_PATH.'/views/Href/Index/'.$componente.'.php';
                  //ahora leo la variable css
                  if (isset($js)) {
                    foreach ($js as $key => $value) {
                      array_push($acumJS,array($value[0],$value[1]));
                    }
                  }

              }

          }

          //================================================

                if (isset($_SESSION['tipoString'])) {

                  $tipo = $_SESSION['tipoString'];

                  foreach ($data['librerias'] as $componente) {
                      if (file_exists(APP_PATH.'/views/Href/'.$tipo.'/'.$componente.'.php')) {

                          //primero limpio la variable css
                          unset($js);
                          //aca incluyo el archivo
                          include APP_PATH.'/views/Href/'.$tipo.'/'.$componente.'.php';
                          //ahora leo la variable css
                          if (isset($js)) {
                            foreach ($js as $key => $value) {
                              array_push($acumJS,array($value[0],$value[1]));
                            }
                          }

                      }

                  }
                }



        }

        foreach ($acumJS as $key => $value) {
           echo "  <script src='".$value[0]."' ".$value[1]."></script>". "\n";
        }

}


 ?>
