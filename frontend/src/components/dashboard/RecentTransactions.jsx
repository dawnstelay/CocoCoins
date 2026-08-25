import React from "react";
import { LuArrowRight } from "react-icons/lu";
import TransactionInfoCard from "../cards/TransactionInfoCard";
import moment from "moment";

const RecentTransactions = ({ transactions, onSeeMore }) => {
    return (
        <div className="bg-white p-6 rounded-2xl shadow-md shadow-gray-100 border border-gray-200/50">
            <div className="flex item-center justify-between">
                <h5 className="text-lg"> Recent Transactions</h5>

                <button className="flex items-center gap-3 text-[12px] font-medium text-gray-700 hover:text-blue-500 bg-gray-50 hover:bg-blue-200 px-4 py-2 rounded-lg border border-gray-200/50 cursor-pointer"
                    onClick={onSeeMore}>
                    See All <LuArrowRight className="text-base" />
                </button>
            </div>

            <div className="mt-6">
                {transactions?.slice(0.5)?.map((item) => (
                    <TransactionInfoCard
                        key={item.id}
                        title={item.type == 'expense' ? item.category : item.source}
                        icon={item.icon}
                        date={moment(item.date).format("DD/MM/YYYY")}
                        amount={item.amount}
                        type={item.type}
                        hideDeleteBtn
                    />
                ))}
            </div>

        </div>
    );
};

export default RecentTransactions;