import React from 'react';
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip,
    Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import {BadgeCheck} from 'lucide-react'

ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip,
    Legend
);


const SubscriptionLineChart = ({ data }) => {
    const chartData = {
        labels: data.map((d) => d.month),
        datasets: [
            {
                label: "Deposits",
                data: data.map((d) => d.deposit),
                fill: false,
                borderColor: "#4318FF",
                backgroundColor: "#4318FF",
                tension: 0.3,
            },
            {
                label: "Withdrawals",
                data: data.map((d) => d.withdraw),
                fill: false,
                borderColor: "#6AD2FF",
                backgroundColor: "#6AD2FF",
                tension: 0.3,
            }
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { position: "top" },
            tooltip: { intersect: false },
        },
        scales: {
            y: { beginAtZero: true },
        },
    };


    return (
        <div className="bg-white p-6 mt-2 rounded shadow-md w-full max-w-xl mx-auto">
            <h2 className="text-3xl font-bold ">$37.5K</h2>
            <p className="text-[#A3AED0] font-medium">Wallet Balance</p>
            <p className="flex items-center text-[#05CD99] text-sm font-bold">
                <BadgeCheck color="#05CD99" size={16}/>
                <span className="ml-2">On your account</span>
            </p>
            <Line data={chartData} options={options} />
        </div>

    );
};

export default SubscriptionLineChart;