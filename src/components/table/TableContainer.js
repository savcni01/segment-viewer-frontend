import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import Table from "./Table";
import * as actions from '../../actions/actions'

function mapStateToProps(state) {
    return {
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchSegmentVolumes: bindActionCreators(actions.fetchSegmentVolumes, dispatch),
        fetchSegmentNames: bindActionCreators(actions.fetchSegmentNames, dispatch),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Table)
