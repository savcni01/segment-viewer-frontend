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
      width: 400,
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
          <div
            style={{
              width: "80%",
              height: "100%",
              float: "left",
              backgroundColor: "#dadada",
              borderRadius: "2px"
            }}
          >
            <div
              style={{
                width: `${row.value}%`,
                height: "100%",
                backgroundColor:
                  row.value > 66
                    ? "#85cc00"
                    : row.value > 33
                    ? "#ffbf00"
                    : "#ff2e00",
                borderRadius: "2px",
                transition: "all .2s ease-out"
              }}
            />
          </div>
        </div>
      )
    }
  ];

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
