import fetch from "cross-fetch";
import * as types from "../constants/actionTypes";

const checkNodeBlockStart = (node) => {
  return {
    type: types.CHECK_NODE_BLOCK_START,
    node,
  };
};

const checkNodeBlockSuccess = (node, res) => {
  return {
    type: types.CHECK_NODE_BLOCK_SUCCESS,
    node,
    res,
  };
};

const checkNodeBlockFailure = (node) => {
  return {
    type: types.CHECK_NODE_BLOCK_FAILURE,
    node,
  };
};

export function checkNodeBlock(node) {
  return async (dispatch) => {
    try {
      dispatch(checkNodeBlockStart(node));
      const res = await fetch(`${node.url}/api/v1/blocks`);

      if (res.status >= 400) {
        dispatch(checkNodeBlockFailure(node));
        return;
      }

      const json = await res.json();

      return dispatch(checkNodeBlockSuccess(node, json));
    } catch (err) {
      dispatch(checkNodeBlockFailure(node));
    }
  };
}

export function checkNodeBlocks(list) {
  return (dispatch) => {
    list.forEach((node) => {
      dispatch(checkNodeBlock(node));
    });
  };
}
