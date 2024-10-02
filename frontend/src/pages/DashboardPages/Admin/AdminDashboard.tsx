import Container from "@/components/ui/Container";
import { AuthContext } from "@/contexts/AuthProvider";
import useAxios from "@/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { UsersRound, SquareCheckBig, HeartHandshake, TrendingUp   } from "lucide-react";
import { FunctionComponent, useContext } from "react";
import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, Cell, Label, Pie, PieChart, XAxis, YAxis } from "recharts";

const AdminDashboard = () => {
  const axiosSecure = useAxios();
  const { user } = useContext(AuthContext);
  const { data: stats } = useQuery({
    queryKey: ["admin-stat"],
    queryFn: async () => {
      const res = await axiosSecure.get("admin-stat");
      return res.data;
    },
  });
  const { data: revenue = [] } = useQuery({
    queryKey: ["revenue-stats"],
    queryFn: async () => {
      const data = await axiosSecure.get("/revenue-stats");
      const result = await data.data;
      return result;
    },
  });
  console.log(revenue);
 

  const chartConfig = {
    totalAmount: {
      label: "Total Amount",
      color: "#ed9fc2",
    },
    Facial: {
      label: "Facial",
      color: "ccc",
    },
    Pedicure: {
      label: "Pedicure",
      color: "#9fedcd",
    },
    Makeover: {
      label: "Makeover",
      color: "#a8ed9f",
    },
    Manicure: {
      label: "Manicure",
      color: "#9fa1ed",
    },
    "Nail special": {
      label: "Nail special",
      color: "#e9ed9f",
    },
    Combo: {
      label: "Combo",
      color: "#edb59f",
    },
  } satisfies ChartConfig;
  return (
    <Container>
      <div className="text-center my-10">
        <h1 className="font-libre text-rose-300">
          --- Welcome Back,{user?.displayName} ---
        </h1>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        <div className="flex items-center justify-center bg-blue-200 p-4 rounded-lg ">
          <div>
            <TrendingUp className="w-14 h-12" />
          </div>
          <div>
            <p>${stats?.revenue}</p>
            <p className="font-bold font-libre">Revenue</p>
          </div>
        </div>
        <div className="flex items-center justify-center  bg-rose-200  rounded-lg ">
          <div>
            <UsersRound className="w-14 h-12" />
          </div>
          <div>
            <p>{stats?.users}</p>
            <p className="font-bold font-libre">Users</p>
          </div>
        </div>
        <div className="flex items-center justify-center  bg-purple-200 p-10 rounded-lg ">
          <div>
            <SquareCheckBig className="w-14 h-12" />
          </div>
          <div>
            <p>{stats?.appointments}</p>
            <p className="font-bold font-libre">Bookings</p>
          </div>
        </div>
        <div className="flex items-center justify-center bg-green-200 p-4 rounded-lg ">
          <div>
            <HeartHandshake className="w-14 h-12" />
          </div>
          <div>
            <p>{stats?.services}</p>
            <p className="font-bold font-libre">Services</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 max-h-full items-center gap-5">
        <div className="w-full h-full">
          <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
            <BarChart accessibilityLayer data={revenue}>
              <YAxis dataKey="totalAmount" type="number" hide />
              <XAxis
                dataKey="service_category"
                type="category"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tick={{ fill: "hsl(var(--foreground))" }}
                tickFormatter={(value) =>
                  chartConfig[value as keyof typeof chartConfig]?.label
                }
              />
              <ChartLegend
                content={
                  <ChartLegendContent nameKey={revenue.service_category} />
                }
              />
              <Bar dataKey="totalAmount" layout="horizontal" radius={5}></Bar>
            </BarChart>
          </ChartContainer>
        </div>
        <div className="w-full h-full">
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[250px]"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={revenue}
                dataKey="totalAmount"
                nameKey="service_category"
                innerRadius={60}
                strokeWidth={5}
              >
                {revenue.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={
                      chartConfig[
                        entry.service_category as keyof typeof chartConfig
                      ]?.color
                    }
                  />
                ))}
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-foreground text-3xl font-bold"
                          >
                            {stats?.revenue}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground"
                          >
                            Revenue
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </Pie>
              <ChartLegend content={<ChartLegendContent />} />
            </PieChart>
          </ChartContainer>
        </div>
      </div>
    </Container>
  );
};

export default AdminDashboard;