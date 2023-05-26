from flask import Blueprint, render_template, request
import json
import random
from flaskr import puzzle as master_puzzle

random_puzzle_bp = Blueprint('random_puzzle_bp', __name__, 
                             static_folder = 'static', static_url_path = 'static',
                             template_folder = 'templates')

@random_puzzle_bp.route('/')
def start_rp():
    return render_template('random_puzzle.html')


@random_puzzle_bp.route('/make-random-numlist', methods=['GET', 'POST'])
def make_random_numlist():
    receive_data = json.loads(request.data.decode('utf-8'))
    print('Receive request make random list', receive_data)

    N = int(receive_data['N'])
    numlist = [i+1 for i in range(0, N*N)]
    numlist[-1] = 0
    # random.shuffle(numlist) # turn on after dev

    sendDataRaw = {
        'numlist': numlist
    }
    sendData = json.dumps(sendDataRaw)

    return sendData

@random_puzzle_bp.route('/verify-random-answer', methods=['GET', 'POST'])
def verify_random_answer():
    receive_data = json.loads(request.data.decode('utf-8'))
    print('Receive request verify puzzle answer', receive_data)
    answer = receive_data['answer']
    verify_result = master_puzzle.verify_puzzle(answer)
    
    sendDataRaw = {
        'verification_result': verify_result
    }
    sendData = json.dumps(sendDataRaw)
    return sendDataRaw