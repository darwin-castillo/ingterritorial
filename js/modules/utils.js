 function openModal(){
  var modalInf= document.getElementById("infoModal");
   console.log("abrir modal");
  modalInf.style.display = "block";
}
function loadParameters(){
    var params = "";
    var valid = true;
    var flag_dinit=false;
    var mulp_status = $('#status_multiple').val();
    console.log('mulp_status: ',mulp_status);
     var mulp_annio = $('#annio').val();

    // var status=document.getElementById('status').value;
    var dinit =document.getElementById('dateinit').value;
    var flag = false;
     console.log("dinit ->"+document.getElementById('dateinit').value);
     

    if(document.getElementById('dateinit').value!==null && document.getElementById('dateinit').value!==''){
       params+="dinit="+getEpoch(formatDate(document.getElementById('dateinit').value,1)); 
       flag_dinit = true;
       flag = true;
    }
    if(document.getElementById('date_end').value!==null && document.getElementById('date_end').value!=='')
       {
         var concat_param = flag?"&":"";
       params+=concat_param+"dend="+getEpoch(formatDate(document.getElementById('date_end').value,1)); 
         flag = true;
       }
 if(document.getElementById('depart').value!==null && document.getElementById('depart').value!==''){
      var concat_param = flag?"&":"";
       params+=concat_param+"dep="+document.getElementById('depart').value;
       flag_dinit = true;
       flag = true;
    }

    if(document.getElementById('object_contract').value!==null && document.getElementById('object_contract').value!==''){
       console.log("flag: ",flag);
       var concat_param = flag?"&":"";
       params+=concat_param+"obj="+document.getElementById('object_contract').value;
       flag_dinit = true;
       flag = true;
    }

     if(document.getElementById('price_from').value!==null && document.getElementById('price_from').value!==''){
       console.log("flag: ",flag);
       var concat_param = flag?"&":"";
       params+=concat_param+"pf="+document.getElementById('price_from').value;
       flag_dinit = true;
       flag = true;
    }

    if(document.getElementById('price_to').value!==null && document.getElementById('price_to').value!==''){
       var concat_param = flag?"&":"";
       params+=concat_param+"pt="+document.getElementById('price_to').value;
       flag_dinit = true;
       flag = true;
    }

 if(document.getElementById('type_process').value!==null && document.getElementById('type_process').value!==''){
       var concat_param = flag?"&":"";
       params+=concat_param+"tp="+document.getElementById('type_process').value;
       flag_dinit = true;
       flag = true;
    }

    if(document.getElementById('entity').value!==null && document.getElementById('entity').value!==''){
        var concat_param = flag?"&":"";
        var valent = "ent="+document.getElementById('entity').value;
        valent = valent.replace(' ','%20');
        console.log('valent ',valent);
        params+=concat_param+valent;
        flag_dinit = true;
        flag = true;
    }

/**
if(document.getElementById('annio').value!==null && document.getElementById('annio').value!==''){
       var concat_param = flag?"&":"";
       params+=concat_param+"a="+document.getElementById('annio').value;
       flag_dinit = true;
       flag = true;
    }
**/
     var conc = flag?"&":"";   
     params+=conc+"filter=1";
     flag=true;

       if(mulp_status!==null && mulp_status!=='' && mulp_status.length!==0){
        params+=((flag)?"&":"")+"status="+mulp_status;
        flag=true;
       }

      if(mulp_annio!==null && mulp_annio!=='' && mulp_annio.length!==0){
        params+=((flag)?"&":"")+"a="+mulp_annio;
        flag=true;
       }

     document.location.href="?"+params;
     
}

function insertParam(key, value)
{
    key = encodeURI(key); value = encodeURI(value);

    var kvp = document.location.search.substr(1).split('&');

    var i=kvp.length; var x; while(i--) 
    {
        x = kvp[i].split('=');

        if (x[0]==key)
        {
            x[1] = value;
            kvp[i] = x.join('=');
            break;
        }
    }

    if(i<0) {kvp[kvp.length] = [key,value].join('=');}

    //this will reload the page, it's likely better to store this until finished
    document.location.search = kvp.join('&'); 
}

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
function isEmpty(value){
  if(value!==null && value!=='')
    return false;
return true;
}

function addCommas(nStr)
{ 
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

 function formatDate(dateFormat,formatt) {

  var today = new Date(dateFormat);
  var dd = today.getDate();
  var mm = today.getMonth() + 1; //January is 0!
  var yy = today.getFullYear().toString().substring(2,4);
   var yyyy =today.getFullYear().toString();
  if (dd < 10) {
    dd = '0' + dd
  }

  if (mm < 10) {
    mm = '0' + mm
  }

  
  today = formatt===0?(dd + '/' + mm + '/' + yy):(mm + '/' + dd + '/' + yyyy);
  return today;
}

function getEpoch(dt){
  var d = (new Date(dt).valueOf())/1000 ;
  return d;
}

function RemoveAccents(str) {
  var accents    = 'ÀÁÂÃÄÅàáâãäåÒÓÔÕÕÖØòóôõöøÈÉÊËèéêëðÇçÐÌÍÎÏìíîïÙÚÛÜùúûüÑñŠšŸÿýŽž';
  var accentsOut = "AAAAAAaaaaaaOOOOOOOooooooEEEEeeeeeCcDIIIIiiiiUUUUuuuuNnSsYyyZz";
  str = str.split('');
  var strLen = str.length;
  var i, x;
  for (i = 0; i < strLen; i++) {
    if ( accents.indexOf(str[i]) !== -1) {
       x = accents.indexOf(str[i]);
       str[i] = accentsOut[x];
    }
  }
  return str.join('');
}

/**
Format date dd/mm/yyyy
**/
function epochToDate(epochtime){
   var epch = parseFloat(epochtime+"000");
   console.log(epch);
    var dt = new Date(epch);
    var dd = dt.getDate();
    
   
  var mm = dt.getMonth() + 1; //January is 0!
  var yyyy = dt.getFullYear();

console.log("dia "+dd);
    console.log("mes "+mm);
    console.log("año "+yyyy);

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

var removeAccents = function(string) {  
  return string.replace(allAccents, function(match) {
    return characterMap[match];
  });
};
