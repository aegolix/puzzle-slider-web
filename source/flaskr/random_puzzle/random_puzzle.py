from flask import Blueprint, render_template, request
import json
import random

random_puzzle_bp = Blueprint('random_puzzle_bp', __name__, 
                             static_folder = 'static', static_url_path = 'static',
                             template_folder = 'templates')

@random_puzzle_bp.route('/')
def start_rp():
    return render_template('random_puzzle.html')


@random_puzzle_bp.route('/make-random-numlist', methods=['GET', 'POST'])
def make_random_numlist():
    receive_data = json.loads(request.data.decode('utf-8'))
    print(receive_data)

    N = int(receive_data['N'])
    numlist = [i for i in range(0, N*N)]
    random.shuffle(numlist)

    sendDataRaw = {
        'numlist': numlist
    }

    sendData = json.dumps(sendDataRaw);

    return sendData