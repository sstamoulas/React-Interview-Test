/* eslint-disable import/no-named-as-default */
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React, { useEffect, useRef } from 'react'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";

import * as nodeActions from "../actions/nodes";
import * as blockActions from "../actions/blocks";
import Nodes from "../containers/Nodes";
import NotFoundPage from "./NotFoundPage";

const App = ({nodes, nodeActions, blockActions}) => {
  const isMounted = useRef(false);

  useEffect(() => {
    const fetchData = async () => {
      const nodeList = await nodeActions.checkNodeStatuses(nodes.list);
      await blockActions.checkNodeBlocks(nodeList.filter((node) => node?.url !== undefined));
    }

    if (!isMounted.current) {
      fetchData();
      isMounted.current = true;
    }
  }, [nodes, nodeActions, blockActions]);

  return isMounted.current && (
    <Router>
      <Switch>
        <Route exact path="/" component={Nodes} />
        <Route component={NotFoundPage} />
      </Switch>
    </Router>
  );
}

App.propTypes = {
  children: PropTypes.element,
  blockActions: PropTypes.object.isRequired,
  nodeActions: PropTypes.object.isRequired,
  nodes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    nodes: state.nodes,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    blockActions: bindActionCreators(blockActions, dispatch),
    nodeActions: bindActionCreators(nodeActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
