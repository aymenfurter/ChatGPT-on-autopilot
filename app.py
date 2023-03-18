import subprocess
import hashlib
from flask import Flask, request, jsonify
from flask_cors import CORS
import secrets

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

salt = secrets.token_urlsafe(16)
app.secret_key = hashlib.sha256(salt.encode()).hexdigest()
print(f"Secret key: {app.secret_key}")
output_list = []

@app.route('/execute', methods=['POST'])
def execute_command():
    client_hash = request.form.get('auth')
    command = request.form['command']
    
    if client_hash != app.secret_key:
        return 'Unauthorized', 401
    
    # Store the shell output in a list
    output_list = []
    output_list.append("$ " + command)
    ps = subprocess.Popen(command,shell=True,stdout=subprocess.PIPE,stderr=subprocess.STDOUT)
    result = ps.communicate()[0]

    resultAsString = result.decode("utf-8")
    output_list.append(resultAsString)

    return result

@app.route('/output', methods=['GET'])
def get_output():
    client_hash = request.args.get('auth')

    if client_hash != app.secret_key:
        return 'Unauthorized', 401

    output_string = '\n'.join(output_list)

    return output_string

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
