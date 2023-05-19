class Puzzle {
    n = 0;
    viewHolder = null;
    numlist = [];

    constructor(n, viewHolder, numlist) {
        this.n = n;
        this.viewHolder = viewHolder;
        this.numlist = numlist;
    }

    createPuzzle() {
        const template = document.createElement('template');

        var existingPuzzle = document.getElementById('puzzle');
        if (existingPuzzle != null) {
            existingPuzzle.parentNode.removeChild(existingPuzzle);
        }

        var htmlString = `<div id="puzzle" style="display: table;">`

        for (var i = 0; i < this.n; i++) {
            htmlString += `<div id="row`+i+`" style="display: table-row;">`
            for (var j = 0; j < this.n; j++) {
                var tileValue = this.numlist[this.n * i + j];
                if (tileValue > 0) {
                    htmlString += `<div class="puzzle-tile-number" style="display: table-cell; width: `+40+`px; height: `+40+`px;">`+tileValue+`</div>`;
                } else {
                    htmlString += `<div class="puzzle-tile-number puzzle-tile-zero" style="display: table-cell; width: `+40+`px; height: `+40+`px;">`+tileValue+`</div>`;
                }
            }
            htmlString += '</div>'
        }
        htmlString += '</div>'

        template.innerHTML = htmlString

        this.viewHolder.appendChild(template.content);
    }
}

export default Puzzle;