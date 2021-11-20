import React from "react";
import PropTypes from "prop-types";
import {
  Box,
  makeStyles,
} from "@material-ui/core";
import colors from "../constants/colors";

const Block = ({ block }) => {
  const classes = useStyles();

  let index = block.attributes.index;
  index = index < 10 ? `00${index}` : index < 100 ? `0${index}` : `${index}`;

  return (
    <Box className={classes.root}>
      <div className={classes.index}>{index}</div>
      <div className={classes.content}>{block.attributes.data}</div>
    </Box>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: colors.grey,
    margin: "4px",
  },
  content: {
    color: colors.text,
    fontSize: theme.typography.pxToRem(13),
    fontWeight: "500",
    padding: "0 0 5px 7px",
  },
  index: {
    color: "blue",
    fontSize: theme.typography.pxToRem(11),
    padding: "7px 0 0 8px",
  }
}));

Block.propTypes = {
  block: PropTypes.object.isRequired,
};

export default Block;
