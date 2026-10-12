import { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { scholarships } from "../utils/scholarshipCalculations";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function ScholarshipChart() {
  const [view, setView] = useState("chart");

  const chartData = {
    labels: scholarships.map((scholarship) => scholarship.name),
    datasets: [
      {
        label: "Award Amount (₹)",
        data: scholarships.map((scholarship) => scholarship.award_amount),
        backgroundColor: [
          "#4472C4",
          "#70AD47",
          "#ED7D31",
          "#A5A5A5",
          "#FFC000",
          "#5B9BD5",
          "#8064A2",
          "#C0504D"
        ],
        borderWidth: 1
      }
    ]
  };

  const chartOptions = {
    indexAxis: "y",
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true
      },
      title: {
        display: true,
        text: "Scholarship Award Comparison"
      }
    },
    scales: {
      x: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Award Amount (₹)"
        }
      }
    }
  };

  return (
    <section className="scholarship-section">
      <h2>Scholarship Visualization</h2>

      <div className="view-controls">
        <button
          type="button"
          onClick={() => setView("chart")}
          aria-pressed={view === "chart"}
        >
          Chart View
        </button>

        <button
          type="button"
          onClick={() => setView("table")}
          aria-pressed={view === "table"}
        >
          Table View
        </button>
      </div>

      {view === "chart" ? (
        <div
          className="scholarship-chart"
          role="img"
          aria-label="Horizontal bar chart comparing scholarship award amounts"
        >
          <Bar data={chartData} options={chartOptions} />
        </div>
      ) : (
        <div className="scholarship-table-wrapper">
          <table>
            <caption>Scholarship Award Comparison</caption>
            <thead>
              <tr>
                <th scope="col">Scholarship</th>
                <th scope="col">Category</th>
                <th scope="col">Award Amount</th>
              </tr>
            </thead>
            <tbody>
              {scholarships.map((scholarship) => (
                <tr key={scholarship.id}>
                  <td>{scholarship.name}</td>
                  <td>{scholarship.category}</td>
                  <td>
                    ₹{scholarship.award_amount.toLocaleString("en-IN")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default ScholarshipChart;