// JavaScript Document
function updateSecondSelection() {
    var fruits = new Array('apple', 'banana', 'berries');
    var vegetables = new Array('carrot', 'potatoe', 'tomato');
    var fastfood = new Array('mdDonald', 'BurgerKing', 'Taco bell');

    var categoryFood = document.getElementById('categoryFood');
    var typeFood = document.getElementById('typeFood');
    var selected = categoryFood.value;

    /** Remove all options in second dropdown list selection **/
    program.options.length = 0;

    if (selected == 1) {
        for (node in fruits) {
            program.options[node]
                = new Option(fruits[node], fruits[node]);
        }
    } else if (selected == 2) {
        for (node in vegetables) {
            program.options[node]
                = new Option(vegetables[node], vegetables[node]);
        }
    } else if (selected == 3) {
        for (node in fastfood) {
            program.options[node]
                = new Option(fastfood[node], fastfood[node]);
        }
    } else {
        program.options[0] = new Option('No option selected', 'NA');
    }
}