import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Table from "./Table";
import { fetchSegments } from "../../actions/actions";

function mapStateToProps(state) {
  return {
    segments: state.table.segments,
    isLoading: state.table.isLoading
  };
}

const mapDispatchToProps = dispatch => {
  return {
    fetchSegments: bindActionCreators(fetchSegments, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Table);
