import flask
from flask import request, jsonify
from flask_cors import CORS

from graph_builder import GraphBuilder

app = flask.Flask(__name__)
app.config["DEBUG"] = True
CORS(app)

graph_builder = GraphBuilder()

@app.route('/api/v1/')
def home():
    return jsonify(message="Server running!"), 202


@app.route('/api/v1/graph/friends', methods=['POST', 'GET'])
def friends_graph():
    if 'username' in request.args:
        username = request.args['username']

        graph, status = graph_builder.get_friends_graph(username)
        response = jsonify(graph)
        response.headers.add("Access-Control-Allow-Origin", "*")
        return response, status

    response = jsonify(message="No username on parameters")
    return response, 402

if __name__ == "__main__":
    app.run(port=5000)