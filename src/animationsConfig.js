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
      delay: 1000,
    },
    component: "FadeAnimation",
    color: "green",
    centerName: "Fade"
  },
  Translate: {
    name: "平移",
    color: "pink",
    defaultProps: {
      fromValue: [0,0],
      toValue: [100, 100],
      duration: 3000,
      delay: 1000,
      useNativeDriver: false,
      loop: false,
      autoStart: true
    },
    component: "TransAnimation",
    centerName: "trans"
  },
  Rotate: {
    name: "旋转",
    defaultProps: {
      fromValue: 0,
      toValue: 180,
      delay: 0,
      duration: 3000,
      autoStart: true,
      loop: false,
      rotateCenter: 'z',
      useNativeDriver: false
    },
    component: "RotateAnimation",
    color: "blue",
    centerName: "Rotate"
  },
  Draggble: {
    name: "拖拽",
    defaultProps: {
      velocity: 0.01,
      bezier: [0.02,0.95, 0.54, 1]
    },
    component: "DragAnimation",
    color: 'rgb(111,233,0)',
    centerName: ""
  },
  Scale: {
    name:'缩放',
    defaultProps: {
      fromValue: [1,1],
      toValue: [2,.5],
      duration: 1000,
      loop: false,
      autoStart: true,
      delay: 0
    },
    component: "ScaleAnimation",
    color: 'rgb(233,155,12)',
    centerName: "scale"
  },
  Drawer: {
    name: '抽屉',
    defaultProps: {
      fromVector: 'bottom',
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
    color: '#ffffff',
    centerName: 'Drawer'
  }
};
