import React from "react";
// @ts-ignore
import { View, Text } from "react-native";
export default function Cube(props) {
  return (
    <View
      style={{
        margin: "auto",
        borderRadius: 10,
        width: 50,
        height: 50,
        ...props.style
      }}
    >
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          fontSize: 14,
          display: "flex",
          width: "100%",
          height: "100%"
        }}
      >
        <Text>
        {props.children}
        </Text>
      </View>
    </View>
  );
}
