import React from "react";
import ReactDOM from "react-dom";
import dagre from "dagre";
import GGEditor, { Flow } from "gg-editor";
import CustomNode from "./shape/nodes/CustomNode";

import "./styles.css";

const data = {
  nodes: [
    {
      type: "node",
      size: "100*100",
      shape: "custom-node",
      color: "#FA8C16",
      label: "Ant Design",
      labelOffsetY: 20,
      icon: "//img.alicdn.com/tfs/TB1gXH2ywHqK1RjSZFPXXcwapXa-200-200.svg",
      id: "ea1184e8",
      index: 0
    },
    {
      type: "node",
      size: "100*100",
      shape: "custom-node",
      color: "#FA8C16",
      label: "React",
      labelOffsetY: 20,
      icon: "//img.alicdn.com/tfs/TB1OzAmyyLaK1RjSZFxXXamPFXa-200-200.svg",
      id: "481fbb1a",
      index: 2
    },
    {
      type: "node",
      size: "100*100",
      shape: "custom-node",
      color: "#FA8C16",
      label: "Ant Design",
      labelOffsetY: 20,
      icon: "//img.alicdn.com/tfs/TB1gXH2ywHqK1RjSZFPXXcwapXa-200-200.svg",
      id: "ea1184e9",
      index: 0
    },
    {
      type: "node",
      size: "100*100",
      shape: "custom-node",
      color: "#FA8C16",
      label: "Ant Design",
      labelOffsetY: 20,
      icon: "//img.alicdn.com/tfs/TB1gXH2ywHqK1RjSZFPXXcwapXa-200-200.svg",
      id: "ea1184e0",
      index: 0
    }
  ],
  edges: [
    {
      source: "ea1184e8",
      sourceAnchor: 2,
      target: "481fbb1a",
      targetAnchor: 0,
      id: "1",
      index: 1
    },
    {
      source: "ea1184e9",
      sourceAnchor: 2,
      target: "481fbb1a",
      targetAnchor: 0,
      id: "2",
      index: 1
    },
    {
      source: "481fbb1a",
      sourceAnchor: 2,
      target: "ea1184e0",
      targetAnchor: 0,
      id: "3",
      index: 1
    }
  ]
};

class App extends React.Component {
  handleLayout = () => {
    const { read } = this.editor.propsAPI;
    const graph = new dagre.graphlib.Graph()
      .setGraph({})
      .setDefaultEdgeLabel(() => {
        return {};
      });
    data.nodes.forEach(node => {
      const size = node.size.split("*");
      const width = Number(size[0]);
      const height = Number(size[1]);
      graph.setNode(node.id, { width, height });
    });
    data.edges.forEach(edge => {
      graph.setEdge(edge.source, edge.target);
    });
    dagre.layout(graph);
    const nextNodes = data.nodes.map(node => {
      const graphNode = graph.node(node.id);
      return { ...node, x: graphNode.x, y: graphNode.y };
    });
    console.log(nextNodes);
    read({ nodes: nextNodes, edges: data.edges });
  };

  render() {
    return (
      <GGEditor className="editor" ref={e => (this.editor = e)}>
        <button className="btn" onClick={this.handleLayout}>
          自动排序
        </button>
        <Flow className="flow" />
        <CustomNode />
      </GGEditor>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
