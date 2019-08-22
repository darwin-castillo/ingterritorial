var ArrayTender;
const UPDATE_TIME_KEY = "UPDATE_TIME_KEY";
const ARRAY_KEY = "array_key";


function findGetParameter(parameterName) {
    var result = null,
        tmp = [];
    location.search
        .substr(1)
        .split("&")
        .forEach(function (item) {
            tmp = item.split("=");
            if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
        });
    return result;
}

function multiplePromise() {
    var values = ["https://www.datos.gov.co/resource/c6dm-udt9.json", "https://www.datos.gov.co/resource/c6dm-udt9.json"]
    var promises = [];
    for (var i = values.length - 1; i >= 0; i--) {
        promises.push(fetch(values[i]));
    }


    Promise
        .all(promises)
        .then(function (response) {
            // CHANGED HERE
            var blobPromises = [];
            for (var i = response.length - 1; i >= 0; i--) {
                blobPromises.push(response[i].json());
                console.log(response[i]);
            }
            return Promise.all(blobPromises);
        })
        .then(function (responseJson) {
            console.log("respuestas =" + responseJson.length);
            for (var i = responseJson.length - 1; i >= 0; i--) {
                console.log(responseJson[i]);
                // lcl_images[i].value = URL.createObjectURL(blob[i]);
                // document.getElementById(lcl_images[i].id).src = objectURL;

            }

        })
        .catch(function (error) {
            console.log(error);
        });

}

function loadParameters() {
    var params = "";
    var valid = true;
    var flag_dinit = false;
    var mulp = $('#status_multiple').val();
    console.log("valores: " + document.getElementById('status_multiple').value);
    alert("valores: " + mulp);
    // var status=document.getElementById('status').value;
    var dinit = document.getElementById('dateinit').value;
    var flag = false;
    console.log("dinit ->" + document.getElementById('dateinit').value);
    if (document.getElementById('dateinit').value !== null && document.getElementById('dateinit').value !== '') {
        params += "dinit=" + getEpoch(formatDate(document.getElementById('dateinit').value, 1));
        flag_dinit = true;
        flag = true;
    }
    if (document.getElementById('date_end').value !== null && document.getElementById('date_end').value !== '') {
        params += ((flag_dinit) ? "&" : "") + "dend=" + getEpoch(formatDate(document.getElementById('date_end').value, 1));
        flag = true;
    }
    if (mulp !== null && mulp !== '') {
        params += ((flag) ? "&" : "") + "status=" + mulp;
        flag = true;
    }

    document.location.href = "?" + params;

}

window.onload = function () {
    // getToday();
    var din = findGetParameter('dinit');
    var dend = findGetParameter('dend');
    var status = findGetParameter("status");


    document.getElementById("dateinit").value = din !== null ? epochToDate(din) : "";
    document.getElementById("date_end").value = dend !== null ? epochToDate(dend) : "";
    // document.getElementById("status_multiple").value = status!==null?status:"";
    if (status !== null) {
        var sts = status.split(",");
        sts.forEach(function (valToSelect) {
            $('select#status_multiple').find('option[value="' + valToSelect + '"]').prop('selected', true);
        });
    }

    var url1 = 'https://www.datos.gov.co/resource/c6dm-udt9.json?'
        + 'anno_cargue_secop=2018'
        //+'&id_tipo_de_proceso=1'
        + '&$$app_token=D63kPsTjiMT7DCho4wbwp615A'
        + '&$limit=100';
    console.log("Consultado..." + url1);
    console.log("Fecha: " + getToday());
    var url2 = 'https://www.datos.gov.co/resource/c6dm-udt9.json';
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


    let d = new Date();
}


function fetchingData(url1) {

    fetch(url1)
        .then(function (response) {
            console.log(response);
            return response.json();
        })
        .then(function (responseJson) {
            // var objectURL = URL.createObjectURL(miBlob);
            // alert("Today's date is " + d);

            if (responseJson !== null) {
                //var strfy = JSON.stringify(responseJson);
                //console.log(strfy);
                //  localStorage.setItem(ARRAY_KEY,strfy);
                //localStorage.setItem(UPDATE_TIME_KEY,getToday());
                setArrayData(responseJson);

            }

        });

}

/*
Me indico para los filtros :
Que coloque los 10 o 12 estados del proceso ,
Que si le dejes el filtro de regiones , para el filtro de montos que sean 2 cuadros 
de texto estilo mercado libre monto inicial monto final, para la fecha como te comenté 
maneje la fecha de publicación, el sistema solo me está funcionando en Firefox ni en 
IE Chrome ni safari solo Firefox lo que ya te había comentado de quitar eso que dice 
moneda no disponible que son detalles y ya me pasó el logo de la empresa


Esos fueron los únicos detalles que dijo el señor, ah! 
Que el cuadro de búsqueda se va todo a la derecha solo 
se puede ver la mitad, pero en general solo esos detalles 
solo queda eso para entregar, que el pruebe los maneje y listo

*/

function setArrayData(responseJson) {


    ArrayTender = responseJson.tenders;
    console.log(responseJson.tenders);


    var x = document.getElementById("loadtable");
    x.style.display = "none";

    var Tenders = responseJson;
    console.log("Imprimiendo Tenders: ");
    console.log(Tenders);

    var table = document.getElementById("Jtabla");

    var dataSet = [];
    var data_obj = {};
    console.log("imprimiendo tenders");
    var i = 0;


    /*
    *****************     Apply Filters    *********************

    Tenders = $.grep(Tenders, function (v) {
                  return (v.estado_del_proceso!=='Liquidado'
                      && v.estado_del_proceso!=='Adjudicado'
                      && v.estado_del_proceso!=='Celebrado'
                      && v.estado_del_proceso!=='Descartado'
                      && v.estado_del_proceso!=='Terminado sin Liquidar');
                });

                Servicios de Viajes, Alimentación, Alojamiento y Entretenimiento
                Servicios Políticos y de Asuntos Cívicos
    */
    var vct_tipo_proceso = [];
    var vct_dpto_y_muni_contratista = [];
    var vct_objecto_a_contratar = [];
    var depart = document.getElementById("depart");
//var objeto_contratar = document.getElementById("object_contract");
    $.each(Tenders, function (key, val) {
        //console.log("key: "+key);
        //console.log("val: ");
        //console.log(val);
        if (!vct_tipo_proceso.includes(val.tipo_de_proceso)) {
            vct_tipo_proceso.push(val.tipo_de_proceso);
            //  console.log(val.id_tipo_de_proceso+": "+val.tipo_de_proceso);
        }
        if (!vct_dpto_y_muni_contratista.includes(val.dpto_y_muni_contratista)) {
            vct_dpto_y_muni_contratista.push(val.dpto_y_muni_contratista);
            // console.log(val.dpto_y_muni_contratista);
            var option = document.createElement("option");
            // var index = document.createElement("value");
            option.text = val.dpto_y_muni_contratista;
            //index.text = val.dpto_y_muni_contratista;
            depart.add(option);
        }

        /*
           if(!vct_objecto_a_contratar.includes(val.objeto_a_contratar)){
              vct_objecto_a_contratar.push(val.objeto_a_contratar);
             //console.log(val.dpto_y_muni_contratista);
              var option = document.createElement("option");
             // var index = document.createElement("value");
             option.text = val.objeto_a_contratar;
             //index.text = val.dpto_y_muni_contratista;
             objeto_contratar.add(option);
           }
        */
    });

    var str = 'Servicios de Viajes, Alimentaci/ó/n, Alojamiento y Entretenimiento'
    console.log(str);


    Tenders = $.grep(Tenders, function (v) {
        return (v.estado_del_proceso !== 'Liquidado'
            && v.estado_del_proceso !== 'Adjudicado'
            && v.estado_del_proceso !== 'Celebrado'
            && v.estado_del_proceso !== 'Descartado'
            && v.estado_del_proceso !== 'Terminado sin Liquidar')

    });

    console.log("Filter 1: ", Tenders);

    Tenders = $.grep(Tenders, function (v) {

        //Servicios de Salud
        //Servicios de Gestion, Servicios Profesionales de Empresa y Servicios Administrativos
        //Servicios de Viajes, Alimentación, Alojamiento y Entretenimiento
        //  console.log(escape(v.objeto_a_contratar)+" Remove "+escape('Servicios de Viajes, Alimentación, Alojamiento y Entretenimiento'));

        var filterobj = v.objeto_a_contratar !== 'Servicios de Salud'
            && v.objeto_a_contratar !== 'Equipos y Suministros de Defensa, Orden Publico, Proteccion, Vigilancia y Seguridad'
            && v.objeto_a_contratar !== 'Servicios de Transporte, Almacenaje y Correo'
            && v.objeto_a_contratar !== 'Servicios de Viajes, Alimentación, Alojamiento y Entretenimiento';

        if (removeAccents(v.objeto_a_contratar) === 'Servicios de Viajes, Alimentación, Alojamiento y Entretenimiento') {
            console.log('Entré en filter: ', filterobj);

        }
        return filterobj;

    });


    console.log("Filter 2: ", Tenders);
    if (findGetParameter('dinit') !== null) {
        console.log("implementando filtro fecha inicial...");
        Tenders = $.grep(Tenders, function (v) {
            return getEpoch(v.fecha_de_cargue_en_el_secop) >= findGetParameter('dinit');

        });

    }

    if (findGetParameter('dend') !== null) {
        console.log("implementando filtro fecha ifin...");
        Tenders = $.grep(Tenders, function (v) {
            return getEpoch(v.fecha_de_cargue_en_el_secop) <= findGetParameter('dend');

        });

    }

    if (findGetParameter('status') !== null) {
        console.log("implementando filtro fecha status...");
        var stat = ["Borrador", "Convocado", "Concurso de merito abierto", "Terminado"];
        var statusm = [];
        var spl = findGetParameter('status').split(",");

        $.each(stat, function (index, value) {
            if (spl.includes(index.toString()))
                statusm.push(value);
        });
        Tenders = $.grep(Tenders, function (v) {
            return statusm.includes(v.estado_del_proceso);

        });

    }


//End filters


    $.each(Tenders, function (key, val) {
//console.log(i+" "+val.uid+" "+val.nom_raz_social_contratista+" "+val.detalle_del_objeto_a_contratar);

        i++;

        dataSet.push([val.uid,
            val.objeto_a_contratar,
            val.detalle_del_objeto_a_contratar,
            addCommas(val.cuantia_proceso) + " $",
            val.fecha_de_cargue_en_el_secop != null ? formatDate(val.fecha_de_cargue_en_el_secop, 0) : "",
            val.estado_del_proceso
        ]);


    });

    /*
    l - Length changing
    f - Filtering input
    t - The Table!
    i - Information
    p - Pagination
    r - pRocessing
    < and > - div elements
    <"#id" and > - div with an id
    <"class" and > - div with a class
    <"#id.class" and > - div with an id and class

    <fi><t><lp>
    */
    data_obj = dataSet;
    $(document).ready(function () {
        var table = $('#Jtabla').DataTable(
            {
                "paging": true,
                "ordering": true,
                "info": true,
                "pagingType": "full_numbers",
                "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
                "order": [[4, "desc"]],
                "dom": '<"search-datatable" f><t><ilp>',
                data: dataSet,
                columns: [
                    {title: "Oicd"},
                    {title: "Objeto a Contratar"},
                    {title: "Descripci&oacuten"},
                    {title: "Cuant&iacutea"},
                    {title: "Fecha"},
                    {title: "Estado"}


                ],

                "columnDefs": [
                    {"type": "date-uk", targets: 4}
                ],

                language: {
                    "decimal": "",
                    "emptyTable": "No hay información",
                    "info": "Mostrando _START_ a _END_ de _TOTAL_ Entradas",
                    "infoEmpty": "Mostrando 0 to 0 of 0 Entradas",
                    "infoFiltered": "(Filtrado de _MAX_ total entradas)",
                    "infoPostFix": "",
                    "thousands": ",",
                    "lengthMenu": "Mostrar _MENU_ Entradas",
                    "loadingRecords": "Cargando...",
                    "processing": "Procesando...",
                    "search": "Buscar:",
                    "zeroRecords": "Sin resultados encontrados",
                    "paginate": {
                        "first": "Primero",
                        "last": "Ultimo",
                        "next": "Siguiente",
                        "previous": "Anterior"
                    }
                },


            }
        );

        $('#Jtabla tbody').on('click', 'tr', function () {
                //    var data = table.row( $(this).parents('tr') ).data();
                var modal = document.getElementById('infoModal');
                // Get the <span> element that closes the modal
                var span = document.getElementsByClassName("close")[0];

                modal.style.display = "block";

                var data = table
                    .row(this)
                    .data();

//console.log(data);
                //  $("#title-modal").text(data[0][0]);
                var ArrayTender = $(this).attr('ArrayTender');
                var filter_tender = $.grep(Tenders, function (v) {
                    return v.uid === data[0];
                });
                var tender = filter_tender[0];

                $('#title-modal').text("Proceso #" + tender.numero_de_proceso);
                $('#mEntity').text(tender.nombre_de_la_entidad);
                $('#mDetail').text(tender.detalle_del_objeto_a_contratar);
                $('#mObjectContract').text(tender.objeto_a_contratar);
                $('#mAmountContract').text("$" + addCommas(tender.cuantia_contrato) + (tender.moneda !== "No Definida" ? " Moneda: " + tender.moneda : ""));
                $('#mAmountTrade').text("$" + addCommas(tender.cuantia_proceso) + (tender.moneda !== "No Definida" ? " Moneda: " + tender.moneda : ""));
                $('#mState').text(tender.dpto_y_muni_contratista);
                //  $('#linkMore').href(tender.ruta_proceso_en_secop_i);
                $('#linkMore').attr("href", tender.ruta_proceso_en_secop_i);
                $('#processType').text(tender.tipo_de_proceso);


            }
        );


        $('#infoModal').on('click', 'span', function () {
            // code here


            console.log('click en cerrar');
            modal.style.display = "none";

        });


    });
    jQuery.extend(jQuery.fn.dataTableExt.oSort, {
        "date-uk-pre": function (a) {
            if (a == null || a == "") {
                return 0;
            }
            var ukDatea = a.split('/');
            return (ukDatea[2] + ukDatea[1] + ukDatea[0]) * 1;
        },

        "date-uk-asc": function (a, b) {
            return ((a < b) ? -1 : ((a > b) ? 1 : 0));
        },

        "date-uk-desc": function (a, b) {
            return ((a < b) ? 1 : ((a > b) ? -1 : 0));
        }
    });

}

function openModal() {
    var modalInf = document.getElementById("infoModal");
    console.log("abrir modal");
    modalInf.style.display = "block";
}


function addCommas(nStr) {
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
}

function formatDate(dateFormat, formatt) {

    var today = new Date(dateFormat);
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yy = today.getFullYear().toString().substring(2, 4);
    var yyyy = today.getFullYear().toString();
    if (dd < 10) {
        dd = '0' + dd
    }

    if (mm < 10) {
        mm = '0' + mm
    }


    today = formatt === 0 ? (dd + '/' + mm + '/' + yy) : (mm + '/' + dd + '/' + yyyy);
    return today;
}

function getEpoch(dt) {
    var d = (new Date(dt).valueOf()) / 1000;
    return d;
}

function RemoveAccents(str) {
    var accents = 'ÀÁÂÃÄÅàáâãäåÒÓÔÕÕÖØòóôõöøÈÉÊËèéêëðÇçÐÌÍÎÏìíîïÙÚÛÜùúûüÑñŠšŸÿýŽž';
    var accentsOut = "AAAAAAaaaaaaOOOOOOOooooooEEEEeeeeeCcDIIIIiiiiUUUUuuuuNnSsYyyZz";
    str = str.split('');
    var strLen = str.length;
    var i, x;
    for (i = 0; i < strLen; i++) {
        if (accents.indexOf(str[i]) !== -1) {
            x = accents.indexOf(str[i]);
            str[i] = accentsOut[x];
        }
    }
    return str.join('');
}

/**
 Format date dd/mm/yyyy
 **/
function epochToDate(epochtime) {
    var epch = parseFloat(epochtime + "000");
    console.log(epch);
    var dt = new Date(epch);
    var dd = dt.getDate();


    var mm = dt.getMonth() + 1; //January is 0!
    var yyyy = dt.getFullYear();

    console.log("dia " + dd);
    console.log("mes " + mm);
    console.log("año " + yyyy);

    if (dd < 10) {
        dd = '0' + dd
    }

    if (mm < 10) {
        mm = '0' + mm
    }

    var today = dd + '/' + mm + '/' + yyyy;
    return today;

}

function getToday() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();

    if (dd < 10) {
        dd = '0' + dd
    }

    if (mm < 10) {
        mm = '0' + mm
    }

    today = dd + '/' + mm + '/' + yyyy;
//document.write(today);
    console.log(today);
    return today;
}


var characterMap = {
    "À": "A",
    "Á": "A",
    "Â": "A",
    "Ã": "A",
    "Ä": "A",
    "Å": "A",
    "Ấ": "A",
    "Ắ": "A",
    "Ẳ": "A",
    "Ẵ": "A",
    "Ặ": "A",
    "Æ": "AE",
    "Ầ": "A",
    "Ằ": "A",
    "Ȃ": "A",
    "Ç": "C",
    "Ḉ": "C",
    "È": "E",
    "É": "E",
    "Ê": "E",
    "Ë": "E",
    "Ế": "E",
    "Ḗ": "E",
    "Ề": "E",
    "Ḕ": "E",
    "Ḝ": "E",
    "Ȇ": "E",
    "Ì": "I",
    "Í": "I",
    "Î": "I",
    "Ï": "I",
    "Ḯ": "I",
    "Ȋ": "I",
    "Ð": "D",
    "Ñ": "N",
    "Ò": "O",
    "Ó": "O",
    "Ô": "O",
    "Õ": "O",
    "Ö": "O",
    "Ø": "O",
    "Ố": "O",
    "Ṍ": "O",
    "Ṓ": "O",
    "Ȏ": "O",
    "Ù": "U",
    "Ú": "U",
    "Û": "U",
    "Ü": "U",
    "Ý": "Y",
    "à": "a",
    "á": "a",
    "â": "a",
    "ã": "a",
    "ä": "a",
    "å": "a",
    "ấ": "a",
    "ắ": "a",
    "ẳ": "a",
    "ẵ": "a",
    "ặ": "a",
    "æ": "ae",
    "ầ": "a",
    "ằ": "a",
    "ȃ": "a",
    "ç": "c",
    "ḉ": "c",
    "è": "e",
    "é": "e",
    "ê": "e",
    "ë": "e",
    "ế": "e",
    "ḗ": "e",
    "ề": "e",
    "ḕ": "e",
    "ḝ": "e",
    "ȇ": "e",
    "ì": "i",
    "í": "i",
    "î": "i",
    "ï": "i",
    "ḯ": "i",
    "ȋ": "i",
    "ð": "d",
    "ñ": "n",
    "ò": "o",
    "ó": "o",
    "ô": "o",
    "õ": "o",
    "ö": "o",
    "ø": "o",
    "ố": "o",
    "ṍ": "o",
    "ṓ": "o",
    "ȏ": "o",
    "ù": "u",
    "ú": "u",
    "û": "u",
    "ü": "u",
    "ý": "y",
    "ÿ": "y",
    "Ā": "A",
    "ā": "a",
    "Ă": "A",
    "ă": "a",
    "Ą": "A",
    "ą": "a",
    "Ć": "C",
    "ć": "c",
    "Ĉ": "C",
    "ĉ": "c",
    "Ċ": "C",
    "ċ": "c",
    "Č": "C",
    "č": "c",
    "C̆": "C",
    "c̆": "c",
    "Ď": "D",
    "ď": "d",
    "Đ": "D",
    "đ": "d",
    "Ē": "E",
    "ē": "e",
    "Ĕ": "E",
    "ĕ": "e",
    "Ė": "E",
    "ė": "e",
    "Ę": "E",
    "ę": "e",
    "Ě": "E",
    "ě": "e",
    "Ĝ": "G",
    "Ǵ": "G",
    "ĝ": "g",
    "ǵ": "g",
    "Ğ": "G",
    "ğ": "g",
    "Ġ": "G",
    "ġ": "g",
    "Ģ": "G",
    "ģ": "g",
    "Ĥ": "H",
    "ĥ": "h",
    "Ħ": "H",
    "ħ": "h",
    "Ḫ": "H",
    "ḫ": "h",
    "Ĩ": "I",
    "ĩ": "i",
    "Ī": "I",
    "ī": "i",
    "Ĭ": "I",
    "ĭ": "i",
    "Į": "I",
    "į": "i",
    "İ": "I",
    "ı": "i",
    "Ĳ": "IJ",
    "ĳ": "ij",
    "Ĵ": "J",
    "ĵ": "j",
    "Ķ": "K",
    "ķ": "k",
    "Ḱ": "K",
    "ḱ": "k",
    "K̆": "K",
    "k̆": "k",
    "Ĺ": "L",
    "ĺ": "l",
    "Ļ": "L",
    "ļ": "l",
    "Ľ": "L",
    "ľ": "l",
    "Ŀ": "L",
    "ŀ": "l",
    "Ł": "l",
    "ł": "l",
    "Ḿ": "M",
    "ḿ": "m",
    "M̆": "M",
    "m̆": "m",
    "Ń": "N",
    "ń": "n",
    "Ņ": "N",
    "ņ": "n",
    "Ň": "N",
    "ň": "n",
    "ŉ": "n",
    "N̆": "N",
    "n̆": "n",
    "Ō": "O",
    "ō": "o",
    "Ŏ": "O",
    "ŏ": "o",
    "Ő": "O",
    "ő": "o",
    "Œ": "OE",
    "œ": "oe",
    "P̆": "P",
    "p̆": "p",
    "Ŕ": "R",
    "ŕ": "r",
    "Ŗ": "R",
    "ŗ": "r",
    "Ř": "R",
    "ř": "r",
    "R̆": "R",
    "r̆": "r",
    "Ȓ": "R",
    "ȓ": "r",
    "Ś": "S",
    "ś": "s",
    "Ŝ": "S",
    "ŝ": "s",
    "Ş": "S",
    "Ș": "S",
    "ș": "s",
    "ş": "s",
    "Š": "S",
    "š": "s",
    "Ţ": "T",
    "ţ": "t",
    "ț": "t",
    "Ț": "T",
    "Ť": "T",
    "ť": "t",
    "Ŧ": "T",
    "ŧ": "t",
    "T̆": "T",
    "t̆": "t",
    "Ũ": "U",
    "ũ": "u",
    "Ū": "U",
    "ū": "u",
    "Ŭ": "U",
    "ŭ": "u",
    "Ů": "U",
    "ů": "u",
    "Ű": "U",
    "ű": "u",
    "Ų": "U",
    "ų": "u",
    "Ȗ": "U",
    "ȗ": "u",
    "V̆": "V",
    "v̆": "v",
    "Ŵ": "W",
    "ŵ": "w",
    "Ẃ": "W",
    "ẃ": "w",
    "X̆": "X",
    "x̆": "x",
    "Ŷ": "Y",
    "ŷ": "y",
    "Ÿ": "Y",
    "Y̆": "Y",
    "y̆": "y",
    "Ź": "Z",
    "ź": "z",
    "Ż": "Z",
    "ż": "z",
    "Ž": "Z",
    "ž": "z",
    "ſ": "s",
    "ƒ": "f",
    "Ơ": "O",
    "ơ": "o",
    "Ư": "U",
    "ư": "u",
    "Ǎ": "A",
    "ǎ": "a",
    "Ǐ": "I",
    "ǐ": "i",
    "Ǒ": "O",
    "ǒ": "o",
    "Ǔ": "U",
    "ǔ": "u",
    "Ǖ": "U",
    "ǖ": "u",
    "Ǘ": "U",
    "ǘ": "u",
    "Ǚ": "U",
    "ǚ": "u",
    "Ǜ": "U",
    "ǜ": "u",
    "Ứ": "U",
    "ứ": "u",
    "Ṹ": "U",
    "ṹ": "u",
    "Ǻ": "A",
    "ǻ": "a",
    "Ǽ": "AE",
    "ǽ": "ae",
    "Ǿ": "O",
    "ǿ": "o",
    "Þ": "TH",
    "þ": "th",
    "Ṕ": "P",
    "ṕ": "p",
    "Ṥ": "S",
    "ṥ": "s",
    "X́": "X",
    "x́": "x",
    "Ѓ": "Г",
    "ѓ": "г",
    "Ќ": "К",
    "ќ": "к",
    "A̋": "A",
    "a̋": "a",
    "E̋": "E",
    "e̋": "e",
    "I̋": "I",
    "i̋": "i",
    "Ǹ": "N",
    "ǹ": "n",
    "Ồ": "O",
    "ồ": "o",
    "Ṑ": "O",
    "ṑ": "o",
    "Ừ": "U",
    "ừ": "u",
    "Ẁ": "W",
    "ẁ": "w",
    "Ỳ": "Y",
    "ỳ": "y",
    "Ȁ": "A",
    "ȁ": "a",
    "Ȅ": "E",
    "ȅ": "e",
    "Ȉ": "I",
    "ȉ": "i",
    "Ȍ": "O",
    "ȍ": "o",
    "Ȑ": "R",
    "ȑ": "r",
    "Ȕ": "U",
    "ȕ": "u",
    "B̌": "B",
    "b̌": "b",
    "Č̣": "C",
    "č̣": "c",
    "Ê̌": "E",
    "ê̌": "e",
    "F̌": "F",
    "f̌": "f",
    "Ǧ": "G",
    "ǧ": "g",
    "Ȟ": "H",
    "ȟ": "h",
    "J̌": "J",
    "ǰ": "j",
    "Ǩ": "K",
    "ǩ": "k",
    "M̌": "M",
    "m̌": "m",
    "P̌": "P",
    "p̌": "p",
    "Q̌": "Q",
    "q̌": "q",
    "Ř̩": "R",
    "ř̩": "r",
    "Ṧ": "S",
    "ṧ": "s",
    "V̌": "V",
    "v̌": "v",
    "W̌": "W",
    "w̌": "w",
    "X̌": "X",
    "x̌": "x",
    "Y̌": "Y",
    "y̌": "y",
    "A̧": "A",
    "a̧": "a",
    "B̧": "B",
    "b̧": "b",
    "Ḑ": "D",
    "ḑ": "d",
    "Ȩ": "E",
    "ȩ": "e",
    "Ɛ̧": "E",
    "ɛ̧": "e",
    "Ḩ": "H",
    "ḩ": "h",
    "I̧": "I",
    "i̧": "i",
    "Ɨ̧": "I",
    "ɨ̧": "i",
    "M̧": "M",
    "m̧": "m",
    "O̧": "O",
    "o̧": "o",
    "Q̧": "Q",
    "q̧": "q",
    "U̧": "U",
    "u̧": "u",
    "X̧": "X",
    "x̧": "x",
    "Z̧": "Z",
    "z̧": "z",
};

var chars = Object.keys(characterMap).join('|');
var allAccents = new RegExp(chars, 'g');
var firstAccent = new RegExp(chars, '');

var removeAccents = function (string) {
    return string.replace(allAccents, function (match) {
        return characterMap[match];
    });
};
