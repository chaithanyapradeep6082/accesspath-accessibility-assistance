
from flask import Flask, jsonify
from flask_cors import CORS

from routes.scholarships import scholarships_bp
from routes.eligibility import eligibility_bp
from routes.assistant import assistant_bp


def create_app():
    app = Flask(__name__)

    # Allow requests from the local Vite frontend.
    CORS(
        app,
        resources={
            r"/api/*": {
                "origins": [
                    "http://localhost:5173",
                    "http://127.0.0.1:5173"
                ]
            }
        }
    )

    # Register API route blueprints.
    app.register_blueprint(scholarships_bp)
    app.register_blueprint(eligibility_bp)
    app.register_blueprint(assistant_bp)

    @app.route("/api/health", methods=["GET"])
    def health_check():
        return jsonify({
            "status": "success",
            "message": "AccessPath backend is running"
        }), 200

    @app.route("/", methods=["GET"])
    def home():
        return jsonify({
            "message": "Welcome to the AccessPath API",
            "health": "/api/health",
            "scholarships": "/api/scholarships"
        }), 200

    @app.errorhandler(404)
    def not_found(error):
        return jsonify({
            "status": "error",
            "message": "API endpoint not found"
        }), 404

    return app


app = create_app()


if __name__ == "__main__":
    app.run(
        host="127.0.0.1",
        port=5000,
        debug=True
    )
