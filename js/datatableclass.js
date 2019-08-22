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

function setDatatable(dataSet,Tenders){
$(document).ready(function () {
        var table = $('#Jtabla').DataTable(
          {
            "paging": true,
            "ordering": true,
            "info": true,
            "pagingType": "full_numbers",
            "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
            "order": [[ 4, "desc" ]],
            "dom": '<"search-datatable" f><t><ilp>',
            data: dataSet,
            columns: [
              {title: "Oicd"},
              {title: "Objeto a Contratar"},
              {title: "Descripci&oacuten"},
              {title: "Cuant&iacutea"},
              {title: "Fecha"},
              {title: "Estado"},
              {title: "Link"}


            ], 

            dom: 'Bfrtip',
        buttons: [
            'copy', 'csv', 'excel',{
            extend : "pdf",
            text: 'PDF',
            orientation : 'landscape',
        }, 'print' 
            
        ],

          
 "columnDefs": [
                { "type": "date-uk", targets: 4 },
                { targets: 6, visible: false} 
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

       
            var filter_tender = $.grep(Tenders, function (v) {
              return v.uid === data[0];
            });
            var tender = filter_tender[0];
                
           $('#title-modal').text("Proceso #"+tender.numero_de_proceso);
           $('#mEntity').text(tender.nombre_de_la_entidad);
           $('#mDetail').text(tender.detalle_del_objeto_a_contratar);
           $('#mObjectContract').text(tender.objeto_a_contratar);
           $('#mAmountContract').text("$"+addCommas(tender.cuantia_contrato)+(tender.moneda!=="No Definida"?" Moneda: "+tender.moneda:""));
           $('#mAmountTrade').text("$"+addCommas(tender.cuantia_proceso)+(tender.moneda!=="No Definida"?" Moneda: "+tender.moneda:""));
           $('#mState').text(tender.dpto_y_muni_contratista);
         //  $('#linkMore').href(tender.ruta_proceso_en_secop_i);
          $('#linkMore').attr("href", tender.ruta_proceso_en_secop_i.url);
          $('#processType').text(tender.tipo_de_proceso);
           
console.log("tenderrrrrrrrrrrr: ",tender.ruta_proceso_en_secop_i.url);

          }
        );


        $('#infoModal').on('click', 'span', function () {
          // close modal
          modal.style.display = "none";

        });

$('#modalHelp').on('click', 'span', function () {
          // close modal
          console.log("close modal help");
          modalHelp.style.display = "none";

        });

      });


jQuery.extend( jQuery.fn.dataTableExt.oSort, {
  "date-uk-pre": function ( a ) {
    if (a == null || a == "") {
      return 0;
    }
    var ukDatea = a.split('/');
    return (ukDatea[2] + ukDatea[1] + ukDatea[0]) * 1;
  },

  "date-uk-asc": function ( a, b ) {
    return ((a < b) ? -1 : ((a > b) ? 1 : 0));
  },

  "date-uk-desc": function ( a, b ) {
    return ((a < b) ? 1 : ((a > b) ? -1 : 0));
  }
} );


}

function addRowDatatable(val){

$(document).ready(function () {
  var t = $('#Jtabla').DataTable();

t.row.add( [
          val.uid,
          val.objeto_a_contratar,
          val.detalle_del_objeto_a_contratar,
          addCommas(val.cuantia_proceso) + " $",
          val.fecha_de_cargue_en_el_secop != null ? formatDate(val.fecha_de_cargue_en_el_secop,0) : "",
          val.estado_del_proceso,
          '<a href="'+val.ruta_proceso_en_secop_i+'">'+val.ruta_proceso_en_secop_i+'</a>'
         

        ] ).draw( false );
 
    });

/*

{"anno_cargue_secop":"2018",
"c_digo_de_la_entidad":"20549516",
"calificacion_definitiva":"No definido",
"causal_de_otras_formas_de_contratacion_directa":
"Ninguna","codigo_bpin":"-1",
"compromiso_presupuestal":"No registra",
"cuantia_contrato":"0",
"cuantia_proceso":"26000000",
"detalle_del_objeto_a_contratar":"SUMINISTRO DE ELEMENTOS DE ASEO  PARA  LA EMPRESA SOCIAL DEL ESTADO HOSPITAL  LA MISERICORDIA DE NECHÍ DE CONFORMIDAD CON LA PROPUESTA ANEXA",
"dpto_y_muni_contratista":"No Definido",
"espostconflicto":"No Definido",
"estado_del_proceso":"Convocado",
"fecha_de_cargue_en_el_secop":"2018-08-25T00:00:00.000",
"id_ajudicacion":"0",
"id_clase":"471317",
"id_familia":"4713",
"id_grupo":"E",
"id_objeto_a_contratar":"47000000",
"id_origen_de_los_recursos":"0",
"id_regimen_de_contratacion":"2",
"id_sub_unidad_ejecutora":"0",
"id_tipo_de_proceso":"4",
"identific_del_represen_legal":"No Definido",
"identificacion_del_contratista":"No Definido",
"moneda":"No Definida","municipio_entrega":"Nechí",
"municipio_obtencion":"Nechí",
"municipios_ejecucion":"No definido",
"nit_de_la_entidad":"800138011-7",
"nivel_entidad":"TERRITORIAL",
"nom_raz_social_contratista":"No Definido",
"nombre_clase":"Suministros para aseos",
"nombre_de_la_entidad":"ANTIOQUIA - E.S.E. HOSPITAL LA MISERICORDIA - NECHÍ",
"nombre_del_represen_legal":"No Definido",
"nombre_familia":"Suministros de aseo y limpieza",
"nombre_grupo":"[E] Productos de Uso Final",
"nombre_sub_unidad_ejecutora":"No definida",
"numero_de_constancia":"18-4-8373498",
"numero_de_proceso":"CPS-052-2018",
"numero_del_contrato":"No definido",
"objeto_a_contratar":"Equipos y Suministros para Limpieza",
"objeto_del_contrato_a_la_firma":"No definido",
"orden_entidad":"TERRITORIAL DEPARTAMENTAL DESCENTRALIZADO",
"origen_de_los_recursos":"No definido",
"plazo_de_ejec_del_contrato":"0",
"proponentes_seleccionados":"No definido",
"rango_de_ejec_del_contrato":"N",
"regimen_de_contratacion":"Régimen Especial",
"ruta_proceso_en_secop_i":"https://www.contratos.gov.co/consultas/detalleProceso.do?numConstancia=18-4-8373498",
"tiempo_adiciones_en_dias":"0",
"tiempo_adiciones_en_meses":"0",
"tipo_de_contrato":"Suministro",
"tipo_de_proceso":"Régimen Especial",
"tipo_doc_representante_legal":"No Definido",
"tipo_identifi_del_contratista":"No Definido",
"uid":"18-4-8373498-0",
"valor_contrato_con_adiciones":"0",
"valor_total_de_adiciones":"0"}
*/

//Tenders.push({"anno_cargue_secop":"2018","c_digo_de_la_entidad":"20549516","calificacion_definitiva":"No definido","causal_de_otras_formas_de_contratacion_directa":"Ninguna","codigo_bpin":"-1","compromiso_presupuestal":"No registra","cuantia_contrato":"0","cuantia_proceso":"26000000","detalle_del_objeto_a_contratar":"SUMINISTRO DE ELEMENTOS DE ASEO  PARA  LA EMPRESA SOCIAL DEL ESTADO HOSPITAL  LA MISERICORDIA DE NECHÍ DE CONFORMIDAD CON LA PROPUESTA ANEXA","dpto_y_muni_contratista":"No Definido","espostconflicto":"No Definido","estado_del_proceso":"Convocado","fecha_de_cargue_en_el_secop":"2018-08-25T00:00:00.000","id_ajudicacion":"0","id_clase":"471317","id_familia":"4713","id_grupo":"E","id_objeto_a_contratar":"47000000","id_origen_de_los_recursos":"0","id_regimen_de_contratacion":"2","id_sub_unidad_ejecutora":"0","id_tipo_de_proceso":"4","identific_del_represen_legal":"No Definido","identificacion_del_contratista":"No Definido","moneda":"No Definida","municipio_entrega":"Nechí","municipio_obtencion":"Nechí","municipios_ejecucion":"No definido","nit_de_la_entidad":"800138011-7","nivel_entidad":"TERRITORIAL","nom_raz_social_contratista":"No Definido","nombre_clase":"Suministros para aseos","nombre_de_la_entidad":"ANTIOQUIA - E.S.E. HOSPITAL LA MISERICORDIA - NECHÍ","nombre_del_represen_legal":"No Definido","nombre_familia":"Suministros de aseo y limpieza","nombre_grupo":"[E] Productos de Uso Final","nombre_sub_unidad_ejecutora":"No definida","numero_de_constancia":"18-4-8373498","numero_de_proceso":"CPS-052-2018","numero_del_contrato":"No definido","objeto_a_contratar":"Equipos y Suministros para Limpieza","objeto_del_contrato_a_la_firma":"No definido","orden_entidad":"TERRITORIAL DEPARTAMENTAL DESCENTRALIZADO","origen_de_los_recursos":"No definido","plazo_de_ejec_del_contrato":"0","proponentes_seleccionados":"No definido","rango_de_ejec_del_contrato":"N","regimen_de_contratacion":"Régimen Especial","ruta_proceso_en_secop_i":"https://www.contratos.gov.co/consultas/detalleProceso.do?numConstancia=18-4-8373498","tiempo_adiciones_en_dias":"0","tiempo_adiciones_en_meses":"0","tipo_de_contrato":"Suministro","tipo_de_proceso":"Régimen Especial","tipo_doc_representante_legal":"No Definido","tipo_identifi_del_contratista":"No Definido","uid":"18-4-8373498-0","valor_contrato_con_adiciones":"0","valor_total_de_adiciones":"0"}
//);
}