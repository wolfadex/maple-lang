import { TextNode } from "lexical";

export class NumberNode extends TextNode {
  constructor(text, key) {
    super(text, key);
  }

  static getType() {
    return "maple-number";
  }

  static clone(node) {
    return new NumberNode(node.__text, node.__key);
  }

  createDOM(config) {
    const element = super.createDOM(config);
    element.style.color = "#F0F";
    return element;
  }

  updateDOM(prevNode, dom, config) {
    const isUpdated = super.updateDOM(prevNode, dom, config);
    // if (prevNode.__color !== this.__color) {
    //   dom.style.color = this.__color;
    // }
    return isUpdated;
  }
}

export function $createNumberNode(text) {
  return new NumberNode(text);
}

export function $isNumberNode(node) {
  return node instanceof NumberNode;
}

export function register(editor) {
  const removeTransform = editor.registerNodeTransform(TextNode, (node) => {
    const textContent = node.getTextContent();
    const maybeNumberContent = Number(textContent);
    console.log("carl", 0, maybeNumberContent);

    if (typeof maybeNumberContent === "number" && !isNaN(maybeNumberContent)) {
      node.replace($createNumberNode(textContent));
    }
  });
  return removeTransform;
}
