import animations from "./animationsConfig";
import { Menu } from "antd";
export default function LeftMenuBar(props) {
  const keys = Object.keys(animations);
  function onClick(item, index) {
    console.log("what");
    props.onMenuItemClick && props.onMenuItemClick(item, index);
  }

  return (
    <div className="menubar">
      <Menu
        style={{ height: "100%" }}
        defaultSelectedKeys={["0"]}
        mode="inline"
      >
        <Menu.ItemGroup title="动画">
          {keys.map((key, index) => {
            return (
              <Menu.Item
                onClick={() => onClick(animations[key], index)}
                key={index.toString()}
              >
                {animations[key].name}
              </Menu.Item>
            );
          })}
        </Menu.ItemGroup>
      </Menu>
    </div>
  );
}
