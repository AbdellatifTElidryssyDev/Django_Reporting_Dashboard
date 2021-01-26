function processData(dataset) {
  var result = [];
  dataset = JSON.parse(dataset);
  dataset.forEach((item) => result.push(item.fields));
  return result;
}
$.ajax({
  url: $("#pivot-table-container").attr("data-url"),
  dataType: "json",
  success: function (data) {
    new Flexmonster({
      container: "#pivot-table-container",
      componentFolder: "https://cdn.flexmonster.com/",
      width: "100%",
      height: 430,
      toolbar: true,
      report: {
        dataSource: {
          type: "json",
          data: processData(data),
          mapping: {
            product_category: {
              caption: "Product Category",
            },
            payment_method: {
              caption: "Payment Method",
            },
            shipping_cost: {
              caption: "Shipping Cost",
              type: "number",
            },
            unit_price: {
              caption: "Unit Price",
              type: "number",
            },
          },
        },
        slice: {
          rows: [
            {
              uniqueName: "product_category",
            },
          ],
          columns: [
            {
              uniqueName: "payment_method",
            },
            {
              uniqueName: "[Measures]",
            },
          ],
          measures: [
            {
              uniqueName: "shipping_cost",
              aggregation: "sum",
            },
            {
              uniqueName: "unit_price",
              aggregation: "sum",
            },
          ],
        },
      },
    });
    new Flexmonster({
      container: "#pivot-chart-container",
      componentFolder: "https://cdn.flexmonster.com/",
      width: "100%",
      height: 430,
      //toolbar: true,
      report: {
        dataSource: {
          type: "json",
          data: processData(data),
          mapping: {
            product_category: {
              caption: "Product Category",
            },
            payment_method: {
              caption: "Payment Method",
            },
            shipping_cost: {
              caption: "Shipping Cost",
              type: "number",
            },
            unit_price: {
              caption: "Unit Price",
              type: "number",
            },
          },
        },
        slice: {
          rows: [
            {
              uniqueName: "product_category",
            },
          ],
          columns: [
            {
              uniqueName: "[Measures]",
            },
          ],
          measures: [
            {
              uniqueName: "Price",
              formula: 'sum("shipping_cost") + sum("unit_price")',
              caption: "Price",
            },
          ],
        },
        options: {
          viewType: "charts",
          chart: {
            type: "pie",
          },
        },
      },
    });
  },
});
