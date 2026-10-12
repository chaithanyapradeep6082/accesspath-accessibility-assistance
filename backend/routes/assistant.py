from flask import Blueprint, request, jsonify
from services.assistant_service import handle_assistant_query

# Create a Flask Blueprint for assistant routes
assistant_bp = Blueprint('assistant', __name__)

@assistant_bp.route('/ask', methods=['POST'])
def ask_question():
    """
    Endpoint to handle rule-based scholarship queries.
    Expects a JSON payload with a 'question' field.
    """
    try:
        data = request.get_json()
        
        if not data or 'question' not in data:
            return jsonify({
                "error": "Invalid request. Please provide a 'question' field in JSON format."
            }), 400

        question = data.get('question', '').strip()
        
        if not question:
            return jsonify({
                "error": "Question cannot be empty."
            }), 400

        # Process the question using the rule-based assistant service
        answer = handle_assistant_query(question)

        return jsonify({
            "question": question,
            "answer": answer
        }), 200

    except Exception as e:
        return jsonify({
            "error": f"An error occurred while processing your request: {str(e)}"
        }), 500