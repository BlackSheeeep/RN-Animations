import { View, Text } from 'react-native'
import React ,{useEffect, useMemo} from 'react';
import useClipboard from 'react-use-clipboard';
import { Button,Divider } from 'antd';
import {CopyFilled} from '@ant-design/icons'
export default function CodePreview (props) {
    const { component, currProps, rerender,updateCode } = props;
    const code = useMemo(() => {
        const cprops= Object.keys(currProps).map(name => ({name ,val:currProps[name]}));
        return `import {${component}} from 'Animations';\n<${component} ${cprops.reduce((pre, item, index) => {
            const val = Array.isArray(item.val) ? '['+item.val.toString()+']' : typeof item.val === 'string'? "'" + item.val+ "'" : item.val.toString()
            pre += ` ${item.name}={${val}}`;
            return pre;
        },'')}>{/* 需要使用动画的组件 */}</${component}>`
    },[component, currProps, rerender, updateCode])
    const [isCopied, setCopy] = useClipboard(code);
    useEffect(() => {
        if(isCopied) {
            confirm('copied!');
        }
    },[isCopied])
    return (
        <View style={{
            height: 200,
            width: '100%',
            textAlign: 'left',
            marginTop: 20
        }}>
             <Divider >Code</Divider>
            <Text>
                {code}
            </Text>
            <Button style={{
                width: 100,
                height: 30,
                position: 'absolute',
                bottom: 0,
                right: 0,

            }}onClick={() => {
                setCopy(code);
            }} type="primary">
                <CopyFilled />
                {"copy"}
            </Button>
        </View>
    )
}