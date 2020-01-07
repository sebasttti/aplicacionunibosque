<?php

class Common{
  private $db;

  public function __construct(){
    $this->db = new Database;
  }

  public function llenarSelect(){

        header('Content-type:application/json; charset=utf-8');

        $resultados = "";
        $tableName = $_REQUEST['tableName'];
        $tableId = $_REQUEST['tableId'];
        $tableDesc = $_REQUEST['tableDesc'];

        $this->db->query("SELECT * from $tableName");

        $response = $this->db->responseAll();

        $resultados = array();

        foreach ($response as $key => $value) {

            $aux = array($value->$tableId => $value->$tableDesc);
            $resultados += $aux;
        }


        echo json_encode($resultados, JSON_UNESCAPED_UNICODE);
  }

  public function municipios($atributes){
    header('Content-type:application/json; charset=utf-8');
    $id = $atributes['id'];
    $this->db->query('SELECT * from municipio where id_departamento_municipio=:id');
    $this->db->bind(':id',$id);
    $resultados = $this->db->responseAll();
    echo json_encode($resultados, JSON_UNESCAPED_UNICODE);
  }

  function fillInput(){
     header('Content-type:application/json; charset=utf-8');
     $tableName = $_REQUEST["tableName"];
     $tableIdInputChanged = $_REQUEST["tableIdInputChanged"];
     $idInputChanged = $_REQUEST["idInputChanged"];

     $this->db->query("SELECT * from $tableName where $tableIdInputChanged=$idInputChanged");
     $resultados = $this->db->responseAll();


     echo json_encode($resultados, JSON_UNESCAPED_UNICODE);

  }

  function traerInfo(){

    header('Content-type:application/json; charset=utf-8');

    $tabla = $_REQUEST["tabla"];

    if (isset($_REQUEST["id"])) {

        $id = $_REQUEST["id"];

        //funcion modificada 12/11/2019
        $columnTabla = "";

        if (isset($_REQUEST['column'])) {
          $columnTabla = $_REQUEST['column'];
        }else{
          $columnTabla = $this->traerColumnas($tabla)[0]->COLUMN_NAME;
        }

        $this->db->query("SELECT * from $tabla where $columnTabla = $id");
        $resultados = $this->db->responseUnique();
    }else{

        $this->db->query("SELECT * from $tabla");
        $resultados = $this->db->responseAll();

    }



    echo json_encode($resultados, JSON_UNESCAPED_UNICODE);
  }

  public function updateInfo(){

    $tabla = $_REQUEST["tabla"];
    $id = $_REQUEST["id"];
    $data = $_REQUEST["data"];

    $str = "UPDATE $tabla SET info_$tabla = :data WHERE id_$tabla = $id";

    $this->db->query($str);
    $this->db->bind(':data',$data);
    $res = $this->db->execute();

    imprimirJSON(exitoFracaso($res));

  }

  public function udpateEstado(){

    $tabla = $_REQUEST["tabla"];
    $id = $_REQUEST["id"];
    $value = $_REQUEST["value"];

    $str = "UPDATE $tabla SET id_estado_$tabla = :value WHERE id_$tabla = $id";

    $this->db->query($str);
    $this->db->bind(':value',$value);
    $res = $this->db->execute();

    imprimirJSON(exitoFracaso($res));

  }

  public function createInfo(){

    $tabla = $_REQUEST["tabla"];
    $data = $_REQUEST["data"];

    $str = "INSERT INTO $tabla (info_$tabla) values (:data)";

    $this->db->query($str);
    $this->db->bind(':data',$data);
    $res = $this->db->execute();

    imprimirJSON(exitoFracaso($res));

  }


  function traerColumnas($tabla){

      $db_name = DB_NAME;

      $this->db->query("SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = '".$db_name."' AND TABLE_NAME = '".$tabla."'");
      $resultados = $this->db->responseAll();
      return $resultados;
  }

  function session(){
    print_r($_SESSION);
  }
}


 ?>
