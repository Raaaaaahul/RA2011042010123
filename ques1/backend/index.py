from flask import Flask, request, jsonify
import requests
from flask_cors import CORS
app = Flask(__name__)
CORS(app)

@app.route('/numbers', methods=['GET'])
def get_numbers():
    urls = request.args.getlist('url')
    numbers = []
    for url in urls:
        try:
            response = requests.get(url)
            data = response.json()
            numbers.extend(data['numbers'])
        except:
            pass
    return jsonify({'numbers': list(set(numbers))})

if __name__ == '__main__':
    from waitress import serve
    serve(app, host="0.0.0.0", port=8008)