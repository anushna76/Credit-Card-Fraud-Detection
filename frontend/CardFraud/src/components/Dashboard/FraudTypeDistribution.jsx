import { Card, CardHeader, CardTitle, CardContent } from "@/components/Dashboard/ui/Card";
import { ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import { fraudTypeDistribution } from "@/components/data/mockData";

export default function FraudTypeDistribution() {
  return (
    <Card className="shadow-sm border border-gray-100">
      <CardHeader className="px-5 py-4 border-b border-gray-100">
        <CardTitle className="text-lg font-heading font-semibold text-gray-800">
          Fraud Type Distribution
        </CardTitle>
      </CardHeader>
      <CardContent className="p-5">
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={fraudTypeDistribution}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                dataKey="value"
                labelLine={false}
              >
                {fraudTypeDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}