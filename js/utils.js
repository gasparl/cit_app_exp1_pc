// translation
var tranlate_count = 0;

function inse(str, index, count, add) {
    var ar = str.split('');
    ar.splice(index, count, add);
    return ar.join('');
}

capitalize = function(str1) {
    return str1.charAt(0).toUpperCase() + str1.slice(1);
};

//only allow number in input field
function validate(evt) {
    var theEvent = evt || window.event;
    var key = theEvent.keyCode || theEvent.which;
    key = String.fromCharCode(key);
    var regex = /[0-9]/;
    if (!regex.test(key)) {
        theEvent.returnValue = false;
        if (theEvent.preventDefault) theEvent.preventDefault();
    }
}

//do nothing
function noop() {
    $.noop();
}

// change div - if good to go. Two optional functions to include in execution (default does nothing)
function change_div(
    current,
    next,
    good_to_go = true,
    onchange_function1 = noop,
    onchange_function2 = noop
) {
    if (good_to_go === true) {
        onchange_function1();
        onchange_function2();
        var toHide = "#" + current.parentNode.id;
        $(toHide).hide();
        $(next).show();
    }
}

//after forms, check if all filled in
function validate_form(form_class) {
    var is_valid = true;
    $(form_class).each(function() {
        if ($(this).val() === "") is_valid = false;
    });
    if (is_valid === false) {
        alert("Bitte füllen Sie alle Details aus.");
    }
    return is_valid;
}

//validate selection of meaningful items
function check_selected() {
    var is_valid = true;
    if (countC0 === 0 || countC1 === 0) {
        is_valid = false;
        alert(
            'Please select at least one from each category, or the option "None".'
        );
    }
    return is_valid;
}

function starter() {
    condition = 0; // always standard CIT guilty
    cat_order = $("#name_order_id").val();
    subj_id = $("#subj_num_id").val();
}

//background changes
function darken_bg() {
    $("#html_id").css("background", bg_color);
}

function lighten_bg() {
    $("#html_id").css("background", "#666666");
}

function selectable_bg() {
    $("#html_id").css({
        "-webkit-user-select": "text" /* Chrome/Safari/Opera */ ,
        "-moz-user-select": "text" /* Firefox */ ,
        "-ms-user-select": "text" /* IE/Edge */ ,
        "-khtml-user-select": "text" /* Konqueror */ ,
        "user-select": "text" /* non-prefixed version */
    });
}

function no_select_bg() {
    $("#html_id").css({
        "-webkit-user-select": "none" /* Chrome/Safari/Opera */ ,
        "-moz-user-select": "none" /* Firefox */ ,
        "-ms-user-select": "none" /* IE/Edge */ ,
        "-khtml-user-select": "none" /* Konqueror */ ,
        "user-select": "none" /* non-prefixed version */
    });
    darken_bg();
}

//calculate sum
function sum(array_to_sum) {
    var sum = 0;
    array_to_sum.forEach(function(item) {
        sum += item;
    });
    return sum;
}
//calculate mean
function mean(array_to_avg) {
    var mean = sum(array_to_avg) / array_to_avg.length;
    return mean;
}
function sd(array_for_sd) {
  var m = this.mean(array_for_sd);
  return Math.sqrt(array_for_sd.reduce(function(sq, n) {
    return sq + Math.pow(n - m, 2);
  }, 0) / (array_for_sd.length - 1));
}

function randomdigit(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function seconds_between_dates(startDate, endDate) {
    return Math.abs(new Date(startDate) - new Date(endDate)) / 1000;
}

// timing
var now = function() {
    var performance = window.performance || {};
    performance.now = (function() {
        return (
            performance.now ||
            performance.webkitNow ||
            performance.msNow ||
            performance.oNow ||
            performance.mozNow ||
            function() {
                return new Date().getTime();
            }
        );
    })();
    return performance.now();
};
window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

//shuffle
function shuffle(array) {
    var newarr = [];
    var currentIndex = array.length,
        temporaryValue,
        randomIndex;
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        newarr[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return newarr;
}

// random choice from array
function rchoice(array) {
    return array[Math.floor(array.length * Math.random())];
}

// pythonic range (integers from START until before END)
function range(start, end) {
    r = [];
    for (var i = start; i < end; i++) {
        r.push(i);
    }
    return r;
}

var subj_id;

// end task
function end_save() {
    var dcit = (mean(all_main_rts.probs) - mean(all_main_rts.irrs)) / sd(all_main_rts.irrs);
    var outcome;
    if (dcit > 0.1) {
      outcome = " => found GUILTY (dcit > 0.1";
    } else {
      outcome = " => found INNOCENT (dcit <= 0.1";
    }
    outcome += "; Pr-Irr diff ~" + Math.round(mean(all_main_rts.probs) - mean(all_main_rts.irrs)) + " ms)";
    f_name =
        experiment_title +
        "_" +
        subj_id +
        "_" +
        cat_order +
        "_" +
        Date.now() +
        ".txt";
    to_display = "dcit = " + (Math.ceil(dcit * 1000) / 1000).toFixed(3) + outcome + "\n\nFile name: " + f_name + "\n\nFull data:\n";
        console.log(to_display);
    basic_times.finished = Date();
    duration_full = seconds_between_dates(
        basic_times.started,
        basic_times.finished
    );
    cit_data +=
        "Loaded " +
        basic_times.loaded +
        " Started " +
        basic_times.started +
        " Finished " +
        basic_times.finished +
        basic_times.blocks +
        "\nRepetitions: " +
        "\t" +
        practice_repeated.block1 +
        "\t" +
        practice_repeated.block2 +
        "\t" +
        practice_repeated.block3 +
        "\t" +
        dcit +
        "\n";

    console.log(cit_data);
    $("#data_display").text(cit_data);
    $("#div_outro_end").hide();
    $("#data_display").show();
    element = $('<textarea>').appendTo('body').val(cit_data).select();
    document.execCommand("Copy");
    element.remove();

    dl_as_file(f_name, cit_data);
}

function dl_as_file(filename_to_dl, data_to_dl) {
    var blobx = new Blob([data_to_dl], {
        type: 'text/plain'
    });
    var elemx = window.document.createElement('a');
    elemx.href = window.URL.createObjectURL(blobx);
    elemx.download = filename_to_dl;
    document.body.appendChild(elemx);
    elemx.click();
    document.body.removeChild(elemx);
}
