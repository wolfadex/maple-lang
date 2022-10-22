import lexical from "lexical";
import plainText from "@lexical/plain-text";
import list from "@lexical/list";
import link from "@lexical/link";
import table from "@lexical/table";
import overflow from "@lexical/overflow";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import mark from "@lexical/mark";
import hashtag from "@lexical/hashtag";
import code from "@lexical/code";
import markdown from "@lexical/markdown";
import { NumberNode, register } from "./Maple/lexical";

function initPlainText(editor, initialEditorState) {
  return plainText.registerPlainText(editor);
}

function initMarkdownShortCuts(editor, transformers = markdown.TRANSFORMERS) {
  return markdown.registerMarkdownShortcuts(editor, transformers);
}

customElements.define(
  "maple-editor",
  class extends HTMLElement {
    #editor;
    #rootParentEl;
    #rootEl;
    #editorListeners = [];

    constructor() {
      super();

      this.#rootParentEl = document.createElement("div");
      this.#rootParentEl.classList.add("editor-container");
      this.#rootEl = document.createElement("div");
      this.#rootParentEl.appendChild(this.#rootEl);
      this.#rootEl.setAttribute("contenteditable", true);
      this.#rootEl.classList.add("editor-input");
    }

    connectedCallback() {
      requestAnimationFrame(() => {
        this.appendChild(this.#rootParentEl);

        if (this.#editor == null) {
          this.#editor = lexical.createEditor({
            // onError: console.error,
            onError: (err) =>
              this.dispatchEvent(
                new CustomEvent("maple-editor-error", { detail: err }),
              ),
            nodes: [
              lexical.LineBreakNode,
              lexical.ParagraphNode,
              lexical.TextNode,
              link.LinkNode,
              HeadingNode,
              QuoteNode,
              list.ListNode,
              list.ListItemNode,
              code.CodeHighlightNode,
              code.CodeNode,
              hashtag.HashtagNode,
              mark.MarkNode,
              overflow.OverflowNode,
              table.TableNode,
              table.TableCellNode,
              table.TableRowNode,
              link.AutoLinkNode,
              NumberNode,
            ],
          });
        }
        this.#editor.setRootElement(this.#rootEl);

        // this.#editorListeners.push(initMarkdownShortCuts(this.#editor))
        this.#editorListeners.push(initPlainText(this.#editor));
        this.#editorListeners.push(register(this.#editor));

        this.#editor.registerUpdateListener(({ editorState }) => {
          editorState.read(() => {
            // const toMarkdownString = markdown.$convertToMarkdownString(
            //   markdown.TRANSFORMERS
            // );
            // console.log(toMarkdownString);
            const root = lexical.$getRoot();
            // console.log(root.getTextContent())
          });
        });
      });
    }

    disconnectedCallback() {
      this.#editorListeners.forEach(function (removeListener) {
        removeListener();
      });
      this.#editor.setRootElement(null);
    }
  },
);
