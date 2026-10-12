import csv
import os

def get_scholarships_data():
    """Helper function to load scholarship data from the CSV file."""
    csv_path = os.path.join(os.path.dirname(__file__), '../data/scholarships.csv')
    scholarships = []
    try:
        with open(csv_path, mode='r', encoding='utf-8') as file:
            reader = csv.DictReader(file)
            for row in reader:
                # Normalize types
                row['min_percentage'] = float(row['min_percentage'])
                row['max_family_income'] = float(row['max_family_income'])
                row['award_amount'] = float(row['award_amount'])
                scholarships.append(row)
    except Exception as e:
        print(f"Error loading CSV data: {e}")
    return scholarships

def handle_assistant_query(question: str) -> str:
    """
    Evaluates incoming questions against deterministic rules using the CSV dataset.
    """
    q_lower = question.lower().strip()
    scholarships = get_scholarships_data()

    if not scholarships:
        return "Sorry, the scholarship dataset is currently unavailable."

    # Rule 1: Lowest Cutoff
    if "lowest cutoff" in q_lower or "minimum percentage" in q_lower:
        # Find scholarship with the lowest min_percentage requirement
        lowest = min(scholarships, key=lambda x: x['min_percentage'])
        return (f"The scholarship with the lowest percentage cutoff is {lowest['name']} "
                f"({lowest['min_percentage']}% required, requiring family income under "
                f"₹{int(lowest['max_family_income']):,}).")

    # Rule 2: Highest Award / Amount
    if "highest award" in q_lower or "maximum amount" in q_lower or "highest scholarship" in q_lower:
        highest = max(scholarships, key=lambda x: x['award_amount'])
        return (f"The scholarship with the highest award amount is {highest['name']} "
                f"offering ₹{int(highest['award_amount']):,} (requires at least "
                f"{highest['min_percentage']}%).")

    # Rule 3: Count of scholarships
    if "how many" in q_lower or "total scholarships" in q_lower:
        return f"There are currently {len(scholarships)} sample scholarships available in the dataset."

    # Rule 4: List names / categories
    if "list" in q_lower or "what scholarships" in q_lower or "names" in q_lower:
        names = ", ".join([s['name'] for s in scholarships])
        return f"The available sample scholarships are: {names}."

    # Default fallback response for unsupported questions
    return ("I am a rule-based assistant. I can answer questions about the lowest cutoff, "
            "highest award, total count, or listing of available scholarships.")