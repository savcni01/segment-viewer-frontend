
import React, { Component } from 'react'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import './Table.css'

export default class Table extends Component {

    tableHeaders = ['name', 'volume']
    data = [{
        segmentName: 'segment1',
        segmentVolume: 12345221
        },
        {
            segmentName: 'segment2',
            segmentVolume: 12345221
        },
        {
            segmentName: 'segment3',
            segmentVolume: 12345221
        }
    ]

    columns = [{
        Header: 'Name',
        accessor: 'segmentName',
        width: 200
      }, {
        Header: 'Volume',
        accessor: 'segmentVolume',
        width: 400,
        Cell: row => (
            <div style={{
                width: '100%',
                height: '100%'
            }}>
                <div><span className='number' style={{textAlign: 'center', lineHeight: '100%'}}>{row.value ? this.nFormatter(row.value, 1) : 'N/A'}</span></div>
                <div
                    style={{
                        width: '100%',
                        height: '100%',
                        backgroundColor: '#dadada',
                        borderRadius: '2px'
                    }}
                    >
                    <div
                        style={{
                        width: `${row.value}%`,
                        height: '100%',
                        backgroundColor: row.value > 66 ? '#85cc00'
                            : row.value > 33 ? '#ffbf00'
                            : '#ff2e00',
                        borderRadius: '2px',
                        transition: 'all .2s ease-out'
                        }}
                    />
                </div>
            </div>
            
          )
      }]
    
    nFormatter(num, digits) {
        var si = [
          { value: 1, symbol: "" },
          { value: 1E3, symbol: "k" },
          { value: 1E6, symbol: "M" },
          { value: 1E9, symbol: "G" },
          { value: 1E12, symbol: "T" },
          { value: 1E15, symbol: "P" },
          { value: 1E18, symbol: "E" }
        ];
        var rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
        var i;
        for (i = si.length - 1; i > 0; i--) {
          if (num >= si[i].value) {
            break;
          }
        }
        return (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol;
      }

    componentDidMount() {
        this.props.fetchSegmentVolumes()
        this.props.fetchSegmentNames()
    }

    render () {
        return (
           <div className="table-wrapper">
                <ReactTable
                    pageSize={30}
                    minRows={0} 
                    data={this.data}
                    columns={this.columns}
                    showPagination={false}
                    filterable={true}
                />
           </div>
    )
    }
}
