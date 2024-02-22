$(window).on("load", function() {
    $("#genContent").hide(0);
    $("#btnRestart").hide(0);
});

const LETTERS_FACES = [
    "F", "F\'", //FRONT
    "B", "B\'", //BACK
    "R", "R\'", //RIGHT
    "L", "L\'", //LEFT
    "U", "U\'", //UP
    "D", "D\'" //DOWN

];
const LETTERS_MIDDLE = [
    "M", "M'", //MIDDLE
    "E", "E\'", //EQUATOR
    "S", "S\'" //STANDING
]
const LEtTTERS_AXIS = [
    "X", "X\'",
    "Y", "Y\'",
    "Z", "Z\'"
]
let LETTERS = []

//Fisher–Yates shuffle
//Code: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle(array) {
    let currentIndex = array.length,
        randomIndex;
    while (currentIndex > 0) {

        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]
        ];
    }

    return array;
}
//-------------------------------------------------------------------------------------------------

let coll_rotation = 0;
jQuery.fn.rotate = function(degrees) {
    $(this).css({
        'transform': 'rotate(' + degrees + 'deg)'
    });
    return $(this);
};

const hide_options = {
    duration: 400,
    progress: () => {
        coll_rotation += 10;
        $("#coll").rotate(coll_rotation);
    },
    complete: () => {
        $("#genContent").show(0.1);
    }
}

const StartRand = () => {
    if ($('input[name="checkbox-v-2a"]:checked').length <= 0) {
        swal("Warning!", "Select some randomization types!", "info");

    } else {

        Object.entries(document.querySelectorAll("input[name='checkbox-v-2a']:checked")).forEach(e => {
            if (e[1].id == "checkboxfaces") {
                LETTERS_FACES.forEach(e => {
                    LETTERS.push(e)
                });
            } else if (e[1].id == "checkboxMiddle") {
                LETTERS_MIDDLE.forEach(e => {
                    LETTERS.push(e)
                });
            } else if (e[1].id == "checkBoxAxis") {
                LEtTTERS_AXIS.forEach(e => {
                    LETTERS.push(e)
                });
            }
        })

        if ($('input[name="checkboxSArr"]')[0].checked) {
            LETTERS = shuffle(LETTERS);
        }


        $("#coll").hide(hide_options);

        const iterations = parseInt(document.getElementsByName("slider-2")[0].value) - 1;
        const timeSpeed = parseFloat(document.getElementsByName("slider-3")[0].value);
        console.log(timeSpeed);

        let loopIndex = 0;
        let interv = setInterval(() => {
            RandLetters();
            if (loopIndex == iterations) {
                $("#btnRestart").show(1000);
                clearInterval(interv);
            }
            loopIndex++;
        }, timeSpeed);

    }

}


const RandLetters = () => {
    const separator = ($('input[name="radioS"]:checked').parent().text() == "Space") ? "  " : $('input[name="radioS"]:checked').parent().text();
    const letter = LETTERS[Math.floor(Math.random() * LETTERS.length)] + separator;
    document.getElementById("genData").textContent += letter;
}