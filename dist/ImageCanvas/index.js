import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import _objectSpread from "@babel/runtime/helpers/esm/objectSpread";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";

function _createForOfIteratorHelper(o) { if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) { var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var it, normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

import React, { Fragment, useRef, useState, useLayoutEffect } from "react";
import { Matrix } from "transformation-matrix-js";
import { cloneDeep } from "lodash";
import getImageData from "get-image-data";
import Crosshairs from "../Crosshairs";
import { getEnclosingBox } from "./region-tools.js";
import { makeStyles } from "@material-ui/core/styles";
import styles from "./styles";
import classnames from "classnames";
import RegionLabel from "../RegionLabel";
import LockIcon from "@material-ui/icons/Lock";
import Paper from "@material-ui/core/Paper";
import HighlightBox from "../HighlightBox"; // import excludePatternSrc from "./xpattern.png"

import excludePatternSrc from "./xpattern.js";
import PreventScrollToParents from "../PreventScrollToParents";
var useStyles = makeStyles(styles);
var boxCursorMap = [["nw-resize", "n-resize", "ne-resize"], ["w-resize", "grab", "e-resize"], ["sw-resize", "s-resize", "se-resize"]];

var getDefaultMat = function getDefaultMat() {
  return Matrix.from(1, 0, 0, 1, -10, -10);
};

export default (function (_ref) {
  var regions = _ref.regions,
      imageSrc = _ref.imageSrc,
      realSize = _ref.realSize,
      showTags = _ref.showTags,
      _ref$onMouseMove = _ref.onMouseMove,
      _onMouseMove = _ref$onMouseMove === void 0 ? function (p) {
    return null;
  } : _ref$onMouseMove,
      _ref$onMouseDown = _ref.onMouseDown,
      _onMouseDown = _ref$onMouseDown === void 0 ? function (p) {
    return null;
  } : _ref$onMouseDown,
      _ref$onMouseUp = _ref.onMouseUp,
      _onMouseUp = _ref$onMouseUp === void 0 ? function (p) {
    return null;
  } : _ref$onMouseUp,
      _ref$dragWithPrimary = _ref.dragWithPrimary,
      dragWithPrimary = _ref$dragWithPrimary === void 0 ? false : _ref$dragWithPrimary,
      _ref$zoomWithPrimary = _ref.zoomWithPrimary,
      zoomWithPrimary = _ref$zoomWithPrimary === void 0 ? false : _ref$zoomWithPrimary,
      _ref$zoomOutWithPrima = _ref.zoomOutWithPrimary,
      zoomOutWithPrimary = _ref$zoomOutWithPrima === void 0 ? false : _ref$zoomOutWithPrima,
      _ref$createWithPrimar = _ref.createWithPrimary,
      createWithPrimary = _ref$createWithPrimar === void 0 ? false : _ref$createWithPrimar,
      _ref$pointDistancePre = _ref.pointDistancePrecision,
      pointDistancePrecision = _ref$pointDistancePre === void 0 ? 0 : _ref$pointDistancePre,
      regionClsList = _ref.regionClsList,
      regionTagList = _ref.regionTagList,
      showCrosshairs = _ref.showCrosshairs,
      showPointDistances = _ref.showPointDistances,
      allowedArea = _ref.allowedArea,
      zoomHistory = _ref.zoomHistory,
      onImageLoaded = _ref.onImageLoaded,
      changeZoomHistory = _ref.changeZoomHistory,
      resetZoomHistory = _ref.resetZoomHistory,
      onChangeRegion = _ref.onChangeRegion,
      onBeginRegionEdit = _ref.onBeginRegionEdit,
      onCloseRegionEdit = _ref.onCloseRegionEdit,
      onBeginCircleTransform = _ref.onBeginCircleTransform,
      onBeginBoxTransform = _ref.onBeginBoxTransform,
      onBeginMovePolygonPoint = _ref.onBeginMovePolygonPoint,
      onAddPolygonPoint = _ref.onAddPolygonPoint,
      onSelectRegion = _ref.onSelectRegion,
      onBeginMovePoint = _ref.onBeginMovePoint,
      onDeleteRegion = _ref.onDeleteRegion,
      mat = _ref.mat,
      changeMat = _ref.changeMat,
      onIhIwChange = _ref.onIhIwChange,
      setImageLoaded = _ref.setImageLoaded,
      handleScaleChange = _ref.handleScaleChange;

  var classes = useStyles();
  var canvasEl = useRef(null);
  var image = useRef(null);
  var layoutParams = useRef({});
  var excludePattern = useRef(null);

  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      imageLoaded = _useState2[0],
      changeImageLoaded = _useState2[1];

  var _useState3 = useState(false),
      _useState4 = _slicedToArray(_useState3, 2),
      dragging = _useState4[0],
      changeDragging = _useState4[1];

  var _useState5 = useState(0),
      _useState6 = _slicedToArray(_useState5, 2),
      maskImagesLoaded = _useState6[0],
      changeMaskImagesLoaded = _useState6[1];

  var _useState7 = useState(null),
      _useState8 = _slicedToArray(_useState7, 2),
      zoomStart = _useState8[0],
      changeZoomStart = _useState8[1];

  var _useState9 = useState(null),
      _useState10 = _slicedToArray(_useState9, 2),
      zoomEnd = _useState10[0],
      changeZoomEnd = _useState10[1];

  var mousePosition = useRef({
    x: 0,
    y: 0
  });
  var prevMousePosition = useRef({
    x: 0,
    y: 0
  }); // const [mat, changeMat] = useState(getDefaultMat())

  var maskImages = useRef({});
  var innerMousePos = mat.applyToPoint(mousePosition.current.x, mousePosition.current.y);

  var projectRegionBox = function projectRegionBox(r) {
    var _layoutParams$current = layoutParams.current,
        iw = _layoutParams$current.iw,
        ih = _layoutParams$current.ih; // onIhIwChange(ih, iw);

    var bbox = getEnclosingBox(r, iw, ih);
    var margin = r.type === "point" ? 15 : 2;
    var cbox = {
      x: bbox.x * iw - margin,
      y: bbox.y * ih - margin,
      w: bbox.w * iw + margin * 2,
      h: bbox.h * ih + margin * 2
    };

    var pbox = _objectSpread({}, mat.clone().inverse().applyToPoint(cbox.x, cbox.y), {
      w: cbox.w / mat.a,
      h: cbox.h / mat.d
    });

    return pbox;
  };

  useLayoutEffect(function () {
    if (image.current === null) {
      image.current = new Image();
      setImageLoaded(false);

      image.current.onload = function () {
        changeImageLoaded(true);
        setImageLoaded(true);
        handleScaleChange(100);
        onImageLoaded({
          width: image.current.naturalWidth,
          height: image.current.naturalHeight
        });
      };

      image.current.src = imageSrc;
    }

    var canvas = canvasEl.current;
    var clientWidth = canvas.clientWidth,
        clientHeight = canvas.clientHeight;
    canvas.width = clientWidth;
    canvas.height = clientHeight;
    var context = canvas.getContext("2d");

    if (excludePattern.current === null) {
      excludePattern.current = {
        image: new Image(),
        pattern: null
      };

      excludePattern.current.image.onload = function () {
        excludePattern.current.pattern = context.createPattern(excludePattern.current.image, "repeat");
      };

      excludePattern.current.image.src = excludePatternSrc;
    }

    context.save();
    context.transform.apply(context, _toConsumableArray(mat.clone().inverse().toArray()));
    var fitScale = Math.max(image.current.naturalWidth / (clientWidth - 20), image.current.naturalHeight / (clientHeight - 20));
    var iw = image.current.naturalWidth / fitScale,
        ih = image.current.naturalHeight / fitScale;
    onIhIwChange(ih, iw);
    layoutParams.current = {
      iw: iw,
      ih: ih,
      fitScale: fitScale,
      canvasWidth: clientWidth,
      canvasHeight: clientHeight
    }; // context.drawImage(image.current, clientWidth/2 - iw/2, clientHeight/2 - ih/2, iw, ih)

    context.drawImage(image.current, 0, 0, iw, ih);

    if (allowedArea) {
      // Pattern to indicate the NOT allowed areas
      var x = allowedArea.x,
          y = allowedArea.y,
          w = allowedArea.w,
          h = allowedArea.h;
      context.save();
      context.globalAlpha = 0.25;
      var outer = [[0, 0], [iw, 0], [iw, ih], [0, ih]];
      var inner = [[x * iw, y * ih], [x * iw + w * iw, y * ih], [x * iw + w * iw, y * ih + h * ih], [x * iw, y * ih + h * ih]];
      context.moveTo.apply(context, _toConsumableArray(outer[0]));
      outer.forEach(function (p) {
        return context.lineTo.apply(context, _toConsumableArray(p));
      });
      context.lineTo.apply(context, _toConsumableArray(outer[0]));
      context.closePath();
      inner.reverse();
      context.moveTo.apply(context, _toConsumableArray(inner[0]));
      inner.forEach(function (p) {
        return context.lineTo.apply(context, _toConsumableArray(p));
      });
      context.lineTo.apply(context, _toConsumableArray(inner[0]));
      context.fillStyle = excludePattern.current.pattern || "#f00";
      context.fill();
      context.restore();
    }

    context.save();
    context.globalAlpha = mat.a * 0.5 + 0.5;
    context.lineWidth = mat.a * 0.5 + 0.2;

    if (context.globalAlpha > 0.6) {
      context.shadowColor = "black";
      context.shadowBlur = 4;
    }

    var _iterator = _createForOfIteratorHelper(cloneDeep(regions.filter(function (r) {
      return r.visible || r.visible === undefined;
    })).sort(function (a, b) {
      return (a.zIndex || 0) - (b.zIndex || 0);
    })),
        _step;

    try {
      var _loop = function _loop() {
        var region = _step.value;

        switch (region.type) {
          case "point":
            {
              context.save();
              context.beginPath();
              context.strokeStyle = region.color;
              context.moveTo(region.x * iw - 10, region.y * ih);
              context.lineTo(region.x * iw - 2, region.y * ih);
              context.moveTo(region.x * iw + 10, region.y * ih);
              context.lineTo(region.x * iw + 2, region.y * ih);
              context.moveTo(region.x * iw, region.y * ih - 10);
              context.lineTo(region.x * iw, region.y * ih - 2);
              context.moveTo(region.x * iw, region.y * ih + 10);
              context.lineTo(region.x * iw, region.y * ih + 2);
              context.moveTo(region.x * iw + 5, region.y * ih);
              context.arc(region.x * iw, region.y * ih, 5, 0, 2 * Math.PI);
              context.stroke();
              context.restore();
              break;
            }

          case "box":
            {
              context.save();
              context.shadowColor = "black";
              context.shadowBlur = 4;
              context.strokeStyle = region.color;
              context.strokeRect(region.x * iw, region.y * ih, region.w * iw, region.h * ih);
              context.restore();
              break;
            }

          case "polygon":
            {
              context.save();
              context.shadowColor = "black";
              context.shadowBlur = 4;
              context.strokeStyle = region.color;
              context.beginPath();
              context.moveTo(region.points[0][0] * iw, region.points[0][1] * ih);

              var _iterator2 = _createForOfIteratorHelper(region.points),
                  _step2;

              try {
                for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                  var _point = _step2.value;
                  context.lineTo(_point[0] * iw, _point[1] * ih);
                }
              } catch (err) {
                _iterator2.e(err);
              } finally {
                _iterator2.f();
              }

              if (!region.open) context.closePath();
              context.stroke();
              context.restore();
              break;
            }

          case "circle":
            {
              context.save();
              context.shadowColor = "black";
              context.shadowBlur = 4;
              context.strokeStyle = region.color;
              context.beginPath();
              context.arc(region.x * iw, region.y * ih, Math.sqrt(Math.pow((region.xr - region.x) * iw, 2) + Math.pow((region.yr - region.y) * ih, 2)), 0, 2 * Math.PI);
              context.stroke();
              context.restore();
              break;
            }

          case "pixel":
            {
              context.save();

              if (maskImages.current[region.src]) {
                if (maskImages.current[region.src].nodeName === "CANVAS") {
                  context.globalAlpha = 0.6;
                  context.drawImage(maskImages.current[region.src], region.sx * iw, region.sy * ih, region.w * iw, region.h * ih);
                }
              } else {
                maskImages.current[region.src] = new Image();

                maskImages.current[region.src].onload = function () {
                  var img = maskImages.current[region.src];
                  var newCanvas = document.createElement("canvas");
                  newCanvas.width = img.naturalWidth;
                  newCanvas.height = img.naturalHeight;
                  var ctx = newCanvas.getContext("2d");
                  ctx.drawImage(img, 0, 0);
                  var imgData = ctx.getImageData(0, 0, img.naturalWidth, img.naturalHeight);

                  for (var i = 0; i < imgData.data.length; i += 4) {
                    var _imgData$data$slice = imgData.data.slice(i, i + 4),
                        _imgData$data$slice2 = _slicedToArray(_imgData$data$slice, 4),
                        r = _imgData$data$slice2[0],
                        g = _imgData$data$slice2[1],
                        b = _imgData$data$slice2[2],
                        a = _imgData$data$slice2[3];

                    var black = r < 10 && g < 10 && b < 10;
                    imgData.data[i] = 0;
                    imgData.data[i + 1] = 0;
                    imgData.data[i + 2] = black ? 255 : 0;
                    imgData.data[i + 3] = black ? 255 : 0;
                  }

                  ctx.clearRect(0, 0, img.naturalWidth, img.naturalHeight);
                  ctx.putImageData(imgData, 0, 0);
                  maskImages.current[region.src] = newCanvas;
                  changeMaskImagesLoaded(maskImagesLoaded + 1);
                };

                maskImages.current[region.src].src = region.src;
              }

              context.restore();
              break;
            }

          default:
            break;
        }
      };

      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        _loop();
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    context.restore();
    context.restore();
  });

  var zoomIn = function zoomIn(direction, point) {
    var _ref2 = [point.x, point.y],
        mx = _ref2[0],
        my = _ref2[1];
    var scale = typeof direction === "object" ? direction.to : 1 + 0.2 * direction;
    var oldMat = mat.clone();

    if (!zoomHistory || zoomHistory.length == 0) {
      changeZoomHistory(oldMat, "ADD_NEW");
    } // NOTE: We're mutating mat here


    mat.translate(mx, my).scaleU(scale);
    if (mat.a > 1) mat.scaleU(1 / mat.a);
    if (mat.a < 0.1) mat.scaleU(0.1 / mat.a);
    mat.translate(-mx, -my);
    var horizontal_move_limit = (1 / mat.a - 1) * (iw / (1 / mat.a));
    var vertical_move_limit = (1 / mat.d - 1) * (ih / (1 / mat.d));

    if (mat.e < -10) {
      mat.e = -10;
    } else if (mat.e > horizontal_move_limit) {
      mat.e = horizontal_move_limit;
    }

    if (mat.f < -10) {
      mat.f = -10;
    } else if (mat.f > vertical_move_limit) {
      mat.f = vertical_move_limit;
    }

    var newMatClone = mat.clone();

    if (!(Object.keys(oldMat).length === Object.keys(newMatClone).length && Object.keys(oldMat).every(function (key) {
      return oldMat[key] === newMatClone[key];
    }))) {
      changeZoomHistory(newMatClone, "ADD_NEW");
      changeMat(newMatClone);
    }
  };

  var zoomOut = function zoomOut() {
    if (zoomHistory && zoomHistory.length > 0) {
      var newMat = zoomHistory[0];
      changeZoomHistory(0, "");
      changeMat(Matrix.from(newMat));
    } else {
      changeMat(Matrix.from(getDefaultMat()));
    }
  };

  var resetPosition = function resetPosition() {
    resetZoomHistory();
    changeMat(Matrix.from(getDefaultMat()));
  };

  var mouseEvents = {
    onMouseMove: function onMouseMove(e) {
      var _canvasEl$current$get = canvasEl.current.getBoundingClientRect(),
          left = _canvasEl$current$get.left,
          top = _canvasEl$current$get.top;

      prevMousePosition.current.x = mousePosition.current.x;
      prevMousePosition.current.y = mousePosition.current.y;
      mousePosition.current.x = e.clientX - left;
      mousePosition.current.y = e.clientY - top;
      var projMouse = mat.applyToPoint(mousePosition.current.x, mousePosition.current.y);

      if (zoomWithPrimary && zoomStart) {
        changeZoomEnd(projMouse);
      }

      var _layoutParams$current2 = layoutParams.current,
          iw = _layoutParams$current2.iw,
          ih = _layoutParams$current2.ih; // onIhIwChange(ih, iw);

      _onMouseMove({
        x: projMouse.x / iw,
        y: projMouse.y / ih
      });

      if (dragging) {
        mat.translate(prevMousePosition.current.x - mousePosition.current.x, prevMousePosition.current.y - mousePosition.current.y); // const { clientWidth, clientHeight } = canvasEl.current
        // const horizontal_move_limit = ((1/mat.a) - 1) * clientWidth;
        // const vertical_move_limit = ((1/mat.d) - 1) * clientHeight;

        var horizontal_move_limit = (1 / mat.a - 1) * (iw / (1 / mat.a));
        var vertical_move_limit = (1 / mat.d - 1) * (ih / (1 / mat.d)); // const horizontal_move_limit = iw/2;
        // const vertical_move_limit = ih/2;

        if (mat.e < 0) {
          mat.e = 0;
        } else if (mat.e > horizontal_move_limit) {
          mat.e = horizontal_move_limit;
        }

        if (mat.f < 0) {
          mat.f = 0;
        } else if (mat.f > vertical_move_limit) {
          mat.f = vertical_move_limit;
        }

        changeMat(mat.clone()); // changeForceRenderState(Math.random())
      }

      e.preventDefault();
    },
    onMouseDown: function onMouseDown(e) {
      var specialEvent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      e.preventDefault();
      if (e.button === 1 || e.button === 0 && dragWithPrimary) return changeDragging(true);
      var projMouse = mat.applyToPoint(mousePosition.current.x, mousePosition.current.y);

      if (zoomWithPrimary && e.button === 0) {
        changeZoomStart(projMouse);
        changeZoomEnd(projMouse);
        return;
      }

      if (zoomOutWithPrimary && e.button === 0) {
        zoomOut();
      }

      if (e.button === 0) {
        if (specialEvent.type === "resize-box") {// onResizeBox()
        }

        if (specialEvent.type === "move-region") {// onResizeBox()
        }

        var _layoutParams$current3 = layoutParams.current,
            _iw = _layoutParams$current3.iw,
            _ih = _layoutParams$current3.ih; // onIhIwChange(ih, iw);

        _onMouseDown({
          x: projMouse.x / _iw,
          y: projMouse.y / _ih
        });
      }
    },
    onMouseUp: function onMouseUp(e) {
      e.preventDefault();
      var projMouse = mat.applyToPoint(mousePosition.current.x, mousePosition.current.y);

      if (zoomStart) {
        var _zoomEnd = projMouse;

        if (Math.abs(zoomStart.x - _zoomEnd.x) < 10 && Math.abs(zoomStart.y - _zoomEnd.y) < 10) {
          zoomIn({
            to: 0.75
          }, mousePosition.current); // if (mat.a < 1) {
          //   // zoomIn({ to: 1 }, mousePosition.current)
          // } else {
          //   zoomIn({ to: 0.25 }, mousePosition.current)
          // }
        } else {
          var _layoutParams$current4 = layoutParams.current,
              _iw2 = _layoutParams$current4.iw,
              _ih2 = _layoutParams$current4.ih; // onIhIwChange(ih, iw);

          if (zoomStart.x > _zoomEnd.x) {
            ;
            var _ref3 = [_zoomEnd.x, zoomStart.x];
            zoomStart.x = _ref3[0];
            _zoomEnd.x = _ref3[1];
          }

          if (zoomStart.y > _zoomEnd.y) {
            ;
            var _ref4 = [_zoomEnd.y, zoomStart.y];
            zoomStart.y = _ref4[0];
            _zoomEnd.y = _ref4[1];
          } // The region defined by zoomStart and zoomEnd should be the new transform


          var scale = Math.min((_zoomEnd.x - zoomStart.x) / _iw2, (_zoomEnd.y - zoomStart.y) / _ih2);
          if (scale < 0.1) scale = 0.1;
          if (scale > 10) scale = 10;
          var newMat = getDefaultMat().translate(zoomStart.x, zoomStart.y).scaleU(scale);
          var newMatClone = newMat.clone();
          changeZoomHistory(newMatClone, "ADD_NEW");
          changeMat(newMatClone);
        }

        changeZoomStart(null);
        changeZoomEnd(null);
      }

      if (e.button === 1 || e.button === 0 && dragWithPrimary) return changeDragging(false);

      if (e.button === 0) {
        var _layoutParams$current5 = layoutParams.current,
            _iw3 = _layoutParams$current5.iw,
            _ih3 = _layoutParams$current5.ih; // onIhIwChange(ih, iw);

        _onMouseUp({
          x: projMouse.x / _iw3,
          y: projMouse.y / _ih3
        });
      }
    },
    onWheel: function onWheel(e) {
      if (e.ctrlKey) {
        var direction = e.deltaY > 0 ? 1 : e.deltaY < 0 ? -1 : 0;
        zoomIn(direction, mousePosition.current);
      } else {
        prevMousePosition.current.x = mousePosition.current.x;
        prevMousePosition.current.y = mousePosition.current.y;
        mousePosition.current.x = e.deltaX + prevMousePosition.current.x;
        mousePosition.current.y = e.deltaY - prevMousePosition.current.y;
        mat.translate(e.deltaX, e.deltaY); // ((1 / mat.b) - 1) * ih
        // const horizontal_move_limit = iw/2;
        // const horizontal_left_limit = iw/2;
        // const vertical_move_limit = ih/2;

        var horizontal_move_limit = (1 / mat.a - 1) * (iw / (1 / mat.a));
        var vertical_move_limit = (1 / mat.d - 1) * (ih / (1 / mat.d));

        if (mat.e < -10) {
          mat.e = -10;
        } else if (mat.e > horizontal_move_limit) {
          mat.e = horizontal_move_limit;
        }

        if (mat.f < -10) {
          mat.f = -10;
        } else if (mat.f > vertical_move_limit) {
          mat.f = vertical_move_limit;
        }

        changeMat(mat.clone());
      }

      e.preventDefault();
    }
  };
  var _layoutParams$current6 = layoutParams.current,
      iw = _layoutParams$current6.iw,
      ih = _layoutParams$current6.ih; // onIhIwChange(ih, iw);

  var zoomBox = !zoomStart ? null : _objectSpread({}, mat.clone().inverse().applyToPoint(zoomStart.x, zoomStart.y), {
    w: (zoomEnd.x - zoomStart.x) / mat.a,
    h: (zoomEnd.y - zoomStart.y) / mat.d
  });

  if (zoomBox) {
    if (zoomBox.w < 0) {
      zoomBox.x += zoomBox.w;
      zoomBox.w *= -1;
    }

    if (zoomBox.h < 0) {
      zoomBox.y += zoomBox.h;
      zoomBox.h *= -1;
    }
  }

  return (
    /*#__PURE__*/
    // <div>
    // <div>
    //   <button onClick={resetPosition}>Reset Position</button>
    // </div>
    React.createElement("div", {
      style: {
        width: "100%",
        height: "100%",
        maxHeight: "calc(100vh - 68px)",
        position: "relative",
        overflow: "hidden",
        cursor: createWithPrimary ? "crosshair" : dragging ? "grabbing" : dragWithPrimary ? "grab" : zoomWithPrimary ? "zoom-in" : zoomOutWithPrimary ? "zoom-out" : undefined
      }
    }, showCrosshairs && /*#__PURE__*/React.createElement(Crosshairs, {
      mousePosition: mousePosition
    }), regions.filter(function (r) {
      return r.visible || r.visible === undefined;
    }).filter(function (r) {
      return !r.locked;
    }).map(function (r, i) {
      var pbox = projectRegionBox(r);
      var _layoutParams$current7 = layoutParams.current,
          iw = _layoutParams$current7.iw,
          ih = _layoutParams$current7.ih; // onIhIwChange(ih, iw);

      return /*#__PURE__*/React.createElement(Fragment, null, /*#__PURE__*/React.createElement(PreventScrollToParents, null, /*#__PURE__*/React.createElement(HighlightBox, {
        region: r,
        mouseEvents: mouseEvents,
        dragWithPrimary: dragWithPrimary,
        createWithPrimary: createWithPrimary,
        zoomWithPrimary: zoomWithPrimary,
        zoomOutWithPrimary: zoomOutWithPrimary,
        onBeginMovePoint: onBeginMovePoint,
        onSelectRegion: onSelectRegion,
        pbox: pbox
      }), r.type === "box" && !dragWithPrimary && !zoomWithPrimary && !zoomOutWithPrimary && !r.locked && r.highlighted && mat.a < 1.2 && [[0, 0], [0.5, 0], [1, 0], [1, 0.5], [1, 1], [0.5, 1], [0, 1], [0, 0.5], [0.5, 0.5]].map(function (_ref5, i) {
        var _ref6 = _slicedToArray(_ref5, 2),
            px = _ref6[0],
            py = _ref6[1];

        return /*#__PURE__*/React.createElement("div", Object.assign({
          key: i,
          className: classes.transformGrabber
        }, mouseEvents, {
          onMouseDown: function onMouseDown(e) {
            if (e.button === 0) return onBeginBoxTransform(r, [px * 2 - 1, py * 2 - 1]);
            mouseEvents.onMouseDown(e);
          },
          style: {
            left: pbox.x - 4 - 2 + pbox.w * px,
            top: pbox.y - 4 - 2 + pbox.h * py,
            cursor: boxCursorMap[py * 2][px * 2],
            borderRadius: px === 0.5 && py === 0.5 ? 4 : undefined
          }
        }));
      }), r.type === "circle" && !dragWithPrimary && !zoomWithPrimary && !zoomOutWithPrimary && !r.locked && r.highlighted && [[r.x, r.y], [(r.x * iw + Math.sqrt(Math.pow((r.xr - r.x) * iw, 2) + Math.pow((r.yr - r.y) * ih, 2))) / iw, r.y], [r.x, (r.y * ih + Math.sqrt(Math.pow((r.xr - r.x) * iw, 2) + Math.pow((r.yr - r.y) * ih, 2))) / ih], [(r.x * iw - Math.sqrt(Math.pow((r.xr - r.x) * iw, 2) + Math.pow((r.yr - r.y) * ih, 2))) / iw, r.y], [r.x, (r.y * ih - Math.sqrt(Math.pow((r.xr - r.x) * iw, 2) + Math.pow((r.yr - r.y) * ih, 2))) / ih]].map(function (_ref7, i) {
        var _ref8 = _slicedToArray(_ref7, 2),
            px = _ref8[0],
            py = _ref8[1];

        var proj = mat.clone().inverse().applyToPoint(px * iw, py * ih);
        return /*#__PURE__*/React.createElement("div", Object.assign({
          key: i,
          className: classes.transformGrabber
        }, mouseEvents, {
          onMouseDown: function onMouseDown(e) {
            if (e.button === 0 && i == 0) {
              return onBeginCircleTransform(r, "MOVE_REGION");
            } else if (e.button === 0 && i != 0) {
              return onBeginCircleTransform(r, "RESIZE_CIRCLE");
            }

            mouseEvents.onMouseDown(e);
          },
          style: {
            left: proj.x - 4,
            top: proj.y - 4,
            borderRadius: px === r.x && py === r.y ? 4 : undefined
          }
        }));
      }), r.type === "polygon" && !dragWithPrimary && !zoomWithPrimary && !zoomOutWithPrimary && !r.locked && r.highlighted && r.points.map(function (_ref9, i) {
        var _ref10 = _slicedToArray(_ref9, 2),
            px = _ref10[0],
            py = _ref10[1];

        var proj = mat.clone().inverse().applyToPoint(px * iw, py * ih);
        return /*#__PURE__*/React.createElement("div", Object.assign({
          key: i
        }, mouseEvents, {
          onMouseDown: function onMouseDown(e) {
            if (e.button === 0 && (!r.open || i === 0)) return onBeginMovePolygonPoint(r, i);
            mouseEvents.onMouseDown(e);
          },
          className: classes.transformGrabber,
          style: {
            cursor: !r.open ? "move" : i === 0 ? "pointer" : undefined,
            pointerEvents: r.open && i === r.points.length - 1 ? "none" : undefined,
            left: proj.x - 4,
            top: proj.y - 4
          }
        }));
      }), r.type === "polygon" && r.highlighted && !dragWithPrimary && !zoomWithPrimary && !zoomOutWithPrimary && !r.locked && !r.open && r.points.length > 1 && r.points.map(function (p1, i) {
        return [p1, r.points[(i + 1) % r.points.length]];
      }).map(function (_ref11) {
        var _ref12 = _slicedToArray(_ref11, 2),
            p1 = _ref12[0],
            p2 = _ref12[1];

        return [(p1[0] + p2[0]) / 2, (p1[1] + p2[1]) / 2];
      }).map(function (pa, i) {
        var proj = mat.clone().inverse().applyToPoint(pa[0] * iw, pa[1] * ih);
        return /*#__PURE__*/React.createElement("div", Object.assign({
          key: i
        }, mouseEvents, {
          onMouseDown: function onMouseDown(e) {
            if (e.button === 0) return onAddPolygonPoint(r, pa, i + 1);
            mouseEvents.onMouseDown(e);
          },
          className: classes.transformGrabber,
          style: {
            cursor: "copy",
            left: proj.x - 4,
            top: proj.y - 4,
            border: "2px dotted #fff",
            opacity: 0.5
          }
        }));
      })));
    }), showTags && regions.filter(function (r) {
      return r.visible || r.visible === undefined;
    }).map(function (region) {
      var pbox = projectRegionBox(region);
      var _layoutParams$current8 = layoutParams.current,
          iw = _layoutParams$current8.iw,
          ih = _layoutParams$current8.ih; // onIhIwChange(ih, iw);

      var margin = 8;
      if (region.highlighted && region.type === "box") margin += 6;
      var labelBoxHeight = region.editingLabels && !region.locked ? 170 : region.tags ? 60 : 50;
      var displayOnTop = pbox.y > labelBoxHeight;
      var coords = displayOnTop ? {
        left: pbox.x,
        top: pbox.y - margin / 2
      } : {
        left: pbox.x,
        top: pbox.y + pbox.h + margin / 2
      }; // if (region.locked) {
      //   return (
      //     <div
      //       style={{
      //         position: "absolute",
      //         ...coords,
      //         zIndex: 10 + (region.editingLabels ? 5 : 0)
      //       }}
      //     >
      //       <Paper
      //         style={{
      //           position: "absolute",
      //           left: 0,
      //           ...(displayOnTop ? { bottom: 0 } : { top: 0 }),
      //           zIndex: 10,
      //           backgroundColor: "#fff",
      //           borderRadius: 4,
      //           padding: 2,
      //           paddingBottom: 0,
      //           opacity: 0.5,
      //           pointerEvents: "none"
      //         }}
      //       >
      //         <LockIcon
      //           style={{ width: 16, height: 16, color: "#333" }}
      //         />
      //       </Paper>
      //     </div>
      //   )
      // }

      if (!region.showTags) {
        return "";
      }

      return /*#__PURE__*/React.createElement("div", {
        style: _objectSpread({
          position: "absolute"
        }, coords, {
          zIndex: 10 + (region.editingLabels ? 5 : 0),
          width: 200
        }),
        onMouseDown: function onMouseDown(e) {
          return e.preventDefault();
        },
        onMouseUp: function onMouseUp(e) {
          return e.preventDefault();
        },
        onMouseEnter: function onMouseEnter(e) {
          if (region.editingLabels) {
            mouseEvents.onMouseUp(e);
            e.button = 1;
            mouseEvents.onMouseUp(e);
          }
        }
      }, /*#__PURE__*/React.createElement("div", Object.assign({
        style: _objectSpread({
          position: "absolute",
          left: 0
        }, displayOnTop ? {
          bottom: 0
        } : {
          top: 0
        })
      }, !region.editingLabels ? mouseEvents : {}), /*#__PURE__*/React.createElement(RegionLabel, {
        allowedClasses: regionClsList,
        allowedTags: regionTagList,
        onOpen: onBeginRegionEdit,
        onChange: onChangeRegion,
        onClose: onCloseRegionEdit,
        onDelete: onDeleteRegion,
        editing: region.editingLabels,
        region: region,
        isEditingLocked: region.locked
      })));
    }), zoomWithPrimary && zoomOutWithPrimary && zoomBox !== null && /*#__PURE__*/React.createElement("div", {
      style: {
        position: "absolute",
        border: "1px solid #fff",
        pointerEvents: "none",
        left: zoomBox.x,
        top: zoomBox.y,
        width: zoomBox.w,
        height: zoomBox.h
      }
    }), showPointDistances && /*#__PURE__*/React.createElement("svg", {
      className: classes.pointDistanceIndicator,
      style: {
        pointerEvents: "none",
        position: "absolute",
        left: 0,
        top: 0,
        width: "100%",
        height: "100%"
      }
    }, regions.filter(function (r1) {
      return r1.type === "point";
    }).flatMap(function (r1, i1) {
      return regions.filter(function (r2, i2) {
        return i2 > i1;
      }).filter(function (r2) {
        return r2.type === "point";
      }).map(function (r2) {
        var pr1 = projectRegionBox(r1);
        var pr2 = projectRegionBox(r2);
        var prm = {
          x: (pr1.x + pr1.w / 2 + pr2.x + pr2.w / 2) / 2,
          y: (pr1.y + pr1.h / 2 + pr2.y + pr2.h / 2) / 2
        };
        var displayDistance;

        if (realSize) {
          var w = realSize.w,
              h = realSize.h,
              unitName = realSize.unitName;
          displayDistance = Math.sqrt(Math.pow(r1.x * w - r2.x * w, 2) + Math.pow(r1.y * h - r2.y * h, 2)).toFixed(pointDistancePrecision) + unitName;
        } else {
          displayDistance = (Math.sqrt(Math.pow(r1.x - r2.x, 2) + Math.pow(r1.y - r2.y, 2)) * 100).toFixed(pointDistancePrecision) + "%";
        }

        return /*#__PURE__*/React.createElement(Fragment, null, /*#__PURE__*/React.createElement("path", {
          d: "M".concat(pr1.x + pr1.w / 2, ",").concat(pr1.y + pr1.h / 2, " L").concat(pr2.x + pr2.w / 2, ",").concat(pr2.y + pr2.h / 2)
        }), /*#__PURE__*/React.createElement("text", {
          x: prm.x,
          y: prm.y
        }, displayDistance));
      });
    })), /*#__PURE__*/React.createElement(PreventScrollToParents, Object.assign({
      style: {
        width: "100%",
        height: "100%"
      }
    }, mouseEvents), /*#__PURE__*/React.createElement("canvas", {
      className: classes.canvas,
      ref: canvasEl
    })), /*#__PURE__*/React.createElement("div", {
      className: classes.zoomIndicator
    }, (1 / mat.a * 100).toFixed(0), "%")) // </div>

  );
});