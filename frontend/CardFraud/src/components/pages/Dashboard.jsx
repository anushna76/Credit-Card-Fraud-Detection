


import AppLayout from "@/components/layout/AppLayout";
import OverviewCards from "../Dashboard/OverviewCards";
import FraudMetricsChart from "../Dashboard/FraudMetricsChart";
import FraudTypeDistribution from "../Dashboard/FraudTypeDistribution";
import RecentFraudTable from "../Dashboard/RecentFraudTable";
import UserAuthorizationPanel from "../Dashboard/UserAuthorizationPanel";
import CardRequestsPanel from "../Dashboard/CardRequestsPanel";
import FraudPreventionPanel from "../Dashboard/FraudPreventionPanel";

export default function Dashboard() {
  return (
    <AppLayout title="Fraud Detection Dashboard">
      {/* Overview Cards */}
      <OverviewCards />

      {/* Dashboard Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Fraud Metrics Chart */}
        <div className="lg:col-span-2">
          <FraudMetricsChart />
        </div>

        {/* Right Column: Fraud Type Distribution */}
        <div className="lg:col-span-1">
          <FraudTypeDistribution />
        </div>

        {/* Recent Fraud Alerts */}
        <div className="lg:col-span-3">
          <RecentFraudTable />
        </div>

        {/* User Authorization Panel */}
        <div className="lg:col-span-3">
          <UserAuthorizationPanel />
        </div>

        {/* Credit Card Requests and Fraud Prevention */}
        <div className="lg:col-span-1">
          <CardRequestsPanel />
        </div>
        <div className="lg:col-span-2">
          <FraudPreventionPanel />
        </div>
      </div>
    </AppLayout>
  );
}