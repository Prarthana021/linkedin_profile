from flask import Flask, jsonify, request

from scrape_profile import scrape_linkedin_profile
from flask_cors import CORS

app = Flask(__name__)
CORS(app,supports_credentials=True)  # Enable CORS for all routes and origins



@app.route("/scrape", methods=["POST"])
def scrape():
    try:
        linkedin_url = request.get_json().get("url")
        profile_data = scrape_linkedin_profile(linkedin_url)
        return jsonify(profile_data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    


if __name__ == "__main__":
    app.run(debug=True)
