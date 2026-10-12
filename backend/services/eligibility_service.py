
import csv
import math
import os
from pathlib import Path


BACKEND_DIR = Path(__file__).resolve().parents[1]
DEFAULT_CSV_PATH = BACKEND_DIR / "data" / "scholarships.csv"


def normalize_key(value):
    return "".join(
        character.lower()
        for character in str(value or "")
        if character.isalnum()
    )


def find_value(row, aliases):
    normalized = {
        normalize_key(key): value
        for key, value in row.items()
        if key is not None
    }

    for alias in aliases:
        value = normalized.get(normalize_key(alias))
        if value is not None and str(value).strip():
            return str(value).strip()

    return None


def parse_number(value, field_name, minimum=0, maximum=None):
    try:
        number = float(str(value).replace(",", "").strip())
    except (TypeError, ValueError):
        raise ValueError(f"{field_name} must be a valid number.")

    if not math.isfinite(number) or number < minimum:
        raise ValueError(f"{field_name} must be at least {minimum}.")

    if maximum is not None and number > maximum:
        raise ValueError(f"{field_name} must not exceed {maximum}.")

    return number


def optional_limit(value):
    if value is None or not str(value).strip():
        return None

    try:
        number = float(str(value).replace(",", "").strip())
    except (TypeError, ValueError):
        return None

    return number if math.isfinite(number) and number >= 0 else None


def split_categories(value):
    if not value:
        return []

    return [
        item.strip().casefold()
        for item in str(value).replace(";", ",").split(",")
        if item.strip()
    ]


def evaluate_scholarship(row, percentage, income, category):
    reasons = []
    review_reasons = []

    min_raw = find_value(row, [
        "minimum_percentage", "min_percentage", "minimum_marks", "min_marks"
    ])
    max_income_raw = find_value(row, [
        "maximum_income", "max_income", "income_limit",
        "annual_income_limit", "family_income_limit"
    ])
    category_raw = find_value(row, [
        "eligible_category", "eligible_categories", "categories", "category"
    ])

    minimum = optional_limit(min_raw)
    maximum_income = optional_limit(max_income_raw)

    if min_raw and minimum is None:
        review_reasons.append("Minimum percentage rule is unclear.")

    if max_income_raw and maximum_income is None:
        review_reasons.append("Income limit is unclear.")

    if minimum is not None and percentage < minimum:
        reasons.append(f"Percentage is below the required {minimum:g}%.")

    if maximum_income is not None and income > maximum_income:
        reasons.append(f"Income exceeds the listed limit of ₹{maximum_income:g}.")

    allowed = split_categories(category_raw)
    unrestricted = {"all", "any", "open", "all categories"}

    if allowed and not unrestricted.intersection(allowed):
        if category.casefold() not in allowed:
            reasons.append("Category does not match the listed requirement.")

    if not min_raw and not max_income_raw and not category_raw:
        review_reasons.append("No supported eligibility rules were found.")

    if review_reasons:
        status = "needs_review"
    elif reasons:
        status = "ineligible"
    else:
        status = "eligible"

    return status, reasons + review_reasons


def check_eligibility(user_data, csv_path=None):
    if not isinstance(user_data, dict):
        raise ValueError("Request body must be a JSON object.")

    percentage_value = user_data.get("percentage")
    income_value = user_data.get("familyIncome", user_data.get("family_income"))
    category_value = user_data.get("category")

    if percentage_value is None or str(percentage_value).strip() == "":
        raise ValueError("Academic percentage is required.")

    if income_value is None or str(income_value).strip() == "":
        raise ValueError("Annual family income is required.")

    if category_value is None or not str(category_value).strip():
        raise ValueError("Category is required.")

    percentage = parse_number(
        percentage_value, "Academic percentage", minimum=0, maximum=100
    )
    income = parse_number(income_value, "Annual family income")
    category = str(category_value).strip()

    csv_path = Path(
        csv_path
        or os.environ.get("ACCESSPATH_SCHOLARSHIPS_CSV", DEFAULT_CSV_PATH)
    )

    if not csv_path.is_file():
        raise FileNotFoundError(f"Scholarship dataset not found: {csv_path}")

    eligible = []
    ineligible = []
    needs_review = []

    with csv_path.open("r", encoding="utf-8-sig", newline="") as file:
        reader = csv.DictReader(file)

        if not reader.fieldnames:
            raise ValueError("Scholarship CSV has no header row.")

        for index, row in enumerate(reader, start=1):
            if not any(str(value or "").strip() for value in row.values()):
                continue

            name = find_value(
                row, ["name", "scholarship_name", "title", "scheme_name"]
            ) or f"Scholarship {index}"

            status, reasons = evaluate_scholarship(
                row, percentage, income, category
            )

            record = {
                "name": name,
                "details": row,
                "status": status,
                "reasons": reasons,
            }

            if status == "eligible":
                eligible.append(record)
            elif status == "ineligible":
                ineligible.append(record)
            else:
                needs_review.append(record)

    return {
        "eligible_count": len(eligible),
        "eligible_scholarships": eligible,
        "ineligible_count": len(ineligible),
        "ineligible_scholarships": ineligible,
        "needs_review_count": len(needs_review),
        "needs_review": needs_review,
        "notice": (
            "Illustrative demonstration results only. Confirm eligibility "
            "and requirements with the official scholarship provider."
        ),
    }
