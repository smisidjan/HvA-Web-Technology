function readTextFile(file, callback) {
    let rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4 && rawFile.status === 200) {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}

function removeDuplicates(originalArray, prop) {
    let newArray = [];
    let lookupObject = {};

    for (var i in originalArray) {
        lookupObject[originalArray[i][prop]] = originalArray[i];
    }

    for (i in lookupObject) {
        newArray.push(lookupObject[i]);
    }
    return newArray;
}

function render_options() {
    readTextFile("./scores.json", function (text) {
        let data = JSON.parse(text);
        let sel = document.getElementById('cards');
        let uniqueArray = removeDuplicates(data['spelresultaten'], "numberOfcards");

        for (let i = 0; i < uniqueArray.length; i++) {
            let opt = document.createElement('option');
            opt.innerHTML = uniqueArray[i]['numberOfcards'];
            opt.value = uniqueArray[i]['numberOfcards'];

            sel.appendChild(opt);
        }
    });
}

render_options()

function render_table() {
    let cards = document.forms["myForm"]["cards"].value;

    readTextFile("./scores.json", function (text) {
        let data = JSON.parse(text);
        let table = document.querySelector("table");

        let result = data['spelresultaten'].filter(obj => {
            console.log(obj['numberOfcards'])
            console.log({cards})
            return obj.numberOfcards === parseInt(cards)
        })

        function generateTable(table, data) {
            let index = 0;
            for (let element of data) {
                let row = table.insertRow();
                let newRangCell = row.insertCell();
                let newRangText = document.createTextNode(index + 1);
                newRangCell.appendChild(newRangText);

                for (key in element) {
                    let cell = row.insertCell();
                    let text = document.createTextNode(element[key]);
                    cell.appendChild(text);
                }
                index++;
            }

            function selectedRow() {
                let index, table = document.getElementById("table");

                for (let i = 1; i < table.rows.length; i++) {
                    table.rows[i].onclick = function () {
                        if (typeof index !== "undefined") {
                            table.rows[index].classList.toggle("selected");
                        }

                        index = this.rowIndex;
                        this.classList.toggle("selected");
                    };
                }
            }
            selectedRow();
        }
        generateTable(table, result);
    });
}