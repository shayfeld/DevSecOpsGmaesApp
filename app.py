# app.py
from flask import Flask, render_template
import os

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')  # Serve the main menu HTML file

@app.route('/snake')
def snake():
    return render_template('snake.html')  # Serve the HTML file

@app.route('/flappy_bird')
def flappy_bird():
    return render_template('flappy_bird.html')  # Serve the HTML file

@app.route('/breakout')
def breakout():
    return render_template('breakout.html')  # Serve the HTML file

@app.route('/tictactoe')
def tictactoe():
    return render_template('tictactoe.html')  # Serve the HTML file

@app.route('/pong')
def pong():
    return render_template('pong.html')  # Serve the HTML file

if __name__ == "__main__":
    port = int(os.environ.get('PORT', 5000))
    app.run(debug=True, host='0.0.0.0', port=port)
