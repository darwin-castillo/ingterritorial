/** script select multiple ** */

document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems, options);
});

// Or with jQuery

$(document).ready(function () {
    $('select').formSelect();

});


// end select multiple

document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.datepicker');
    var instances = M.Datepicker.init(elems, options);
});

// Or with jQuery

$(document).ready(function () {
    $('.datepicker').datepicker();
});


$(document).ready(function () {


});



// Get the modal
var modal = document.getElementById('infoModal');


var modalHelp = document.getElementById('modalHelp');
var btnHelp = document.getElementById("btnHelp");


btnHelp.onclick = function () {
    modalHelp.style.display = "block";
}


// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
btn.onclick = function () {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
    modalHelp.style.display = "none"
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
        modalHelp.style.display = "none"
    }

}


$(document).ready(function () {
    $('.tabs').tabs();
});



