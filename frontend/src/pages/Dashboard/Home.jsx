import React, { useEffect, useState } from "react"
import DashboardLayout from "../../components/layout/DashboardLayout";
import { useUserAuth } from "../../hooks/useUserAuth";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import SummaryInfoCard from "../../components/cards/SummaryInfoCard";
import FinanceOverview from "../../components/dashboard/FinanceOverview";
import { LuHandCoins, LuWalletMinimal } from "react-icons/lu";
import { IoMdCard } from "react-icons/io";
import { addThousandsSeparator } from "../../utils/helper";
import RecentTransactions from "../../components/dashboard/RecentTransactions";

const Home = () => {
    useUserAuth();

    const navigate = useNavigate();

    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchDashboardData = async () => {
        if (loading) return;

        setLoading(true);

        try {
            const response = await axiosInstance.get(
                `${API_PATHS.DASHBOARD.GET_DATA}`
            );

            if (response.data) {
                setDashboardData(response.data);
            }
        } catch (error) {
            console.log("Something went wrong. Please try again.", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDashboardData();
        return () => { };
    }, []);


    return (
        <DashboardLayout activeMenu="Home">
            <div className="my-5 mx-auto">
                <div id="summary" className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <SummaryInfoCard
                        icon={<IoMdCard />}
                        label="Total Balance"
                        value={addThousandsSeparator(dashboardData?.totalBalance || 0)}
                        color="bg-blue-700"
                    />

                    <SummaryInfoCard
                        icon={<LuWalletMinimal />}
                        label="Total Income"
                        value={addThousandsSeparator(dashboardData?.totalIncome || 0)}
                        color="bg-blue-700"
                    />

                    <SummaryInfoCard
                        icon={<LuHandCoins />}
                        label="Total Expenses"
                        value={addThousandsSeparator(dashboardData?.totalExpenses || 0)}
                        color="bg-blue-700"
                    />

                </div>

                <div id="recent=transactions" className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <RecentTransactions
                        transactions={dashboardData?.recentTransactions}
                        onSeeMore={() => navigate("/expense")}
                    />

                    <FinanceOverview 
                    totalBalance={dashboardData?.totalBalance || 0}
                    totalIncome={dashboardData?.totalIncome || 0}
                    totalExpense={dashboardData?.totalExpense || 0}
                    />
                </div>


            </div>
        </DashboardLayout>
    )
}
export default Home