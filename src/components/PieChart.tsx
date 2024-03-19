import Chart from "react-google-charts";
import { PieChartProps } from "../interfaces/interfaces";

function PieChart({ balance, interest, width, height, title }: PieChartProps) {
  const data = [
    ["Amount", "USD"],
    ["Principal Paid", balance],
    ["Interest Paid", interest],
  ];

  const options = {
    title: "Principal and Interest",
    backgroundColor: "transparent",
    legend: {
      position: "bottom",
      textStyle: {
        fontName: "Inter",
        fontSize: 14,
        bold: true,
      },
    },
    titlePosition: "none",
    pieSliceTextStyle: { fontName: "Inter", fontSize: 13 },
    slices: {
      0: { color: "#0d98ba" },
      1: { offset: 0.1, color: "#ffc233" },
    },
    chartArea: { width: "100%", height: "80%" },
  };

  return (
    <div style={{ display: "inline-block" }}>
      {title ? (
        <caption
          style={{
            textAlign: "center",
            width: `${width}px`,
            margin: "auto",
            padding: 0,
            fontWeight: "bold",
          }}
        >
          {title}
        </caption>
      ) : (
        ""
      )}
      <div style={{ width: `${width}px`, height: `${height}px` }}>
        <Chart
          chartType="PieChart"
          data={data}
          options={options}
          width={"100%" /*`${width}px`*/}
          height={"100%" /*`${height}px`*/}
          formatters={[
            {
              type: "NumberFormat",
              column: 1,
              options: {
                prefix: "$",
                negativeColor: "red",
                negativeParens: true,
              },
            },
          ]}
        />
      </div>
    </div>
  );
}

export default PieChart;
