import React from 'react';
import {BellDot, User, NotebookText, Folders, Calendar} from "lucide-react";
import SubscriptionLineChart from "./SubscriptionLineChart.jsx";
import EntityPieChart from "./EntityPieChart.jsx";

const Statistics = () => {
    const subscriptionData = [
        {month: "Jan", deposit: 120, withdraw: 50},
        {month: "Feb", deposit: 150, withdraw: 100},
        {month: "Mar", deposit: 170, withdraw: 150},
        {month: "Apr", deposit: 90, withdraw: 110},
        {month: "May", deposit: 200, withdraw: 170},
        {month: "Jun", deposit: 250, withdraw: 180},
        {month: "Jul", deposit: 300, withdraw: 190},
        {month: "Aug", deposit: 280, withdraw: 300},
        {month: "Sep", deposit: 320, withdraw: 400},
        {month: "Oct", deposit: 310, withdraw: 200},
        {month: "Nov", deposit: 330, withdraw: 300},
        {month: "Dec", deposit: 400, withdraw: 350},
    ];
    const entityCounts = {
        instructors: 50,
        categories: 10,
        courses: 36,
    };

    return (
        <div className="container">
            <header className="flex justify-between items-center border-b-1 border-[#E2E6EE]  h-24">
                <h1 className="text-3xl font-medium">Dashboard</h1>
                <span className="cursor-pointer"><BellDot size={24}/></span>
            </header>

            <main className="grid grid-rows-[110px_400px] gap-5 mt-5">
                <section className="grid grid-cols-3 gap-5">
                    <div className="flex flex-col justify-between drop-shadow-md bg-[#FFFFFF] rounded-2xl px-6 py-4">
                        <div className="flex justify-between">
                            <p className="text-3xl font-bold">50</p>
                            <span className="flex justify-center items-center w-10 h-10 bg-sky-100 rounded-md"><User
                                color="#647FBC" size={30}/></span>
                        </div>
                        <p className="font-bold">Instructors</p>
                    </div>
                    <div className="flex flex-col justify-between drop-shadow-md bg-[#FFFFFF] rounded-2xl px-6 py-4">
                        <div className="flex justify-between">
                            <p className="text-3xl font-bold">10</p>
                            <span
                                className="flex justify-center items-center w-10 h-10 bg-sky-100 rounded-md"><NotebookText
                                color="#647FBC" size={30}/></span>
                        </div>
                        <p className="font-bold">Categories</p>
                    </div>
                    <div className="flex flex-col justify-between drop-shadow-md bg-[#FFFFFF] rounded-2xl px-6 py-4">
                        <div className="flex justify-between">
                            <p className="text-3xl font-bold">30</p>
                            <span className="flex justify-center items-center w-10 h-10 bg-sky-100 rounded-md"><Folders
                                color="#647FBC" size={30}/></span>
                        </div>
                        <p className="font-bold">Courses</p>
                    </div>
                </section>
                <section className="grid grid-cols-[_2fr_1fr] gap-5">
                    <div className="flex flex-col justify-between drop-shadow-md bg-[#FFFFFF] rounded-2xl px-6 py-4">
                        <div className="flex justify-between">
                            <p className="text-2xl font-medium">Wallet</p>
                            <span
                                className="flex justify-center items-center w-35 bg-[#F4F7FE] text-[#A3AED0] rounded-md"><Calendar
                                className="mr-2" color="#A3AED0" size={18}/>This month</span>
                        </div>
                        <div>
                            <SubscriptionLineChart data={subscriptionData}/>
                        </div>
                    </div>

                    <div className="flex flex-col justify-between drop-shadow-md bg-[#FFFFFF] rounded-2xl px-6 py-4">
                        <EntityPieChart data={entityCounts} />
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Statistics;