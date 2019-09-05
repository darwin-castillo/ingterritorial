function applyFilters(arrayParam) {

    console.log("apply filters")
/*
  Tenders = $.grep(Tenders, function (v) {
    return (v.estado_del_proceso !== 'Liquidado'
      && v.estado_del_proceso !== 'Adjudicado'
      && v.estado_del_proceso !== 'Celebrado'
      && v.estado_del_proceso !== 'Descartado'
      && v.estado_del_proceso !== 'Terminado sin Liquidar')

  });

  //console.log("Filter 1: ", Tenders);

  Tenders = $.grep(Tenders, function (v) {


    var filterobj = v.objeto_a_contratar !== 'Servicios de Salud'
      && v.objeto_a_contratar !== 'Equipos y Suministros de Defensa, Orden Publico, Proteccion, Vigilancia y Seguridad'
      && v.objeto_a_contratar !== 'Servicios de Transporte, Almacenaje y Correo'
      && v.objeto_a_contratar !== 'Servicios de Viajes, Alimentación, Alojamiento y Entretenimiento';


    return filterobj;

  });


  console.log("Filter 2: ", Tenders);
  */
  if (findGetParameter('dinit') !== null) {
    console.log("implementando filtro fecha inicial...");
    arrayParam = $.grep(arrayParam, function (v) {
      return getEpoch(v.fecha_de_cargue_en_el_secop) >= findGetParameter('dinit');

    });

  }

  if (findGetParameter('dend') !== null) {
    console.log("implementando filtro fecha ifin...");
    arrayParam = $.grep(arrayParam, function (v) {
      return getEpoch(v.fecha_de_cargue_en_el_secop) <= findGetParameter('dend');

    });

  }

  if (findGetParameter('status') !== null) {
    console.log("implementando filtro fecha status...");
    var stat = [
    "No Definido",
      "Borrador",
      "Convocado",
      "Adjudicado",
      "Celebrado",
      "Borrador Descartado",
      "Invitación Abierta",
      "Terminado",
      "Terminado Anormalmente después de convocado",
      "Invitación Cerrada",
      "Terminado sin liquidar",
      "Descartado",
      "Publicación para Manifestaciones de Interés",
       "Proceso Banca Multilateral Cerrado",
       "Proceso Banca Multilateral Abierto",
       "Lista Multiusos",
       "Lista Corta",
       "Finalizado el plazo para manifestaciones de interés",
        "Expresión de Interés"
        ];

    var statusm = [];
    var spl = findGetParameter('status').split(",");

    $.each(stat, function (index, value) {
      if (spl.includes(index.toString()))
        statusm.push(value);
    });
    arrayParam = $.grep(arrayParam, function (v) {
      return statusm.includes(v.estado_del_proceso);

    });

  }


 if (findGetParameter('pt') !== null) {
    console.log("implementando filtro price to...");
    arrayParam = $.grep(arrayParam, function (v) {
      return v.cuantia_proceso <= parseInt(findGetParameter('pt'));

    });

}
    if (findGetParameter('pf') !== null) {
    console.log("implementando filtro price from...");
    arrayParam = $.grep(arrayParam, function (v) {
      return v.cuantia_proceso >= parseInt(findGetParameter('pf'));

    });

}
     if (findGetParameter('dep') !== null) {
    console.log("implementando filtro departamento...");
    arrayParam = $.grep(arrayParam, function (v) {
      return v.dpto_y_muni_contratista === vct_dpto_y_muni_contratista[parseInt(findGetParameter('dep'))];

    });

  }


if (findGetParameter('obj') !== null) {
    console.log("implementando filtro objeto...");
    arrayParam = $.grep(arrayParam, function (v) {
      return v.objeto_a_contratar===vct_objecto_a_contratar[parseInt(findGetParameter('obj'))];
    });

  }

    if (findGetParameter('ent') !== null) {
        console.log("implementando filtro entidad...");
        arrayParam = $.grep(arrayParam, function (v) {

            return v.nombre_de_la_entidad===vct_entidad[parseInt(findGetParameter('ent'))];
        })
  }


    if (findGetParameter('tp') !== null) {
    console.log("implementando filtro tipo proceso...");
    arrayParam = $.grep(arrayParam, function (v) {
    // console.log(v.tipo_de_proceso," = ",vct_objecto_a_contratar[parseInt(findGetParameter('obj'))]);
     
      return v.tipo_de_proceso===vct_tipo_proceso[parseInt(findGetParameter('tp'))];
    });

  }

  return arrayParam;
}