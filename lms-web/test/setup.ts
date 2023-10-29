import jsdomGlobal from "jsdom-global";
import { hook } from "node-hook";
import dedent from "ts-dedent";

const url = process.env.API_URL || "http://localhost";

jsdomGlobal(undefined, { url });

global.File = File;
global.Blob = Blob;
global.MutationObserver = window.MutationObserver;
global.SVGElement = window.SVGElement;

const simpleExtensions = [
  ".jpeg",
  ".jpg",
  ".png",
  ".woff2",
];

simpleExtensions.forEach(ext => {
  hook(ext, (_source, filename) => `module.exports = "${filename}";`);
});

hook(".svg", () => dedent`
  const React = require("react");

  module.exports = function(props) {
    return /*#__PURE__*/React.createElement("svg", props);
  }
`);
