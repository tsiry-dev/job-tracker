import AppLayout from "@/layouts/auth/AppLayout";
import React, { act, useEffect, useRef } from "react";
import * as echarts from "echarts";
import { Package, ShoppingCart, DollarSign, Users, BookUser, User } from "lucide-react";
import MainTitle from "@/components/app/MainTitle";
import Badge from "@/components/app/Badge";
import type { Vague } from "@/types/vague";
import type { Student } from "@/types/student";


type DashboardProps = {
    vagues: Vague[];
    students: Student[];
}

export default function Dashboard({vagues, students}: DashboardProps) {


    console.log(vagues);
    console.log(students);


  const barChartRef = useRef<HTMLDivElement>(null);
  const lineChartRef = useRef<HTMLDivElement>(null);

  const SALAIRE_PER_VAGUE = 250000;

  const normaleSalaire = () =>  {
      const nbVagues = vagues.length;
      const total = +SALAIRE_PER_VAGUE * +nbVagues;
      return total;
  }

  const actifVagues = () => vagues.filter(s => s.status);
  const actifStudents = () => students.filter(s => s.status);

  const salairePerStudents = () => {
      let total = 0;
      const nbStudents = actifStudents().length;

      const vaguesActifs = actifVagues().length;
      const studentsActifs = actifStudents().length;

      const correctStudent = vaguesActifs * 8;

      if(nbStudents >= correctStudent) {
          total = vaguesActifs * SALAIRE_PER_VAGUE;
      }else {
          total = vaguesActifs * (SALAIRE_PER_VAGUE / 2);
      }
      return total;
  }



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
            data: [salairePerStudents(), 400000, 600000, 800000, 1000000, 1400000],
            itemStyle: { color: "#0891b2" },
          },
        ],
      });
    }

    // --- Line Chart ---
    if (lineChartRef.current) {
      lineChart = echarts.init(lineChartRef.current);
      lineChart.setOption({
        title: { text: "Eleves actif par mois" },
        tooltip: { trigger: "axis" },
        xAxis: { type: "category", data: ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin","Juil", "Août", "Sept", "Oct", "Nov", "Déc"] },
        yAxis: { type: "value" },
        series: [
          {
            data: [actifStudents().length, 14,26, 38, 50, 62],
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
    {
        label: "Vagues",
        value: vagues.length,
        icon: <BookUser className="text-cyan-700" size={28} /> ,
        actif: vagues.filter(s => s.status).length,
        inactif: vagues.filter(s => !s.status).length
    },
    {
        label: "Eleves",
        value: students.length,
        icon: <User className="text-green-600" size={28} /> ,
        actif: students.filter(s => s.status).length,
        inactif: students.filter(s => !s.status).length
    },
    {
        label: `Salaire en fonction du vague (${actifVagues().length})`,
        value: `${normaleSalaire()} AR`, icon: <DollarSign className="text-yellow-500" size={28} /> },
    {
        label: `Salaire en fonction des eleves (${actifStudents().length})`,
        value: `${salairePerStudents()} AR`,
        icon: <Users
        className="text-purple-600" size={28} />
    },
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
                            <span className="text-[8px]">Actif</span>&nbsp;&nbsp;
                            <span className="w-5 h-5 flex items-center justify-center bg-green-500 text-white rounded-full">
                            {stat.actif}
                            </span>
                        </Badge>
                        <Badge icon type="error">
                            <span className="text-[8px]">Inactif</span>&nbsp;&nbsp;
                            <span className="w-5 h-5 flex items-center justify-center bg-red-500 text-white rounded-full">
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
