import _objectSpread from "@babel/runtime/helpers/esm/objectSpread";
import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import styles from "./styles";
import classnames from "classnames";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import TrashIcon from "@material-ui/icons/Delete";
import CheckIcon from "@material-ui/icons/Check";
import UndoIcon from "@material-ui/icons/Undo";
import Select from "react-select";
var useStyles = makeStyles(styles);
export default (function (_ref) {
  var region = _ref.region,
      editing = _ref.editing,
      _ref$allowedClasses = _ref.allowedClasses,
      allowedClasses = _ref$allowedClasses === void 0 ? ["Laptop", "Mouse", "Compuda"] : _ref$allowedClasses,
      _ref$allowedTags = _ref.allowedTags,
      allowedTags = _ref$allowedTags === void 0 ? ["Dog", "Cat", "Woof", "Electronic Device"] : _ref$allowedTags,
      onDelete = _ref.onDelete,
      _onChange = _ref.onChange,
      onClose = _ref.onClose,
      onOpen = _ref.onOpen,
      _ref$isEditingLocked = _ref.isEditingLocked,
      isEditingLocked = _ref$isEditingLocked === void 0 ? false : _ref$isEditingLocked;
  var classes = useStyles();
  return /*#__PURE__*/React.createElement(Paper, {
    onClick: function onClick() {
      return !editing && !isEditingLocked ? onOpen(region) : null;
    },
    className: classnames(classes.regionInfo, {
      highlighted: region.highlighted
    })
  }, !editing ? /*#__PURE__*/React.createElement("div", null, region.cls && /*#__PURE__*/React.createElement("div", {
    className: "name"
  }, /*#__PURE__*/React.createElement("div", {
    className: "circle",
    style: {
      backgroundColor: region.color
    }
  }), region.cls), region.tags && /*#__PURE__*/React.createElement("div", {
    className: "tags"
  }, region.tags.map(function (t) {
    return /*#__PURE__*/React.createElement("div", {
      key: t,
      className: "tag"
    }, t);
  }))) : /*#__PURE__*/React.createElement("div", {
    style: {
      width: 200
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "row"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      backgroundColor: region.color,
      color: "#fff",
      padding: 4,
      paddingLeft: 8,
      paddingRight: 8,
      borderRadius: 4,
      fontWeight: "bold",
      textShadow: "0px 0px 5px rgba(0,0,0,0.4)"
    }
  }, region.type), /*#__PURE__*/React.createElement("div", {
    style: {
      flexGrow: 1
    }
  }), /*#__PURE__*/React.createElement(IconButton, {
    onClick: function onClick() {
      return onDelete(region);
    },
    tabIndex: -1,
    style: {
      width: 22,
      height: 22
    },
    size: "small",
    variant: "outlined"
  }, /*#__PURE__*/React.createElement(TrashIcon, {
    style: {
      marginTop: -8,
      width: 16,
      height: 16
    }
  }))), allowedClasses.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 6
    }
  }, /*#__PURE__*/React.createElement(Select, {
    placeholder: "Classification",
    onChange: function onChange(o) {
      return _onChange(_objectSpread({}, region, {
        cls: o.value
      }));
    },
    value: region.cls ? {
      label: region.cls,
      value: region.cls
    } : null,
    options: allowedClasses.map(function (c) {
      return {
        value: c,
        label: c
      };
    })
  })), allowedTags.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 4
    }
  }, /*#__PURE__*/React.createElement(Select, {
    onChange: function onChange(newTags) {
      return _onChange(_objectSpread({}, region, {
        tags: newTags.map(function (t) {
          return t.value;
        })
      }));
    },
    placeholder: "Tags",
    value: (region.tags || []).map(function (c) {
      return {
        label: c,
        value: c
      };
    }),
    isMulti: true,
    options: allowedTags.map(function (c) {
      return {
        value: c,
        label: c
      };
    })
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 4,
      display: "flex"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flexGrow: 1
    }
  }), /*#__PURE__*/React.createElement(Button, {
    onClick: function onClick() {
      return onClose(region);
    },
    size: "small",
    variant: "contained",
    color: "primary"
  }, /*#__PURE__*/React.createElement(CheckIcon, null)))));
});