const path = require("path");
const fs = require("fs");

function f() {
  const FilterNames = [];
  const animationsPath = path.resolve(__dirname, "./src/animations.json");
  let dirs = fs.readdirSync(path.resolve(__dirname, "./src/Animations"));
  dirs = dirs.filter((name) => FilterNames.indexOf(name) < 0);
  const animations = {};
  dirs.forEach((name) => {
    animations[name] = "./Animations/" + name;
  });
  fs.writeFileSync(animationsPath, JSON.stringify(animations));
}
f();
