import Cube from "./Cube";
import Animations from "./Animations";
import ParamsSetting from "./ParamsSetting";
import React, {
  useMemo,
  useEffect,
  useImperativeHandle,
  useRef,
  useState
} from "react";
import { Button } from "antd";
import CodePreview from './CodePreview'
const Animation = React.forwardRef((props, aref) => {
  const { currProps, item } = props;
  const Compt = useMemo(() => Animations[item.component], [item.component]);

  return (
    <Compt ref={aref} {...currProps}>
      <Cube
        style={{
          backgroundColor: item.color
        }}
      >
        {item.centerName}
      </Cube>
    </Compt>
  );
});
export default React.forwardRef(function (props, ref) {
  const { item, currProps } = props;
  const aref = useRef({});
  const settingRef = useRef({})
  const [rerender, setRender] = useState(false);
  const [updateCode, setUpdateCode] = useState({});
  const animation = useMemo(() => <Animation item={item} currProps={currProps} />, [item, currProps])
  useImperativeHandle(
    ref,
    () => {
      const ret = Object.create(aref.current);
      ret.resetAnimation = () => {
        settingRef.current.validateSettings()
        .then(() => {
          setRender(true);
        })
        .catch(() => {
          alert('校验失败');
        });
      };
      ret.updateCode = () => {
        setUpdateCode({});
      }
      return ret;
    },
    [aref.current]
  );
  
  useEffect(() => {
    if (rerender) {
      setRender(false);
    } else {

    }
  }, [rerender]);
  return (
    <div className="viewport">
      <div className="democontainer">
        {rerender ? null : animation}
      </div>
      <Button
        type="primary"
        style={{
          margin: 5
        }}
        onClick={props.replayAnimation}
      >
        replay
      </Button>
      {<ParamsSetting ref={settingRef} item={item} currProps={currProps} {...props} />}
      {<CodePreview component={item.component} currProps={currProps} rerender={rerender} updateCode={updateCode}/>}
    </div>
  );
});
