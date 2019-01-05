import React, { Component } from "react";
import ReactTable from "react-table";
import { nFormatter } from "../../utils/format";
import "react-table/react-table.css";
import "./Table.css";

export default class Table extends Component {
  columns = [
    {
      Header: "Name",
      accessor: "name",
      width: 400,
      Cell: row => (
        <div
          style={{
            float: "left",
            textTransform: "capitalize"
          }}
        >
          {row.value}
        </div>
      )
    },
    {
      Header: "Volume",
      accessor: "volumes",
      width: 200,
      Cell: row => (
        <div
          style={{
            width: "100%",
            height: "100%"
          }}
        >
          <div
            style={{
              width: "20%",
              height: "100%",
              float: "left",
              textAlign: "left"
            }}
          >
            <span
              className="number"
              style={{ textAlign: "left", lineHeight: "100%" }}
            >
              {row.value ? nFormatter(row.value, 1) : "N/A"}
            </span>
          </div>
        </div>
      )
    },
    {
      Header: "0 - 100%",
      accessor: "percent",
      width: 200,
      Cell: row => (
        <div
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "#dadada",
            borderRadius: "2px"
          }}
        >
          <div
            style={{
              width: `${row.value}%`,
              height: "100%",
              backgroundColor: this.getVolumePercentColor(row.value),
              borderRadius: "2px",
              transition: "all .2s ease-out"
            }}
          />
        </div>
      )
    }
  ];

  getVolumePercentColor(percent) {
    const green = "#85cc00";
    const yellow = "#ffbf00";
    const red = "#ff2e00";
    return percent > 50 ? green : percent > 3 ? yellow : red;
  }

  componentDidMount() {
    this.props.fetchSegments();
  }

  render() {
    return (
      <div className="table-wrapper">
        <ReactTable
          defaultSorted={[
            {
              id: "name",
              desc: false
            }
          ]}
          pageSize={30}
          minRows={7}
          data={this.props.segments}
          columns={this.columns}
          showPagination={false}
          filterable={true}
          loading={this.props.isLoading}
        />
      </div>
    );
  }
}
