
from flask import Blueprint, jsonify, request

from services.eligibility_service import check_eligibility


eligibility_bp = Blueprint("eligibility", __name__)


@eligibility_bp.route("/api/eligibility", methods=["POST"])
def check_user_eligibility():
    if not request.is_json:
        return jsonify({
            "error": "Content-Type must be application/json."
        }), 415

    user_data = request.get_json(silent=True)

    if not isinstance(user_data, dict):
        return jsonify({
            "error": "Request body must be a valid JSON object."
        }), 400

    try:
        result = check_eligibility(user_data)
        return jsonify(result), 200

    except ValueError as error:
        return jsonify({"error": str(error)}), 400

    except FileNotFoundError:
        return jsonify({
            "error": "Scholarship dataset is unavailable."
        }), 503

    except OSError:
        return jsonify({
            "error": "Unable to read the scholarship dataset."
        }), 500
