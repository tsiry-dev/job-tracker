import AppLayout from "@/layouts/auth/AppLayout";
import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";
import { Package, ShoppingCart, DollarSign, Users, BookUser, User } from "lucide-react";
import MainTitle from "@/components/app/MainTitle";
import Badge from "@/components/app/Badge";

export default function Dashboard() {
  const barChartRef = useRef<HTMLDivElement>(null);
  const lineChartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let barChart: echarts.ECharts | null = null;
    let lineChart: echarts.ECharts | null = null;

    // --- Bar Chart ---
    if (barChartRef.current) {
      barChart = echarts.init(barChartRef.current);
      barChart.setOption({
        title: { text: "Salaires par mois" },
        tooltip: {},
        xAxis: { data: ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil", "Août", "Sept", "Oct", "Nov", "Déc"] },
        yAxis: {},
        series: [
          {
            name: "Ventes",
            type: "bar",
            data: [200000, 400000, 600000, 800000, 1000000, 1400000],
            itemStyle: { color: "#0891b2" },
          },
        ],
      });
    }

    // --- Line Chart ---
    if (lineChartRef.current) {
      lineChart = echarts.init(lineChartRef.current);
      lineChart.setOption({
        title: { text: "Eleves par mois" },
        tooltip: { trigger: "axis" },
        xAxis: { type: "category", data: ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin"] },
        yAxis: { type: "value" },
        series: [
          {
            data: [2, 4, 8, 10, 12],
            type: "line",
            smooth: true,
            areaStyle: { color: "rgba(6, 182, 212, 0.2)" },
            lineStyle: { color: "#06b6d4" },
          },
        ],
      });
    }

    // Rend les charts responsives
    const handleResize = () => {
      barChart?.resize();
      lineChart?.resize();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      barChart?.dispose();
      lineChart?.dispose();
    };
  }, []);

  const stats = [
    { label: "Vagues", value: 120, icon: <BookUser className="text-cyan-700" size={28} /> },
    { label: "Eleves", value: 22, icon: <User className="text-green-600" size={28} /> ,actif: 14, inactif: 8},
    { label: "Salaire", value: "800 000 AR", icon: <DollarSign className="text-yellow-500" size={28} /> },
    { label: "Salaire", value: "800 000 AR", icon: <DollarSign className="text-yellow-500" size={28} /> },
    { label: "Salaire", value: "800 000 AR", icon: <DollarSign className="text-yellow-500" size={28} /> },
    { label: "Clients", value: 350, icon: <Users className="text-purple-600" size={28} /> },
  ];

  return (
    <AppLayout title="Dashboard">
      <div className="p-6 space-y-6">
        <MainTitle>📊 Dashboard</MainTitle>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white shadow rounded-xl p-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                    <div className="p-3 rounded-full bg-gray-100">{stat.icon}</div>
                    <div>
                        <p className="text-gray-500">{stat.label}</p>
                        <h2 className="text-2xl font-bold">{stat.value}</h2>
                    </div>
                </div>
                {
                    stat.actif &&
                    <div className="flex flex-col items-end gap-2">
                        <Badge icon type="success">
                            <span>Actif</span>&nbsp;&nbsp;
                            <span className="w-7 h-7 flex items-center justify-center bg-green-500 text-white rounded-full">
                            {stat.actif}
                            </span>
                        </Badge>
                        <Badge icon type="error">
                            <span>Actif</span>&nbsp;&nbsp;
                            <span className="w-7 h-7 flex items-center justify-center bg-red-500 text-white rounded-full">
                            {stat.inactif}
                            </span>
                        </Badge>
                    </div>

                }
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white shadow rounded-xl p-4">
            <div ref={barChartRef} style={{ height: "300px", width: "100%" }}></div>
          </div>
          <div className="bg-white shadow rounded-xl p-4">
            <div ref={lineChartRef} style={{ height: "300px", width: "100%" }}></div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
