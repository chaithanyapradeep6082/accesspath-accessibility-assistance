import csv
from pathlib import Path

from flask import Blueprint, jsonify

scholarships_bp = Blueprint("scholarships", __name__)

DATA_FILE = (
    Path(__file__).resolve().parents[1]
    / "data"
    / "scholarships.csv"
)

DEMO_NOTICE = (
    "These scholarship records are illustrative demonstration data, "
    "not verified live opportunities."
)


@scholarships_bp.get("/api/scholarships")
def get_scholarships():
    """Return scholarship records from the project CSV dataset."""

    if not DATA_FILE.is_file():
        return jsonify({
            "error": "The scholarship dataset has not been added yet.",
            "scholarships": [],
            "notice": DEMO_NOTICE,
        }), 503

    try:
        with DATA_FILE.open(
            mode="r",
            encoding="utf-8-sig",
            newline=""
        ) as csv_file:
            reader = csv.DictReader(csv_file)

            if not reader.fieldnames:
                return jsonify({
                    "error": "The scholarship dataset is empty.",
                    "scholarships": [],
                    "notice": DEMO_NOTICE,
                }), 503

            scholarships = [
                {
                    key: (value or "").strip()
                    for key, value in row.items()
                    if key is not None
                }
                for row in reader
            ]

        return jsonify({
            "scholarships": scholarships,
            "count": len(scholarships),
            "notice": DEMO_NOTICE,
        }), 200

    except (OSError, csv.Error, UnicodeError):
        return jsonify({
            "error": "Unable to read the scholarship dataset.",
            "scholarships": [],
            "notice": DEMO_NOTICE,
        }), 500