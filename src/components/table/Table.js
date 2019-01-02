
import React, { Component } from 'react'
// import ReactTable from 'react-table'
// import 'react-table/react-table.css'

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

    componentWillMount() {
        this.props.fetchSegmentVolumes()
        this.props.fetchSegmentNames()
    }
    render () {
        return (
            <table className="MyClassName">
                <thead>
                <tr>
                    {this.tableHeaders.map(title =>
                        <th key={title}>{title}</th>
                    )}
                </tr>
                </thead>
                <tbody>
                {this.data.map((row, i) =>
                    <tr key={i}>
                        <td >{row['segmentName']}</td>
                        <td >{row['segmentVolume']}</td>
                    </tr>
                )}
                </tbody>
            </table>
    )
    }
}
