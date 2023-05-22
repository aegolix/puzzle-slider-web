import Puzzle from './../../static/puzzle.js';
import * as CONSTANT from './../../static/constant.js'; 

var randomPuzzle = null;

function submitCreatePuzzle() {
    var n = document.getElementById('rpuzzle-input-n').value;
    var numlist = null;

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var receiveData = JSON.parse(this.responseText);
            console.log(receiveData['numlist']);
            numlist = receiveData['numlist'];
            
            if (randomPuzzle != null) {
                randomPuzzle.reset();
            }
            randomPuzzle = new Puzzle(n, document.getElementById('rpuzzle-holder'), numlist);
            randomPuzzle.createPuzzle();
        }
    };
    
    var sendData = JSON.stringify({'N': n});

    xhttp.open('POST', CONSTANT.RANDOM_URL + CONSTANT.SUB_URL_MAKE_RANDOM_NUMLIST, true);
    xhttp.send(sendData);
}

document.getElementById("rpuzzle-submit-button").addEventListener('click', submitCreatePuzzle);

