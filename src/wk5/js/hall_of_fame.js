function removeDuplicates(scores) {
    let newArray = [];

    for (let i = 0; i < scores.length; i++) {
        // sets all the numberOfcards values in an array
        newArray.push(scores[i].numberOfcards)
    }

    // filters the array and returns only unique items
    // used stackoverflow for this solution: https://stackoverflow.com/questions/1960473/get-all-unique-values-in-a-javascript-array-remove-duplicates
    let unique = newArray.filter((v, i, a) => a.indexOf(v) === i);

    // sets the numbers highest to lowest
    // used codegrepper for this solution: https://www.codegrepper.com/code-examples/javascript/sort+array+highest+to+lowest+javascript
    return unique.sort((a, b) => b-a);
}

function setSelectOptions(scores) {
    // removes the duplicate values from numberOfcards in the scores array
    let uniqueArray = removeDuplicates(scores);
    let options = "";

    // loops through the unique array
    for (let i = 0; i < uniqueArray.length; i++) {
        // set an option element with the numberOfcards value and set it in options
        options += "<option>" + uniqueArray[i] + "</option>";
    }

    // gets the select element with id cards
    // sets the options in the innerHTML of the select
    document.getElementById('cards').innerHTML = options;
}

// gets the json file and returns it
async function getJson(url) {
    let response = await fetch(url);
    return response.json();
}

async function renderSelectOptions() {
    let scores = await getJson('scores.json');
    setSelectOptions(scores)
}

// renders the table when an option is selected
renderSelectOptions().then(r => render_table())

function generateTable(scores) {
    let table = document.getElementById("js-table");
    let index = 0;
    for (let object of scores) {
        // adds a row and cell for every item in the array with a number as value
        let row = table.insertRow();
        let cell = row.insertCell();
        cell.innerHTML = index + 1;

        // loops trough the object and gets an item
        for (let item in object) {
            // insert cell for every item with the item as value
            let cell = row.insertCell();
            cell.innerHTML = object[item];
        }
        // adds 1 up for the rang
        index++
    }
}

function selectedRow() {
    let table = document.getElementById("table");

    // loops through the table rows and sets an onclick function on the rows
    // then adds or deletes the class selected on the property with the toggle function
    for (let i = 1; i < table.rows.length; i++) {
        table.rows[i].addEventListener('click', function() {
            table.rows[i].classList.toggle("selected");
        });
    }

    // doing the same for the table head with a different class
    let tableHead = document.getElementById("table-head");
    tableHead.addEventListener('click', function() {
        tableHead.classList.toggle("selectedHead");
    });
}

function unsetTable() {
    // gets the table and table rows
    let table = document.getElementById("js-table");
    let tableRows = document.getElementById("js-table").rows;

    // if its not the first time you select an option you have rows in youre table
    // if so we deleting the entire table
    if (tableRows.length > 0) {
        table.remove();

        // here we getting the table and setting a new tbody tag with id js-table
        // in function generateTable() we need the tbody tag with id js-table to rerender the table
        let newTable = document.getElementById("table");
        let newBody = newTable.createTBody();
        newBody.setAttribute("id", "js-table")
    }
}

async function render_table() {
    // gets the value of the select option
    let numberOfCardsSelect = document.getElementById('cards').value;
    let scores = await getJson('scores.json');

    // filters the array
    // returns the objects when numberOfcards is the same as the select value
    let result = scores.filter(obj => {
        return obj.numberOfcards === parseInt(numberOfCardsSelect)
    })

    unsetTable();
    generateTable(result);
    selectedRow();
}
