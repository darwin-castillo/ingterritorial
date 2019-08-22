var ArrayTender;
const UPDATE_TIME_KEY = "UPDATE_TIME_KEY";
const ARRAY_KEY = "array_key";
var Tenders = [];
var fetchProgress = document.getElementById("fetchProgress");
var divFetchProgress = document.getElementById("divFetchProgress");
var vct_tipo_proceso = [];
var vct_dpto_y_muni_contratista = [];
var vct_objecto_a_contratar = [];
var vct_entidad = [];
var vct_estado = [];
var flagSetArray = false;

function multiplePromise() {

  var baseUrl = "https://www.datos.gov.co/resource/c6dm-udt9.json?"
    + '&$$app_token=D63kPsTjiMT7DCho4wbwp615A'
    + '&$limit=1000';
    var annio = findGetParameter('a');
    annio = !isEmpty(annio)?annio:"2018";
  var values = [
    baseUrl + "&$offset=999&anno_cargue_secop="+annio,
    baseUrl + "&$offset=1999&anno_cargue_secop="+annio,
    baseUrl + "&$offset=2999&anno_cargue_secop="+annio,
    baseUrl + "&$offset=3999&anno_cargue_secop="+annio,
    baseUrl + "&$offset=4999&anno_cargue_secop="+annio,
    baseUrl + "&$offset=5999&anno_cargue_secop="+annio,
    baseUrl + "&$offset=6999&anno_cargue_secop="+annio,
    baseUrl + "&$offset=7999&anno_cargue_secop="+annio
  ];
  var promises = [];

  for (var i = values.length - 1; i >= 0; i--) {
    promises.push(fetch(values[i]));
  }


  Promise
    .all(promises)
    .then(function (response) {
      // CHANGED HERE
      var blobPromises = [];
      for (var i = 0; i < response.length; i++) {
        blobPromises.push(response[i].json());
        console.log(response[i]);
      }
      var fetchProgress = document.getElementById("fetchProgress");
      fetchProgress.style.width = '5%';
      return Promise.all(blobPromises);
    })
    .then(function (responseJson) {
      //console.log("respuestas ="+responseJson.length);
      for (var i = 0; i < responseJson.length; i++) {
        
        var percentProgress = ((i * 100) / responseJson.length) + 20;
        var fetchProgress = document.getElementById("fetchProgress");
        console.log("progress="+percentProgress);
        percentProgress = percentProgress >= 100 ? 100 : percentProgress;
        fetchProgress.style.width = percentProgress + '%';
        AddRows(responseJson[i]);
        // lcl_images[i].value = URL.createObjectURL(blob[i]);
        // document.getElementById(lcl_images[i].id).src = objectURL;

      }

    })
    .catch(function (error) {
      console.log(error);
    });

}


window.onload = function () {
  // getToday();

 // insertParam('annio',document.getElementById("annio").value);

  var din = findGetParameter('dinit');
  var dend = findGetParameter('dend');
  var status = !isEmpty(findGetParameter("status"))?findGetParameter("status"):"";
   var pfrom= findGetParameter('pf');
   var pto= findGetParameter('pt');
   var obj = findGetParameter('obj');
   var dep = findGetParameter('dep');
   var annio = findGetParameter('a');
   var entidad = findGetParameter('ent');

  document.getElementById("dateinit").value = din !== null ? epochToDate(din) : "";
  document.getElementById("date_end").value = dend !== null ? epochToDate(dend) : "";
  document.getElementById("price_from").value = pfrom !==null ? pfrom :"";
  document.getElementById("price_to").value = pto !==null ? pto :"";
  document.getElementById("depart").value = dep !==null ? dep:"";
    document.getElementById("entity").value = entidad !==null ? entidad:"";

  //document.getElementById("annio").value = annio !==null ? annio:"";

  document.getElementById("object_contract").value = obj !==null ? obj:"";


  // document.getElementById("status_multiple").value = status!==null?status:"";
if(findGetParameter('ent')!==null){
   // alert('epa: '+findGetParameter('ent'));
}

  
 if(findGetParameter('filter')===null && findGetParameter("status")===null && findGetParameter("a")==null){
   // insertParam("status","0,1");
    //insertParam("a","2018,2017");
    document.location.href="?"+"status=1,2&a=2018,2017";
    //console.log("entra aqui");
    }
 

console.log("status ",status);
    if (status !== null) {

    var sts = status.split(",");
    sts.forEach(function (valToSelect) {
      $('select#status_multiple').find('option[value="' + valToSelect + '"]').prop('selected', true);
    });
  }
  else{

    for(var i=0; i<19;i++){
      console.log("select "+i.toString());
      $('select#status_multiple').find('option[value="' +i.toString()+ '"]').prop('selected',false);
    }
  }
console.log("----annio ",annio);
 if (annio !== null) {

    var sts = annio.split(",");
    sts.forEach(function (valToSelect) {
      console.log("annio func: "+valToSelect);
      $('select#annio').find('option[value="' + valToSelect + '"]').prop('selected', true);
    });
  }
  else{

    for(var i = 18; i >= 11; i--){
      console.log("select "+i.toString());
      $('select#annio').find('option[value="20' +i.toString()+ '"]').prop('selected',false);
    }
  }




var entidada = findGetParameter('ent');
 if(entidada!==null)
 entidada = entidada.replace(' ','%20');
  var url1 = 'https://www.datos.gov.co/resource/c6dm-udt9.json?'
    + 'anno_cargue_secop='+annio.split(",")[0]
    //+'&id_tipo_de_proceso=1'
    + '&$$app_token=D63kPsTjiMT7DCho4wbwp615A'
    + '&$limit=10000'
    + '&$offset=0'
  + ((entidada!==null&&entidada!=='')?'&$where=nombre_de_la_entidad%20like%20%27%25'+entidada+'%25%27':'');
  var url2 = 'http://localhost/SampleWS/';


  console.log("" + url1);
  console.log("Fecha: " + getToday());
//var url2 = 'https://www.datos.gov.co/resource/c6dm-udt9.json';
  localStorage.clear();

  if (localStorage.getItem(UPDATE_TIME_KEY) !== getToday()) {
    fetchingData(url1);
    console.log("consultando red")
  }
  else {
    ArrayData = localStorage.getItem(ARRAY_KEY);
    var str = [];
    str.push(ArrayData);
    console.log(str)
    console.log(JSON.parse(ArrayData));
    console.log("consultando localStorage");
  }


  var d = new Date();
}


function fetchingData(url1) {
  var resp = responseJson();


  // setTimeout(function(){ setArrayData(resp);}, 3000);
 // setArrayData(resp);
/*
  fetch(url1, {
    // mode:'no-cors',
    headers: {
      'Content-Type': 'application/JSON',
      'Accept': 'application/JSON'
    }
  })
    .then(function (response) {
      console.log(response);
      return response.json();
    })
    .then(function (responseJson) {

      if (responseJson !== null) {
        console.log("por aqui paso");
        setArrayData(responseJson);

      }

    });



*/




var request = new XMLHttpRequest();
request.onload = requestListener;
request.onerror = requestError;
request.open('get', url1, true);
request.send();

}

function requestListener() {
  var data = JSON.parse(this.responseText);
 if(!flagSetArray)
   setArrayData(data);
  else
    AddRows(data);

}

function requestError(error) {
  console.log('We have an issue', error);
}

function setArrayData(responseJson) {


  var jtable = document.getElementById("Jtabla");
  jtable.style.display = "block";
  var x = document.getElementById("loadtable");
  x.style.display = "none";

  Tenders = responseJson;
  console.log("Imprimiendo Tenders: ");
  console.log(Tenders);

  var table = document.getElementById("Jtabla");

  var dataSet = [];
  var data_obj = {};
  var i = 0;


  /*
  *****************     Apply Filters    *********************
   
  */


  var depart = document.getElementById("depart");
  var object_contract = document.getElementById("object_contract");
   var type_process = document.getElementById("type_process");
    var entity = document.getElementById("entity");

//  +++++++++++++++++++++++++++ objeto a contratar
  $.each(Tenders, function (key, val) {
    console.log("objetoooooo:  ",val.objeto_a_contratar);
    if (!vct_objecto_a_contratar.includes(val.objeto_a_contratar)) {
      vct_objecto_a_contratar.push(val.objeto_a_contratar);
      var option = document.createElement('option');
      var valueOpt = (vct_objecto_a_contratar.length - 1);
      option.setAttribute("value", valueOpt.toString());
      var t = document.createTextNode(val.objeto_a_contratar);
      option.appendChild(t);
      object_contract.appendChild(option);

    }

//  +++++++++++++++++++++++++++ departamento

    if (!vct_dpto_y_muni_contratista.includes(val.dpto_y_muni_contratista)) {
      vct_dpto_y_muni_contratista.push(val.dpto_y_muni_contratista);
      var option = document.createElement("option");
      var valueOpt = (vct_dpto_y_muni_contratista.length - 1);
      option.setAttribute("value", valueOpt.toString());
      var t = document.createTextNode(val.dpto_y_muni_contratista);
      option.appendChild(t);
      depart.appendChild(option);
    }

      //  +++++++++++++++++++++++++++ entidad
/*
      if (!vct_entidad.includes(val.nombre_de_la_entidad)) {
          vct_entidad.push(val.nombre_de_la_entidad);
          var option = document.createElement("option");
          var valueOpt = (vct_entidad.length - 1);
          option.setAttribute("value", val.nombre_de_la_entidad);
          var t = document.createTextNode(val.nombre_de_la_entidad);
          option.appendChild(t);
          entity.appendChild(option);
      }
*/

    //  +++++++++++++++++++++++++++ tipo proceso

    if (!vct_tipo_proceso.includes(val.tipo_de_proceso)) {
      vct_tipo_proceso.push(val.tipo_de_proceso);
      var option = document.createElement("option");
      var valueOpt = (vct_tipo_proceso.length - 1);
      option.setAttribute("value", valueOpt.toString());
      var t = document.createTextNode(val.tipo_de_proceso);
      option.appendChild(t);
      type_process.appendChild(option);
    }
    

    /*
        if(!vct_stado.includes(val.dpto_y_muni_contratista)){
          vct_dpto_y_muni_contratista.push(val.dpto_y_muni_contratista);;
          var option = document.createElement("option");
         option.text = val.dpto_y_muni_contratista;
         depart.add(option);
       }
    */
  });


  var str = 'Servicios de Viajes, Alimentaci/ó/n, Alojamiento y Entretenimiento'
  console.log(str);


  /** +++++++++++++++          TENDER = ?       ++++++++++++++**/

  Tenders = applyFilters(Tenders);

//******************.       End filters.  ***********************************************************//

  $.each(Tenders, function (key, val) {
    i++;
    dataSet.push([val.uid,
      val.objeto_a_contratar,
      val.detalle_del_objeto_a_contratar,
      addCommas(val.cuantia_proceso) + " $",
      val.fecha_de_cargue_en_el_secop != null ? formatDate(val.fecha_de_cargue_en_el_secop, 0) : "",
      val.estado_del_proceso,
       '<a href="'+val.ruta_proceso_en_secop_i+'">'+val.ruta_proceso_en_secop_i+'</a>'
    ]);

  });
  data_obj = dataSet;

  /**
   datatable
   **/
////dataSet=[];
//localStorage.setItem("dt",JSON.stringify(Tenders))
flagSetArray = true;
  setDatatable(dataSet, Tenders);
   multipleFetchApi();

     $('#object_contract').val(findGetParameter('obj'));

//addRowDatatable();
//multiplePromise();
}

function multipleFetchApi(){
 var baseUrl = "https://www.datos.gov.co/resource/c6dm-udt9.json?"
    + '&$$app_token=D63kPsTjiMT7DCho4wbwp615A'
    + '&$limit=1000';
    var annio = findGetParameter('a');
    annio = !isEmpty(annio)?annio:"2018,2017";
  
  var vct_annio_fetch=annio.split(",");
  var values = [];
  for (var i = 0; i < vct_annio_fetch.length; i++) {
      var entidada = findGetParameter('ent');
      if(entidada!==null)
          entidada = entidada.replace(' ','%20');

    values.push(baseUrl +"&$offset=0&anno_cargue_secop="+vct_annio_fetch[i]
    +  ((entidada!==null&&entidada!=='')?'&$where=nombre_de_la_entidad%20like%20%27%25'+entidada+'%25%27':''));

      for(var j=0; j<=9; j++){
        var endpoint=baseUrl +"&$offset="+((j>0)?j.toString():"")+"999&anno_cargue_secop="+vct_annio_fetch[i]
         +  ((entidada!==null&&entidada!=='')?'&$where=nombre_de_la_entidad%20like%20%27%25'+entidada+'%25%27':'');
        values.push(endpoint);
        console.log("ENDOPOINT ",endpoint);
      }
  }


for(var i =0; i<values.length; i++){
  var request = new XMLHttpRequest();
request.onload = requestListener;
request.onerror = requestError;
request.open('get', values[i], true);
request.send();
}

}


function AddRows(auxTenders) {

  auxTenders = applyFilters(auxTenders);
   var dtset = [];
     var depart = document.getElementById("depart");
  var object_contract = document.getElementById("object_contract");
   var type_process = document.getElementById("type_process");

  for(var i=0; i<auxTenders.length; i++) {
    
   // addRowDatatable(auxTenders[i]);
var val = auxTenders[i];
   addRowDatatable(val);
   Tenders.push(auxTenders[i]);


    if (!vct_objecto_a_contratar.includes(val.objeto_a_contratar)) {
      vct_objecto_a_contratar.push(val.objeto_a_contratar);
      var option = document.createElement('option');
      var valueOpt = (vct_objecto_a_contratar.length - 1);
      option.setAttribute("value", valueOpt.toString());
      var t = document.createTextNode(val.objeto_a_contratar);
      option.appendChild(t);
      object_contract.appendChild(option);

    }

//  +++++++++++++++++++++++++++ departamento

    if (!vct_dpto_y_muni_contratista.includes(val.dpto_y_muni_contratista)) {
      vct_dpto_y_muni_contratista.push(val.dpto_y_muni_contratista);
      var option = document.createElement("option");
      var valueOpt = (vct_dpto_y_muni_contratista.length - 1);
      option.setAttribute("value", valueOpt.toString());
      var t = document.createTextNode(val.dpto_y_muni_contratista);
      option.appendChild(t);
      depart.appendChild(option);
    }


    //  +++++++++++++++++++++++++++ tipo proceso

    if (!vct_tipo_proceso.includes(val.tipo_de_proceso)) {
      vct_tipo_proceso.push(val.tipo_de_proceso);
      var option = document.createElement("option");
      var valueOpt = (vct_tipo_proceso.length - 1);
      option.setAttribute("value", valueOpt.toString());
      var t = document.createTextNode(val.tipo_de_proceso);
      option.appendChild(t);
      type_process.appendChild(option);
    }

  }


  


}


