import * as CONSTANT from './constant.js';

class Puzzle {

    constructor(n, viewHolder, numlist) {
        this.n = n;
        this.viewHolder = viewHolder;
        this.numlist = numlist;
        this.currZeroID = [-1, -1];
        this.eBindContext = this.moveTile.bind(this);
    }

    createPuzzle() {
        const template = document.createElement('template');

        var htmlString = `<div id="puzzle" style="display: table;" class="puzzle-holder">`

        for (var i = 0; i < this.n; i++) {
            htmlString += `<div id="row`+i+`" style="display: table-row;">`
            for (var j = 0; j < this.n; j++) {
                var index = this.n * i + j;
                var tileValue = this.numlist[index];
                if (tileValue > 0) {
                    htmlString += `<div class="puzzle-tile-number" id="tile_${i}_${j}" style="display: table-cell; width: ${40}px; height: ${40}px;">${tileValue}</div>`;
                } else {
                    htmlString += `<div class="puzzle-tile-zero" id="tile_${i}_${j}" style="display: table-cell; width: ${40}px; height: ${40}px;"></div>`;
                    this.currZeroID = [i, j];
                    console.log(this.currZeroID);
                }
            }
            htmlString += '</div>'
        }
        htmlString += '</div>'

        template.innerHTML = htmlString

        this.viewHolder.appendChild(template.content);

        document.body.addEventListener('keydown', this.eBindContext);
    };

    moveTile(e) {
        const key = e.code;
        if (key == 'ArrowLeft' || key == 'KeyL') {
            if (this.currZeroID[1] == this.n-1) {
                // if J coord is at n-1, cannot move left
                alert('There is no tile to move to the left!');
            }
            else {
                this.swapWithZero(this.currZeroID[0], this.currZeroID[1]+1);
            }
        }

        else if (key == 'ArrowRight' || key == 'KeyR') {
            if (this.currZeroID[1] == 0) {
                // if J coord is at 0, cannot move right
                alert('There is no tile to move to the right!');
            }
            else {
                this.swapWithZero(this.currZeroID[0], this.currZeroID[1]-1);
            }
        } 

        else if (key == 'ArrowUp' || key == 'KeyU') {
            if (this.currZeroID[0] == this.n-1) {
                // if i coord is at n-1, cannot move up
                alert('There is no tile to move up!');
            }
            else {
                this.swapWithZero(this.currZeroID[0]+1, this.currZeroID[1]);
            }
        }

        else if (key == 'ArrowDown' || key == 'KeyD') {
            if (this.currZeroID[0] == 0) {
                // if i coord is at 0, cannot move down
                alert('There is no tile to move down!');
            }
            else {
                this.swapWithZero(this.currZeroID[0]-1, this.currZeroID[1]);
            }
        }

        return true;
    };

    swapWithZero(targetI, targetJ) {
        // swap className, name and innerHTML
        var tmpClassName = document.getElementById(`tile_${this.currZeroID[0]}_${this.currZeroID[1]}`).className;
        var tmpInnerHTML = document.getElementById(`tile_${this.currZeroID[0]}_${this.currZeroID[1]}`).innerHTML;

        var target = document.getElementById(`tile_${targetI}_${targetJ}`);

        document.getElementById(`tile_${this.currZeroID[0]}_${this.currZeroID[1]}`).className = target.className;
        document.getElementById(`tile_${this.currZeroID[0]}_${this.currZeroID[1]}`).innerHTML = target.innerHTML;

        document.getElementById(`tile_${targetI}_${targetJ}`).className = tmpClassName;
        document.getElementById(`tile_${targetI}_${targetJ}`).innerHTML = tmpInnerHTML;

        // update currZeroID
        this.currZeroID = [targetI, targetJ];

        // call python backend for checking the new order when zero is at [n-1, n-1]
        if (this.currZeroID[0] == this.n-1 && this.currZeroID[1] == this.n-1) {
            this.verifyAnswer();
        }
    };

    verifyAnswer() {
        var answer = [];
        for (var i = 0; i < this.n; i++) {
            for (var j = 0; j < this.n; j++) {
                var tile = document.getElementById(`tile_${i}_${j}`);
                var num = tile.innerHTML;
                if (tile.className == 'puzzle-tile-number') {
                    num = parseInt(num);
                }
                else {
                    num = 0;
                }
                answer.push(num);
            }
        }
        // console.log(answer);

        var classContext = this;
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var receiveData = JSON.parse(this.responseText);
                classContext.handleAnswerVerificationResult(receiveData['verification_result']);
            }
        };
        
        var sendData = JSON.stringify({'answer': answer});

        xhttp.open('POST', CONSTANT.RANDOM_URL + CONSTANT.SUB_URL_VERIFY_RANDOM_ANSWER, true);
        xhttp.send(sendData);
    };

    handleAnswerVerificationResult(verificationResult)  {
        if (verificationResult == true) {
            document.body.removeEventListener('keydown', this.eBindContext);
            // document.getElementById('modal-end-game-control').modal('show');
            var modalEndgameController = document.getElementById('modal-end-game-control');
            modalEndgameController.style.display = 'block';

            var thisContext = this;

            document.getElementById('button-see-shortest-answer').addEventListener('click', function() {

            });

            document.getElementById('button-replay').addEventListener('click', function() {
                document.body.removeEventListener('keydown', this.eBindContext);
                var existingPuzzle = document.getElementById('puzzle');
                if (existingPuzzle != null) {
                    existingPuzzle.parentNode.removeChild(existingPuzzle);
                }
                thisContext.createPuzzle();
                modalEndgameController.style.display = 'none';
            });

            document.getElementById('button-play-random').addEventListener('click', function() {
                window.location.href = CONSTANT.RANDOM_URL;
            });
            
            document.getElementById('button-play-custom').addEventListener('click', function() {
                window.location.href = CONSTANT.CUSTOM_URL;
            });

            document.getElementById('button-close-x').addEventListener('click', function() {
                modalEndgameController.style.display = 'none';
            });
            
            document.getElementById('button-stop-playing').addEventListener('click', function() {
                modalEndgameController.style.display = 'none';
            });

        }
    };

    reset() {
        document.body.removeEventListener('keydown', this.eBindContext);
        var existingPuzzle = document.getElementById('puzzle');
        if (existingPuzzle != null) {
            existingPuzzle.parentNode.removeChild(existingPuzzle);
        }
        this.n = -1;
        this.viewHolder = null;
        this.numlist = [];
        this.currZeroID = [-1, -1];
    }
}

export default Puzzle;