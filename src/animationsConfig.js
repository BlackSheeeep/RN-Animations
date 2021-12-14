const validateType = function (val) {
  if (typeof val !== "object") {
    return typeof val;
  } else {
    console.log("woifejaoiefjoawfoa", val);
    if (Array.isArray(val)) {
      const type = val
        .map((item) => (isNaN(item) ? "NaN" : typeof item))
        .toString();
      return "[" + type + "]";
    }
  }
};
function commonValidate(val) {
  if (this.required && !val && val !== 0 && val !== false) {
    this.validateStatus = "error";
    this.help = "必填项";
    return this;
  }
  this.validateStatus = validateType(val) === this.type ? "success" : "error";
  this.help = this.validateStatus === "success" ? "" : "类型必须为" + this.type;
  return this;
}
export default {
  FadeInOrOut: {
    name: "渐进或渐出",
    defaultProps: {
      fromValue: 0,
      toValue: 1,
      duration: 3000,
      useNativeDriver: false,
      loop: false,
      autoStart: true,
      delay: 1000
    },
    component: "FadeAnimation",
    color: "green",
    centerName: "Fade"
  },
  Translate: {
    name: "平移",
    color: "pink",
    defaultProps: {
      fromValue: [-100, 0],
      toValue: [0, -100],
      duration: 3000,
      delay: 1000,
      autoBack: true,
      useNativeDriver: false,
      loop: false,
      autoStart: true
    },
    forms: {
      fromValue: {
        type: "[number,number]",
        validate: commonValidate,
        validateStatus: "success",
        help: "",
        required: true
      },
      toValue: {
        type: "[number,number]",
        validate: commonValidate,
        validateStatus: "success",
        help: "",
        required: true
      }
    },
    component: "TransAnimation",
    centerName: "trans"
  },
  Rotate: {
    name: "旋转",
    defaultProps: {
      fromValue: 0,
      toValue: -180,
      delay: 0,
      duration: 3000,
      autoStart: true,
      loop: false,
      rotateCenter: ["z", "y"],
      useNativeDriver: false,
      autoBack: true
    },
    component: "RotateAnimation",
    color: "blue",
    centerName: "Rotate"
  },
  Draggble: {
    name: "拖拽",
    defaultProps: {
      velocity: 0.01,
      bezier: [0.02, 0.95, 0.54, 1]
    },
    component: "DragAnimation",
    color: "rgb(111,233,0)",
    centerName: ""
  },
  Scale: {
    name: "等比缩放",
    defaultProps: {
      fromValue: [1, 1],
      toValue: [4, 1],
      duration: 1000,
      loop: false,
      autoStart: true,
      delay: 0,
      autoBack: true
    },
    component: "ScaleAnimation",
    color: "rgb(233,155,12)",
    centerName: "scale"
  },
  Drawer: {
    name: "抽屉",
    defaultProps: {
      fromDirection: "bottom",
      loop: false,
      autoStart: true,
      delay: 500,
      duration: 2000,
      height: 300,
      width: 200,
      autoBack: true,
      useNativeDriver: false
    },
    component: "DrawerAnimation",
    color: "#ffffff",
    centerName: "Drawer",
    forms: {
      fromDirection: {
        type: "string",
        desc: "抽屉动画组件在容器上的出现方向",
        validateStatus: "success",
        required: false,
        validate(val) {
          commonValidate.call(this, val);
          this.validateStatus = "^(bottom|left|right|top)$".test(val)
            ? "success"
            : "error";
          this.help =
            this.validateStatus === "success"
              ? "fromDirection只支持bottom left right top四个值"
              : "";
          return this;
        },
        help: ""
      }
    }
  },

  commonForms: {
    loop: {
      required: false,
      validateStatus: "success",
      type: "boolean",
      validate: commonValidate,
      help: "",
      desc: "控制动画是否循环播放"
    }
  }
};
