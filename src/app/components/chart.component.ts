import { Component, OnInit, Input } from "@angular/core";
import { CubejsClient } from "@cubejs-client/ngx";
import { Subject } from "rxjs";
import * as moment from "moment";

@Component({
  selector: "app-chart",
  templateUrl: "./chart.component.html",
  styleUrls: []
})
export class ChartComponent implements OnInit {
  @Input() chartType;
  @Input() query;
  @Input() title;

  constructor(private cubejs: CubejsClient) {}

  public chartData;
  public chartLabels;
  public chartOptions: any = {
    responsive: true,
    maintainAspectRatio: false
  };
  public chartColors;
  public lineChartColors = [
    {
      borderColor: "#7DB3FF",
      backgroundColor: "rgba(106, 110, 229, .16)"
    }
  ];

  public pieChartColors = [
    {
      backgroundColor: [
        "#7DB3FF",
        "#49457B",
        "#FF7C78",
        "#FED3D0",
        "#6F76D9",
        "#9ADFB4",
        "#2E7987"
      ]
    }
  ];
  public barChartColors = [
    {
      borderColor: "#7DB3FF",
      backgroundColor: "#7DB3FF"
    },
    {
      borderColor: "#49457B",
      backgroundColor: "#49457B"
    },
    {
      borderColor: "#FF7C78",
      backgroundColor: "#FF7C78"
    }
  ];

  private querySubject;
  private ready = false;
  private showChart = false;

  private dateFormatter = ({ x }) => moment(x).format("MMM DD");
  private numberFormatter = x => x.toLocaleString();
  private capitalize = ([first, ...rest]) =>
    first.toUpperCase() + rest.join("").toLowerCase();

  commonSetup(resultSet) {
    this.chartLabels = resultSet.chartPivot().map(this.dateFormatter);
    this.chartData = resultSet.seriesNames().map(({ key, title }) => ({
      data: resultSet.chartPivot().map(element => element[key]),
      label: this.capitalize(title.split(",")[0])
    }));
  }

  setLineChartData() {
    this.chartOptions = {
      ...this.chartOptions,
      scales: {
        xAxes: [
          {
            ticks: {
              maxTicksLimit: 4,
              maxRotation: 0
            }
          }
        ]
      },
      legend: {
        display: false
      }
    };
    this.chartColors = this.lineChartColors;
  }

  setPieChartData() {
    this.chartColors = this.pieChartColors;
  }

  setStackedBarChartData() {
    this.chartType = "bar";
    this.chartColors = this.barChartColors;
    this.chartOptions = {
      ...this.chartOptions,
      scales: {
        xAxes: [
          {
            stacked: true,
            ticks: {
              maxTicksLimit: 4,
              maxRotation: 0
            }
          }
        ],
        yAxes: [{ stacked: true }]
      },
      legend: {
        position: "bottom"
      }
    };
  }

  resultChanged(resultSet) {
    this.commonSetup(resultSet);
    if (this.chartType === "line") {
      this.setLineChartData();
    } else if (this.chartType === "pie") {
      this.setPieChartData();
    } else if (this.chartType === "stackedBar") {
      this.setStackedBarChartData();
    } else if (this.chartType === "singleValue") {
      this.chartData = this.numberFormatter(
        resultSet.chartPivot()[0][resultSet.seriesNames()[0].key]
      );
    }
    this.ready = true;
  }

  ngOnInit() {
    this.showChart = this.chartType !== "singleValue";
    this.querySubject = new Subject();
    this.resultChanged = this.resultChanged.bind(this);
    this.cubejs
      .watch(this.querySubject)
      .subscribe(this.resultChanged, err => console.log("HTTP Error", err));

    this.querySubject.next(this.query);
  }
}
