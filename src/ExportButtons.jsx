import React from "react";
import * as XLSX from "xlsx";

function ExportButtons({ orders }){

  // Function to export data as EXCEL
  function exportToExcel(){
    const worksheet = XLSX.utils.json_to_sheet(orders);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Orders");
    XLSX.writeFile(workbook, "order_details.xlsx");
  }

  // Function to export data as JSON
  function exportToJSON(){
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(orders, null, 2))}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = "order_details.json";
    link.click();
  }

  return(
    <div>
      <button className="export-btn" onClick={exportToExcel}>Export as EXCEL</button>
      <button className="export-btn" onClick={exportToJSON}>Export as JSON</button>
    </div>
  );

}

export default ExportButtons;
