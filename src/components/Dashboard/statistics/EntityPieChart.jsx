import React from 'react';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const EntityPieChart = ({data}) => {
    const total = data.instructors + data.categories + data.courses;

    const chartData = {
        labels: ["Instructors", "Categories", "Courses"],
        datasets: [
            {
                label: "Statistics",
                data: [data.instructors, data.categories, data.courses],
                backgroundColor: ["#4318FF", "#6AD2FF", "#EFF4FB"],
                borderColor: "#fff",
                borderWidth: 2,
            },
        ],
    };
    const options = {
        responsive: true,
        plugins: {
            legend: { position: "bottom" },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        const value = context.raw;
                        const percentage = ((value / total) * 100).toFixed(1);
                        return `${context.label}: ${value} (${percentage}%)`;
                    },
                },
            },
        },
    };

    return (
        <div className="bg-white w-full max-w-lg mx-auto">
            <h2 className="text-xl font-medium mb-4">Statistics</h2>
            <Pie data={chartData} options={options} />
        </div>
    );
};

export default EntityPieChart;