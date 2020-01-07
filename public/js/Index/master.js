console.log("init_master");

var getLocation = function(param){
  var loc = String(window.location);
  var res = loc.split("/");
  switch (param) {
    case "controller":
        return res[4];
      break;
    case "method":
        return res[5];
      break;
    case "url":
        return res[0]+"/"+res[1]+"/"+res[2]+"/"+res[3];
      break;
    default:
        return "No existe la locación";
      break;
  }
}
// Estas variables son muy importantes para el proyecto
// porque son como el config de php, pero en js
var url = getLocation("url");
var controller = getLocation("controller");
var method = getLocation("method");

var checkJquery=function(){
  if(jQuery){
    console.log("jquery_init")
  }else{
    console.log("jquery didnt_init")
  }
}

let extensiones = ["pdf","jpg","jpeg","gif","png"];

// funcion importante para llenar un select

function llenarSelect(idSelect, tableName, tableId, tableDesc){

  return new Promise((resolve,reject)=>{
    var urltoSend = url + "/functions/index/common/llenarSelect/";

     var objectToSend ={"tableName" : tableName,
                        "tableId" : tableId,
                        "tableDesc" : tableDesc }

    var options="";

    $.post(urltoSend,objectToSend).done(function(response) {

           for (const id in response) {
             options += `<option value='${id}'>${capitalize(response[id])}</option>`;
           }

           if ($(idSelect).length>0) {
             $(idSelect).find("option").not(":first").remove();
             $(idSelect).append(options);
             resolve(true);
           }else{
             console.log("El id: " + idSelect + " NO existe");
             reject(false);
           }
      });
  });

}



function limpiarSelect(idSelect){
  if ($(idSelect).length>0) {
    $(idSelect).find("option").not(":first").remove();
  }else{
    console.log("El id: " + idSelect + " NO existe");
  }
}

function limpiarText(idText){
  $(idText).val("");
}

function municipio(deptoSelect,munSelect){
    $(deptoSelect).change(()=>{
        var id = $(deptoSelect).val();
        var urltoSend = url + "/functions/index/common/municipios/";

         $.post(urltoSend,{ id: id }).done(function(response) {

              //console.log(response);
               var responseSelect = "";

               response.forEach(function(item){
                    responseSelect += "<option value="+ item.id_municipio + ">"+ capitalize(item.desc_municipio) + "</option>";
                });

              $(munSelect +" option:first").val("");
              $(munSelect +" option:first").html("Selecciona un municipio");

               $(munSelect +" option").not(':first').remove();
               $(munSelect).append(responseSelect);
         });
    });
}

function fillInput(inputTobeFilled,
                   tableName,
                   tableIdInputChanged,
                   tableId,
                   tableDesc,
                   idInputChanged){


      return new Promise((resolve,reject)=>{
                let urltoSend = url + "/functions/index/common/fillInput/";
                let options = "";
                let objectToSend ={"tableName" : tableName,
                                   "tableIdInputChanged":tableIdInputChanged,
                                   "idInputChanged":idInputChanged}

               $.post(urltoSend,objectToSend).done(response => {

                  for (element of response) {
                    options += `<option value='${element[tableId]}'>${capitalize(element[tableDesc])}</option>`;
                  }
                    if ($(inputTobeFilled).length>0) {
                      $(inputTobeFilled).find("option").not(":first").remove();
                      $(inputTobeFilled).append(options);
                      resolve(true);
                    }else{
                      console.log("El id: " + inputTobeFilled + " NO existe");
                      reject(false);
                    }
               });
      });



}

//son dos funciones parecidas, pero tienen propositos diferentes

function fillInputonChange(inputChanged,
                           inputTobeFilled,
                           tableName,
                           tableIdInputChanged,
                           tableId,
                           tableDesc){

      $(inputChanged).change(()=>{
             let idInputChanged = $(inputChanged).val();

             fillInput(inputTobeFilled,
                       tableName,
                       tableIdInputChanged,
                       tableId,
                       tableDesc,
                       idInputChanged).then();
      });
}

function capitalize(str){
  str = str.toLowerCase();
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function cargarMunicipios(id_select, id_departamento){
  var urltoSend = url + "/functions/user/perfil/cargarMunicipios/";
  $.post(urltoSend,{ id: id_departamento }).done(function(response) {

        var responseSelect = "";
        response.forEach(function(item){
             responseSelect += "<option value="+ item.id_municipio + ">"+ item.desc_municipio + "</option>";
         });

        $(id_select).append(responseSelect);
  });
}

function consoleLog(str){
  console.log(str)
}

function objectSize(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};


function prueba(){
  console.log("Hola mundo");
}

function iniciar(){
  $(".preloader").fadeOut();
}


//funcion agregada 14-08-2019

jQuery.fn.hidden2 = function(){

    if (!$(this).hasClass("hidden2")) {
        $(this).addClass("hidden2");
    }
    return this; // This is needed so other functions can keep chaining off of this

};

jQuery.fn.hidden = function(){

    if (!$(this).hasClass("hidden")) {
        $(this).addClass("hidden");
    }
    return this; // This is needed so other functions can keep chaining off of this

};

//funcion agregada 30-09-2019
jQuery.fn.addClassIf = function(checkClass){

  if (!$(this).hasClass(checkClass)) {
      $(this).addClass(checkClass);
  }
  return this;

}


function getValues(formData){
  for (let value of formData.values()) {
      console.log(value);
  }
}

function getKeys(formData){
  for (let key of formData.keys()) {
      console.log(key);
  }
}

//funcion agregada 21-08-2019
function promesasEnSecuencia(promesas){

      let tasks = promesas;

      return new Promise((resolve,reject)=>{

        tasks.reduce((promiseChain, currentTask) => {

                return promiseChain.then(chainResults =>
                currentTask.then(currentResult => [ ...chainResults, currentResult ]));},
                Promise.resolve([])).then(arrayOfResults => {
                    resolve(arrayOfResults);
                });
      });

}

//funcion agregada 5/09/2019
function verificarEmail(value){

      let mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      let valor = $(value).val();

      if (valor.match(mailFormat)) {
         return true;
      }else{
         return false;
      }

}

//funcion agregada 5/09/2019
function verificarForm(checkForm,exceptions = []){
  let form,parts,eachString = {},formString = {},index,desc;

  form = $(checkForm);
  parts = form.find("input,select,textarea").not(".hidden2").not(".hidden");

  parts.each(function(){

      if (!$(this).val()) { //si no tiene valor

        //primero verifico que el selector no este dentro de las excepciones
        if (exceptions.includes(`#${$(this).attr("id")}`)) {

          index = $(this).attr("name");
          eachString[index] = "";

        }else{
          //consoleLog(this);
          eachString = {};
          return false;
        }

      }else{ //si sí tiene valor
        index = $(this).attr("name");
        desc = $(this).val();

            let verifEmail = ($(this).attr("type") == "email")?verificarEmail(this):true;

            if (!verifEmail) {
                eachString = {};
                return false;
            }

            //ahora tengo que verificar si es tipo checkbox
            if ($(this).attr("type")=="checkbox") {

               if ($(this).prop("checked")) { // significa que es el seleccionado

                  //ahora verifico que exista el index
                  if (eachString[index]) {
                    eachString[index].push(desc);
                  }else{
                    eachString[index] = [];
                    eachString[index].push(desc);
                  }
                   return;
               }else{
                   return;
               }

            }

            //ahora tengo que verificar si es tipo radioButton

            if ($(this).attr("type")=="radio") {

               if ($(this).prop("checked")) { // significa que es el seleccionado
                   eachString[index] = desc;
                   return;
               }else{
                   return;
               }
            }

            eachString[index] = desc;
      }
  });

  if ($.isEmptyObject(eachString)) {
    return false;
  }else{
    return eachString;
  }

}

//funcion modificada 12/11/2019
function traerInfo(tabla,id=false,column=false){

    return new Promise((resolve,reject)=>{
      let urlToSend = url + "/functions/index/common/traerInfo/";
      let options = {"tabla":tabla};

        if (id) {
          options["id"] = id;
        }

        if (column) {
          options['column'] = column;
        }

      $.post(urlToSend,options)
      .done((response)=>{
          resolve(response);
      });
    });

}


//funcion agregada 17/09/2019
function convertirCodigoEmpresa(value){
  value = parseFloat(value);

  if (value<10) {
    return `0${value}`;
  }else{
    return `${value}`;
  }
}

function session(){
  let urlToSend = url + "/functions/index/common/session/";

  $.post(urlToSend)
  .done((response)=>{
      consoleLog(response)
  });
}

//funcion agregada 9-10-2019
function encontrarEnArray(value,array,param){

  if (array.length <= 0) {
    return false;
  }

  for (let element of array) {
    if (element[param] == value) {
      return element
      break
    }
  }
  return false
}

function encontrarArrayEnArray(value,array,param){
  if (array.length <= 0) {
    return false;
  }

  let auxArray = []

  for (let element of array) {
    if (element[param] == value) {
      auxArray.push(element)
    }
  }

  if (auxArray.length <= 0) {
      return false
  }else{
      return auxArray
  }

}
