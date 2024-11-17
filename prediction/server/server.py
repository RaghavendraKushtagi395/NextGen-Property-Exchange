from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app,)
import util

app = Flask(__name__)

# Load the saved artifacts (model, data columns) when the server starts
util.load_save_artifacts()

@app.route('/get_location_names', methods=['GET'])
def get_location_names():
    response = jsonify({
        'locations': util.get_location_names()  # Corrected this line
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/predict_home_price', methods=['POST'])
def predict_home_price():
    try:
        total_sqft = float(request.form['total_sqft'])
        location = request.form['location']
        bhk = int(request.form['bhk'])
        bath = int(request.form['bath'])

        estimated_price = util.get_estimated_price(location, total_sqft, bhk, bath)

        response = jsonify({
            'estimated_price': estimated_price
        })
        response.headers.add('Access-Control-Allow-Origin', '*')

        return response
    except Exception as e:
        response = jsonify({'error': str(e)})
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response, 500  # Return HTTP 500 status code for internal server errors

if __name__ == "__main__":
    print("Starting Python Flask server for House price prediction...")
    app.run(debug=True)  # Use debug=True for better error reporting
