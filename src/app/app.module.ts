import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { ChartsModule } from "ng2-charts";
import { CubejsClientModule } from "@cubejs-client/ngx";

import { AppComponent } from "./app.component";
import { ChartComponent } from "./components/chart.component";

const cubejsOptions = {
  token:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.K9PiJkjegbhnw4Ca5pPlkTmZihoOm42w8bja9Qs2qJg",
  options: {
    apiUrl: "https://react-query-builder.herokuapp.com/cubejs-api/v1"
  }
};

@NgModule({
  declarations: [AppComponent, ChartComponent],
  imports: [
    BrowserModule,
    ChartsModule,
    CubejsClientModule.forRoot(cubejsOptions)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
