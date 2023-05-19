import Puzzle from './../../static/puzzle.js';
const serverURL = 'http://127.0.0.1:5000/random-puzzle/';
const subURL_makeRandomNumlist = 'make-random-numlist';

function submitCreatePuzzle() {
    var n = document.getElementById('rpuzzle-input-n').value;
    var numlist = null;

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var receiveData = JSON.parse(this.responseText);
            console.log(receiveData['numlist']);
            numlist = receiveData['numlist'];
            var randomPuzzle = new Puzzle(n, document.getElementById('rpuzzle-holder'), numlist);
            randomPuzzle.createPuzzle();
        }
    };
    
    var sendData = JSON.stringify({'N': n});

    xhttp.open('POST', serverURL + subURL_makeRandomNumlist, true);
    xhttp.send(sendData);
}

document.getElementById("rpuzzle-submit-button").addEventListener('click', submitCreatePuzzle);

