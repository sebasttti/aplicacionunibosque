<?php

class Ejemplo{
  private $db;

  public function __construct(){
    $this->db = new Database;
  }

  public function ejemplo(){
    $this->db->query("SELECT * FROM ejemplo");
    $res = $this->db->responseAll();
    
    imprimirJSON($res);

  }

  public function obtenerInfo(){
    header('Content-type:application/json; charset=utf-8');

    $resultados = array("mensaje"=>array('ejemplo1' => 'ejemplo1'));

    echo json_encode($resultados, JSON_UNESCAPED_UNICODE);
  }

  public function infoEjemplo(){
    return;
    header('Content-type:application/json; charset=utf-8');

    $arrayGrande = array();

    $arrayPequeño1 = [
      "elemento1" => "elemento1",
      "elemento2" => "elemento2"
    ];

    $arrayPequeño2 = [
      "elemento1" => "elemento1",
      "elemento2" => "elemento2"
    ];

    $arrayGrande[] = $arrayPequeño1;
    $arrayGrande[] = $arrayPequeño2;


    $array3 = ["vaca","caballo","puerco"];


    //http://localhost/rootcap/functions/index/ejemplo/infoEjemplo/
    echo json_encode($arrayGrande, JSON_UNESCAPED_UNICODE);
  }

  function convertirjson(){
    header('Content-type:application/json; charset=utf-8');

    $array = ["mensaje"=>true];

    echo json_encode($array, JSON_UNESCAPED_UNICODE);
  }

  function post(){
    var_dump($_REQUEST);
  }

  function session(){
    var_dump($_SESSION);
  }

  

}


 ?>
