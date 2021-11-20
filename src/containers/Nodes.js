import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Node from "../components/Node";
import { Typography, Box } from "@material-ui/core";

export const Nodes = ({nodes, nodeActions, blockActions}) => {
  const [expandedNodeURL, setExpandedNodeURL] = useState(null);

  const toggleNodeExpanded = (node) => {
    setExpandedNodeURL(node.url === expandedNodeURL ? null : node.url);
  }

  return (
    <Box paddingTop={7}>
      <Typography variant="h4" component="h1">
        <strong style={{ color: "#000" }}>Nodes</strong>
      </Typography>
      {nodes.list.map((node) => (
        <Node
          node={node}
          key={node.url}
          expanded={node.url === expandedNodeURL}
          toggleNodeExpanded={toggleNodeExpanded}
        />
      ))}
    </Box>
  );
}

Nodes.propTypes = {
  nodes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    nodes: state.nodes,
  };
}

export default connect(mapStateToProps)(Nodes);
