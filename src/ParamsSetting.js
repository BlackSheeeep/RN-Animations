import React, { useMemo, useEffect, useState, useRef, useImperativeHandle } from "react";
import { Input, Radio, InputNumber, Form } from "antd";
function renderSettings(props) {
  const {
    forms,
    names,
    currProps,
    onSettingChange,
  } = props;
  return (
    <Form>
      {names.map((name, index) => {
        const cname = name;
        const key = name + "_" + index + Date.now().toString();
        if (Array.isArray(currProps[name])) {
          return (
          <Form.Item  {...forms[name]} className="setting-container" key={key}>
          { cname + ": "}
          <Input
          style={{
            width: 100,
          }}
            defaultValue={currProps[name].toString()}
            onChange={(e) => {
              const {value} = e.target;
              onSettingChange(name, value);
            }}
          />
        </Form.Item>)
        }
        switch (typeof currProps[name]) {
          case "string":
            return (
              <Form.Item  {...forms[name]} className="setting-container" key={key}>
                { cname + ": "}
                <Input
                  style={{
                    width: 70
                  }}
                  defaultValue={currProps[name]}
                  onChange={(e) => {
                    const {value} = e.target;
                    onSettingChange(name, value);
                  }}
                />
              </Form.Item>
            );
          case "number":
            return (
              <Form.Item {...forms[name]} className="setting-container" key={key}>
                { cname + ": "}
                <InputNumber
                  step={0.1}
                  defaultValue={currProps[name] || 0}
                  onChange={(val) => onSettingChange(name, val)}
                />
              </Form.Item>
            );
          case "boolean":
            return (
              <Form.Item {...forms[name]} className="setting-container" key={key}>
                {cname + ": "}
                <Radio.Group
                  defaultValue={currProps[name]}
                >
                  <Radio
                    onClick={() => {
                      onSettingChange(name, true);
                    }}
                    key="r1"
                    value={true}
                  >
                    true
                  </Radio>
                  <Radio
                    onClick={() => {
                      onSettingChange(name, false);
                    }}
                    key="r2"
                    value={false}
                  >
                    false
                  </Radio>
                </Radio.Group>
              </Form.Item>
            );
          default:
            return null;
        }
      })}
    </Form>
  );
}
export default React.memo(React.forwardRef(function ParamsSetting(props, ref) {
  const { currProps } = props;
  const names = Object.keys(currProps);
  const defaultForms = useMemo(() => {
    const ret = {};
    for (const k in currProps) {
      ret[k] = {
        help: '',
        validateStatus: 'success',
        validate(val) {
          switch (k) {
            case 'fromValue':
            case 'toValue':
              if(!val && val!==0) {
                this.validateStatus = 'error';
                this.help = k + '值不能为空'
              }
              else if(Array.isArray(val)) {
                if(val.length !== 2) {
                  this.validateStatus = 'error';
                  this.help = k+'的值必须为 [x,y]'
                } else if (typeof val[0] !== 'number' || typeof val[1] !== 'number') {
                  this.validateStatus = 'error';
                  this.help = k +'的值必须为 [x:number,y:number]'
                }
              }
              else if(typeof val !== typeof currProps[k]) {
                this.validateStatus = 'error';
                this.help =  k + '类型必须为' + typeof currProps[k]
              }
              break;
            default: 
              if(typeof val !== typeof currProps[k]) {
                this.validateStatus = 'error';
                this.help = k + '类型必须为' + typeof currProps[k]
              }
              break;
          }
          return this;
        }
      }
    }
    return ret;
  },[currProps]);

  const [forms, setForms] = useState({...defaultForms});
  useEffect(() => setForms({...defaultForms}),[currProps]);

  useImperativeHandle(ref, () => {
    return {
      validateSettings() {
        return new Promise((res,rej) => {
        let validate = true;
          for (const k in currProps) {
            const temp = forms[k].validate(currProps[k]);
            if(temp.validateStatus !== 'success') {
              validate = false;
            }
          }
          setForms({...forms});
        if(validate) {
          res(validate)
        } else {
          rej(validate);
        }
        })
      }
    }
  })
  const onSettingChange = (propName, value) => {
    if (typeof value === "string") {
      if (
        /,/.test(value) ||
        propName === "toValue" ||
        propName === "fromValue" ||
        propName === "easing"
      ) {
       
        value = value.split(",").map(item => Number(item));
      }
    }
    // const newform = forms[propName].validate(value);
    // setForms({...forms, [propName]: newform});
    props.onSettingChange && props.onSettingChange(propName, value);
  };
  return (
    <div className="settings-container">
      {renderSettings({
        forms,
        names,
        currProps,
        onSettingChange
      })}
    </div>
  );
}));
