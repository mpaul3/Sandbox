import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: []
})
export class AppComponent {
  public usersQuery = { measures: ["Users.count"] };
  public ordersQuery = { measures: ["Orders.count"] };
  public shippedOrdersQuery = {
    measures: ["Orders.count"],
    filters: [
      {
        dimension: "Orders.status",
        operator: "equals",
        values: ["shipped"]
      }
    ]
  };
  public lineChartQuery = {
    measures: ["Users.count"],
    timeDimensions: [
      {
        dimension: "Users.createdAt",
        dateRange: ["2017-01-01", "2018-12-31"],
        granularity: "month"
      }
    ]
  };
  public stackedBarChartQuery = {
    measures: ["Orders.count"],
    dimensions: ["Orders.status"],
    timeDimensions: [
      {
        dimension: "Orders.createdAt",
        dateRange: ["2017-01-01", "2018-12-31"],
        granularity: "month"
      }
    ]
  };

  constructor() {}

  ngOnInit() {}
}
