from flask import Blueprint, render_template

custom_puzzle_bp = Blueprint('custom_puzzle_bp', __name__, 
                             static_folder = 'static', static_url_path = 'assets',
                             template_folder = 'templates')

@custom_puzzle_bp.route('/')
def start_rp():
    return render_template('custom_puzzle.html')