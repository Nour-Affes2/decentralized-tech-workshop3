from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/getServer', methods=['GET'])
def get_server():
    return jsonify({"code": 200, "server": "localhost:3001"})

if __name__ == '__main__':
    app.run(port=5001, debug=True)
