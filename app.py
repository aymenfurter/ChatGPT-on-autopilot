import subprocess
import hashlib
from flask import Flask, request, jsonify

app = Flask(__name__)

# Generate a random hash on startup
app.secret_key = hashlib.sha256(b'some_random_salt').hexdigest()

# Store the shell output in a list
output_list = []

@app.route('/execute', methods=['POST'])
def execute_command():
    # Get the hash from the request headers
    client_hash = request.headers.get('X-App-Hash')

    # Verify that the hash matches the server hash
    if client_hash != app.secret_key:
        return 'Unauthorized', 401

    # Execute the command
    command = request.form['command']
    result = subprocess.check_output(command.split())

    # Add the command output to the output list
    output_list.append(result)

    return result

@app.route('/output', methods=['GET'])
def get_output():
    # Get the hash from the request headers
    client_hash = request.headers.get('X-App-Hash')

    # Verify that the hash matches the server hash
    if client_hash != app.secret_key:
        return 'Unauthorized', 401

    # Return the output list as JSON
    return jsonify(output_list)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
