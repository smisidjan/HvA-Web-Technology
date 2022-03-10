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