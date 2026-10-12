
import { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function ScholarshipChart({ items, onBack, speak }) {
  const [showTable, setShowTable] = useState(false);

  const chartData = {
    labels: items.map((item) => item.name),
    datasets: [
      {
        label: "Minimum percentage",
        data: items.map((item) => item.min_percentage),
        backgroundColor: "#7664e8",
        borderRadius: 7,
        maxBarThickness: 38,
      },
    ],
  };

  const chartOptions = {
    indexAxis: "y",
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context) => `Minimum percentage: ${context.raw}%`,
        },
      },
    },
    scales: {
      x: {
        min: 0,
        max: 100,
        title: { display: true, text: "Minimum percentage" },
        ticks: { callback: (value) => `${value}%` },
      },
      y: {
        ticks: { autoSkip: false },
      },
    },
  };

  return (
    <section aria-labelledby="explorer-title">
      <button className="text-button back-link" onClick={onBack}>
        ← Return to application
      </button>

      <div className="panel-heading">
        <div>
          <p className="eyebrow">SCHOLARSHIP EXPLORER</p>
          <h2 id="explorer-title">Compare opportunities</h2>
          <p className="muted">
            Explore sample cutoffs, income limits and award amounts.
          </p>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <span className="stat-label">Sample records</span>
          <strong>{items.length}</strong>
        </div>
        <div className="stat-card">
          <span className="stat-label">Lowest cutoff</span>
          <strong>{Math.min(...items.map((x) => x.min_percentage))}%</strong>
        </div>
        <div className="stat-card">
          <span className="stat-label">Highest sample award</span>
          <strong>
            ₹{Math.max(...items.map((x) => x.award_amount)).toLocaleString("en-IN")}
          </strong>
        </div>
      </div>

      <div className="chart-card">
        <div className="chart-title-row">
          <div>
            <h3>Minimum academic percentage</h3>
            <p className="muted tiny">Lower values indicate lower sample cutoffs.</p>
          </div>
          <button
            className="button button-secondary"
            onClick={() => setShowTable((value) => !value)}
            aria-pressed={showTable}
          >
            {showTable ? "Show chart" : "Show data table"}
          </button>
        </div>

        {showTable ? (
          <div className="table-scroll">
            <table>
              <caption>Illustrative scholarship data. Not official requirements.</caption>
              <thead>
                <tr>
                  <th scope="col">Scholarship</th>
                  <th scope="col">Minimum percentage</th>
                  <th scope="col">Maximum income</th>
                  <th scope="col">Sample award</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id}>
                    <th scope="row">{item.name}</th>
                    <td>{item.min_percentage}%</td>
                    <td>₹{item.max_family_income.toLocaleString("en-IN")}</td>
                    <td>₹{item.award_amount.toLocaleString("en-IN")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <>
            <div className="chart-area" role="img" aria-label="Horizontal bar chart comparing the minimum academic percentage of five illustrative scholarships. An equivalent data table is available using the Show data table button.">
              <Bar data={chartData} options={chartOptions} />
            </div>
            <p className="field-hint">
              Chart values are illustrative. Switch to the data table for a text-based alternative.
            </p>
          </>
        )}

        <button
          className="button button-secondary"
          onClick={() =>
            speak(
              items
                .map((item) => `${item.name}: minimum percentage ${item.min_percentage} percent`)
                .join(". ")
            )
          }
        >
          ▶ Read chart data aloud
        </button>
      </div>

      <div className="data-note">
        <strong>How to use these figures</strong>
        <p>
          This demo compares sample values to illustrate accessible data
          exploration. Real eligibility decisions require verified scheme rules.
        </p>
      </div>
    </section>
  );
}
