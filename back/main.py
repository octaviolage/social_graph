import flask
from flask import request, jsonify

app = flask.Flask(__name__)
app.config["DEBUG"] = True

@app.route('/', methods=['GET'])
def home():
    return "<p>Server runnning</p>"


@app.route('/api/v1/friends', methods=['GET'])
def friends_graph():
    if 'username' in request.args:
        username = int(request.args['username'])
    else:
        return "Error: No username field provided. Please specify an username."

    results = []

    return jsonify(results)

app.run()