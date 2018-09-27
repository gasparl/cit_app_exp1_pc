
 var male_forenames = ["Nico", "Justin", "Jakob", "Gerald", "Max", "Mario", "Jürgen", "Ferdinand", "Simon", "Harald", "Andre", "Gregor", "Martin", "Julian", "Berat", "Robert", "Leonard", "Theodor", "Arthur", "Emir", "Theo", "Marcel", "Lorenz", "Moritz", "Samuel", "Stefan", "Anton", "Felix", "Herbert", "Clemens", "Gerhard", "Peter", "Sascha", "Richard", "Günther", "Ali", "Johann", "Nicolas", "Leo", "Alexander", "Emanuel", "Manfred", "Klaus", "Roland", "Laurenz", "Valentin", "Dominik", "Marvin", "Helmut", "Hamza", "Viktor", "Jonathan", "Josef", "Christoph", "Markus", "Pascal", "Maximilian", "Finn", "Mathias", "Rafael", "Roman", "Yusuf", "Manuel", "Oliver", "Rene", "Karl", "Adam", "Christopher", "Jan", "Kilian", "Michael", "Jonas", "Werner", "Kevin", "David", "Emil", "Constantin", "Noah", "Bernhard", "Bernd", "Georg", "Marco", "Florian", "Franz", "Fabio", "Wolfgang", "Thomas", "Vincent", "Christian", "Andreas", "Erik", "Johannes", "Tobias", "Benjamin", "Ben", "Sandro", "Armin", "Daniel", "Reinhard", "Benedikt", "Amir", "Gernot", "Elias", "Gabriel", "Patrik", "Andrej", "Konstantin", "Oskar", "Sebastian", "Matthias", "Fabian", "Hannes", "Paul", "Leon", "Tim", "Leopold", "Adrian"];

  var fem_forenames = ["Sandra", "Jacqueline", "Johanna", "Celine", "Silvia", "Ecrin", "Verena", "Sofia", "Sophie", "Hira", "Cornelia", "Valerie", "Angelina", "Lina", "Miriam", "Petra", "Natalie", "Simone", "Isabella", "Hanna", "Emilia", "Melina", "Maja", "Larissa", "Anja", "Angelika", "Patricia", "Claudia", "Mia", "Birgit", "Astrid", "Bettina", "Antonia", "Jessica", "Klara", "Nina", "Elisabeth", "Janine", "Manuela", "Charlotte", "Olivia", "Christina", "Leonie", "Katharina", "Amina", "Anastasia", "Bernadette", "Mila", "Pia", "Magdalena", "Romana", "Paula", "Amelie", "Kerstin", "Ela", "Jana", "Jennifer", "Lea", "Susanne", "Sara", "Nadine", "Lara", "Jasmin", "Mira", "Ella", "Yvonne", "Marie", "Theresa", "Melanie", "Alma", "Tanja", "Alina", "Martina", "Denise", "Rebecca", "Paulina", "Franziska", "Karin", "Lena", "Ines", "Nicole", "Michelle", "Viktoria", "Chiara", "Bianca", "Stefanie", "Carina", "Linda", "Azra", "Stella", "Nora", "Flora", "Vanessa", "Teresa", "Sonja", "Tamara", "Anna", "Ana", "Andrea", "Melissa", "Lilly", "Elif", "Lisa", "Clara", "Teodora", "Kristina", "Anita", "Leonora", "Silke", "Emma", "Esila", "Daniela", "Veronika", "Elena", "Marina", "Helena", "Natascha", "Elina", "Carmen", "Alexandra", "Eva", "Barbara", "Maya", "Tina", "Valentina", "Elisa", "Sabine", "Matilda", "Doris", "Julia", "Rosa", "Laura", "Annika", "Nisa", "Iris", "Zoe", "Monika", "Selina"];

  var surnms = ["Bauer", "Müllner", "Langer", "Petrovic", "Huber", "Mayer", "Lehner", "Brunner", "Gruber", "Pfeiffer", "Nowak", "Steiner", "Tichy", "Weiß", "Swoboda", "Traxler", "Schmid", "Urban", "Holzer", "Kainz", "Stadler", "Auer", "Wieser", "Hahn", "Moser", "Varga", "Schuster", "Leitner", "Eder", "Ziegler", "Wimmer", "Winkler", "Schindler", "Graf", "Nikolic", "Reiter", "Hofer", "Berger", "Koch", "Yilmaz", "Schwarz", "Bayer", "Baumgartner", "Schmidt", "Haider", "Kaufmann", "Horvath", "Djordjevic", "Lechner", "Maier", "Todorovic", "Weiss", "Lang", "Bruckner", "Neumann", "Wolf", "Schober", "Fuchs", "König", "Hofbauer", "Pichler", "Neubauer", "Fischer", "Toth", "Strobl", "Wagner", "Schneider", "Kraus", "Vasic", "Kern", "Winter", "Klein", "Schubert", "Weber", "Frank", "Braun", "Werner", "Kaiser", "Haas", "Zimmermann", "Jovanovic", "Koller", "Novak", "Hofmann", "Richter", "Binder", "Seidl", "Wittmann", "Böhm", "Walter", "Unger", "Aigner", "Markovic", "Wiesinger", "Windisch", "Wallner", "Zach", "Müller", "Hoffmann", "Riedl"];

var nums = range(1, 32);

var items_base1;

var categories_base = [ "forenames", "months", "days", "surnames" ];
//var categories = [ "forenames", "dates", "surnames" ];
var categories = [ "forenames", "surnames" ]; //

function fill_options() {
    if ($("#gender").val() == 1) {
      allforenams = male_forenames;
    } else {
      allforenams = fem_forenames;
    }
    allforenams = allforenams.map(function(itemee){ return itemee.toLowerCase(); });
    surnms = surnms.map(function(itemee){ return itemee.toLowerCase(); });
    items_base1 = [
        allforenams.sort(), [ "january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december" ], nums, surnms.sort()
    ];
    categories_base.forEach( function( categ, index ) { //fills up the selection options for the categories
        var dropChoices = '';
        var catAll = items_base1[ index ];
        catAll.forEach( function( word ) {
            dropChoices += '<option value="' + word + '">' + word + '</option>';
        } );
        ['#tcheck_'].forEach( function( pre_id, index ) {
            categ_id = pre_id + categ;
            $( categ_id ).append( dropChoices );
        });
    } );
}

var true_details, items_base2;
function prune() {
    fill_options();
    basic_times.started = Date();

    //given the probe (in each of the categories), selects 8 additional items, 5 of which will later be irrelevants. None with same starting letter, and with length closest possible to the probe.
    var true_details_base = [
        $("#forenames")
            .val()
            .toLowerCase(),
        "may",
        11,
        $("#surnames")
            .val()
            .toLowerCase()
    ];
    true_details = [
        true_details_base[0],
        [true_details_base[1], true_details_base[2]].join(" "),
        true_details_base[3]
    ];
    var items_base2_temp = [];
    true_details_base.forEach(function(probe, index) {
        var container = items_base1[index],
            temps;
        var final8 = [probe];
        var maxdif = 0;
        if (probe[0] > -1) {
            final8.push.apply(final8, [0, 0, 0, 0, 0, 0, 0]);
        } else {
            container = $.grep(container, function(n) {
                return probe != n;
            });
            container = $.grep(container, function(n) { // filter if same starting character
                return probe[0] != n[0];
            });
            if (index === 0 || index === 3) {
                if (/\s/.test(probe)) {
                    container = $.grep(container, function(n) {
                        return /\s/.test(n);
                    });
                } else {
                    container = $.grep(container, function(n) {
                        return !/\s/.test(n);
                    });
                }
            }
            while (final8.length < 9 && maxdif < 99) {
                temps = $.grep(container, function(n) {
                    return Math.abs(probe.length - n.length) <= maxdif;
                });
                if (temps.length > 0) {
                    final8.push(rchoice(temps));
                    container = $.grep(container, function(n) {
                        return final8[final8.length - 1] !== n;
                    });
                    if (index === 0 || index === 3) {
                        container = $.grep(container, function(n) {
                            return final8[final8.length - 1][0] !== n[0];
                        });
                    }
                } else {
                    maxdif++;
                }
            }
        }
        items_base2_temp.push(final8);
    });
    var days = range(1, 32);
    var day;
    var days_to_filt1 = [true_details_base[2]];
    items_base2_temp[1].forEach(function(month, index) {
        if (index > 0) {
            var days_to_filt2 = days_to_filt1;
            if (month == "february") {
                days_to_filt2 = days_to_filt1.concat([29, 30, 31]);
            } else {
                if (
                    $.inArray(month, [
                        "april",
                        "june",
                        "september",
                        "november"
                    ]) > -1
                ) {
                    days_to_filt2.push(31);
                }
            }
            var dys_temp = $.grep(days, function(a) {
                return $.inArray(a, days_to_filt2) == -1;
            });
            day = rchoice(dys_temp);
        } else {
            day = items_base2_temp[2][0];
        }
        items_base2_temp[2][index] = [month, day].join(" ");
        days_to_filt1.push(day);
    });
    items_base2_temp.splice(1, 1);
    items_base2_temp.splice(1, 1); // skip dates
    items_base2 = items_base2_temp;
}

function select_meaningful() {
    set_guilty_vs_innocent(); // this sets instruction texts depending on guilt - unrelated to item selection
    window.countC0 = 0;
    window.countC1 = 0;
    window.words_to_filter = [[], []];
    items_base2.forEach(function(categ, index1) {
        column = categ.slice(1, 9);
        column.forEach(function(word, ind) {
            column[ind] = word.toLowerCase();
        });
        column.sort();
        column.splice(randomdigit(1, 6), 0, "None");
        column.forEach(function(word, index2) {
            var id_full = ["#wo", index1, index2].join("");
            $(id_full).text(word);
        });
    });
    $(".words0").click(function() {
        var this_word = $(this).text();
        if (this_word == "None") {
            if ($(this).hasClass("turnedon")) {
                $(this).removeClass("turnedon");
                countC0 = 0;
            } else {
                if (countC0 === 0) {
                    $(this).addClass("turnedon");
                    countC0 = 9;
                }
            }
        } else {
            if ($(this).hasClass("turnedon")) {
                $(this).removeClass("turnedon");
                words_to_filter[0] = $.grep(words_to_filter[0], function(a) {
                    return a != this_word;
                });
                countC0--;
            } else {
                if (countC0 < 2) {
                    $(this).addClass("turnedon");
                    words_to_filter[0].push(this_word);
                    countC0++;
                }
            }
        }
    });
    $(".words1").click(function() {
        var this_word = $(this).text();
        if (this_word == "None") {
            if ($(this).hasClass("turnedon")) {
                $(this).removeClass("turnedon");
                countC1 = 0;
            } else {
                if (countC1 === 0) {
                    $(this).addClass("turnedon");
                    countC1 = 9;
                }
            }
        } else {
            if ($(this).hasClass("turnedon")) {
                $(this).removeClass("turnedon");
                words_to_filter[1] = $.grep(words_to_filter[1], function(a) {
                    return a != this_word;
                });
                countC1--;
            } else {
                if (countC1 < 2) {
                    $(this).addClass("turnedon");
                    words_to_filter[1].push(this_word);
                    countC1++;
                }
            }
        }
    });
}

var stim_base_6, stim_base, the_targets = [], the_probes = [];

function create_stim_base() {
    //creates all stimuli (a 6-item group - 1probe,1target,4irrelevants - for each of 4 different categories) from the given item and probe words
    var stim_base_temp = [[], []];
    items_base2.forEach(function(categ, index) {
        var filtered_words = $.grep(categ, function(a) {
            return $.inArray(a, words_to_filter[index]) == -1;
        });
        var words_array = [];
        if (condition < 3) {
            words_array = [filtered_words[0]].concat(
                shuffle(filtered_words.slice(1, 6))
            ); // for GUILTY
        } else {
            words_array = shuffle(filtered_words.slice(1, 7)); // for INNOCENT
        }
        words_array.forEach(function(word, num) {
            stim_base_temp[index].push({
                word: word,
                cat: categories[index]
            });
            if (0 === num) {
                stim_base_temp[index][num].type = "probe";
                the_probes.push(stim_base_temp[index][num].word);
            } else if (1 == num) {
                stim_base_temp[index][num].type = "target";
                the_targets.push(stim_base_temp[index][num].word);
            } else {
                stim_base_temp[index][num].type = "irrelevant" + (num-1);
            }
        });
    });
    if (cat_order == 1) {
        stim_base = [
            stim_base_temp[0],
            stim_base_temp[1]
        ];
    } else {
        stim_base = [
            stim_base_temp[1],
            stim_base_temp[0]
        ];
    }
    set_block_texts();
    set_cit_conditions();
}

function target_check() {
    if (
        $("#tcheck_forenames")
            .val()
            .toUpperCase() != the_targets[0].toUpperCase() ||
        $("#tcheck_surnames")
            .val()
            .toUpperCase() != the_targets[1].toUpperCase()
    ) {
        alert("Wrong! Please check the details more carefully!");
        $("#div_target_check").hide();
        $("#instructions").show();
        $("#tcheck_forenames").val('');
        $("#tcheck_surnames").val('');
        $("#tcheck_months").val('');
        $("#tcheck_days").val('');
        return false;
    } else {
        div_after_instr = "#div_cit_blockstart";
        return true;
    }
}
