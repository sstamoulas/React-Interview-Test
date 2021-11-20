import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as actions from "./../actions/blocks";
import Block from "./../components/Block";

export const Blocks = (props) => props.node.blocks.map((block) => (
  <Block 
    key={block.attributes.hash}
    block={block} 
   />
));

Blocks.propTypes = {
  node: PropTypes.object.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

export default connect(null, mapDispatchToProps)(Blocks);
