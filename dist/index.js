(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // node_modules/lexical/Lexical.dev.js
  var require_Lexical_dev = __commonJS({
    "node_modules/lexical/Lexical.dev.js"(exports) {
      "use strict";
      function createCommand() {
        return {};
      }
      var SELECTION_CHANGE_COMMAND = createCommand();
      var CLICK_COMMAND = createCommand();
      var DELETE_CHARACTER_COMMAND = createCommand();
      var INSERT_LINE_BREAK_COMMAND = createCommand();
      var INSERT_PARAGRAPH_COMMAND = createCommand();
      var CONTROLLED_TEXT_INSERTION_COMMAND = createCommand();
      var PASTE_COMMAND = createCommand();
      var REMOVE_TEXT_COMMAND = createCommand();
      var DELETE_WORD_COMMAND = createCommand();
      var DELETE_LINE_COMMAND = createCommand();
      var FORMAT_TEXT_COMMAND = createCommand();
      var UNDO_COMMAND = createCommand();
      var REDO_COMMAND = createCommand();
      var KEY_ARROW_RIGHT_COMMAND = createCommand();
      var MOVE_TO_END = createCommand();
      var KEY_ARROW_LEFT_COMMAND = createCommand();
      var MOVE_TO_START = createCommand();
      var KEY_ARROW_UP_COMMAND = createCommand();
      var KEY_ARROW_DOWN_COMMAND = createCommand();
      var KEY_ENTER_COMMAND = createCommand();
      var KEY_SPACE_COMMAND = createCommand();
      var KEY_BACKSPACE_COMMAND = createCommand();
      var KEY_ESCAPE_COMMAND = createCommand();
      var KEY_DELETE_COMMAND = createCommand();
      var KEY_TAB_COMMAND = createCommand();
      var INDENT_CONTENT_COMMAND = createCommand();
      var OUTDENT_CONTENT_COMMAND = createCommand();
      var DROP_COMMAND = createCommand();
      var FORMAT_ELEMENT_COMMAND = createCommand();
      var DRAGSTART_COMMAND = createCommand();
      var DRAGOVER_COMMAND = createCommand();
      var DRAGEND_COMMAND = createCommand();
      var COPY_COMMAND = createCommand();
      var CUT_COMMAND = createCommand();
      var CLEAR_EDITOR_COMMAND = createCommand();
      var CLEAR_HISTORY_COMMAND = createCommand();
      var CAN_REDO_COMMAND = createCommand();
      var CAN_UNDO_COMMAND = createCommand();
      var FOCUS_COMMAND = createCommand();
      var BLUR_COMMAND = createCommand();
      var KEY_MODIFIER_COMMAND = createCommand();
      var getSelection = () => window.getSelection();
      var getDOMSelection = getSelection;
      var CAN_USE_DOM = typeof window !== "undefined" && typeof window.document !== "undefined" && typeof window.document.createElement !== "undefined";
      var documentMode = CAN_USE_DOM && "documentMode" in document ? document.documentMode : null;
      var IS_APPLE = CAN_USE_DOM && /Mac|iPod|iPhone|iPad/.test(navigator.platform);
      var IS_FIREFOX = CAN_USE_DOM && /^(?!.*Seamonkey)(?=.*Firefox).*/i.test(navigator.userAgent);
      var CAN_USE_BEFORE_INPUT = CAN_USE_DOM && "InputEvent" in window && !documentMode ? "getTargetRanges" in new window.InputEvent("input") : false;
      var IS_SAFARI = CAN_USE_DOM && /Version\/[\d.]+.*Safari/.test(navigator.userAgent);
      var IS_IOS = CAN_USE_DOM && /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
      var DOM_ELEMENT_TYPE = 1;
      var DOM_TEXT_TYPE = 3;
      var NO_DIRTY_NODES = 0;
      var HAS_DIRTY_NODES = 1;
      var FULL_RECONCILE = 2;
      var IS_NORMAL = 0;
      var IS_TOKEN = 1;
      var IS_SEGMENTED = 2;
      var IS_BOLD = 1;
      var IS_ITALIC = 1 << 1;
      var IS_STRIKETHROUGH = 1 << 2;
      var IS_UNDERLINE = 1 << 3;
      var IS_CODE = 1 << 4;
      var IS_SUBSCRIPT = 1 << 5;
      var IS_SUPERSCRIPT = 1 << 6;
      var IS_ALL_FORMATTING = IS_BOLD | IS_ITALIC | IS_STRIKETHROUGH | IS_UNDERLINE | IS_CODE | IS_SUBSCRIPT | IS_SUPERSCRIPT;
      var IS_DIRECTIONLESS = 1;
      var IS_UNMERGEABLE = 1 << 1;
      var IS_ALIGN_LEFT = 1;
      var IS_ALIGN_CENTER = 2;
      var IS_ALIGN_RIGHT = 3;
      var IS_ALIGN_JUSTIFY = 4;
      var NON_BREAKING_SPACE = "\xA0";
      var ZERO_WIDTH_SPACE = "\u200B";
      var COMPOSITION_SUFFIX = IS_SAFARI || IS_IOS ? NON_BREAKING_SPACE : ZERO_WIDTH_SPACE;
      var DOUBLE_LINE_BREAK = "\n\n";
      var COMPOSITION_START_CHAR = IS_FIREFOX ? NON_BREAKING_SPACE : COMPOSITION_SUFFIX;
      var RTL = "\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC";
      var LTR = "A-Za-z\xC0-\xD6\xD8-\xF6\xF8-\u02B8\u0300-\u0590\u0800-\u1FFF\u200E\u2C00-\uFB1C\uFE00-\uFE6F\uFEFD-\uFFFF";
      var RTL_REGEX = new RegExp("^[^" + LTR + "]*[" + RTL + "]");
      var LTR_REGEX = new RegExp("^[^" + RTL + "]*[" + LTR + "]");
      var TEXT_TYPE_TO_FORMAT = {
        bold: IS_BOLD,
        code: IS_CODE,
        italic: IS_ITALIC,
        strikethrough: IS_STRIKETHROUGH,
        subscript: IS_SUBSCRIPT,
        superscript: IS_SUPERSCRIPT,
        underline: IS_UNDERLINE
      };
      var DETAIL_TYPE_TO_DETAIL = {
        directionless: IS_DIRECTIONLESS,
        unmergeable: IS_UNMERGEABLE
      };
      var ELEMENT_TYPE_TO_FORMAT = {
        center: IS_ALIGN_CENTER,
        justify: IS_ALIGN_JUSTIFY,
        left: IS_ALIGN_LEFT,
        right: IS_ALIGN_RIGHT
      };
      var ELEMENT_FORMAT_TO_TYPE = {
        [IS_ALIGN_CENTER]: "center",
        [IS_ALIGN_JUSTIFY]: "justify",
        [IS_ALIGN_LEFT]: "left",
        [IS_ALIGN_RIGHT]: "right"
      };
      var TEXT_MODE_TO_TYPE = {
        normal: IS_NORMAL,
        segmented: IS_SEGMENTED,
        token: IS_TOKEN
      };
      var TEXT_TYPE_TO_MODE = {
        [IS_NORMAL]: "normal",
        [IS_SEGMENTED]: "segmented",
        [IS_TOKEN]: "token"
      };
      var TEXT_MUTATION_VARIANCE = 100;
      var isProcessingMutations = false;
      var lastTextEntryTimeStamp = 0;
      function getIsProcesssingMutations() {
        return isProcessingMutations;
      }
      function updateTimeStamp(event) {
        lastTextEntryTimeStamp = event.timeStamp;
      }
      function initTextEntryListener(editor) {
        if (lastTextEntryTimeStamp === 0) {
          getWindow(editor).addEventListener("textInput", updateTimeStamp, true);
        }
      }
      function isManagedLineBreak(dom, target, editor) {
        return target.__lexicalLineBreak === dom || dom[`__lexicalKey_${editor._key}`] !== void 0;
      }
      function getLastSelection(editor) {
        return editor.getEditorState().read(() => {
          const selection = $getSelection();
          return selection !== null ? selection.clone() : null;
        });
      }
      function handleTextMutation(target, node, editor) {
        const domSelection = getDOMSelection();
        let anchorOffset = null;
        let focusOffset = null;
        if (domSelection !== null && domSelection.anchorNode === target) {
          anchorOffset = domSelection.anchorOffset;
          focusOffset = domSelection.focusOffset;
        }
        const text = target.nodeValue;
        if (text !== null) {
          $updateTextNodeFromDOMContent(node, text, anchorOffset, focusOffset, false);
        }
      }
      function shouldUpdateTextNodeFromMutation(selection, targetDOM, targetNode) {
        if ($isRangeSelection(selection)) {
          const anchorNode = selection.anchor.getNode();
          if (anchorNode.is(targetNode) && selection.format !== anchorNode.getFormat()) {
            return false;
          }
        }
        return targetDOM.nodeType === DOM_TEXT_TYPE && targetNode.isAttached();
      }
      function $flushMutations$1(editor, mutations, observer) {
        isProcessingMutations = true;
        const shouldFlushTextMutations = performance.now() - lastTextEntryTimeStamp > TEXT_MUTATION_VARIANCE;
        try {
          updateEditor(editor, () => {
            const selection = $getSelection() || getLastSelection(editor);
            const badDOMTargets = /* @__PURE__ */ new Map();
            const rootElement = editor.getRootElement();
            const currentEditorState = editor._editorState;
            let shouldRevertSelection = false;
            let possibleTextForFirefoxPaste = "";
            for (let i = 0; i < mutations.length; i++) {
              const mutation = mutations[i];
              const type = mutation.type;
              const targetDOM = mutation.target;
              let targetNode = $getNearestNodeFromDOMNode(targetDOM, currentEditorState);
              if ($isDecoratorNode(targetNode)) {
                continue;
              }
              if (type === "characterData") {
                if (shouldFlushTextMutations && $isTextNode(targetNode) && shouldUpdateTextNodeFromMutation(selection, targetDOM, targetNode)) {
                  handleTextMutation(
                    targetDOM,
                    targetNode
                  );
                }
              } else if (type === "childList") {
                shouldRevertSelection = true;
                const addedDOMs = mutation.addedNodes;
                for (let s = 0; s < addedDOMs.length; s++) {
                  const addedDOM = addedDOMs[s];
                  const node = getNodeFromDOMNode(addedDOM);
                  const parentDOM = addedDOM.parentNode;
                  if (parentDOM != null && node === null && (addedDOM.nodeName !== "BR" || !isManagedLineBreak(addedDOM, parentDOM, editor))) {
                    if (IS_FIREFOX) {
                      const possibleText = addedDOM.innerText || addedDOM.nodeValue;
                      if (possibleText) {
                        possibleTextForFirefoxPaste += possibleText;
                      }
                    }
                    parentDOM.removeChild(addedDOM);
                  }
                }
                const removedDOMs = mutation.removedNodes;
                const removedDOMsLength = removedDOMs.length;
                if (removedDOMsLength > 0) {
                  let unremovedBRs = 0;
                  for (let s = 0; s < removedDOMsLength; s++) {
                    const removedDOM = removedDOMs[s];
                    if (removedDOM.nodeName === "BR" && isManagedLineBreak(removedDOM, targetDOM, editor)) {
                      targetDOM.appendChild(removedDOM);
                      unremovedBRs++;
                    }
                  }
                  if (removedDOMsLength !== unremovedBRs) {
                    if (targetDOM === rootElement) {
                      targetNode = internalGetRoot(currentEditorState);
                    }
                    badDOMTargets.set(targetDOM, targetNode);
                  }
                }
              }
            }
            if (badDOMTargets.size > 0) {
              for (const [targetDOM, targetNode] of badDOMTargets) {
                if ($isElementNode(targetNode)) {
                  const childKeys = targetNode.__children;
                  let currentDOM = targetDOM.firstChild;
                  for (let s = 0; s < childKeys.length; s++) {
                    const key = childKeys[s];
                    const correctDOM = editor.getElementByKey(key);
                    if (correctDOM === null) {
                      continue;
                    }
                    if (currentDOM == null) {
                      targetDOM.appendChild(correctDOM);
                      currentDOM = correctDOM;
                    } else if (currentDOM !== correctDOM) {
                      targetDOM.replaceChild(correctDOM, currentDOM);
                    }
                    currentDOM = currentDOM.nextSibling;
                  }
                } else if ($isTextNode(targetNode)) {
                  targetNode.markDirty();
                }
              }
            }
            const records = observer.takeRecords();
            if (records.length > 0) {
              for (let i = 0; i < records.length; i++) {
                const record = records[i];
                const addedNodes = record.addedNodes;
                const target = record.target;
                for (let s = 0; s < addedNodes.length; s++) {
                  const addedDOM = addedNodes[s];
                  const parentDOM = addedDOM.parentNode;
                  if (parentDOM != null && addedDOM.nodeName === "BR" && !isManagedLineBreak(addedDOM, target, editor)) {
                    parentDOM.removeChild(addedDOM);
                  }
                }
              }
              observer.takeRecords();
            }
            if (selection !== null) {
              if (shouldRevertSelection) {
                selection.dirty = true;
                $setSelection(selection);
              }
              if (IS_FIREFOX && isFirefoxClipboardEvents(editor)) {
                selection.insertRawText(possibleTextForFirefoxPaste);
              }
            }
          });
        } finally {
          isProcessingMutations = false;
        }
      }
      function flushRootMutations(editor) {
        const observer = editor._observer;
        if (observer !== null) {
          const mutations = observer.takeRecords();
          $flushMutations$1(editor, mutations, observer);
        }
      }
      function initMutationObserver(editor) {
        initTextEntryListener(editor);
        editor._observer = new MutationObserver((mutations, observer) => {
          $flushMutations$1(editor, mutations, observer);
        });
      }
      var keyCounter = 1;
      function generateRandomKey() {
        return "" + keyCounter++;
      }
      function getRegisteredNodeOrThrow(editor, nodeType) {
        const registeredNode = editor._nodes.get(nodeType);
        if (registeredNode === void 0) {
          {
            throw Error(`registeredNode: Type ${nodeType} not found`);
          }
        }
        return registeredNode;
      }
      var scheduleMicroTask = typeof queueMicrotask === "function" ? queueMicrotask : (fn) => {
        Promise.resolve().then(fn);
      };
      function $isSelectionCapturedInDecorator(node) {
        return $isDecoratorNode($getNearestNodeFromDOMNode(node));
      }
      function isSelectionCapturedInDecoratorInput(anchorDOM) {
        const activeElement = document.activeElement;
        const nodeName = activeElement !== null ? activeElement.nodeName : null;
        return !$isDecoratorNode($getNearestNodeFromDOMNode(anchorDOM)) || nodeName !== "INPUT" && nodeName !== "TEXTAREA";
      }
      function isSelectionWithinEditor(editor, anchorDOM, focusDOM) {
        const rootElement = editor.getRootElement();
        try {
          return rootElement !== null && rootElement.contains(anchorDOM) && rootElement.contains(focusDOM) && anchorDOM !== null && isSelectionCapturedInDecoratorInput(anchorDOM) && getNearestEditorFromDOMNode(anchorDOM) === editor;
        } catch (error) {
          return false;
        }
      }
      function getNearestEditorFromDOMNode(node) {
        let currentNode = node;
        while (currentNode != null) {
          const editor = currentNode.__lexicalEditor;
          if (editor != null) {
            return editor;
          }
          currentNode = currentNode.parentNode;
        }
        return null;
      }
      function getTextDirection(text) {
        if (RTL_REGEX.test(text)) {
          return "rtl";
        }
        if (LTR_REGEX.test(text)) {
          return "ltr";
        }
        return null;
      }
      function $isTokenOrSegmented(node) {
        return node.isToken() || node.isSegmented();
      }
      function isDOMNodeLexicalTextNode(node) {
        return node.nodeType === DOM_TEXT_TYPE;
      }
      function getDOMTextNode(element) {
        let node = element;
        while (node != null) {
          if (isDOMNodeLexicalTextNode(node)) {
            return node;
          }
          node = node.firstChild;
        }
        return null;
      }
      function toggleTextFormatType(format, type, alignWithFormat) {
        const activeFormat = TEXT_TYPE_TO_FORMAT[type];
        const isStateFlagPresent = format & activeFormat;
        if (isStateFlagPresent && (alignWithFormat === null || (alignWithFormat & activeFormat) === 0)) {
          return format ^ activeFormat;
        }
        if (alignWithFormat === null || alignWithFormat & activeFormat) {
          return format | activeFormat;
        }
        return format;
      }
      function $isLeafNode(node) {
        return $isTextNode(node) || $isLineBreakNode(node) || $isDecoratorNode(node);
      }
      function $setNodeKey(node, existingKey) {
        if (existingKey != null) {
          node.__key = existingKey;
          return;
        }
        errorOnReadOnly();
        errorOnInfiniteTransforms();
        const editor = getActiveEditor();
        const editorState = getActiveEditorState();
        const key = generateRandomKey();
        editorState._nodeMap.set(key, node);
        if ($isElementNode(node)) {
          editor._dirtyElements.set(key, true);
        } else {
          editor._dirtyLeaves.add(key);
        }
        editor._cloneNotNeeded.add(key);
        editor._dirtyType = HAS_DIRTY_NODES;
        node.__key = key;
      }
      function internalMarkParentElementsAsDirty(parentKey, nodeMap, dirtyElements) {
        let nextParentKey = parentKey;
        while (nextParentKey !== null) {
          if (dirtyElements.has(nextParentKey)) {
            return;
          }
          const node = nodeMap.get(nextParentKey);
          if (node === void 0) {
            break;
          }
          dirtyElements.set(nextParentKey, false);
          nextParentKey = node.__parent;
        }
      }
      function removeFromParent(writableNode) {
        const oldParent = writableNode.getParent();
        if (oldParent !== null) {
          const writableParent = oldParent.getWritable();
          const children = writableParent.__children;
          const index = children.indexOf(writableNode.__key);
          if (index === -1) {
            {
              throw Error(`Node is not a child of its parent`);
            }
          }
          internalMarkSiblingsAsDirty(writableNode);
          children.splice(index, 1);
        }
      }
      function internalMarkNodeAsDirty(node) {
        errorOnInfiniteTransforms();
        const latest = node.getLatest();
        const parent = latest.__parent;
        const editorState = getActiveEditorState();
        const editor = getActiveEditor();
        const nodeMap = editorState._nodeMap;
        const dirtyElements = editor._dirtyElements;
        if (parent !== null) {
          internalMarkParentElementsAsDirty(parent, nodeMap, dirtyElements);
        }
        const key = latest.__key;
        editor._dirtyType = HAS_DIRTY_NODES;
        if ($isElementNode(node)) {
          dirtyElements.set(key, true);
        } else {
          editor._dirtyLeaves.add(key);
        }
      }
      function internalMarkSiblingsAsDirty(node) {
        const previousNode = node.getPreviousSibling();
        const nextNode = node.getNextSibling();
        if (previousNode !== null) {
          internalMarkNodeAsDirty(previousNode);
        }
        if (nextNode !== null) {
          internalMarkNodeAsDirty(nextNode);
        }
      }
      function $setCompositionKey(compositionKey) {
        errorOnReadOnly();
        const editor = getActiveEditor();
        const previousCompositionKey = editor._compositionKey;
        if (compositionKey !== previousCompositionKey) {
          editor._compositionKey = compositionKey;
          if (previousCompositionKey !== null) {
            const node = $getNodeByKey(previousCompositionKey);
            if (node !== null) {
              node.getWritable();
            }
          }
          if (compositionKey !== null) {
            const node = $getNodeByKey(compositionKey);
            if (node !== null) {
              node.getWritable();
            }
          }
        }
      }
      function $getCompositionKey() {
        if (isCurrentlyReadOnlyMode()) {
          return null;
        }
        const editor = getActiveEditor();
        return editor._compositionKey;
      }
      function $getNodeByKey(key, _editorState) {
        const editorState = _editorState || getActiveEditorState();
        const node = editorState._nodeMap.get(key);
        if (node === void 0) {
          return null;
        }
        return node;
      }
      function getNodeFromDOMNode(dom, editorState) {
        const editor = getActiveEditor();
        const key = dom[`__lexicalKey_${editor._key}`];
        if (key !== void 0) {
          return $getNodeByKey(key, editorState);
        }
        return null;
      }
      function $getNearestNodeFromDOMNode(startingDOM, editorState) {
        let dom = startingDOM;
        while (dom != null) {
          const node = getNodeFromDOMNode(dom, editorState);
          if (node !== null) {
            return node;
          }
          dom = dom.parentNode;
        }
        return null;
      }
      function cloneDecorators(editor) {
        const currentDecorators = editor._decorators;
        const pendingDecorators = Object.assign({}, currentDecorators);
        editor._pendingDecorators = pendingDecorators;
        return pendingDecorators;
      }
      function getEditorStateTextContent(editorState) {
        return editorState.read(() => $getRoot().getTextContent());
      }
      function markAllNodesAsDirty(editor, type) {
        updateEditor(editor, () => {
          const editorState = getActiveEditorState();
          if (editorState.isEmpty()) {
            return;
          }
          if (type === "root") {
            $getRoot().markDirty();
            return;
          }
          const nodeMap = editorState._nodeMap;
          for (const [, node] of nodeMap) {
            node.markDirty();
          }
        }, editor._pendingEditorState === null ? {
          tag: "history-merge"
        } : void 0);
      }
      function $getRoot() {
        return internalGetRoot(getActiveEditorState());
      }
      function internalGetRoot(editorState) {
        return editorState._nodeMap.get("root");
      }
      function $setSelection(selection) {
        const editorState = getActiveEditorState();
        if (selection !== null) {
          {
            if (Object.isFrozen(selection)) {
              {
                throw Error(`$setSelection called on frozen selection object. Ensure selection is cloned before passing in.`);
              }
            }
          }
          selection.dirty = true;
          selection._cachedNodes = null;
        }
        editorState._selection = selection;
      }
      function $flushMutations() {
        errorOnReadOnly();
        const editor = getActiveEditor();
        flushRootMutations(editor);
      }
      function getNodeFromDOM(dom) {
        const editor = getActiveEditor();
        const nodeKey = getNodeKeyFromDOM(dom, editor);
        if (nodeKey === null) {
          const rootElement = editor.getRootElement();
          if (dom === rootElement) {
            return $getNodeByKey("root");
          }
          return null;
        }
        return $getNodeByKey(nodeKey);
      }
      function getTextNodeOffset(node, moveSelectionToEnd) {
        return moveSelectionToEnd ? node.getTextContentSize() : 0;
      }
      function getNodeKeyFromDOM(dom, editor) {
        let node = dom;
        while (node != null) {
          const key = node[`__lexicalKey_${editor._key}`];
          if (key !== void 0) {
            return key;
          }
          node = node.parentNode;
        }
        return null;
      }
      function doesContainGrapheme(str) {
        return /[\uD800-\uDBFF][\uDC00-\uDFFF]/g.test(str);
      }
      function getEditorsToPropagate(editor) {
        const editorsToPropagate = [];
        let currentEditor = editor;
        while (currentEditor !== null) {
          editorsToPropagate.push(currentEditor);
          currentEditor = currentEditor._parentEditor;
        }
        return editorsToPropagate;
      }
      function createUID() {
        return Math.random().toString(36).replace(/[^a-z]+/g, "").substr(0, 5);
      }
      function $updateSelectedTextFromDOM(isCompositionEnd, data) {
        const domSelection = getDOMSelection();
        if (domSelection === null) {
          return;
        }
        const anchorNode = domSelection.anchorNode;
        let {
          anchorOffset,
          focusOffset
        } = domSelection;
        if (anchorNode !== null && anchorNode.nodeType === DOM_TEXT_TYPE) {
          const node = $getNearestNodeFromDOMNode(anchorNode);
          if ($isTextNode(node)) {
            let textContent = anchorNode.nodeValue;
            if (textContent === COMPOSITION_SUFFIX && data) {
              const offset = data.length;
              textContent = data;
              anchorOffset = offset;
              focusOffset = offset;
            }
            if (textContent !== null) {
              $updateTextNodeFromDOMContent(node, textContent, anchorOffset, focusOffset, isCompositionEnd);
            }
          }
        }
      }
      function $updateTextNodeFromDOMContent(textNode, textContent, anchorOffset, focusOffset, compositionEnd) {
        let node = textNode;
        if (node.isAttached() && (compositionEnd || !node.isDirty())) {
          const isComposing = node.isComposing();
          let normalizedTextContent = textContent;
          if ((isComposing || compositionEnd) && textContent[textContent.length - 1] === COMPOSITION_SUFFIX) {
            normalizedTextContent = textContent.slice(0, -1);
          }
          const prevTextContent = node.getTextContent();
          if (compositionEnd || normalizedTextContent !== prevTextContent) {
            if (normalizedTextContent === "") {
              $setCompositionKey(null);
              if (!IS_SAFARI && !IS_IOS) {
                const editor = getActiveEditor();
                setTimeout(() => {
                  editor.update(() => {
                    if (node.isAttached()) {
                      node.remove();
                    }
                  });
                }, 20);
              } else {
                node.remove();
              }
              return;
            }
            const parent = node.getParent();
            const prevSelection = $getPreviousSelection();
            if (node.isToken() || $getCompositionKey() !== null && !isComposing || parent !== null && $isRangeSelection(prevSelection) && !parent.canInsertTextBefore() && prevSelection.anchor.offset === 0) {
              node.markDirty();
              return;
            }
            const selection = $getSelection();
            if (!$isRangeSelection(selection) || anchorOffset === null || focusOffset === null) {
              node.setTextContent(normalizedTextContent);
              return;
            }
            selection.setTextNodeRange(node, anchorOffset, node, focusOffset);
            if (node.isSegmented()) {
              const originalTextContent = node.getTextContent();
              const replacement = $createTextNode(originalTextContent);
              node.replace(replacement);
              node = replacement;
            }
            node.setTextContent(normalizedTextContent);
          }
        }
      }
      function $previousSiblingDoesNotAcceptText(node) {
        const previousSibling = node.getPreviousSibling();
        return ($isTextNode(previousSibling) || $isElementNode(previousSibling) && previousSibling.isInline()) && !previousSibling.canInsertTextAfter();
      }
      function $shouldInsertTextAfterOrBeforeTextNode(selection, node) {
        if (node.isSegmented()) {
          return true;
        }
        if (!selection.isCollapsed()) {
          return false;
        }
        const offset = selection.anchor.offset;
        const parent = node.getParentOrThrow();
        const isToken = node.isToken();
        if (offset === 0) {
          return !node.canInsertTextBefore() || !parent.canInsertTextBefore() || isToken || $previousSiblingDoesNotAcceptText(node);
        } else if (offset === node.getTextContentSize()) {
          return !node.canInsertTextAfter() || !parent.canInsertTextAfter() || isToken;
        } else {
          return false;
        }
      }
      function $shouldPreventDefaultAndInsertText(selection, text) {
        const anchor = selection.anchor;
        const focus = selection.focus;
        const anchorNode = anchor.getNode();
        const domSelection = getDOMSelection();
        const domAnchorNode = domSelection !== null ? domSelection.anchorNode : null;
        const anchorKey = anchor.key;
        const backingAnchorElement = getActiveEditor().getElementByKey(anchorKey);
        const textLength = text.length;
        return anchorKey !== focus.key || !$isTextNode(anchorNode) || (textLength < 2 || doesContainGrapheme(text)) && anchor.offset !== focus.offset && !anchorNode.isComposing() || $isTokenOrSegmented(anchorNode) || anchorNode.isDirty() && textLength > 1 || backingAnchorElement !== null && !anchorNode.isComposing() && domAnchorNode !== getDOMTextNode(backingAnchorElement) || anchorNode.getFormat() !== selection.format || $shouldInsertTextAfterOrBeforeTextNode(selection, anchorNode);
      }
      function isTab(keyCode, altKey, ctrlKey, metaKey) {
        return keyCode === 9 && !altKey && !ctrlKey && !metaKey;
      }
      function isBold(keyCode, altKey, metaKey, ctrlKey) {
        return keyCode === 66 && !altKey && controlOrMeta(metaKey, ctrlKey);
      }
      function isItalic(keyCode, altKey, metaKey, ctrlKey) {
        return keyCode === 73 && !altKey && controlOrMeta(metaKey, ctrlKey);
      }
      function isUnderline(keyCode, altKey, metaKey, ctrlKey) {
        return keyCode === 85 && !altKey && controlOrMeta(metaKey, ctrlKey);
      }
      function isParagraph(keyCode, shiftKey) {
        return isReturn(keyCode) && !shiftKey;
      }
      function isLineBreak(keyCode, shiftKey) {
        return isReturn(keyCode) && shiftKey;
      }
      function isOpenLineBreak(keyCode, ctrlKey) {
        return IS_APPLE && ctrlKey && keyCode === 79;
      }
      function isDeleteWordBackward(keyCode, altKey, ctrlKey) {
        return isBackspace(keyCode) && (IS_APPLE ? altKey : ctrlKey);
      }
      function isDeleteWordForward(keyCode, altKey, ctrlKey) {
        return isDelete(keyCode) && (IS_APPLE ? altKey : ctrlKey);
      }
      function isDeleteLineBackward(keyCode, metaKey) {
        return IS_APPLE && metaKey && isBackspace(keyCode);
      }
      function isDeleteLineForward(keyCode, metaKey) {
        return IS_APPLE && metaKey && isDelete(keyCode);
      }
      function isDeleteBackward(keyCode, altKey, metaKey, ctrlKey) {
        if (IS_APPLE) {
          if (altKey || metaKey) {
            return false;
          }
          return isBackspace(keyCode) || keyCode === 72 && ctrlKey;
        }
        if (ctrlKey || altKey || metaKey) {
          return false;
        }
        return isBackspace(keyCode);
      }
      function isDeleteForward(keyCode, ctrlKey, shiftKey, altKey, metaKey) {
        if (IS_APPLE) {
          if (shiftKey || altKey || metaKey) {
            return false;
          }
          return isDelete(keyCode) || keyCode === 68 && ctrlKey;
        }
        if (ctrlKey || altKey || metaKey) {
          return false;
        }
        return isDelete(keyCode);
      }
      function isUndo(keyCode, shiftKey, metaKey, ctrlKey) {
        return keyCode === 90 && !shiftKey && controlOrMeta(metaKey, ctrlKey);
      }
      function isRedo(keyCode, shiftKey, metaKey, ctrlKey) {
        if (IS_APPLE) {
          return keyCode === 90 && metaKey && shiftKey;
        }
        return keyCode === 89 && ctrlKey || keyCode === 90 && ctrlKey && shiftKey;
      }
      function isCopy(keyCode, shiftKey, metaKey, ctrlKey) {
        if (shiftKey) {
          return false;
        }
        if (keyCode === 67) {
          return IS_APPLE ? metaKey : ctrlKey;
        }
        return false;
      }
      function isCut(keyCode, shiftKey, metaKey, ctrlKey) {
        if (shiftKey) {
          return false;
        }
        if (keyCode === 88) {
          return IS_APPLE ? metaKey : ctrlKey;
        }
        return false;
      }
      function isArrowLeft(keyCode) {
        return keyCode === 37;
      }
      function isArrowRight(keyCode) {
        return keyCode === 39;
      }
      function isArrowUp(keyCode) {
        return keyCode === 38;
      }
      function isArrowDown(keyCode) {
        return keyCode === 40;
      }
      function isMoveBackward(keyCode, ctrlKey, altKey, metaKey) {
        return isArrowLeft(keyCode) && !ctrlKey && !metaKey && !altKey;
      }
      function isMoveToStart(keyCode, ctrlKey, shiftKey, altKey, metaKey) {
        return isArrowLeft(keyCode) && !altKey && !shiftKey && (ctrlKey || metaKey);
      }
      function isMoveForward(keyCode, ctrlKey, altKey, metaKey) {
        return isArrowRight(keyCode) && !ctrlKey && !metaKey && !altKey;
      }
      function isMoveToEnd(keyCode, ctrlKey, shiftKey, altKey, metaKey) {
        return isArrowRight(keyCode) && !altKey && !shiftKey && (ctrlKey || metaKey);
      }
      function isMoveUp(keyCode, ctrlKey, metaKey) {
        return isArrowUp(keyCode) && !ctrlKey && !metaKey;
      }
      function isMoveDown(keyCode, ctrlKey, metaKey) {
        return isArrowDown(keyCode) && !ctrlKey && !metaKey;
      }
      function isModifier(ctrlKey, shiftKey, altKey, metaKey) {
        return ctrlKey || shiftKey || altKey || metaKey;
      }
      function isSpace(keyCode) {
        return keyCode === 32;
      }
      function controlOrMeta(metaKey, ctrlKey) {
        if (IS_APPLE) {
          return metaKey;
        }
        return ctrlKey;
      }
      function isReturn(keyCode) {
        return keyCode === 13;
      }
      function isBackspace(keyCode) {
        return keyCode === 8;
      }
      function isEscape(keyCode) {
        return keyCode === 27;
      }
      function isDelete(keyCode) {
        return keyCode === 46;
      }
      function getCachedClassNameArray(classNamesTheme, classNameThemeType) {
        const classNames = classNamesTheme[classNameThemeType];
        if (typeof classNames === "string") {
          const classNamesArr = classNames.split(" ");
          classNamesTheme[classNameThemeType] = classNamesArr;
          return classNamesArr;
        }
        return classNames;
      }
      function setMutatedNode(mutatedNodes2, registeredNodes, mutationListeners, node, mutation) {
        if (mutationListeners.size === 0) {
          return;
        }
        const nodeType = node.__type;
        const nodeKey = node.__key;
        const registeredNode = registeredNodes.get(nodeType);
        if (registeredNode === void 0) {
          {
            throw Error(`Type ${nodeType} not in registeredNodes`);
          }
        }
        const klass = registeredNode.klass;
        let mutatedNodesByType = mutatedNodes2.get(klass);
        if (mutatedNodesByType === void 0) {
          mutatedNodesByType = /* @__PURE__ */ new Map();
          mutatedNodes2.set(klass, mutatedNodesByType);
        }
        if (!mutatedNodesByType.has(nodeKey)) {
          mutatedNodesByType.set(nodeKey, mutation);
        }
      }
      function $nodesOfType(klass) {
        const editorState = getActiveEditorState();
        const readOnly = editorState._readOnly;
        const klassType = klass.getType();
        const nodes = editorState._nodeMap;
        const nodesOfType = [];
        for (const [, node] of nodes) {
          if (node instanceof klass && node.__type === klassType && (readOnly || node.isAttached())) {
            nodesOfType.push(node);
          }
        }
        return nodesOfType;
      }
      function resolveElement(element, isBackward, focusOffset) {
        const parent = element.getParent();
        let offset = focusOffset;
        let block = element;
        if (parent !== null) {
          if (isBackward && focusOffset === 0) {
            offset = block.getIndexWithinParent();
            block = parent;
          } else if (!isBackward && focusOffset === block.getChildrenSize()) {
            offset = block.getIndexWithinParent() + 1;
            block = parent;
          }
        }
        return block.getChildAtIndex(isBackward ? offset - 1 : offset);
      }
      function $getDecoratorNode(focus, isBackward) {
        const focusOffset = focus.offset;
        if (focus.type === "element") {
          const block = focus.getNode();
          return resolveElement(block, isBackward, focusOffset);
        } else {
          const focusNode = focus.getNode();
          if (isBackward && focusOffset === 0 || !isBackward && focusOffset === focusNode.getTextContentSize()) {
            const possibleNode = isBackward ? focusNode.getPreviousSibling() : focusNode.getNextSibling();
            if (possibleNode === null) {
              return resolveElement(focusNode.getParentOrThrow(), isBackward, focusNode.getIndexWithinParent() + (isBackward ? 0 : 1));
            }
            return possibleNode;
          }
        }
        return null;
      }
      function isFirefoxClipboardEvents(editor) {
        const event = getWindow(editor).event;
        const inputType = event && event.inputType;
        return inputType === "insertFromPaste" || inputType === "insertFromPasteAsQuotation";
      }
      function dispatchCommand(editor, type, payload) {
        return triggerCommandListeners(editor, type, payload);
      }
      function $textContentRequiresDoubleLinebreakAtEnd(node) {
        return !$isRootNode(node) && !node.isLastChild() && !node.isInline();
      }
      function getElementByKeyOrThrow(editor, key) {
        const element = editor._keyToDOMMap.get(key);
        if (element === void 0) {
          {
            throw Error(`Reconciliation: could not find DOM element for node key ${key}`);
          }
        }
        return element;
      }
      function scrollIntoViewIfNeeded(editor, anchor, rootElement, tags) {
        let anchorNode = anchor.getNode();
        if ($isElementNode(anchorNode)) {
          const descendantNode = anchorNode.getDescendantByIndex(anchor.offset);
          if (descendantNode !== null) {
            anchorNode = descendantNode;
          }
        }
        const element = editor.getElementByKey(anchorNode.__key);
        if (element !== null) {
          const rect = element.getBoundingClientRect();
          if (rect.bottom > getWindow(editor).innerHeight) {
            element.scrollIntoView(false);
          } else if (rect.top < 0) {
            element.scrollIntoView();
          } else {
            const rootRect = rootElement.getBoundingClientRect();
            if (Math.floor(rect.bottom) > Math.floor(rootRect.bottom)) {
              element.scrollIntoView(false);
            } else if (Math.floor(rect.top) < Math.floor(rootRect.top)) {
              element.scrollIntoView();
            }
          }
          tags.add("scroll-into-view");
        }
      }
      function $addUpdateTag(tag) {
        errorOnReadOnly();
        const editor = getActiveEditor();
        editor._updateTags.add(tag);
      }
      function $maybeMoveChildrenSelectionToParent(parentNode, offset = 0) {
        if (offset !== 0) {
          {
            throw Error(`TODO`);
          }
        }
        const selection = $getSelection();
        if (!$isRangeSelection(selection) || !$isElementNode(parentNode)) {
          return selection;
        }
        const {
          anchor,
          focus
        } = selection;
        const anchorNode = anchor.getNode();
        const focusNode = focus.getNode();
        if ($hasAncestor(anchorNode, parentNode)) {
          anchor.set(parentNode.__key, 0, "element");
        }
        if ($hasAncestor(focusNode, parentNode)) {
          focus.set(parentNode.__key, 0, "element");
        }
        return selection;
      }
      function $hasAncestor(child, targetNode) {
        let parent = child.getParent();
        while (parent !== null) {
          if (parent.is(targetNode)) {
            return true;
          }
          parent = parent.getParent();
        }
        return false;
      }
      function getDefaultView(domElem) {
        const ownerDoc = domElem.ownerDocument;
        return ownerDoc && ownerDoc.defaultView || null;
      }
      function getWindow(editor) {
        const windowObj = editor._window;
        if (windowObj === null) {
          {
            throw Error(`window object not found`);
          }
        }
        return windowObj;
      }
      function $isInlineElementOrDecoratorNode(node) {
        return $isElementNode(node) && node.isInline() || $isDecoratorNode(node) && node.isInline();
      }
      function $isRootOrShadowRoot(node) {
        return $isRootNode(node) || $isElementNode(node) && node.isShadowRoot();
      }
      function $garbageCollectDetachedDecorators(editor, pendingEditorState) {
        const currentDecorators = editor._decorators;
        const pendingDecorators = editor._pendingDecorators;
        let decorators = pendingDecorators || currentDecorators;
        const nodeMap = pendingEditorState._nodeMap;
        let key;
        for (key in decorators) {
          if (!nodeMap.has(key)) {
            if (decorators === currentDecorators) {
              decorators = cloneDecorators(editor);
            }
            delete decorators[key];
          }
        }
      }
      function $garbageCollectDetachedDeepChildNodes(node, parentKey, prevNodeMap, nodeMap, dirtyNodes) {
        const children = node.__children;
        const childrenLength = children.length;
        for (let i = 0; i < childrenLength; i++) {
          const childKey = children[i];
          const child = nodeMap.get(childKey);
          if (child !== void 0 && child.__parent === parentKey) {
            if ($isElementNode(child)) {
              $garbageCollectDetachedDeepChildNodes(child, childKey, prevNodeMap, nodeMap, dirtyNodes);
            }
            if (!prevNodeMap.has(childKey)) {
              dirtyNodes.delete(childKey);
            }
            nodeMap.delete(childKey);
          }
        }
      }
      function $garbageCollectDetachedNodes(prevEditorState, editorState, dirtyLeaves, dirtyElements) {
        const prevNodeMap = prevEditorState._nodeMap;
        const nodeMap = editorState._nodeMap;
        for (const nodeKey of dirtyLeaves) {
          const node = nodeMap.get(nodeKey);
          if (node !== void 0 && !node.isAttached()) {
            if (!prevNodeMap.has(nodeKey)) {
              dirtyLeaves.delete(nodeKey);
            }
            nodeMap.delete(nodeKey);
          }
        }
        for (const [nodeKey] of dirtyElements) {
          const node = nodeMap.get(nodeKey);
          if (node !== void 0) {
            if (!node.isAttached()) {
              if ($isElementNode(node)) {
                $garbageCollectDetachedDeepChildNodes(node, nodeKey, prevNodeMap, nodeMap, dirtyElements);
              }
              if (!prevNodeMap.has(nodeKey)) {
                dirtyElements.delete(nodeKey);
              }
              nodeMap.delete(nodeKey);
            }
          }
        }
      }
      function $canSimpleTextNodesBeMerged(node1, node2) {
        const node1Mode = node1.__mode;
        const node1Format = node1.__format;
        const node1Style = node1.__style;
        const node2Mode = node2.__mode;
        const node2Format = node2.__format;
        const node2Style = node2.__style;
        return (node1Mode === null || node1Mode === node2Mode) && (node1Format === null || node1Format === node2Format) && (node1Style === null || node1Style === node2Style);
      }
      function $mergeTextNodes(node1, node2) {
        const writableNode1 = node1.mergeWithSibling(node2);
        const normalizedNodes = getActiveEditor()._normalizedNodes;
        normalizedNodes.add(node1.__key);
        normalizedNodes.add(node2.__key);
        return writableNode1;
      }
      function $normalizeTextNode(textNode) {
        let node = textNode;
        if (node.__text === "" && node.isSimpleText() && !node.isUnmergeable()) {
          node.remove();
          return;
        }
        let previousNode;
        while ((previousNode = node.getPreviousSibling()) !== null && $isTextNode(previousNode) && previousNode.isSimpleText() && !previousNode.isUnmergeable()) {
          if (previousNode.__text === "") {
            previousNode.remove();
          } else if ($canSimpleTextNodesBeMerged(previousNode, node)) {
            node = $mergeTextNodes(previousNode, node);
            break;
          } else {
            break;
          }
        }
        let nextNode;
        while ((nextNode = node.getNextSibling()) !== null && $isTextNode(nextNode) && nextNode.isSimpleText() && !nextNode.isUnmergeable()) {
          if (nextNode.__text === "") {
            nextNode.remove();
          } else if ($canSimpleTextNodesBeMerged(node, nextNode)) {
            node = $mergeTextNodes(node, nextNode);
            break;
          } else {
            break;
          }
        }
      }
      function $normalizeSelection(selection) {
        $normalizePoint(selection.anchor);
        $normalizePoint(selection.focus);
        return selection;
      }
      function $normalizePoint(point) {
        while (point.type === "element") {
          const node = point.getNode();
          const offset = point.offset;
          let nextNode;
          let nextOffsetAtEnd;
          if (offset === node.getChildrenSize()) {
            nextNode = node.getChildAtIndex(offset - 1);
            nextOffsetAtEnd = true;
          } else {
            nextNode = node.getChildAtIndex(offset);
            nextOffsetAtEnd = false;
          }
          if ($isTextNode(nextNode)) {
            point.set(nextNode.__key, nextOffsetAtEnd ? nextNode.getTextContentSize() : 0, "text");
            break;
          } else if (!$isElementNode(nextNode)) {
            break;
          }
          point.set(nextNode.__key, nextOffsetAtEnd ? nextNode.getChildrenSize() : 0, "element");
        }
      }
      var subTreeTextContent = "";
      var subTreeDirectionedTextContent = "";
      var editorTextContent = "";
      var activeEditorConfig;
      var activeEditor$1;
      var activeEditorNodes;
      var treatAllNodesAsDirty = false;
      var activeEditorStateReadOnly = false;
      var activeMutationListeners;
      var activeTextDirection = null;
      var activeDirtyElements;
      var activeDirtyLeaves;
      var activePrevNodeMap;
      var activeNextNodeMap;
      var activePrevKeyToDOMMap;
      var mutatedNodes;
      function destroyNode(key, parentDOM) {
        const node = activePrevNodeMap.get(key);
        if (parentDOM !== null) {
          const dom = getPrevElementByKeyOrThrow(key);
          parentDOM.removeChild(dom);
        }
        if (!activeNextNodeMap.has(key)) {
          activeEditor$1._keyToDOMMap.delete(key);
        }
        if ($isElementNode(node)) {
          const children = node.__children;
          destroyChildren(children, 0, children.length - 1, null);
        }
        if (node !== void 0) {
          setMutatedNode(mutatedNodes, activeEditorNodes, activeMutationListeners, node, "destroyed");
        }
      }
      function destroyChildren(children, _startIndex, endIndex, dom) {
        let startIndex = _startIndex;
        for (; startIndex <= endIndex; ++startIndex) {
          const child = children[startIndex];
          if (child !== void 0) {
            destroyNode(child, dom);
          }
        }
      }
      function setTextAlign(domStyle, value) {
        domStyle.setProperty("text-align", value);
      }
      function setElementIndent(dom, indent) {
        dom.style.setProperty("padding-inline-start", indent === 0 ? "" : indent * 20 + "px");
      }
      function setElementFormat(dom, format) {
        const domStyle = dom.style;
        if (format === 0) {
          setTextAlign(domStyle, "");
        } else if (format === IS_ALIGN_LEFT) {
          setTextAlign(domStyle, "left");
        } else if (format === IS_ALIGN_CENTER) {
          setTextAlign(domStyle, "center");
        } else if (format === IS_ALIGN_RIGHT) {
          setTextAlign(domStyle, "right");
        } else if (format === IS_ALIGN_JUSTIFY) {
          setTextAlign(domStyle, "justify");
        }
      }
      function createNode(key, parentDOM, insertDOM) {
        const node = activeNextNodeMap.get(key);
        if (node === void 0) {
          {
            throw Error(`createNode: node does not exist in nodeMap`);
          }
        }
        const dom = node.createDOM(activeEditorConfig, activeEditor$1);
        storeDOMWithKey(key, dom, activeEditor$1);
        if ($isTextNode(node)) {
          dom.setAttribute("data-lexical-text", "true");
        } else if ($isDecoratorNode(node)) {
          dom.setAttribute("data-lexical-decorator", "true");
        }
        if ($isElementNode(node)) {
          const indent = node.__indent;
          if (indent !== 0) {
            setElementIndent(dom, indent);
          }
          const children = node.__children;
          const childrenLength = children.length;
          if (childrenLength !== 0) {
            const endIndex = childrenLength - 1;
            createChildrenWithDirection(children, endIndex, node, dom);
          }
          const format = node.__format;
          if (format !== 0) {
            setElementFormat(dom, format);
          }
          reconcileElementTerminatingLineBreak(null, children, dom);
          if ($textContentRequiresDoubleLinebreakAtEnd(node)) {
            subTreeTextContent += DOUBLE_LINE_BREAK;
            editorTextContent += DOUBLE_LINE_BREAK;
          }
        } else {
          const text = node.getTextContent();
          if ($isDecoratorNode(node)) {
            const decorator = node.decorate(activeEditor$1, activeEditorConfig);
            if (decorator !== null) {
              reconcileDecorator(key, decorator);
            }
            dom.contentEditable = "false";
          } else if ($isTextNode(node)) {
            if (!node.isDirectionless()) {
              subTreeDirectionedTextContent += text;
            }
          }
          subTreeTextContent += text;
          editorTextContent += text;
        }
        if (parentDOM !== null) {
          if (insertDOM != null) {
            parentDOM.insertBefore(dom, insertDOM);
          } else {
            const possibleLineBreak = parentDOM.__lexicalLineBreak;
            if (possibleLineBreak != null) {
              parentDOM.insertBefore(dom, possibleLineBreak);
            } else {
              parentDOM.appendChild(dom);
            }
          }
        }
        {
          Object.freeze(node);
        }
        setMutatedNode(mutatedNodes, activeEditorNodes, activeMutationListeners, node, "created");
        return dom;
      }
      function createChildrenWithDirection(children, endIndex, element, dom) {
        const previousSubTreeDirectionedTextContent = subTreeDirectionedTextContent;
        subTreeDirectionedTextContent = "";
        createChildren(children, 0, endIndex, dom, null);
        reconcileBlockDirection(element, dom);
        subTreeDirectionedTextContent = previousSubTreeDirectionedTextContent;
      }
      function createChildren(children, _startIndex, endIndex, dom, insertDOM) {
        const previousSubTreeTextContent = subTreeTextContent;
        subTreeTextContent = "";
        let startIndex = _startIndex;
        for (; startIndex <= endIndex; ++startIndex) {
          createNode(children[startIndex], dom, insertDOM);
        }
        dom.__lexicalTextContent = subTreeTextContent;
        subTreeTextContent = previousSubTreeTextContent + subTreeTextContent;
      }
      function isLastChildLineBreakOrDecorator(children, nodeMap) {
        const childKey = children[children.length - 1];
        const node = nodeMap.get(childKey);
        return $isLineBreakNode(node) || $isDecoratorNode(node);
      }
      function reconcileElementTerminatingLineBreak(prevChildren, nextChildren, dom) {
        const prevLineBreak = prevChildren !== null && (prevChildren.length === 0 || isLastChildLineBreakOrDecorator(prevChildren, activePrevNodeMap));
        const nextLineBreak = nextChildren !== null && (nextChildren.length === 0 || isLastChildLineBreakOrDecorator(nextChildren, activeNextNodeMap));
        if (prevLineBreak) {
          if (!nextLineBreak) {
            const element = dom.__lexicalLineBreak;
            if (element != null) {
              dom.removeChild(element);
            }
            dom.__lexicalLineBreak = null;
          }
        } else if (nextLineBreak) {
          const element = document.createElement("br");
          dom.__lexicalLineBreak = element;
          dom.appendChild(element);
        }
      }
      function reconcileBlockDirection(element, dom) {
        const previousSubTreeDirectionTextContent = dom.__lexicalDirTextContent;
        const previousDirection = dom.__lexicalDir;
        if (previousSubTreeDirectionTextContent !== subTreeDirectionedTextContent || previousDirection !== activeTextDirection) {
          const hasEmptyDirectionedTextContent = subTreeDirectionedTextContent === "";
          const direction = hasEmptyDirectionedTextContent ? activeTextDirection : getTextDirection(subTreeDirectionedTextContent);
          if (direction !== previousDirection) {
            const classList = dom.classList;
            const theme = activeEditorConfig.theme;
            let previousDirectionTheme = previousDirection !== null ? theme[previousDirection] : void 0;
            let nextDirectionTheme = direction !== null ? theme[direction] : void 0;
            if (previousDirectionTheme !== void 0) {
              if (typeof previousDirectionTheme === "string") {
                const classNamesArr = previousDirectionTheme.split(" ");
                previousDirectionTheme = theme[previousDirection] = classNamesArr;
              }
              classList.remove(...previousDirectionTheme);
            }
            if (direction === null || hasEmptyDirectionedTextContent && direction === "ltr") {
              dom.removeAttribute("dir");
            } else {
              if (nextDirectionTheme !== void 0) {
                if (typeof nextDirectionTheme === "string") {
                  const classNamesArr = nextDirectionTheme.split(" ");
                  nextDirectionTheme = theme[direction] = classNamesArr;
                }
                if (nextDirectionTheme !== void 0) {
                  classList.add(...nextDirectionTheme);
                }
              }
              dom.dir = direction;
            }
            if (!activeEditorStateReadOnly) {
              const writableNode = element.getWritable();
              writableNode.__dir = direction;
            }
          }
          activeTextDirection = direction;
          dom.__lexicalDirTextContent = subTreeDirectionedTextContent;
          dom.__lexicalDir = direction;
        }
      }
      function reconcileChildrenWithDirection(prevChildren, nextChildren, element, dom) {
        const previousSubTreeDirectionTextContent = subTreeDirectionedTextContent;
        subTreeDirectionedTextContent = "";
        reconcileChildren(element, prevChildren, nextChildren, dom);
        reconcileBlockDirection(element, dom);
        subTreeDirectionedTextContent = previousSubTreeDirectionTextContent;
      }
      function reconcileChildren(element, prevChildren, nextChildren, dom) {
        const previousSubTreeTextContent = subTreeTextContent;
        subTreeTextContent = "";
        const prevChildrenLength = prevChildren.length;
        const nextChildrenLength = nextChildren.length;
        if (prevChildrenLength === 1 && nextChildrenLength === 1) {
          const prevChildKey = prevChildren[0];
          const nextChildKey = nextChildren[0];
          if (prevChildKey === nextChildKey) {
            reconcileNode(prevChildKey, dom);
          } else {
            const lastDOM = getPrevElementByKeyOrThrow(prevChildKey);
            const replacementDOM = createNode(nextChildKey, null, null);
            dom.replaceChild(replacementDOM, lastDOM);
            destroyNode(prevChildKey, null);
          }
        } else if (prevChildrenLength === 0) {
          if (nextChildrenLength !== 0) {
            createChildren(nextChildren, 0, nextChildrenLength - 1, dom, null);
          }
        } else if (nextChildrenLength === 0) {
          if (prevChildrenLength !== 0) {
            const lexicalLineBreak = dom.__lexicalLineBreak;
            const canUseFastPath = lexicalLineBreak == null;
            destroyChildren(prevChildren, 0, prevChildrenLength - 1, canUseFastPath ? null : dom);
            if (canUseFastPath) {
              dom.textContent = "";
            }
          }
        } else {
          reconcileNodeChildren(prevChildren, nextChildren, prevChildrenLength, nextChildrenLength, element, dom);
        }
        if ($textContentRequiresDoubleLinebreakAtEnd(element)) {
          subTreeTextContent += DOUBLE_LINE_BREAK;
        }
        dom.__lexicalTextContent = subTreeTextContent;
        subTreeTextContent = previousSubTreeTextContent + subTreeTextContent;
      }
      function reconcileNode(key, parentDOM) {
        const prevNode = activePrevNodeMap.get(key);
        let nextNode = activeNextNodeMap.get(key);
        if (prevNode === void 0 || nextNode === void 0) {
          {
            throw Error(`reconcileNode: prevNode or nextNode does not exist in nodeMap`);
          }
        }
        const isDirty = treatAllNodesAsDirty || activeDirtyLeaves.has(key) || activeDirtyElements.has(key);
        const dom = getElementByKeyOrThrow(activeEditor$1, key);
        if (prevNode === nextNode && !isDirty) {
          if ($isElementNode(prevNode)) {
            const previousSubTreeTextContent = dom.__lexicalTextContent;
            if (previousSubTreeTextContent !== void 0) {
              subTreeTextContent += previousSubTreeTextContent;
              editorTextContent += previousSubTreeTextContent;
            }
            const previousSubTreeDirectionTextContent = dom.__lexicalDirTextContent;
            if (previousSubTreeDirectionTextContent !== void 0) {
              subTreeDirectionedTextContent += previousSubTreeDirectionTextContent;
            }
          } else {
            const text = prevNode.getTextContent();
            if ($isTextNode(prevNode) && !prevNode.isDirectionless()) {
              subTreeDirectionedTextContent += text;
            }
            editorTextContent += text;
            subTreeTextContent += text;
          }
          return dom;
        }
        if (prevNode !== nextNode && isDirty) {
          setMutatedNode(mutatedNodes, activeEditorNodes, activeMutationListeners, nextNode, "updated");
        }
        if (nextNode.updateDOM(prevNode, dom, activeEditorConfig)) {
          const replacementDOM = createNode(key, null, null);
          if (parentDOM === null) {
            {
              throw Error(`reconcileNode: parentDOM is null`);
            }
          }
          parentDOM.replaceChild(replacementDOM, dom);
          destroyNode(key, null);
          return replacementDOM;
        }
        if ($isElementNode(prevNode) && $isElementNode(nextNode)) {
          const nextIndent = nextNode.__indent;
          if (nextIndent !== prevNode.__indent) {
            setElementIndent(dom, nextIndent);
          }
          const nextFormat = nextNode.__format;
          if (nextFormat !== prevNode.__format) {
            setElementFormat(dom, nextFormat);
          }
          const prevChildren = prevNode.__children;
          const nextChildren = nextNode.__children;
          const childrenAreDifferent = prevChildren !== nextChildren;
          if (childrenAreDifferent || isDirty) {
            reconcileChildrenWithDirection(prevChildren, nextChildren, nextNode, dom);
            if (!$isRootNode(nextNode)) {
              reconcileElementTerminatingLineBreak(prevChildren, nextChildren, dom);
            }
          }
          if ($textContentRequiresDoubleLinebreakAtEnd(nextNode)) {
            subTreeTextContent += DOUBLE_LINE_BREAK;
            editorTextContent += DOUBLE_LINE_BREAK;
          }
        } else {
          const text = nextNode.getTextContent();
          if ($isDecoratorNode(nextNode)) {
            const decorator = nextNode.decorate(activeEditor$1, activeEditorConfig);
            if (decorator !== null) {
              reconcileDecorator(key, decorator);
            }
          } else if ($isTextNode(nextNode) && !nextNode.isDirectionless()) {
            subTreeDirectionedTextContent += text;
          }
          subTreeTextContent += text;
          editorTextContent += text;
        }
        if (!activeEditorStateReadOnly && $isRootNode(nextNode) && nextNode.__cachedText !== editorTextContent) {
          nextNode = nextNode.getWritable();
          nextNode.__cachedText = editorTextContent;
        }
        {
          Object.freeze(nextNode);
        }
        return dom;
      }
      function reconcileDecorator(key, decorator) {
        let pendingDecorators = activeEditor$1._pendingDecorators;
        const currentDecorators = activeEditor$1._decorators;
        if (pendingDecorators === null) {
          if (currentDecorators[key] === decorator) {
            return;
          }
          pendingDecorators = cloneDecorators(activeEditor$1);
        }
        pendingDecorators[key] = decorator;
      }
      function getFirstChild(element) {
        return element.firstChild;
      }
      function getNextSibling(element) {
        return element.nextSibling;
      }
      function reconcileNodeChildren(prevChildren, nextChildren, prevChildrenLength, nextChildrenLength, element, dom) {
        const prevEndIndex = prevChildrenLength - 1;
        const nextEndIndex = nextChildrenLength - 1;
        let prevChildrenSet;
        let nextChildrenSet;
        let siblingDOM = getFirstChild(dom);
        let prevIndex = 0;
        let nextIndex = 0;
        while (prevIndex <= prevEndIndex && nextIndex <= nextEndIndex) {
          const prevKey = prevChildren[prevIndex];
          const nextKey = nextChildren[nextIndex];
          if (prevKey === nextKey) {
            siblingDOM = getNextSibling(reconcileNode(nextKey, dom));
            prevIndex++;
            nextIndex++;
          } else {
            if (prevChildrenSet === void 0) {
              prevChildrenSet = new Set(prevChildren);
            }
            if (nextChildrenSet === void 0) {
              nextChildrenSet = new Set(nextChildren);
            }
            const nextHasPrevKey = nextChildrenSet.has(prevKey);
            const prevHasNextKey = prevChildrenSet.has(nextKey);
            if (!nextHasPrevKey) {
              siblingDOM = getNextSibling(getPrevElementByKeyOrThrow(prevKey));
              destroyNode(prevKey, dom);
              prevIndex++;
            } else if (!prevHasNextKey) {
              createNode(nextKey, dom, siblingDOM);
              nextIndex++;
            } else {
              const childDOM = getElementByKeyOrThrow(activeEditor$1, nextKey);
              if (childDOM === siblingDOM) {
                siblingDOM = getNextSibling(reconcileNode(nextKey, dom));
              } else {
                if (siblingDOM != null) {
                  dom.insertBefore(childDOM, siblingDOM);
                } else {
                  dom.appendChild(childDOM);
                }
                reconcileNode(nextKey, dom);
              }
              prevIndex++;
              nextIndex++;
            }
          }
        }
        const appendNewChildren = prevIndex > prevEndIndex;
        const removeOldChildren = nextIndex > nextEndIndex;
        if (appendNewChildren && !removeOldChildren) {
          const previousNode = nextChildren[nextEndIndex + 1];
          const insertDOM = previousNode === void 0 ? null : activeEditor$1.getElementByKey(previousNode);
          createChildren(nextChildren, nextIndex, nextEndIndex, dom, insertDOM);
        } else if (removeOldChildren && !appendNewChildren) {
          destroyChildren(prevChildren, prevIndex, prevEndIndex, dom);
        }
      }
      function reconcileRoot(prevEditorState, nextEditorState, editor, dirtyType, dirtyElements, dirtyLeaves) {
        subTreeTextContent = "";
        editorTextContent = "";
        subTreeDirectionedTextContent = "";
        treatAllNodesAsDirty = dirtyType === FULL_RECONCILE;
        activeTextDirection = null;
        activeEditor$1 = editor;
        activeEditorConfig = editor._config;
        activeEditorNodes = editor._nodes;
        activeMutationListeners = activeEditor$1._listeners.mutation;
        activeDirtyElements = dirtyElements;
        activeDirtyLeaves = dirtyLeaves;
        activePrevNodeMap = prevEditorState._nodeMap;
        activeNextNodeMap = nextEditorState._nodeMap;
        activeEditorStateReadOnly = nextEditorState._readOnly;
        activePrevKeyToDOMMap = new Map(editor._keyToDOMMap);
        const currentMutatedNodes = /* @__PURE__ */ new Map();
        mutatedNodes = currentMutatedNodes;
        reconcileNode("root", null);
        activeEditor$1 = void 0;
        activeEditorNodes = void 0;
        activeDirtyElements = void 0;
        activeDirtyLeaves = void 0;
        activePrevNodeMap = void 0;
        activeNextNodeMap = void 0;
        activeEditorConfig = void 0;
        activePrevKeyToDOMMap = void 0;
        mutatedNodes = void 0;
        return currentMutatedNodes;
      }
      function storeDOMWithKey(key, dom, editor) {
        const keyToDOMMap = editor._keyToDOMMap;
        dom["__lexicalKey_" + editor._key] = key;
        keyToDOMMap.set(key, dom);
      }
      function getPrevElementByKeyOrThrow(key) {
        const element = activePrevKeyToDOMMap.get(key);
        if (element === void 0) {
          {
            throw Error(`Reconciliation: could not find DOM element for node key ${key}`);
          }
        }
        return element;
      }
      var PASS_THROUGH_COMMAND = Object.freeze({});
      var ANDROID_COMPOSITION_LATENCY = 30;
      var rootElementEvents = [["keydown", onKeyDown], ["mousedown", onMouseDown], ["compositionstart", onCompositionStart], ["compositionend", onCompositionEnd], ["input", onInput], ["click", onClick], ["cut", PASS_THROUGH_COMMAND], ["copy", PASS_THROUGH_COMMAND], ["dragstart", PASS_THROUGH_COMMAND], ["dragover", PASS_THROUGH_COMMAND], ["dragend", PASS_THROUGH_COMMAND], ["paste", PASS_THROUGH_COMMAND], ["focus", PASS_THROUGH_COMMAND], ["blur", PASS_THROUGH_COMMAND], ["drop", PASS_THROUGH_COMMAND]];
      if (CAN_USE_BEFORE_INPUT) {
        rootElementEvents.push(["beforeinput", (event, editor) => onBeforeInput(event, editor)]);
      }
      var lastKeyDownTimeStamp = 0;
      var lastKeyCode = 0;
      var rootElementsRegistered = 0;
      var isSelectionChangeFromDOMUpdate = false;
      var isSelectionChangeFromMouseDown = false;
      var isInsertLineBreak = false;
      var isFirefoxEndingComposition = false;
      var collapsedSelectionFormat = [0, 0, "root", 0];
      function shouldSkipSelectionChange(domNode, offset) {
        return domNode !== null && domNode.nodeValue !== null && domNode.nodeType === DOM_TEXT_TYPE && offset !== 0 && offset !== domNode.nodeValue.length;
      }
      function onSelectionChange(domSelection, editor, isActive) {
        const {
          anchorNode: anchorDOM,
          anchorOffset,
          focusNode: focusDOM,
          focusOffset
        } = domSelection;
        if (isSelectionChangeFromDOMUpdate) {
          isSelectionChangeFromDOMUpdate = false;
          if (shouldSkipSelectionChange(anchorDOM, anchorOffset) && shouldSkipSelectionChange(focusDOM, focusOffset)) {
            return;
          }
        }
        updateEditor(editor, () => {
          if (!isActive) {
            $setSelection(null);
            return;
          }
          if (!isSelectionWithinEditor(editor, anchorDOM, focusDOM)) {
            return;
          }
          const selection = $getSelection();
          if ($isRangeSelection(selection)) {
            const anchor = selection.anchor;
            const anchorNode = anchor.getNode();
            if (selection.isCollapsed()) {
              if (domSelection.type === "Range" && domSelection.anchorNode === domSelection.focusNode) {
                selection.dirty = true;
              }
              const windowEvent = getWindow(editor).event;
              const currentTimeStamp = windowEvent ? windowEvent.timeStamp : performance.now();
              const [lastFormat, lastOffset, lastKey, timeStamp] = collapsedSelectionFormat;
              if (currentTimeStamp < timeStamp + 200 && anchor.offset === lastOffset && anchor.key === lastKey) {
                selection.format = lastFormat;
              } else {
                if (anchor.type === "text") {
                  selection.format = anchorNode.getFormat();
                } else if (anchor.type === "element") {
                  selection.format = 0;
                }
              }
            } else {
              let combinedFormat = IS_ALL_FORMATTING;
              let hasTextNodes = false;
              const nodes = selection.getNodes();
              const nodesLength = nodes.length;
              for (let i = 0; i < nodesLength; i++) {
                const node = nodes[i];
                if ($isTextNode(node)) {
                  hasTextNodes = true;
                  combinedFormat &= node.getFormat();
                  if (combinedFormat === 0) {
                    break;
                  }
                }
              }
              selection.format = hasTextNodes ? combinedFormat : 0;
            }
          }
          dispatchCommand(editor, SELECTION_CHANGE_COMMAND, void 0);
        });
      }
      function onClick(event, editor) {
        updateEditor(editor, () => {
          const selection = $getSelection();
          const domSelection = getDOMSelection();
          const lastSelection = $getPreviousSelection();
          if ($isRangeSelection(selection)) {
            const anchor = selection.anchor;
            const anchorNode = anchor.getNode();
            if (domSelection && anchor.type === "element" && anchor.offset === 0 && selection.isCollapsed() && !$isRootNode(anchorNode) && $getRoot().getChildrenSize() === 1 && anchorNode.getTopLevelElementOrThrow().isEmpty() && lastSelection !== null && selection.is(lastSelection)) {
              domSelection.removeAllRanges();
              selection.dirty = true;
            }
          }
          dispatchCommand(editor, CLICK_COMMAND, event);
        });
      }
      function onMouseDown(event, editor) {
        const target = event.target;
        if (target instanceof Node) {
          updateEditor(editor, () => {
            if (!$isSelectionCapturedInDecorator(target)) {
              isSelectionChangeFromMouseDown = true;
            }
          });
        }
      }
      function $applyTargetRange(selection, event) {
        if (event.getTargetRanges) {
          const targetRange = event.getTargetRanges()[0];
          if (targetRange) {
            selection.applyDOMRange(targetRange);
          }
        }
      }
      function $canRemoveText(anchorNode, focusNode) {
        return anchorNode !== focusNode || $isElementNode(anchorNode) || $isElementNode(focusNode) || !anchorNode.isToken() || !focusNode.isToken();
      }
      function isPossiblyAndroidKeyPress(timeStamp) {
        return lastKeyCode === 229 && timeStamp < lastKeyDownTimeStamp + ANDROID_COMPOSITION_LATENCY;
      }
      function onBeforeInput(event, editor) {
        const inputType = event.inputType;
        if (inputType === "deleteCompositionText" || IS_FIREFOX && isFirefoxClipboardEvents(editor)) {
          return;
        } else if (inputType === "insertCompositionText") {
          return;
        }
        updateEditor(editor, () => {
          const selection = $getSelection();
          if (inputType === "deleteContentBackward") {
            if (selection === null) {
              const prevSelection = $getPreviousSelection();
              if (!$isRangeSelection(prevSelection)) {
                return;
              }
              $setSelection(prevSelection.clone());
            }
            if ($isRangeSelection(selection)) {
              if (isPossiblyAndroidKeyPress(event.timeStamp) && editor.isComposing() && selection.anchor.key === selection.focus.key) {
                $setCompositionKey(null);
                lastKeyDownTimeStamp = 0;
                setTimeout(() => {
                  updateEditor(editor, () => {
                    $setCompositionKey(null);
                  });
                }, ANDROID_COMPOSITION_LATENCY);
                if ($isRangeSelection(selection)) {
                  const anchorNode2 = selection.anchor.getNode();
                  anchorNode2.markDirty();
                  selection.format = anchorNode2.getFormat();
                }
              } else {
                event.preventDefault();
                dispatchCommand(editor, DELETE_CHARACTER_COMMAND, true);
              }
              return;
            }
          }
          if (!$isRangeSelection(selection)) {
            return;
          }
          const data = event.data;
          if (!selection.dirty && selection.isCollapsed() && !$isRootNode(selection.anchor.getNode())) {
            $applyTargetRange(selection, event);
          }
          const anchor = selection.anchor;
          const focus = selection.focus;
          const anchorNode = anchor.getNode();
          const focusNode = focus.getNode();
          if (inputType === "insertText" || inputType === "insertTranspose") {
            if (data === "\n") {
              event.preventDefault();
              dispatchCommand(editor, INSERT_LINE_BREAK_COMMAND, false);
            } else if (data === DOUBLE_LINE_BREAK) {
              event.preventDefault();
              dispatchCommand(editor, INSERT_PARAGRAPH_COMMAND, void 0);
            } else if (data == null && event.dataTransfer) {
              const text = event.dataTransfer.getData("text/plain");
              event.preventDefault();
              selection.insertRawText(text);
            } else if (data != null && $shouldPreventDefaultAndInsertText(selection, data)) {
              event.preventDefault();
              dispatchCommand(editor, CONTROLLED_TEXT_INSERTION_COMMAND, data);
            }
            return;
          }
          event.preventDefault();
          switch (inputType) {
            case "insertFromYank":
            case "insertFromDrop":
            case "insertReplacementText": {
              dispatchCommand(editor, CONTROLLED_TEXT_INSERTION_COMMAND, event);
              break;
            }
            case "insertFromComposition": {
              $setCompositionKey(null);
              dispatchCommand(editor, CONTROLLED_TEXT_INSERTION_COMMAND, event);
              break;
            }
            case "insertLineBreak": {
              $setCompositionKey(null);
              dispatchCommand(editor, INSERT_LINE_BREAK_COMMAND, false);
              break;
            }
            case "insertParagraph": {
              $setCompositionKey(null);
              if (isInsertLineBreak) {
                isInsertLineBreak = false;
                dispatchCommand(editor, INSERT_LINE_BREAK_COMMAND, false);
              } else {
                dispatchCommand(editor, INSERT_PARAGRAPH_COMMAND, void 0);
              }
              break;
            }
            case "insertFromPaste":
            case "insertFromPasteAsQuotation": {
              dispatchCommand(editor, PASTE_COMMAND, event);
              break;
            }
            case "deleteByComposition": {
              if ($canRemoveText(anchorNode, focusNode)) {
                dispatchCommand(editor, REMOVE_TEXT_COMMAND, void 0);
              }
              break;
            }
            case "deleteByDrag":
            case "deleteByCut": {
              dispatchCommand(editor, REMOVE_TEXT_COMMAND, void 0);
              break;
            }
            case "deleteContent": {
              dispatchCommand(editor, DELETE_CHARACTER_COMMAND, false);
              break;
            }
            case "deleteWordBackward": {
              dispatchCommand(editor, DELETE_WORD_COMMAND, true);
              break;
            }
            case "deleteWordForward": {
              dispatchCommand(editor, DELETE_WORD_COMMAND, false);
              break;
            }
            case "deleteHardLineBackward":
            case "deleteSoftLineBackward": {
              dispatchCommand(editor, DELETE_LINE_COMMAND, true);
              break;
            }
            case "deleteContentForward":
            case "deleteHardLineForward":
            case "deleteSoftLineForward": {
              dispatchCommand(editor, DELETE_LINE_COMMAND, false);
              break;
            }
            case "formatStrikeThrough": {
              dispatchCommand(editor, FORMAT_TEXT_COMMAND, "strikethrough");
              break;
            }
            case "formatBold": {
              dispatchCommand(editor, FORMAT_TEXT_COMMAND, "bold");
              break;
            }
            case "formatItalic": {
              dispatchCommand(editor, FORMAT_TEXT_COMMAND, "italic");
              break;
            }
            case "formatUnderline": {
              dispatchCommand(editor, FORMAT_TEXT_COMMAND, "underline");
              break;
            }
            case "historyUndo": {
              dispatchCommand(editor, UNDO_COMMAND, void 0);
              break;
            }
            case "historyRedo": {
              dispatchCommand(editor, REDO_COMMAND, void 0);
              break;
            }
          }
        });
      }
      function onInput(event, editor) {
        event.stopPropagation();
        updateEditor(editor, () => {
          const selection = $getSelection();
          const data = event.data;
          if (data != null && $isRangeSelection(selection) && $shouldPreventDefaultAndInsertText(selection, data)) {
            if (isFirefoxEndingComposition) {
              onCompositionEndImpl(editor, data);
              isFirefoxEndingComposition = false;
            }
            dispatchCommand(editor, CONTROLLED_TEXT_INSERTION_COMMAND, data);
            const textLength = data.length;
            if (IS_FIREFOX && textLength > 1 && event.inputType === "insertCompositionText" && !editor.isComposing()) {
              selection.anchor.offset -= textLength;
            }
            if (!IS_SAFARI && !IS_IOS && editor.isComposing()) {
              lastKeyDownTimeStamp = 0;
              $setCompositionKey(null);
            }
          } else {
            $updateSelectedTextFromDOM(false);
            if (isFirefoxEndingComposition) {
              onCompositionEndImpl(editor, data || void 0);
              isFirefoxEndingComposition = false;
            }
          }
          $flushMutations();
        });
      }
      function onCompositionStart(event, editor) {
        updateEditor(editor, () => {
          const selection = $getSelection();
          if ($isRangeSelection(selection) && !editor.isComposing()) {
            const anchor = selection.anchor;
            $setCompositionKey(anchor.key);
            if (event.timeStamp < lastKeyDownTimeStamp + ANDROID_COMPOSITION_LATENCY || anchor.type === "element" || !selection.isCollapsed() || selection.anchor.getNode().getFormat() !== selection.format) {
              dispatchCommand(editor, CONTROLLED_TEXT_INSERTION_COMMAND, COMPOSITION_START_CHAR);
            }
          }
        });
      }
      function onCompositionEndImpl(editor, data) {
        const compositionKey = editor._compositionKey;
        $setCompositionKey(null);
        if (compositionKey !== null && data != null) {
          if (data === "") {
            const node = $getNodeByKey(compositionKey);
            const textNode = getDOMTextNode(editor.getElementByKey(compositionKey));
            if (textNode !== null && textNode.nodeValue !== null && $isTextNode(node)) {
              $updateTextNodeFromDOMContent(node, textNode.nodeValue, null, null, true);
            }
            return;
          }
          if (data[data.length - 1] === "\n") {
            const selection = $getSelection();
            if ($isRangeSelection(selection)) {
              const focus = selection.focus;
              selection.anchor.set(focus.key, focus.offset, focus.type);
              dispatchCommand(editor, KEY_ENTER_COMMAND, null);
              return;
            }
          }
        }
        $updateSelectedTextFromDOM(true, data);
      }
      function onCompositionEnd(event, editor) {
        if (IS_FIREFOX) {
          isFirefoxEndingComposition = true;
        } else {
          updateEditor(editor, () => {
            onCompositionEndImpl(editor, event.data);
          });
        }
      }
      function onKeyDown(event, editor) {
        if (hasStoppedLexicalPropagation(event)) {
          return;
        }
        stopLexicalPropagation(event);
        lastKeyDownTimeStamp = event.timeStamp;
        lastKeyCode = event.keyCode;
        if (editor.isComposing()) {
          return;
        }
        const {
          keyCode,
          shiftKey,
          ctrlKey,
          metaKey,
          altKey
        } = event;
        if (isMoveForward(keyCode, ctrlKey, altKey, metaKey)) {
          dispatchCommand(editor, KEY_ARROW_RIGHT_COMMAND, event);
        } else if (isMoveToEnd(keyCode, ctrlKey, shiftKey, altKey, metaKey)) {
          dispatchCommand(editor, MOVE_TO_END, event);
        } else if (isMoveBackward(keyCode, ctrlKey, altKey, metaKey)) {
          dispatchCommand(editor, KEY_ARROW_LEFT_COMMAND, event);
        } else if (isMoveToStart(keyCode, ctrlKey, shiftKey, altKey, metaKey)) {
          dispatchCommand(editor, MOVE_TO_START, event);
        } else if (isMoveUp(keyCode, ctrlKey, metaKey)) {
          dispatchCommand(editor, KEY_ARROW_UP_COMMAND, event);
        } else if (isMoveDown(keyCode, ctrlKey, metaKey)) {
          dispatchCommand(editor, KEY_ARROW_DOWN_COMMAND, event);
        } else if (isLineBreak(keyCode, shiftKey)) {
          isInsertLineBreak = true;
          dispatchCommand(editor, KEY_ENTER_COMMAND, event);
        } else if (isSpace(keyCode)) {
          dispatchCommand(editor, KEY_SPACE_COMMAND, event);
        } else if (isOpenLineBreak(keyCode, ctrlKey)) {
          event.preventDefault();
          isInsertLineBreak = true;
          dispatchCommand(editor, INSERT_LINE_BREAK_COMMAND, true);
        } else if (isParagraph(keyCode, shiftKey)) {
          isInsertLineBreak = false;
          dispatchCommand(editor, KEY_ENTER_COMMAND, event);
        } else if (isDeleteBackward(keyCode, altKey, metaKey, ctrlKey)) {
          if (isBackspace(keyCode)) {
            dispatchCommand(editor, KEY_BACKSPACE_COMMAND, event);
          } else {
            event.preventDefault();
            dispatchCommand(editor, DELETE_CHARACTER_COMMAND, true);
          }
        } else if (isEscape(keyCode)) {
          dispatchCommand(editor, KEY_ESCAPE_COMMAND, event);
        } else if (isDeleteForward(keyCode, ctrlKey, shiftKey, altKey, metaKey)) {
          if (isDelete(keyCode)) {
            dispatchCommand(editor, KEY_DELETE_COMMAND, event);
          } else {
            event.preventDefault();
            dispatchCommand(editor, DELETE_CHARACTER_COMMAND, false);
          }
        } else if (isDeleteWordBackward(keyCode, altKey, ctrlKey)) {
          event.preventDefault();
          dispatchCommand(editor, DELETE_WORD_COMMAND, true);
        } else if (isDeleteWordForward(keyCode, altKey, ctrlKey)) {
          event.preventDefault();
          dispatchCommand(editor, DELETE_WORD_COMMAND, false);
        } else if (isDeleteLineBackward(keyCode, metaKey)) {
          event.preventDefault();
          dispatchCommand(editor, DELETE_LINE_COMMAND, true);
        } else if (isDeleteLineForward(keyCode, metaKey)) {
          event.preventDefault();
          dispatchCommand(editor, DELETE_LINE_COMMAND, false);
        } else if (isBold(keyCode, altKey, metaKey, ctrlKey)) {
          event.preventDefault();
          dispatchCommand(editor, FORMAT_TEXT_COMMAND, "bold");
        } else if (isUnderline(keyCode, altKey, metaKey, ctrlKey)) {
          event.preventDefault();
          dispatchCommand(editor, FORMAT_TEXT_COMMAND, "underline");
        } else if (isItalic(keyCode, altKey, metaKey, ctrlKey)) {
          event.preventDefault();
          dispatchCommand(editor, FORMAT_TEXT_COMMAND, "italic");
        } else if (isTab(keyCode, altKey, ctrlKey, metaKey)) {
          dispatchCommand(editor, KEY_TAB_COMMAND, event);
        } else if (isUndo(keyCode, shiftKey, metaKey, ctrlKey)) {
          event.preventDefault();
          dispatchCommand(editor, UNDO_COMMAND, void 0);
        } else if (isRedo(keyCode, shiftKey, metaKey, ctrlKey)) {
          event.preventDefault();
          dispatchCommand(editor, REDO_COMMAND, void 0);
        } else {
          const prevSelection = editor._editorState._selection;
          if ($isNodeSelection(prevSelection)) {
            if (isCopy(keyCode, shiftKey, metaKey, ctrlKey)) {
              event.preventDefault();
              dispatchCommand(editor, COPY_COMMAND, event);
            } else if (isCut(keyCode, shiftKey, metaKey, ctrlKey)) {
              event.preventDefault();
              dispatchCommand(editor, CUT_COMMAND, event);
            }
          }
        }
        if (isModifier(ctrlKey, shiftKey, altKey, metaKey)) {
          dispatchCommand(editor, KEY_MODIFIER_COMMAND, event);
        }
      }
      function getRootElementRemoveHandles(rootElement) {
        let eventHandles = rootElement.__lexicalEventHandles;
        if (eventHandles === void 0) {
          eventHandles = [];
          rootElement.__lexicalEventHandles = eventHandles;
        }
        return eventHandles;
      }
      var activeNestedEditorsMap = /* @__PURE__ */ new Map();
      function onDocumentSelectionChange(event) {
        const domSelection = getDOMSelection();
        if (domSelection === null) {
          return;
        }
        const nextActiveEditor = getNearestEditorFromDOMNode(domSelection.anchorNode);
        if (nextActiveEditor === null) {
          return;
        }
        if (isSelectionChangeFromMouseDown) {
          isSelectionChangeFromMouseDown = false;
          updateEditor(nextActiveEditor, () => {
            const lastSelection = $getPreviousSelection();
            const domAnchorNode = domSelection.anchorNode;
            if (domAnchorNode === null) {
              return;
            }
            const nodeType = domAnchorNode.nodeType;
            if (nodeType !== DOM_ELEMENT_TYPE && nodeType !== DOM_TEXT_TYPE) {
              return;
            }
            const newSelection = internalCreateRangeSelection(lastSelection, domSelection, nextActiveEditor);
            $setSelection(newSelection);
          });
        }
        const editors = getEditorsToPropagate(nextActiveEditor);
        const rootEditor = editors[editors.length - 1];
        const rootEditorKey = rootEditor._key;
        const activeNestedEditor = activeNestedEditorsMap.get(rootEditorKey);
        const prevActiveEditor = activeNestedEditor || rootEditor;
        if (prevActiveEditor !== nextActiveEditor) {
          onSelectionChange(domSelection, prevActiveEditor, false);
        }
        onSelectionChange(domSelection, nextActiveEditor, true);
        if (nextActiveEditor !== rootEditor) {
          activeNestedEditorsMap.set(rootEditorKey, nextActiveEditor);
        } else if (activeNestedEditor) {
          activeNestedEditorsMap.delete(rootEditorKey);
        }
      }
      function stopLexicalPropagation(event) {
        event._lexicalHandled = true;
      }
      function hasStoppedLexicalPropagation(event) {
        const stopped = event._lexicalHandled === true;
        return stopped;
      }
      function addRootElementEvents(rootElement, editor) {
        if (rootElementsRegistered === 0) {
          const doc = rootElement.ownerDocument;
          doc.addEventListener("selectionchange", onDocumentSelectionChange);
        }
        rootElementsRegistered++;
        rootElement.__lexicalEditor = editor;
        const removeHandles = getRootElementRemoveHandles(rootElement);
        for (let i = 0; i < rootElementEvents.length; i++) {
          const [eventName, onEvent] = rootElementEvents[i];
          const eventHandler = typeof onEvent === "function" ? (event) => {
            if (editor.isEditable()) {
              onEvent(event, editor);
            }
          } : (event) => {
            if (editor.isEditable()) {
              switch (eventName) {
                case "cut":
                  return dispatchCommand(editor, CUT_COMMAND, event);
                case "copy":
                  return dispatchCommand(editor, COPY_COMMAND, event);
                case "paste":
                  return dispatchCommand(editor, PASTE_COMMAND, event);
                case "dragstart":
                  return dispatchCommand(editor, DRAGSTART_COMMAND, event);
                case "dragover":
                  return dispatchCommand(editor, DRAGOVER_COMMAND, event);
                case "dragend":
                  return dispatchCommand(editor, DRAGEND_COMMAND, event);
                case "focus":
                  return dispatchCommand(editor, FOCUS_COMMAND, event);
                case "blur":
                  return dispatchCommand(editor, BLUR_COMMAND, event);
                case "drop":
                  return dispatchCommand(editor, DROP_COMMAND, event);
              }
            }
          };
          rootElement.addEventListener(eventName, eventHandler);
          removeHandles.push(() => {
            rootElement.removeEventListener(eventName, eventHandler);
          });
        }
      }
      function removeRootElementEvents(rootElement) {
        if (rootElementsRegistered !== 0) {
          rootElementsRegistered--;
          if (rootElementsRegistered === 0) {
            const doc = rootElement.ownerDocument;
            doc.removeEventListener("selectionchange", onDocumentSelectionChange);
          }
        }
        const editor = rootElement.__lexicalEditor;
        if (editor !== null && editor !== void 0) {
          cleanActiveNestedEditorsMap(editor);
          rootElement.__lexicalEditor = null;
        }
        const removeHandles = getRootElementRemoveHandles(rootElement);
        for (let i = 0; i < removeHandles.length; i++) {
          removeHandles[i]();
        }
        rootElement.__lexicalEventHandles = [];
      }
      function cleanActiveNestedEditorsMap(editor) {
        if (editor._parentEditor !== null) {
          const editors = getEditorsToPropagate(editor);
          const rootEditor = editors[editors.length - 1];
          const rootEditorKey = rootEditor._key;
          if (activeNestedEditorsMap.get(rootEditorKey) === editor) {
            activeNestedEditorsMap.delete(rootEditorKey);
          }
        } else {
          activeNestedEditorsMap.delete(editor._key);
        }
      }
      function markSelectionChangeFromDOMUpdate() {
        isSelectionChangeFromDOMUpdate = true;
      }
      function markCollapsedSelectionFormat(format, offset, key, timeStamp) {
        collapsedSelectionFormat = [format, offset, key, timeStamp];
      }
      var Point = class {
        constructor(key, offset, type) {
          this._selection = null;
          this.key = key;
          this.offset = offset;
          this.type = type;
        }
        is(point) {
          return this.key === point.key && this.offset === point.offset && this.type === point.type;
        }
        isBefore(b) {
          let aNode = this.getNode();
          let bNode = b.getNode();
          const aOffset = this.offset;
          const bOffset = b.offset;
          if ($isElementNode(aNode)) {
            const aNodeDescendant = aNode.getDescendantByIndex(aOffset);
            aNode = aNodeDescendant != null ? aNodeDescendant : aNode;
          }
          if ($isElementNode(bNode)) {
            const bNodeDescendant = bNode.getDescendantByIndex(bOffset);
            bNode = bNodeDescendant != null ? bNodeDescendant : bNode;
          }
          if (aNode === bNode) {
            return aOffset < bOffset;
          }
          return aNode.isBefore(bNode);
        }
        getNode() {
          const key = this.key;
          const node = $getNodeByKey(key);
          if (node === null) {
            {
              throw Error(`Point.getNode: node not found`);
            }
          }
          return node;
        }
        set(key, offset, type) {
          const selection = this._selection;
          const oldKey = this.key;
          this.key = key;
          this.offset = offset;
          this.type = type;
          if (!isCurrentlyReadOnlyMode()) {
            if ($getCompositionKey() === oldKey) {
              $setCompositionKey(key);
            }
            if (selection !== null) {
              selection._cachedNodes = null;
              selection.dirty = true;
            }
          }
        }
      };
      function $createPoint(key, offset, type) {
        return new Point(key, offset, type);
      }
      function selectPointOnNode(point, node) {
        let key = node.__key;
        let offset = point.offset;
        let type = "element";
        if ($isTextNode(node)) {
          type = "text";
          const textContentLength = node.getTextContentSize();
          if (offset > textContentLength) {
            offset = textContentLength;
          }
        } else if (!$isElementNode(node)) {
          const nextSibling = node.getNextSibling();
          if ($isTextNode(nextSibling)) {
            key = nextSibling.__key;
            offset = 0;
          } else {
            const parentNode = node.getParent();
            if (parentNode) {
              key = parentNode.__key;
              offset = node.getIndexWithinParent() + 1;
            }
          }
        }
        point.set(key, offset, type);
      }
      function $moveSelectionPointToEnd(point, node) {
        if ($isElementNode(node)) {
          const lastNode = node.getLastDescendant();
          if ($isElementNode(lastNode) || $isTextNode(lastNode)) {
            selectPointOnNode(point, lastNode);
          } else {
            selectPointOnNode(point, node);
          }
        } else {
          selectPointOnNode(point, node);
        }
      }
      function $transferStartingElementPointToTextPoint(start, end, format) {
        const element = start.getNode();
        const placementNode = element.getChildAtIndex(start.offset);
        const textNode = $createTextNode();
        const target = $isRootNode(element) ? $createParagraphNode().append(textNode) : textNode;
        textNode.setFormat(format);
        if (placementNode === null) {
          element.append(target);
        } else {
          placementNode.insertBefore(target);
        }
        if (start.is(end)) {
          end.set(textNode.__key, 0, "text");
        }
        start.set(textNode.__key, 0, "text");
      }
      function $setPointValues(point, key, offset, type) {
        point.key = key;
        point.offset = offset;
        point.type = type;
      }
      var NodeSelection = class {
        constructor(objects) {
          this.dirty = false;
          this._nodes = objects;
          this._cachedNodes = null;
        }
        is(selection) {
          if (!$isNodeSelection(selection)) {
            return false;
          }
          const a = this._nodes;
          const b = selection._nodes;
          return a.size === b.size && Array.from(a).every((key) => b.has(key));
        }
        add(key) {
          this.dirty = true;
          this._nodes.add(key);
          this._cachedNodes = null;
        }
        delete(key) {
          this.dirty = true;
          this._nodes.delete(key);
          this._cachedNodes = null;
        }
        clear() {
          this.dirty = true;
          this._nodes.clear();
          this._cachedNodes = null;
        }
        has(key) {
          return this._nodes.has(key);
        }
        clone() {
          return new NodeSelection(new Set(this._nodes));
        }
        extract() {
          return this.getNodes();
        }
        insertRawText(text) {
        }
        insertText() {
        }
        insertNodes(nodes, selectStart) {
          const selectedNodes = this.getNodes();
          const selectedNodesLength = selectedNodes.length;
          const lastSelectedNode = selectedNodes[selectedNodesLength - 1];
          let selectionAtEnd;
          if ($isTextNode(lastSelectedNode)) {
            selectionAtEnd = lastSelectedNode.select();
          } else {
            const index = lastSelectedNode.getIndexWithinParent() + 1;
            selectionAtEnd = lastSelectedNode.getParentOrThrow().select(index, index);
          }
          selectionAtEnd.insertNodes(nodes, selectStart);
          for (let i = 0; i < selectedNodesLength; i++) {
            selectedNodes[i].remove();
          }
          return true;
        }
        getNodes() {
          const cachedNodes = this._cachedNodes;
          if (cachedNodes !== null) {
            return cachedNodes;
          }
          const objects = this._nodes;
          const nodes = [];
          for (const object of objects) {
            const node = $getNodeByKey(object);
            if (node !== null) {
              nodes.push(node);
            }
          }
          if (!isCurrentlyReadOnlyMode()) {
            this._cachedNodes = nodes;
          }
          return nodes;
        }
        getTextContent() {
          const nodes = this.getNodes();
          let textContent = "";
          for (let i = 0; i < nodes.length; i++) {
            textContent += nodes[i].getTextContent();
          }
          return textContent;
        }
      };
      function $isRangeSelection(x) {
        return x instanceof RangeSelection;
      }
      var GridSelection = class {
        constructor(gridKey, anchor, focus) {
          this.gridKey = gridKey;
          this.anchor = anchor;
          this.focus = focus;
          this.dirty = false;
          this._cachedNodes = null;
          anchor._selection = this;
          focus._selection = this;
        }
        is(selection) {
          if (!DEPRECATED_$isGridSelection(selection)) {
            return false;
          }
          return this.gridKey === selection.gridKey && this.anchor.is(this.focus);
        }
        set(gridKey, anchorCellKey, focusCellKey) {
          this.dirty = true;
          this.gridKey = gridKey;
          this.anchor.key = anchorCellKey;
          this.focus.key = focusCellKey;
          this._cachedNodes = null;
        }
        clone() {
          return new GridSelection(this.gridKey, this.anchor, this.focus);
        }
        isCollapsed() {
          return false;
        }
        isBackward() {
          return this.focus.isBefore(this.anchor);
        }
        getCharacterOffsets() {
          return getCharacterOffsets(this);
        }
        extract() {
          return this.getNodes();
        }
        insertRawText(text) {
        }
        insertText() {
        }
        insertNodes(nodes, selectStart) {
          const focusNode = this.focus.getNode();
          const selection = $normalizeSelection(focusNode.select(0, focusNode.getChildrenSize()));
          return selection.insertNodes(nodes, selectStart);
        }
        getShape() {
          const anchorCellNode = $getNodeByKey(this.anchor.key);
          if (!(anchorCellNode !== null)) {
            throw Error(`getNodes: expected to find AnchorNode`);
          }
          const anchorCellNodeIndex = anchorCellNode.getIndexWithinParent();
          const anchorCelRoweIndex = anchorCellNode.getParentOrThrow().getIndexWithinParent();
          const focusCellNode = $getNodeByKey(this.focus.key);
          if (!(focusCellNode !== null)) {
            throw Error(`getNodes: expected to find FocusNode`);
          }
          const focusCellNodeIndex = focusCellNode.getIndexWithinParent();
          const focusCellRowIndex = focusCellNode.getParentOrThrow().getIndexWithinParent();
          const startX = Math.min(anchorCellNodeIndex, focusCellNodeIndex);
          const stopX = Math.max(anchorCellNodeIndex, focusCellNodeIndex);
          const startY = Math.min(anchorCelRoweIndex, focusCellRowIndex);
          const stopY = Math.max(anchorCelRoweIndex, focusCellRowIndex);
          return {
            fromX: Math.min(startX, stopX),
            fromY: Math.min(startY, stopY),
            toX: Math.max(startX, stopX),
            toY: Math.max(startY, stopY)
          };
        }
        getNodes() {
          const cachedNodes = this._cachedNodes;
          if (cachedNodes !== null) {
            return cachedNodes;
          }
          const nodesSet = /* @__PURE__ */ new Set();
          const {
            fromX,
            fromY,
            toX,
            toY
          } = this.getShape();
          const gridNode = $getNodeByKey(this.gridKey);
          if (!DEPRECATED_$isGridNode(gridNode)) {
            {
              throw Error(`getNodes: expected to find GridNode`);
            }
          }
          nodesSet.add(gridNode);
          const gridRowNodes = gridNode.getChildren();
          for (let r = fromY; r <= toY; r++) {
            const gridRowNode = gridRowNodes[r];
            nodesSet.add(gridRowNode);
            if (!DEPRECATED_$isGridRowNode(gridRowNode)) {
              {
                throw Error(`getNodes: expected to find GridRowNode`);
              }
            }
            const gridCellNodes = gridRowNode.getChildren();
            for (let c = fromX; c <= toX; c++) {
              const gridCellNode = gridCellNodes[c];
              if (!DEPRECATED_$isGridCellNode(gridCellNode)) {
                {
                  throw Error(`getNodes: expected to find GridCellNode`);
                }
              }
              nodesSet.add(gridCellNode);
              const children = gridCellNode.getChildren();
              while (children.length > 0) {
                const child = children.shift();
                nodesSet.add(child);
                if ($isElementNode(child)) {
                  children.unshift(...child.getChildren());
                }
              }
            }
          }
          const nodes = Array.from(nodesSet);
          if (!isCurrentlyReadOnlyMode()) {
            this._cachedNodes = nodes;
          }
          return nodes;
        }
        getTextContent() {
          const nodes = this.getNodes();
          let textContent = "";
          for (let i = 0; i < nodes.length; i++) {
            textContent += nodes[i].getTextContent();
          }
          return textContent;
        }
      };
      function DEPRECATED_$isGridSelection(x) {
        return x instanceof GridSelection;
      }
      var RangeSelection = class {
        constructor(anchor, focus, format) {
          this.anchor = anchor;
          this.focus = focus;
          this.dirty = false;
          this.format = format;
          this._cachedNodes = null;
          anchor._selection = this;
          focus._selection = this;
        }
        is(selection) {
          if (!$isRangeSelection(selection)) {
            return false;
          }
          return this.anchor.is(selection.anchor) && this.focus.is(selection.focus) && this.format === selection.format;
        }
        isBackward() {
          return this.focus.isBefore(this.anchor);
        }
        isCollapsed() {
          return this.anchor.is(this.focus);
        }
        getNodes() {
          const cachedNodes = this._cachedNodes;
          if (cachedNodes !== null) {
            return cachedNodes;
          }
          const anchor = this.anchor;
          const focus = this.focus;
          let firstNode = anchor.getNode();
          let lastNode = focus.getNode();
          if ($isElementNode(firstNode)) {
            const firstNodeDescendant = firstNode.getDescendantByIndex(anchor.offset);
            firstNode = firstNodeDescendant != null ? firstNodeDescendant : firstNode;
          }
          if ($isElementNode(lastNode)) {
            const lastNodeDescendant = lastNode.getDescendantByIndex(focus.offset);
            lastNode = lastNodeDescendant != null ? lastNodeDescendant : lastNode;
          }
          let nodes;
          if (firstNode.is(lastNode)) {
            if ($isElementNode(firstNode) && (firstNode.getChildrenSize() > 0 || firstNode.excludeFromCopy())) {
              nodes = [];
            } else {
              nodes = [firstNode];
            }
          } else {
            nodes = firstNode.getNodesBetween(lastNode);
          }
          if (!isCurrentlyReadOnlyMode()) {
            this._cachedNodes = nodes;
          }
          return nodes;
        }
        setTextNodeRange(anchorNode, anchorOffset, focusNode, focusOffset) {
          $setPointValues(this.anchor, anchorNode.__key, anchorOffset, "text");
          $setPointValues(this.focus, focusNode.__key, focusOffset, "text");
          this._cachedNodes = null;
          this.dirty = true;
        }
        getTextContent() {
          const nodes = this.getNodes();
          if (nodes.length === 0) {
            return "";
          }
          const firstNode = nodes[0];
          const lastNode = nodes[nodes.length - 1];
          const anchor = this.anchor;
          const focus = this.focus;
          const isBefore = anchor.isBefore(focus);
          const [anchorOffset, focusOffset] = getCharacterOffsets(this);
          let textContent = "";
          let prevWasElement = true;
          for (let i = 0; i < nodes.length; i++) {
            const node = nodes[i];
            if ($isElementNode(node) && !node.isInline()) {
              if (!prevWasElement) {
                textContent += "\n";
              }
              if (node.isEmpty()) {
                prevWasElement = false;
              } else {
                prevWasElement = true;
              }
            } else {
              prevWasElement = false;
              if ($isTextNode(node)) {
                let text = node.getTextContent();
                if (node === firstNode) {
                  if (node === lastNode) {
                    text = anchorOffset < focusOffset ? text.slice(anchorOffset, focusOffset) : text.slice(focusOffset, anchorOffset);
                  } else {
                    text = isBefore ? text.slice(anchorOffset) : text.slice(focusOffset);
                  }
                } else if (node === lastNode) {
                  text = isBefore ? text.slice(0, focusOffset) : text.slice(0, anchorOffset);
                }
                textContent += text;
              } else if (($isDecoratorNode(node) || $isLineBreakNode(node)) && (node !== lastNode || !this.isCollapsed())) {
                textContent += node.getTextContent();
              }
            }
          }
          return textContent;
        }
        applyDOMRange(range) {
          const editor = getActiveEditor();
          const currentEditorState = editor.getEditorState();
          const lastSelection = currentEditorState._selection;
          const resolvedSelectionPoints = internalResolveSelectionPoints(range.startContainer, range.startOffset, range.endContainer, range.endOffset, editor, lastSelection);
          if (resolvedSelectionPoints === null) {
            return;
          }
          const [anchorPoint, focusPoint] = resolvedSelectionPoints;
          $setPointValues(this.anchor, anchorPoint.key, anchorPoint.offset, anchorPoint.type);
          $setPointValues(this.focus, focusPoint.key, focusPoint.offset, focusPoint.type);
          this._cachedNodes = null;
        }
        clone() {
          const anchor = this.anchor;
          const focus = this.focus;
          const selection = new RangeSelection($createPoint(anchor.key, anchor.offset, anchor.type), $createPoint(focus.key, focus.offset, focus.type), this.format);
          return selection;
        }
        toggleFormat(format) {
          this.format = toggleTextFormatType(this.format, format, null);
          this.dirty = true;
        }
        hasFormat(type) {
          const formatFlag = TEXT_TYPE_TO_FORMAT[type];
          return (this.format & formatFlag) !== 0;
        }
        insertRawText(text) {
          const parts = text.split(/\r?\n/);
          if (parts.length === 1) {
            this.insertText(text);
          } else {
            const nodes = [];
            const length = parts.length;
            for (let i = 0; i < length; i++) {
              const part = parts[i];
              if (part !== "") {
                nodes.push($createTextNode(part));
              }
              if (i !== length - 1) {
                nodes.push($createLineBreakNode());
              }
            }
            this.insertNodes(nodes);
          }
        }
        insertText(text) {
          const anchor = this.anchor;
          const focus = this.focus;
          const isBefore = this.isCollapsed() || anchor.isBefore(focus);
          const format = this.format;
          if (isBefore && anchor.type === "element") {
            $transferStartingElementPointToTextPoint(anchor, focus, format);
          } else if (!isBefore && focus.type === "element") {
            $transferStartingElementPointToTextPoint(focus, anchor, format);
          }
          const selectedNodes = this.getNodes();
          const selectedNodesLength = selectedNodes.length;
          const firstPoint = isBefore ? anchor : focus;
          const endPoint = isBefore ? focus : anchor;
          const startOffset = firstPoint.offset;
          const endOffset = endPoint.offset;
          let firstNode = selectedNodes[0];
          if (!$isTextNode(firstNode)) {
            {
              throw Error(`insertText: first node is not a text node`);
            }
          }
          const firstNodeText = firstNode.getTextContent();
          const firstNodeTextLength = firstNodeText.length;
          const firstNodeParent = firstNode.getParentOrThrow();
          const lastIndex = selectedNodesLength - 1;
          let lastNode = selectedNodes[lastIndex];
          if (this.isCollapsed() && startOffset === firstNodeTextLength && (firstNode.isSegmented() || firstNode.isToken() || !firstNode.canInsertTextAfter() || !firstNodeParent.canInsertTextAfter() && firstNode.getNextSibling() === null)) {
            let nextSibling = firstNode.getNextSibling();
            if (!$isTextNode(nextSibling) || $isTokenOrSegmented(nextSibling)) {
              nextSibling = $createTextNode();
              nextSibling.setFormat(format);
              if (!firstNodeParent.canInsertTextAfter()) {
                firstNodeParent.insertAfter(nextSibling);
              } else {
                firstNode.insertAfter(nextSibling);
              }
            }
            nextSibling.select(0, 0);
            firstNode = nextSibling;
            if (text !== "") {
              this.insertText(text);
              return;
            }
          } else if (this.isCollapsed() && startOffset === 0 && (firstNode.isSegmented() || firstNode.isToken() || !firstNode.canInsertTextBefore() || !firstNodeParent.canInsertTextBefore() && firstNode.getPreviousSibling() === null)) {
            let prevSibling = firstNode.getPreviousSibling();
            if (!$isTextNode(prevSibling) || $isTokenOrSegmented(prevSibling)) {
              prevSibling = $createTextNode();
              prevSibling.setFormat(format);
              if (!firstNodeParent.canInsertTextBefore()) {
                firstNodeParent.insertBefore(prevSibling);
              } else {
                firstNode.insertBefore(prevSibling);
              }
            }
            prevSibling.select();
            firstNode = prevSibling;
            if (text !== "") {
              this.insertText(text);
              return;
            }
          } else if (firstNode.isSegmented() && startOffset !== firstNodeTextLength) {
            const textNode = $createTextNode(firstNode.getTextContent());
            textNode.setFormat(format);
            firstNode.replace(textNode);
            firstNode = textNode;
          } else if (!this.isCollapsed() && text !== "") {
            const lastNodeParent = lastNode.getParent();
            if (!firstNodeParent.canInsertTextBefore() || !firstNodeParent.canInsertTextAfter() || $isElementNode(lastNodeParent) && (!lastNodeParent.canInsertTextBefore() || !lastNodeParent.canInsertTextAfter())) {
              this.insertText("");
              normalizeSelectionPointsForBoundaries(this.anchor, this.focus, null);
              this.insertText(text);
              return;
            }
          }
          if (selectedNodesLength === 1) {
            if (firstNode.isToken()) {
              const textNode = $createTextNode(text);
              textNode.select();
              firstNode.replace(textNode);
              return;
            }
            const firstNodeFormat = firstNode.getFormat();
            if (startOffset === endOffset && firstNodeFormat !== format) {
              if (firstNode.getTextContent() === "") {
                firstNode.setFormat(format);
              } else {
                const textNode = $createTextNode(text);
                textNode.setFormat(format);
                textNode.select();
                if (startOffset === 0) {
                  firstNode.insertBefore(textNode);
                } else {
                  const [targetNode] = firstNode.splitText(startOffset);
                  targetNode.insertAfter(textNode);
                }
                if (textNode.isComposing() && this.anchor.type === "text") {
                  this.anchor.offset -= text.length;
                }
                return;
              }
            }
            const delCount = endOffset - startOffset;
            firstNode = firstNode.spliceText(startOffset, delCount, text, true);
            if (firstNode.getTextContent() === "") {
              firstNode.remove();
            } else if (this.anchor.type === "text") {
              if (firstNode.isComposing()) {
                this.anchor.offset -= text.length;
              } else {
                this.format = firstNodeFormat;
              }
            }
          } else {
            const markedNodeKeysForKeep = /* @__PURE__ */ new Set([...firstNode.getParentKeys(), ...lastNode.getParentKeys()]);
            const firstElement = $isElementNode(firstNode) ? firstNode : firstNode.getParentOrThrow();
            let lastElement = $isElementNode(lastNode) ? lastNode : lastNode.getParentOrThrow();
            let lastElementChild = lastNode;
            if (!firstElement.is(lastElement) && lastElement.isInline()) {
              do {
                lastElementChild = lastElement;
                lastElement = lastElement.getParentOrThrow();
              } while (lastElement.isInline());
            }
            if (endPoint.type === "text" && (endOffset !== 0 || lastNode.getTextContent() === "") || endPoint.type === "element" && lastNode.getIndexWithinParent() < endOffset) {
              if ($isTextNode(lastNode) && !lastNode.isToken() && endOffset !== lastNode.getTextContentSize()) {
                if (lastNode.isSegmented()) {
                  const textNode = $createTextNode(lastNode.getTextContent());
                  lastNode.replace(textNode);
                  lastNode = textNode;
                }
                lastNode = lastNode.spliceText(0, endOffset, "");
                markedNodeKeysForKeep.add(lastNode.__key);
              } else {
                const lastNodeParent = lastNode.getParentOrThrow();
                if (!lastNodeParent.canBeEmpty() && lastNodeParent.getChildrenSize() === 1) {
                  lastNodeParent.remove();
                } else {
                  lastNode.remove();
                }
              }
            } else {
              markedNodeKeysForKeep.add(lastNode.__key);
            }
            const lastNodeChildren = lastElement.getChildren();
            const selectedNodesSet = new Set(selectedNodes);
            const firstAndLastElementsAreEqual = firstElement.is(lastElement);
            const insertionTarget = firstElement.isInline() && firstNode.getNextSibling() === null ? firstElement : firstNode;
            for (let i = lastNodeChildren.length - 1; i >= 0; i--) {
              const lastNodeChild = lastNodeChildren[i];
              if (lastNodeChild.is(firstNode) || $isElementNode(lastNodeChild) && lastNodeChild.isParentOf(firstNode)) {
                break;
              }
              if (lastNodeChild.isAttached()) {
                if (!selectedNodesSet.has(lastNodeChild) || lastNodeChild.is(lastElementChild)) {
                  if (!firstAndLastElementsAreEqual) {
                    insertionTarget.insertAfter(lastNodeChild);
                  }
                } else {
                  lastNodeChild.remove();
                }
              }
            }
            if (!firstAndLastElementsAreEqual) {
              let parent = lastElement;
              let lastRemovedParent = null;
              while (parent !== null) {
                const children = parent.getChildren();
                const childrenLength = children.length;
                if (childrenLength === 0 || children[childrenLength - 1].is(lastRemovedParent)) {
                  markedNodeKeysForKeep.delete(parent.__key);
                  lastRemovedParent = parent;
                }
                parent = parent.getParent();
              }
            }
            if (!firstNode.isToken()) {
              firstNode = firstNode.spliceText(startOffset, firstNodeTextLength - startOffset, text, true);
              if (firstNode.getTextContent() === "") {
                firstNode.remove();
              } else if (firstNode.isComposing() && this.anchor.type === "text") {
                this.anchor.offset -= text.length;
              }
            } else if (startOffset === firstNodeTextLength) {
              firstNode.select();
            } else {
              const textNode = $createTextNode(text);
              textNode.select();
              firstNode.replace(textNode);
            }
            for (let i = 1; i < selectedNodesLength; i++) {
              const selectedNode = selectedNodes[i];
              const key = selectedNode.__key;
              if (!markedNodeKeysForKeep.has(key)) {
                selectedNode.remove();
              }
            }
          }
        }
        removeText() {
          this.insertText("");
        }
        formatText(formatType) {
          if (this.isCollapsed()) {
            this.toggleFormat(formatType);
            $setCompositionKey(null);
            return;
          }
          const selectedNodes = this.getNodes();
          const selectedTextNodes = [];
          for (const selectedNode of selectedNodes) {
            if ($isTextNode(selectedNode)) {
              selectedTextNodes.push(selectedNode);
            }
          }
          const selectedTextNodesLength = selectedTextNodes.length;
          if (selectedTextNodesLength === 0) {
            this.toggleFormat(formatType);
            $setCompositionKey(null);
            return;
          }
          const anchor = this.anchor;
          const focus = this.focus;
          const isBackward = this.isBackward();
          const startPoint = isBackward ? focus : anchor;
          const endPoint = isBackward ? anchor : focus;
          let firstIndex = 0;
          let firstNode = selectedTextNodes[0];
          let startOffset = startPoint.type === "element" ? 0 : startPoint.offset;
          if (startPoint.type === "text" && startOffset === firstNode.getTextContentSize()) {
            firstIndex = 1;
            firstNode = selectedTextNodes[1];
            startOffset = 0;
          }
          if (firstNode == null) {
            return;
          }
          const firstNextFormat = firstNode.getFormatFlags(formatType, null);
          const lastIndex = selectedTextNodesLength - 1;
          let lastNode = selectedTextNodes[lastIndex];
          const endOffset = endPoint.type === "text" ? endPoint.offset : lastNode.getTextContentSize();
          if (firstNode.is(lastNode)) {
            if (startOffset === endOffset) {
              return;
            }
            if (startOffset === 0 && endOffset === firstNode.getTextContentSize()) {
              firstNode.setFormat(firstNextFormat);
            } else {
              const splitNodes = firstNode.splitText(startOffset, endOffset);
              const replacement = startOffset === 0 ? splitNodes[0] : splitNodes[1];
              replacement.setFormat(firstNextFormat);
              if (startPoint.type === "text") {
                startPoint.set(replacement.__key, 0, "text");
              }
              if (endPoint.type === "text") {
                endPoint.set(replacement.__key, endOffset - startOffset, "text");
              }
            }
            this.format = firstNextFormat;
            return;
          }
          if (startOffset !== 0) {
            [, firstNode] = firstNode.splitText(startOffset);
            startOffset = 0;
          }
          firstNode.setFormat(firstNextFormat);
          const lastNextFormat = lastNode.getFormatFlags(formatType, firstNextFormat);
          if (endOffset > 0) {
            if (endOffset !== lastNode.getTextContentSize()) {
              [lastNode] = lastNode.splitText(endOffset);
            }
            lastNode.setFormat(lastNextFormat);
          }
          for (let i = firstIndex + 1; i < lastIndex; i++) {
            const textNode = selectedTextNodes[i];
            if (!textNode.isToken()) {
              const nextFormat = textNode.getFormatFlags(formatType, lastNextFormat);
              textNode.setFormat(nextFormat);
            }
          }
          if (startPoint.type === "text") {
            startPoint.set(firstNode.__key, startOffset, "text");
          }
          if (endPoint.type === "text") {
            endPoint.set(lastNode.__key, endOffset, "text");
          }
          this.format = firstNextFormat | lastNextFormat;
        }
        insertNodes(nodes, selectStart) {
          if (!this.isCollapsed()) {
            this.removeText();
          }
          const anchor = this.anchor;
          const anchorOffset = anchor.offset;
          const anchorNode = anchor.getNode();
          let target = anchorNode;
          if (anchor.type === "element") {
            const element = anchor.getNode();
            const placementNode = element.getChildAtIndex(anchorOffset - 1);
            if (placementNode === null) {
              target = element;
            } else {
              target = placementNode;
            }
          }
          const siblings = [];
          const nextSiblings = anchorNode.getNextSiblings();
          const topLevelElement = $isRootOrShadowRoot(anchorNode) ? null : anchorNode.getTopLevelElementOrThrow();
          if ($isTextNode(anchorNode)) {
            const textContent = anchorNode.getTextContent();
            const textContentLength = textContent.length;
            if (anchorOffset === 0 && textContentLength !== 0) {
              const prevSibling = anchorNode.getPreviousSibling();
              if (prevSibling !== null) {
                target = prevSibling;
              } else {
                target = anchorNode.getParentOrThrow();
              }
              siblings.push(anchorNode);
            } else if (anchorOffset === textContentLength) {
              target = anchorNode;
            } else if (anchorNode.isToken()) {
              return false;
            } else {
              let danglingText;
              [target, danglingText] = anchorNode.splitText(anchorOffset);
              siblings.push(danglingText);
            }
          }
          const startingNode = target;
          siblings.push(...nextSiblings);
          const firstNode = nodes[0];
          let didReplaceOrMerge = false;
          let lastNode = null;
          for (let i = 0; i < nodes.length; i++) {
            const node = nodes[i];
            if ($isElementNode(node) && !node.isInline()) {
              if (node.is(firstNode)) {
                if ($isElementNode(target) && target.isEmpty() && target.canReplaceWith(node)) {
                  target.replace(node);
                  target = node;
                  didReplaceOrMerge = true;
                  continue;
                }
                const firstDescendant = node.getFirstDescendant();
                if ($isLeafNode(firstDescendant)) {
                  let element = firstDescendant.getParentOrThrow();
                  while (element.isInline()) {
                    element = element.getParentOrThrow();
                  }
                  const children = element.getChildren();
                  const childrenLength = children.length;
                  if ($isElementNode(target)) {
                    for (let s = 0; s < childrenLength; s++) {
                      target.append(children[s]);
                    }
                  } else {
                    for (let s = childrenLength - 1; s >= 0; s--) {
                      target.insertAfter(children[s]);
                    }
                    target = target.getParentOrThrow();
                  }
                  lastNode = children[childrenLength - 1];
                  element.remove();
                  didReplaceOrMerge = true;
                  if (element.is(node)) {
                    continue;
                  }
                }
              }
              if ($isTextNode(target)) {
                if (topLevelElement === null) {
                  {
                    throw Error(`insertNode: topLevelElement is root node`);
                  }
                }
                target = topLevelElement;
              }
            } else if (didReplaceOrMerge && !$isDecoratorNode(node) && $isRootOrShadowRoot(target.getParent())) {
              {
                throw Error(`insertNodes: cannot insert a non-element into a root node`);
              }
            }
            didReplaceOrMerge = false;
            if ($isElementNode(target) && !target.isInline()) {
              lastNode = node;
              if ($isDecoratorNode(node) && !node.isInline()) {
                target = target.insertAfter(node);
              } else if (!$isElementNode(node)) {
                const firstChild = target.getFirstChild();
                if (firstChild !== null) {
                  firstChild.insertBefore(node);
                } else {
                  target.append(node);
                }
                target = node;
              } else {
                if (!node.canBeEmpty() && node.isEmpty()) {
                  continue;
                }
                if ($isRootOrShadowRoot(target)) {
                  const placementNode = target.getChildAtIndex(anchorOffset);
                  if (placementNode !== null) {
                    placementNode.insertBefore(node);
                  } else {
                    target.append(node);
                  }
                  target = node;
                } else {
                  target = target.insertAfter(node);
                }
              }
            } else if (!$isElementNode(node) || $isElementNode(node) && node.isInline() || $isDecoratorNode(target) && !target.isInline()) {
              lastNode = node;
              target = target.insertAfter(node);
            } else {
              const nextTarget = target.getParentOrThrow();
              if ($isLineBreakNode(target)) {
                target.remove();
              }
              target = nextTarget;
              i--;
              continue;
            }
          }
          if (selectStart) {
            if ($isTextNode(startingNode)) {
              startingNode.select();
            } else {
              const prevSibling = target.getPreviousSibling();
              if ($isTextNode(prevSibling)) {
                prevSibling.select();
              } else {
                const index = target.getIndexWithinParent();
                target.getParentOrThrow().select(index, index);
              }
            }
          }
          if ($isElementNode(target)) {
            const lastChild = $isTextNode(lastNode) ? lastNode : $isElementNode(lastNode) && lastNode.isInline() ? lastNode.getLastDescendant() : target.getLastDescendant();
            if (!selectStart) {
              if (lastChild === null) {
                target.select();
              } else if ($isTextNode(lastChild)) {
                lastChild.select();
              } else {
                lastChild.selectNext();
              }
            }
            if (siblings.length !== 0) {
              const originalTarget = target;
              for (let i = siblings.length - 1; i >= 0; i--) {
                const sibling = siblings[i];
                const prevParent = sibling.getParentOrThrow();
                if ($isElementNode(target) && !$isBlockElementNode(sibling) && !($isDecoratorNode(sibling) && !sibling.isInline())) {
                  if (originalTarget === target) {
                    target.append(sibling);
                  } else {
                    target.insertBefore(sibling);
                  }
                  target = sibling;
                } else if (!$isElementNode(target) && !$isBlockElementNode(sibling)) {
                  target.insertBefore(sibling);
                  target = sibling;
                } else {
                  if ($isElementNode(sibling) && !sibling.canInsertAfter(target)) {
                    const prevParentClone = prevParent.constructor.clone(prevParent);
                    if (!$isElementNode(prevParentClone)) {
                      {
                        throw Error(`insertNodes: cloned parent clone is not an element`);
                      }
                    }
                    prevParentClone.append(sibling);
                    target.insertAfter(prevParentClone);
                  } else {
                    target.insertAfter(sibling);
                  }
                }
                if (prevParent.isEmpty() && !prevParent.canBeEmpty()) {
                  prevParent.remove();
                }
              }
            }
          } else if (!selectStart) {
            if ($isTextNode(target)) {
              target.select();
            } else {
              const element = target.getParentOrThrow();
              const index = target.getIndexWithinParent() + 1;
              element.select(index, index);
            }
          }
          return true;
        }
        insertParagraph() {
          if (!this.isCollapsed()) {
            this.removeText();
          }
          const anchor = this.anchor;
          const anchorOffset = anchor.offset;
          let currentElement;
          let nodesToMove = [];
          let siblingsToMove = [];
          if (anchor.type === "text") {
            const anchorNode = anchor.getNode();
            nodesToMove = anchorNode.getNextSiblings().reverse();
            currentElement = anchorNode.getParentOrThrow();
            const isInline = currentElement.isInline();
            const textContentLength = isInline ? currentElement.getTextContentSize() : anchorNode.getTextContentSize();
            if (anchorOffset === 0) {
              nodesToMove.push(anchorNode);
            } else {
              if (isInline) {
                siblingsToMove = currentElement.getNextSiblings();
              }
              if (anchorOffset !== textContentLength) {
                if (!isInline || anchorOffset !== anchorNode.getTextContentSize()) {
                  const [, splitNode] = anchorNode.splitText(anchorOffset);
                  nodesToMove.push(splitNode);
                }
              }
            }
          } else {
            currentElement = anchor.getNode();
            if ($isRootOrShadowRoot(currentElement)) {
              const paragraph = $createParagraphNode();
              const child = currentElement.getChildAtIndex(anchorOffset);
              paragraph.select();
              if (child !== null) {
                child.insertBefore(paragraph);
              } else {
                currentElement.append(paragraph);
              }
              return;
            }
            nodesToMove = currentElement.getChildren().slice(anchorOffset).reverse();
          }
          const nodesToMoveLength = nodesToMove.length;
          if (anchorOffset === 0 && nodesToMoveLength > 0 && currentElement.isInline()) {
            const parent = currentElement.getParentOrThrow();
            const newElement2 = parent.insertNewAfter(this);
            if ($isElementNode(newElement2)) {
              const children = parent.getChildren();
              for (let i = 0; i < children.length; i++) {
                newElement2.append(children[i]);
              }
            }
            return;
          }
          const newElement = currentElement.insertNewAfter(this);
          if (newElement === null) {
            this.insertLineBreak();
          } else if ($isElementNode(newElement)) {
            const currentElementFirstChild = currentElement.getFirstChild();
            const isBeginning = anchorOffset === 0 && (currentElement.is(anchor.getNode()) || currentElementFirstChild && currentElementFirstChild.is(anchor.getNode()));
            if (isBeginning && nodesToMoveLength > 0) {
              currentElement.insertBefore(newElement);
              return;
            }
            let firstChild = null;
            const siblingsToMoveLength = siblingsToMove.length;
            const parent = newElement.getParentOrThrow();
            if (siblingsToMoveLength > 0) {
              for (let i = 0; i < siblingsToMoveLength; i++) {
                const siblingToMove = siblingsToMove[i];
                parent.append(siblingToMove);
              }
            }
            if (nodesToMoveLength !== 0) {
              for (let i = 0; i < nodesToMoveLength; i++) {
                const nodeToMove = nodesToMove[i];
                if (firstChild === null) {
                  newElement.append(nodeToMove);
                } else {
                  firstChild.insertBefore(nodeToMove);
                }
                firstChild = nodeToMove;
              }
            }
            if (!newElement.canBeEmpty() && newElement.getChildrenSize() === 0) {
              newElement.selectPrevious();
              newElement.remove();
            } else {
              newElement.selectStart();
            }
          }
        }
        insertLineBreak(selectStart) {
          const lineBreakNode = $createLineBreakNode();
          const anchor = this.anchor;
          if (anchor.type === "element") {
            const element = anchor.getNode();
            if ($isRootNode(element)) {
              this.insertParagraph();
            }
          }
          if (selectStart) {
            this.insertNodes([lineBreakNode], true);
          } else {
            if (this.insertNodes([lineBreakNode])) {
              lineBreakNode.selectNext(0, 0);
            }
          }
        }
        getCharacterOffsets() {
          return getCharacterOffsets(this);
        }
        extract() {
          const selectedNodes = this.getNodes();
          const selectedNodesLength = selectedNodes.length;
          const lastIndex = selectedNodesLength - 1;
          const anchor = this.anchor;
          const focus = this.focus;
          let firstNode = selectedNodes[0];
          let lastNode = selectedNodes[lastIndex];
          const [anchorOffset, focusOffset] = getCharacterOffsets(this);
          if (selectedNodesLength === 0) {
            return [];
          } else if (selectedNodesLength === 1) {
            if ($isTextNode(firstNode) && !this.isCollapsed()) {
              const startOffset = anchorOffset > focusOffset ? focusOffset : anchorOffset;
              const endOffset = anchorOffset > focusOffset ? anchorOffset : focusOffset;
              const splitNodes = firstNode.splitText(startOffset, endOffset);
              const node = startOffset === 0 ? splitNodes[0] : splitNodes[1];
              return node != null ? [node] : [];
            }
            return [firstNode];
          }
          const isBefore = anchor.isBefore(focus);
          if ($isTextNode(firstNode)) {
            const startOffset = isBefore ? anchorOffset : focusOffset;
            if (startOffset === firstNode.getTextContentSize()) {
              selectedNodes.shift();
            } else if (startOffset !== 0) {
              [, firstNode] = firstNode.splitText(startOffset);
              selectedNodes[0] = firstNode;
            }
          }
          if ($isTextNode(lastNode)) {
            const lastNodeText = lastNode.getTextContent();
            const lastNodeTextLength = lastNodeText.length;
            const endOffset = isBefore ? focusOffset : anchorOffset;
            if (endOffset === 0) {
              selectedNodes.pop();
            } else if (endOffset !== lastNodeTextLength) {
              [lastNode] = lastNode.splitText(endOffset);
              selectedNodes[lastIndex] = lastNode;
            }
          }
          return selectedNodes;
        }
        modify(alter, isBackward, granularity) {
          const focus = this.focus;
          const anchor = this.anchor;
          const collapse = alter === "move";
          const possibleNode = $getDecoratorNode(focus, isBackward);
          if ($isDecoratorNode(possibleNode) && !possibleNode.isIsolated()) {
            if (collapse) {
              const nodeSelection = $createNodeSelection();
              nodeSelection.add(possibleNode.__key);
              $setSelection(nodeSelection);
              return;
            }
            const sibling = isBackward ? possibleNode.getPreviousSibling() : possibleNode.getNextSibling();
            if (!$isTextNode(sibling)) {
              const parent = possibleNode.getParentOrThrow();
              let offset;
              let elementKey;
              if ($isElementNode(sibling)) {
                elementKey = sibling.__key;
                offset = isBackward ? sibling.getChildrenSize() : 0;
              } else {
                offset = possibleNode.getIndexWithinParent();
                elementKey = parent.__key;
                if (!isBackward) {
                  offset++;
                }
              }
              focus.set(elementKey, offset, "element");
              if (collapse) {
                anchor.set(elementKey, offset, "element");
              }
              return;
            } else {
              const siblingKey = sibling.__key;
              const offset = isBackward ? sibling.getTextContent().length : 0;
              focus.set(siblingKey, offset, "text");
              if (collapse) {
                anchor.set(siblingKey, offset, "text");
              }
              return;
            }
          }
          const domSelection = getDOMSelection();
          if (!domSelection) {
            return;
          }
          $moveNativeSelection(domSelection, alter, isBackward ? "backward" : "forward", granularity);
          if (domSelection.rangeCount > 0) {
            const range = domSelection.getRangeAt(0);
            this.applyDOMRange(range);
            this.dirty = true;
            if (!collapse && (domSelection.anchorNode !== range.startContainer || domSelection.anchorOffset !== range.startOffset)) {
              $swapPoints(this);
            }
          }
        }
        deleteCharacter(isBackward) {
          if (this.isCollapsed()) {
            const anchor = this.anchor;
            const focus = this.focus;
            let anchorNode = anchor.getNode();
            if (!isBackward && (anchor.type === "element" && $isElementNode(anchorNode) && anchor.offset === anchorNode.getChildrenSize() || anchor.type === "text" && anchor.offset === anchorNode.getTextContentSize())) {
              const nextSibling = anchorNode.getNextSibling() || anchorNode.getParentOrThrow().getNextSibling();
              if ($isElementNode(nextSibling) && !nextSibling.canExtractContents()) {
                return;
              }
            }
            this.modify("extend", isBackward, "character");
            if (!this.isCollapsed()) {
              const focusNode = focus.type === "text" ? focus.getNode() : null;
              anchorNode = anchor.type === "text" ? anchor.getNode() : null;
              if (focusNode !== null && focusNode.isSegmented()) {
                const offset = focus.offset;
                const textContentSize = focusNode.getTextContentSize();
                if (focusNode.is(anchorNode) || isBackward && offset !== textContentSize || !isBackward && offset !== 0) {
                  $removeSegment(focusNode, isBackward, offset);
                  return;
                }
              } else if (anchorNode !== null && anchorNode.isSegmented()) {
                const offset = anchor.offset;
                const textContentSize = anchorNode.getTextContentSize();
                if (anchorNode.is(focusNode) || isBackward && offset !== 0 || !isBackward && offset !== textContentSize) {
                  $removeSegment(anchorNode, isBackward, offset);
                  return;
                }
              }
              $updateCaretSelectionForUnicodeCharacter(this, isBackward);
            } else if (isBackward && anchor.offset === 0) {
              const element = anchor.type === "element" ? anchor.getNode() : anchor.getNode().getParentOrThrow();
              if (element.collapseAtStart(this)) {
                return;
              }
            }
          }
          this.removeText();
        }
        deleteLine(isBackward) {
          if (this.isCollapsed()) {
            if (this.anchor.type === "text") {
              this.modify("extend", isBackward, "lineboundary");
            }
            const endPoint = isBackward ? this.focus : this.anchor;
            if (endPoint.offset === 0) {
              this.modify("extend", isBackward, "character");
            }
          }
          this.removeText();
        }
        deleteWord(isBackward) {
          if (this.isCollapsed()) {
            this.modify("extend", isBackward, "word");
          }
          this.removeText();
        }
      };
      function $isNodeSelection(x) {
        return x instanceof NodeSelection;
      }
      function getCharacterOffset(point) {
        const offset = point.offset;
        if (point.type === "text") {
          return offset;
        }
        const parent = point.getNode();
        return offset === parent.getChildrenSize() ? parent.getTextContent().length : 0;
      }
      function getCharacterOffsets(selection) {
        const anchor = selection.anchor;
        const focus = selection.focus;
        if (anchor.type === "element" && focus.type === "element" && anchor.key === focus.key && anchor.offset === focus.offset) {
          return [0, 0];
        }
        return [getCharacterOffset(anchor), getCharacterOffset(focus)];
      }
      function $swapPoints(selection) {
        const focus = selection.focus;
        const anchor = selection.anchor;
        const anchorKey = anchor.key;
        const anchorOffset = anchor.offset;
        const anchorType = anchor.type;
        $setPointValues(anchor, focus.key, focus.offset, focus.type);
        $setPointValues(focus, anchorKey, anchorOffset, anchorType);
        selection._cachedNodes = null;
      }
      function $moveNativeSelection(domSelection, alter, direction, granularity) {
        domSelection.modify(alter, direction, granularity);
      }
      function $updateCaretSelectionForUnicodeCharacter(selection, isBackward) {
        const anchor = selection.anchor;
        const focus = selection.focus;
        const anchorNode = anchor.getNode();
        const focusNode = focus.getNode();
        if (anchorNode === focusNode && anchor.type === "text" && focus.type === "text") {
          const anchorOffset = anchor.offset;
          const focusOffset = focus.offset;
          const isBefore = anchorOffset < focusOffset;
          const startOffset = isBefore ? anchorOffset : focusOffset;
          const endOffset = isBefore ? focusOffset : anchorOffset;
          const characterOffset = endOffset - 1;
          if (startOffset !== characterOffset) {
            const text = anchorNode.getTextContent().slice(startOffset, endOffset);
            if (!doesContainGrapheme(text)) {
              if (isBackward) {
                focus.offset = characterOffset;
              } else {
                anchor.offset = characterOffset;
              }
            }
          }
        }
      }
      function $removeSegment(node, isBackward, offset) {
        const textNode = node;
        const textContent = textNode.getTextContent();
        const split = textContent.split(/(?=\s)/g);
        const splitLength = split.length;
        let segmentOffset = 0;
        let restoreOffset = 0;
        for (let i = 0; i < splitLength; i++) {
          const text = split[i];
          const isLast = i === splitLength - 1;
          restoreOffset = segmentOffset;
          segmentOffset += text.length;
          if (isBackward && segmentOffset === offset || segmentOffset > offset || isLast) {
            split.splice(i, 1);
            if (isLast) {
              restoreOffset = void 0;
            }
            break;
          }
        }
        const nextTextContent = split.join("").trim();
        if (nextTextContent === "") {
          textNode.remove();
        } else {
          textNode.setTextContent(nextTextContent);
          textNode.select(restoreOffset, restoreOffset);
        }
      }
      function shouldResolveAncestor(resolvedElement, resolvedOffset, lastPoint) {
        const parent = resolvedElement.getParent();
        return lastPoint === null || parent === null || !parent.canBeEmpty() || parent !== lastPoint.getNode();
      }
      function internalResolveSelectionPoint(dom, offset, lastPoint) {
        let resolvedOffset = offset;
        let resolvedNode;
        if (dom.nodeType === DOM_ELEMENT_TYPE) {
          let moveSelectionToEnd = false;
          const childNodes = dom.childNodes;
          const childNodesLength = childNodes.length;
          if (resolvedOffset === childNodesLength) {
            moveSelectionToEnd = true;
            resolvedOffset = childNodesLength - 1;
          }
          const childDOM = childNodes[resolvedOffset];
          resolvedNode = getNodeFromDOM(childDOM);
          if ($isTextNode(resolvedNode)) {
            resolvedOffset = getTextNodeOffset(resolvedNode, moveSelectionToEnd);
          } else {
            let resolvedElement = getNodeFromDOM(dom);
            if (resolvedElement === null) {
              return null;
            }
            if ($isElementNode(resolvedElement)) {
              let child = resolvedElement.getChildAtIndex(resolvedOffset);
              if ($isElementNode(child) && shouldResolveAncestor(child, resolvedOffset, lastPoint)) {
                const descendant = moveSelectionToEnd ? child.getLastDescendant() : child.getFirstDescendant();
                if (descendant === null) {
                  resolvedElement = child;
                  resolvedOffset = 0;
                } else {
                  child = descendant;
                  resolvedElement = child.getParentOrThrow();
                }
              }
              if ($isTextNode(child)) {
                resolvedNode = child;
                resolvedElement = null;
                resolvedOffset = getTextNodeOffset(child, moveSelectionToEnd);
              } else if (child !== resolvedElement && moveSelectionToEnd) {
                resolvedOffset++;
              }
            } else {
              const index = resolvedElement.getIndexWithinParent();
              if (offset === 0 && $isDecoratorNode(resolvedElement) && getNodeFromDOM(dom) === resolvedElement) {
                resolvedOffset = index;
              } else {
                resolvedOffset = index + 1;
              }
              resolvedElement = resolvedElement.getParentOrThrow();
            }
            if ($isElementNode(resolvedElement)) {
              return $createPoint(resolvedElement.__key, resolvedOffset, "element");
            }
          }
        } else {
          resolvedNode = getNodeFromDOM(dom);
        }
        if (!$isTextNode(resolvedNode)) {
          return null;
        }
        return $createPoint(resolvedNode.__key, resolvedOffset, "text");
      }
      function resolveSelectionPointOnBoundary(point, isBackward, isCollapsed) {
        const offset = point.offset;
        const node = point.getNode();
        if (offset === 0) {
          const prevSibling = node.getPreviousSibling();
          const parent = node.getParent();
          if (!isBackward) {
            if ($isElementNode(prevSibling) && !isCollapsed && prevSibling.isInline()) {
              point.key = prevSibling.__key;
              point.offset = prevSibling.getChildrenSize();
              point.type = "element";
            } else if ($isTextNode(prevSibling)) {
              point.key = prevSibling.__key;
              point.offset = prevSibling.getTextContent().length;
            }
          } else if ((isCollapsed || !isBackward) && prevSibling === null && $isElementNode(parent) && parent.isInline()) {
            const parentSibling = parent.getPreviousSibling();
            if ($isTextNode(parentSibling)) {
              point.key = parentSibling.__key;
              point.offset = parentSibling.getTextContent().length;
            }
          }
        } else if (offset === node.getTextContent().length) {
          const nextSibling = node.getNextSibling();
          const parent = node.getParent();
          if (isBackward && $isElementNode(nextSibling) && nextSibling.isInline()) {
            point.key = nextSibling.__key;
            point.offset = 0;
            point.type = "element";
          } else if ((isCollapsed || isBackward) && nextSibling === null && $isElementNode(parent) && parent.isInline() && !parent.canInsertTextAfter()) {
            const parentSibling = parent.getNextSibling();
            if ($isTextNode(parentSibling)) {
              point.key = parentSibling.__key;
              point.offset = 0;
            }
          }
        }
      }
      function normalizeSelectionPointsForBoundaries(anchor, focus, lastSelection) {
        if (anchor.type === "text" && focus.type === "text") {
          const isBackward = anchor.isBefore(focus);
          const isCollapsed = anchor.is(focus);
          resolveSelectionPointOnBoundary(anchor, isBackward, isCollapsed);
          resolveSelectionPointOnBoundary(focus, !isBackward, isCollapsed);
          if (isCollapsed) {
            focus.key = anchor.key;
            focus.offset = anchor.offset;
            focus.type = anchor.type;
          }
          const editor = getActiveEditor();
          if (editor.isComposing() && editor._compositionKey !== anchor.key && $isRangeSelection(lastSelection)) {
            const lastAnchor = lastSelection.anchor;
            const lastFocus = lastSelection.focus;
            $setPointValues(anchor, lastAnchor.key, lastAnchor.offset, lastAnchor.type);
            $setPointValues(focus, lastFocus.key, lastFocus.offset, lastFocus.type);
          }
        }
      }
      function internalResolveSelectionPoints(anchorDOM, anchorOffset, focusDOM, focusOffset, editor, lastSelection) {
        if (anchorDOM === null || focusDOM === null || !isSelectionWithinEditor(editor, anchorDOM, focusDOM)) {
          return null;
        }
        const resolvedAnchorPoint = internalResolveSelectionPoint(anchorDOM, anchorOffset, $isRangeSelection(lastSelection) ? lastSelection.anchor : null);
        if (resolvedAnchorPoint === null) {
          return null;
        }
        const resolvedFocusPoint = internalResolveSelectionPoint(focusDOM, focusOffset, $isRangeSelection(lastSelection) ? lastSelection.focus : null);
        if (resolvedFocusPoint === null) {
          return null;
        }
        if (resolvedAnchorPoint.type === "element" && resolvedFocusPoint.type === "element") {
          const anchorNode = getNodeFromDOM(anchorDOM);
          const focusNode = getNodeFromDOM(focusDOM);
          if ($isDecoratorNode(anchorNode) && $isDecoratorNode(focusNode)) {
            return null;
          }
        }
        normalizeSelectionPointsForBoundaries(resolvedAnchorPoint, resolvedFocusPoint, lastSelection);
        return [resolvedAnchorPoint, resolvedFocusPoint];
      }
      function $isBlockElementNode(node) {
        return $isElementNode(node) && !node.isInline();
      }
      function internalMakeRangeSelection(anchorKey, anchorOffset, focusKey, focusOffset, anchorType, focusType) {
        const editorState = getActiveEditorState();
        const selection = new RangeSelection($createPoint(anchorKey, anchorOffset, anchorType), $createPoint(focusKey, focusOffset, focusType), 0);
        selection.dirty = true;
        editorState._selection = selection;
        return selection;
      }
      function $createRangeSelection() {
        const anchor = $createPoint("root", 0, "element");
        const focus = $createPoint("root", 0, "element");
        return new RangeSelection(anchor, focus, 0);
      }
      function $createNodeSelection() {
        return new NodeSelection(/* @__PURE__ */ new Set());
      }
      function DEPRECATED_$createGridSelection() {
        const anchor = $createPoint("root", 0, "element");
        const focus = $createPoint("root", 0, "element");
        return new GridSelection("root", anchor, focus);
      }
      function internalCreateSelection(editor) {
        const currentEditorState = editor.getEditorState();
        const lastSelection = currentEditorState._selection;
        const domSelection = getDOMSelection();
        if ($isNodeSelection(lastSelection) || DEPRECATED_$isGridSelection(lastSelection)) {
          return lastSelection.clone();
        }
        return internalCreateRangeSelection(lastSelection, domSelection, editor);
      }
      function internalCreateRangeSelection(lastSelection, domSelection, editor) {
        const windowObj = editor._window;
        if (windowObj === null) {
          return null;
        }
        const windowEvent = windowObj.event;
        const eventType = windowEvent ? windowEvent.type : void 0;
        const isSelectionChange = eventType === "selectionchange";
        const useDOMSelection = !getIsProcesssingMutations() && (isSelectionChange || eventType === "beforeinput" || eventType === "compositionstart" || eventType === "compositionend" || eventType === "click" && windowEvent && windowEvent.detail === 3 || eventType === void 0);
        let anchorDOM, focusDOM, anchorOffset, focusOffset;
        if (!$isRangeSelection(lastSelection) || useDOMSelection) {
          if (domSelection === null) {
            return null;
          }
          anchorDOM = domSelection.anchorNode;
          focusDOM = domSelection.focusNode;
          anchorOffset = domSelection.anchorOffset;
          focusOffset = domSelection.focusOffset;
          if (isSelectionChange && $isRangeSelection(lastSelection) && !isSelectionWithinEditor(editor, anchorDOM, focusDOM)) {
            return lastSelection.clone();
          }
        } else {
          return lastSelection.clone();
        }
        const resolvedSelectionPoints = internalResolveSelectionPoints(anchorDOM, anchorOffset, focusDOM, focusOffset, editor, lastSelection);
        if (resolvedSelectionPoints === null) {
          return null;
        }
        const [resolvedAnchorPoint, resolvedFocusPoint] = resolvedSelectionPoints;
        return new RangeSelection(resolvedAnchorPoint, resolvedFocusPoint, !$isRangeSelection(lastSelection) ? 0 : lastSelection.format);
      }
      function $getSelection() {
        const editorState = getActiveEditorState();
        return editorState._selection;
      }
      function $getPreviousSelection() {
        const editor = getActiveEditor();
        return editor._editorState._selection;
      }
      function $updateElementSelectionOnCreateDeleteNode(selection, parentNode, nodeOffset, times = 1) {
        const anchor = selection.anchor;
        const focus = selection.focus;
        const anchorNode = anchor.getNode();
        const focusNode = focus.getNode();
        if (!parentNode.is(anchorNode) && !parentNode.is(focusNode)) {
          return;
        }
        const parentKey = parentNode.__key;
        if (selection.isCollapsed()) {
          const selectionOffset = anchor.offset;
          if (nodeOffset <= selectionOffset) {
            const newSelectionOffset = Math.max(0, selectionOffset + times);
            anchor.set(parentKey, newSelectionOffset, "element");
            focus.set(parentKey, newSelectionOffset, "element");
            $updateSelectionResolveTextNodes(selection);
          }
          return;
        }
        const isBackward = selection.isBackward();
        const firstPoint = isBackward ? focus : anchor;
        const firstPointNode = firstPoint.getNode();
        const lastPoint = isBackward ? anchor : focus;
        const lastPointNode = lastPoint.getNode();
        if (parentNode.is(firstPointNode)) {
          const firstPointOffset = firstPoint.offset;
          if (nodeOffset <= firstPointOffset) {
            firstPoint.set(parentKey, Math.max(0, firstPointOffset + times), "element");
          }
        }
        if (parentNode.is(lastPointNode)) {
          const lastPointOffset = lastPoint.offset;
          if (nodeOffset <= lastPointOffset) {
            lastPoint.set(parentKey, Math.max(0, lastPointOffset + times), "element");
          }
        }
        $updateSelectionResolveTextNodes(selection);
      }
      function $updateSelectionResolveTextNodes(selection) {
        const anchor = selection.anchor;
        const anchorOffset = anchor.offset;
        const focus = selection.focus;
        const focusOffset = focus.offset;
        const anchorNode = anchor.getNode();
        const focusNode = focus.getNode();
        if (selection.isCollapsed()) {
          if (!$isElementNode(anchorNode)) {
            return;
          }
          const childSize = anchorNode.getChildrenSize();
          const anchorOffsetAtEnd = anchorOffset >= childSize;
          const child = anchorOffsetAtEnd ? anchorNode.getChildAtIndex(childSize - 1) : anchorNode.getChildAtIndex(anchorOffset);
          if ($isTextNode(child)) {
            let newOffset = 0;
            if (anchorOffsetAtEnd) {
              newOffset = child.getTextContentSize();
            }
            anchor.set(child.__key, newOffset, "text");
            focus.set(child.__key, newOffset, "text");
          }
          return;
        }
        if ($isElementNode(anchorNode)) {
          const childSize = anchorNode.getChildrenSize();
          const anchorOffsetAtEnd = anchorOffset >= childSize;
          const child = anchorOffsetAtEnd ? anchorNode.getChildAtIndex(childSize - 1) : anchorNode.getChildAtIndex(anchorOffset);
          if ($isTextNode(child)) {
            let newOffset = 0;
            if (anchorOffsetAtEnd) {
              newOffset = child.getTextContentSize();
            }
            anchor.set(child.__key, newOffset, "text");
          }
        }
        if ($isElementNode(focusNode)) {
          const childSize = focusNode.getChildrenSize();
          const focusOffsetAtEnd = focusOffset >= childSize;
          const child = focusOffsetAtEnd ? focusNode.getChildAtIndex(childSize - 1) : focusNode.getChildAtIndex(focusOffset);
          if ($isTextNode(child)) {
            let newOffset = 0;
            if (focusOffsetAtEnd) {
              newOffset = child.getTextContentSize();
            }
            focus.set(child.__key, newOffset, "text");
          }
        }
      }
      function applySelectionTransforms(nextEditorState, editor) {
        const prevEditorState = editor.getEditorState();
        const prevSelection = prevEditorState._selection;
        const nextSelection = nextEditorState._selection;
        if ($isRangeSelection(nextSelection)) {
          const anchor = nextSelection.anchor;
          const focus = nextSelection.focus;
          let anchorNode;
          if (anchor.type === "text") {
            anchorNode = anchor.getNode();
            anchorNode.selectionTransform(prevSelection, nextSelection);
          }
          if (focus.type === "text") {
            const focusNode = focus.getNode();
            if (anchorNode !== focusNode) {
              focusNode.selectionTransform(prevSelection, nextSelection);
            }
          }
        }
      }
      function moveSelectionPointToSibling(point, node, parent, prevSibling, nextSibling) {
        let siblingKey = null;
        let offset = 0;
        let type = null;
        if (prevSibling !== null) {
          siblingKey = prevSibling.__key;
          if ($isTextNode(prevSibling)) {
            offset = prevSibling.getTextContentSize();
            type = "text";
          } else if ($isElementNode(prevSibling)) {
            offset = prevSibling.getChildrenSize();
            type = "element";
          }
        } else {
          if (nextSibling !== null) {
            siblingKey = nextSibling.__key;
            if ($isTextNode(nextSibling)) {
              type = "text";
            } else if ($isElementNode(nextSibling)) {
              type = "element";
            }
          }
        }
        if (siblingKey !== null && type !== null) {
          point.set(siblingKey, offset, type);
        } else {
          offset = node.getIndexWithinParent();
          if (offset === -1) {
            offset = parent.getChildrenSize();
          }
          point.set(parent.__key, offset, "element");
        }
      }
      function adjustPointOffsetForMergedSibling(point, isBefore, key, target, textLength) {
        if (point.type === "text") {
          point.key = key;
          if (!isBefore) {
            point.offset += textLength;
          }
        } else if (point.offset > target.getIndexWithinParent()) {
          point.offset -= 1;
        }
      }
      function updateDOMSelection(prevSelection, nextSelection, editor, domSelection, tags, rootElement) {
        const anchorDOMNode = domSelection.anchorNode;
        const focusDOMNode = domSelection.focusNode;
        const anchorOffset = domSelection.anchorOffset;
        const focusOffset = domSelection.focusOffset;
        const activeElement = document.activeElement;
        if (tags.has("collaboration") && activeElement !== rootElement) {
          return;
        }
        if (!$isRangeSelection(nextSelection)) {
          if (prevSelection !== null && isSelectionWithinEditor(editor, anchorDOMNode, focusDOMNode)) {
            domSelection.removeAllRanges();
          }
          return;
        }
        const anchor = nextSelection.anchor;
        const focus = nextSelection.focus;
        const anchorKey = anchor.key;
        const focusKey = focus.key;
        const anchorDOM = getElementByKeyOrThrow(editor, anchorKey);
        const focusDOM = getElementByKeyOrThrow(editor, focusKey);
        const nextAnchorOffset = anchor.offset;
        const nextFocusOffset = focus.offset;
        const nextFormat = nextSelection.format;
        const isCollapsed = nextSelection.isCollapsed();
        let nextAnchorNode = anchorDOM;
        let nextFocusNode = focusDOM;
        let anchorFormatChanged = false;
        if (anchor.type === "text") {
          nextAnchorNode = getDOMTextNode(anchorDOM);
          anchorFormatChanged = anchor.getNode().getFormat() !== nextFormat;
        }
        if (focus.type === "text") {
          nextFocusNode = getDOMTextNode(focusDOM);
        }
        if (nextAnchorNode === null || nextFocusNode === null) {
          return;
        }
        if (isCollapsed && (prevSelection === null || anchorFormatChanged || $isRangeSelection(prevSelection) && prevSelection.format !== nextFormat)) {
          markCollapsedSelectionFormat(nextFormat, nextAnchorOffset, anchorKey, performance.now());
        }
        if (anchorOffset === nextAnchorOffset && focusOffset === nextFocusOffset && anchorDOMNode === nextAnchorNode && focusDOMNode === nextFocusNode && !(domSelection.type === "Range" && isCollapsed)) {
          if (rootElement !== null && (activeElement === null || !rootElement.contains(activeElement))) {
            rootElement.focus({
              preventScroll: true
            });
          }
          if (!(IS_IOS || IS_SAFARI) || anchor.type !== "element") {
            return;
          }
        }
        try {
          domSelection.setBaseAndExtent(nextAnchorNode, nextAnchorOffset, nextFocusNode, nextFocusOffset);
          if (nextSelection.isCollapsed() && rootElement !== null && rootElement === activeElement) {
            scrollIntoViewIfNeeded(editor, anchor, rootElement, tags);
          }
          markSelectionChangeFromDOMUpdate();
        } catch (error) {
        }
      }
      function $insertNodes(nodes, selectStart) {
        let selection = $getSelection();
        if (selection === null) {
          selection = $getRoot().selectEnd();
        }
        return selection.insertNodes(nodes, selectStart);
      }
      var activeEditorState = null;
      var activeEditor = null;
      var isReadOnlyMode = false;
      var isAttemptingToRecoverFromReconcilerError = false;
      var infiniteTransformCount = 0;
      function isCurrentlyReadOnlyMode() {
        return isReadOnlyMode;
      }
      function errorOnReadOnly() {
        if (isReadOnlyMode) {
          {
            throw Error(`Cannot use method in read-only mode.`);
          }
        }
      }
      function errorOnInfiniteTransforms() {
        if (infiniteTransformCount > 99) {
          {
            throw Error(`One or more transforms are endlessly triggering additional transforms. May have encountered infinite recursion caused by transforms that have their preconditions too lose and/or conflict with each other.`);
          }
        }
      }
      function getActiveEditorState() {
        if (activeEditorState === null) {
          {
            throw Error(`Unable to find an active editor state. State helpers or node methods can only be used synchronously during the callback of editor.update() or editorState.read().`);
          }
        }
        return activeEditorState;
      }
      function getActiveEditor() {
        if (activeEditor === null) {
          {
            throw Error(`Unable to find an active editor. This method can only be used synchronously during the callback of editor.update().`);
          }
        }
        return activeEditor;
      }
      function $applyTransforms(editor, node, transformsCache) {
        const type = node.__type;
        const registeredNode = getRegisteredNodeOrThrow(editor, type);
        let transformsArr = transformsCache.get(type);
        if (transformsArr === void 0) {
          transformsArr = Array.from(registeredNode.transforms);
          transformsCache.set(type, transformsArr);
        }
        const transformsArrLength = transformsArr.length;
        for (let i = 0; i < transformsArrLength; i++) {
          transformsArr[i](node);
          if (!node.isAttached()) {
            break;
          }
        }
      }
      function $isNodeValidForTransform(node, compositionKey) {
        return node !== void 0 && node.__key !== compositionKey && node.isAttached();
      }
      function $normalizeAllDirtyTextNodes(editorState, editor) {
        const dirtyLeaves = editor._dirtyLeaves;
        const nodeMap = editorState._nodeMap;
        for (const nodeKey of dirtyLeaves) {
          const node = nodeMap.get(nodeKey);
          if ($isTextNode(node) && node.isAttached() && node.isSimpleText() && !node.isUnmergeable()) {
            $normalizeTextNode(node);
          }
        }
      }
      function $applyAllTransforms(editorState, editor) {
        const dirtyLeaves = editor._dirtyLeaves;
        const dirtyElements = editor._dirtyElements;
        const nodeMap = editorState._nodeMap;
        const compositionKey = $getCompositionKey();
        const transformsCache = /* @__PURE__ */ new Map();
        let untransformedDirtyLeaves = dirtyLeaves;
        let untransformedDirtyLeavesLength = untransformedDirtyLeaves.size;
        let untransformedDirtyElements = dirtyElements;
        let untransformedDirtyElementsLength = untransformedDirtyElements.size;
        while (untransformedDirtyLeavesLength > 0 || untransformedDirtyElementsLength > 0) {
          if (untransformedDirtyLeavesLength > 0) {
            editor._dirtyLeaves = /* @__PURE__ */ new Set();
            for (const nodeKey of untransformedDirtyLeaves) {
              const node = nodeMap.get(nodeKey);
              if ($isTextNode(node) && node.isAttached() && node.isSimpleText() && !node.isUnmergeable()) {
                $normalizeTextNode(node);
              }
              if (node !== void 0 && $isNodeValidForTransform(node, compositionKey)) {
                $applyTransforms(editor, node, transformsCache);
              }
              dirtyLeaves.add(nodeKey);
            }
            untransformedDirtyLeaves = editor._dirtyLeaves;
            untransformedDirtyLeavesLength = untransformedDirtyLeaves.size;
            if (untransformedDirtyLeavesLength > 0) {
              infiniteTransformCount++;
              continue;
            }
          }
          editor._dirtyLeaves = /* @__PURE__ */ new Set();
          editor._dirtyElements = /* @__PURE__ */ new Map();
          for (const currentUntransformedDirtyElement of untransformedDirtyElements) {
            const nodeKey = currentUntransformedDirtyElement[0];
            const intentionallyMarkedAsDirty = currentUntransformedDirtyElement[1];
            if (nodeKey !== "root" && !intentionallyMarkedAsDirty) {
              continue;
            }
            const node = nodeMap.get(nodeKey);
            if (node !== void 0 && $isNodeValidForTransform(node, compositionKey)) {
              $applyTransforms(editor, node, transformsCache);
            }
            dirtyElements.set(nodeKey, intentionallyMarkedAsDirty);
          }
          untransformedDirtyLeaves = editor._dirtyLeaves;
          untransformedDirtyLeavesLength = untransformedDirtyLeaves.size;
          untransformedDirtyElements = editor._dirtyElements;
          untransformedDirtyElementsLength = untransformedDirtyElements.size;
          infiniteTransformCount++;
        }
        editor._dirtyLeaves = dirtyLeaves;
        editor._dirtyElements = dirtyElements;
      }
      function $parseSerializedNode(serializedNode) {
        const internalSerializedNode = serializedNode;
        return $parseSerializedNodeImpl(internalSerializedNode, getActiveEditor()._nodes);
      }
      function $parseSerializedNodeImpl(serializedNode, registeredNodes) {
        const type = serializedNode.type;
        const registeredNode = registeredNodes.get(type);
        if (registeredNode === void 0) {
          {
            throw Error(`parseEditorState: type "${type}" + not found`);
          }
        }
        const nodeClass = registeredNode.klass;
        if (serializedNode.type !== nodeClass.getType()) {
          {
            throw Error(`LexicalNode: Node ${nodeClass.name} does not implement .importJSON().`);
          }
        }
        const node = nodeClass.importJSON(serializedNode);
        const children = serializedNode.children;
        if ($isElementNode(node) && Array.isArray(children)) {
          for (let i = 0; i < children.length; i++) {
            const serializedJSONChildNode = children[i];
            const childNode = $parseSerializedNodeImpl(serializedJSONChildNode, registeredNodes);
            node.append(childNode);
          }
        }
        return node;
      }
      function parseEditorState(serializedEditorState, editor, updateFn) {
        const editorState = createEmptyEditorState();
        const previousActiveEditorState = activeEditorState;
        const previousReadOnlyMode = isReadOnlyMode;
        const previousActiveEditor = activeEditor;
        const previousDirtyElements = editor._dirtyElements;
        const previousDirtyLeaves = editor._dirtyLeaves;
        const previousCloneNotNeeded = editor._cloneNotNeeded;
        const previousDirtyType = editor._dirtyType;
        editor._dirtyElements = /* @__PURE__ */ new Map();
        editor._dirtyLeaves = /* @__PURE__ */ new Set();
        editor._cloneNotNeeded = /* @__PURE__ */ new Set();
        editor._dirtyType = 0;
        activeEditorState = editorState;
        isReadOnlyMode = false;
        activeEditor = editor;
        try {
          const registeredNodes = editor._nodes;
          const serializedNode = serializedEditorState.root;
          $parseSerializedNodeImpl(serializedNode, registeredNodes);
          if (updateFn) {
            updateFn();
          }
          editorState._readOnly = true;
          {
            handleDEVOnlyPendingUpdateGuarantees(editorState);
          }
        } finally {
          editor._dirtyElements = previousDirtyElements;
          editor._dirtyLeaves = previousDirtyLeaves;
          editor._cloneNotNeeded = previousCloneNotNeeded;
          editor._dirtyType = previousDirtyType;
          activeEditorState = previousActiveEditorState;
          isReadOnlyMode = previousReadOnlyMode;
          activeEditor = previousActiveEditor;
        }
        return editorState;
      }
      function readEditorState(editorState, callbackFn) {
        const previousActiveEditorState = activeEditorState;
        const previousReadOnlyMode = isReadOnlyMode;
        const previousActiveEditor = activeEditor;
        activeEditorState = editorState;
        isReadOnlyMode = true;
        activeEditor = null;
        try {
          return callbackFn();
        } finally {
          activeEditorState = previousActiveEditorState;
          isReadOnlyMode = previousReadOnlyMode;
          activeEditor = previousActiveEditor;
        }
      }
      function handleDEVOnlyPendingUpdateGuarantees(pendingEditorState) {
        const nodeMap = pendingEditorState._nodeMap;
        nodeMap.set = () => {
          throw new Error("Cannot call set() on a frozen Lexical node map");
        };
        nodeMap.clear = () => {
          throw new Error("Cannot call clear() on a frozen Lexical node map");
        };
        nodeMap.delete = () => {
          throw new Error("Cannot call delete() on a frozen Lexical node map");
        };
      }
      function commitPendingUpdates(editor) {
        const pendingEditorState = editor._pendingEditorState;
        const rootElement = editor._rootElement;
        const headless = editor._headless;
        if (rootElement === null && !headless || pendingEditorState === null) {
          return;
        }
        const currentEditorState = editor._editorState;
        const currentSelection = currentEditorState._selection;
        const pendingSelection = pendingEditorState._selection;
        const needsUpdate = editor._dirtyType !== NO_DIRTY_NODES;
        const previousActiveEditorState = activeEditorState;
        const previousReadOnlyMode = isReadOnlyMode;
        const previousActiveEditor = activeEditor;
        const previouslyUpdating = editor._updating;
        const observer = editor._observer;
        let mutatedNodes2 = null;
        editor._pendingEditorState = null;
        editor._editorState = pendingEditorState;
        if (!headless && needsUpdate && observer !== null) {
          activeEditor = editor;
          activeEditorState = pendingEditorState;
          isReadOnlyMode = false;
          editor._updating = true;
          try {
            const dirtyType = editor._dirtyType;
            const dirtyElements2 = editor._dirtyElements;
            const dirtyLeaves2 = editor._dirtyLeaves;
            observer.disconnect();
            mutatedNodes2 = reconcileRoot(currentEditorState, pendingEditorState, editor, dirtyType, dirtyElements2, dirtyLeaves2);
          } catch (error) {
            if (error instanceof Error) {
              editor._onError(error);
            }
            if (!isAttemptingToRecoverFromReconcilerError) {
              resetEditor(editor, null, rootElement, pendingEditorState);
              initMutationObserver(editor);
              editor._dirtyType = FULL_RECONCILE;
              isAttemptingToRecoverFromReconcilerError = true;
              commitPendingUpdates(editor);
              isAttemptingToRecoverFromReconcilerError = false;
            } else {
              throw error;
            }
            return;
          } finally {
            observer.observe(rootElement, {
              characterData: true,
              childList: true,
              subtree: true
            });
            editor._updating = previouslyUpdating;
            activeEditorState = previousActiveEditorState;
            isReadOnlyMode = previousReadOnlyMode;
            activeEditor = previousActiveEditor;
          }
        }
        if (!pendingEditorState._readOnly) {
          pendingEditorState._readOnly = true;
          {
            handleDEVOnlyPendingUpdateGuarantees(pendingEditorState);
            if ($isRangeSelection(pendingSelection)) {
              Object.freeze(pendingSelection.anchor);
              Object.freeze(pendingSelection.focus);
            }
            Object.freeze(pendingSelection);
          }
        }
        const dirtyLeaves = editor._dirtyLeaves;
        const dirtyElements = editor._dirtyElements;
        const normalizedNodes = editor._normalizedNodes;
        const tags = editor._updateTags;
        const deferred = editor._deferred;
        if (needsUpdate) {
          editor._dirtyType = NO_DIRTY_NODES;
          editor._cloneNotNeeded.clear();
          editor._dirtyLeaves = /* @__PURE__ */ new Set();
          editor._dirtyElements = /* @__PURE__ */ new Map();
          editor._normalizedNodes = /* @__PURE__ */ new Set();
          editor._updateTags = /* @__PURE__ */ new Set();
        }
        $garbageCollectDetachedDecorators(editor, pendingEditorState);
        const domSelection = headless ? null : getDOMSelection();
        if (editor._editable && domSelection !== null && (needsUpdate || pendingSelection === null || pendingSelection.dirty)) {
          activeEditor = editor;
          activeEditorState = pendingEditorState;
          try {
            updateDOMSelection(currentSelection, pendingSelection, editor, domSelection, tags, rootElement);
          } finally {
            activeEditor = previousActiveEditor;
            activeEditorState = previousActiveEditorState;
          }
        }
        if (mutatedNodes2 !== null) {
          triggerMutationListeners(editor, currentEditorState, pendingEditorState, mutatedNodes2, tags, dirtyLeaves);
        }
        const pendingDecorators = editor._pendingDecorators;
        if (pendingDecorators !== null) {
          editor._decorators = pendingDecorators;
          editor._pendingDecorators = null;
          triggerListeners("decorator", editor, true, pendingDecorators);
        }
        triggerTextContentListeners(editor, currentEditorState, pendingEditorState);
        triggerListeners("update", editor, true, {
          dirtyElements,
          dirtyLeaves,
          editorState: pendingEditorState,
          normalizedNodes,
          prevEditorState: currentEditorState,
          tags
        });
        triggerDeferredUpdateCallbacks(editor, deferred);
        triggerEnqueuedUpdates(editor);
      }
      function triggerTextContentListeners(editor, currentEditorState, pendingEditorState) {
        const currentTextContent = getEditorStateTextContent(currentEditorState);
        const latestTextContent = getEditorStateTextContent(pendingEditorState);
        if (currentTextContent !== latestTextContent) {
          triggerListeners("textcontent", editor, true, latestTextContent);
        }
      }
      function triggerMutationListeners(editor, currentEditorState, pendingEditorState, mutatedNodes2, updateTags, dirtyLeaves) {
        const listeners = Array.from(editor._listeners.mutation);
        const listenersLength = listeners.length;
        for (let i = 0; i < listenersLength; i++) {
          const [listener, klass] = listeners[i];
          const mutatedNodesByType = mutatedNodes2.get(klass);
          if (mutatedNodesByType !== void 0) {
            listener(mutatedNodesByType, {
              dirtyLeaves,
              updateTags
            });
          }
        }
      }
      function triggerListeners(type, editor, isCurrentlyEnqueuingUpdates, ...payload) {
        const previouslyUpdating = editor._updating;
        editor._updating = isCurrentlyEnqueuingUpdates;
        try {
          const listeners = Array.from(editor._listeners[type]);
          for (let i = 0; i < listeners.length; i++) {
            listeners[i].apply(null, payload);
          }
        } finally {
          editor._updating = previouslyUpdating;
        }
      }
      function triggerCommandListeners(editor, type, payload) {
        if (editor._updating === false || activeEditor !== editor) {
          let returnVal = false;
          editor.update(() => {
            returnVal = triggerCommandListeners(editor, type, payload);
          });
          return returnVal;
        }
        const editors = getEditorsToPropagate(editor);
        for (let i = 4; i >= 0; i--) {
          for (let e = 0; e < editors.length; e++) {
            const currentEditor = editors[e];
            const commandListeners = currentEditor._commands;
            const listenerInPriorityOrder = commandListeners.get(type);
            if (listenerInPriorityOrder !== void 0) {
              const listenersSet = listenerInPriorityOrder[i];
              if (listenersSet !== void 0) {
                const listeners = Array.from(listenersSet);
                const listenersLength = listeners.length;
                for (let j = 0; j < listenersLength; j++) {
                  if (listeners[j](payload, editor) === true) {
                    return true;
                  }
                }
              }
            }
          }
        }
        return false;
      }
      function triggerEnqueuedUpdates(editor) {
        const queuedUpdates = editor._updates;
        if (queuedUpdates.length !== 0) {
          const queuedUpdate = queuedUpdates.shift();
          if (queuedUpdate) {
            const [updateFn, options] = queuedUpdate;
            beginUpdate(editor, updateFn, options);
          }
        }
      }
      function triggerDeferredUpdateCallbacks(editor, deferred) {
        editor._deferred = [];
        if (deferred.length !== 0) {
          const previouslyUpdating = editor._updating;
          editor._updating = true;
          try {
            for (let i = 0; i < deferred.length; i++) {
              deferred[i]();
            }
          } finally {
            editor._updating = previouslyUpdating;
          }
        }
      }
      function processNestedUpdates(editor, initialSkipTransforms) {
        const queuedUpdates = editor._updates;
        let skipTransforms = initialSkipTransforms || false;
        while (queuedUpdates.length !== 0) {
          const queuedUpdate = queuedUpdates.shift();
          if (queuedUpdate) {
            const [nextUpdateFn, options] = queuedUpdate;
            let onUpdate;
            let tag;
            if (options !== void 0) {
              onUpdate = options.onUpdate;
              tag = options.tag;
              if (options.skipTransforms) {
                skipTransforms = true;
              }
              if (onUpdate) {
                editor._deferred.push(onUpdate);
              }
              if (tag) {
                editor._updateTags.add(tag);
              }
            }
            nextUpdateFn();
          }
        }
        return skipTransforms;
      }
      function beginUpdate(editor, updateFn, options) {
        const updateTags = editor._updateTags;
        let onUpdate;
        let tag;
        let skipTransforms = false;
        if (options !== void 0) {
          onUpdate = options.onUpdate;
          tag = options.tag;
          if (tag != null) {
            updateTags.add(tag);
          }
          skipTransforms = options.skipTransforms || false;
        }
        if (onUpdate) {
          editor._deferred.push(onUpdate);
        }
        const currentEditorState = editor._editorState;
        let pendingEditorState = editor._pendingEditorState;
        let editorStateWasCloned = false;
        if (pendingEditorState === null || pendingEditorState._readOnly) {
          pendingEditorState = editor._pendingEditorState = cloneEditorState(currentEditorState);
          editorStateWasCloned = true;
        }
        const previousActiveEditorState = activeEditorState;
        const previousReadOnlyMode = isReadOnlyMode;
        const previousActiveEditor = activeEditor;
        const previouslyUpdating = editor._updating;
        activeEditorState = pendingEditorState;
        isReadOnlyMode = false;
        editor._updating = true;
        activeEditor = editor;
        try {
          if (editorStateWasCloned && !editor._headless) {
            pendingEditorState._selection = internalCreateSelection(editor);
          }
          const startingCompositionKey = editor._compositionKey;
          updateFn();
          skipTransforms = processNestedUpdates(editor, skipTransforms);
          applySelectionTransforms(pendingEditorState, editor);
          if (editor._dirtyType !== NO_DIRTY_NODES) {
            if (skipTransforms) {
              $normalizeAllDirtyTextNodes(pendingEditorState, editor);
            } else {
              $applyAllTransforms(pendingEditorState, editor);
            }
            processNestedUpdates(editor);
            $garbageCollectDetachedNodes(currentEditorState, pendingEditorState, editor._dirtyLeaves, editor._dirtyElements);
          }
          const endingCompositionKey = editor._compositionKey;
          if (startingCompositionKey !== endingCompositionKey) {
            pendingEditorState._flushSync = true;
          }
          const pendingSelection = pendingEditorState._selection;
          if ($isRangeSelection(pendingSelection)) {
            const pendingNodeMap = pendingEditorState._nodeMap;
            const anchorKey = pendingSelection.anchor.key;
            const focusKey = pendingSelection.focus.key;
            if (pendingNodeMap.get(anchorKey) === void 0 || pendingNodeMap.get(focusKey) === void 0) {
              {
                throw Error(`updateEditor: selection has been lost because the previously selected nodes have been removed and selection wasn't moved to another node. Ensure selection changes after removing/replacing a selected node.`);
              }
            }
          } else if ($isNodeSelection(pendingSelection)) {
            if (pendingSelection._nodes.size === 0) {
              pendingEditorState._selection = null;
            }
          }
        } catch (error) {
          if (error instanceof Error) {
            editor._onError(error);
          }
          editor._pendingEditorState = currentEditorState;
          editor._dirtyType = FULL_RECONCILE;
          editor._cloneNotNeeded.clear();
          editor._dirtyLeaves = /* @__PURE__ */ new Set();
          editor._dirtyElements.clear();
          commitPendingUpdates(editor);
          return;
        } finally {
          activeEditorState = previousActiveEditorState;
          isReadOnlyMode = previousReadOnlyMode;
          activeEditor = previousActiveEditor;
          editor._updating = previouslyUpdating;
          infiniteTransformCount = 0;
        }
        const shouldUpdate = editor._dirtyType !== NO_DIRTY_NODES || editorStateHasDirtySelection(pendingEditorState, editor);
        if (shouldUpdate) {
          if (pendingEditorState._flushSync) {
            pendingEditorState._flushSync = false;
            commitPendingUpdates(editor);
          } else if (editorStateWasCloned) {
            scheduleMicroTask(() => {
              commitPendingUpdates(editor);
            });
          }
        } else {
          pendingEditorState._flushSync = false;
          if (editorStateWasCloned) {
            updateTags.clear();
            editor._deferred = [];
            editor._pendingEditorState = null;
          }
        }
      }
      function updateEditor(editor, updateFn, options) {
        if (editor._updating) {
          editor._updates.push([updateFn, options]);
        } else {
          beginUpdate(editor, updateFn, options);
        }
      }
      function internalGetActiveEditor() {
        return activeEditor;
      }
      function removeNode(nodeToRemove, restoreSelection, preserveEmptyParent) {
        errorOnReadOnly();
        const key = nodeToRemove.__key;
        const parent = nodeToRemove.getParent();
        if (parent === null) {
          return;
        }
        const selection = $maybeMoveChildrenSelectionToParent(nodeToRemove);
        let selectionMoved = false;
        if ($isRangeSelection(selection) && restoreSelection) {
          const anchor = selection.anchor;
          const focus = selection.focus;
          if (anchor.key === key) {
            moveSelectionPointToSibling(anchor, nodeToRemove, parent, nodeToRemove.getPreviousSibling(), nodeToRemove.getNextSibling());
            selectionMoved = true;
          }
          if (focus.key === key) {
            moveSelectionPointToSibling(focus, nodeToRemove, parent, nodeToRemove.getPreviousSibling(), nodeToRemove.getNextSibling());
            selectionMoved = true;
          }
        }
        const writableParent = parent.getWritable();
        const parentChildren = writableParent.__children;
        const index = parentChildren.indexOf(key);
        if (index === -1) {
          {
            throw Error(`Node is not a child of its parent`);
          }
        }
        internalMarkSiblingsAsDirty(nodeToRemove);
        parentChildren.splice(index, 1);
        const writableNodeToRemove = nodeToRemove.getWritable();
        writableNodeToRemove.__parent = null;
        if ($isRangeSelection(selection) && restoreSelection && !selectionMoved) {
          $updateElementSelectionOnCreateDeleteNode(selection, parent, index, -1);
        }
        if (!preserveEmptyParent && !$isRootOrShadowRoot(parent) && !parent.canBeEmpty() && parent.isEmpty()) {
          removeNode(parent, restoreSelection);
        }
        if ($isRootNode(parent) && parent.isEmpty()) {
          parent.selectEnd();
        }
      }
      function $getNodeByKeyOrThrow(key) {
        const node = $getNodeByKey(key);
        if (node === null) {
          {
            throw Error(`Expected node with key ${key} to exist but it's not in the nodeMap.`);
          }
        }
        return node;
      }
      var LexicalNode = class {
        static getType() {
          {
            throw Error(`LexicalNode: Node ${this.name} does not implement .getType().`);
          }
        }
        static clone(_data) {
          {
            throw Error(`LexicalNode: Node ${this.name} does not implement .clone().`);
          }
        }
        constructor(key) {
          this.__type = this.constructor.getType();
          this.__parent = null;
          $setNodeKey(this, key);
          {
            if (this.__type !== "root") {
              errorOnReadOnly();
              errorOnTypeKlassMismatch(
                this.__type,
                this.constructor
              );
            }
          }
        }
        getType() {
          return this.__type;
        }
        isAttached() {
          let nodeKey = this.__key;
          while (nodeKey !== null) {
            if (nodeKey === "root") {
              return true;
            }
            const node = $getNodeByKey(nodeKey);
            if (node === null) {
              break;
            }
            nodeKey = node.__parent;
          }
          return false;
        }
        isSelected() {
          const selection = $getSelection();
          if (selection == null) {
            return false;
          }
          const isSelected = selection.getNodes().some((n) => n.__key === this.__key);
          if ($isTextNode(this)) {
            return isSelected;
          }
          if ($isRangeSelection(selection) && selection.anchor.type === "element" && selection.focus.type === "element" && selection.anchor.key === selection.focus.key && selection.anchor.offset === selection.focus.offset) {
            return false;
          }
          return isSelected;
        }
        getKey() {
          return this.__key;
        }
        getIndexWithinParent() {
          const parent = this.getParent();
          if (parent === null) {
            return -1;
          }
          const children = parent.__children;
          return children.indexOf(this.__key);
        }
        getParent() {
          const parent = this.getLatest().__parent;
          if (parent === null) {
            return null;
          }
          return $getNodeByKey(parent);
        }
        getParentOrThrow() {
          const parent = this.getParent();
          if (parent === null) {
            {
              throw Error(`Expected node ${this.__key} to have a parent.`);
            }
          }
          return parent;
        }
        getTopLevelElement() {
          let node = this;
          while (node !== null) {
            const parent = node.getParent();
            if ($isRootOrShadowRoot(parent)) {
              return node;
            }
            node = parent;
          }
          return null;
        }
        getTopLevelElementOrThrow() {
          const parent = this.getTopLevelElement();
          if (parent === null) {
            {
              throw Error(`Expected node ${this.__key} to have a top parent element.`);
            }
          }
          return parent;
        }
        getParents() {
          const parents = [];
          let node = this.getParent();
          while (node !== null) {
            parents.push(node);
            node = node.getParent();
          }
          return parents;
        }
        getParentKeys() {
          const parents = [];
          let node = this.getParent();
          while (node !== null) {
            parents.push(node.__key);
            node = node.getParent();
          }
          return parents;
        }
        getPreviousSibling() {
          const parent = this.getParent();
          if (parent === null) {
            return null;
          }
          const children = parent.__children;
          const index = children.indexOf(this.__key);
          if (index <= 0) {
            return null;
          }
          return $getNodeByKey(children[index - 1]);
        }
        getPreviousSiblings() {
          const parent = this.getParent();
          if (parent === null) {
            return [];
          }
          const children = parent.__children;
          const index = children.indexOf(this.__key);
          return children.slice(0, index).map((childKey) => $getNodeByKeyOrThrow(childKey));
        }
        getNextSibling() {
          const parent = this.getParent();
          if (parent === null) {
            return null;
          }
          const children = parent.__children;
          const childrenLength = children.length;
          const index = children.indexOf(this.__key);
          if (index >= childrenLength - 1) {
            return null;
          }
          return $getNodeByKey(children[index + 1]);
        }
        getNextSiblings() {
          const parent = this.getParent();
          if (parent === null) {
            return [];
          }
          const children = parent.__children;
          const index = children.indexOf(this.__key);
          return children.slice(index + 1).map((childKey) => $getNodeByKeyOrThrow(childKey));
        }
        getCommonAncestor(node) {
          const a = this.getParents();
          const b = node.getParents();
          if ($isElementNode(this)) {
            a.unshift(this);
          }
          if ($isElementNode(node)) {
            b.unshift(node);
          }
          const aLength = a.length;
          const bLength = b.length;
          if (aLength === 0 || bLength === 0 || a[aLength - 1] !== b[bLength - 1]) {
            return null;
          }
          const bSet = new Set(b);
          for (let i = 0; i < aLength; i++) {
            const ancestor = a[i];
            if (bSet.has(ancestor)) {
              return ancestor;
            }
          }
          return null;
        }
        is(object) {
          if (object == null) {
            return false;
          }
          return this.__key === object.__key;
        }
        isBefore(targetNode) {
          if (targetNode.isParentOf(this)) {
            return true;
          }
          if (this.isParentOf(targetNode)) {
            return false;
          }
          const commonAncestor = this.getCommonAncestor(targetNode);
          let indexA = 0;
          let indexB = 0;
          let node = this;
          while (true) {
            const parent = node.getParentOrThrow();
            if (parent === commonAncestor) {
              indexA = parent.__children.indexOf(node.__key);
              break;
            }
            node = parent;
          }
          node = targetNode;
          while (true) {
            const parent = node.getParentOrThrow();
            if (parent === commonAncestor) {
              indexB = parent.__children.indexOf(node.__key);
              break;
            }
            node = parent;
          }
          return indexA < indexB;
        }
        isParentOf(targetNode) {
          const key = this.__key;
          if (key === targetNode.__key) {
            return false;
          }
          let node = targetNode;
          while (node !== null) {
            if (node.__key === key) {
              return true;
            }
            node = node.getParent();
          }
          return false;
        }
        getNodesBetween(targetNode) {
          const isBefore = this.isBefore(targetNode);
          const nodes = [];
          const visited = /* @__PURE__ */ new Set();
          let node = this;
          while (true) {
            const key = node.__key;
            if (!visited.has(key)) {
              visited.add(key);
              nodes.push(node);
            }
            if (node === targetNode) {
              break;
            }
            const child = $isElementNode(node) ? isBefore ? node.getFirstChild() : node.getLastChild() : null;
            if (child !== null) {
              node = child;
              continue;
            }
            const nextSibling = isBefore ? node.getNextSibling() : node.getPreviousSibling();
            if (nextSibling !== null) {
              node = nextSibling;
              continue;
            }
            const parent = node.getParentOrThrow();
            if (!visited.has(parent.__key)) {
              nodes.push(parent);
            }
            if (parent === targetNode) {
              break;
            }
            let parentSibling = null;
            let ancestor = parent;
            do {
              if (ancestor === null) {
                {
                  throw Error(`getNodesBetween: ancestor is null`);
                }
              }
              parentSibling = isBefore ? ancestor.getNextSibling() : ancestor.getPreviousSibling();
              ancestor = ancestor.getParent();
              if (ancestor !== null) {
                if (parentSibling === null && !visited.has(ancestor.__key)) {
                  nodes.push(ancestor);
                }
              }
            } while (parentSibling === null);
            node = parentSibling;
          }
          if (!isBefore) {
            nodes.reverse();
          }
          return nodes;
        }
        isDirty() {
          const editor = getActiveEditor();
          const dirtyLeaves = editor._dirtyLeaves;
          return dirtyLeaves !== null && dirtyLeaves.has(this.__key);
        }
        getLatest() {
          const latest = $getNodeByKey(this.__key);
          if (latest === null) {
            {
              throw Error(`Lexical node does not exist in active editor state. Avoid using the same node references between nested closures from editor.read/editor.update.`);
            }
          }
          return latest;
        }
        getWritable() {
          errorOnReadOnly();
          const editorState = getActiveEditorState();
          const editor = getActiveEditor();
          const nodeMap = editorState._nodeMap;
          const key = this.__key;
          const latestNode = this.getLatest();
          const parent = latestNode.__parent;
          const cloneNotNeeded = editor._cloneNotNeeded;
          const selection = $getSelection();
          if (selection !== null) {
            selection._cachedNodes = null;
          }
          if (cloneNotNeeded.has(key)) {
            internalMarkNodeAsDirty(latestNode);
            return latestNode;
          }
          const constructor = latestNode.constructor;
          const mutableNode = constructor.clone(latestNode);
          mutableNode.__parent = parent;
          if ($isElementNode(latestNode) && $isElementNode(mutableNode)) {
            mutableNode.__children = Array.from(latestNode.__children);
            mutableNode.__indent = latestNode.__indent;
            mutableNode.__format = latestNode.__format;
            mutableNode.__dir = latestNode.__dir;
          } else if ($isTextNode(latestNode) && $isTextNode(mutableNode)) {
            mutableNode.__format = latestNode.__format;
            mutableNode.__style = latestNode.__style;
            mutableNode.__mode = latestNode.__mode;
            mutableNode.__detail = latestNode.__detail;
          }
          cloneNotNeeded.add(key);
          mutableNode.__key = key;
          internalMarkNodeAsDirty(mutableNode);
          nodeMap.set(key, mutableNode);
          return mutableNode;
        }
        getTextContent() {
          return "";
        }
        getTextContentSize() {
          return this.getTextContent().length;
        }
        createDOM(_config, _editor) {
          {
            throw Error(`createDOM: base method not extended`);
          }
        }
        updateDOM(_prevNode, _dom, _config) {
          {
            throw Error(`updateDOM: base method not extended`);
          }
        }
        exportDOM(editor) {
          const element = this.createDOM(editor._config, editor);
          return {
            element
          };
        }
        exportJSON() {
          {
            throw Error(`exportJSON: base method not extended`);
          }
        }
        static importJSON(_serializedNode) {
          {
            throw Error(`LexicalNode: Node ${this.name} does not implement .importJSON().`);
          }
        }
        remove(preserveEmptyParent) {
          removeNode(this, true, preserveEmptyParent);
        }
        replace(replaceWith) {
          errorOnReadOnly();
          const toReplaceKey = this.__key;
          const writableReplaceWith = replaceWith.getWritable();
          removeFromParent(writableReplaceWith);
          const newParent = this.getParentOrThrow();
          const writableParent = newParent.getWritable();
          const children = writableParent.__children;
          const index = children.indexOf(this.__key);
          const newKey = writableReplaceWith.__key;
          if (index === -1) {
            {
              throw Error(`Node is not a child of its parent`);
            }
          }
          children.splice(index, 0, newKey);
          writableReplaceWith.__parent = newParent.__key;
          removeNode(this, false);
          internalMarkSiblingsAsDirty(writableReplaceWith);
          const selection = $getSelection();
          if ($isRangeSelection(selection)) {
            const anchor = selection.anchor;
            const focus = selection.focus;
            if (anchor.key === toReplaceKey) {
              $moveSelectionPointToEnd(anchor, writableReplaceWith);
            }
            if (focus.key === toReplaceKey) {
              $moveSelectionPointToEnd(focus, writableReplaceWith);
            }
          }
          if ($getCompositionKey() === toReplaceKey) {
            $setCompositionKey(newKey);
          }
          return writableReplaceWith;
        }
        insertAfter(nodeToInsert) {
          errorOnReadOnly();
          const writableSelf = this.getWritable();
          const writableNodeToInsert = nodeToInsert.getWritable();
          const oldParent = writableNodeToInsert.getParent();
          const selection = $getSelection();
          const oldIndex = nodeToInsert.getIndexWithinParent();
          let elementAnchorSelectionOnNode = false;
          let elementFocusSelectionOnNode = false;
          if (oldParent !== null) {
            removeFromParent(writableNodeToInsert);
            if ($isRangeSelection(selection)) {
              const oldParentKey = oldParent.__key;
              const anchor = selection.anchor;
              const focus = selection.focus;
              elementAnchorSelectionOnNode = anchor.type === "element" && anchor.key === oldParentKey && anchor.offset === oldIndex + 1;
              elementFocusSelectionOnNode = focus.type === "element" && focus.key === oldParentKey && focus.offset === oldIndex + 1;
            }
          }
          const writableParent = this.getParentOrThrow().getWritable();
          const insertKey = writableNodeToInsert.__key;
          writableNodeToInsert.__parent = writableSelf.__parent;
          const children = writableParent.__children;
          const index = children.indexOf(writableSelf.__key);
          if (index === -1) {
            {
              throw Error(`Node is not a child of its parent`);
            }
          }
          children.splice(index + 1, 0, insertKey);
          internalMarkSiblingsAsDirty(writableNodeToInsert);
          if ($isRangeSelection(selection)) {
            $updateElementSelectionOnCreateDeleteNode(selection, writableParent, index + 1);
            const writableParentKey = writableParent.__key;
            if (elementAnchorSelectionOnNode) {
              selection.anchor.set(writableParentKey, index + 2, "element");
            }
            if (elementFocusSelectionOnNode) {
              selection.focus.set(writableParentKey, index + 2, "element");
            }
          }
          return nodeToInsert;
        }
        insertBefore(nodeToInsert) {
          const writableSelf = this.getWritable();
          const writableNodeToInsert = nodeToInsert.getWritable();
          removeFromParent(writableNodeToInsert);
          const writableParent = this.getParentOrThrow().getWritable();
          const insertKey = writableNodeToInsert.__key;
          writableNodeToInsert.__parent = writableSelf.__parent;
          const children = writableParent.__children;
          const index = children.indexOf(writableSelf.__key);
          if (index === -1) {
            {
              throw Error(`Node is not a child of its parent`);
            }
          }
          children.splice(index, 0, insertKey);
          internalMarkSiblingsAsDirty(writableNodeToInsert);
          const selection = $getSelection();
          if ($isRangeSelection(selection)) {
            $updateElementSelectionOnCreateDeleteNode(selection, writableParent, index);
          }
          return nodeToInsert;
        }
        selectPrevious(anchorOffset, focusOffset) {
          errorOnReadOnly();
          const prevSibling = this.getPreviousSibling();
          const parent = this.getParentOrThrow();
          if (prevSibling === null) {
            return parent.select(0, 0);
          }
          if ($isElementNode(prevSibling)) {
            return prevSibling.select();
          } else if (!$isTextNode(prevSibling)) {
            const index = prevSibling.getIndexWithinParent() + 1;
            return parent.select(index, index);
          }
          return prevSibling.select(anchorOffset, focusOffset);
        }
        selectNext(anchorOffset, focusOffset) {
          errorOnReadOnly();
          const nextSibling = this.getNextSibling();
          const parent = this.getParentOrThrow();
          if (nextSibling === null) {
            return parent.select();
          }
          if ($isElementNode(nextSibling)) {
            return nextSibling.select(0, 0);
          } else if (!$isTextNode(nextSibling)) {
            const index = nextSibling.getIndexWithinParent();
            return parent.select(index, index);
          }
          return nextSibling.select(anchorOffset, focusOffset);
        }
        markDirty() {
          this.getWritable();
        }
      };
      function errorOnTypeKlassMismatch(type, klass) {
        const registeredNode = getActiveEditor()._nodes.get(type);
        if (registeredNode === void 0) {
          {
            throw Error(`Create node: Attempted to create node ${klass.name} that was not configured to be used on the editor.`);
          }
        }
        const editorKlass = registeredNode.klass;
        if (editorKlass !== klass) {
          {
            throw Error(`Create node: Type ${type} in node ${klass.name} does not match registered node ${editorKlass.name} with the same type`);
          }
        }
      }
      var DecoratorNode = class extends LexicalNode {
        constructor(key) {
          super(key);
        }
        decorate(editor, config) {
          {
            throw Error(`decorate: base method not extended`);
          }
        }
        isIsolated() {
          return false;
        }
        isInline() {
          return true;
        }
      };
      function $isDecoratorNode(node) {
        return node instanceof DecoratorNode;
      }
      var ElementNode = class extends LexicalNode {
        constructor(key) {
          super(key);
          this.__children = [];
          this.__format = 0;
          this.__indent = 0;
          this.__dir = null;
        }
        getFormat() {
          const self2 = this.getLatest();
          return self2.__format;
        }
        getFormatType() {
          const format = this.getFormat();
          return ELEMENT_FORMAT_TO_TYPE[format] || "";
        }
        getIndent() {
          const self2 = this.getLatest();
          return self2.__indent;
        }
        getChildren() {
          const self2 = this.getLatest();
          const children = self2.__children;
          const childrenNodes = [];
          for (let i = 0; i < children.length; i++) {
            const childNode = $getNodeByKey(children[i]);
            if (childNode !== null) {
              childrenNodes.push(childNode);
            }
          }
          return childrenNodes;
        }
        getChildrenKeys() {
          return this.getLatest().__children;
        }
        getChildrenSize() {
          const self2 = this.getLatest();
          return self2.__children.length;
        }
        isEmpty() {
          return this.getChildrenSize() === 0;
        }
        isDirty() {
          const editor = getActiveEditor();
          const dirtyElements = editor._dirtyElements;
          return dirtyElements !== null && dirtyElements.has(this.__key);
        }
        isLastChild() {
          const self2 = this.getLatest();
          const parent = self2.getParentOrThrow();
          return parent.getLastChild() === self2;
        }
        getAllTextNodes() {
          const textNodes = [];
          const self2 = this.getLatest();
          const children = self2.__children;
          for (let i = 0; i < children.length; i++) {
            const childNode = $getNodeByKey(children[i]);
            if ($isTextNode(childNode)) {
              textNodes.push(childNode);
            } else if ($isElementNode(childNode)) {
              const subChildrenNodes = childNode.getAllTextNodes();
              textNodes.push(...subChildrenNodes);
            }
          }
          return textNodes;
        }
        getFirstDescendant() {
          let node = this.getFirstChild();
          while (node !== null) {
            if ($isElementNode(node)) {
              const child = node.getFirstChild();
              if (child !== null) {
                node = child;
                continue;
              }
            }
            break;
          }
          return node;
        }
        getLastDescendant() {
          let node = this.getLastChild();
          while (node !== null) {
            if ($isElementNode(node)) {
              const child = node.getLastChild();
              if (child !== null) {
                node = child;
                continue;
              }
            }
            break;
          }
          return node;
        }
        getDescendantByIndex(index) {
          const children = this.getChildren();
          const childrenLength = children.length;
          if (index >= childrenLength) {
            const resolvedNode2 = children[childrenLength - 1];
            return $isElementNode(resolvedNode2) && resolvedNode2.getLastDescendant() || resolvedNode2 || null;
          }
          const resolvedNode = children[index];
          return $isElementNode(resolvedNode) && resolvedNode.getFirstDescendant() || resolvedNode || null;
        }
        getFirstChild() {
          const self2 = this.getLatest();
          const children = self2.__children;
          const childrenLength = children.length;
          if (childrenLength === 0) {
            return null;
          }
          return $getNodeByKey(children[0]);
        }
        getFirstChildOrThrow() {
          const firstChild = this.getFirstChild();
          if (firstChild === null) {
            {
              throw Error(`Expected node ${this.__key} to have a first child.`);
            }
          }
          return firstChild;
        }
        getLastChild() {
          const self2 = this.getLatest();
          const children = self2.__children;
          const childrenLength = children.length;
          if (childrenLength === 0) {
            return null;
          }
          return $getNodeByKey(children[childrenLength - 1]);
        }
        getLastChildOrThrow() {
          const lastChild = this.getLastChild();
          if (lastChild === null) {
            {
              throw Error(`Expected node ${this.__key} to have a last child.`);
            }
          }
          return lastChild;
        }
        getChildAtIndex(index) {
          const self2 = this.getLatest();
          const children = self2.__children;
          const key = children[index];
          if (key === void 0) {
            return null;
          }
          return $getNodeByKey(key);
        }
        getTextContent() {
          let textContent = "";
          const children = this.getChildren();
          const childrenLength = children.length;
          for (let i = 0; i < childrenLength; i++) {
            const child = children[i];
            textContent += child.getTextContent();
            if ($isElementNode(child) && i !== childrenLength - 1 && !child.isInline()) {
              textContent += DOUBLE_LINE_BREAK;
            }
          }
          return textContent;
        }
        getDirection() {
          const self2 = this.getLatest();
          return self2.__dir;
        }
        hasFormat(type) {
          if (type !== "") {
            const formatFlag = ELEMENT_TYPE_TO_FORMAT[type];
            return (this.getFormat() & formatFlag) !== 0;
          }
          return false;
        }
        select(_anchorOffset, _focusOffset) {
          errorOnReadOnly();
          const selection = $getSelection();
          let anchorOffset = _anchorOffset;
          let focusOffset = _focusOffset;
          const childrenCount = this.getChildrenSize();
          if (anchorOffset === void 0) {
            anchorOffset = childrenCount;
          }
          if (focusOffset === void 0) {
            focusOffset = childrenCount;
          }
          const key = this.__key;
          if (!$isRangeSelection(selection)) {
            return internalMakeRangeSelection(key, anchorOffset, key, focusOffset, "element", "element");
          } else {
            selection.anchor.set(key, anchorOffset, "element");
            selection.focus.set(key, focusOffset, "element");
            selection.dirty = true;
          }
          return selection;
        }
        selectStart() {
          const firstNode = this.getFirstDescendant();
          if ($isElementNode(firstNode) || $isTextNode(firstNode)) {
            return firstNode.select(0, 0);
          }
          if (firstNode !== null) {
            return firstNode.selectPrevious();
          }
          return this.select(0, 0);
        }
        selectEnd() {
          const lastNode = this.getLastDescendant();
          if ($isElementNode(lastNode) || $isTextNode(lastNode)) {
            return lastNode.select();
          }
          if (lastNode !== null) {
            return lastNode.selectNext();
          }
          return this.select();
        }
        clear() {
          const writableSelf = this.getWritable();
          const children = this.getChildren();
          children.forEach((child) => child.remove());
          return writableSelf;
        }
        append(...nodesToAppend) {
          return this.splice(this.getChildrenSize(), 0, nodesToAppend);
        }
        setDirection(direction) {
          const self2 = this.getWritable();
          self2.__dir = direction;
          return self2;
        }
        setFormat(type) {
          const self2 = this.getWritable();
          self2.__format = type !== "" ? ELEMENT_TYPE_TO_FORMAT[type] : 0;
          return this;
        }
        setIndent(indentLevel) {
          const self2 = this.getWritable();
          self2.__indent = indentLevel;
          return this;
        }
        splice(start, deleteCount, nodesToInsert) {
          const writableSelf = this.getWritable();
          const writableSelfKey = writableSelf.__key;
          const writableSelfChildren = writableSelf.__children;
          const nodesToInsertLength = nodesToInsert.length;
          const nodesToInsertKeys = [];
          for (let i = 0; i < nodesToInsertLength; i++) {
            const nodeToInsert = nodesToInsert[i];
            const writableNodeToInsert = nodeToInsert.getWritable();
            if (nodeToInsert.__key === writableSelfKey) {
              {
                throw Error(`append: attempting to append self`);
              }
            }
            removeFromParent(writableNodeToInsert);
            writableNodeToInsert.__parent = writableSelfKey;
            const newKey = writableNodeToInsert.__key;
            nodesToInsertKeys.push(newKey);
          }
          const nodeBeforeRange = this.getChildAtIndex(start - 1);
          if (nodeBeforeRange) {
            internalMarkNodeAsDirty(nodeBeforeRange);
          }
          const nodeAfterRange = this.getChildAtIndex(start + deleteCount);
          if (nodeAfterRange) {
            internalMarkNodeAsDirty(nodeAfterRange);
          }
          let nodesToRemoveKeys;
          if (start === writableSelfChildren.length) {
            writableSelfChildren.push(...nodesToInsertKeys);
            nodesToRemoveKeys = [];
          } else {
            nodesToRemoveKeys = writableSelfChildren.splice(start, deleteCount, ...nodesToInsertKeys);
          }
          if (nodesToRemoveKeys.length) {
            const selection = $getSelection();
            if ($isRangeSelection(selection)) {
              const nodesToRemoveKeySet = new Set(nodesToRemoveKeys);
              const nodesToInsertKeySet = new Set(nodesToInsertKeys);
              const isPointRemoved = (point) => {
                let node = point.getNode();
                while (node) {
                  const nodeKey = node.__key;
                  if (nodesToRemoveKeySet.has(nodeKey) && !nodesToInsertKeySet.has(nodeKey)) {
                    return true;
                  }
                  node = node.getParent();
                }
                return false;
              };
              const {
                anchor,
                focus
              } = selection;
              if (isPointRemoved(anchor)) {
                moveSelectionPointToSibling(anchor, anchor.getNode(), this, nodeBeforeRange, nodeAfterRange);
              }
              if (isPointRemoved(focus)) {
                moveSelectionPointToSibling(focus, focus.getNode(), this, nodeBeforeRange, nodeAfterRange);
              }
              const nodesToRemoveKeysLength = nodesToRemoveKeys.length;
              for (let i = 0; i < nodesToRemoveKeysLength; i++) {
                const nodeToRemove = $getNodeByKey(nodesToRemoveKeys[i]);
                if (nodeToRemove != null) {
                  const writableNodeToRemove = nodeToRemove.getWritable();
                  writableNodeToRemove.__parent = null;
                }
              }
              if (writableSelfChildren.length === 0 && !this.canBeEmpty() && !$isRootOrShadowRoot(this)) {
                this.remove();
              }
            }
          }
          return writableSelf;
        }
        exportJSON() {
          return {
            children: [],
            direction: this.getDirection(),
            format: this.getFormatType(),
            indent: this.getIndent(),
            type: "element",
            version: 1
          };
        }
        insertNewAfter(selection) {
          return null;
        }
        canInsertTab() {
          return false;
        }
        canIndent() {
          return true;
        }
        collapseAtStart(selection) {
          return false;
        }
        excludeFromCopy(destination) {
          return false;
        }
        canExtractContents() {
          return true;
        }
        canReplaceWith(replacement) {
          return true;
        }
        canInsertAfter(node) {
          return true;
        }
        canBeEmpty() {
          return true;
        }
        canInsertTextBefore() {
          return true;
        }
        canInsertTextAfter() {
          return true;
        }
        isInline() {
          return false;
        }
        isShadowRoot() {
          return false;
        }
        canMergeWith(node) {
          return false;
        }
        extractWithChild(child, selection, destination) {
          return false;
        }
      };
      function $isElementNode(node) {
        return node instanceof ElementNode;
      }
      var RootNode = class extends ElementNode {
        static getType() {
          return "root";
        }
        static clone() {
          return new RootNode();
        }
        constructor() {
          super("root");
          this.__cachedText = null;
        }
        getTopLevelElementOrThrow() {
          {
            throw Error(`getTopLevelElementOrThrow: root nodes are not top level elements`);
          }
        }
        getTextContent() {
          const cachedText = this.__cachedText;
          if (isCurrentlyReadOnlyMode() || getActiveEditor()._dirtyType === NO_DIRTY_NODES) {
            if (cachedText !== null) {
              return cachedText;
            }
          }
          return super.getTextContent();
        }
        remove() {
          {
            throw Error(`remove: cannot be called on root nodes`);
          }
        }
        replace(node) {
          {
            throw Error(`replace: cannot be called on root nodes`);
          }
        }
        insertBefore(nodeToInsert) {
          {
            throw Error(`insertBefore: cannot be called on root nodes`);
          }
        }
        insertAfter(nodeToInsert) {
          {
            throw Error(`insertAfter: cannot be called on root nodes`);
          }
        }
        updateDOM(prevNode, dom) {
          return false;
        }
        append(...nodesToAppend) {
          for (let i = 0; i < nodesToAppend.length; i++) {
            const node = nodesToAppend[i];
            if (!$isElementNode(node) && !$isDecoratorNode(node)) {
              {
                throw Error(`rootNode.append: Only element or decorator nodes can be appended to the root node`);
              }
            }
          }
          return super.append(...nodesToAppend);
        }
        static importJSON(serializedNode) {
          const node = $getRoot();
          node.setFormat(serializedNode.format);
          node.setIndent(serializedNode.indent);
          node.setDirection(serializedNode.direction);
          return node;
        }
        exportJSON() {
          return {
            children: [],
            direction: this.getDirection(),
            format: this.getFormatType(),
            indent: this.getIndent(),
            type: "root",
            version: 1
          };
        }
      };
      function $createRootNode() {
        return new RootNode();
      }
      function $isRootNode(node) {
        return node instanceof RootNode;
      }
      function editorStateHasDirtySelection(editorState, editor) {
        const currentSelection = editor.getEditorState()._selection;
        const pendingSelection = editorState._selection;
        if (pendingSelection !== null) {
          if (pendingSelection.dirty || !pendingSelection.is(currentSelection)) {
            return true;
          }
        } else if (currentSelection !== null) {
          return true;
        }
        return false;
      }
      function cloneEditorState(current) {
        return new EditorState(new Map(current._nodeMap));
      }
      function createEmptyEditorState() {
        return new EditorState(/* @__PURE__ */ new Map([["root", $createRootNode()]]));
      }
      function exportNodeToJSON(node) {
        const serializedNode = node.exportJSON();
        const nodeClass = node.constructor;
        if (serializedNode.type !== nodeClass.getType()) {
          {
            throw Error(`LexicalNode: Node ${nodeClass.name} does not implement .exportJSON().`);
          }
        }
        const serializedChildren = serializedNode.children;
        if ($isElementNode(node)) {
          if (!Array.isArray(serializedChildren)) {
            {
              throw Error(`LexicalNode: Node ${nodeClass.name} is an element but .exportJSON() does not have a children array.`);
            }
          }
          const children = node.getChildren();
          for (let i = 0; i < children.length; i++) {
            const child = children[i];
            const serializedChildNode = exportNodeToJSON(child);
            serializedChildren.push(serializedChildNode);
          }
        }
        return serializedNode;
      }
      var EditorState = class {
        constructor(nodeMap, selection) {
          this._nodeMap = nodeMap;
          this._selection = selection || null;
          this._flushSync = false;
          this._readOnly = false;
        }
        isEmpty() {
          return this._nodeMap.size === 1 && this._selection === null;
        }
        read(callbackFn) {
          return readEditorState(this, callbackFn);
        }
        clone(selection) {
          const editorState = new EditorState(this._nodeMap, selection === void 0 ? this._selection : selection);
          editorState._readOnly = true;
          return editorState;
        }
        toJSON() {
          return readEditorState(this, () => ({
            root: exportNodeToJSON($getRoot())
          }));
        }
      };
      var LineBreakNode = class extends LexicalNode {
        static getType() {
          return "linebreak";
        }
        static clone(node) {
          return new LineBreakNode(node.__key);
        }
        constructor(key) {
          super(key);
        }
        getTextContent() {
          return "\n";
        }
        createDOM() {
          return document.createElement("br");
        }
        updateDOM() {
          return false;
        }
        static importDOM() {
          return {
            br: (node) => {
              const parentElement = node.parentElement;
              if (parentElement != null && parentElement.firstChild === node && parentElement.lastChild === node) {
                return null;
              }
              return {
                conversion: convertLineBreakElement,
                priority: 0
              };
            }
          };
        }
        static importJSON(serializedLineBreakNode) {
          return $createLineBreakNode();
        }
        exportJSON() {
          return {
            type: "linebreak",
            version: 1
          };
        }
      };
      function convertLineBreakElement(node) {
        return {
          node: $createLineBreakNode()
        };
      }
      function $createLineBreakNode() {
        return new LineBreakNode();
      }
      function $isLineBreakNode(node) {
        return node instanceof LineBreakNode;
      }
      function getElementOuterTag(node, format) {
        if (format & IS_CODE) {
          return "code";
        }
        if (format & IS_SUBSCRIPT) {
          return "sub";
        }
        if (format & IS_SUPERSCRIPT) {
          return "sup";
        }
        return null;
      }
      function getElementInnerTag(node, format) {
        if (format & IS_BOLD) {
          return "strong";
        }
        if (format & IS_ITALIC) {
          return "em";
        }
        return "span";
      }
      function setTextThemeClassNames(tag, prevFormat, nextFormat, dom, textClassNames) {
        const domClassList = dom.classList;
        let classNames = getCachedClassNameArray(textClassNames, "base");
        if (classNames !== void 0) {
          domClassList.add(...classNames);
        }
        classNames = getCachedClassNameArray(textClassNames, "underlineStrikethrough");
        let hasUnderlineStrikethrough = false;
        const prevUnderlineStrikethrough = prevFormat & IS_UNDERLINE && prevFormat & IS_STRIKETHROUGH;
        const nextUnderlineStrikethrough = nextFormat & IS_UNDERLINE && nextFormat & IS_STRIKETHROUGH;
        if (classNames !== void 0) {
          if (nextUnderlineStrikethrough) {
            hasUnderlineStrikethrough = true;
            if (!prevUnderlineStrikethrough) {
              domClassList.add(...classNames);
            }
          } else if (prevUnderlineStrikethrough) {
            domClassList.remove(...classNames);
          }
        }
        for (const key in TEXT_TYPE_TO_FORMAT) {
          const format = key;
          const flag = TEXT_TYPE_TO_FORMAT[format];
          classNames = getCachedClassNameArray(textClassNames, key);
          if (classNames !== void 0) {
            if (nextFormat & flag) {
              if (hasUnderlineStrikethrough && (key === "underline" || key === "strikethrough")) {
                if (prevFormat & flag) {
                  domClassList.remove(...classNames);
                }
                continue;
              }
              if ((prevFormat & flag) === 0 || prevUnderlineStrikethrough && key === "underline" || key === "strikethrough") {
                domClassList.add(...classNames);
              }
            } else if (prevFormat & flag) {
              domClassList.remove(...classNames);
            }
          }
        }
      }
      function diffComposedText(a, b) {
        const aLength = a.length;
        const bLength = b.length;
        let left = 0;
        let right = 0;
        while (left < aLength && left < bLength && a[left] === b[left]) {
          left++;
        }
        while (right + left < aLength && right + left < bLength && a[aLength - right - 1] === b[bLength - right - 1]) {
          right++;
        }
        return [left, aLength - left - right, b.slice(left, bLength - right)];
      }
      function setTextContent(nextText, dom, node) {
        const firstChild = dom.firstChild;
        const isComposing = node.isComposing();
        const suffix = isComposing ? COMPOSITION_SUFFIX : "";
        const text = nextText + suffix;
        if (firstChild == null) {
          dom.textContent = text;
        } else {
          const nodeValue = firstChild.nodeValue;
          if (nodeValue !== text) {
            if (isComposing || IS_FIREFOX) {
              const [index, remove, insert] = diffComposedText(nodeValue, text);
              if (remove !== 0) {
                firstChild.deleteData(index, remove);
              }
              firstChild.insertData(index, insert);
            } else {
              firstChild.nodeValue = text;
            }
          }
        }
      }
      function createTextInnerDOM(innerDOM, node, innerTag, format, text, config) {
        setTextContent(text, innerDOM, node);
        const theme = config.theme;
        const textClassNames = theme.text;
        if (textClassNames !== void 0) {
          setTextThemeClassNames(innerTag, 0, format, innerDOM, textClassNames);
        }
      }
      var TextNode2 = class extends LexicalNode {
        static getType() {
          return "text";
        }
        static clone(node) {
          return new TextNode2(node.__text, node.__key);
        }
        constructor(text, key) {
          super(key);
          this.__text = text;
          this.__format = 0;
          this.__style = "";
          this.__mode = 0;
          this.__detail = 0;
        }
        getFormat() {
          const self2 = this.getLatest();
          return self2.__format;
        }
        getDetail() {
          const self2 = this.getLatest();
          return self2.__detail;
        }
        getMode() {
          const self2 = this.getLatest();
          return TEXT_TYPE_TO_MODE[self2.__mode];
        }
        getStyle() {
          const self2 = this.getLatest();
          return self2.__style;
        }
        isToken() {
          const self2 = this.getLatest();
          return self2.__mode === IS_TOKEN;
        }
        isComposing() {
          return this.__key === $getCompositionKey();
        }
        isSegmented() {
          const self2 = this.getLatest();
          return self2.__mode === IS_SEGMENTED;
        }
        isDirectionless() {
          const self2 = this.getLatest();
          return (self2.__detail & IS_DIRECTIONLESS) !== 0;
        }
        isUnmergeable() {
          const self2 = this.getLatest();
          return (self2.__detail & IS_UNMERGEABLE) !== 0;
        }
        hasFormat(type) {
          const formatFlag = TEXT_TYPE_TO_FORMAT[type];
          return (this.getFormat() & formatFlag) !== 0;
        }
        isSimpleText() {
          return this.__type === "text" && this.__mode === 0;
        }
        getTextContent() {
          const self2 = this.getLatest();
          return self2.__text;
        }
        getFormatFlags(type, alignWithFormat) {
          const self2 = this.getLatest();
          const format = self2.__format;
          return toggleTextFormatType(format, type, alignWithFormat);
        }
        createDOM(config) {
          const format = this.__format;
          const outerTag = getElementOuterTag(this, format);
          const innerTag = getElementInnerTag(this, format);
          const tag = outerTag === null ? innerTag : outerTag;
          const dom = document.createElement(tag);
          let innerDOM = dom;
          if (outerTag !== null) {
            innerDOM = document.createElement(innerTag);
            dom.appendChild(innerDOM);
          }
          const text = this.__text;
          createTextInnerDOM(innerDOM, this, innerTag, format, text, config);
          const style = this.__style;
          if (style !== "") {
            dom.style.cssText = style;
          }
          return dom;
        }
        updateDOM(prevNode, dom, config) {
          const nextText = this.__text;
          const prevFormat = prevNode.__format;
          const nextFormat = this.__format;
          const prevOuterTag = getElementOuterTag(this, prevFormat);
          const nextOuterTag = getElementOuterTag(this, nextFormat);
          const prevInnerTag = getElementInnerTag(this, prevFormat);
          const nextInnerTag = getElementInnerTag(this, nextFormat);
          const prevTag = prevOuterTag === null ? prevInnerTag : prevOuterTag;
          const nextTag = nextOuterTag === null ? nextInnerTag : nextOuterTag;
          if (prevTag !== nextTag) {
            return true;
          }
          if (prevOuterTag === nextOuterTag && prevInnerTag !== nextInnerTag) {
            const prevInnerDOM = dom.firstChild;
            if (prevInnerDOM == null) {
              {
                throw Error(`updateDOM: prevInnerDOM is null or undefined`);
              }
            }
            const nextInnerDOM = document.createElement(nextInnerTag);
            createTextInnerDOM(nextInnerDOM, this, nextInnerTag, nextFormat, nextText, config);
            dom.replaceChild(nextInnerDOM, prevInnerDOM);
            return false;
          }
          let innerDOM = dom;
          if (nextOuterTag !== null) {
            if (prevOuterTag !== null) {
              innerDOM = dom.firstChild;
              if (innerDOM == null) {
                {
                  throw Error(`updateDOM: innerDOM is null or undefined`);
                }
              }
            }
          }
          setTextContent(nextText, innerDOM, this);
          const theme = config.theme;
          const textClassNames = theme.text;
          if (textClassNames !== void 0 && prevFormat !== nextFormat) {
            setTextThemeClassNames(nextInnerTag, prevFormat, nextFormat, innerDOM, textClassNames);
          }
          const prevStyle = prevNode.__style;
          const nextStyle = this.__style;
          if (prevStyle !== nextStyle) {
            dom.style.cssText = nextStyle;
          }
          return false;
        }
        static importDOM() {
          return {
            "#text": (node) => ({
              conversion: convertTextDOMNode,
              priority: 0
            }),
            b: (node) => ({
              conversion: convertBringAttentionToElement,
              priority: 0
            }),
            code: (node) => ({
              conversion: convertTextFormatElement,
              priority: 0
            }),
            em: (node) => ({
              conversion: convertTextFormatElement,
              priority: 0
            }),
            i: (node) => ({
              conversion: convertTextFormatElement,
              priority: 0
            }),
            span: (node) => ({
              conversion: convertSpanElement,
              priority: 0
            }),
            strong: (node) => ({
              conversion: convertTextFormatElement,
              priority: 0
            }),
            u: (node) => ({
              conversion: convertTextFormatElement,
              priority: 0
            })
          };
        }
        static importJSON(serializedNode) {
          const node = $createTextNode(serializedNode.text);
          node.setFormat(serializedNode.format);
          node.setDetail(serializedNode.detail);
          node.setMode(serializedNode.mode);
          node.setStyle(serializedNode.style);
          return node;
        }
        exportJSON() {
          return {
            detail: this.getDetail(),
            format: this.getFormat(),
            mode: this.getMode(),
            style: this.getStyle(),
            text: this.getTextContent(),
            type: "text",
            version: 1
          };
        }
        selectionTransform(prevSelection, nextSelection) {
          return;
        }
        setFormat(format) {
          const self2 = this.getWritable();
          self2.__format = typeof format === "string" ? TEXT_TYPE_TO_FORMAT[format] : format;
          return self2;
        }
        setDetail(detail) {
          const self2 = this.getWritable();
          self2.__detail = typeof detail === "string" ? DETAIL_TYPE_TO_DETAIL[detail] : detail;
          return self2;
        }
        setStyle(style) {
          const self2 = this.getWritable();
          self2.__style = style;
          return self2;
        }
        toggleFormat(type) {
          const formatFlag = TEXT_TYPE_TO_FORMAT[type];
          return this.setFormat(this.getFormat() ^ formatFlag);
        }
        toggleDirectionless() {
          const self2 = this.getWritable();
          self2.__detail ^= IS_DIRECTIONLESS;
          return self2;
        }
        toggleUnmergeable() {
          const self2 = this.getWritable();
          self2.__detail ^= IS_UNMERGEABLE;
          return self2;
        }
        setMode(type) {
          const mode = TEXT_MODE_TO_TYPE[type];
          const self2 = this.getWritable();
          self2.__mode = mode;
          return self2;
        }
        setTextContent(text) {
          const writableSelf = this.getWritable();
          writableSelf.__text = text;
          return writableSelf;
        }
        select(_anchorOffset, _focusOffset) {
          errorOnReadOnly();
          let anchorOffset = _anchorOffset;
          let focusOffset = _focusOffset;
          const selection = $getSelection();
          const text = this.getTextContent();
          const key = this.__key;
          if (typeof text === "string") {
            const lastOffset = text.length;
            if (anchorOffset === void 0) {
              anchorOffset = lastOffset;
            }
            if (focusOffset === void 0) {
              focusOffset = lastOffset;
            }
          } else {
            anchorOffset = 0;
            focusOffset = 0;
          }
          if (!$isRangeSelection(selection)) {
            return internalMakeRangeSelection(key, anchorOffset, key, focusOffset, "text", "text");
          } else {
            const compositionKey = $getCompositionKey();
            if (compositionKey === selection.anchor.key || compositionKey === selection.focus.key) {
              $setCompositionKey(key);
            }
            selection.setTextNodeRange(this, anchorOffset, this, focusOffset);
          }
          return selection;
        }
        spliceText(offset, delCount, newText, moveSelection) {
          const writableSelf = this.getWritable();
          const text = writableSelf.__text;
          const handledTextLength = newText.length;
          let index = offset;
          if (index < 0) {
            index = handledTextLength + index;
            if (index < 0) {
              index = 0;
            }
          }
          const selection = $getSelection();
          if (moveSelection && $isRangeSelection(selection)) {
            const newOffset = offset + handledTextLength;
            selection.setTextNodeRange(writableSelf, newOffset, writableSelf, newOffset);
          }
          const updatedText = text.slice(0, index) + newText + text.slice(index + delCount);
          writableSelf.__text = updatedText;
          return writableSelf;
        }
        canInsertTextBefore() {
          return true;
        }
        canInsertTextAfter() {
          return true;
        }
        splitText(...splitOffsets) {
          errorOnReadOnly();
          const self2 = this.getLatest();
          const textContent = self2.getTextContent();
          const key = self2.__key;
          const compositionKey = $getCompositionKey();
          const offsetsSet = new Set(splitOffsets);
          const parts = [];
          const textLength = textContent.length;
          let string = "";
          for (let i = 0; i < textLength; i++) {
            if (string !== "" && offsetsSet.has(i)) {
              parts.push(string);
              string = "";
            }
            string += textContent[i];
          }
          if (string !== "") {
            parts.push(string);
          }
          const partsLength = parts.length;
          if (partsLength === 0) {
            return [];
          } else if (parts[0] === textContent) {
            return [self2];
          }
          const firstPart = parts[0];
          const parent = self2.getParentOrThrow();
          const parentKey = parent.__key;
          let writableNode;
          const format = self2.getFormat();
          const style = self2.getStyle();
          const detail = self2.__detail;
          let hasReplacedSelf = false;
          if (self2.isSegmented()) {
            writableNode = $createTextNode(firstPart);
            writableNode.__parent = parentKey;
            writableNode.__format = format;
            writableNode.__style = style;
            writableNode.__detail = detail;
            hasReplacedSelf = true;
          } else {
            writableNode = self2.getWritable();
            writableNode.__text = firstPart;
          }
          const selection = $getSelection();
          const splitNodes = [writableNode];
          let textSize = firstPart.length;
          for (let i = 1; i < partsLength; i++) {
            const part = parts[i];
            const partSize = part.length;
            const sibling = $createTextNode(part).getWritable();
            sibling.__format = format;
            sibling.__style = style;
            sibling.__detail = detail;
            const siblingKey = sibling.__key;
            const nextTextSize = textSize + partSize;
            if ($isRangeSelection(selection)) {
              const anchor = selection.anchor;
              const focus = selection.focus;
              if (anchor.key === key && anchor.type === "text" && anchor.offset > textSize && anchor.offset <= nextTextSize) {
                anchor.key = siblingKey;
                anchor.offset -= textSize;
                selection.dirty = true;
              }
              if (focus.key === key && focus.type === "text" && focus.offset > textSize && focus.offset <= nextTextSize) {
                focus.key = siblingKey;
                focus.offset -= textSize;
                selection.dirty = true;
              }
            }
            if (compositionKey === key) {
              $setCompositionKey(siblingKey);
            }
            textSize = nextTextSize;
            sibling.__parent = parentKey;
            splitNodes.push(sibling);
          }
          internalMarkSiblingsAsDirty(this);
          const writableParent = parent.getWritable();
          const writableParentChildren = writableParent.__children;
          const insertionIndex = writableParentChildren.indexOf(key);
          const splitNodesKeys = splitNodes.map((splitNode) => splitNode.__key);
          if (hasReplacedSelf) {
            writableParentChildren.splice(insertionIndex, 0, ...splitNodesKeys);
            this.remove();
          } else {
            writableParentChildren.splice(insertionIndex, 1, ...splitNodesKeys);
          }
          if ($isRangeSelection(selection)) {
            $updateElementSelectionOnCreateDeleteNode(selection, parent, insertionIndex, partsLength - 1);
          }
          return splitNodes;
        }
        mergeWithSibling(target) {
          const isBefore = target === this.getPreviousSibling();
          if (!isBefore && target !== this.getNextSibling()) {
            {
              throw Error(`mergeWithSibling: sibling must be a previous or next sibling`);
            }
          }
          const key = this.__key;
          const targetKey = target.__key;
          const text = this.__text;
          const textLength = text.length;
          const compositionKey = $getCompositionKey();
          if (compositionKey === targetKey) {
            $setCompositionKey(key);
          }
          const selection = $getSelection();
          if ($isRangeSelection(selection)) {
            const anchor = selection.anchor;
            const focus = selection.focus;
            if (anchor !== null && anchor.key === targetKey) {
              adjustPointOffsetForMergedSibling(anchor, isBefore, key, target, textLength);
              selection.dirty = true;
            }
            if (focus !== null && focus.key === targetKey) {
              adjustPointOffsetForMergedSibling(focus, isBefore, key, target, textLength);
              selection.dirty = true;
            }
          }
          const targetText = target.__text;
          const newText = isBefore ? targetText + text : text + targetText;
          this.setTextContent(newText);
          const writableSelf = this.getWritable();
          target.remove();
          return writableSelf;
        }
        isTextEntity() {
          return false;
        }
      };
      function convertSpanElement(domNode) {
        const span = domNode;
        const hasBoldFontWeight = span.style.fontWeight === "700";
        const hasLinethroughTextDecoration = span.style.textDecoration === "line-through";
        const hasItalicFontStyle = span.style.fontStyle === "italic";
        const hasUnderlineTextDecoration = span.style.textDecoration === "underline";
        const verticalAlign = span.style.verticalAlign;
        return {
          forChild: (lexicalNode) => {
            if (!$isTextNode(lexicalNode)) {
              return lexicalNode;
            }
            if (hasBoldFontWeight) {
              lexicalNode.toggleFormat("bold");
            }
            if (hasLinethroughTextDecoration) {
              lexicalNode.toggleFormat("strikethrough");
            }
            if (hasItalicFontStyle) {
              lexicalNode.toggleFormat("italic");
            }
            if (hasUnderlineTextDecoration) {
              lexicalNode.toggleFormat("underline");
            }
            if (verticalAlign === "sub") {
              lexicalNode.toggleFormat("subscript");
            }
            if (verticalAlign === "super") {
              lexicalNode.toggleFormat("superscript");
            }
            return lexicalNode;
          },
          node: null
        };
      }
      function convertBringAttentionToElement(domNode) {
        const b = domNode;
        const hasNormalFontWeight = b.style.fontWeight === "normal";
        return {
          forChild: (lexicalNode) => {
            if ($isTextNode(lexicalNode) && !hasNormalFontWeight) {
              lexicalNode.toggleFormat("bold");
            }
            return lexicalNode;
          },
          node: null
        };
      }
      function convertTextDOMNode(domNode, _parent, preformatted) {
        let textContent = domNode.textContent || "";
        if (!preformatted && /\n/.test(textContent)) {
          textContent = textContent.replace(/\r?\n/gm, " ");
          if (textContent.trim().length === 0) {
            return {
              node: null
            };
          }
        }
        return {
          node: $createTextNode(textContent)
        };
      }
      var nodeNameToTextFormat = {
        code: "code",
        em: "italic",
        i: "italic",
        strong: "bold",
        u: "underline"
      };
      function convertTextFormatElement(domNode) {
        const format = nodeNameToTextFormat[domNode.nodeName.toLowerCase()];
        if (format === void 0) {
          return {
            node: null
          };
        }
        return {
          forChild: (lexicalNode) => {
            if ($isTextNode(lexicalNode)) {
              lexicalNode.toggleFormat(format);
            }
            return lexicalNode;
          },
          node: null
        };
      }
      function $createTextNode(text = "") {
        return new TextNode2(text);
      }
      function $isTextNode(node) {
        return node instanceof TextNode2;
      }
      var ParagraphNode = class extends ElementNode {
        static getType() {
          return "paragraph";
        }
        static clone(node) {
          return new ParagraphNode(node.__key);
        }
        createDOM(config) {
          const dom = document.createElement("p");
          const classNames = getCachedClassNameArray(config.theme, "paragraph");
          if (classNames !== void 0) {
            const domClassList = dom.classList;
            domClassList.add(...classNames);
          }
          return dom;
        }
        updateDOM(prevNode, dom) {
          return false;
        }
        static importDOM() {
          return {
            p: (node) => ({
              conversion: convertParagraphElement,
              priority: 0
            })
          };
        }
        exportDOM(editor) {
          const {
            element
          } = super.exportDOM(editor);
          if (element && this.isEmpty()) {
            element.append(document.createElement("br"));
          }
          if (element) {
            const formatType = this.getFormatType();
            element.style.textAlign = formatType;
            const direction = this.getDirection();
            if (direction) {
              element.dir = direction;
            }
            const indent = this.getIndent();
            if (indent > 0) {
              element.style.textIndent = `${indent * 20}px`;
            }
          }
          return {
            element
          };
        }
        static importJSON(serializedNode) {
          const node = $createParagraphNode();
          node.setFormat(serializedNode.format);
          node.setIndent(serializedNode.indent);
          node.setDirection(serializedNode.direction);
          return node;
        }
        exportJSON() {
          return {
            ...super.exportJSON(),
            type: "paragraph",
            version: 1
          };
        }
        insertNewAfter() {
          const newElement = $createParagraphNode();
          const direction = this.getDirection();
          newElement.setDirection(direction);
          this.insertAfter(newElement);
          return newElement;
        }
        collapseAtStart() {
          const children = this.getChildren();
          if (children.length === 0 || $isTextNode(children[0]) && children[0].getTextContent().trim() === "") {
            const nextSibling = this.getNextSibling();
            if (nextSibling !== null) {
              this.selectNext();
              this.remove();
              return true;
            }
            const prevSibling = this.getPreviousSibling();
            if (prevSibling !== null) {
              this.selectPrevious();
              this.remove();
              return true;
            }
          }
          return false;
        }
      };
      function convertParagraphElement() {
        return {
          node: $createParagraphNode()
        };
      }
      function $createParagraphNode() {
        return new ParagraphNode();
      }
      function $isParagraphNode(node) {
        return node instanceof ParagraphNode;
      }
      var COMMAND_PRIORITY_EDITOR = 0;
      var COMMAND_PRIORITY_LOW = 1;
      var COMMAND_PRIORITY_NORMAL = 2;
      var COMMAND_PRIORITY_HIGH = 3;
      var COMMAND_PRIORITY_CRITICAL = 4;
      function resetEditor(editor, prevRootElement, nextRootElement, pendingEditorState) {
        const keyNodeMap = editor._keyToDOMMap;
        keyNodeMap.clear();
        editor._editorState = createEmptyEditorState();
        editor._pendingEditorState = pendingEditorState;
        editor._compositionKey = null;
        editor._dirtyType = NO_DIRTY_NODES;
        editor._cloneNotNeeded.clear();
        editor._dirtyLeaves = /* @__PURE__ */ new Set();
        editor._dirtyElements.clear();
        editor._normalizedNodes = /* @__PURE__ */ new Set();
        editor._updateTags = /* @__PURE__ */ new Set();
        editor._updates = [];
        const observer = editor._observer;
        if (observer !== null) {
          observer.disconnect();
          editor._observer = null;
        }
        if (prevRootElement !== null) {
          prevRootElement.textContent = "";
        }
        if (nextRootElement !== null) {
          nextRootElement.textContent = "";
          keyNodeMap.set("root", nextRootElement);
        }
      }
      function initializeConversionCache(nodes) {
        const conversionCache = /* @__PURE__ */ new Map();
        const handledConversions = /* @__PURE__ */ new Set();
        nodes.forEach((node) => {
          const importDOM = node.klass.importDOM != null ? node.klass.importDOM.bind(node.klass) : null;
          if (importDOM == null || handledConversions.has(importDOM)) {
            return;
          }
          handledConversions.add(importDOM);
          const map = importDOM();
          if (map !== null) {
            Object.keys(map).forEach((key) => {
              let currentCache = conversionCache.get(key);
              if (currentCache === void 0) {
                currentCache = [];
                conversionCache.set(key, currentCache);
              }
              currentCache.push(map[key]);
            });
          }
        });
        return conversionCache;
      }
      function createEditor(editorConfig) {
        const config = editorConfig || {};
        const activeEditor2 = internalGetActiveEditor();
        const theme = config.theme || {};
        const parentEditor = editorConfig === void 0 ? activeEditor2 : config.parentEditor || null;
        const disableEvents = config.disableEvents || false;
        const editorState = createEmptyEditorState();
        const namespace = config.namespace || (parentEditor !== null ? parentEditor._config.namespace : createUID());
        const initialEditorState = config.editorState;
        const nodes = [RootNode, TextNode2, LineBreakNode, ParagraphNode, ...config.nodes || []];
        const onError = config.onError;
        const isEditable = config.editable !== void 0 ? config.editable : true;
        let registeredNodes;
        if (editorConfig === void 0 && activeEditor2 !== null) {
          registeredNodes = activeEditor2._nodes;
        } else {
          registeredNodes = /* @__PURE__ */ new Map();
          for (let i = 0; i < nodes.length; i++) {
            const klass = nodes[i];
            {
              const name = klass.name;
              if (name !== "RootNode") {
                const proto = klass.prototype;
                ["getType", "clone"].forEach((method) => {
                  if (!klass.hasOwnProperty(method)) {
                    console.warn(`${name} must implement static "${method}" method`);
                  }
                });
                if (!klass.hasOwnProperty("importDOM") && klass.hasOwnProperty("exportDOM")) {
                  console.warn(`${name} should implement "importDOM" if using a custom "exportDOM" method to ensure HTML serialization (important for copy & paste) works as expected`);
                }
                if (proto instanceof DecoratorNode) {
                  if (!proto.hasOwnProperty("decorate")) {
                    console.warn(`${proto.constructor.name} must implement "decorate" method`);
                  }
                }
                if (!klass.hasOwnProperty("importJSON")) {
                  console.warn(`${name} should implement "importJSON" method to ensure JSON and default HTML serialization works as expected`);
                }
                if (!proto.hasOwnProperty("exportJSON")) {
                  console.warn(`${name} should implement "exportJSON" method to ensure JSON and default HTML serialization works as expected`);
                }
              }
            }
            const type = klass.getType();
            registeredNodes.set(type, {
              klass,
              transforms: /* @__PURE__ */ new Set()
            });
          }
        }
        const editor = new LexicalEditor(editorState, parentEditor, registeredNodes, {
          disableEvents,
          namespace,
          theme
        }, onError ? onError : console.error, initializeConversionCache(registeredNodes), isEditable);
        if (initialEditorState !== void 0) {
          editor._pendingEditorState = initialEditorState;
          editor._dirtyType = FULL_RECONCILE;
        }
        return editor;
      }
      var LexicalEditor = class {
        constructor(editorState, parentEditor, nodes, config, onError, htmlConversions, editable) {
          this._parentEditor = parentEditor;
          this._rootElement = null;
          this._editorState = editorState;
          this._pendingEditorState = null;
          this._compositionKey = null;
          this._deferred = [];
          this._keyToDOMMap = /* @__PURE__ */ new Map();
          this._updates = [];
          this._updating = false;
          this._listeners = {
            decorator: /* @__PURE__ */ new Set(),
            editable: /* @__PURE__ */ new Set(),
            mutation: /* @__PURE__ */ new Map(),
            root: /* @__PURE__ */ new Set(),
            textcontent: /* @__PURE__ */ new Set(),
            update: /* @__PURE__ */ new Set()
          };
          this._commands = /* @__PURE__ */ new Map();
          this._config = config;
          this._nodes = nodes;
          this._decorators = {};
          this._pendingDecorators = null;
          this._dirtyType = NO_DIRTY_NODES;
          this._cloneNotNeeded = /* @__PURE__ */ new Set();
          this._dirtyLeaves = /* @__PURE__ */ new Set();
          this._dirtyElements = /* @__PURE__ */ new Map();
          this._normalizedNodes = /* @__PURE__ */ new Set();
          this._updateTags = /* @__PURE__ */ new Set();
          this._observer = null;
          this._key = createUID();
          this._onError = onError;
          this._htmlConversions = htmlConversions;
          this._editable = true;
          this._headless = false;
          this._window = null;
        }
        isComposing() {
          return this._compositionKey != null;
        }
        registerUpdateListener(listener) {
          const listenerSetOrMap = this._listeners.update;
          listenerSetOrMap.add(listener);
          return () => {
            listenerSetOrMap.delete(listener);
          };
        }
        registerEditableListener(listener) {
          const listenerSetOrMap = this._listeners.editable;
          listenerSetOrMap.add(listener);
          return () => {
            listenerSetOrMap.delete(listener);
          };
        }
        registerDecoratorListener(listener) {
          const listenerSetOrMap = this._listeners.decorator;
          listenerSetOrMap.add(listener);
          return () => {
            listenerSetOrMap.delete(listener);
          };
        }
        registerTextContentListener(listener) {
          const listenerSetOrMap = this._listeners.textcontent;
          listenerSetOrMap.add(listener);
          return () => {
            listenerSetOrMap.delete(listener);
          };
        }
        registerRootListener(listener) {
          const listenerSetOrMap = this._listeners.root;
          listener(this._rootElement, null);
          listenerSetOrMap.add(listener);
          return () => {
            listener(null, this._rootElement);
            listenerSetOrMap.delete(listener);
          };
        }
        registerCommand(command, listener, priority) {
          if (priority === void 0) {
            {
              throw Error(`Listener for type "command" requires a "priority".`);
            }
          }
          const commandsMap = this._commands;
          if (!commandsMap.has(command)) {
            commandsMap.set(command, [/* @__PURE__ */ new Set(), /* @__PURE__ */ new Set(), /* @__PURE__ */ new Set(), /* @__PURE__ */ new Set(), /* @__PURE__ */ new Set()]);
          }
          const listenersInPriorityOrder = commandsMap.get(command);
          if (listenersInPriorityOrder === void 0) {
            {
              throw Error(`registerCommand: Command ${String(command)} not found in command map`);
            }
          }
          const listeners = listenersInPriorityOrder[priority];
          listeners.add(listener);
          return () => {
            listeners.delete(listener);
            if (listenersInPriorityOrder.every((listenersSet) => listenersSet.size === 0)) {
              commandsMap.delete(command);
            }
          };
        }
        registerMutationListener(klass, listener) {
          const registeredNode = this._nodes.get(klass.getType());
          if (registeredNode === void 0) {
            {
              throw Error(`Node ${klass.name} has not been registered. Ensure node has been passed to createEditor.`);
            }
          }
          const mutations = this._listeners.mutation;
          mutations.set(listener, klass);
          return () => {
            mutations.delete(listener);
          };
        }
        registerNodeTransform(klass, listener) {
          const type = klass.getType();
          const registeredNode = this._nodes.get(type);
          if (registeredNode === void 0) {
            {
              throw Error(`Node ${klass.name} has not been registered. Ensure node has been passed to createEditor.`);
            }
          }
          const transforms = registeredNode.transforms;
          transforms.add(listener);
          markAllNodesAsDirty(this, type);
          return () => {
            transforms.delete(listener);
          };
        }
        hasNodes(nodes) {
          for (let i = 0; i < nodes.length; i++) {
            const klass = nodes[i];
            const type = klass.getType();
            if (!this._nodes.has(type)) {
              return false;
            }
          }
          return true;
        }
        dispatchCommand(type, payload) {
          return dispatchCommand(this, type, payload);
        }
        getDecorators() {
          return this._decorators;
        }
        getRootElement() {
          return this._rootElement;
        }
        getKey() {
          return this._key;
        }
        setRootElement(nextRootElement) {
          const prevRootElement = this._rootElement;
          if (nextRootElement !== prevRootElement) {
            const pendingEditorState = this._pendingEditorState || this._editorState;
            this._rootElement = nextRootElement;
            resetEditor(this, prevRootElement, nextRootElement, pendingEditorState);
            if (prevRootElement !== null) {
              if (!this._config.disableEvents) {
                removeRootElementEvents(prevRootElement);
              }
            }
            if (nextRootElement !== null) {
              const windowObj = getDefaultView(nextRootElement);
              const style = nextRootElement.style;
              style.userSelect = "text";
              style.whiteSpace = "pre-wrap";
              style.wordBreak = "break-word";
              nextRootElement.setAttribute("data-lexical-editor", "true");
              this._window = windowObj;
              this._dirtyType = FULL_RECONCILE;
              initMutationObserver(this);
              this._updateTags.add("history-merge");
              commitPendingUpdates(this);
              if (!this._config.disableEvents) {
                addRootElementEvents(nextRootElement, this);
              }
            } else {
              this._window = null;
            }
            triggerListeners("root", this, false, nextRootElement, prevRootElement);
          }
        }
        getElementByKey(key) {
          return this._keyToDOMMap.get(key) || null;
        }
        getEditorState() {
          return this._editorState;
        }
        setEditorState(editorState, options) {
          if (editorState.isEmpty()) {
            {
              throw Error(`setEditorState: the editor state is empty. Ensure the editor state's root node never becomes empty.`);
            }
          }
          flushRootMutations(this);
          const pendingEditorState = this._pendingEditorState;
          const tags = this._updateTags;
          const tag = options !== void 0 ? options.tag : null;
          if (pendingEditorState !== null && !pendingEditorState.isEmpty()) {
            if (tag != null) {
              tags.add(tag);
            }
            commitPendingUpdates(this);
          }
          this._pendingEditorState = editorState;
          this._dirtyType = FULL_RECONCILE;
          this._dirtyElements.set("root", false);
          this._compositionKey = null;
          if (tag != null) {
            tags.add(tag);
          }
          commitPendingUpdates(this);
        }
        parseEditorState(maybeStringifiedEditorState, updateFn) {
          const serializedEditorState = typeof maybeStringifiedEditorState === "string" ? JSON.parse(maybeStringifiedEditorState) : maybeStringifiedEditorState;
          return parseEditorState(serializedEditorState, this, updateFn);
        }
        update(updateFn, options) {
          updateEditor(this, updateFn, options);
        }
        focus(callbackFn, options = {}) {
          const rootElement = this._rootElement;
          if (rootElement !== null) {
            rootElement.setAttribute("autocapitalize", "off");
            updateEditor(this, () => {
              const selection = $getSelection();
              const root = $getRoot();
              if (selection !== null) {
                selection.dirty = true;
              } else if (root.getChildrenSize() !== 0) {
                if (options.defaultSelection === "rootStart") {
                  root.selectStart();
                } else {
                  root.selectEnd();
                }
              }
            }, {
              onUpdate: () => {
                rootElement.removeAttribute("autocapitalize");
                if (callbackFn) {
                  callbackFn();
                }
              }
            });
            if (this._pendingEditorState === null) {
              rootElement.removeAttribute("autocapitalize");
            }
          }
        }
        blur() {
          const rootElement = this._rootElement;
          if (rootElement !== null) {
            rootElement.blur();
          }
          const domSelection = getDOMSelection();
          if (domSelection !== null) {
            domSelection.removeAllRanges();
          }
        }
        isEditable() {
          return this._editable;
        }
        setEditable(editable) {
          if (this._editable !== editable) {
            this._editable = editable;
            triggerListeners("editable", this, true, editable);
          }
        }
        toJSON() {
          return {
            editorState: this._editorState.toJSON()
          };
        }
      };
      var VERSION = "0.4.1";
      var DEPRECATED_GridCellNode = class extends ElementNode {
        constructor(colSpan, key) {
          super(key);
          this.__colSpan = colSpan;
        }
        exportJSON() {
          return {
            ...super.exportJSON(),
            colSpan: this.__colSpan
          };
        }
      };
      function DEPRECATED_$isGridCellNode(node) {
        return node instanceof DEPRECATED_GridCellNode;
      }
      var DEPRECATED_GridNode = class extends ElementNode {
      };
      function DEPRECATED_$isGridNode(node) {
        return node instanceof DEPRECATED_GridNode;
      }
      var DEPRECATED_GridRowNode = class extends ElementNode {
      };
      function DEPRECATED_$isGridRowNode(node) {
        return node instanceof DEPRECATED_GridRowNode;
      }
      exports.$addUpdateTag = $addUpdateTag;
      exports.$createLineBreakNode = $createLineBreakNode;
      exports.$createNodeSelection = $createNodeSelection;
      exports.$createParagraphNode = $createParagraphNode;
      exports.$createRangeSelection = $createRangeSelection;
      exports.$createTextNode = $createTextNode;
      exports.$getDecoratorNode = $getDecoratorNode;
      exports.$getNearestNodeFromDOMNode = $getNearestNodeFromDOMNode;
      exports.$getNodeByKey = $getNodeByKey;
      exports.$getPreviousSelection = $getPreviousSelection;
      exports.$getRoot = $getRoot;
      exports.$getSelection = $getSelection;
      exports.$hasAncestor = $hasAncestor;
      exports.$insertNodes = $insertNodes;
      exports.$isDecoratorNode = $isDecoratorNode;
      exports.$isElementNode = $isElementNode;
      exports.$isInlineElementOrDecoratorNode = $isInlineElementOrDecoratorNode;
      exports.$isLeafNode = $isLeafNode;
      exports.$isLineBreakNode = $isLineBreakNode;
      exports.$isNodeSelection = $isNodeSelection;
      exports.$isParagraphNode = $isParagraphNode;
      exports.$isRangeSelection = $isRangeSelection;
      exports.$isRootNode = $isRootNode;
      exports.$isRootOrShadowRoot = $isRootOrShadowRoot;
      exports.$isTextNode = $isTextNode;
      exports.$nodesOfType = $nodesOfType;
      exports.$parseSerializedNode = $parseSerializedNode;
      exports.$setCompositionKey = $setCompositionKey;
      exports.$setSelection = $setSelection;
      exports.BLUR_COMMAND = BLUR_COMMAND;
      exports.CAN_REDO_COMMAND = CAN_REDO_COMMAND;
      exports.CAN_UNDO_COMMAND = CAN_UNDO_COMMAND;
      exports.CLEAR_EDITOR_COMMAND = CLEAR_EDITOR_COMMAND;
      exports.CLEAR_HISTORY_COMMAND = CLEAR_HISTORY_COMMAND;
      exports.CLICK_COMMAND = CLICK_COMMAND;
      exports.COMMAND_PRIORITY_CRITICAL = COMMAND_PRIORITY_CRITICAL;
      exports.COMMAND_PRIORITY_EDITOR = COMMAND_PRIORITY_EDITOR;
      exports.COMMAND_PRIORITY_HIGH = COMMAND_PRIORITY_HIGH;
      exports.COMMAND_PRIORITY_LOW = COMMAND_PRIORITY_LOW;
      exports.COMMAND_PRIORITY_NORMAL = COMMAND_PRIORITY_NORMAL;
      exports.CONTROLLED_TEXT_INSERTION_COMMAND = CONTROLLED_TEXT_INSERTION_COMMAND;
      exports.COPY_COMMAND = COPY_COMMAND;
      exports.CUT_COMMAND = CUT_COMMAND;
      exports.DELETE_CHARACTER_COMMAND = DELETE_CHARACTER_COMMAND;
      exports.DELETE_LINE_COMMAND = DELETE_LINE_COMMAND;
      exports.DELETE_WORD_COMMAND = DELETE_WORD_COMMAND;
      exports.DEPRECATED_$createGridSelection = DEPRECATED_$createGridSelection;
      exports.DEPRECATED_$isGridCellNode = DEPRECATED_$isGridCellNode;
      exports.DEPRECATED_$isGridNode = DEPRECATED_$isGridNode;
      exports.DEPRECATED_$isGridRowNode = DEPRECATED_$isGridRowNode;
      exports.DEPRECATED_$isGridSelection = DEPRECATED_$isGridSelection;
      exports.DEPRECATED_GridCellNode = DEPRECATED_GridCellNode;
      exports.DEPRECATED_GridNode = DEPRECATED_GridNode;
      exports.DEPRECATED_GridRowNode = DEPRECATED_GridRowNode;
      exports.DRAGEND_COMMAND = DRAGEND_COMMAND;
      exports.DRAGOVER_COMMAND = DRAGOVER_COMMAND;
      exports.DRAGSTART_COMMAND = DRAGSTART_COMMAND;
      exports.DROP_COMMAND = DROP_COMMAND;
      exports.DecoratorNode = DecoratorNode;
      exports.ElementNode = ElementNode;
      exports.FOCUS_COMMAND = FOCUS_COMMAND;
      exports.FORMAT_ELEMENT_COMMAND = FORMAT_ELEMENT_COMMAND;
      exports.FORMAT_TEXT_COMMAND = FORMAT_TEXT_COMMAND;
      exports.INDENT_CONTENT_COMMAND = INDENT_CONTENT_COMMAND;
      exports.INSERT_LINE_BREAK_COMMAND = INSERT_LINE_BREAK_COMMAND;
      exports.INSERT_PARAGRAPH_COMMAND = INSERT_PARAGRAPH_COMMAND;
      exports.KEY_ARROW_DOWN_COMMAND = KEY_ARROW_DOWN_COMMAND;
      exports.KEY_ARROW_LEFT_COMMAND = KEY_ARROW_LEFT_COMMAND;
      exports.KEY_ARROW_RIGHT_COMMAND = KEY_ARROW_RIGHT_COMMAND;
      exports.KEY_ARROW_UP_COMMAND = KEY_ARROW_UP_COMMAND;
      exports.KEY_BACKSPACE_COMMAND = KEY_BACKSPACE_COMMAND;
      exports.KEY_DELETE_COMMAND = KEY_DELETE_COMMAND;
      exports.KEY_ENTER_COMMAND = KEY_ENTER_COMMAND;
      exports.KEY_ESCAPE_COMMAND = KEY_ESCAPE_COMMAND;
      exports.KEY_MODIFIER_COMMAND = KEY_MODIFIER_COMMAND;
      exports.KEY_SPACE_COMMAND = KEY_SPACE_COMMAND;
      exports.KEY_TAB_COMMAND = KEY_TAB_COMMAND;
      exports.LineBreakNode = LineBreakNode;
      exports.MOVE_TO_END = MOVE_TO_END;
      exports.MOVE_TO_START = MOVE_TO_START;
      exports.OUTDENT_CONTENT_COMMAND = OUTDENT_CONTENT_COMMAND;
      exports.PASTE_COMMAND = PASTE_COMMAND;
      exports.ParagraphNode = ParagraphNode;
      exports.REDO_COMMAND = REDO_COMMAND;
      exports.REMOVE_TEXT_COMMAND = REMOVE_TEXT_COMMAND;
      exports.RootNode = RootNode;
      exports.SELECTION_CHANGE_COMMAND = SELECTION_CHANGE_COMMAND;
      exports.TextNode = TextNode2;
      exports.UNDO_COMMAND = UNDO_COMMAND;
      exports.VERSION = VERSION;
      exports.createCommand = createCommand;
      exports.createEditor = createEditor;
    }
  });

  // node_modules/lexical/Lexical.js
  var require_Lexical = __commonJS({
    "node_modules/lexical/Lexical.js"(exports, module) {
      "use strict";
      var Lexical = true ? require_Lexical_dev() : null;
      module.exports = Lexical;
    }
  });

  // node_modules/@lexical/selection/LexicalSelection.dev.js
  var require_LexicalSelection_dev = __commonJS({
    "node_modules/@lexical/selection/LexicalSelection.dev.js"(exports) {
      "use strict";
      var lexical2 = require_Lexical();
      var cssToStyles = /* @__PURE__ */ new Map();
      function $cloneWithProperties(node) {
        const latest = node.getLatest();
        const constructor = latest.constructor;
        const clone = constructor.clone(latest);
        clone.__parent = latest.__parent;
        if (lexical2.$isElementNode(latest) && lexical2.$isElementNode(clone)) {
          clone.__children = Array.from(latest.__children);
          clone.__format = latest.__format;
          clone.__indent = latest.__indent;
          clone.__dir = latest.__dir;
        } else if (lexical2.$isTextNode(latest) && lexical2.$isTextNode(clone)) {
          clone.__format = latest.__format;
          clone.__style = latest.__style;
          clone.__mode = latest.__mode;
          clone.__detail = latest.__detail;
        }
        return clone;
      }
      function $getIndexFromPossibleClone(node, parent, nodeMap) {
        const parentClone = nodeMap.get(parent.getKey());
        if (lexical2.$isElementNode(parentClone)) {
          return parentClone.__children.indexOf(node.getKey());
        }
        return node.getIndexWithinParent();
      }
      function $getParentAvoidingExcludedElements(node) {
        let parent = node.getParent();
        while (parent !== null && parent.excludeFromCopy("clone")) {
          parent = parent.getParent();
        }
        return parent;
      }
      function $copyLeafNodeBranchToRoot(leaf, startingOffset, endingOffset, isLeftSide, range, nodeMap) {
        let node = leaf;
        let offset = startingOffset;
        while (node !== null) {
          const parent = $getParentAvoidingExcludedElements(node);
          if (parent === null) {
            break;
          }
          if (!lexical2.$isElementNode(node) || !node.excludeFromCopy("clone")) {
            const key = node.getKey();
            let clone = nodeMap.get(key);
            const needsClone = clone === void 0;
            if (needsClone) {
              clone = $cloneWithProperties(node);
              nodeMap.set(key, clone);
            }
            if (lexical2.$isTextNode(clone) && !clone.isSegmented() && !clone.isToken()) {
              clone.__text = clone.__text.slice(isLeftSide ? offset : 0, isLeftSide ? endingOffset : offset);
            } else if (lexical2.$isElementNode(clone)) {
              clone.__children = clone.__children.slice(isLeftSide ? offset : 0, isLeftSide ? void 0 : (offset || 0) + 1);
            }
            if (lexical2.$isRootNode(parent)) {
              if (needsClone) {
                range.push(key);
              }
              break;
            }
          }
          offset = $getIndexFromPossibleClone(node, parent, nodeMap);
          node = parent;
        }
      }
      function errGetLatestOnClone() {
        {
          throw Error(`getLatest() on clone node`);
        }
      }
      function $cloneContents(selection) {
        const clone = $cloneContentsImpl(selection);
        {
          const nodeMap = clone.nodeMap;
          for (let i = 0; i < nodeMap.length; i++) {
            const node = nodeMap[i][1];
            if (node.getLatest === errGetLatestOnClone) {
              continue;
            }
            Object.setPrototypeOf(node, Object.create(Object.getPrototypeOf(node), {
              getLatest: {
                configurable: true,
                enumerable: true,
                value: errGetLatestOnClone,
                writable: true
              }
            }));
          }
        }
        return clone;
      }
      function $cloneContentsImpl(selection) {
        if (lexical2.$isRangeSelection(selection)) {
          const anchor = selection.anchor;
          const focus = selection.focus;
          const [anchorOffset, focusOffset] = selection.getCharacterOffsets();
          const nodes = selection.getNodes();
          if (nodes.length === 0) {
            return {
              nodeMap: [],
              range: []
            };
          }
          let nodesLength = nodes.length;
          const firstNode = nodes[0];
          const firstNodeParent = firstNode.getParent();
          if (firstNodeParent !== null && (!firstNodeParent.canBeEmpty() || lexical2.$isRootNode(firstNodeParent))) {
            const parentChildren = firstNodeParent.__children;
            const parentChildrenLength = parentChildren.length;
            if (parentChildrenLength === nodesLength) {
              let areTheSame = true;
              for (let i = 0; i < parentChildren.length; i++) {
                if (parentChildren[i] !== nodes[i].__key) {
                  areTheSame = false;
                  break;
                }
              }
              if (areTheSame) {
                nodesLength++;
                nodes.push(firstNodeParent);
              }
            }
          }
          const lastNode = nodes[nodesLength - 1];
          const isBefore = anchor.isBefore(focus);
          const nodeMap = /* @__PURE__ */ new Map();
          const range = [];
          const isOnlyText = lexical2.$isTextNode(firstNode) && nodesLength === 1;
          $copyLeafNodeBranchToRoot(firstNode, isBefore ? anchorOffset : focusOffset, isOnlyText ? isBefore ? focusOffset : anchorOffset : void 0, true, range, nodeMap);
          for (let i = 0; i < nodesLength; i++) {
            const node = nodes[i];
            const key = node.getKey();
            if (!nodeMap.has(key) && (!lexical2.$isElementNode(node) || !node.excludeFromCopy("clone"))) {
              const clone = $cloneWithProperties(node);
              if (lexical2.$isRootNode(node.getParent())) {
                range.push(node.getKey());
              }
              if (key !== "root") {
                nodeMap.set(key, clone);
              }
            }
          }
          $copyLeafNodeBranchToRoot(lastNode, isOnlyText ? void 0 : isBefore ? focusOffset : anchorOffset, void 0, false, range, nodeMap);
          return {
            nodeMap: Array.from(nodeMap.entries()),
            range
          };
        } else if (lexical2.DEPRECATED_$isGridSelection(selection)) {
          const nodeMap = selection.getNodes().map((node) => {
            const nodeKey = node.getKey();
            const clone = $cloneWithProperties(node);
            return [nodeKey, clone];
          });
          return {
            nodeMap,
            range: [selection.gridKey]
          };
        }
        {
          throw Error(`TODO`);
        }
      }
      function getStyleObjectFromCSS(css) {
        let value = cssToStyles.get(css);
        if (value === void 0) {
          value = getStyleObjectFromRawCSS(css);
          cssToStyles.set(css, value);
        }
        return value;
      }
      function getStyleObjectFromRawCSS(css) {
        const styleObject = {};
        const styles = css.split(";");
        for (const style of styles) {
          if (style !== "") {
            const [key, value] = style.split(/:([^]+)/);
            styleObject[key.trim()] = value.trim();
          }
        }
        return styleObject;
      }
      function getCSSFromStyleObject(styles) {
        let css = "";
        for (const style in styles) {
          if (style) {
            css += `${style}: ${styles[style]};`;
          }
        }
        return css;
      }
      function $addNodeStyle(node) {
        const CSSText = node.getStyle();
        const styles = getStyleObjectFromRawCSS(CSSText);
        cssToStyles.set(CSSText, styles);
      }
      function $patchNodeStyle(node, patch) {
        const prevStyles = getStyleObjectFromCSS(node.getStyle());
        const newStyles = prevStyles ? {
          ...prevStyles,
          ...patch
        } : patch;
        const newCSSText = getCSSFromStyleObject(newStyles);
        node.setStyle(newCSSText);
        cssToStyles.set(newCSSText, newStyles);
      }
      function $patchStyleText(selection, patch) {
        const selectedNodes = selection.getNodes();
        const selectedNodesLength = selectedNodes.length;
        const lastIndex = selectedNodesLength - 1;
        let firstNode = selectedNodes[0];
        let lastNode = selectedNodes[lastIndex];
        if (selection.isCollapsed()) {
          return;
        }
        const anchor = selection.anchor;
        const focus = selection.focus;
        const firstNodeText = firstNode.getTextContent();
        const firstNodeTextLength = firstNodeText.length;
        const focusOffset = focus.offset;
        let anchorOffset = anchor.offset;
        let startOffset;
        let endOffset;
        const isBefore = anchor.isBefore(focus);
        startOffset = isBefore ? anchorOffset : focusOffset;
        endOffset = isBefore ? focusOffset : anchorOffset;
        if (startOffset === firstNode.getTextContentSize()) {
          const nextSibling = firstNode.getNextSibling();
          if (lexical2.$isTextNode(nextSibling)) {
            anchorOffset = 0;
            startOffset = 0;
            firstNode = nextSibling;
          }
        }
        if (firstNode.is(lastNode)) {
          if (lexical2.$isTextNode(firstNode)) {
            startOffset = anchorOffset > focusOffset ? focusOffset : anchorOffset;
            endOffset = anchorOffset > focusOffset ? anchorOffset : focusOffset;
            if (startOffset === endOffset) {
              return;
            }
            if (startOffset === 0 && endOffset === firstNodeTextLength) {
              $patchNodeStyle(firstNode, patch);
              firstNode.select(startOffset, endOffset);
            } else {
              const splitNodes = firstNode.splitText(startOffset, endOffset);
              const replacement = startOffset === 0 ? splitNodes[0] : splitNodes[1];
              $patchNodeStyle(replacement, patch);
              replacement.select(0, endOffset - startOffset);
            }
          }
        } else {
          if (lexical2.$isTextNode(firstNode)) {
            if (startOffset !== 0) {
              firstNode = firstNode.splitText(startOffset)[1];
              startOffset = 0;
            }
            $patchNodeStyle(firstNode, patch);
          }
          if (lexical2.$isTextNode(lastNode)) {
            const lastNodeText = lastNode.getTextContent();
            const lastNodeTextLength = lastNodeText.length;
            if (endOffset !== lastNodeTextLength) {
              [lastNode] = lastNode.splitText(endOffset);
            }
            if (endOffset !== 0) {
              $patchNodeStyle(lastNode, patch);
            }
          }
          for (let i = 1; i < lastIndex; i++) {
            const selectedNode = selectedNodes[i];
            const selectedNodeKey = selectedNode.getKey();
            if (lexical2.$isTextNode(selectedNode) && selectedNodeKey !== firstNode.getKey() && selectedNodeKey !== lastNode.getKey() && !selectedNode.isToken()) {
              $patchNodeStyle(selectedNode, patch);
            }
          }
        }
      }
      function $getSelectionStyleValueForProperty(selection, styleProperty, defaultValue = "") {
        let styleValue = null;
        const nodes = selection.getNodes();
        const anchor = selection.anchor;
        const focus = selection.focus;
        const isBackward = selection.isBackward();
        const endOffset = isBackward ? focus.offset : anchor.offset;
        const endNode = isBackward ? focus.getNode() : anchor.getNode();
        for (let i = 0; i < nodes.length; i++) {
          const node = nodes[i];
          if (i !== 0 && endOffset === 0 && node.is(endNode)) {
            continue;
          }
          if (lexical2.$isTextNode(node)) {
            const nodeStyleValue = $getNodeStyleValueForProperty(node, styleProperty, defaultValue);
            if (styleValue === null) {
              styleValue = nodeStyleValue;
            } else if (styleValue !== nodeStyleValue) {
              styleValue = "";
              break;
            }
          }
        }
        return styleValue === null ? defaultValue : styleValue;
      }
      function $getNodeStyleValueForProperty(node, styleProperty, defaultValue) {
        const css = node.getStyle();
        const styleObject = getStyleObjectFromCSS(css);
        if (styleObject !== null) {
          return styleObject[styleProperty] || defaultValue;
        }
        return defaultValue;
      }
      function $moveCaretSelection(selection, isHoldingShift, isBackward, granularity) {
        selection.modify(isHoldingShift ? "extend" : "move", isBackward, granularity);
      }
      function $isParentElementRTL(selection) {
        const anchorNode = selection.anchor.getNode();
        const parent = lexical2.$isRootNode(anchorNode) ? anchorNode : anchorNode.getParentOrThrow();
        return parent.getDirection() === "rtl";
      }
      function $moveCharacter(selection, isHoldingShift, isBackward) {
        const isRTL = $isParentElementRTL(selection);
        $moveCaretSelection(selection, isHoldingShift, isBackward ? !isRTL : isRTL, "character");
      }
      function $selectAll(selection) {
        const anchor = selection.anchor;
        const focus = selection.focus;
        const anchorNode = anchor.getNode();
        const topParent = anchorNode.getTopLevelElementOrThrow();
        const root = topParent.getParentOrThrow();
        let firstNode = root.getFirstDescendant();
        let lastNode = root.getLastDescendant();
        let firstType = "element";
        let lastType = "element";
        let lastOffset = 0;
        if (lexical2.$isTextNode(firstNode)) {
          firstType = "text";
        } else if (!lexical2.$isElementNode(firstNode) && firstNode !== null) {
          firstNode = firstNode.getParentOrThrow();
        }
        if (lexical2.$isTextNode(lastNode)) {
          lastType = "text";
          lastOffset = lastNode.getTextContentSize();
        } else if (!lexical2.$isElementNode(lastNode) && lastNode !== null) {
          lastNode = lastNode.getParentOrThrow();
        }
        if (firstNode && lastNode) {
          anchor.set(firstNode.getKey(), 0, firstType);
          focus.set(lastNode.getKey(), lastOffset, lastType);
        }
      }
      function $removeParentEmptyElements(startingNode) {
        let node = startingNode;
        while (node !== null && !lexical2.$isRootOrShadowRoot(node)) {
          const latest = node.getLatest();
          const parentNode = node.getParent();
          if (latest.__children.length === 0) {
            node.remove(true);
          }
          node = parentNode;
        }
      }
      function $wrapNodes(selection, createElement, wrappingElement = null) {
        const nodes = selection.getNodes();
        const nodesLength = nodes.length;
        const anchor = selection.anchor;
        if (nodesLength === 0 || nodesLength === 1 && anchor.type === "element" && anchor.getNode().getChildrenSize() === 0) {
          const target = anchor.type === "text" ? anchor.getNode().getParentOrThrow() : anchor.getNode();
          const children = target.getChildren();
          let element = createElement();
          element.setFormat(target.getFormatType());
          element.setIndent(target.getIndent());
          children.forEach((child) => element.append(child));
          if (wrappingElement) {
            element = wrappingElement.append(element);
          }
          target.replace(element);
          return;
        }
        let topLevelNode = null;
        let descendants = [];
        for (let i = 0; i < nodesLength; i++) {
          const node = nodes[i];
          if (lexical2.$isRootOrShadowRoot(node)) {
            $wrapNodesImpl(selection, descendants, descendants.length, createElement, wrappingElement);
            descendants = [];
            topLevelNode = node;
          } else if (topLevelNode === null || topLevelNode !== null && lexical2.$hasAncestor(node, topLevelNode)) {
            descendants.push(node);
          } else {
            $wrapNodesImpl(selection, descendants, descendants.length, createElement, wrappingElement);
            descendants = [node];
          }
        }
        $wrapNodesImpl(selection, descendants, descendants.length, createElement, wrappingElement);
      }
      function $wrapNodesImpl(selection, nodes, nodesLength, createElement, wrappingElement = null) {
        if (nodes.length === 0) {
          return;
        }
        const firstNode = nodes[0];
        const elementMapping = /* @__PURE__ */ new Map();
        const elements = [];
        let target = lexical2.$isElementNode(firstNode) ? firstNode : firstNode.getParentOrThrow();
        if (target.isInline()) {
          target = target.getParentOrThrow();
        }
        let targetIsPrevSibling = false;
        while (target !== null) {
          const prevSibling = target.getPreviousSibling();
          if (prevSibling !== null) {
            target = prevSibling;
            targetIsPrevSibling = true;
            break;
          }
          target = target.getParentOrThrow();
          if (lexical2.$isRootOrShadowRoot(target)) {
            break;
          }
        }
        const emptyElements = /* @__PURE__ */ new Set();
        for (let i = 0; i < nodesLength; i++) {
          const node = nodes[i];
          if (lexical2.$isElementNode(node) && node.getChildrenSize() === 0) {
            emptyElements.add(node.getKey());
          }
        }
        const movedLeafNodes = /* @__PURE__ */ new Set();
        for (let i = 0; i < nodesLength; i++) {
          const node = nodes[i];
          let parent = node.getParent();
          if (parent !== null && parent.isInline()) {
            parent = parent.getParent();
          }
          if (parent !== null && lexical2.$isLeafNode(node) && !movedLeafNodes.has(node.getKey())) {
            const parentKey = parent.getKey();
            if (elementMapping.get(parentKey) === void 0) {
              const targetElement = createElement();
              targetElement.setFormat(parent.getFormatType());
              targetElement.setIndent(parent.getIndent());
              elements.push(targetElement);
              elementMapping.set(parentKey, targetElement);
              parent.getChildren().forEach((child) => {
                targetElement.append(child);
                movedLeafNodes.add(child.getKey());
              });
              $removeParentEmptyElements(parent);
            }
          } else if (emptyElements.has(node.getKey())) {
            const targetElement = createElement();
            targetElement.setFormat(node.getFormatType());
            targetElement.setIndent(node.getIndent());
            elements.push(targetElement);
            node.remove(true);
          }
        }
        if (wrappingElement !== null) {
          for (let i = 0; i < elements.length; i++) {
            const element = elements[i];
            wrappingElement.append(element);
          }
        }
        if (lexical2.$isRootOrShadowRoot(target)) {
          if (targetIsPrevSibling) {
            if (wrappingElement !== null) {
              target.insertAfter(wrappingElement);
            } else {
              for (let i = elements.length - 1; i >= 0; i--) {
                const element = elements[i];
                target.insertAfter(element);
              }
            }
          } else {
            const firstChild = target.getFirstChild();
            if (lexical2.$isElementNode(firstChild)) {
              target = firstChild;
            }
            if (firstChild === null) {
              if (wrappingElement) {
                target.append(wrappingElement);
              } else {
                for (let i = 0; i < elements.length; i++) {
                  const element = elements[i];
                  target.append(element);
                }
              }
            } else {
              if (wrappingElement !== null) {
                firstChild.insertBefore(wrappingElement);
              } else {
                for (let i = 0; i < elements.length; i++) {
                  const element = elements[i];
                  firstChild.insertBefore(element);
                }
              }
            }
          }
        } else {
          if (wrappingElement) {
            target.insertAfter(wrappingElement);
          } else {
            for (let i = elements.length - 1; i >= 0; i--) {
              const element = elements[i];
              target.insertAfter(element);
            }
          }
        }
        const prevSelection = lexical2.$getPreviousSelection();
        if (lexical2.$isRangeSelection(prevSelection) && isPointAttached(prevSelection.anchor) && isPointAttached(prevSelection.focus)) {
          lexical2.$setSelection(prevSelection.clone());
        } else {
          selection.dirty = true;
        }
      }
      function isPointAttached(point) {
        return point.getNode().isAttached();
      }
      function $isAtNodeEnd(point) {
        if (point.type === "text") {
          return point.offset === point.getNode().getTextContentSize();
        }
        return point.offset === point.getNode().getChildrenSize();
      }
      function $shouldOverrideDefaultCharacterSelection(selection, isBackward) {
        const possibleNode = lexical2.$getDecoratorNode(selection.focus, isBackward);
        return lexical2.$isDecoratorNode(possibleNode) && !possibleNode.isIsolated();
      }
      function getDOMTextNode(element) {
        let node = element;
        while (node != null) {
          if (node.nodeType === Node.TEXT_NODE) {
            return node;
          }
          node = node.firstChild;
        }
        return null;
      }
      function getDOMIndexWithinParent(node) {
        const parent = node.parentNode;
        if (parent == null) {
          throw new Error("Should never happen");
        }
        return [parent, Array.from(parent.childNodes).indexOf(node)];
      }
      function createDOMRange(editor, anchorNode, _anchorOffset, focusNode, _focusOffset) {
        const anchorKey = anchorNode.getKey();
        const focusKey = focusNode.getKey();
        const range = document.createRange();
        let anchorDOM = editor.getElementByKey(anchorKey);
        let focusDOM = editor.getElementByKey(focusKey);
        let anchorOffset = _anchorOffset;
        let focusOffset = _focusOffset;
        if (lexical2.$isTextNode(anchorNode)) {
          anchorDOM = getDOMTextNode(anchorDOM);
        }
        if (lexical2.$isTextNode(focusNode)) {
          focusDOM = getDOMTextNode(focusDOM);
        }
        if (anchorNode === void 0 || focusNode === void 0 || anchorDOM === null || focusDOM === null) {
          return null;
        }
        if (anchorDOM.nodeName === "BR") {
          [anchorDOM, anchorOffset] = getDOMIndexWithinParent(anchorDOM);
        }
        if (focusDOM.nodeName === "BR") {
          [focusDOM, focusOffset] = getDOMIndexWithinParent(focusDOM);
        }
        const firstChild = anchorDOM.firstChild;
        if (anchorDOM === focusDOM && firstChild != null && firstChild.nodeName === "BR" && anchorOffset === 0 && focusOffset === 0) {
          focusOffset = 1;
        }
        try {
          range.setStart(anchorDOM, anchorOffset);
          range.setEnd(focusDOM, focusOffset);
        } catch (e) {
          return null;
        }
        if (range.collapsed && (anchorOffset !== focusOffset || anchorKey !== focusKey)) {
          range.setStart(focusDOM, focusOffset);
          range.setEnd(anchorDOM, anchorOffset);
        }
        return range;
      }
      function createRectsFromDOMRange(editor, range) {
        const rootElement = editor.getRootElement();
        if (rootElement === null) {
          return [];
        }
        const rootRect = rootElement.getBoundingClientRect();
        const computedStyle = getComputedStyle(rootElement);
        const rootPadding = parseFloat(computedStyle.paddingLeft) + parseFloat(computedStyle.paddingRight);
        const selectionRects = Array.from(range.getClientRects());
        let selectionRectsLength = selectionRects.length;
        let prevRect;
        for (let i = 0; i < selectionRectsLength; i++) {
          const selectionRect = selectionRects[i];
          const isDuplicateRect = prevRect && prevRect.top === selectionRect.top && prevRect.left === selectionRect.left && prevRect.width === selectionRect.width && prevRect.height === selectionRect.height;
          const selectionSpansElement = selectionRect.width + rootPadding === rootRect.width;
          if (isDuplicateRect || selectionSpansElement) {
            selectionRects.splice(i--, 1);
            selectionRectsLength--;
            continue;
          }
          prevRect = selectionRect;
        }
        return selectionRects;
      }
      function trimTextContentFromAnchor(editor, anchor, delCount) {
        let currentNode = anchor.getNode();
        let remaining = delCount;
        if (lexical2.$isElementNode(currentNode)) {
          const descendantNode = currentNode.getDescendantByIndex(anchor.offset);
          if (descendantNode !== null) {
            currentNode = descendantNode;
          }
        }
        while (remaining > 0 && currentNode !== null) {
          let nextNode = currentNode.getPreviousSibling();
          let additionalElementWhitespace = 0;
          if (nextNode === null) {
            let parent = currentNode.getParentOrThrow();
            let parentSibling = parent.getPreviousSibling();
            while (parentSibling === null) {
              parent = parent.getParent();
              if (parent === null) {
                nextNode = null;
                break;
              }
              parentSibling = parent.getPreviousSibling();
            }
            if (parent !== null) {
              additionalElementWhitespace = parent.isInline() ? 0 : 2;
              if (lexical2.$isElementNode(parentSibling)) {
                nextNode = parentSibling.getLastDescendant();
              } else {
                nextNode = parentSibling;
              }
            }
          }
          let text = currentNode.getTextContent();
          if (text === "" && lexical2.$isElementNode(currentNode) && !currentNode.isInline()) {
            text = "\n\n";
          }
          const textNodeSize = text.length;
          const offset = textNodeSize - remaining;
          const slicedText = text.slice(0, offset);
          if (!lexical2.$isTextNode(currentNode) || remaining >= textNodeSize) {
            const parent = currentNode.getParent();
            currentNode.remove();
            if (parent != null && parent.getChildrenSize() === 0) {
              parent.remove();
            }
            remaining -= textNodeSize + additionalElementWhitespace;
            currentNode = nextNode;
          } else {
            const key = currentNode.getKey();
            const prevTextContent = editor.getEditorState().read(() => {
              const prevNode = lexical2.$getNodeByKey(key);
              if (lexical2.$isTextNode(prevNode) && prevNode.isSimpleText()) {
                return prevNode.getTextContent();
              }
              return null;
            });
            if (prevTextContent !== null && prevTextContent !== text) {
              const prevSelection = lexical2.$getPreviousSelection();
              let target = currentNode;
              if (!currentNode.isSimpleText()) {
                const textNode = lexical2.$createTextNode(prevTextContent);
                currentNode.replace(textNode);
                target = textNode;
              } else {
                currentNode.setTextContent(prevTextContent);
              }
              if (lexical2.$isRangeSelection(prevSelection) && prevSelection.isCollapsed()) {
                const prevOffset = prevSelection.anchor.offset;
                target.select(prevOffset, prevOffset);
              }
            } else if (currentNode.isSimpleText()) {
              const isSelected = anchor.key === key;
              let anchorOffset = anchor.offset;
              if (anchorOffset < remaining) {
                anchorOffset = textNodeSize;
              }
              const splitStart = isSelected ? anchorOffset - remaining : 0;
              const splitEnd = isSelected ? anchorOffset : offset;
              if (isSelected && splitStart === 0) {
                const [excessNode] = currentNode.splitText(splitStart, splitEnd);
                excessNode.remove();
              } else {
                const [, excessNode] = currentNode.splitText(splitStart, splitEnd);
                excessNode.remove();
              }
            } else {
              const textNode = lexical2.$createTextNode(slicedText);
              currentNode.replace(textNode);
            }
            remaining = 0;
          }
        }
      }
      function $sliceSelectedTextNodeContent(selection, textNode) {
        if (textNode.isSelected() && !textNode.isSegmented() && !textNode.isToken() && (lexical2.$isRangeSelection(selection) || lexical2.DEPRECATED_$isGridSelection(selection))) {
          const anchorNode = selection.anchor.getNode();
          const focusNode = selection.focus.getNode();
          const isAnchor = textNode.is(anchorNode);
          const isFocus = textNode.is(focusNode);
          if (isAnchor || isFocus) {
            const isBackward = selection.isBackward();
            const [anchorOffset, focusOffset] = selection.getCharacterOffsets();
            const isSame = anchorNode.is(focusNode);
            const isFirst = textNode.is(isBackward ? focusNode : anchorNode);
            const isLast = textNode.is(isBackward ? anchorNode : focusNode);
            let startOffset = 0;
            let endOffset = void 0;
            if (isSame) {
              startOffset = anchorOffset > focusOffset ? focusOffset : anchorOffset;
              endOffset = anchorOffset > focusOffset ? anchorOffset : focusOffset;
            } else if (isFirst) {
              const offset = isBackward ? focusOffset : anchorOffset;
              startOffset = offset;
              endOffset = void 0;
            } else if (isLast) {
              const offset = isBackward ? anchorOffset : focusOffset;
              startOffset = 0;
              endOffset = offset;
            }
            textNode.__text = textNode.__text.slice(startOffset, endOffset);
            return textNode;
          }
        }
        return textNode;
      }
      exports.$addNodeStyle = $addNodeStyle;
      exports.$cloneContents = $cloneContents;
      exports.$cloneWithProperties = $cloneWithProperties;
      exports.$getSelectionStyleValueForProperty = $getSelectionStyleValueForProperty;
      exports.$isAtNodeEnd = $isAtNodeEnd;
      exports.$isParentElementRTL = $isParentElementRTL;
      exports.$moveCaretSelection = $moveCaretSelection;
      exports.$moveCharacter = $moveCharacter;
      exports.$patchStyleText = $patchStyleText;
      exports.$selectAll = $selectAll;
      exports.$shouldOverrideDefaultCharacterSelection = $shouldOverrideDefaultCharacterSelection;
      exports.$sliceSelectedTextNodeContent = $sliceSelectedTextNodeContent;
      exports.$wrapNodes = $wrapNodes;
      exports.$wrapNodesImpl = $wrapNodesImpl;
      exports.createDOMRange = createDOMRange;
      exports.createRectsFromDOMRange = createRectsFromDOMRange;
      exports.getStyleObjectFromCSS = getStyleObjectFromCSS;
      exports.trimTextContentFromAnchor = trimTextContentFromAnchor;
    }
  });

  // node_modules/@lexical/selection/LexicalSelection.js
  var require_LexicalSelection = __commonJS({
    "node_modules/@lexical/selection/LexicalSelection.js"(exports, module) {
      "use strict";
      var LexicalSelection = true ? require_LexicalSelection_dev() : null;
      module.exports = LexicalSelection;
    }
  });

  // node_modules/@lexical/html/LexicalHtml.dev.js
  var require_LexicalHtml_dev = __commonJS({
    "node_modules/@lexical/html/LexicalHtml.dev.js"(exports) {
      "use strict";
      var selection = require_LexicalSelection();
      var lexical2 = require_Lexical();
      function $generateNodesFromDOM(editor, dom) {
        let lexicalNodes = [];
        const elements = dom.body ? Array.from(dom.body.childNodes) : [];
        const elementsLength = elements.length;
        for (let i = 0; i < elementsLength; i++) {
          const element = elements[i];
          if (!IGNORE_TAGS.has(element.nodeName)) {
            const lexicalNode = $createNodesFromDOM(element, editor);
            if (lexicalNode !== null) {
              lexicalNodes = lexicalNodes.concat(lexicalNode);
            }
          }
        }
        return lexicalNodes;
      }
      function $generateHtmlFromNodes(editor, selection2) {
        if (document == null || window == null) {
          throw new Error("To use $generateHtmlFromNodes in headless mode please initialize a headless browser implementation such as JSDom before calling this function.");
        }
        const container = document.createElement("div");
        const root = lexical2.$getRoot();
        const topLevelChildren = root.getChildren();
        for (let i = 0; i < topLevelChildren.length; i++) {
          const topLevelNode = topLevelChildren[i];
          $appendNodesToHTML(editor, topLevelNode, container, selection2);
        }
        return container.innerHTML;
      }
      function $appendNodesToHTML(editor, currentNode, parentElement, selection$1 = null) {
        let shouldInclude = selection$1 != null ? currentNode.isSelected() : true;
        const shouldExclude = lexical2.$isElementNode(currentNode) && currentNode.excludeFromCopy("html");
        let target = currentNode;
        if (selection$1 !== null) {
          let clone = selection.$cloneWithProperties(currentNode);
          clone = lexical2.$isTextNode(clone) && selection$1 != null ? selection.$sliceSelectedTextNodeContent(selection$1, clone) : clone;
          target = clone;
        }
        const children = lexical2.$isElementNode(target) ? target.getChildren() : [];
        const {
          element,
          after
        } = target.exportDOM(editor);
        if (!element) {
          return false;
        }
        const fragment = new DocumentFragment();
        for (let i = 0; i < children.length; i++) {
          const childNode = children[i];
          const shouldIncludeChild = $appendNodesToHTML(editor, childNode, fragment, selection$1);
          if (!shouldInclude && lexical2.$isElementNode(currentNode) && shouldIncludeChild && currentNode.extractWithChild(childNode, selection$1, "html")) {
            shouldInclude = true;
          }
        }
        if (shouldInclude && !shouldExclude) {
          element.append(fragment);
          parentElement.append(element);
          if (after) {
            const newElement = after.call(target, element);
            if (newElement)
              element.replaceWith(newElement);
          }
        } else {
          parentElement.append(fragment);
        }
        return shouldInclude;
      }
      function getConversionFunction(domNode, editor) {
        const {
          nodeName
        } = domNode;
        const cachedConversions = editor._htmlConversions.get(nodeName.toLowerCase());
        let currentConversion = null;
        if (cachedConversions !== void 0) {
          for (const cachedConversion of cachedConversions) {
            const domConversion = cachedConversion(domNode);
            if (domConversion !== null && (currentConversion === null || currentConversion.priority < domConversion.priority)) {
              currentConversion = domConversion;
            }
          }
        }
        return currentConversion !== null ? currentConversion.conversion : null;
      }
      var IGNORE_TAGS = /* @__PURE__ */ new Set(["STYLE"]);
      function $createNodesFromDOM(node, editor, forChildMap = /* @__PURE__ */ new Map(), parentLexicalNode, preformatted = false) {
        let lexicalNodes = [];
        if (IGNORE_TAGS.has(node.nodeName)) {
          return lexicalNodes;
        }
        let currentLexicalNode = null;
        const transformFunction = getConversionFunction(node, editor);
        const transformOutput = transformFunction ? transformFunction(node, void 0, preformatted) : null;
        let postTransform = null;
        if (transformOutput !== null) {
          postTransform = transformOutput.after;
          currentLexicalNode = transformOutput.node;
          if (currentLexicalNode !== null) {
            for (const [, forChildFunction] of forChildMap) {
              currentLexicalNode = forChildFunction(currentLexicalNode, parentLexicalNode);
              if (!currentLexicalNode) {
                break;
              }
            }
            if (currentLexicalNode) {
              lexicalNodes.push(currentLexicalNode);
            }
          }
          if (transformOutput.forChild != null) {
            forChildMap.set(node.nodeName, transformOutput.forChild);
          }
        }
        const children = node.childNodes;
        let childLexicalNodes = [];
        for (let i = 0; i < children.length; i++) {
          childLexicalNodes.push(...$createNodesFromDOM(children[i], editor, new Map(forChildMap), currentLexicalNode, preformatted || (transformOutput && transformOutput.preformatted) === true));
        }
        if (postTransform != null) {
          childLexicalNodes = postTransform(childLexicalNodes);
        }
        if (currentLexicalNode == null) {
          lexicalNodes = lexicalNodes.concat(childLexicalNodes);
        } else {
          if (lexical2.$isElementNode(currentLexicalNode)) {
            currentLexicalNode.append(...childLexicalNodes);
          }
        }
        return lexicalNodes;
      }
      exports.$generateHtmlFromNodes = $generateHtmlFromNodes;
      exports.$generateNodesFromDOM = $generateNodesFromDOM;
    }
  });

  // node_modules/@lexical/html/LexicalHtml.js
  var require_LexicalHtml = __commonJS({
    "node_modules/@lexical/html/LexicalHtml.js"(exports, module) {
      "use strict";
      var LexicalHtml = true ? require_LexicalHtml_dev() : null;
      module.exports = LexicalHtml;
    }
  });

  // node_modules/@lexical/utils/LexicalUtils.dev.js
  var require_LexicalUtils_dev = __commonJS({
    "node_modules/@lexical/utils/LexicalUtils.dev.js"(exports) {
      "use strict";
      var lexical2 = require_Lexical();
      function addClassNamesToElement(element, ...classNames) {
        classNames.forEach((className) => {
          if (typeof className === "string") {
            element.classList.add(...className.split(" "));
          }
        });
      }
      function removeClassNamesFromElement(element, ...classNames) {
        classNames.forEach((className) => {
          if (typeof className === "string") {
            element.classList.remove(...className.split(" "));
          }
        });
      }
      function $dfs(startingNode, endingNode) {
        const nodes = [];
        const start = (startingNode || lexical2.$getRoot()).getLatest();
        const end = endingNode || (lexical2.$isElementNode(start) ? start.getLastDescendant() : start);
        let node = start;
        let depth = $getDepth(node);
        while (node !== null && !node.is(end)) {
          nodes.push({
            depth,
            node
          });
          if (lexical2.$isElementNode(node) && node.getChildrenSize() > 0) {
            node = node.getFirstChild();
            depth++;
          } else {
            let sibling = null;
            while (sibling === null && node !== null) {
              sibling = node.getNextSibling();
              if (sibling === null) {
                node = node.getParent();
                depth--;
              } else {
                node = sibling;
              }
            }
          }
        }
        if (node !== null && node.is(end)) {
          nodes.push({
            depth,
            node
          });
        }
        return nodes;
      }
      function $getDepth(node) {
        let innerNode = node;
        let depth = 0;
        while ((innerNode = innerNode.getParent()) !== null) {
          depth++;
        }
        return depth;
      }
      function $getNearestNodeOfType(node, klass) {
        let parent = node;
        while (parent != null) {
          if (parent instanceof klass) {
            return parent;
          }
          parent = parent.getParent();
        }
        return null;
      }
      function $getNearestBlockElementAncestorOrThrow(startNode) {
        const blockNode = $findMatchingParent(startNode, (node) => lexical2.$isElementNode(node) && !node.isInline());
        if (!lexical2.$isElementNode(blockNode)) {
          {
            throw Error(`Expected node ${startNode.__key} to have closest block element node.`);
          }
        }
        return blockNode;
      }
      function $findMatchingParent(startingNode, findFn) {
        let curr = startingNode;
        while (curr !== lexical2.$getRoot() && curr != null) {
          if (findFn(curr)) {
            return curr;
          }
          curr = curr.getParent();
        }
        return null;
      }
      function mergeRegister(...func) {
        return () => {
          func.forEach((f) => f());
        };
      }
      function registerNestedElementResolver(editor, targetNode, cloneNode, handleOverlap) {
        const $isTargetNode = (node) => {
          return node instanceof targetNode;
        };
        const $findMatch = (node) => {
          const children = node.getChildren();
          for (let i = 0; i < children.length; i++) {
            const child = children[i];
            if ($isTargetNode(child)) {
              return null;
            }
          }
          let parentNode = node;
          let childNode = node;
          while (parentNode !== null) {
            childNode = parentNode;
            parentNode = parentNode.getParent();
            if ($isTargetNode(parentNode)) {
              return {
                child: childNode,
                parent: parentNode
              };
            }
          }
          return null;
        };
        const elementNodeTransform = (node) => {
          const match = $findMatch(node);
          if (match !== null) {
            const {
              child,
              parent
            } = match;
            if (child.is(node)) {
              handleOverlap(parent, node);
              const nextSiblings = child.getNextSiblings();
              const nextSiblingsLength = nextSiblings.length;
              parent.insertAfter(child);
              if (nextSiblingsLength !== 0) {
                const newParent = cloneNode(parent);
                child.insertAfter(newParent);
                for (let i = 0; i < nextSiblingsLength; i++) {
                  newParent.append(nextSiblings[i]);
                }
              }
              if (!parent.canBeEmpty() && parent.getChildrenSize() === 0) {
                parent.remove();
              }
            }
          }
        };
        return editor.registerNodeTransform(targetNode, elementNodeTransform);
      }
      function unstable_internalCreateNodeFromParse(parsedNode, parsedNodeMap, editor, parentKey, activeEditorState) {
        const nodeType = parsedNode.__type;
        const registeredNode = editor._nodes.get(nodeType);
        if (registeredNode === void 0) {
          {
            throw Error(`createNodeFromParse: type "${nodeType}" + not found`);
          }
        }
        for (const property in parsedNode) {
          const value = parsedNode[property];
          if (value != null && typeof value === "object") {
            const parsedEditorState = value.editorState;
            if (parsedEditorState != null) {
              const nestedEditor = lexical2.createEditor({
                namespace: parsedEditorState.namespace
              });
              nestedEditor._nodes = editor._nodes;
              nestedEditor._parentEditor = editor._parentEditor;
              nestedEditor._pendingEditorState = unstable_convertLegacyJSONEditorState(nestedEditor, parsedEditorState);
              parsedNode[property] = nestedEditor;
            }
          }
        }
        const NodeKlass = registeredNode.klass;
        const parsedKey = parsedNode.__key;
        parsedNode.__key = void 0;
        const node = NodeKlass.clone(parsedNode);
        parsedNode.__key = parsedKey;
        const key = node.__key;
        activeEditorState._nodeMap.set(key, node);
        node.__parent = parentKey;
        if (lexical2.$isElementNode(node)) {
          const children = parsedNode.__children;
          for (let i = 0; i < children.length; i++) {
            const childKey = children[i];
            const parsedChild = parsedNodeMap.get(childKey);
            if (parsedChild !== void 0) {
              const child = unstable_internalCreateNodeFromParse(parsedChild, parsedNodeMap, editor, key, activeEditorState);
              const newChildKey = child.__key;
              node.__children.push(newChildKey);
            }
          }
          node.__indent = parsedNode.__indent;
          node.__format = parsedNode.__format;
          node.__dir = parsedNode.__dir;
        } else if (lexical2.$isTextNode(node)) {
          node.__format = parsedNode.__format;
          node.__style = parsedNode.__style;
          node.__mode = parsedNode.__mode;
          node.__detail = parsedNode.__detail;
        }
        return node;
      }
      function unstable_parseEditorState(parsedEditorState, editor) {
        const EditorStateClass = editor._editorState.constructor;
        const nodeMap = /* @__PURE__ */ new Map();
        const editorState = new EditorStateClass(nodeMap);
        const parsedNodeMap = new Map(parsedEditorState._nodeMap);
        const parsedRoot = parsedNodeMap.get("root");
        const isUpdating = editor._updating;
        try {
          editor._updating = false;
          editor.update(() => {
            const dirtyElements = editor._dirtyElements;
            const dirtyLeaves = editor._dirtyLeaves;
            const dirtyType = editor._dirtyType;
            editor._dirtyElements = /* @__PURE__ */ new Map();
            editor._dirtyLeaves = /* @__PURE__ */ new Set();
            editor._dirtyType = 0;
            try {
              unstable_internalCreateNodeFromParse(parsedRoot, parsedNodeMap, editor, null, editorState);
            } finally {
              editor._dirtyElements = dirtyElements;
              editor._dirtyLeaves = dirtyLeaves;
              editor._dirtyType = dirtyType;
            }
          });
        } finally {
          editor._updating = isUpdating;
        }
        editorState._readOnly = true;
        return editorState;
      }
      function unstable_convertLegacyJSONEditorState(editor, maybeStringifiedEditorState) {
        const parsedEditorState = typeof maybeStringifiedEditorState === "string" ? JSON.parse(maybeStringifiedEditorState) : maybeStringifiedEditorState;
        return unstable_parseEditorState(parsedEditorState, editor);
      }
      function $restoreEditorState(editor, editorState) {
        const FULL_RECONCILE = 2;
        const nodeMap = new Map(editorState._nodeMap);
        const activeEditorState = editor._pendingEditorState;
        if (activeEditorState) {
          activeEditorState._nodeMap = nodeMap;
        }
        editor._dirtyType = FULL_RECONCILE;
        const selection = editorState._selection;
        lexical2.$setSelection(selection === null ? null : selection.clone());
      }
      function $insertNodeToNearestRoot(node) {
        const selection = lexical2.$getSelection();
        if (lexical2.$isRangeSelection(selection)) {
          const focusNode = selection.focus.getNode();
          focusNode.getTopLevelElementOrThrow().insertAfter(node);
        } else if (lexical2.$isNodeSelection(selection) || lexical2.DEPRECATED_$isGridSelection(selection)) {
          const nodes = selection.getNodes();
          nodes[nodes.length - 1].getTopLevelElementOrThrow().insertAfter(node);
        } else {
          const root = lexical2.$getRoot();
          root.append(node);
        }
        const paragraphNode = lexical2.$createParagraphNode();
        node.insertAfter(paragraphNode);
        paragraphNode.select();
        return node.getLatest();
      }
      function $wrapNodeInElement(node, createElementNode) {
        const elementNode = createElementNode();
        node.replace(elementNode);
        elementNode.append(node);
        return elementNode;
      }
      exports.$dfs = $dfs;
      exports.$findMatchingParent = $findMatchingParent;
      exports.$getNearestBlockElementAncestorOrThrow = $getNearestBlockElementAncestorOrThrow;
      exports.$getNearestNodeOfType = $getNearestNodeOfType;
      exports.$insertNodeToNearestRoot = $insertNodeToNearestRoot;
      exports.$restoreEditorState = $restoreEditorState;
      exports.$wrapNodeInElement = $wrapNodeInElement;
      exports.addClassNamesToElement = addClassNamesToElement;
      exports.mergeRegister = mergeRegister;
      exports.registerNestedElementResolver = registerNestedElementResolver;
      exports.removeClassNamesFromElement = removeClassNamesFromElement;
      exports.unstable_convertLegacyJSONEditorState = unstable_convertLegacyJSONEditorState;
    }
  });

  // node_modules/@lexical/utils/LexicalUtils.js
  var require_LexicalUtils = __commonJS({
    "node_modules/@lexical/utils/LexicalUtils.js"(exports, module) {
      "use strict";
      var LexicalUtils = true ? require_LexicalUtils_dev() : null;
      module.exports = LexicalUtils;
    }
  });

  // node_modules/@lexical/list/LexicalList.dev.js
  var require_LexicalList_dev = __commonJS({
    "node_modules/@lexical/list/LexicalList.dev.js"(exports) {
      "use strict";
      var lexical2 = require_Lexical();
      var utils = require_LexicalUtils();
      function $getListDepth(listNode) {
        let depth = 1;
        let parent = listNode.getParent();
        while (parent != null) {
          if ($isListItemNode(parent)) {
            const parentList = parent.getParent();
            if ($isListNode(parentList)) {
              depth++;
              parent = parentList.getParent();
              continue;
            }
            {
              throw Error(`A ListItemNode must have a ListNode for a parent.`);
            }
          }
          return depth;
        }
        return depth;
      }
      function $getTopListNode(listItem) {
        let list2 = listItem.getParent();
        if (!$isListNode(list2)) {
          {
            throw Error(`A ListItemNode must have a ListNode for a parent.`);
          }
        }
        let parent = list2;
        while (parent !== null) {
          parent = parent.getParent();
          if ($isListNode(parent)) {
            list2 = parent;
          }
        }
        return list2;
      }
      function $getAllListItems(node) {
        let listItemNodes = [];
        const listChildren = node.getChildren().filter($isListItemNode);
        for (let i = 0; i < listChildren.length; i++) {
          const listItemNode = listChildren[i];
          const firstChild = listItemNode.getFirstChild();
          if ($isListNode(firstChild)) {
            listItemNodes = listItemNodes.concat($getAllListItems(firstChild));
          } else {
            listItemNodes.push(listItemNode);
          }
        }
        return listItemNodes;
      }
      function isNestedListNode(node) {
        return $isListItemNode(node) && $isListNode(node.getFirstChild());
      }
      function findNearestListItemNode(node) {
        let currentNode = node;
        while (currentNode !== null) {
          if ($isListItemNode(currentNode)) {
            return currentNode;
          }
          currentNode = currentNode.getParent();
        }
        return null;
      }
      function getUniqueListItemNodes(nodeList) {
        const keys = /* @__PURE__ */ new Set();
        for (let i = 0; i < nodeList.length; i++) {
          const node = nodeList[i];
          if ($isListItemNode(node)) {
            keys.add(node);
          }
        }
        return Array.from(keys);
      }
      function $removeHighestEmptyListParent(sublist) {
        let emptyListPtr = sublist;
        while (emptyListPtr.getNextSibling() == null && emptyListPtr.getPreviousSibling() == null) {
          const parent = emptyListPtr.getParent();
          if (parent == null || !($isListItemNode(emptyListPtr) || $isListNode(emptyListPtr))) {
            break;
          }
          emptyListPtr = parent;
        }
        emptyListPtr.remove();
      }
      function wrapInListItem(node) {
        const listItemWrapper = $createListItemNode();
        return listItemWrapper.append(node);
      }
      function $isSelectingEmptyListItem(anchorNode, nodes) {
        return $isListItemNode(anchorNode) && (nodes.length === 0 || nodes.length === 1 && anchorNode.is(nodes[0]) && anchorNode.getChildrenSize() === 0);
      }
      function $getListItemValue(listItem) {
        const list2 = listItem.getParent();
        let value = 1;
        if (list2 != null) {
          if (!$isListNode(list2)) {
            {
              throw Error(`$getListItemValue: list node is not parent of list item node`);
            }
          } else {
            value = list2.getStart();
          }
        }
        const siblings = listItem.getPreviousSiblings();
        for (let i = 0; i < siblings.length; i++) {
          const sibling = siblings[i];
          if ($isListItemNode(sibling) && !$isListNode(sibling.getFirstChild())) {
            value++;
          }
        }
        return value;
      }
      function insertList(editor, listType) {
        editor.update(() => {
          const selection = lexical2.$getSelection();
          if (lexical2.$isRangeSelection(selection)) {
            const nodes = selection.getNodes();
            const anchor = selection.anchor;
            const anchorNode = anchor.getNode();
            const anchorNodeParent = anchorNode.getParent();
            if ($isSelectingEmptyListItem(anchorNode, nodes)) {
              const list2 = $createListNode(listType);
              if (lexical2.$isRootOrShadowRoot(anchorNodeParent)) {
                anchorNode.replace(list2);
                const listItem = $createListItemNode();
                if (lexical2.$isElementNode(anchorNode)) {
                  listItem.setFormat(anchorNode.getFormatType());
                  listItem.setIndent(anchorNode.getIndent());
                }
                list2.append(listItem);
              } else if ($isListItemNode(anchorNode)) {
                const parent = anchorNode.getParentOrThrow();
                append(list2, parent.getChildren());
                parent.replace(list2);
              }
              return;
            } else {
              const handled = /* @__PURE__ */ new Set();
              for (let i = 0; i < nodes.length; i++) {
                const node = nodes[i];
                if (lexical2.$isElementNode(node) && node.isEmpty() && !handled.has(node.getKey())) {
                  createListOrMerge(node, listType);
                  continue;
                }
                if (lexical2.$isLeafNode(node)) {
                  let parent = node.getParent();
                  while (parent != null) {
                    const parentKey = parent.getKey();
                    if ($isListNode(parent)) {
                      if (!handled.has(parentKey)) {
                        const newListNode = $createListNode(listType);
                        append(newListNode, parent.getChildren());
                        parent.replace(newListNode);
                        updateChildrenListItemValue(newListNode);
                        handled.add(parentKey);
                      }
                      break;
                    } else {
                      const nextParent = parent.getParent();
                      if (lexical2.$isRootOrShadowRoot(nextParent) && !handled.has(parentKey)) {
                        handled.add(parentKey);
                        createListOrMerge(parent, listType);
                        break;
                      }
                      parent = nextParent;
                    }
                  }
                }
              }
            }
          }
        });
      }
      function append(node, nodesToAppend) {
        node.splice(node.getChildrenSize(), 0, nodesToAppend);
      }
      function createListOrMerge(node, listType) {
        if ($isListNode(node)) {
          return node;
        }
        const previousSibling = node.getPreviousSibling();
        const nextSibling = node.getNextSibling();
        const listItem = $createListItemNode();
        listItem.setFormat(node.getFormatType());
        listItem.setIndent(node.getIndent());
        append(listItem, node.getChildren());
        if ($isListNode(previousSibling) && listType === previousSibling.getListType()) {
          previousSibling.append(listItem);
          node.remove();
          if ($isListNode(nextSibling) && listType === nextSibling.getListType()) {
            append(previousSibling, nextSibling.getChildren());
            nextSibling.remove();
          }
          return previousSibling;
        } else if ($isListNode(nextSibling) && listType === nextSibling.getListType()) {
          nextSibling.getFirstChildOrThrow().insertBefore(listItem);
          node.remove();
          return nextSibling;
        } else {
          const list2 = $createListNode(listType);
          list2.append(listItem);
          node.replace(list2);
          updateChildrenListItemValue(list2);
          return list2;
        }
      }
      function removeList(editor) {
        editor.update(() => {
          const selection = lexical2.$getSelection();
          if (lexical2.$isRangeSelection(selection)) {
            const listNodes = /* @__PURE__ */ new Set();
            const nodes = selection.getNodes();
            const anchorNode = selection.anchor.getNode();
            if ($isSelectingEmptyListItem(anchorNode, nodes)) {
              listNodes.add($getTopListNode(anchorNode));
            } else {
              for (let i = 0; i < nodes.length; i++) {
                const node = nodes[i];
                if (lexical2.$isLeafNode(node)) {
                  const listItemNode = utils.$getNearestNodeOfType(node, ListItemNode);
                  if (listItemNode != null) {
                    listNodes.add($getTopListNode(listItemNode));
                  }
                }
              }
            }
            for (const listNode of listNodes) {
              let insertionPoint = listNode;
              const listItems = $getAllListItems(listNode);
              for (const listItemNode of listItems) {
                const paragraph = lexical2.$createParagraphNode();
                append(paragraph, listItemNode.getChildren());
                insertionPoint.insertAfter(paragraph);
                insertionPoint = paragraph;
                if (listItemNode.__key === selection.anchor.key) {
                  selection.anchor.set(paragraph.getKey(), 0, "element");
                }
                if (listItemNode.__key === selection.focus.key) {
                  selection.focus.set(paragraph.getKey(), 0, "element");
                }
                listItemNode.remove();
              }
              listNode.remove();
            }
          }
        });
      }
      function updateChildrenListItemValue(list2, children) {
        (children || list2.getChildren()).forEach((child) => {
          const prevValue = child.getValue();
          const nextValue = $getListItemValue(child);
          if (prevValue !== nextValue) {
            child.setValue(nextValue);
          }
        });
      }
      function $handleIndent(listItemNodes) {
        const removed = /* @__PURE__ */ new Set();
        listItemNodes.forEach((listItemNode) => {
          if (isNestedListNode(listItemNode) || removed.has(listItemNode.getKey())) {
            return;
          }
          const parent = listItemNode.getParent();
          const nextSibling = listItemNode.getNextSibling();
          const previousSibling = listItemNode.getPreviousSibling();
          if (isNestedListNode(nextSibling) && isNestedListNode(previousSibling)) {
            const innerList = previousSibling.getFirstChild();
            if ($isListNode(innerList)) {
              innerList.append(listItemNode);
              const nextInnerList = nextSibling.getFirstChild();
              if ($isListNode(nextInnerList)) {
                const children = nextInnerList.getChildren();
                append(innerList, children);
                nextSibling.remove();
                removed.add(nextSibling.getKey());
              }
              updateChildrenListItemValue(innerList);
            }
          } else if (isNestedListNode(nextSibling)) {
            const innerList = nextSibling.getFirstChild();
            if ($isListNode(innerList)) {
              const firstChild = innerList.getFirstChild();
              if (firstChild !== null) {
                firstChild.insertBefore(listItemNode);
              }
              updateChildrenListItemValue(innerList);
            }
          } else if (isNestedListNode(previousSibling)) {
            const innerList = previousSibling.getFirstChild();
            if ($isListNode(innerList)) {
              innerList.append(listItemNode);
              updateChildrenListItemValue(innerList);
            }
          } else {
            if ($isListNode(parent)) {
              const newListItem = $createListItemNode();
              const newList = $createListNode(parent.getListType());
              newListItem.append(newList);
              newList.append(listItemNode);
              if (previousSibling) {
                previousSibling.insertAfter(newListItem);
              } else if (nextSibling) {
                nextSibling.insertBefore(newListItem);
              } else {
                parent.append(newListItem);
              }
            }
          }
          if ($isListNode(parent)) {
            updateChildrenListItemValue(parent);
          }
        });
      }
      function $handleOutdent(listItemNodes) {
        listItemNodes.forEach((listItemNode) => {
          if (isNestedListNode(listItemNode)) {
            return;
          }
          const parentList = listItemNode.getParent();
          const grandparentListItem = parentList ? parentList.getParent() : void 0;
          const greatGrandparentList = grandparentListItem ? grandparentListItem.getParent() : void 0;
          if ($isListNode(greatGrandparentList) && $isListItemNode(grandparentListItem) && $isListNode(parentList)) {
            const firstChild = parentList ? parentList.getFirstChild() : void 0;
            const lastChild = parentList ? parentList.getLastChild() : void 0;
            if (listItemNode.is(firstChild)) {
              grandparentListItem.insertBefore(listItemNode);
              if (parentList.isEmpty()) {
                grandparentListItem.remove();
              }
            } else if (listItemNode.is(lastChild)) {
              grandparentListItem.insertAfter(listItemNode);
              if (parentList.isEmpty()) {
                grandparentListItem.remove();
              }
            } else {
              const listType = parentList.getListType();
              const previousSiblingsListItem = $createListItemNode();
              const previousSiblingsList = $createListNode(listType);
              previousSiblingsListItem.append(previousSiblingsList);
              listItemNode.getPreviousSiblings().forEach((sibling) => previousSiblingsList.append(sibling));
              const nextSiblingsListItem = $createListItemNode();
              const nextSiblingsList = $createListNode(listType);
              nextSiblingsListItem.append(nextSiblingsList);
              append(nextSiblingsList, listItemNode.getNextSiblings());
              grandparentListItem.insertBefore(previousSiblingsListItem);
              grandparentListItem.insertAfter(nextSiblingsListItem);
              grandparentListItem.replace(listItemNode);
            }
            updateChildrenListItemValue(parentList);
            updateChildrenListItemValue(greatGrandparentList);
          }
        });
      }
      function maybeIndentOrOutdent(direction) {
        const selection = lexical2.$getSelection();
        if (!lexical2.$isRangeSelection(selection)) {
          return;
        }
        const selectedNodes = selection.getNodes();
        let listItemNodes = [];
        if (selectedNodes.length === 0) {
          selectedNodes.push(selection.anchor.getNode());
        }
        if (selectedNodes.length === 1) {
          const nearestListItemNode = findNearestListItemNode(selectedNodes[0]);
          if (nearestListItemNode !== null) {
            listItemNodes = [nearestListItemNode];
          }
        } else {
          listItemNodes = getUniqueListItemNodes(selectedNodes);
        }
        if (listItemNodes.length > 0) {
          if (direction === "indent") {
            $handleIndent(listItemNodes);
          } else {
            $handleOutdent(listItemNodes);
          }
        }
      }
      function indentList() {
        maybeIndentOrOutdent("indent");
      }
      function outdentList() {
        maybeIndentOrOutdent("outdent");
      }
      function $handleListInsertParagraph() {
        const selection = lexical2.$getSelection();
        if (!lexical2.$isRangeSelection(selection) || !selection.isCollapsed()) {
          return false;
        }
        const anchor = selection.anchor.getNode();
        if (!$isListItemNode(anchor) || anchor.getTextContent() !== "") {
          return false;
        }
        const topListNode = $getTopListNode(anchor);
        const parent = anchor.getParent();
        if (!$isListNode(parent)) {
          throw Error(`A ListItemNode must have a ListNode for a parent.`);
        }
        const grandparent = parent.getParent();
        let replacementNode;
        if (lexical2.$isRootOrShadowRoot(grandparent)) {
          replacementNode = lexical2.$createParagraphNode();
          topListNode.insertAfter(replacementNode);
        } else if ($isListItemNode(grandparent)) {
          replacementNode = $createListItemNode();
          grandparent.insertAfter(replacementNode);
        } else {
          return false;
        }
        replacementNode.select();
        const nextSiblings = anchor.getNextSiblings();
        if (nextSiblings.length > 0) {
          const newList = $createListNode(parent.getListType());
          if (lexical2.$isParagraphNode(replacementNode)) {
            replacementNode.insertAfter(newList);
          } else {
            const newListItem = $createListItemNode();
            newListItem.append(newList);
            replacementNode.insertAfter(newListItem);
          }
          nextSiblings.forEach((sibling) => {
            sibling.remove();
            newList.append(sibling);
          });
        }
        $removeHighestEmptyListParent(anchor);
        return true;
      }
      var ListItemNode = class extends lexical2.ElementNode {
        static getType() {
          return "listitem";
        }
        static clone(node) {
          return new ListItemNode(node.__value, node.__checked, node.__key);
        }
        constructor(value, checked, key) {
          super(key);
          this.__value = value === void 0 ? 1 : value;
          this.__checked = checked;
        }
        createDOM(config) {
          const element = document.createElement("li");
          const parent = this.getParent();
          if ($isListNode(parent)) {
            updateChildrenListItemValue(parent);
            updateListItemChecked(element, this, null, parent);
          }
          element.value = this.__value;
          $setListItemThemeClassNames(element, config.theme, this);
          return element;
        }
        updateDOM(prevNode, dom, config) {
          const parent = this.getParent();
          if ($isListNode(parent)) {
            updateChildrenListItemValue(parent);
            updateListItemChecked(dom, this, prevNode, parent);
          }
          dom.value = this.__value;
          $setListItemThemeClassNames(dom, config.theme, this);
          return false;
        }
        static importDOM() {
          return {
            li: (node) => ({
              conversion: convertListItemElement,
              priority: 0
            })
          };
        }
        static importJSON(serializedNode) {
          const node = new ListItemNode(serializedNode.value, serializedNode.checked);
          node.setFormat(serializedNode.format);
          node.setIndent(serializedNode.indent);
          node.setDirection(serializedNode.direction);
          return node;
        }
        exportJSON() {
          return {
            ...super.exportJSON(),
            checked: this.getChecked(),
            type: "listitem",
            value: this.getValue(),
            version: 1
          };
        }
        append(...nodes) {
          for (let i = 0; i < nodes.length; i++) {
            const node = nodes[i];
            if (lexical2.$isElementNode(node) && this.canMergeWith(node)) {
              const children = node.getChildren();
              this.append(...children);
              node.remove();
            } else {
              super.append(node);
            }
          }
          return this;
        }
        replace(replaceWithNode) {
          if ($isListItemNode(replaceWithNode)) {
            return super.replace(replaceWithNode);
          }
          const list2 = this.getParentOrThrow();
          if ($isListNode(list2)) {
            const childrenKeys = list2.__children;
            const childrenLength = childrenKeys.length;
            const index = childrenKeys.indexOf(this.__key);
            if (index === 0) {
              list2.insertBefore(replaceWithNode);
            } else if (index === childrenLength - 1) {
              list2.insertAfter(replaceWithNode);
            } else {
              const newList = $createListNode(list2.getListType());
              const children = list2.getChildren();
              for (let i = index + 1; i < childrenLength; i++) {
                const child = children[i];
                newList.append(child);
              }
              list2.insertAfter(replaceWithNode);
              replaceWithNode.insertAfter(newList);
            }
            this.remove();
            if (childrenLength === 1) {
              list2.remove();
            }
          }
          return replaceWithNode;
        }
        insertAfter(node) {
          const listNode = this.getParentOrThrow();
          if (!$isListNode(listNode)) {
            {
              throw Error(`insertAfter: list node is not parent of list item node`);
            }
          }
          const siblings = this.getNextSiblings();
          if ($isListItemNode(node)) {
            const after = super.insertAfter(node);
            const afterListNode = node.getParentOrThrow();
            if ($isListNode(afterListNode)) {
              updateChildrenListItemValue(afterListNode);
            }
            return after;
          }
          if ($isListNode(node) && node.getListType() === listNode.getListType()) {
            let child = node;
            const children = node.getChildren();
            for (let i = children.length - 1; i >= 0; i--) {
              child = children[i];
              this.insertAfter(child);
            }
            return child;
          }
          listNode.insertAfter(node);
          if (siblings.length !== 0) {
            const newListNode = $createListNode(listNode.getListType());
            siblings.forEach((sibling) => newListNode.append(sibling));
            node.insertAfter(newListNode);
          }
          return node;
        }
        remove(preserveEmptyParent) {
          const nextSibling = this.getNextSibling();
          super.remove(preserveEmptyParent);
          if (nextSibling !== null) {
            const parent = nextSibling.getParent();
            if ($isListNode(parent)) {
              updateChildrenListItemValue(parent);
            }
          }
        }
        insertNewAfter() {
          const newElement = $createListItemNode(this.__checked == null ? void 0 : false);
          this.insertAfter(newElement);
          return newElement;
        }
        collapseAtStart(selection) {
          const paragraph = lexical2.$createParagraphNode();
          const children = this.getChildren();
          children.forEach((child) => paragraph.append(child));
          const listNode = this.getParentOrThrow();
          const listNodeParent = listNode.getParentOrThrow();
          const isIndented = $isListItemNode(listNodeParent);
          if (listNode.getChildrenSize() === 1) {
            if (isIndented) {
              listNode.remove();
              listNodeParent.select();
            } else {
              listNode.replace(paragraph);
              const anchor = selection.anchor;
              const focus = selection.focus;
              const key = paragraph.getKey();
              if (anchor.type === "element" && anchor.getNode().is(this)) {
                anchor.set(key, anchor.offset, "element");
              }
              if (focus.type === "element" && focus.getNode().is(this)) {
                focus.set(key, focus.offset, "element");
              }
            }
          } else {
            listNode.insertBefore(paragraph);
            this.remove();
          }
          return true;
        }
        getValue() {
          const self2 = this.getLatest();
          return self2.__value;
        }
        setValue(value) {
          const self2 = this.getWritable();
          self2.__value = value;
        }
        getChecked() {
          const self2 = this.getLatest();
          return self2.__checked;
        }
        setChecked(checked) {
          const self2 = this.getWritable();
          self2.__checked = checked;
        }
        toggleChecked() {
          this.setChecked(!this.__checked);
        }
        getIndent() {
          const parent = this.getParent();
          if (parent === null) {
            return this.getLatest().__indent;
          }
          let listNodeParent = parent.getParentOrThrow();
          let indentLevel = 0;
          while ($isListItemNode(listNodeParent)) {
            listNodeParent = listNodeParent.getParentOrThrow().getParentOrThrow();
            indentLevel++;
          }
          return indentLevel;
        }
        setIndent(indent) {
          let currentIndent = this.getIndent();
          while (currentIndent !== indent) {
            if (currentIndent < indent) {
              $handleIndent([this]);
              currentIndent++;
            } else {
              $handleOutdent([this]);
              currentIndent--;
            }
          }
          return this;
        }
        canIndent() {
          return false;
        }
        insertBefore(nodeToInsert) {
          if ($isListItemNode(nodeToInsert)) {
            const parent = this.getParentOrThrow();
            if ($isListNode(parent)) {
              const siblings = this.getNextSiblings();
              updateChildrenListItemValue(parent, siblings);
            }
          }
          return super.insertBefore(nodeToInsert);
        }
        canInsertAfter(node) {
          return $isListItemNode(node);
        }
        canReplaceWith(replacement) {
          return $isListItemNode(replacement);
        }
        canMergeWith(node) {
          return lexical2.$isParagraphNode(node) || $isListItemNode(node);
        }
        extractWithChild(child, selection) {
          if (!lexical2.$isRangeSelection(selection)) {
            return false;
          }
          const anchorNode = selection.anchor.getNode();
          const focusNode = selection.focus.getNode();
          return this.isParentOf(anchorNode) && this.isParentOf(focusNode) && this.getTextContent().length === selection.getTextContent().length;
        }
      };
      function $setListItemThemeClassNames(dom, editorThemeClasses, node) {
        const classesToAdd = [];
        const classesToRemove = [];
        const listTheme = editorThemeClasses.list;
        const listItemClassName = listTheme ? listTheme.listitem : void 0;
        let nestedListItemClassName;
        if (listTheme && listTheme.nested) {
          nestedListItemClassName = listTheme.nested.listitem;
        }
        if (listItemClassName !== void 0) {
          const listItemClasses = listItemClassName.split(" ");
          classesToAdd.push(...listItemClasses);
        }
        if (listTheme) {
          const parentNode = node.getParent();
          const isCheckList = $isListNode(parentNode) && parentNode.getListType() === "check";
          const checked = node.getChecked();
          if (!isCheckList || checked) {
            classesToRemove.push(listTheme.listitemUnchecked);
          }
          if (!isCheckList || !checked) {
            classesToRemove.push(listTheme.listitemChecked);
          }
          if (isCheckList) {
            classesToAdd.push(checked ? listTheme.listitemChecked : listTheme.listitemUnchecked);
          }
        }
        if (nestedListItemClassName !== void 0) {
          const nestedListItemClasses = nestedListItemClassName.split(" ");
          if (node.getChildren().some((child) => $isListNode(child))) {
            classesToAdd.push(...nestedListItemClasses);
          } else {
            classesToRemove.push(...nestedListItemClasses);
          }
        }
        if (classesToRemove.length > 0) {
          utils.removeClassNamesFromElement(dom, ...classesToRemove);
        }
        if (classesToAdd.length > 0) {
          utils.addClassNamesToElement(dom, ...classesToAdd);
        }
      }
      function updateListItemChecked(dom, listItemNode, prevListItemNode, listNode) {
        const isCheckList = listNode.getListType() === "check";
        if (isCheckList) {
          if ($isListNode(listItemNode.getFirstChild())) {
            dom.removeAttribute("role");
            dom.removeAttribute("tabIndex");
            dom.removeAttribute("aria-checked");
          } else {
            dom.setAttribute("role", "checkbox");
            dom.setAttribute("tabIndex", "-1");
            if (!prevListItemNode || listItemNode.__checked !== prevListItemNode.__checked) {
              dom.setAttribute("aria-checked", listItemNode.getChecked() ? "true" : "false");
            }
          }
        } else {
          if (listItemNode.getChecked() != null) {
            listItemNode.setChecked(void 0);
          }
        }
      }
      function convertListItemElement(domNode) {
        return {
          node: $createListItemNode()
        };
      }
      function $createListItemNode(checked) {
        return new ListItemNode(void 0, checked);
      }
      function $isListItemNode(node) {
        return node instanceof ListItemNode;
      }
      var ListNode = class extends lexical2.ElementNode {
        static getType() {
          return "list";
        }
        static clone(node) {
          const listType = node.__listType || TAG_TO_LIST_TYPE[node.__tag];
          return new ListNode(listType, node.__start, node.__key);
        }
        constructor(listType, start, key) {
          super(key);
          const _listType = TAG_TO_LIST_TYPE[listType] || listType;
          this.__listType = _listType;
          this.__tag = _listType === "number" ? "ol" : "ul";
          this.__start = start;
        }
        getTag() {
          return this.__tag;
        }
        getListType() {
          return this.__listType;
        }
        getStart() {
          return this.__start;
        }
        createDOM(config, _editor) {
          const tag = this.__tag;
          const dom = document.createElement(tag);
          if (this.__start !== 1) {
            dom.setAttribute("start", String(this.__start));
          }
          dom.__lexicalListType = this.__listType;
          setListThemeClassNames(dom, config.theme, this);
          return dom;
        }
        updateDOM(prevNode, dom, config) {
          if (prevNode.__tag !== this.__tag) {
            return true;
          }
          setListThemeClassNames(dom, config.theme, this);
          return false;
        }
        static importDOM() {
          return {
            ol: (node) => ({
              conversion: convertListNode,
              priority: 0
            }),
            ul: (node) => ({
              conversion: convertListNode,
              priority: 0
            })
          };
        }
        static importJSON(serializedNode) {
          const node = $createListNode(serializedNode.listType, serializedNode.start);
          node.setFormat(serializedNode.format);
          node.setIndent(serializedNode.indent);
          node.setDirection(serializedNode.direction);
          return node;
        }
        exportJSON() {
          return {
            ...super.exportJSON(),
            listType: this.getListType(),
            start: this.getStart(),
            tag: this.getTag(),
            type: "list",
            version: 1
          };
        }
        canBeEmpty() {
          return false;
        }
        canIndent() {
          return false;
        }
        append(...nodesToAppend) {
          for (let i = 0; i < nodesToAppend.length; i++) {
            const currentNode = nodesToAppend[i];
            if ($isListItemNode(currentNode)) {
              super.append(currentNode);
            } else {
              const listItemNode = $createListItemNode();
              if ($isListNode(currentNode)) {
                listItemNode.append(currentNode);
              } else {
                const textNode = lexical2.$createTextNode(currentNode.getTextContent());
                listItemNode.append(textNode);
              }
              super.append(listItemNode);
            }
          }
          return this;
        }
        extractWithChild(child) {
          return $isListItemNode(child);
        }
      };
      function setListThemeClassNames(dom, editorThemeClasses, node) {
        const classesToAdd = [];
        const classesToRemove = [];
        const listTheme = editorThemeClasses.list;
        if (listTheme !== void 0) {
          const listLevelsClassNames = listTheme[`${node.__tag}Depth`] || [];
          const listDepth = $getListDepth(node) - 1;
          const normalizedListDepth = listDepth % listLevelsClassNames.length;
          const listLevelClassName = listLevelsClassNames[normalizedListDepth];
          const listClassName = listTheme[node.__tag];
          let nestedListClassName;
          const nestedListTheme = listTheme.nested;
          if (nestedListTheme !== void 0 && nestedListTheme.list) {
            nestedListClassName = nestedListTheme.list;
          }
          if (listClassName !== void 0) {
            classesToAdd.push(listClassName);
          }
          if (listLevelClassName !== void 0) {
            const listItemClasses = listLevelClassName.split(" ");
            classesToAdd.push(...listItemClasses);
            for (let i = 0; i < listLevelsClassNames.length; i++) {
              if (i !== normalizedListDepth) {
                classesToRemove.push(node.__tag + i);
              }
            }
          }
          if (nestedListClassName !== void 0) {
            const nestedListItemClasses = nestedListClassName.split(" ");
            if (listDepth > 1) {
              classesToAdd.push(...nestedListItemClasses);
            } else {
              classesToRemove.push(...nestedListItemClasses);
            }
          }
        }
        if (classesToRemove.length > 0) {
          utils.removeClassNamesFromElement(dom, ...classesToRemove);
        }
        if (classesToAdd.length > 0) {
          utils.addClassNamesToElement(dom, ...classesToAdd);
        }
      }
      function normalizeChildren(nodes) {
        const normalizedListItems = [];
        for (let i = 0; i < nodes.length; i++) {
          const node = nodes[i];
          if ($isListItemNode(node)) {
            normalizedListItems.push(node);
            node.getChildren().forEach((child) => {
              if ($isListNode(child)) {
                normalizedListItems.push(wrapInListItem(child));
              }
            });
          } else {
            normalizedListItems.push(wrapInListItem(node));
          }
        }
        return normalizedListItems;
      }
      function convertListNode(domNode) {
        const nodeName = domNode.nodeName.toLowerCase();
        let node = null;
        if (nodeName === "ol") {
          node = $createListNode("number");
        } else if (nodeName === "ul") {
          node = $createListNode("bullet");
        }
        return {
          after: normalizeChildren,
          node
        };
      }
      var TAG_TO_LIST_TYPE = {
        ol: "number",
        ul: "bullet"
      };
      function $createListNode(listType, start = 1) {
        return new ListNode(listType, start);
      }
      function $isListNode(node) {
        return node instanceof ListNode;
      }
      var INSERT_UNORDERED_LIST_COMMAND = lexical2.createCommand();
      var INSERT_ORDERED_LIST_COMMAND = lexical2.createCommand();
      var INSERT_CHECK_LIST_COMMAND = lexical2.createCommand();
      var REMOVE_LIST_COMMAND = lexical2.createCommand();
      exports.$createListItemNode = $createListItemNode;
      exports.$createListNode = $createListNode;
      exports.$getListDepth = $getListDepth;
      exports.$handleListInsertParagraph = $handleListInsertParagraph;
      exports.$isListItemNode = $isListItemNode;
      exports.$isListNode = $isListNode;
      exports.INSERT_CHECK_LIST_COMMAND = INSERT_CHECK_LIST_COMMAND;
      exports.INSERT_ORDERED_LIST_COMMAND = INSERT_ORDERED_LIST_COMMAND;
      exports.INSERT_UNORDERED_LIST_COMMAND = INSERT_UNORDERED_LIST_COMMAND;
      exports.ListItemNode = ListItemNode;
      exports.ListNode = ListNode;
      exports.REMOVE_LIST_COMMAND = REMOVE_LIST_COMMAND;
      exports.indentList = indentList;
      exports.insertList = insertList;
      exports.outdentList = outdentList;
      exports.removeList = removeList;
    }
  });

  // node_modules/@lexical/list/LexicalList.js
  var require_LexicalList = __commonJS({
    "node_modules/@lexical/list/LexicalList.js"(exports, module) {
      "use strict";
      var LexicalList = true ? require_LexicalList_dev() : null;
      module.exports = LexicalList;
    }
  });

  // node_modules/@lexical/clipboard/LexicalClipboard.dev.js
  var require_LexicalClipboard_dev = __commonJS({
    "node_modules/@lexical/clipboard/LexicalClipboard.dev.js"(exports) {
      "use strict";
      var html = require_LexicalHtml();
      var list2 = require_LexicalList();
      var selection = require_LexicalSelection();
      var utils = require_LexicalUtils();
      var lexical2 = require_Lexical();
      function $getHtmlContent(editor) {
        const selection2 = lexical2.$getSelection();
        if (selection2 == null) {
          throw new Error("Expected valid LexicalSelection");
        }
        if (lexical2.$isRangeSelection(selection2) && selection2.isCollapsed() || selection2.getNodes().length === 0) {
          return null;
        }
        return html.$generateHtmlFromNodes(editor, selection2);
      }
      function $getLexicalContent(editor) {
        const selection2 = lexical2.$getSelection();
        if (selection2 == null) {
          throw new Error("Expected valid LexicalSelection");
        }
        if (lexical2.$isRangeSelection(selection2) && selection2.isCollapsed() || selection2.getNodes().length === 0) {
          return null;
        }
        return JSON.stringify($generateJSONFromSelectedNodes(editor, selection2));
      }
      function $insertDataTransferForPlainText(dataTransfer, selection2) {
        const text = dataTransfer.getData("text/plain");
        if (text != null) {
          selection2.insertRawText(text);
        }
      }
      function $insertDataTransferForRichText(dataTransfer, selection2, editor) {
        const lexicalString = dataTransfer.getData("application/x-lexical-editor");
        if (lexicalString) {
          try {
            const payload = JSON.parse(lexicalString);
            if (payload.namespace === editor._config.namespace && Array.isArray(payload.nodes)) {
              const nodes = $generateNodesFromSerializedNodes(payload.nodes);
              return $insertGeneratedNodes(editor, nodes, selection2);
            }
          } catch {
          }
        }
        const htmlString = dataTransfer.getData("text/html");
        if (htmlString) {
          try {
            const parser = new DOMParser();
            const dom = parser.parseFromString(htmlString, "text/html");
            const nodes = html.$generateNodesFromDOM(editor, dom);
            return $insertGeneratedNodes(editor, nodes, selection2);
          } catch {
          }
        }
        const text = dataTransfer.getData("text/plain");
        if (text != null) {
          if (lexical2.$isRangeSelection(selection2)) {
            const lines = text.split(/\r?\n/);
            const linesLength = lines.length;
            for (let i = 0; i < linesLength; i++) {
              selection2.insertText(lines[i]);
              if (i < linesLength - 1) {
                selection2.insertParagraph();
              }
            }
          } else {
            selection2.insertRawText(text);
          }
        }
      }
      function $insertGeneratedNodes(editor, nodes, selection2) {
        const isSelectionInsideOfGrid = lexical2.DEPRECATED_$isGridSelection(selection2) || utils.$findMatchingParent(selection2.anchor.getNode(), (n) => lexical2.DEPRECATED_$isGridCellNode(n)) !== null && utils.$findMatchingParent(selection2.focus.getNode(), (n) => lexical2.DEPRECATED_$isGridCellNode(n)) !== null;
        if (isSelectionInsideOfGrid && nodes.length === 1 && lexical2.DEPRECATED_$isGridNode(nodes[0])) {
          $mergeGridNodesStrategy(nodes, selection2, false, editor);
          return;
        }
        $basicInsertStrategy(nodes, selection2);
        return;
      }
      function $basicInsertStrategy(nodes, selection2) {
        const topLevelBlocks = [];
        let currentBlock = null;
        let list$1 = null;
        for (let i = 0; i < nodes.length; i++) {
          const node = nodes[i];
          if (list2.$isListItemNode(node)) {
            if (list$1 == null) {
              list$1 = list2.$createListNode("bullet");
              topLevelBlocks.push(list$1);
            }
            list$1.append(node);
            continue;
          } else if (list$1 != null) {
            list$1 = null;
          }
          if (lexical2.$isDecoratorNode(node) && node.isInline() || lexical2.$isElementNode(node) && node.isInline() || lexical2.$isTextNode(node) || lexical2.$isLineBreakNode(node)) {
            if (currentBlock === null) {
              currentBlock = lexical2.$createParagraphNode();
              topLevelBlocks.push(currentBlock);
            }
            if (currentBlock !== null) {
              currentBlock.append(node);
            }
          } else {
            topLevelBlocks.push(node);
            currentBlock = null;
          }
        }
        if (lexical2.$isRangeSelection(selection2)) {
          selection2.insertNodes(topLevelBlocks);
        } else if (lexical2.DEPRECATED_$isGridSelection(selection2)) {
          const anchorCell = selection2.anchor.getNode();
          if (!lexical2.DEPRECATED_$isGridCellNode(anchorCell)) {
            {
              throw Error(`Expected Grid Cell in Grid Selection`);
            }
          }
          anchorCell.append(...topLevelBlocks);
        }
      }
      function $mergeGridNodesStrategy(nodes, selection2, isFromLexical, editor) {
        if (nodes.length !== 1 || !lexical2.DEPRECATED_$isGridNode(nodes[0])) {
          {
            throw Error(`$mergeGridNodesStrategy: Expected Grid insertion.`);
          }
        }
        const newGrid = nodes[0];
        const newGridRows = newGrid.getChildren();
        const newColumnCount = newGrid.getFirstChildOrThrow().getChildrenSize();
        const newRowCount = newGrid.getChildrenSize();
        const gridCellNode = utils.$findMatchingParent(selection2.anchor.getNode(), (n) => lexical2.DEPRECATED_$isGridCellNode(n));
        const gridRowNode = gridCellNode && utils.$findMatchingParent(gridCellNode, (n) => lexical2.DEPRECATED_$isGridRowNode(n));
        const gridNode = gridRowNode && utils.$findMatchingParent(gridRowNode, (n) => lexical2.DEPRECATED_$isGridNode(n));
        if (!lexical2.DEPRECATED_$isGridCellNode(gridCellNode) || !lexical2.DEPRECATED_$isGridRowNode(gridRowNode) || !lexical2.DEPRECATED_$isGridNode(gridNode)) {
          {
            throw Error(`$mergeGridNodesStrategy: Expected selection to be inside of a Grid.`);
          }
        }
        const startY = gridRowNode.getIndexWithinParent();
        const stopY = Math.min(gridNode.getChildrenSize() - 1, startY + newRowCount - 1);
        const startX = gridCellNode.getIndexWithinParent();
        const stopX = Math.min(gridRowNode.getChildrenSize() - 1, startX + newColumnCount - 1);
        const fromX = Math.min(startX, stopX);
        const fromY = Math.min(startY, stopY);
        const toX = Math.max(startX, stopX);
        const toY = Math.max(startY, stopY);
        const gridRowNodes = gridNode.getChildren();
        let newRowIdx = 0;
        let newAnchorCellKey;
        let newFocusCellKey;
        for (let r = fromY; r <= toY; r++) {
          const currentGridRowNode = gridRowNodes[r];
          if (!lexical2.DEPRECATED_$isGridRowNode(currentGridRowNode)) {
            {
              throw Error(`getNodes: expected to find GridRowNode`);
            }
          }
          const newGridRowNode = newGridRows[newRowIdx];
          if (!lexical2.DEPRECATED_$isGridRowNode(newGridRowNode)) {
            {
              throw Error(`getNodes: expected to find GridRowNode`);
            }
          }
          const gridCellNodes = currentGridRowNode.getChildren();
          const newGridCellNodes = newGridRowNode.getChildren();
          let newColumnIdx = 0;
          for (let c = fromX; c <= toX; c++) {
            const currentGridCellNode = gridCellNodes[c];
            if (!lexical2.DEPRECATED_$isGridCellNode(currentGridCellNode)) {
              {
                throw Error(`getNodes: expected to find GridCellNode`);
              }
            }
            const newGridCellNode = newGridCellNodes[newColumnIdx];
            if (!lexical2.DEPRECATED_$isGridCellNode(newGridCellNode)) {
              {
                throw Error(`getNodes: expected to find GridCellNode`);
              }
            }
            if (r === fromY && c === fromX) {
              newAnchorCellKey = currentGridCellNode.getKey();
            } else if (r === toY && c === toX) {
              newFocusCellKey = currentGridCellNode.getKey();
            }
            const originalChildren = currentGridCellNode.getChildren();
            newGridCellNode.getChildren().forEach((child) => {
              if (lexical2.$isTextNode(child)) {
                const paragraphNode = lexical2.$createParagraphNode();
                paragraphNode.append(child);
                currentGridCellNode.append(child);
              } else {
                currentGridCellNode.append(child);
              }
            });
            originalChildren.forEach((n) => n.remove());
            newColumnIdx++;
          }
          newRowIdx++;
        }
        if (newAnchorCellKey && newFocusCellKey) {
          const newGridSelection = lexical2.DEPRECATED_$createGridSelection();
          newGridSelection.set(gridNode.getKey(), newAnchorCellKey, newFocusCellKey);
          lexical2.$setSelection(newGridSelection);
          editor.dispatchCommand(lexical2.SELECTION_CHANGE_COMMAND, void 0);
        }
      }
      function exportNodeToJSON(node) {
        const serializedNode = node.exportJSON();
        const nodeClass = node.constructor;
        if (serializedNode.type !== nodeClass.getType()) {
          {
            throw Error(`LexicalNode: Node ${nodeClass.name} does not implement .exportJSON().`);
          }
        }
        const serializedChildren = serializedNode.children;
        if (lexical2.$isElementNode(node)) {
          if (!Array.isArray(serializedChildren)) {
            {
              throw Error(`LexicalNode: Node ${nodeClass.name} is an element but .exportJSON() does not have a children array.`);
            }
          }
        }
        return serializedNode;
      }
      function $appendNodesToJSON(editor, selection$1, currentNode, targetArray = []) {
        let shouldInclude = selection$1 != null ? currentNode.isSelected() : true;
        const shouldExclude = lexical2.$isElementNode(currentNode) && currentNode.excludeFromCopy("html");
        let target = currentNode;
        if (selection$1 !== null) {
          let clone = selection.$cloneWithProperties(currentNode);
          clone = lexical2.$isTextNode(clone) && selection$1 != null ? selection.$sliceSelectedTextNodeContent(selection$1, clone) : clone;
          target = clone;
        }
        const children = lexical2.$isElementNode(target) ? target.getChildren() : [];
        const serializedNode = exportNodeToJSON(target);
        if (lexical2.$isTextNode(target)) {
          serializedNode.text = target.__text;
        }
        for (let i = 0; i < children.length; i++) {
          const childNode = children[i];
          const shouldIncludeChild = $appendNodesToJSON(editor, selection$1, childNode, serializedNode.children);
          if (!shouldInclude && lexical2.$isElementNode(currentNode) && shouldIncludeChild && currentNode.extractWithChild(childNode, selection$1, "clone")) {
            shouldInclude = true;
          }
        }
        if (shouldInclude && !shouldExclude) {
          targetArray.push(serializedNode);
        } else if (Array.isArray(serializedNode.children)) {
          for (let i = 0; i < serializedNode.children.length; i++) {
            const serializedChildNode = serializedNode.children[i];
            targetArray.push(serializedChildNode);
          }
        }
        return shouldInclude;
      }
      function $generateJSONFromSelectedNodes(editor, selection2) {
        const nodes = [];
        const root = lexical2.$getRoot();
        const topLevelChildren = root.getChildren();
        for (let i = 0; i < topLevelChildren.length; i++) {
          const topLevelNode = topLevelChildren[i];
          $appendNodesToJSON(editor, selection2, topLevelNode, nodes);
        }
        return {
          namespace: editor._config.namespace,
          nodes
        };
      }
      function $generateNodesFromSerializedNodes(serializedNodes) {
        const nodes = [];
        for (let i = 0; i < serializedNodes.length; i++) {
          const serializedNode = serializedNodes[i];
          const node = lexical2.$parseSerializedNode(serializedNode);
          if (lexical2.$isTextNode(node)) {
            selection.$addNodeStyle(node);
          }
          nodes.push(node);
        }
        return nodes;
      }
      exports.$generateJSONFromSelectedNodes = $generateJSONFromSelectedNodes;
      exports.$generateNodesFromSerializedNodes = $generateNodesFromSerializedNodes;
      exports.$getHtmlContent = $getHtmlContent;
      exports.$getLexicalContent = $getLexicalContent;
      exports.$insertDataTransferForPlainText = $insertDataTransferForPlainText;
      exports.$insertDataTransferForRichText = $insertDataTransferForRichText;
      exports.$insertGeneratedNodes = $insertGeneratedNodes;
    }
  });

  // node_modules/@lexical/clipboard/LexicalClipboard.js
  var require_LexicalClipboard = __commonJS({
    "node_modules/@lexical/clipboard/LexicalClipboard.js"(exports, module) {
      "use strict";
      var LexicalClipboard = true ? require_LexicalClipboard_dev() : null;
      module.exports = LexicalClipboard;
    }
  });

  // node_modules/@lexical/plain-text/LexicalPlainText.dev.js
  var require_LexicalPlainText_dev = __commonJS({
    "node_modules/@lexical/plain-text/LexicalPlainText.dev.js"(exports) {
      "use strict";
      var clipboard = require_LexicalClipboard();
      var selection = require_LexicalSelection();
      var utils = require_LexicalUtils();
      var lexical2 = require_Lexical();
      var CAN_USE_DOM = typeof window !== "undefined" && typeof window.document !== "undefined" && typeof window.document.createElement !== "undefined";
      var documentMode = CAN_USE_DOM && "documentMode" in document ? document.documentMode : null;
      CAN_USE_DOM && /Mac|iPod|iPhone|iPad/.test(navigator.platform);
      CAN_USE_DOM && /^(?!.*Seamonkey)(?=.*Firefox).*/i.test(navigator.userAgent);
      var CAN_USE_BEFORE_INPUT = CAN_USE_DOM && "InputEvent" in window && !documentMode ? "getTargetRanges" in new window.InputEvent("input") : false;
      var IS_SAFARI = CAN_USE_DOM && /Version\/[\d.]+.*Safari/.test(navigator.userAgent);
      var IS_IOS = CAN_USE_DOM && /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
      function onCopyForPlainText(event, editor) {
        editor.update(() => {
          const clipboardData = event instanceof KeyboardEvent ? null : event.clipboardData;
          const selection2 = lexical2.$getSelection();
          if (selection2 !== null && clipboardData != null) {
            event.preventDefault();
            const htmlString = clipboard.$getHtmlContent(editor);
            if (htmlString !== null) {
              clipboardData.setData("text/html", htmlString);
            }
            clipboardData.setData("text/plain", selection2.getTextContent());
          }
        });
      }
      function onPasteForPlainText(event, editor) {
        event.preventDefault();
        editor.update(() => {
          const selection2 = lexical2.$getSelection();
          const clipboardData = event instanceof InputEvent || event instanceof KeyboardEvent ? null : event.clipboardData;
          if (clipboardData != null && lexical2.$isRangeSelection(selection2)) {
            clipboard.$insertDataTransferForPlainText(clipboardData, selection2);
          }
        }, {
          tag: "paste"
        });
      }
      function onCutForPlainText(event, editor) {
        onCopyForPlainText(event, editor);
        editor.update(() => {
          const selection2 = lexical2.$getSelection();
          if (lexical2.$isRangeSelection(selection2)) {
            selection2.removeText();
          }
        });
      }
      function registerPlainText(editor) {
        const removeListener = utils.mergeRegister(editor.registerCommand(lexical2.DELETE_CHARACTER_COMMAND, (isBackward) => {
          const selection2 = lexical2.$getSelection();
          if (!lexical2.$isRangeSelection(selection2)) {
            return false;
          }
          selection2.deleteCharacter(isBackward);
          return true;
        }, lexical2.COMMAND_PRIORITY_EDITOR), editor.registerCommand(lexical2.DELETE_WORD_COMMAND, (isBackward) => {
          const selection2 = lexical2.$getSelection();
          if (!lexical2.$isRangeSelection(selection2)) {
            return false;
          }
          selection2.deleteWord(isBackward);
          return true;
        }, lexical2.COMMAND_PRIORITY_EDITOR), editor.registerCommand(lexical2.DELETE_LINE_COMMAND, (isBackward) => {
          const selection2 = lexical2.$getSelection();
          if (!lexical2.$isRangeSelection(selection2)) {
            return false;
          }
          selection2.deleteLine(isBackward);
          return true;
        }, lexical2.COMMAND_PRIORITY_EDITOR), editor.registerCommand(lexical2.CONTROLLED_TEXT_INSERTION_COMMAND, (eventOrText) => {
          const selection2 = lexical2.$getSelection();
          if (!lexical2.$isRangeSelection(selection2)) {
            return false;
          }
          if (typeof eventOrText === "string") {
            selection2.insertText(eventOrText);
          } else {
            const dataTransfer = eventOrText.dataTransfer;
            if (dataTransfer != null) {
              clipboard.$insertDataTransferForPlainText(dataTransfer, selection2);
            } else {
              const data = eventOrText.data;
              if (data) {
                selection2.insertText(data);
              }
            }
          }
          return true;
        }, lexical2.COMMAND_PRIORITY_EDITOR), editor.registerCommand(lexical2.REMOVE_TEXT_COMMAND, () => {
          const selection2 = lexical2.$getSelection();
          if (!lexical2.$isRangeSelection(selection2)) {
            return false;
          }
          selection2.removeText();
          return true;
        }, lexical2.COMMAND_PRIORITY_EDITOR), editor.registerCommand(lexical2.INSERT_LINE_BREAK_COMMAND, (selectStart) => {
          const selection2 = lexical2.$getSelection();
          if (!lexical2.$isRangeSelection(selection2)) {
            return false;
          }
          selection2.insertLineBreak(selectStart);
          return true;
        }, lexical2.COMMAND_PRIORITY_EDITOR), editor.registerCommand(lexical2.INSERT_PARAGRAPH_COMMAND, () => {
          const selection2 = lexical2.$getSelection();
          if (!lexical2.$isRangeSelection(selection2)) {
            return false;
          }
          selection2.insertLineBreak();
          return true;
        }, lexical2.COMMAND_PRIORITY_EDITOR), editor.registerCommand(lexical2.KEY_ARROW_LEFT_COMMAND, (payload) => {
          const selection$1 = lexical2.$getSelection();
          if (!lexical2.$isRangeSelection(selection$1)) {
            return false;
          }
          const event = payload;
          const isHoldingShift = event.shiftKey;
          if (selection.$shouldOverrideDefaultCharacterSelection(selection$1, true)) {
            event.preventDefault();
            selection.$moveCharacter(selection$1, isHoldingShift, true);
            return true;
          }
          return false;
        }, lexical2.COMMAND_PRIORITY_EDITOR), editor.registerCommand(lexical2.KEY_ARROW_RIGHT_COMMAND, (payload) => {
          const selection$1 = lexical2.$getSelection();
          if (!lexical2.$isRangeSelection(selection$1)) {
            return false;
          }
          const event = payload;
          const isHoldingShift = event.shiftKey;
          if (selection.$shouldOverrideDefaultCharacterSelection(selection$1, false)) {
            event.preventDefault();
            selection.$moveCharacter(selection$1, isHoldingShift, false);
            return true;
          }
          return false;
        }, lexical2.COMMAND_PRIORITY_EDITOR), editor.registerCommand(lexical2.KEY_BACKSPACE_COMMAND, (event) => {
          const selection2 = lexical2.$getSelection();
          if (!lexical2.$isRangeSelection(selection2)) {
            return false;
          }
          event.preventDefault();
          return editor.dispatchCommand(lexical2.DELETE_CHARACTER_COMMAND, true);
        }, lexical2.COMMAND_PRIORITY_EDITOR), editor.registerCommand(lexical2.KEY_DELETE_COMMAND, (event) => {
          const selection2 = lexical2.$getSelection();
          if (!lexical2.$isRangeSelection(selection2)) {
            return false;
          }
          event.preventDefault();
          return editor.dispatchCommand(lexical2.DELETE_CHARACTER_COMMAND, false);
        }, lexical2.COMMAND_PRIORITY_EDITOR), editor.registerCommand(lexical2.KEY_ENTER_COMMAND, (event) => {
          const selection2 = lexical2.$getSelection();
          if (!lexical2.$isRangeSelection(selection2)) {
            return false;
          }
          if (event !== null) {
            if ((IS_IOS || IS_SAFARI) && CAN_USE_BEFORE_INPUT) {
              return false;
            }
            event.preventDefault();
          }
          return editor.dispatchCommand(lexical2.INSERT_LINE_BREAK_COMMAND, false);
        }, lexical2.COMMAND_PRIORITY_EDITOR), editor.registerCommand(lexical2.COPY_COMMAND, (event) => {
          const selection2 = lexical2.$getSelection();
          if (!lexical2.$isRangeSelection(selection2)) {
            return false;
          }
          onCopyForPlainText(event, editor);
          return true;
        }, lexical2.COMMAND_PRIORITY_EDITOR), editor.registerCommand(lexical2.CUT_COMMAND, (event) => {
          const selection2 = lexical2.$getSelection();
          if (!lexical2.$isRangeSelection(selection2)) {
            return false;
          }
          onCutForPlainText(event, editor);
          return true;
        }, lexical2.COMMAND_PRIORITY_EDITOR), editor.registerCommand(lexical2.PASTE_COMMAND, (event) => {
          const selection2 = lexical2.$getSelection();
          if (!lexical2.$isRangeSelection(selection2)) {
            return false;
          }
          onPasteForPlainText(event, editor);
          return true;
        }, lexical2.COMMAND_PRIORITY_EDITOR), editor.registerCommand(lexical2.DROP_COMMAND, (event) => {
          const selection2 = lexical2.$getSelection();
          if (!lexical2.$isRangeSelection(selection2)) {
            return false;
          }
          event.preventDefault();
          return true;
        }, lexical2.COMMAND_PRIORITY_EDITOR), editor.registerCommand(lexical2.DRAGSTART_COMMAND, (event) => {
          const selection2 = lexical2.$getSelection();
          if (!lexical2.$isRangeSelection(selection2)) {
            return false;
          }
          event.preventDefault();
          return true;
        }, lexical2.COMMAND_PRIORITY_EDITOR));
        return removeListener;
      }
      exports.registerPlainText = registerPlainText;
    }
  });

  // node_modules/@lexical/plain-text/LexicalPlainText.js
  var require_LexicalPlainText = __commonJS({
    "node_modules/@lexical/plain-text/LexicalPlainText.js"(exports, module) {
      "use strict";
      var LexicalPlainText = true ? require_LexicalPlainText_dev() : null;
      module.exports = LexicalPlainText;
    }
  });

  // node_modules/@lexical/link/LexicalLink.dev.js
  var require_LexicalLink_dev = __commonJS({
    "node_modules/@lexical/link/LexicalLink.dev.js"(exports) {
      "use strict";
      var utils = require_LexicalUtils();
      var lexical2 = require_Lexical();
      var LinkNode = class extends lexical2.ElementNode {
        static getType() {
          return "link";
        }
        static clone(node) {
          return new LinkNode(node.__url, {
            rel: node.__rel,
            target: node.__target
          }, node.__key);
        }
        constructor(url, attributes = {}, key) {
          super(key);
          const {
            target = null,
            rel = null
          } = attributes;
          this.__url = url;
          this.__target = target;
          this.__rel = rel;
        }
        createDOM(config) {
          const element = document.createElement("a");
          element.href = this.__url;
          if (this.__target !== null) {
            element.target = this.__target;
          }
          if (this.__rel !== null) {
            element.rel = this.__rel;
          }
          utils.addClassNamesToElement(element, config.theme.link);
          return element;
        }
        updateDOM(prevNode, anchor, config) {
          const url = this.__url;
          const target = this.__target;
          const rel = this.__rel;
          if (url !== prevNode.__url) {
            anchor.href = url;
          }
          if (target !== prevNode.__target) {
            if (target) {
              anchor.target = target;
            } else {
              anchor.removeAttribute("target");
            }
          }
          if (rel !== prevNode.__rel) {
            if (rel) {
              anchor.rel = rel;
            } else {
              anchor.removeAttribute("rel");
            }
          }
          return false;
        }
        static importDOM() {
          return {
            a: (node) => ({
              conversion: convertAnchorElement,
              priority: 1
            })
          };
        }
        static importJSON(serializedNode) {
          const node = $createLinkNode(serializedNode.url, {
            rel: serializedNode.rel,
            target: serializedNode.target
          });
          node.setFormat(serializedNode.format);
          node.setIndent(serializedNode.indent);
          node.setDirection(serializedNode.direction);
          return node;
        }
        exportJSON() {
          return {
            ...super.exportJSON(),
            rel: this.getRel(),
            target: this.getTarget(),
            type: "link",
            url: this.getURL(),
            version: 1
          };
        }
        getURL() {
          return this.getLatest().__url;
        }
        setURL(url) {
          const writable = this.getWritable();
          writable.__url = url;
        }
        getTarget() {
          return this.getLatest().__target;
        }
        setTarget(target) {
          const writable = this.getWritable();
          writable.__target = target;
        }
        getRel() {
          return this.getLatest().__rel;
        }
        setRel(rel) {
          const writable = this.getWritable();
          writable.__rel = rel;
        }
        insertNewAfter(selection) {
          const element = this.getParentOrThrow().insertNewAfter(selection);
          if (lexical2.$isElementNode(element)) {
            const linkNode = $createLinkNode(this.__url, {
              rel: this.__rel,
              target: this.__target
            });
            element.append(linkNode);
            return linkNode;
          }
          return null;
        }
        canInsertTextBefore() {
          return false;
        }
        canInsertTextAfter() {
          return false;
        }
        canBeEmpty() {
          return false;
        }
        isInline() {
          return true;
        }
        extractWithChild(child, selection, destination) {
          if (!lexical2.$isRangeSelection(selection)) {
            return false;
          }
          const anchorNode = selection.anchor.getNode();
          const focusNode = selection.focus.getNode();
          return this.isParentOf(anchorNode) && this.isParentOf(focusNode) && selection.getTextContent().length > 0;
        }
      };
      function convertAnchorElement(domNode) {
        let node = null;
        if (domNode instanceof HTMLAnchorElement) {
          node = $createLinkNode(domNode.getAttribute("href") || "", {
            rel: domNode.getAttribute("rel"),
            target: domNode.getAttribute("target")
          });
        }
        return {
          node
        };
      }
      function $createLinkNode(url, attributes) {
        return new LinkNode(url, attributes);
      }
      function $isLinkNode(node) {
        return node instanceof LinkNode;
      }
      var AutoLinkNode = class extends LinkNode {
        static getType() {
          return "autolink";
        }
        static clone(node) {
          return new AutoLinkNode(node.__url, {
            rel: node.__rel,
            target: node.__target
          }, node.__key);
        }
        static importJSON(serializedNode) {
          const node = $createAutoLinkNode(serializedNode.url, {
            rel: serializedNode.rel,
            target: serializedNode.target
          });
          node.setFormat(serializedNode.format);
          node.setIndent(serializedNode.indent);
          node.setDirection(serializedNode.direction);
          return node;
        }
        static importDOM() {
          return null;
        }
        exportJSON() {
          return {
            ...super.exportJSON(),
            type: "autolink",
            version: 1
          };
        }
        insertNewAfter(selection) {
          const element = this.getParentOrThrow().insertNewAfter(selection);
          if (lexical2.$isElementNode(element)) {
            const linkNode = $createAutoLinkNode(this.__url, {
              rel: this._rel,
              target: this.__target
            });
            element.append(linkNode);
            return linkNode;
          }
          return null;
        }
      };
      function $createAutoLinkNode(url, attributes) {
        return new AutoLinkNode(url, attributes);
      }
      function $isAutoLinkNode(node) {
        return node instanceof AutoLinkNode;
      }
      var TOGGLE_LINK_COMMAND = lexical2.createCommand();
      function toggleLink(url, attributes = {}) {
        const {
          target,
          rel
        } = attributes;
        const selection = lexical2.$getSelection();
        if (!lexical2.$isRangeSelection(selection)) {
          return;
        }
        const nodes = selection.extract();
        if (url === null) {
          nodes.forEach((node) => {
            const parent = node.getParent();
            if ($isLinkNode(parent)) {
              const children = parent.getChildren();
              for (let i = 0; i < children.length; i++) {
                parent.insertBefore(children[i]);
              }
              parent.remove();
            }
          });
        } else {
          if (nodes.length === 1) {
            const firstNode = nodes[0];
            const linkNode2 = $isLinkNode(firstNode) ? firstNode : $getLinkAncestor(firstNode);
            if (linkNode2 !== null) {
              linkNode2.setURL(url);
              if (target !== void 0) {
                linkNode2.setTarget(target);
              }
              if (rel !== void 0) {
                linkNode2.setRel(rel);
              }
              return;
            }
          }
          let prevParent = null;
          let linkNode = null;
          nodes.forEach((node) => {
            const parent = node.getParent();
            if (parent === linkNode || parent === null || lexical2.$isElementNode(node) && !node.isInline()) {
              return;
            }
            if ($isLinkNode(parent)) {
              linkNode = parent;
              parent.setURL(url);
              if (target !== void 0) {
                parent.setTarget(target);
              }
              if (rel !== void 0) {
                parent.setRel(rel);
              }
              return;
            }
            if (!parent.is(prevParent)) {
              prevParent = parent;
              linkNode = $createLinkNode(url, {
                rel,
                target
              });
              if ($isLinkNode(parent)) {
                if (node.getPreviousSibling() === null) {
                  parent.insertBefore(linkNode);
                } else {
                  parent.insertAfter(linkNode);
                }
              } else {
                node.insertBefore(linkNode);
              }
            }
            if ($isLinkNode(node)) {
              if (node.is(linkNode)) {
                return;
              }
              if (linkNode !== null) {
                const children = node.getChildren();
                for (let i = 0; i < children.length; i++) {
                  linkNode.append(children[i]);
                }
              }
              node.remove();
              return;
            }
            if (linkNode !== null) {
              linkNode.append(node);
            }
          });
        }
      }
      function $getLinkAncestor(node) {
        return $getAncestor(node, (ancestor) => $isLinkNode(ancestor));
      }
      function $getAncestor(node, predicate) {
        let parent = node;
        while (parent !== null && (parent = parent.getParent()) !== null && !predicate(parent))
          ;
        return parent;
      }
      exports.$createAutoLinkNode = $createAutoLinkNode;
      exports.$createLinkNode = $createLinkNode;
      exports.$isAutoLinkNode = $isAutoLinkNode;
      exports.$isLinkNode = $isLinkNode;
      exports.AutoLinkNode = AutoLinkNode;
      exports.LinkNode = LinkNode;
      exports.TOGGLE_LINK_COMMAND = TOGGLE_LINK_COMMAND;
      exports.toggleLink = toggleLink;
    }
  });

  // node_modules/@lexical/link/LexicalLink.js
  var require_LexicalLink = __commonJS({
    "node_modules/@lexical/link/LexicalLink.js"(exports, module) {
      "use strict";
      var LexicalLink = true ? require_LexicalLink_dev() : null;
      module.exports = LexicalLink;
    }
  });

  // node_modules/@lexical/table/LexicalTable.dev.js
  var require_LexicalTable_dev = __commonJS({
    "node_modules/@lexical/table/LexicalTable.dev.js"(exports) {
      "use strict";
      var lexical2 = require_Lexical();
      var utils = require_LexicalUtils();
      var TableCellHeaderStates = {
        BOTH: 3,
        COLUMN: 2,
        NO_STATUS: 0,
        ROW: 1
      };
      var TableCellNode = class extends lexical2.DEPRECATED_GridCellNode {
        static getType() {
          return "tablecell";
        }
        static clone(node) {
          return new TableCellNode(node.__headerState, node.__colSpan, node.__width, node.__key);
        }
        static importDOM() {
          return {
            td: (node) => ({
              conversion: convertTableCellNodeElement,
              priority: 0
            }),
            th: (node) => ({
              conversion: convertTableCellNodeElement,
              priority: 0
            })
          };
        }
        static importJSON(serializedNode) {
          return $createTableCellNode(serializedNode.headerState, serializedNode.colSpan, serializedNode.width || void 0);
        }
        constructor(headerState = TableCellHeaderStates.NO_STATUS, colSpan = 1, width, key) {
          super(colSpan, key);
          this.__headerState = headerState;
          this.__width = width;
        }
        createDOM(config) {
          const element = document.createElement(this.getTag());
          if (this.__width) {
            element.style.width = `${this.__width}px`;
          }
          utils.addClassNamesToElement(element, config.theme.tableCell, this.hasHeader() && config.theme.tableCellHeader);
          return element;
        }
        exportDOM(editor) {
          const {
            element
          } = super.exportDOM(editor);
          if (element) {
            const maxWidth = 700;
            const colCount = this.getParentOrThrow().getChildrenSize();
            element.style.border = "1px solid black";
            element.style.width = `${this.getWidth() || Math.max(90, maxWidth / colCount)}px`;
            element.style.verticalAlign = "top";
            element.style.textAlign = "start";
            if (this.hasHeader()) {
              element.style.backgroundColor = "#f2f3f5";
            }
          }
          return {
            element
          };
        }
        exportJSON() {
          return {
            ...super.exportJSON(),
            colSpan: super.__colSpan,
            headerState: this.__headerState,
            type: "tablecell",
            width: this.getWidth()
          };
        }
        getTag() {
          return this.hasHeader() ? "th" : "td";
        }
        setHeaderStyles(headerState) {
          const self2 = this.getWritable();
          self2.__headerState = headerState;
          return this.__headerState;
        }
        getHeaderStyles() {
          return this.getLatest().__headerState;
        }
        setWidth(width) {
          const self2 = this.getWritable();
          self2.__width = width;
          return this.__width;
        }
        getWidth() {
          return this.getLatest().__width;
        }
        toggleHeaderStyle(headerStateToToggle) {
          const self2 = this.getWritable();
          if ((self2.__headerState & headerStateToToggle) === headerStateToToggle) {
            self2.__headerState -= headerStateToToggle;
          } else {
            self2.__headerState += headerStateToToggle;
          }
          return self2;
        }
        hasHeaderState(headerState) {
          return (this.getHeaderStyles() & headerState) === headerState;
        }
        hasHeader() {
          return this.getLatest().__headerState !== TableCellHeaderStates.NO_STATUS;
        }
        updateDOM(prevNode) {
          return prevNode.__headerState !== this.__headerState || prevNode.__width !== this.__width;
        }
        isShadowRoot() {
          return true;
        }
        collapseAtStart() {
          return true;
        }
        canBeEmpty() {
          return false;
        }
        canIndent() {
          return false;
        }
      };
      function convertTableCellNodeElement(domNode) {
        const nodeName = domNode.nodeName.toLowerCase();
        const tableCellNode = $createTableCellNode(nodeName === "th" ? TableCellHeaderStates.ROW : TableCellHeaderStates.NO_STATUS);
        return {
          forChild: (lexicalNode, parentLexicalNode) => {
            if ($isTableCellNode(parentLexicalNode) && !lexical2.$isElementNode(lexicalNode)) {
              const paragraphNode = lexical2.$createParagraphNode();
              if (lexical2.$isLineBreakNode(lexicalNode) && lexicalNode.getTextContent() === "\n") {
                return null;
              }
              paragraphNode.append(lexicalNode);
              return paragraphNode;
            }
            return lexicalNode;
          },
          node: tableCellNode
        };
      }
      function $createTableCellNode(headerState, colSpan = 1, width) {
        return new TableCellNode(headerState, colSpan, width);
      }
      function $isTableCellNode(node) {
        return node instanceof TableCellNode;
      }
      var TableRowNode = class extends lexical2.DEPRECATED_GridRowNode {
        static getType() {
          return "tablerow";
        }
        static clone(node) {
          return new TableRowNode(node.__height, node.__key);
        }
        static importDOM() {
          return {
            tr: (node) => ({
              conversion: convertTableRowElement,
              priority: 0
            })
          };
        }
        static importJSON(serializedNode) {
          return $createTableRowNode(serializedNode.height);
        }
        constructor(height, key) {
          super(key);
          this.__height = height;
        }
        exportJSON() {
          return {
            ...super.exportJSON(),
            type: "tablerow",
            version: 1
          };
        }
        createDOM(config) {
          const element = document.createElement("tr");
          if (this.__height) {
            element.style.height = `${this.__height}px`;
          }
          utils.addClassNamesToElement(element, config.theme.tableRow);
          return element;
        }
        isShadowRoot() {
          return true;
        }
        setHeight(height) {
          const self2 = this.getWritable();
          self2.__height = height;
          return this.__height;
        }
        getHeight() {
          return this.getLatest().__height;
        }
        updateDOM(prevNode) {
          return prevNode.__height !== this.__height;
        }
        canBeEmpty() {
          return false;
        }
        canIndent() {
          return false;
        }
      };
      function convertTableRowElement(domNode) {
        return {
          node: $createTableRowNode()
        };
      }
      function $createTableRowNode(height) {
        return new TableRowNode(height);
      }
      function $isTableRowNode(node) {
        return node instanceof TableRowNode;
      }
      var CAN_USE_DOM = typeof window !== "undefined" && typeof window.document !== "undefined" && typeof window.document.createElement !== "undefined";
      var getSelection = () => window.getSelection();
      var getDOMSelection = getSelection;
      if (CAN_USE_DOM) {
        const disableNativeSelectionUi = document.createElement("style");
        disableNativeSelectionUi.innerHTML = `
    table.disable-selection {
      -webkit-touch-callout: none;
      -webkit-user-select: none; 
      -khtml-user-select: none; 
      -moz-user-select: none; 
      -ms-user-select: none; 
      user-select: none;
    }
  
    .disable-selection span::selection{
      background-color: transparent;
    }
    .disable-selection br::selection{
      background-color: transparent;
    }
  `;
        if (document.body) {
          document.body.append(disableNativeSelectionUi);
        }
      }
      var TableSelection = class {
        constructor(editor, tableNodeKey) {
          this.isHighlightingCells = false;
          this.startX = -1;
          this.startY = -1;
          this.currentX = -1;
          this.currentY = -1;
          this.listenersToRemove = /* @__PURE__ */ new Set();
          this.tableNodeKey = tableNodeKey;
          this.editor = editor;
          this.grid = {
            cells: [],
            columns: 0,
            rows: 0
          };
          this.gridSelection = null;
          this.anchorCellNodeKey = null;
          this.focusCellNodeKey = null;
          this.anchorCell = null;
          this.focusCell = null;
          this.hasHijackedSelectionStyles = false;
          this.trackTableGrid();
        }
        getGrid() {
          return this.grid;
        }
        removeListeners() {
          Array.from(this.listenersToRemove).forEach((removeListener) => removeListener());
        }
        trackTableGrid() {
          const observer = new MutationObserver((records) => {
            this.editor.update(() => {
              let gridNeedsRedraw = false;
              for (let i = 0; i < records.length; i++) {
                const record = records[i];
                const target = record.target;
                const nodeName = target.nodeName;
                if (nodeName === "TABLE" || nodeName === "TR") {
                  gridNeedsRedraw = true;
                  break;
                }
              }
              if (!gridNeedsRedraw) {
                return;
              }
              const tableElement = this.editor.getElementByKey(this.tableNodeKey);
              if (!tableElement) {
                throw new Error("Expected to find TableElement in DOM");
              }
              this.grid = getTableGrid(tableElement);
            });
          });
          this.editor.update(() => {
            const tableElement = this.editor.getElementByKey(this.tableNodeKey);
            if (!tableElement) {
              throw new Error("Expected to find TableElement in DOM");
            }
            this.grid = getTableGrid(tableElement);
            observer.observe(tableElement, {
              childList: true,
              subtree: true
            });
          });
        }
        clearHighlight() {
          this.editor.update(() => {
            const tableNode = lexical2.$getNodeByKey(this.tableNodeKey);
            if (!$isTableNode(tableNode)) {
              throw new Error("Expected TableNode.");
            }
            const tableElement = this.editor.getElementByKey(this.tableNodeKey);
            if (!tableElement) {
              throw new Error("Expected to find TableElement in DOM");
            }
            const grid = getTableGrid(tableElement);
            this.isHighlightingCells = false;
            this.startX = -1;
            this.startY = -1;
            this.currentX = -1;
            this.currentY = -1;
            this.gridSelection = null;
            this.anchorCellNodeKey = null;
            this.focusCellNodeKey = null;
            this.anchorCell = null;
            this.focusCell = null;
            this.hasHijackedSelectionStyles = false;
            $updateDOMForSelection(grid, null);
            lexical2.$setSelection(null);
            this.editor.dispatchCommand(lexical2.SELECTION_CHANGE_COMMAND, void 0);
            this.enableHighlightStyle();
          });
        }
        enableHighlightStyle() {
          this.editor.update(() => {
            const tableElement = this.editor.getElementByKey(this.tableNodeKey);
            if (!tableElement) {
              throw new Error("Expected to find TableElement in DOM");
            }
            tableElement.classList.remove("disable-selection");
            this.hasHijackedSelectionStyles = false;
          });
        }
        disableHighlightStyle() {
          this.editor.update(() => {
            const tableElement = this.editor.getElementByKey(this.tableNodeKey);
            if (!tableElement) {
              throw new Error("Expected to find TableElement in DOM");
            }
            tableElement.classList.add("disable-selection");
            this.hasHijackedSelectionStyles = true;
          });
        }
        updateTableGridSelection(selection) {
          if (selection != null && selection.gridKey === this.tableNodeKey) {
            this.gridSelection = selection;
            this.isHighlightingCells = true;
            this.disableHighlightStyle();
            $updateDOMForSelection(this.grid, this.gridSelection);
          }
          if (selection == null) {
            this.clearHighlight();
          }
        }
        adjustFocusCellForSelection(cell, ignoreStart = false) {
          this.editor.update(() => {
            const tableNode = lexical2.$getNodeByKey(this.tableNodeKey);
            if (!$isTableNode(tableNode)) {
              throw new Error("Expected TableNode.");
            }
            const tableElement = this.editor.getElementByKey(this.tableNodeKey);
            if (!tableElement) {
              throw new Error("Expected to find TableElement in DOM");
            }
            const cellX = cell.x;
            const cellY = cell.y;
            this.focusCell = cell;
            if (this.anchorCell !== null) {
              const domSelection = getDOMSelection();
              if (domSelection) {
                domSelection.setBaseAndExtent(this.anchorCell.elem, 0, this.anchorCell.elem, 0);
              }
            }
            if (!this.isHighlightingCells && (this.startX !== cellX || this.startY !== cellY || ignoreStart)) {
              this.isHighlightingCells = true;
              this.disableHighlightStyle();
            } else if (cellX === this.currentX && cellY === this.currentY) {
              return;
            }
            this.currentX = cellX;
            this.currentY = cellY;
            if (this.isHighlightingCells) {
              const focusTableCellNode = lexical2.$getNearestNodeFromDOMNode(cell.elem);
              if (this.gridSelection != null && this.anchorCellNodeKey != null && $isTableCellNode(focusTableCellNode)) {
                const focusNodeKey = focusTableCellNode.getKey();
                this.gridSelection = lexical2.DEPRECATED_$createGridSelection();
                this.focusCellNodeKey = focusNodeKey;
                this.gridSelection.set(this.tableNodeKey, this.anchorCellNodeKey, this.focusCellNodeKey);
                lexical2.$setSelection(this.gridSelection);
                this.editor.dispatchCommand(lexical2.SELECTION_CHANGE_COMMAND, void 0);
                $updateDOMForSelection(this.grid, this.gridSelection);
              }
            }
          });
        }
        setAnchorCellForSelection(cell) {
          this.editor.update(() => {
            if (this.anchorCell === cell && this.isHighlightingCells) {
              const domSelection = getDOMSelection();
              if (domSelection) {
                domSelection.setBaseAndExtent(cell.elem, 0, cell.elem, 0);
              }
            }
            this.anchorCell = cell;
            this.startX = cell.x;
            this.startY = cell.y;
            const anchorTableCellNode = lexical2.$getNearestNodeFromDOMNode(cell.elem);
            if ($isTableCellNode(anchorTableCellNode)) {
              const anchorNodeKey = anchorTableCellNode.getKey();
              this.gridSelection = lexical2.DEPRECATED_$createGridSelection();
              this.anchorCellNodeKey = anchorNodeKey;
            }
          });
        }
        formatCells(type) {
          this.editor.update(() => {
            const selection = lexical2.$getSelection();
            if (!lexical2.DEPRECATED_$isGridSelection(selection)) {
              {
                throw Error(`Expected grid selection`);
              }
            }
            const formatSelection = lexical2.$createRangeSelection();
            const anchor = formatSelection.anchor;
            const focus = formatSelection.focus;
            selection.getNodes().forEach((cellNode) => {
              if ($isTableCellNode(cellNode) && cellNode.getTextContentSize() !== 0) {
                anchor.set(cellNode.getKey(), 0, "element");
                focus.set(cellNode.getKey(), cellNode.getChildrenSize(), "element");
                formatSelection.formatText(type);
              }
            });
            lexical2.$setSelection(selection);
            this.editor.dispatchCommand(lexical2.SELECTION_CHANGE_COMMAND, void 0);
          });
        }
        clearText() {
          this.editor.update(() => {
            const tableNode = lexical2.$getNodeByKey(this.tableNodeKey);
            if (!$isTableNode(tableNode)) {
              throw new Error("Expected TableNode.");
            }
            const selection = lexical2.$getSelection();
            if (!lexical2.DEPRECATED_$isGridSelection(selection)) {
              {
                throw Error(`Expected grid selection`);
              }
            }
            const selectedNodes = selection.getNodes().filter($isTableCellNode);
            if (selectedNodes.length === this.grid.columns * this.grid.rows) {
              tableNode.selectPrevious();
              tableNode.remove();
              const rootNode = lexical2.$getRoot();
              rootNode.selectStart();
              return;
            }
            selectedNodes.forEach((cellNode) => {
              if (lexical2.$isElementNode(cellNode)) {
                const paragraphNode = lexical2.$createParagraphNode();
                const textNode = lexical2.$createTextNode();
                paragraphNode.append(textNode);
                cellNode.append(paragraphNode);
                cellNode.getChildren().forEach((child) => {
                  if (child !== paragraphNode) {
                    child.remove();
                  }
                });
              }
            });
            $updateDOMForSelection(this.grid, null);
            lexical2.$setSelection(null);
            this.editor.dispatchCommand(lexical2.SELECTION_CHANGE_COMMAND, void 0);
          });
        }
      };
      var LEXICAL_ELEMENT_KEY = "__lexicalTableSelection";
      function applyTableHandlers(tableNode, tableElement, editor) {
        const rootElement = editor.getRootElement();
        if (rootElement === null) {
          throw new Error("No root element.");
        }
        const tableSelection = new TableSelection(editor, tableNode.getKey());
        attachTableSelectionToTableElement(tableElement, tableSelection);
        let isMouseDown = false;
        let isRangeSelectionHijacked = false;
        tableElement.addEventListener("dblclick", (event) => {
          const cell = getCellFromTarget(event.target);
          if (cell !== null) {
            event.preventDefault();
            event.stopImmediatePropagation();
            event.stopPropagation();
            tableSelection.setAnchorCellForSelection(cell);
            tableSelection.adjustFocusCellForSelection(cell, true);
            isMouseDown = false;
          }
        });
        tableElement.addEventListener("mousedown", (event) => {
          setTimeout(() => {
            if (event.button !== 0) {
              return;
            }
            const cell = getCellFromTarget(event.target);
            if (cell !== null) {
              event.preventDefault();
              event.stopPropagation();
              event.stopImmediatePropagation();
              tableSelection.setAnchorCellForSelection(cell);
            }
          }, 0);
        });
        tableElement.addEventListener("mousemove", (event) => {
          if (isRangeSelectionHijacked) {
            event.preventDefault();
            event.stopPropagation();
            event.stopImmediatePropagation();
          }
          if (isMouseDown) {
            const cell = getCellFromTarget(event.target);
            if (cell !== null) {
              const cellX = cell.x;
              const cellY = cell.y;
              if (isMouseDown && (tableSelection.startX !== cellX || tableSelection.startY !== cellY || tableSelection.isHighlightingCells)) {
                event.preventDefault();
                isMouseDown = true;
                tableSelection.adjustFocusCellForSelection(cell);
              }
            }
          }
        });
        tableElement.addEventListener("mouseleave", () => {
          if (isMouseDown) {
            return;
          }
        });
        const mouseDownCallback = (event) => {
          isMouseDown = true;
          if (event.button !== 0) {
            return;
          }
          editor.update(() => {
            const selection = lexical2.$getSelection();
            if (lexical2.DEPRECATED_$isGridSelection(selection) && selection.gridKey === tableSelection.tableNodeKey && rootElement.contains(event.target)) {
              return tableSelection.clearHighlight();
            }
          });
        };
        window.addEventListener("mousedown", mouseDownCallback);
        tableSelection.listenersToRemove.add(() => window.removeEventListener("mousedown", mouseDownCallback));
        const mouseUpCallback = (event) => {
          if (isMouseDown) {
            event.preventDefault();
            event.stopPropagation();
            event.stopImmediatePropagation();
            isMouseDown = false;
          }
        };
        window.addEventListener("mouseup", mouseUpCallback);
        tableSelection.listenersToRemove.add(() => window.removeEventListener("mouseup", mouseUpCallback));
        tableSelection.listenersToRemove.add(() => tableElement.addEventListener("mouseup", mouseUpCallback));
        tableSelection.listenersToRemove.add(() => tableElement.removeEventListener("mouseup", mouseUpCallback));
        tableSelection.listenersToRemove.add(editor.registerCommand(lexical2.KEY_ARROW_DOWN_COMMAND, (event) => {
          const selection = lexical2.$getSelection();
          if (!$isSelectionInTable(selection, tableNode)) {
            return false;
          }
          const direction = "down";
          if (lexical2.$isRangeSelection(selection)) {
            if (selection.isCollapsed()) {
              const tableCellNode = utils.$findMatchingParent(selection.anchor.getNode(), (n) => $isTableCellNode(n));
              if (!$isTableCellNode(tableCellNode)) {
                return false;
              }
              const currentCords = tableNode.getCordsFromCellNode(tableCellNode, tableSelection.grid);
              const elementParentNode = utils.$findMatchingParent(selection.anchor.getNode(), (n) => lexical2.$isElementNode(n));
              if (elementParentNode == null) {
                throw new Error("Expected BlockNode Parent");
              }
              const lastChild = tableCellNode.getLastChild();
              const isSelectionInLastBlock = lastChild && elementParentNode.isParentOf(lastChild) || elementParentNode === lastChild;
              if (isSelectionInLastBlock || event.shiftKey) {
                event.preventDefault();
                event.stopImmediatePropagation();
                event.stopPropagation();
                if (event.shiftKey) {
                  tableSelection.setAnchorCellForSelection(tableNode.getCellFromCordsOrThrow(currentCords.x, currentCords.y, tableSelection.grid));
                  return adjustFocusNodeInDirection(tableSelection, tableNode, currentCords.x, currentCords.y, direction);
                }
                return selectGridNodeInDirection(tableSelection, tableNode, currentCords.x, currentCords.y, direction);
              }
            }
          } else if (lexical2.DEPRECATED_$isGridSelection(selection) && event.shiftKey) {
            const tableCellNode = selection.focus.getNode();
            if (!$isTableCellNode(tableCellNode)) {
              return false;
            }
            const currentCords = tableNode.getCordsFromCellNode(tableCellNode, tableSelection.grid);
            event.preventDefault();
            event.stopImmediatePropagation();
            event.stopPropagation();
            return adjustFocusNodeInDirection(tableSelection, tableNode, currentCords.x, currentCords.y, direction);
          }
          return false;
        }, lexical2.COMMAND_PRIORITY_CRITICAL));
        tableSelection.listenersToRemove.add(editor.registerCommand(lexical2.KEY_ARROW_UP_COMMAND, (event) => {
          const selection = lexical2.$getSelection();
          if (!$isSelectionInTable(selection, tableNode)) {
            return false;
          }
          const direction = "up";
          if (lexical2.$isRangeSelection(selection)) {
            if (selection.isCollapsed()) {
              const tableCellNode = utils.$findMatchingParent(selection.anchor.getNode(), (n) => $isTableCellNode(n));
              if (!$isTableCellNode(tableCellNode)) {
                return false;
              }
              const currentCords = tableNode.getCordsFromCellNode(tableCellNode, tableSelection.grid);
              const elementParentNode = utils.$findMatchingParent(selection.anchor.getNode(), (n) => lexical2.$isElementNode(n));
              if (elementParentNode == null) {
                throw new Error("Expected BlockNode Parent");
              }
              const lastChild = tableCellNode.getLastChild();
              const isSelectionInLastBlock = lastChild && elementParentNode.isParentOf(lastChild) || elementParentNode === lastChild;
              if (isSelectionInLastBlock || event.shiftKey) {
                event.preventDefault();
                event.stopImmediatePropagation();
                event.stopPropagation();
                if (event.shiftKey) {
                  tableSelection.setAnchorCellForSelection(tableNode.getCellFromCordsOrThrow(currentCords.x, currentCords.y, tableSelection.grid));
                  return adjustFocusNodeInDirection(tableSelection, tableNode, currentCords.x, currentCords.y, direction);
                }
                return selectGridNodeInDirection(tableSelection, tableNode, currentCords.x, currentCords.y, direction);
              }
            }
          } else if (lexical2.DEPRECATED_$isGridSelection(selection) && event.shiftKey) {
            const tableCellNode = selection.focus.getNode();
            if (!$isTableCellNode(tableCellNode)) {
              return false;
            }
            const currentCords = tableNode.getCordsFromCellNode(tableCellNode, tableSelection.grid);
            event.preventDefault();
            event.stopImmediatePropagation();
            event.stopPropagation();
            return adjustFocusNodeInDirection(tableSelection, tableNode, currentCords.x, currentCords.y, direction);
          }
          return false;
        }, lexical2.COMMAND_PRIORITY_CRITICAL));
        tableSelection.listenersToRemove.add(editor.registerCommand(lexical2.KEY_ARROW_LEFT_COMMAND, (event) => {
          const selection = lexical2.$getSelection();
          if (!$isSelectionInTable(selection, tableNode)) {
            return false;
          }
          const direction = "backward";
          if (lexical2.$isRangeSelection(selection)) {
            if (selection.isCollapsed()) {
              const tableCellNode = utils.$findMatchingParent(selection.anchor.getNode(), (n) => $isTableCellNode(n));
              if (!$isTableCellNode(tableCellNode)) {
                return false;
              }
              const currentCords = tableNode.getCordsFromCellNode(tableCellNode, tableSelection.grid);
              const elementParentNode = utils.$findMatchingParent(selection.anchor.getNode(), (n) => lexical2.$isElementNode(n));
              if (elementParentNode == null) {
                throw new Error("Expected BlockNode Parent");
              }
              if (selection.anchor.offset === 0 || event.shiftKey) {
                event.preventDefault();
                event.stopImmediatePropagation();
                event.stopPropagation();
                if (event.shiftKey) {
                  tableSelection.setAnchorCellForSelection(tableNode.getCellFromCordsOrThrow(currentCords.x, currentCords.y, tableSelection.grid));
                  return adjustFocusNodeInDirection(tableSelection, tableNode, currentCords.x, currentCords.y, direction);
                }
                return selectGridNodeInDirection(tableSelection, tableNode, currentCords.x, currentCords.y, direction);
              }
            }
          } else if (lexical2.DEPRECATED_$isGridSelection(selection) && event.shiftKey) {
            const tableCellNode = selection.focus.getNode();
            if (!$isTableCellNode(tableCellNode)) {
              return false;
            }
            const currentCords = tableNode.getCordsFromCellNode(tableCellNode, tableSelection.grid);
            event.preventDefault();
            event.stopImmediatePropagation();
            event.stopPropagation();
            return adjustFocusNodeInDirection(tableSelection, tableNode, currentCords.x, currentCords.y, direction);
          }
          return false;
        }, lexical2.COMMAND_PRIORITY_CRITICAL));
        tableSelection.listenersToRemove.add(editor.registerCommand(lexical2.KEY_ARROW_RIGHT_COMMAND, (event) => {
          const selection = lexical2.$getSelection();
          if (!$isSelectionInTable(selection, tableNode)) {
            return false;
          }
          const direction = "forward";
          if (lexical2.$isRangeSelection(selection)) {
            if (selection.isCollapsed()) {
              const tableCellNode = utils.$findMatchingParent(selection.anchor.getNode(), (n) => $isTableCellNode(n));
              if (!$isTableCellNode(tableCellNode)) {
                return false;
              }
              const currentCords = tableNode.getCordsFromCellNode(tableCellNode, tableSelection.grid);
              const elementParentNode = utils.$findMatchingParent(selection.anchor.getNode(), (n) => lexical2.$isElementNode(n));
              if (elementParentNode == null) {
                throw new Error("Expected BlockNode Parent");
              }
              if (selection.anchor.offset === selection.anchor.getNode().getTextContentSize() || event.shiftKey) {
                event.preventDefault();
                event.stopImmediatePropagation();
                event.stopPropagation();
                if (event.shiftKey) {
                  tableSelection.setAnchorCellForSelection(tableNode.getCellFromCordsOrThrow(currentCords.x, currentCords.y, tableSelection.grid));
                  return adjustFocusNodeInDirection(tableSelection, tableNode, currentCords.x, currentCords.y, direction);
                }
                return selectGridNodeInDirection(tableSelection, tableNode, currentCords.x, currentCords.y, direction);
              }
            }
          } else if (lexical2.DEPRECATED_$isGridSelection(selection) && event.shiftKey) {
            const tableCellNode = selection.focus.getNode();
            if (!$isTableCellNode(tableCellNode)) {
              return false;
            }
            const currentCords = tableNode.getCordsFromCellNode(tableCellNode, tableSelection.grid);
            event.preventDefault();
            event.stopImmediatePropagation();
            event.stopPropagation();
            return adjustFocusNodeInDirection(tableSelection, tableNode, currentCords.x, currentCords.y, direction);
          }
          return false;
        }, lexical2.COMMAND_PRIORITY_CRITICAL));
        const deleteTextHandler = (command) => () => {
          const selection = lexical2.$getSelection();
          if (!$isSelectionInTable(selection, tableNode)) {
            return false;
          }
          if (lexical2.DEPRECATED_$isGridSelection(selection)) {
            tableSelection.clearText();
            return true;
          } else if (lexical2.$isRangeSelection(selection)) {
            const tableCellNode = utils.$findMatchingParent(selection.anchor.getNode(), (n) => $isTableCellNode(n));
            if (!$isTableCellNode(tableCellNode)) {
              return false;
            }
            const anchorNode = selection.anchor.getNode();
            const focusNode = selection.focus.getNode();
            const isAnchorInside = tableNode.isParentOf(anchorNode);
            const isFocusInside = tableNode.isParentOf(focusNode);
            const selectionContainsPartialTable = isAnchorInside && !isFocusInside || isFocusInside && !isAnchorInside;
            if (selectionContainsPartialTable) {
              tableSelection.clearText();
              return true;
            }
            const parentElementNode = utils.$findMatchingParent(selection.anchor.getNode(), (n) => lexical2.$isElementNode(n) && $isTableCellNode(n.getParent()));
            const nearestElementNode = utils.$findMatchingParent(selection.anchor.getNode(), (n) => lexical2.$isElementNode(n));
            if (!lexical2.$isElementNode(parentElementNode) || !lexical2.$isElementNode(nearestElementNode)) {
              return false;
            }
            const clearCell = () => {
              const newParagraphNode = lexical2.$createParagraphNode();
              const textNode = lexical2.$createTextNode();
              newParagraphNode.append(textNode);
              tableCellNode.append(newParagraphNode);
              tableCellNode.getChildren().forEach((child) => {
                if (child !== newParagraphNode) {
                  child.remove();
                }
              });
            };
            if (command === lexical2.DELETE_LINE_COMMAND && parentElementNode.getPreviousSibling() === null) {
              clearCell();
              return true;
            }
            if (command === lexical2.DELETE_CHARACTER_COMMAND || command === lexical2.DELETE_WORD_COMMAND) {
              if (selection.isCollapsed() && selection.anchor.offset === 0 && parentElementNode === nearestElementNode && parentElementNode.getPreviousSibling() === null) {
                return true;
              }
              if (!lexical2.$isParagraphNode(parentElementNode) && parentElementNode.getTextContentSize() === 0) {
                clearCell();
                return true;
              }
            }
          }
          return false;
        };
        [lexical2.DELETE_WORD_COMMAND, lexical2.DELETE_LINE_COMMAND, lexical2.DELETE_CHARACTER_COMMAND].forEach((command) => {
          tableSelection.listenersToRemove.add(editor.registerCommand(command, deleteTextHandler(command), lexical2.COMMAND_PRIORITY_CRITICAL));
        });
        const deleteCellHandler = (event) => {
          const selection = lexical2.$getSelection();
          if (!$isSelectionInTable(selection, tableNode)) {
            return false;
          }
          if (lexical2.DEPRECATED_$isGridSelection(selection)) {
            event.preventDefault();
            event.stopPropagation();
            tableSelection.clearText();
            return true;
          } else if (lexical2.$isRangeSelection(selection)) {
            const tableCellNode = utils.$findMatchingParent(selection.anchor.getNode(), (n) => $isTableCellNode(n));
            if (!$isTableCellNode(tableCellNode)) {
              return false;
            }
          }
          return false;
        };
        tableSelection.listenersToRemove.add(editor.registerCommand(lexical2.KEY_BACKSPACE_COMMAND, deleteCellHandler, lexical2.COMMAND_PRIORITY_CRITICAL));
        tableSelection.listenersToRemove.add(editor.registerCommand(lexical2.KEY_DELETE_COMMAND, deleteCellHandler, lexical2.COMMAND_PRIORITY_CRITICAL));
        tableSelection.listenersToRemove.add(editor.registerCommand(lexical2.FORMAT_TEXT_COMMAND, (payload) => {
          const selection = lexical2.$getSelection();
          if (!$isSelectionInTable(selection, tableNode)) {
            return false;
          }
          if (lexical2.DEPRECATED_$isGridSelection(selection)) {
            tableSelection.formatCells(payload);
            return true;
          } else if (lexical2.$isRangeSelection(selection)) {
            const tableCellNode = utils.$findMatchingParent(selection.anchor.getNode(), (n) => $isTableCellNode(n));
            if (!$isTableCellNode(tableCellNode)) {
              return false;
            }
          }
          return false;
        }, lexical2.COMMAND_PRIORITY_CRITICAL));
        tableSelection.listenersToRemove.add(editor.registerCommand(lexical2.CONTROLLED_TEXT_INSERTION_COMMAND, (payload) => {
          const selection = lexical2.$getSelection();
          if (!$isSelectionInTable(selection, tableNode)) {
            return false;
          }
          if (lexical2.DEPRECATED_$isGridSelection(selection)) {
            tableSelection.clearHighlight();
            return false;
          } else if (lexical2.$isRangeSelection(selection)) {
            const tableCellNode = utils.$findMatchingParent(selection.anchor.getNode(), (n) => $isTableCellNode(n));
            if (!$isTableCellNode(tableCellNode)) {
              return false;
            }
          }
          return false;
        }, lexical2.COMMAND_PRIORITY_CRITICAL));
        tableSelection.listenersToRemove.add(editor.registerCommand(lexical2.KEY_TAB_COMMAND, (event) => {
          const selection = lexical2.$getSelection();
          if (!$isSelectionInTable(selection, tableNode)) {
            return false;
          }
          if (lexical2.$isRangeSelection(selection)) {
            const tableCellNode = utils.$findMatchingParent(selection.anchor.getNode(), (n) => $isTableCellNode(n));
            if (!$isTableCellNode(tableCellNode)) {
              return false;
            }
            if (selection.isCollapsed()) {
              const currentCords = tableNode.getCordsFromCellNode(tableCellNode, tableSelection.grid);
              event.preventDefault();
              selectGridNodeInDirection(tableSelection, tableNode, currentCords.x, currentCords.y, !event.shiftKey ? "forward" : "backward");
              return true;
            }
          }
          return false;
        }, lexical2.COMMAND_PRIORITY_CRITICAL));
        tableSelection.listenersToRemove.add(editor.registerCommand(lexical2.FOCUS_COMMAND, (payload) => {
          return tableNode.isSelected();
        }, lexical2.COMMAND_PRIORITY_CRITICAL));
        tableSelection.listenersToRemove.add(editor.registerCommand(lexical2.SELECTION_CHANGE_COMMAND, (payload) => {
          const selection = lexical2.$getSelection();
          const prevSelection = lexical2.$getPreviousSelection();
          if (selection && lexical2.$isRangeSelection(selection) && !selection.isCollapsed()) {
            const anchorNode = selection.anchor.getNode();
            const focusNode = selection.focus.getNode();
            const isAnchorInside = tableNode.isParentOf(anchorNode);
            const isFocusInside = tableNode.isParentOf(focusNode);
            const selectionContainsPartialTable = isAnchorInside && !isFocusInside || isFocusInside && !isAnchorInside;
            const selectionIsInsideTable = isAnchorInside && isFocusInside && !tableNode.isSelected();
            if (selectionContainsPartialTable) {
              const isBackward = selection.isBackward();
              const modifiedSelection = lexical2.$createRangeSelection();
              const tableKey = tableNode.getKey();
              modifiedSelection.anchor.set(selection.anchor.key, selection.anchor.offset, selection.anchor.type);
              modifiedSelection.focus.set(tableKey, isBackward ? 0 : tableNode.getChildrenSize(), "element");
              isRangeSelectionHijacked = true;
              lexical2.$setSelection(modifiedSelection);
              $addHighlightStyleToTable(tableSelection);
              return true;
            } else if (selectionIsInsideTable) {
              const {
                grid
              } = tableSelection;
              if (selection.getNodes().filter($isTableCellNode).length === grid.rows * grid.columns) {
                const gridSelection = lexical2.DEPRECATED_$createGridSelection();
                const tableKey = tableNode.getKey();
                const firstCell = tableNode.getFirstChildOrThrow().getFirstChild();
                const lastCell = tableNode.getLastChildOrThrow().getLastChild();
                if (firstCell != null && lastCell != null) {
                  gridSelection.set(tableKey, firstCell.getKey(), lastCell.getKey());
                  lexical2.$setSelection(gridSelection);
                  tableSelection.updateTableGridSelection(gridSelection);
                  return true;
                }
              }
            }
          }
          if (selection && !selection.is(prevSelection) && (lexical2.DEPRECATED_$isGridSelection(selection) || lexical2.DEPRECATED_$isGridSelection(prevSelection)) && tableSelection.gridSelection && !tableSelection.gridSelection.is(prevSelection)) {
            if (lexical2.DEPRECATED_$isGridSelection(selection) && selection.gridKey === tableSelection.tableNodeKey) {
              tableSelection.updateTableGridSelection(selection);
            } else if (!lexical2.DEPRECATED_$isGridSelection(selection) && lexical2.DEPRECATED_$isGridSelection(prevSelection) && prevSelection.gridKey === tableSelection.tableNodeKey) {
              tableSelection.updateTableGridSelection(null);
            }
            return false;
          }
          if (tableSelection.hasHijackedSelectionStyles && !tableNode.isSelected()) {
            $removeHighlightStyleToTable(tableSelection);
            isRangeSelectionHijacked = false;
          } else if (!tableSelection.hasHijackedSelectionStyles && tableNode.isSelected()) {
            $addHighlightStyleToTable(tableSelection);
          }
          return false;
        }, lexical2.COMMAND_PRIORITY_CRITICAL));
        return tableSelection;
      }
      function attachTableSelectionToTableElement(tableElement, tableSelection) {
        tableElement[LEXICAL_ELEMENT_KEY] = tableSelection;
      }
      function getTableSelectionFromTableElement(tableElement) {
        return tableElement[LEXICAL_ELEMENT_KEY];
      }
      function getCellFromTarget(node) {
        let currentNode = node;
        while (currentNode != null) {
          const nodeName = currentNode.nodeName;
          if (nodeName === "TD" || nodeName === "TH") {
            const cell = currentNode._cell;
            if (cell === void 0) {
              return null;
            }
            return cell;
          }
          currentNode = currentNode.parentNode;
        }
        return null;
      }
      function getTableGrid(tableElement) {
        const cells = [];
        const grid = {
          cells,
          columns: 0,
          rows: 0
        };
        let currentNode = tableElement.firstChild;
        let x = 0;
        let y = 0;
        cells.length = 0;
        while (currentNode != null) {
          const nodeMame = currentNode.nodeName;
          if (nodeMame === "TD" || nodeMame === "TH") {
            const elem = currentNode;
            const cell = {
              elem,
              highlighted: false,
              x,
              y
            };
            currentNode._cell = cell;
            if (cells[y] === void 0) {
              cells[y] = [];
            }
            cells[y][x] = cell;
          } else {
            const child = currentNode.firstChild;
            if (child != null) {
              currentNode = child;
              continue;
            }
          }
          const sibling = currentNode.nextSibling;
          if (sibling != null) {
            x++;
            currentNode = sibling;
            continue;
          }
          const parent = currentNode.parentNode;
          if (parent != null) {
            const parentSibling = parent.nextSibling;
            if (parentSibling == null) {
              break;
            }
            y++;
            x = 0;
            currentNode = parentSibling;
          }
        }
        grid.columns = x + 1;
        grid.rows = y + 1;
        return grid;
      }
      function $updateDOMForSelection(grid, selection) {
        const highlightedCells = [];
        const selectedCellNodes = new Set(selection ? selection.getNodes() : []);
        $forEachGridCell(grid, (cell, lexicalNode) => {
          const elem = cell.elem;
          if (selectedCellNodes.has(lexicalNode)) {
            cell.highlighted = true;
            elem.style.setProperty("background-color", "rgb(172, 206, 247)");
            elem.style.setProperty("caret-color", "transparent");
            highlightedCells.push(cell);
          } else {
            cell.highlighted = false;
            elem.style.removeProperty("background-color");
            elem.style.removeProperty("caret-color");
            if (!elem.getAttribute("style")) {
              elem.removeAttribute("style");
            }
          }
        });
        return highlightedCells;
      }
      function $forEachGridCell(grid, cb) {
        const {
          cells
        } = grid;
        for (let y = 0; y < cells.length; y++) {
          const row = cells[y];
          for (let x = 0; x < row.length; x++) {
            const cell = row[x];
            const lexicalNode = lexical2.$getNearestNodeFromDOMNode(cell.elem);
            if (lexicalNode !== null) {
              cb(cell, lexicalNode, {
                x,
                y
              });
            }
          }
        }
      }
      function $addHighlightStyleToTable(tableSelection) {
        tableSelection.disableHighlightStyle();
        $forEachGridCell(tableSelection.grid, (cell) => {
          const elem = cell.elem;
          cell.highlighted = true;
          elem.style.setProperty("background-color", "rgb(172, 206, 247)");
          elem.style.setProperty("caret-color", "transparent");
        });
      }
      function $removeHighlightStyleToTable(tableSelection) {
        tableSelection.enableHighlightStyle();
        $forEachGridCell(tableSelection.grid, (cell) => {
          const elem = cell.elem;
          cell.highlighted = false;
          elem.style.removeProperty("background-color");
          elem.style.removeProperty("caret-color");
          if (!elem.getAttribute("style")) {
            elem.removeAttribute("style");
          }
        });
      }
      var selectGridNodeInDirection = (tableSelection, tableNode, x, y, direction) => {
        const isForward = direction === "forward";
        switch (direction) {
          case "backward":
          case "forward":
            if (x !== (isForward ? tableSelection.grid.columns - 1 : 0)) {
              selectTableCellNode(tableNode.getCellNodeFromCordsOrThrow(x + (isForward ? 1 : -1), y, tableSelection.grid));
            } else {
              if (y !== (isForward ? tableSelection.grid.rows - 1 : 0)) {
                selectTableCellNode(tableNode.getCellNodeFromCordsOrThrow(isForward ? 0 : tableSelection.grid.columns - 1, y + (isForward ? 1 : -1), tableSelection.grid));
              } else if (!isForward) {
                tableNode.selectPrevious();
              } else {
                tableNode.selectNext();
              }
            }
            return true;
          case "up":
            if (y !== 0) {
              selectTableCellNode(tableNode.getCellNodeFromCordsOrThrow(x, y - 1, tableSelection.grid));
            } else {
              tableNode.selectPrevious();
            }
            return true;
          case "down":
            if (y !== tableSelection.grid.rows - 1) {
              selectTableCellNode(tableNode.getCellNodeFromCordsOrThrow(x, y + 1, tableSelection.grid));
            } else {
              tableNode.selectNext();
            }
            return true;
          default:
            return false;
        }
      };
      var adjustFocusNodeInDirection = (tableSelection, tableNode, x, y, direction) => {
        const isForward = direction === "forward";
        switch (direction) {
          case "backward":
          case "forward":
            if (x !== (isForward ? tableSelection.grid.columns - 1 : 0)) {
              tableSelection.adjustFocusCellForSelection(tableNode.getCellFromCordsOrThrow(x + (isForward ? 1 : -1), y, tableSelection.grid));
            }
            return true;
          case "up":
            if (y !== 0) {
              tableSelection.adjustFocusCellForSelection(tableNode.getCellFromCordsOrThrow(x, y - 1, tableSelection.grid));
              return true;
            } else {
              return false;
            }
          case "down":
            if (y !== tableSelection.grid.rows - 1) {
              tableSelection.adjustFocusCellForSelection(tableNode.getCellFromCordsOrThrow(x, y + 1, tableSelection.grid));
              return true;
            } else {
              return false;
            }
          default:
            return false;
        }
      };
      function $isSelectionInTable(selection, tableNode) {
        if (lexical2.$isRangeSelection(selection) || lexical2.DEPRECATED_$isGridSelection(selection)) {
          const isAnchorInside = tableNode.isParentOf(selection.anchor.getNode());
          const isFocusInside = tableNode.isParentOf(selection.focus.getNode());
          return isAnchorInside && isFocusInside;
        }
        return false;
      }
      function selectTableCellNode(tableCell) {
        const possibleParagraph = tableCell.getChildren().find((n) => lexical2.$isParagraphNode(n));
        if (lexical2.$isParagraphNode(possibleParagraph)) {
          possibleParagraph.selectEnd();
        } else {
          tableCell.selectEnd();
        }
      }
      var TableNode = class extends lexical2.DEPRECATED_GridNode {
        static getType() {
          return "table";
        }
        static clone(node) {
          return new TableNode(node.__key);
        }
        static importDOM() {
          return {
            table: (_node) => ({
              conversion: convertTableElement,
              priority: 1
            })
          };
        }
        static importJSON(_serializedNode) {
          return $createTableNode();
        }
        constructor(key) {
          super(key);
        }
        exportJSON() {
          return {
            ...super.exportJSON(),
            type: "table",
            version: 1
          };
        }
        createDOM(config, editor) {
          const tableElement = document.createElement("table");
          utils.addClassNamesToElement(tableElement, config.theme.table);
          return tableElement;
        }
        updateDOM() {
          return false;
        }
        exportDOM(editor) {
          return {
            ...super.exportDOM(editor),
            after: (tableElement) => {
              if (tableElement) {
                const newElement = tableElement.cloneNode();
                const colGroup = document.createElement("colgroup");
                const tBody = document.createElement("tbody");
                tBody.append(...tableElement.children);
                const firstRow = this.getFirstChildOrThrow();
                if (!$isTableRowNode(firstRow)) {
                  throw new Error("Expected to find row node.");
                }
                const colCount = firstRow.getChildrenSize();
                for (let i = 0; i < colCount; i++) {
                  const col = document.createElement("col");
                  colGroup.append(col);
                }
                newElement.replaceChildren(colGroup, tBody);
                return newElement;
              }
            }
          };
        }
        canExtractContents() {
          return false;
        }
        canBeEmpty() {
          return false;
        }
        isShadowRoot() {
          return true;
        }
        getCordsFromCellNode(tableCellNode, grid) {
          const {
            rows,
            cells
          } = grid;
          for (let y = 0; y < rows; y++) {
            const row = cells[y];
            if (row == null) {
              throw new Error(`Row not found at y:${y}`);
            }
            const x = row.findIndex(({
              elem
            }) => {
              const cellNode = lexical2.$getNearestNodeFromDOMNode(elem);
              return cellNode === tableCellNode;
            });
            if (x !== -1) {
              return {
                x,
                y
              };
            }
          }
          throw new Error("Cell not found in table.");
        }
        getCellFromCords(x, y, grid) {
          const {
            cells
          } = grid;
          const row = cells[y];
          if (row == null) {
            return null;
          }
          const cell = row[x];
          if (cell == null) {
            return null;
          }
          return cell;
        }
        getCellFromCordsOrThrow(x, y, grid) {
          const cell = this.getCellFromCords(x, y, grid);
          if (!cell) {
            throw new Error("Cell not found at cords.");
          }
          return cell;
        }
        getCellNodeFromCords(x, y, grid) {
          const cell = this.getCellFromCords(x, y, grid);
          if (cell == null) {
            return null;
          }
          const node = lexical2.$getNearestNodeFromDOMNode(cell.elem);
          if ($isTableCellNode(node)) {
            return node;
          }
          return null;
        }
        getCellNodeFromCordsOrThrow(x, y, grid) {
          const node = this.getCellNodeFromCords(x, y, grid);
          if (!node) {
            throw new Error("Node at cords not TableCellNode.");
          }
          return node;
        }
        canSelectBefore() {
          return true;
        }
        canIndent() {
          return false;
        }
      };
      function $getElementGridForTableNode(editor, tableNode) {
        const tableElement = editor.getElementByKey(tableNode.getKey());
        if (tableElement == null) {
          throw new Error("Table Element Not Found");
        }
        return getTableGrid(tableElement);
      }
      function convertTableElement(_domNode) {
        return {
          node: $createTableNode()
        };
      }
      function $createTableNode() {
        return new TableNode();
      }
      function $isTableNode(node) {
        return node instanceof TableNode;
      }
      function $createTableNodeWithDimensions(rowCount, columnCount, includeHeaders = true) {
        const tableNode = $createTableNode();
        for (let iRow = 0; iRow < rowCount; iRow++) {
          const tableRowNode = $createTableRowNode();
          for (let iColumn = 0; iColumn < columnCount; iColumn++) {
            let headerState = TableCellHeaderStates.NO_STATUS;
            if (includeHeaders) {
              if (iRow === 0)
                headerState |= TableCellHeaderStates.ROW;
              if (iColumn === 0)
                headerState |= TableCellHeaderStates.COLUMN;
            }
            const tableCellNode = $createTableCellNode(headerState);
            const paragraphNode = lexical2.$createParagraphNode();
            paragraphNode.append(lexical2.$createTextNode());
            tableCellNode.append(paragraphNode);
            tableRowNode.append(tableCellNode);
          }
          tableNode.append(tableRowNode);
        }
        return tableNode;
      }
      function $getTableCellNodeFromLexicalNode(startingNode) {
        const node = utils.$findMatchingParent(startingNode, (n) => $isTableCellNode(n));
        if ($isTableCellNode(node)) {
          return node;
        }
        return null;
      }
      function $getTableRowNodeFromTableCellNodeOrThrow(startingNode) {
        const node = utils.$findMatchingParent(startingNode, (n) => $isTableRowNode(n));
        if ($isTableRowNode(node)) {
          return node;
        }
        throw new Error("Expected table cell to be inside of table row.");
      }
      function $getTableNodeFromLexicalNodeOrThrow(startingNode) {
        const node = utils.$findMatchingParent(startingNode, (n) => $isTableNode(n));
        if ($isTableNode(node)) {
          return node;
        }
        throw new Error("Expected table cell to be inside of table.");
      }
      function $getTableRowIndexFromTableCellNode(tableCellNode) {
        const tableRowNode = $getTableRowNodeFromTableCellNodeOrThrow(tableCellNode);
        const tableNode = $getTableNodeFromLexicalNodeOrThrow(tableRowNode);
        return tableNode.getChildren().findIndex((n) => n.is(tableRowNode));
      }
      function $getTableColumnIndexFromTableCellNode(tableCellNode) {
        const tableRowNode = $getTableRowNodeFromTableCellNodeOrThrow(tableCellNode);
        return tableRowNode.getChildren().findIndex((n) => n.is(tableCellNode));
      }
      function $getTableCellSiblingsFromTableCellNode(tableCellNode, grid) {
        const tableNode = $getTableNodeFromLexicalNodeOrThrow(tableCellNode);
        const {
          x,
          y
        } = tableNode.getCordsFromCellNode(tableCellNode, grid);
        return {
          above: tableNode.getCellNodeFromCords(x, y - 1, grid),
          below: tableNode.getCellNodeFromCords(x, y + 1, grid),
          left: tableNode.getCellNodeFromCords(x - 1, y, grid),
          right: tableNode.getCellNodeFromCords(x + 1, y, grid)
        };
      }
      function $removeTableRowAtIndex(tableNode, indexToDelete) {
        const tableRows = tableNode.getChildren();
        if (indexToDelete >= tableRows.length || indexToDelete < 0) {
          throw new Error("Expected table cell to be inside of table row.");
        }
        const targetRowNode = tableRows[indexToDelete];
        targetRowNode.remove();
        return tableNode;
      }
      function $insertTableRow(tableNode, targetIndex, shouldInsertAfter = true, rowCount, grid) {
        const tableRows = tableNode.getChildren();
        if (targetIndex >= tableRows.length || targetIndex < 0) {
          throw new Error("Table row target index out of range");
        }
        const targetRowNode = tableRows[targetIndex];
        if ($isTableRowNode(targetRowNode)) {
          for (let r = 0; r < rowCount; r++) {
            const tableRowCells = targetRowNode.getChildren();
            const tableColumnCount = tableRowCells.length;
            const newTableRowNode = $createTableRowNode();
            for (let c = 0; c < tableColumnCount; c++) {
              const tableCellFromTargetRow = tableRowCells[c];
              if (!$isTableCellNode(tableCellFromTargetRow)) {
                throw Error(`Expected table cell`);
              }
              const {
                above,
                below
              } = $getTableCellSiblingsFromTableCellNode(tableCellFromTargetRow, grid);
              let headerState = TableCellHeaderStates.NO_STATUS;
              const width = above && above.getWidth() || below && below.getWidth() || void 0;
              if (above && above.hasHeaderState(TableCellHeaderStates.COLUMN) || below && below.hasHeaderState(TableCellHeaderStates.COLUMN)) {
                headerState |= TableCellHeaderStates.COLUMN;
              }
              const tableCellNode = $createTableCellNode(headerState, 1, width);
              tableCellNode.append(lexical2.$createParagraphNode());
              newTableRowNode.append(tableCellNode);
            }
            if (shouldInsertAfter) {
              targetRowNode.insertAfter(newTableRowNode);
            } else {
              targetRowNode.insertBefore(newTableRowNode);
            }
          }
        } else {
          throw new Error("Row before insertion index does not exist.");
        }
        return tableNode;
      }
      function $insertTableColumn(tableNode, targetIndex, shouldInsertAfter = true, columnCount, grid) {
        const tableRows = tableNode.getChildren();
        for (let r = 0; r < tableRows.length; r++) {
          const currentTableRowNode = tableRows[r];
          if ($isTableRowNode(currentTableRowNode)) {
            for (let c = 0; c < columnCount; c++) {
              const tableRowChildren = currentTableRowNode.getChildren();
              if (targetIndex >= tableRowChildren.length || targetIndex < 0) {
                throw new Error("Table column target index out of range");
              }
              const targetCell = tableRowChildren[targetIndex];
              if (!$isTableCellNode(targetCell)) {
                throw Error(`Expected table cell`);
              }
              const {
                left,
                right
              } = $getTableCellSiblingsFromTableCellNode(targetCell, grid);
              let headerState = TableCellHeaderStates.NO_STATUS;
              if (left && left.hasHeaderState(TableCellHeaderStates.ROW) || right && right.hasHeaderState(TableCellHeaderStates.ROW)) {
                headerState |= TableCellHeaderStates.ROW;
              }
              const newTableCell = $createTableCellNode(headerState);
              newTableCell.append(lexical2.$createParagraphNode());
              if (shouldInsertAfter) {
                targetCell.insertAfter(newTableCell);
              } else {
                targetCell.insertBefore(newTableCell);
              }
            }
          }
        }
        return tableNode;
      }
      function $deleteTableColumn(tableNode, targetIndex) {
        const tableRows = tableNode.getChildren();
        for (let i = 0; i < tableRows.length; i++) {
          const currentTableRowNode = tableRows[i];
          if ($isTableRowNode(currentTableRowNode)) {
            const tableRowChildren = currentTableRowNode.getChildren();
            if (targetIndex >= tableRowChildren.length || targetIndex < 0) {
              throw new Error("Table column target index out of range");
            }
            tableRowChildren[targetIndex].remove();
          }
        }
        return tableNode;
      }
      var INSERT_TABLE_COMMAND = lexical2.createCommand();
      exports.$createTableCellNode = $createTableCellNode;
      exports.$createTableNode = $createTableNode;
      exports.$createTableNodeWithDimensions = $createTableNodeWithDimensions;
      exports.$createTableRowNode = $createTableRowNode;
      exports.$deleteTableColumn = $deleteTableColumn;
      exports.$getElementGridForTableNode = $getElementGridForTableNode;
      exports.$getTableCellNodeFromLexicalNode = $getTableCellNodeFromLexicalNode;
      exports.$getTableColumnIndexFromTableCellNode = $getTableColumnIndexFromTableCellNode;
      exports.$getTableNodeFromLexicalNodeOrThrow = $getTableNodeFromLexicalNodeOrThrow;
      exports.$getTableRowIndexFromTableCellNode = $getTableRowIndexFromTableCellNode;
      exports.$getTableRowNodeFromTableCellNodeOrThrow = $getTableRowNodeFromTableCellNodeOrThrow;
      exports.$insertTableColumn = $insertTableColumn;
      exports.$insertTableRow = $insertTableRow;
      exports.$isTableCellNode = $isTableCellNode;
      exports.$isTableNode = $isTableNode;
      exports.$isTableRowNode = $isTableRowNode;
      exports.$removeTableRowAtIndex = $removeTableRowAtIndex;
      exports.INSERT_TABLE_COMMAND = INSERT_TABLE_COMMAND;
      exports.TableCellHeaderStates = TableCellHeaderStates;
      exports.TableCellNode = TableCellNode;
      exports.TableNode = TableNode;
      exports.TableRowNode = TableRowNode;
      exports.TableSelection = TableSelection;
      exports.applyTableHandlers = applyTableHandlers;
      exports.getCellFromTarget = getCellFromTarget;
      exports.getTableSelectionFromTableElement = getTableSelectionFromTableElement;
    }
  });

  // node_modules/@lexical/table/LexicalTable.js
  var require_LexicalTable = __commonJS({
    "node_modules/@lexical/table/LexicalTable.js"(exports, module) {
      "use strict";
      var LexicalTable = true ? require_LexicalTable_dev() : null;
      module.exports = LexicalTable;
    }
  });

  // node_modules/@lexical/overflow/LexicalOverflow.dev.js
  var require_LexicalOverflow_dev = __commonJS({
    "node_modules/@lexical/overflow/LexicalOverflow.dev.js"(exports) {
      "use strict";
      var lexical2 = require_Lexical();
      var OverflowNode = class extends lexical2.ElementNode {
        static getType() {
          return "overflow";
        }
        static clone(node) {
          return new OverflowNode(node.__key);
        }
        static importJSON(serializedNode) {
          return $createOverflowNode();
        }
        static importDOM() {
          return null;
        }
        constructor(key) {
          super(key);
          this.__type = "overflow";
        }
        exportJSON() {
          return {
            ...super.exportJSON(),
            type: "overflow"
          };
        }
        createDOM(config) {
          const div = document.createElement("span");
          const className = config.theme.characterLimit;
          if (typeof className === "string") {
            div.className = className;
          }
          return div;
        }
        updateDOM(prevNode, dom) {
          return false;
        }
        insertNewAfter(selection) {
          const parent = this.getParentOrThrow();
          return parent.insertNewAfter(selection);
        }
        excludeFromCopy() {
          return true;
        }
      };
      function $createOverflowNode() {
        return new OverflowNode();
      }
      function $isOverflowNode(node) {
        return node instanceof OverflowNode;
      }
      exports.$createOverflowNode = $createOverflowNode;
      exports.$isOverflowNode = $isOverflowNode;
      exports.OverflowNode = OverflowNode;
    }
  });

  // node_modules/@lexical/overflow/LexicalOverflow.js
  var require_LexicalOverflow = __commonJS({
    "node_modules/@lexical/overflow/LexicalOverflow.js"(exports, module) {
      "use strict";
      var LexicalOverflow = true ? require_LexicalOverflow_dev() : null;
      module.exports = LexicalOverflow;
    }
  });

  // node_modules/@lexical/rich-text/LexicalRichText.dev.js
  var require_LexicalRichText_dev = __commonJS({
    "node_modules/@lexical/rich-text/LexicalRichText.dev.js"(exports) {
      "use strict";
      var clipboard = require_LexicalClipboard();
      var selection = require_LexicalSelection();
      var utils = require_LexicalUtils();
      var lexical2 = require_Lexical();
      var CAN_USE_DOM = typeof window !== "undefined" && typeof window.document !== "undefined" && typeof window.document.createElement !== "undefined";
      var documentMode = CAN_USE_DOM && "documentMode" in document ? document.documentMode : null;
      CAN_USE_DOM && /Mac|iPod|iPhone|iPad/.test(navigator.platform);
      CAN_USE_DOM && /^(?!.*Seamonkey)(?=.*Firefox).*/i.test(navigator.userAgent);
      var CAN_USE_BEFORE_INPUT = CAN_USE_DOM && "InputEvent" in window && !documentMode ? "getTargetRanges" in new window.InputEvent("input") : false;
      var IS_SAFARI = CAN_USE_DOM && /Version\/[\d.]+.*Safari/.test(navigator.userAgent);
      var IS_IOS = CAN_USE_DOM && /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
      var QuoteNode2 = class extends lexical2.ElementNode {
        static getType() {
          return "quote";
        }
        static clone(node) {
          return new QuoteNode2(node.__key);
        }
        constructor(key) {
          super(key);
        }
        createDOM(config) {
          const element = document.createElement("blockquote");
          utils.addClassNamesToElement(element, config.theme.quote);
          return element;
        }
        updateDOM(prevNode, dom) {
          return false;
        }
        static importDOM() {
          return {
            blockquote: (node) => ({
              conversion: convertBlockquoteElement,
              priority: 0
            })
          };
        }
        static importJSON(serializedNode) {
          const node = $createQuoteNode();
          node.setFormat(serializedNode.format);
          node.setIndent(serializedNode.indent);
          node.setDirection(serializedNode.direction);
          return node;
        }
        exportJSON() {
          return {
            ...super.exportJSON(),
            type: "quote"
          };
        }
        insertNewAfter() {
          const newBlock = lexical2.$createParagraphNode();
          const direction = this.getDirection();
          newBlock.setDirection(direction);
          this.insertAfter(newBlock);
          return newBlock;
        }
        collapseAtStart() {
          const paragraph = lexical2.$createParagraphNode();
          const children = this.getChildren();
          children.forEach((child) => paragraph.append(child));
          this.replace(paragraph);
          return true;
        }
      };
      function $createQuoteNode() {
        return new QuoteNode2();
      }
      function $isQuoteNode(node) {
        return node instanceof QuoteNode2;
      }
      var HeadingNode2 = class extends lexical2.ElementNode {
        static getType() {
          return "heading";
        }
        static clone(node) {
          return new HeadingNode2(node.__tag, node.__key);
        }
        constructor(tag, key) {
          super(key);
          this.__tag = tag;
        }
        getTag() {
          return this.__tag;
        }
        createDOM(config) {
          const tag = this.__tag;
          const element = document.createElement(tag);
          const theme = config.theme;
          const classNames = theme.heading;
          if (classNames !== void 0) {
            const className = classNames[tag];
            utils.addClassNamesToElement(element, className);
          }
          return element;
        }
        updateDOM(prevNode, dom) {
          return false;
        }
        static importDOM() {
          return {
            h1: (node) => ({
              conversion: convertHeadingElement,
              priority: 0
            }),
            h2: (node) => ({
              conversion: convertHeadingElement,
              priority: 0
            }),
            h3: (node) => ({
              conversion: convertHeadingElement,
              priority: 0
            }),
            h4: (node) => ({
              conversion: convertHeadingElement,
              priority: 0
            }),
            h5: (node) => ({
              conversion: convertHeadingElement,
              priority: 0
            }),
            h6: (node) => ({
              conversion: convertHeadingElement,
              priority: 0
            }),
            p: (node) => {
              const paragraph = node;
              const firstChild = paragraph.firstChild;
              if (firstChild !== null && isGoogleDocsTitle(firstChild)) {
                return {
                  conversion: () => ({
                    node: null
                  }),
                  priority: 3
                };
              }
              return null;
            },
            span: (node) => {
              if (isGoogleDocsTitle(node)) {
                return {
                  conversion: (domNode) => {
                    return {
                      node: $createHeadingNode("h1")
                    };
                  },
                  priority: 3
                };
              }
              return null;
            }
          };
        }
        static importJSON(serializedNode) {
          const node = $createHeadingNode(serializedNode.tag);
          node.setFormat(serializedNode.format);
          node.setIndent(serializedNode.indent);
          node.setDirection(serializedNode.direction);
          return node;
        }
        exportJSON() {
          return {
            ...super.exportJSON(),
            tag: this.getTag(),
            type: "heading",
            version: 1
          };
        }
        insertNewAfter() {
          const newElement = lexical2.$createParagraphNode();
          const direction = this.getDirection();
          newElement.setDirection(direction);
          this.insertAfter(newElement);
          return newElement;
        }
        collapseAtStart() {
          const paragraph = lexical2.$createParagraphNode();
          const children = this.getChildren();
          children.forEach((child) => paragraph.append(child));
          this.replace(paragraph);
          return true;
        }
        extractWithChild() {
          return true;
        }
      };
      function isGoogleDocsTitle(domNode) {
        if (domNode.nodeName.toLowerCase() === "span") {
          return domNode.style.fontSize === "26pt";
        }
        return false;
      }
      function convertHeadingElement(domNode) {
        const nodeName = domNode.nodeName.toLowerCase();
        let node = null;
        if (nodeName === "h1" || nodeName === "h2" || nodeName === "h3" || nodeName === "h4" || nodeName === "h5" || nodeName === "h6") {
          node = $createHeadingNode(nodeName);
        }
        return {
          node
        };
      }
      function convertBlockquoteElement() {
        const node = $createQuoteNode();
        return {
          node
        };
      }
      function $createHeadingNode(headingTag) {
        return new HeadingNode2(headingTag);
      }
      function $isHeadingNode(node) {
        return node instanceof HeadingNode2;
      }
      function onPasteForRichText(event, editor) {
        event.preventDefault();
        editor.update(() => {
          const selection2 = lexical2.$getSelection();
          const clipboardData = event instanceof InputEvent || event instanceof KeyboardEvent ? null : event.clipboardData;
          if (clipboardData != null && (lexical2.$isRangeSelection(selection2) || lexical2.DEPRECATED_$isGridSelection(selection2))) {
            clipboard.$insertDataTransferForRichText(clipboardData, selection2, editor);
          }
        }, {
          tag: "paste"
        });
      }
      function onCopyForRichText(event, editor) {
        const selection2 = lexical2.$getSelection();
        if (selection2 !== null) {
          event.preventDefault();
          const clipboardData = event instanceof KeyboardEvent ? null : event.clipboardData;
          const htmlString = clipboard.$getHtmlContent(editor);
          const lexicalString = clipboard.$getLexicalContent(editor);
          if (clipboardData != null) {
            if (htmlString !== null) {
              clipboardData.setData("text/html", htmlString);
            }
            if (lexicalString !== null) {
              clipboardData.setData("application/x-lexical-editor", lexicalString);
            }
            const plainString = selection2.getTextContent();
            clipboardData.setData("text/plain", plainString);
          } else {
            const clipboard2 = navigator.clipboard;
            if (clipboard2 != null) {
              const data = [new ClipboardItem({
                "text/html": new Blob([htmlString], {
                  type: "text/html"
                })
              })];
              clipboard2.write(data);
            }
          }
        }
      }
      function onCutForRichText(event, editor) {
        onCopyForRichText(event, editor);
        const selection2 = lexical2.$getSelection();
        if (lexical2.$isRangeSelection(selection2)) {
          selection2.removeText();
        } else if (lexical2.$isNodeSelection(selection2)) {
          selection2.getNodes().forEach((node) => node.remove());
        }
      }
      function handleIndentAndOutdent(insertTab, indentOrOutdent) {
        const selection2 = lexical2.$getSelection();
        if (!lexical2.$isRangeSelection(selection2)) {
          return;
        }
        const alreadyHandled = /* @__PURE__ */ new Set();
        const nodes = selection2.getNodes();
        for (let i = 0; i < nodes.length; i++) {
          const node = nodes[i];
          const key = node.getKey();
          if (alreadyHandled.has(key)) {
            continue;
          }
          alreadyHandled.add(key);
          const parentBlock = utils.$getNearestBlockElementAncestorOrThrow(node);
          if (parentBlock.canInsertTab()) {
            insertTab(node);
          } else if (parentBlock.canIndent()) {
            indentOrOutdent(parentBlock);
          }
        }
      }
      function isTargetWithinDecorator(target) {
        const node = lexical2.$getNearestNodeFromDOMNode(target);
        return lexical2.$isDecoratorNode(node);
      }
      function registerRichText(editor) {
        const removeListener = utils.mergeRegister(editor.registerCommand(lexical2.CLICK_COMMAND, (payload) => {
          const selection2 = lexical2.$getSelection();
          if (lexical2.$isNodeSelection(selection2)) {
            selection2.clear();
            return true;
          }
          return false;
        }, 0), editor.registerCommand(lexical2.DELETE_CHARACTER_COMMAND, (isBackward) => {
          const selection2 = lexical2.$getSelection();
          if (!lexical2.$isRangeSelection(selection2)) {
            return false;
          }
          selection2.deleteCharacter(isBackward);
          return true;
        }, lexical2.COMMAND_PRIORITY_EDITOR), editor.registerCommand(lexical2.DELETE_WORD_COMMAND, (isBackward) => {
          const selection2 = lexical2.$getSelection();
          if (!lexical2.$isRangeSelection(selection2)) {
            return false;
          }
          selection2.deleteWord(isBackward);
          return true;
        }, lexical2.COMMAND_PRIORITY_EDITOR), editor.registerCommand(lexical2.DELETE_LINE_COMMAND, (isBackward) => {
          const selection2 = lexical2.$getSelection();
          if (!lexical2.$isRangeSelection(selection2)) {
            return false;
          }
          selection2.deleteLine(isBackward);
          return true;
        }, lexical2.COMMAND_PRIORITY_EDITOR), editor.registerCommand(lexical2.CONTROLLED_TEXT_INSERTION_COMMAND, (eventOrText) => {
          const selection2 = lexical2.$getSelection();
          if (typeof eventOrText === "string") {
            if (lexical2.$isRangeSelection(selection2)) {
              selection2.insertText(eventOrText);
            } else if (lexical2.DEPRECATED_$isGridSelection(selection2))
              ;
          } else {
            if (!lexical2.$isRangeSelection(selection2) && !lexical2.DEPRECATED_$isGridSelection(selection2)) {
              return false;
            }
            const dataTransfer = eventOrText.dataTransfer;
            if (dataTransfer != null) {
              clipboard.$insertDataTransferForRichText(dataTransfer, selection2, editor);
            } else if (lexical2.$isRangeSelection(selection2)) {
              const data = eventOrText.data;
              if (data) {
                selection2.insertText(data);
              }
              return true;
            }
          }
          return true;
        }, lexical2.COMMAND_PRIORITY_EDITOR), editor.registerCommand(lexical2.REMOVE_TEXT_COMMAND, () => {
          const selection2 = lexical2.$getSelection();
          if (!lexical2.$isRangeSelection(selection2)) {
            return false;
          }
          selection2.removeText();
          return true;
        }, lexical2.COMMAND_PRIORITY_EDITOR), editor.registerCommand(lexical2.FORMAT_TEXT_COMMAND, (format) => {
          const selection2 = lexical2.$getSelection();
          if (!lexical2.$isRangeSelection(selection2)) {
            return false;
          }
          selection2.formatText(format);
          return true;
        }, lexical2.COMMAND_PRIORITY_EDITOR), editor.registerCommand(lexical2.FORMAT_ELEMENT_COMMAND, (format) => {
          const selection2 = lexical2.$getSelection();
          if (!lexical2.$isRangeSelection(selection2) && !lexical2.$isNodeSelection(selection2)) {
            return false;
          }
          const nodes = selection2.getNodes();
          for (const node of nodes) {
            const element = utils.$getNearestBlockElementAncestorOrThrow(node);
            element.setFormat(format);
          }
          return true;
        }, lexical2.COMMAND_PRIORITY_EDITOR), editor.registerCommand(lexical2.INSERT_LINE_BREAK_COMMAND, (selectStart) => {
          const selection2 = lexical2.$getSelection();
          if (!lexical2.$isRangeSelection(selection2)) {
            return false;
          }
          selection2.insertLineBreak(selectStart);
          return true;
        }, lexical2.COMMAND_PRIORITY_EDITOR), editor.registerCommand(lexical2.INSERT_PARAGRAPH_COMMAND, () => {
          const selection2 = lexical2.$getSelection();
          if (!lexical2.$isRangeSelection(selection2)) {
            return false;
          }
          selection2.insertParagraph();
          return true;
        }, lexical2.COMMAND_PRIORITY_EDITOR), editor.registerCommand(lexical2.INDENT_CONTENT_COMMAND, () => {
          handleIndentAndOutdent(() => {
            editor.dispatchCommand(lexical2.CONTROLLED_TEXT_INSERTION_COMMAND, "	");
          }, (block) => {
            const indent = block.getIndent();
            if (indent !== 10) {
              block.setIndent(indent + 1);
            }
          });
          return true;
        }, lexical2.COMMAND_PRIORITY_EDITOR), editor.registerCommand(lexical2.OUTDENT_CONTENT_COMMAND, () => {
          handleIndentAndOutdent((node) => {
            if (lexical2.$isTextNode(node)) {
              const textContent = node.getTextContent();
              const character = textContent[textContent.length - 1];
              if (character === "	") {
                editor.dispatchCommand(lexical2.DELETE_CHARACTER_COMMAND, true);
              }
            }
          }, (block) => {
            const indent = block.getIndent();
            if (indent !== 0) {
              block.setIndent(indent - 1);
            }
          });
          return true;
        }, lexical2.COMMAND_PRIORITY_EDITOR), editor.registerCommand(lexical2.KEY_ARROW_UP_COMMAND, (event) => {
          const selection2 = lexical2.$getSelection();
          if (lexical2.$isNodeSelection(selection2) && !isTargetWithinDecorator(event.target)) {
            const nodes = selection2.getNodes();
            if (nodes.length > 0) {
              nodes[0].selectPrevious();
              return true;
            }
          }
          return false;
        }, lexical2.COMMAND_PRIORITY_EDITOR), editor.registerCommand(lexical2.KEY_ARROW_DOWN_COMMAND, (event) => {
          const selection2 = lexical2.$getSelection();
          if (lexical2.$isNodeSelection(selection2)) {
            const nodes = selection2.getNodes();
            if (nodes.length > 0) {
              nodes[0].selectNext(0, 0);
              return true;
            }
          }
          return false;
        }, lexical2.COMMAND_PRIORITY_EDITOR), editor.registerCommand(lexical2.KEY_ARROW_LEFT_COMMAND, (event) => {
          const selection$1 = lexical2.$getSelection();
          if (lexical2.$isNodeSelection(selection$1)) {
            const nodes = selection$1.getNodes();
            if (nodes.length > 0) {
              event.preventDefault();
              nodes[0].selectPrevious();
              return true;
            }
          }
          if (!lexical2.$isRangeSelection(selection$1)) {
            return false;
          }
          if (selection.$shouldOverrideDefaultCharacterSelection(selection$1, true)) {
            const isHoldingShift = event.shiftKey;
            event.preventDefault();
            selection.$moveCharacter(selection$1, isHoldingShift, true);
            return true;
          }
          return false;
        }, lexical2.COMMAND_PRIORITY_EDITOR), editor.registerCommand(lexical2.KEY_ARROW_RIGHT_COMMAND, (event) => {
          const selection$1 = lexical2.$getSelection();
          if (lexical2.$isNodeSelection(selection$1) && !isTargetWithinDecorator(event.target)) {
            const nodes = selection$1.getNodes();
            if (nodes.length > 0) {
              event.preventDefault();
              nodes[0].selectNext(0, 0);
              return true;
            }
          }
          if (!lexical2.$isRangeSelection(selection$1)) {
            return false;
          }
          const isHoldingShift = event.shiftKey;
          if (selection.$shouldOverrideDefaultCharacterSelection(selection$1, false)) {
            event.preventDefault();
            selection.$moveCharacter(selection$1, isHoldingShift, false);
            return true;
          }
          return false;
        }, lexical2.COMMAND_PRIORITY_EDITOR), editor.registerCommand(lexical2.KEY_BACKSPACE_COMMAND, (event) => {
          if (isTargetWithinDecorator(event.target)) {
            return false;
          }
          const selection2 = lexical2.$getSelection();
          if (!lexical2.$isRangeSelection(selection2)) {
            return false;
          }
          event.preventDefault();
          const {
            anchor
          } = selection2;
          const anchorNode = anchor.getNode();
          if (selection2.isCollapsed() && anchor.offset === 0 && !lexical2.$isRootNode(anchorNode)) {
            const element = utils.$getNearestBlockElementAncestorOrThrow(anchorNode);
            if (element.getIndent() > 0) {
              return editor.dispatchCommand(lexical2.OUTDENT_CONTENT_COMMAND, void 0);
            }
          }
          return editor.dispatchCommand(lexical2.DELETE_CHARACTER_COMMAND, true);
        }, lexical2.COMMAND_PRIORITY_EDITOR), editor.registerCommand(lexical2.KEY_DELETE_COMMAND, (event) => {
          if (isTargetWithinDecorator(event.target)) {
            return false;
          }
          const selection2 = lexical2.$getSelection();
          if (!lexical2.$isRangeSelection(selection2)) {
            return false;
          }
          event.preventDefault();
          return editor.dispatchCommand(lexical2.DELETE_CHARACTER_COMMAND, false);
        }, lexical2.COMMAND_PRIORITY_EDITOR), editor.registerCommand(lexical2.KEY_ENTER_COMMAND, (event) => {
          const selection2 = lexical2.$getSelection();
          if (!lexical2.$isRangeSelection(selection2)) {
            return false;
          }
          if (event !== null) {
            if ((IS_IOS || IS_SAFARI) && CAN_USE_BEFORE_INPUT) {
              return false;
            }
            event.preventDefault();
            if (event.shiftKey) {
              return editor.dispatchCommand(lexical2.INSERT_LINE_BREAK_COMMAND, false);
            }
          }
          return editor.dispatchCommand(lexical2.INSERT_PARAGRAPH_COMMAND, void 0);
        }, lexical2.COMMAND_PRIORITY_EDITOR), editor.registerCommand(lexical2.KEY_TAB_COMMAND, (event) => {
          const selection2 = lexical2.$getSelection();
          if (!lexical2.$isRangeSelection(selection2)) {
            return false;
          }
          event.preventDefault();
          return editor.dispatchCommand(event.shiftKey ? lexical2.OUTDENT_CONTENT_COMMAND : lexical2.INDENT_CONTENT_COMMAND, void 0);
        }, lexical2.COMMAND_PRIORITY_EDITOR), editor.registerCommand(lexical2.KEY_ESCAPE_COMMAND, () => {
          const selection2 = lexical2.$getSelection();
          if (!lexical2.$isRangeSelection(selection2)) {
            return false;
          }
          editor.blur();
          return true;
        }, lexical2.COMMAND_PRIORITY_EDITOR), editor.registerCommand(lexical2.DROP_COMMAND, (event) => {
          const selection2 = lexical2.$getSelection();
          if (!lexical2.$isRangeSelection(selection2)) {
            return false;
          }
          event.preventDefault();
          return true;
        }, lexical2.COMMAND_PRIORITY_EDITOR), editor.registerCommand(lexical2.DRAGSTART_COMMAND, (event) => {
          const selection2 = lexical2.$getSelection();
          if (!lexical2.$isRangeSelection(selection2)) {
            return false;
          }
          event.preventDefault();
          return true;
        }, lexical2.COMMAND_PRIORITY_EDITOR), editor.registerCommand(lexical2.COPY_COMMAND, (event) => {
          onCopyForRichText(event, editor);
          return true;
        }, lexical2.COMMAND_PRIORITY_EDITOR), editor.registerCommand(lexical2.CUT_COMMAND, (event) => {
          onCutForRichText(event, editor);
          return true;
        }, lexical2.COMMAND_PRIORITY_EDITOR), editor.registerCommand(lexical2.PASTE_COMMAND, (event) => {
          const selection2 = lexical2.$getSelection();
          if (lexical2.$isRangeSelection(selection2) || lexical2.DEPRECATED_$isGridSelection(selection2)) {
            onPasteForRichText(event, editor);
            return true;
          }
          return false;
        }, lexical2.COMMAND_PRIORITY_EDITOR));
        return removeListener;
      }
      exports.$createHeadingNode = $createHeadingNode;
      exports.$createQuoteNode = $createQuoteNode;
      exports.$isHeadingNode = $isHeadingNode;
      exports.$isQuoteNode = $isQuoteNode;
      exports.HeadingNode = HeadingNode2;
      exports.QuoteNode = QuoteNode2;
      exports.registerRichText = registerRichText;
    }
  });

  // node_modules/@lexical/rich-text/LexicalRichText.js
  var require_LexicalRichText = __commonJS({
    "node_modules/@lexical/rich-text/LexicalRichText.js"(exports, module) {
      "use strict";
      var LexicalRichText = true ? require_LexicalRichText_dev() : null;
      module.exports = LexicalRichText;
    }
  });

  // node_modules/@lexical/mark/LexicalMark.dev.js
  var require_LexicalMark_dev = __commonJS({
    "node_modules/@lexical/mark/LexicalMark.dev.js"(exports) {
      "use strict";
      var lexical2 = require_Lexical();
      var utils = require_LexicalUtils();
      var MarkNode = class extends lexical2.ElementNode {
        static getType() {
          return "mark";
        }
        static clone(node) {
          return new MarkNode(Array.from(node.__ids), node.__key);
        }
        static importDOM() {
          return null;
        }
        static importJSON(serializedNode) {
          const node = $createMarkNode(serializedNode.ids);
          node.setFormat(serializedNode.format);
          node.setIndent(serializedNode.indent);
          node.setDirection(serializedNode.direction);
          return node;
        }
        exportJSON() {
          return {
            ...super.exportJSON(),
            ids: this.getIDs(),
            type: "mark",
            version: 1
          };
        }
        constructor(ids, key) {
          super(key);
          this.__ids = ids || [];
        }
        createDOM(config) {
          const element = document.createElement("mark");
          utils.addClassNamesToElement(element, config.theme.mark);
          if (this.__ids.length > 1) {
            utils.addClassNamesToElement(element, config.theme.markOverlap);
          }
          return element;
        }
        updateDOM(prevNode, element, config) {
          const prevIDs = prevNode.__ids;
          const nextIDs = this.__ids;
          const prevIDsCount = prevIDs.length;
          const nextIDsCount = nextIDs.length;
          const overlapTheme = config.theme.markOverlap;
          if (prevIDsCount !== nextIDsCount) {
            if (prevIDsCount === 1) {
              if (nextIDsCount === 2) {
                utils.addClassNamesToElement(element, overlapTheme);
              }
            } else if (nextIDsCount === 1) {
              utils.removeClassNamesFromElement(element, overlapTheme);
            }
          }
          return false;
        }
        hasID(id) {
          const ids = this.getIDs();
          for (let i = 0; i < ids.length; i++) {
            if (id === ids[i]) {
              return true;
            }
          }
          return false;
        }
        getIDs() {
          const self2 = this.getLatest();
          return $isMarkNode(self2) ? self2.__ids : [];
        }
        addID(id) {
          const self2 = this.getWritable();
          if ($isMarkNode(self2)) {
            const ids = self2.__ids;
            self2.__ids = ids;
            for (let i = 0; i < ids.length; i++) {
              if (id === ids[i])
                return;
            }
            ids.push(id);
          }
        }
        deleteID(id) {
          const self2 = this.getWritable();
          if ($isMarkNode(self2)) {
            const ids = self2.__ids;
            self2.__ids = ids;
            for (let i = 0; i < ids.length; i++) {
              if (id === ids[i]) {
                ids.splice(i, 1);
                return;
              }
            }
          }
        }
        insertNewAfter(selection) {
          const element = this.getParentOrThrow().insertNewAfter(selection);
          if (lexical2.$isElementNode(element)) {
            const markNode = $createMarkNode(this.__ids);
            element.append(markNode);
            return markNode;
          }
          return null;
        }
        canInsertTextBefore() {
          return false;
        }
        canInsertTextAfter() {
          return false;
        }
        canBeEmpty() {
          return false;
        }
        isInline() {
          return true;
        }
        extractWithChild(child, selection, destination) {
          if (!lexical2.$isRangeSelection(selection) || destination === "html") {
            return false;
          }
          const anchor = selection.anchor;
          const focus = selection.focus;
          const anchorNode = anchor.getNode();
          const focusNode = focus.getNode();
          const isBackward = selection.isBackward();
          const selectionLength = isBackward ? anchor.offset - focus.offset : focus.offset - anchor.offset;
          return this.isParentOf(anchorNode) && this.isParentOf(focusNode) && this.getTextContent().length === selectionLength;
        }
        excludeFromCopy(destination) {
          return destination !== "clone";
        }
      };
      function $createMarkNode(ids) {
        return new MarkNode(ids);
      }
      function $isMarkNode(node) {
        return node instanceof MarkNode;
      }
      function $unwrapMarkNode(node) {
        const children = node.getChildren();
        let target = null;
        for (let i = 0; i < children.length; i++) {
          const child = children[i];
          if (target === null) {
            node.insertBefore(child);
          } else {
            target.insertAfter(child);
          }
          target = child;
        }
        node.remove();
      }
      function $wrapSelectionInMarkNode(selection, isBackward, id) {
        const nodes = selection.getNodes();
        const anchorOffset = selection.anchor.offset;
        const focusOffset = selection.focus.offset;
        const nodesLength = nodes.length;
        const startOffset = isBackward ? focusOffset : anchorOffset;
        const endOffset = isBackward ? anchorOffset : focusOffset;
        let currentNodeParent;
        let lastCreatedMarkNode;
        for (let i = 0; i < nodesLength; i++) {
          const node = nodes[i];
          if (lexical2.$isElementNode(lastCreatedMarkNode) && lastCreatedMarkNode.isParentOf(node)) {
            continue;
          }
          const isFirstNode = i === 0;
          const isLastNode = i === nodesLength - 1;
          let targetNode = null;
          if (lexical2.$isTextNode(node)) {
            const textContentSize = node.getTextContentSize();
            const startTextOffset = isFirstNode ? startOffset : 0;
            const endTextOffset = isLastNode ? endOffset : textContentSize;
            if (startTextOffset === 0 && endTextOffset === 0) {
              continue;
            }
            const splitNodes = node.splitText(startTextOffset, endTextOffset);
            targetNode = splitNodes.length > 1 && (splitNodes.length === 3 || isFirstNode && !isLastNode || endTextOffset === textContentSize) ? splitNodes[1] : splitNodes[0];
          } else if ($isMarkNode(node)) {
            continue;
          } else if (lexical2.$isElementNode(node) && node.isInline()) {
            targetNode = node;
          }
          if (targetNode !== null) {
            if (targetNode && targetNode.is(currentNodeParent)) {
              continue;
            }
            const parentNode = targetNode.getParent();
            if (parentNode == null || !parentNode.is(currentNodeParent)) {
              lastCreatedMarkNode = void 0;
            }
            currentNodeParent = parentNode;
            if (lastCreatedMarkNode === void 0) {
              lastCreatedMarkNode = $createMarkNode([id]);
              targetNode.insertBefore(lastCreatedMarkNode);
            }
            lastCreatedMarkNode.append(targetNode);
          } else {
            currentNodeParent = void 0;
            lastCreatedMarkNode = void 0;
          }
        }
      }
      function $getMarkIDs(node, offset) {
        let currentNode = node;
        while (currentNode !== null) {
          if ($isMarkNode(currentNode)) {
            return currentNode.getIDs();
          } else if (lexical2.$isTextNode(currentNode) && offset === currentNode.getTextContentSize()) {
            const nextSibling = currentNode.getNextSibling();
            if ($isMarkNode(nextSibling)) {
              return nextSibling.getIDs();
            }
          }
          currentNode = currentNode.getParent();
        }
        return null;
      }
      exports.$createMarkNode = $createMarkNode;
      exports.$getMarkIDs = $getMarkIDs;
      exports.$isMarkNode = $isMarkNode;
      exports.$unwrapMarkNode = $unwrapMarkNode;
      exports.$wrapSelectionInMarkNode = $wrapSelectionInMarkNode;
      exports.MarkNode = MarkNode;
    }
  });

  // node_modules/@lexical/mark/LexicalMark.js
  var require_LexicalMark = __commonJS({
    "node_modules/@lexical/mark/LexicalMark.js"(exports, module) {
      "use strict";
      var LexicalMark = true ? require_LexicalMark_dev() : null;
      module.exports = LexicalMark;
    }
  });

  // node_modules/@lexical/hashtag/LexicalHashtag.dev.js
  var require_LexicalHashtag_dev = __commonJS({
    "node_modules/@lexical/hashtag/LexicalHashtag.dev.js"(exports) {
      "use strict";
      var utils = require_LexicalUtils();
      var lexical2 = require_Lexical();
      var HashtagNode = class extends lexical2.TextNode {
        static getType() {
          return "hashtag";
        }
        static clone(node) {
          return new HashtagNode(node.__text, node.__key);
        }
        constructor(text, key) {
          super(text, key);
        }
        createDOM(config) {
          const element = super.createDOM(config);
          utils.addClassNamesToElement(element, config.theme.hashtag);
          return element;
        }
        static importJSON(serializedNode) {
          const node = $createHashtagNode(serializedNode.text);
          node.setFormat(serializedNode.format);
          node.setDetail(serializedNode.detail);
          node.setMode(serializedNode.mode);
          node.setStyle(serializedNode.style);
          return node;
        }
        exportJSON() {
          return {
            ...super.exportJSON(),
            type: "hashtag"
          };
        }
        canInsertTextBefore() {
          return false;
        }
        isTextEntity() {
          return true;
        }
      };
      function $createHashtagNode(text = "") {
        return new HashtagNode(text);
      }
      function $isHashtagNode(node) {
        return node instanceof HashtagNode;
      }
      exports.$createHashtagNode = $createHashtagNode;
      exports.$isHashtagNode = $isHashtagNode;
      exports.HashtagNode = HashtagNode;
    }
  });

  // node_modules/@lexical/hashtag/LexicalHashtag.js
  var require_LexicalHashtag = __commonJS({
    "node_modules/@lexical/hashtag/LexicalHashtag.js"(exports, module) {
      "use strict";
      var LexicalHashtag = true ? require_LexicalHashtag_dev() : null;
      module.exports = LexicalHashtag;
    }
  });

  // node_modules/prismjs/prism.js
  var require_prism = __commonJS({
    "node_modules/prismjs/prism.js"(exports, module) {
      var _self = typeof window !== "undefined" ? window : typeof WorkerGlobalScope !== "undefined" && self instanceof WorkerGlobalScope ? self : {};
      var Prism2 = function(_self2) {
        var lang = /(?:^|\s)lang(?:uage)?-([\w-]+)(?=\s|$)/i;
        var uniqueId = 0;
        var plainTextGrammar = {};
        var _ = {
          manual: _self2.Prism && _self2.Prism.manual,
          disableWorkerMessageHandler: _self2.Prism && _self2.Prism.disableWorkerMessageHandler,
          util: {
            encode: function encode(tokens) {
              if (tokens instanceof Token) {
                return new Token(tokens.type, encode(tokens.content), tokens.alias);
              } else if (Array.isArray(tokens)) {
                return tokens.map(encode);
              } else {
                return tokens.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/\u00a0/g, " ");
              }
            },
            type: function(o) {
              return Object.prototype.toString.call(o).slice(8, -1);
            },
            objId: function(obj) {
              if (!obj["__id"]) {
                Object.defineProperty(obj, "__id", { value: ++uniqueId });
              }
              return obj["__id"];
            },
            clone: function deepClone(o, visited) {
              visited = visited || {};
              var clone;
              var id;
              switch (_.util.type(o)) {
                case "Object":
                  id = _.util.objId(o);
                  if (visited[id]) {
                    return visited[id];
                  }
                  clone = {};
                  visited[id] = clone;
                  for (var key in o) {
                    if (o.hasOwnProperty(key)) {
                      clone[key] = deepClone(o[key], visited);
                    }
                  }
                  return clone;
                case "Array":
                  id = _.util.objId(o);
                  if (visited[id]) {
                    return visited[id];
                  }
                  clone = [];
                  visited[id] = clone;
                  o.forEach(function(v, i) {
                    clone[i] = deepClone(v, visited);
                  });
                  return clone;
                default:
                  return o;
              }
            },
            getLanguage: function(element) {
              while (element) {
                var m = lang.exec(element.className);
                if (m) {
                  return m[1].toLowerCase();
                }
                element = element.parentElement;
              }
              return "none";
            },
            setLanguage: function(element, language) {
              element.className = element.className.replace(RegExp(lang, "gi"), "");
              element.classList.add("language-" + language);
            },
            currentScript: function() {
              if (typeof document === "undefined") {
                return null;
              }
              if ("currentScript" in document && 1 < 2) {
                return document.currentScript;
              }
              try {
                throw new Error();
              } catch (err) {
                var src = (/at [^(\r\n]*\((.*):[^:]+:[^:]+\)$/i.exec(err.stack) || [])[1];
                if (src) {
                  var scripts = document.getElementsByTagName("script");
                  for (var i in scripts) {
                    if (scripts[i].src == src) {
                      return scripts[i];
                    }
                  }
                }
                return null;
              }
            },
            isActive: function(element, className, defaultActivation) {
              var no = "no-" + className;
              while (element) {
                var classList = element.classList;
                if (classList.contains(className)) {
                  return true;
                }
                if (classList.contains(no)) {
                  return false;
                }
                element = element.parentElement;
              }
              return !!defaultActivation;
            }
          },
          languages: {
            plain: plainTextGrammar,
            plaintext: plainTextGrammar,
            text: plainTextGrammar,
            txt: plainTextGrammar,
            extend: function(id, redef) {
              var lang2 = _.util.clone(_.languages[id]);
              for (var key in redef) {
                lang2[key] = redef[key];
              }
              return lang2;
            },
            insertBefore: function(inside, before, insert, root) {
              root = root || _.languages;
              var grammar = root[inside];
              var ret = {};
              for (var token in grammar) {
                if (grammar.hasOwnProperty(token)) {
                  if (token == before) {
                    for (var newToken in insert) {
                      if (insert.hasOwnProperty(newToken)) {
                        ret[newToken] = insert[newToken];
                      }
                    }
                  }
                  if (!insert.hasOwnProperty(token)) {
                    ret[token] = grammar[token];
                  }
                }
              }
              var old = root[inside];
              root[inside] = ret;
              _.languages.DFS(_.languages, function(key, value) {
                if (value === old && key != inside) {
                  this[key] = ret;
                }
              });
              return ret;
            },
            DFS: function DFS(o, callback, type, visited) {
              visited = visited || {};
              var objId = _.util.objId;
              for (var i in o) {
                if (o.hasOwnProperty(i)) {
                  callback.call(o, i, o[i], type || i);
                  var property = o[i];
                  var propertyType = _.util.type(property);
                  if (propertyType === "Object" && !visited[objId(property)]) {
                    visited[objId(property)] = true;
                    DFS(property, callback, null, visited);
                  } else if (propertyType === "Array" && !visited[objId(property)]) {
                    visited[objId(property)] = true;
                    DFS(property, callback, i, visited);
                  }
                }
              }
            }
          },
          plugins: {},
          highlightAll: function(async, callback) {
            _.highlightAllUnder(document, async, callback);
          },
          highlightAllUnder: function(container, async, callback) {
            var env = {
              callback,
              container,
              selector: 'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'
            };
            _.hooks.run("before-highlightall", env);
            env.elements = Array.prototype.slice.apply(env.container.querySelectorAll(env.selector));
            _.hooks.run("before-all-elements-highlight", env);
            for (var i = 0, element; element = env.elements[i++]; ) {
              _.highlightElement(element, async === true, env.callback);
            }
          },
          highlightElement: function(element, async, callback) {
            var language = _.util.getLanguage(element);
            var grammar = _.languages[language];
            _.util.setLanguage(element, language);
            var parent = element.parentElement;
            if (parent && parent.nodeName.toLowerCase() === "pre") {
              _.util.setLanguage(parent, language);
            }
            var code2 = element.textContent;
            var env = {
              element,
              language,
              grammar,
              code: code2
            };
            function insertHighlightedCode(highlightedCode) {
              env.highlightedCode = highlightedCode;
              _.hooks.run("before-insert", env);
              env.element.innerHTML = env.highlightedCode;
              _.hooks.run("after-highlight", env);
              _.hooks.run("complete", env);
              callback && callback.call(env.element);
            }
            _.hooks.run("before-sanity-check", env);
            parent = env.element.parentElement;
            if (parent && parent.nodeName.toLowerCase() === "pre" && !parent.hasAttribute("tabindex")) {
              parent.setAttribute("tabindex", "0");
            }
            if (!env.code) {
              _.hooks.run("complete", env);
              callback && callback.call(env.element);
              return;
            }
            _.hooks.run("before-highlight", env);
            if (!env.grammar) {
              insertHighlightedCode(_.util.encode(env.code));
              return;
            }
            if (async && _self2.Worker) {
              var worker = new Worker(_.filename);
              worker.onmessage = function(evt) {
                insertHighlightedCode(evt.data);
              };
              worker.postMessage(JSON.stringify({
                language: env.language,
                code: env.code,
                immediateClose: true
              }));
            } else {
              insertHighlightedCode(_.highlight(env.code, env.grammar, env.language));
            }
          },
          highlight: function(text, grammar, language) {
            var env = {
              code: text,
              grammar,
              language
            };
            _.hooks.run("before-tokenize", env);
            if (!env.grammar) {
              throw new Error('The language "' + env.language + '" has no grammar.');
            }
            env.tokens = _.tokenize(env.code, env.grammar);
            _.hooks.run("after-tokenize", env);
            return Token.stringify(_.util.encode(env.tokens), env.language);
          },
          tokenize: function(text, grammar) {
            var rest = grammar.rest;
            if (rest) {
              for (var token in rest) {
                grammar[token] = rest[token];
              }
              delete grammar.rest;
            }
            var tokenList = new LinkedList();
            addAfter(tokenList, tokenList.head, text);
            matchGrammar(text, tokenList, grammar, tokenList.head, 0);
            return toArray(tokenList);
          },
          hooks: {
            all: {},
            add: function(name, callback) {
              var hooks = _.hooks.all;
              hooks[name] = hooks[name] || [];
              hooks[name].push(callback);
            },
            run: function(name, env) {
              var callbacks = _.hooks.all[name];
              if (!callbacks || !callbacks.length) {
                return;
              }
              for (var i = 0, callback; callback = callbacks[i++]; ) {
                callback(env);
              }
            }
          },
          Token
        };
        _self2.Prism = _;
        function Token(type, content, alias, matchedStr) {
          this.type = type;
          this.content = content;
          this.alias = alias;
          this.length = (matchedStr || "").length | 0;
        }
        Token.stringify = function stringify(o, language) {
          if (typeof o == "string") {
            return o;
          }
          if (Array.isArray(o)) {
            var s = "";
            o.forEach(function(e) {
              s += stringify(e, language);
            });
            return s;
          }
          var env = {
            type: o.type,
            content: stringify(o.content, language),
            tag: "span",
            classes: ["token", o.type],
            attributes: {},
            language
          };
          var aliases = o.alias;
          if (aliases) {
            if (Array.isArray(aliases)) {
              Array.prototype.push.apply(env.classes, aliases);
            } else {
              env.classes.push(aliases);
            }
          }
          _.hooks.run("wrap", env);
          var attributes = "";
          for (var name in env.attributes) {
            attributes += " " + name + '="' + (env.attributes[name] || "").replace(/"/g, "&quot;") + '"';
          }
          return "<" + env.tag + ' class="' + env.classes.join(" ") + '"' + attributes + ">" + env.content + "</" + env.tag + ">";
        };
        function matchPattern(pattern, pos, text, lookbehind) {
          pattern.lastIndex = pos;
          var match = pattern.exec(text);
          if (match && lookbehind && match[1]) {
            var lookbehindLength = match[1].length;
            match.index += lookbehindLength;
            match[0] = match[0].slice(lookbehindLength);
          }
          return match;
        }
        function matchGrammar(text, tokenList, grammar, startNode, startPos, rematch) {
          for (var token in grammar) {
            if (!grammar.hasOwnProperty(token) || !grammar[token]) {
              continue;
            }
            var patterns = grammar[token];
            patterns = Array.isArray(patterns) ? patterns : [patterns];
            for (var j = 0; j < patterns.length; ++j) {
              if (rematch && rematch.cause == token + "," + j) {
                return;
              }
              var patternObj = patterns[j];
              var inside = patternObj.inside;
              var lookbehind = !!patternObj.lookbehind;
              var greedy = !!patternObj.greedy;
              var alias = patternObj.alias;
              if (greedy && !patternObj.pattern.global) {
                var flags = patternObj.pattern.toString().match(/[imsuy]*$/)[0];
                patternObj.pattern = RegExp(patternObj.pattern.source, flags + "g");
              }
              var pattern = patternObj.pattern || patternObj;
              for (var currentNode = startNode.next, pos = startPos; currentNode !== tokenList.tail; pos += currentNode.value.length, currentNode = currentNode.next) {
                if (rematch && pos >= rematch.reach) {
                  break;
                }
                var str = currentNode.value;
                if (tokenList.length > text.length) {
                  return;
                }
                if (str instanceof Token) {
                  continue;
                }
                var removeCount = 1;
                var match;
                if (greedy) {
                  match = matchPattern(pattern, pos, text, lookbehind);
                  if (!match || match.index >= text.length) {
                    break;
                  }
                  var from = match.index;
                  var to = match.index + match[0].length;
                  var p = pos;
                  p += currentNode.value.length;
                  while (from >= p) {
                    currentNode = currentNode.next;
                    p += currentNode.value.length;
                  }
                  p -= currentNode.value.length;
                  pos = p;
                  if (currentNode.value instanceof Token) {
                    continue;
                  }
                  for (var k = currentNode; k !== tokenList.tail && (p < to || typeof k.value === "string"); k = k.next) {
                    removeCount++;
                    p += k.value.length;
                  }
                  removeCount--;
                  str = text.slice(pos, p);
                  match.index -= pos;
                } else {
                  match = matchPattern(pattern, 0, str, lookbehind);
                  if (!match) {
                    continue;
                  }
                }
                var from = match.index;
                var matchStr = match[0];
                var before = str.slice(0, from);
                var after = str.slice(from + matchStr.length);
                var reach = pos + str.length;
                if (rematch && reach > rematch.reach) {
                  rematch.reach = reach;
                }
                var removeFrom = currentNode.prev;
                if (before) {
                  removeFrom = addAfter(tokenList, removeFrom, before);
                  pos += before.length;
                }
                removeRange(tokenList, removeFrom, removeCount);
                var wrapped = new Token(token, inside ? _.tokenize(matchStr, inside) : matchStr, alias, matchStr);
                currentNode = addAfter(tokenList, removeFrom, wrapped);
                if (after) {
                  addAfter(tokenList, currentNode, after);
                }
                if (removeCount > 1) {
                  var nestedRematch = {
                    cause: token + "," + j,
                    reach
                  };
                  matchGrammar(text, tokenList, grammar, currentNode.prev, pos, nestedRematch);
                  if (rematch && nestedRematch.reach > rematch.reach) {
                    rematch.reach = nestedRematch.reach;
                  }
                }
              }
            }
          }
        }
        function LinkedList() {
          var head = { value: null, prev: null, next: null };
          var tail = { value: null, prev: head, next: null };
          head.next = tail;
          this.head = head;
          this.tail = tail;
          this.length = 0;
        }
        function addAfter(list2, node, value) {
          var next = node.next;
          var newNode = { value, prev: node, next };
          node.next = newNode;
          next.prev = newNode;
          list2.length++;
          return newNode;
        }
        function removeRange(list2, node, count) {
          var next = node.next;
          for (var i = 0; i < count && next !== list2.tail; i++) {
            next = next.next;
          }
          node.next = next;
          next.prev = node;
          list2.length -= i;
        }
        function toArray(list2) {
          var array = [];
          var node = list2.head.next;
          while (node !== list2.tail) {
            array.push(node.value);
            node = node.next;
          }
          return array;
        }
        if (!_self2.document) {
          if (!_self2.addEventListener) {
            return _;
          }
          if (!_.disableWorkerMessageHandler) {
            _self2.addEventListener("message", function(evt) {
              var message = JSON.parse(evt.data);
              var lang2 = message.language;
              var code2 = message.code;
              var immediateClose = message.immediateClose;
              _self2.postMessage(_.highlight(code2, _.languages[lang2], lang2));
              if (immediateClose) {
                _self2.close();
              }
            }, false);
          }
          return _;
        }
        var script = _.util.currentScript();
        if (script) {
          _.filename = script.src;
          if (script.hasAttribute("data-manual")) {
            _.manual = true;
          }
        }
        function highlightAutomaticallyCallback() {
          if (!_.manual) {
            _.highlightAll();
          }
        }
        if (!_.manual) {
          var readyState = document.readyState;
          if (readyState === "loading" || readyState === "interactive" && script && script.defer) {
            document.addEventListener("DOMContentLoaded", highlightAutomaticallyCallback);
          } else {
            if (window.requestAnimationFrame) {
              window.requestAnimationFrame(highlightAutomaticallyCallback);
            } else {
              window.setTimeout(highlightAutomaticallyCallback, 16);
            }
          }
        }
        return _;
      }(_self);
      if (typeof module !== "undefined" && module.exports) {
        module.exports = Prism2;
      }
      if (typeof global !== "undefined") {
        global.Prism = Prism2;
      }
      Prism2.languages.markup = {
        "comment": {
          pattern: /<!--(?:(?!<!--)[\s\S])*?-->/,
          greedy: true
        },
        "prolog": {
          pattern: /<\?[\s\S]+?\?>/,
          greedy: true
        },
        "doctype": {
          pattern: /<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,
          greedy: true,
          inside: {
            "internal-subset": {
              pattern: /(^[^\[]*\[)[\s\S]+(?=\]>$)/,
              lookbehind: true,
              greedy: true,
              inside: null
            },
            "string": {
              pattern: /"[^"]*"|'[^']*'/,
              greedy: true
            },
            "punctuation": /^<!|>$|[[\]]/,
            "doctype-tag": /^DOCTYPE/i,
            "name": /[^\s<>'"]+/
          }
        },
        "cdata": {
          pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
          greedy: true
        },
        "tag": {
          pattern: /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,
          greedy: true,
          inside: {
            "tag": {
              pattern: /^<\/?[^\s>\/]+/,
              inside: {
                "punctuation": /^<\/?/,
                "namespace": /^[^\s>\/:]+:/
              }
            },
            "special-attr": [],
            "attr-value": {
              pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,
              inside: {
                "punctuation": [
                  {
                    pattern: /^=/,
                    alias: "attr-equals"
                  },
                  {
                    pattern: /^(\s*)["']|["']$/,
                    lookbehind: true
                  }
                ]
              }
            },
            "punctuation": /\/?>/,
            "attr-name": {
              pattern: /[^\s>\/]+/,
              inside: {
                "namespace": /^[^\s>\/:]+:/
              }
            }
          }
        },
        "entity": [
          {
            pattern: /&[\da-z]{1,8};/i,
            alias: "named-entity"
          },
          /&#x?[\da-f]{1,8};/i
        ]
      };
      Prism2.languages.markup["tag"].inside["attr-value"].inside["entity"] = Prism2.languages.markup["entity"];
      Prism2.languages.markup["doctype"].inside["internal-subset"].inside = Prism2.languages.markup;
      Prism2.hooks.add("wrap", function(env) {
        if (env.type === "entity") {
          env.attributes["title"] = env.content.replace(/&amp;/, "&");
        }
      });
      Object.defineProperty(Prism2.languages.markup.tag, "addInlined", {
        value: function addInlined(tagName, lang) {
          var includedCdataInside = {};
          includedCdataInside["language-" + lang] = {
            pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,
            lookbehind: true,
            inside: Prism2.languages[lang]
          };
          includedCdataInside["cdata"] = /^<!\[CDATA\[|\]\]>$/i;
          var inside = {
            "included-cdata": {
              pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
              inside: includedCdataInside
            }
          };
          inside["language-" + lang] = {
            pattern: /[\s\S]+/,
            inside: Prism2.languages[lang]
          };
          var def = {};
          def[tagName] = {
            pattern: RegExp(/(<__[^>]*>)(?:<!\[CDATA\[(?:[^\]]|\](?!\]>))*\]\]>|(?!<!\[CDATA\[)[\s\S])*?(?=<\/__>)/.source.replace(/__/g, function() {
              return tagName;
            }), "i"),
            lookbehind: true,
            greedy: true,
            inside
          };
          Prism2.languages.insertBefore("markup", "cdata", def);
        }
      });
      Object.defineProperty(Prism2.languages.markup.tag, "addAttribute", {
        value: function(attrName, lang) {
          Prism2.languages.markup.tag.inside["special-attr"].push({
            pattern: RegExp(
              /(^|["'\s])/.source + "(?:" + attrName + ")" + /\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))/.source,
              "i"
            ),
            lookbehind: true,
            inside: {
              "attr-name": /^[^\s=]+/,
              "attr-value": {
                pattern: /=[\s\S]+/,
                inside: {
                  "value": {
                    pattern: /(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/,
                    lookbehind: true,
                    alias: [lang, "language-" + lang],
                    inside: Prism2.languages[lang]
                  },
                  "punctuation": [
                    {
                      pattern: /^=/,
                      alias: "attr-equals"
                    },
                    /"|'/
                  ]
                }
              }
            }
          });
        }
      });
      Prism2.languages.html = Prism2.languages.markup;
      Prism2.languages.mathml = Prism2.languages.markup;
      Prism2.languages.svg = Prism2.languages.markup;
      Prism2.languages.xml = Prism2.languages.extend("markup", {});
      Prism2.languages.ssml = Prism2.languages.xml;
      Prism2.languages.atom = Prism2.languages.xml;
      Prism2.languages.rss = Prism2.languages.xml;
      (function(Prism3) {
        var string = /(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/;
        Prism3.languages.css = {
          "comment": /\/\*[\s\S]*?\*\//,
          "atrule": {
            pattern: RegExp("@[\\w-](?:" + /[^;{\s"']|\s+(?!\s)/.source + "|" + string.source + ")*?" + /(?:;|(?=\s*\{))/.source),
            inside: {
              "rule": /^@[\w-]+/,
              "selector-function-argument": {
                pattern: /(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,
                lookbehind: true,
                alias: "selector"
              },
              "keyword": {
                pattern: /(^|[^\w-])(?:and|not|only|or)(?![\w-])/,
                lookbehind: true
              }
            }
          },
          "url": {
            pattern: RegExp("\\burl\\((?:" + string.source + "|" + /(?:[^\\\r\n()"']|\\[\s\S])*/.source + ")\\)", "i"),
            greedy: true,
            inside: {
              "function": /^url/i,
              "punctuation": /^\(|\)$/,
              "string": {
                pattern: RegExp("^" + string.source + "$"),
                alias: "url"
              }
            }
          },
          "selector": {
            pattern: RegExp(`(^|[{}\\s])[^{}\\s](?:[^{};"'\\s]|\\s+(?![\\s{])|` + string.source + ")*(?=\\s*\\{)"),
            lookbehind: true
          },
          "string": {
            pattern: string,
            greedy: true
          },
          "property": {
            pattern: /(^|[^-\w\xA0-\uFFFF])(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,
            lookbehind: true
          },
          "important": /!important\b/i,
          "function": {
            pattern: /(^|[^-a-z0-9])[-a-z0-9]+(?=\()/i,
            lookbehind: true
          },
          "punctuation": /[(){};:,]/
        };
        Prism3.languages.css["atrule"].inside.rest = Prism3.languages.css;
        var markup = Prism3.languages.markup;
        if (markup) {
          markup.tag.addInlined("style", "css");
          markup.tag.addAttribute("style", "css");
        }
      })(Prism2);
      Prism2.languages.clike = {
        "comment": [
          {
            pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,
            lookbehind: true,
            greedy: true
          },
          {
            pattern: /(^|[^\\:])\/\/.*/,
            lookbehind: true,
            greedy: true
          }
        ],
        "string": {
          pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
          greedy: true
        },
        "class-name": {
          pattern: /(\b(?:class|extends|implements|instanceof|interface|new|trait)\s+|\bcatch\s+\()[\w.\\]+/i,
          lookbehind: true,
          inside: {
            "punctuation": /[.\\]/
          }
        },
        "keyword": /\b(?:break|catch|continue|do|else|finally|for|function|if|in|instanceof|new|null|return|throw|try|while)\b/,
        "boolean": /\b(?:false|true)\b/,
        "function": /\b\w+(?=\()/,
        "number": /\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,
        "operator": /[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,
        "punctuation": /[{}[\];(),.:]/
      };
      Prism2.languages.javascript = Prism2.languages.extend("clike", {
        "class-name": [
          Prism2.languages.clike["class-name"],
          {
            pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:constructor|prototype))/,
            lookbehind: true
          }
        ],
        "keyword": [
          {
            pattern: /((?:^|\})\s*)catch\b/,
            lookbehind: true
          },
          {
            pattern: /(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,
            lookbehind: true
          }
        ],
        "function": /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,
        "number": {
          pattern: RegExp(
            /(^|[^\w$])/.source + "(?:" + (/NaN|Infinity/.source + "|" + /0[bB][01]+(?:_[01]+)*n?/.source + "|" + /0[oO][0-7]+(?:_[0-7]+)*n?/.source + "|" + /0[xX][\dA-Fa-f]+(?:_[\dA-Fa-f]+)*n?/.source + "|" + /\d+(?:_\d+)*n/.source + "|" + /(?:\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\.\d+(?:_\d+)*)(?:[Ee][+-]?\d+(?:_\d+)*)?/.source) + ")" + /(?![\w$])/.source
          ),
          lookbehind: true
        },
        "operator": /--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/
      });
      Prism2.languages.javascript["class-name"][0].pattern = /(\b(?:class|extends|implements|instanceof|interface|new)\s+)[\w.\\]+/;
      Prism2.languages.insertBefore("javascript", "keyword", {
        "regex": {
          pattern: RegExp(
            /((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)/.source + /\//.source + "(?:" + /(?:\[(?:[^\]\\\r\n]|\\.)*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}/.source + "|" + /(?:\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.)*\])*\])*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}v[dgimyus]{0,7}/.source + ")" + /(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/.source
          ),
          lookbehind: true,
          greedy: true,
          inside: {
            "regex-source": {
              pattern: /^(\/)[\s\S]+(?=\/[a-z]*$)/,
              lookbehind: true,
              alias: "language-regex",
              inside: Prism2.languages.regex
            },
            "regex-delimiter": /^\/|\/$/,
            "regex-flags": /^[a-z]+$/
          }
        },
        "function-variable": {
          pattern: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,
          alias: "function"
        },
        "parameter": [
          {
            pattern: /(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,
            lookbehind: true,
            inside: Prism2.languages.javascript
          },
          {
            pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,
            lookbehind: true,
            inside: Prism2.languages.javascript
          },
          {
            pattern: /(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,
            lookbehind: true,
            inside: Prism2.languages.javascript
          },
          {
            pattern: /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,
            lookbehind: true,
            inside: Prism2.languages.javascript
          }
        ],
        "constant": /\b[A-Z](?:[A-Z_]|\dx?)*\b/
      });
      Prism2.languages.insertBefore("javascript", "string", {
        "hashbang": {
          pattern: /^#!.*/,
          greedy: true,
          alias: "comment"
        },
        "template-string": {
          pattern: /`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/,
          greedy: true,
          inside: {
            "template-punctuation": {
              pattern: /^`|`$/,
              alias: "string"
            },
            "interpolation": {
              pattern: /((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/,
              lookbehind: true,
              inside: {
                "interpolation-punctuation": {
                  pattern: /^\$\{|\}$/,
                  alias: "punctuation"
                },
                rest: Prism2.languages.javascript
              }
            },
            "string": /[\s\S]+/
          }
        },
        "string-property": {
          pattern: /((?:^|[,{])[ \t]*)(["'])(?:\\(?:\r\n|[\s\S])|(?!\2)[^\\\r\n])*\2(?=\s*:)/m,
          lookbehind: true,
          greedy: true,
          alias: "property"
        }
      });
      Prism2.languages.insertBefore("javascript", "operator", {
        "literal-property": {
          pattern: /((?:^|[,{])[ \t]*)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/m,
          lookbehind: true,
          alias: "property"
        }
      });
      if (Prism2.languages.markup) {
        Prism2.languages.markup.tag.addInlined("script", "javascript");
        Prism2.languages.markup.tag.addAttribute(
          /on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)/.source,
          "javascript"
        );
      }
      Prism2.languages.js = Prism2.languages.javascript;
      (function() {
        if (typeof Prism2 === "undefined" || typeof document === "undefined") {
          return;
        }
        if (!Element.prototype.matches) {
          Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
        }
        var LOADING_MESSAGE = "Loading\u2026";
        var FAILURE_MESSAGE = function(status, message) {
          return "\u2716 Error " + status + " while fetching file: " + message;
        };
        var FAILURE_EMPTY_MESSAGE = "\u2716 Error: File does not exist or is empty";
        var EXTENSIONS = {
          "js": "javascript",
          "py": "python",
          "rb": "ruby",
          "ps1": "powershell",
          "psm1": "powershell",
          "sh": "bash",
          "bat": "batch",
          "h": "c",
          "tex": "latex"
        };
        var STATUS_ATTR = "data-src-status";
        var STATUS_LOADING = "loading";
        var STATUS_LOADED = "loaded";
        var STATUS_FAILED = "failed";
        var SELECTOR = "pre[data-src]:not([" + STATUS_ATTR + '="' + STATUS_LOADED + '"]):not([' + STATUS_ATTR + '="' + STATUS_LOADING + '"])';
        function loadFile(src, success, error) {
          var xhr = new XMLHttpRequest();
          xhr.open("GET", src, true);
          xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
              if (xhr.status < 400 && xhr.responseText) {
                success(xhr.responseText);
              } else {
                if (xhr.status >= 400) {
                  error(FAILURE_MESSAGE(xhr.status, xhr.statusText));
                } else {
                  error(FAILURE_EMPTY_MESSAGE);
                }
              }
            }
          };
          xhr.send(null);
        }
        function parseRange(range) {
          var m = /^\s*(\d+)\s*(?:(,)\s*(?:(\d+)\s*)?)?$/.exec(range || "");
          if (m) {
            var start = Number(m[1]);
            var comma = m[2];
            var end = m[3];
            if (!comma) {
              return [start, start];
            }
            if (!end) {
              return [start, void 0];
            }
            return [start, Number(end)];
          }
          return void 0;
        }
        Prism2.hooks.add("before-highlightall", function(env) {
          env.selector += ", " + SELECTOR;
        });
        Prism2.hooks.add("before-sanity-check", function(env) {
          var pre = env.element;
          if (pre.matches(SELECTOR)) {
            env.code = "";
            pre.setAttribute(STATUS_ATTR, STATUS_LOADING);
            var code2 = pre.appendChild(document.createElement("CODE"));
            code2.textContent = LOADING_MESSAGE;
            var src = pre.getAttribute("data-src");
            var language = env.language;
            if (language === "none") {
              var extension = (/\.(\w+)$/.exec(src) || [, "none"])[1];
              language = EXTENSIONS[extension] || extension;
            }
            Prism2.util.setLanguage(code2, language);
            Prism2.util.setLanguage(pre, language);
            var autoloader = Prism2.plugins.autoloader;
            if (autoloader) {
              autoloader.loadLanguages(language);
            }
            loadFile(
              src,
              function(text) {
                pre.setAttribute(STATUS_ATTR, STATUS_LOADED);
                var range = parseRange(pre.getAttribute("data-range"));
                if (range) {
                  var lines = text.split(/\r\n?|\n/g);
                  var start = range[0];
                  var end = range[1] == null ? lines.length : range[1];
                  if (start < 0) {
                    start += lines.length;
                  }
                  start = Math.max(0, Math.min(start - 1, lines.length));
                  if (end < 0) {
                    end += lines.length;
                  }
                  end = Math.max(0, Math.min(end, lines.length));
                  text = lines.slice(start, end).join("\n");
                  if (!pre.hasAttribute("data-start")) {
                    pre.setAttribute("data-start", String(start + 1));
                  }
                }
                code2.textContent = text;
                Prism2.highlightElement(code2);
              },
              function(error) {
                pre.setAttribute(STATUS_ATTR, STATUS_FAILED);
                code2.textContent = error;
              }
            );
          }
        });
        Prism2.plugins.fileHighlight = {
          highlight: function highlight(container) {
            var elements = (container || document).querySelectorAll(SELECTOR);
            for (var i = 0, element; element = elements[i++]; ) {
              Prism2.highlightElement(element);
            }
          }
        };
        var logged = false;
        Prism2.fileHighlight = function() {
          if (!logged) {
            console.warn("Prism.fileHighlight is deprecated. Use `Prism.plugins.fileHighlight.highlight` instead.");
            logged = true;
          }
          Prism2.plugins.fileHighlight.highlight.apply(this, arguments);
        };
      })();
    }
  });

  // node_modules/prismjs/components/prism-clike.js
  var require_prism_clike = __commonJS({
    "node_modules/prismjs/components/prism-clike.js"() {
      Prism.languages.clike = {
        "comment": [
          {
            pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,
            lookbehind: true,
            greedy: true
          },
          {
            pattern: /(^|[^\\:])\/\/.*/,
            lookbehind: true,
            greedy: true
          }
        ],
        "string": {
          pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
          greedy: true
        },
        "class-name": {
          pattern: /(\b(?:class|extends|implements|instanceof|interface|new|trait)\s+|\bcatch\s+\()[\w.\\]+/i,
          lookbehind: true,
          inside: {
            "punctuation": /[.\\]/
          }
        },
        "keyword": /\b(?:break|catch|continue|do|else|finally|for|function|if|in|instanceof|new|null|return|throw|try|while)\b/,
        "boolean": /\b(?:false|true)\b/,
        "function": /\b\w+(?=\()/,
        "number": /\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,
        "operator": /[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,
        "punctuation": /[{}[\];(),.:]/
      };
    }
  });

  // node_modules/prismjs/components/prism-javascript.js
  var require_prism_javascript = __commonJS({
    "node_modules/prismjs/components/prism-javascript.js"() {
      Prism.languages.javascript = Prism.languages.extend("clike", {
        "class-name": [
          Prism.languages.clike["class-name"],
          {
            pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:constructor|prototype))/,
            lookbehind: true
          }
        ],
        "keyword": [
          {
            pattern: /((?:^|\})\s*)catch\b/,
            lookbehind: true
          },
          {
            pattern: /(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,
            lookbehind: true
          }
        ],
        "function": /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,
        "number": {
          pattern: RegExp(
            /(^|[^\w$])/.source + "(?:" + (/NaN|Infinity/.source + "|" + /0[bB][01]+(?:_[01]+)*n?/.source + "|" + /0[oO][0-7]+(?:_[0-7]+)*n?/.source + "|" + /0[xX][\dA-Fa-f]+(?:_[\dA-Fa-f]+)*n?/.source + "|" + /\d+(?:_\d+)*n/.source + "|" + /(?:\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\.\d+(?:_\d+)*)(?:[Ee][+-]?\d+(?:_\d+)*)?/.source) + ")" + /(?![\w$])/.source
          ),
          lookbehind: true
        },
        "operator": /--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/
      });
      Prism.languages.javascript["class-name"][0].pattern = /(\b(?:class|extends|implements|instanceof|interface|new)\s+)[\w.\\]+/;
      Prism.languages.insertBefore("javascript", "keyword", {
        "regex": {
          pattern: RegExp(
            /((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)/.source + /\//.source + "(?:" + /(?:\[(?:[^\]\\\r\n]|\\.)*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}/.source + "|" + /(?:\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.)*\])*\])*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}v[dgimyus]{0,7}/.source + ")" + /(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/.source
          ),
          lookbehind: true,
          greedy: true,
          inside: {
            "regex-source": {
              pattern: /^(\/)[\s\S]+(?=\/[a-z]*$)/,
              lookbehind: true,
              alias: "language-regex",
              inside: Prism.languages.regex
            },
            "regex-delimiter": /^\/|\/$/,
            "regex-flags": /^[a-z]+$/
          }
        },
        "function-variable": {
          pattern: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,
          alias: "function"
        },
        "parameter": [
          {
            pattern: /(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,
            lookbehind: true,
            inside: Prism.languages.javascript
          },
          {
            pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,
            lookbehind: true,
            inside: Prism.languages.javascript
          },
          {
            pattern: /(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,
            lookbehind: true,
            inside: Prism.languages.javascript
          },
          {
            pattern: /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,
            lookbehind: true,
            inside: Prism.languages.javascript
          }
        ],
        "constant": /\b[A-Z](?:[A-Z_]|\dx?)*\b/
      });
      Prism.languages.insertBefore("javascript", "string", {
        "hashbang": {
          pattern: /^#!.*/,
          greedy: true,
          alias: "comment"
        },
        "template-string": {
          pattern: /`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/,
          greedy: true,
          inside: {
            "template-punctuation": {
              pattern: /^`|`$/,
              alias: "string"
            },
            "interpolation": {
              pattern: /((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/,
              lookbehind: true,
              inside: {
                "interpolation-punctuation": {
                  pattern: /^\$\{|\}$/,
                  alias: "punctuation"
                },
                rest: Prism.languages.javascript
              }
            },
            "string": /[\s\S]+/
          }
        },
        "string-property": {
          pattern: /((?:^|[,{])[ \t]*)(["'])(?:\\(?:\r\n|[\s\S])|(?!\2)[^\\\r\n])*\2(?=\s*:)/m,
          lookbehind: true,
          greedy: true,
          alias: "property"
        }
      });
      Prism.languages.insertBefore("javascript", "operator", {
        "literal-property": {
          pattern: /((?:^|[,{])[ \t]*)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/m,
          lookbehind: true,
          alias: "property"
        }
      });
      if (Prism.languages.markup) {
        Prism.languages.markup.tag.addInlined("script", "javascript");
        Prism.languages.markup.tag.addAttribute(
          /on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)/.source,
          "javascript"
        );
      }
      Prism.languages.js = Prism.languages.javascript;
    }
  });

  // node_modules/prismjs/components/prism-markup.js
  var require_prism_markup = __commonJS({
    "node_modules/prismjs/components/prism-markup.js"() {
      Prism.languages.markup = {
        "comment": {
          pattern: /<!--(?:(?!<!--)[\s\S])*?-->/,
          greedy: true
        },
        "prolog": {
          pattern: /<\?[\s\S]+?\?>/,
          greedy: true
        },
        "doctype": {
          pattern: /<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,
          greedy: true,
          inside: {
            "internal-subset": {
              pattern: /(^[^\[]*\[)[\s\S]+(?=\]>$)/,
              lookbehind: true,
              greedy: true,
              inside: null
            },
            "string": {
              pattern: /"[^"]*"|'[^']*'/,
              greedy: true
            },
            "punctuation": /^<!|>$|[[\]]/,
            "doctype-tag": /^DOCTYPE/i,
            "name": /[^\s<>'"]+/
          }
        },
        "cdata": {
          pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
          greedy: true
        },
        "tag": {
          pattern: /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,
          greedy: true,
          inside: {
            "tag": {
              pattern: /^<\/?[^\s>\/]+/,
              inside: {
                "punctuation": /^<\/?/,
                "namespace": /^[^\s>\/:]+:/
              }
            },
            "special-attr": [],
            "attr-value": {
              pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,
              inside: {
                "punctuation": [
                  {
                    pattern: /^=/,
                    alias: "attr-equals"
                  },
                  {
                    pattern: /^(\s*)["']|["']$/,
                    lookbehind: true
                  }
                ]
              }
            },
            "punctuation": /\/?>/,
            "attr-name": {
              pattern: /[^\s>\/]+/,
              inside: {
                "namespace": /^[^\s>\/:]+:/
              }
            }
          }
        },
        "entity": [
          {
            pattern: /&[\da-z]{1,8};/i,
            alias: "named-entity"
          },
          /&#x?[\da-f]{1,8};/i
        ]
      };
      Prism.languages.markup["tag"].inside["attr-value"].inside["entity"] = Prism.languages.markup["entity"];
      Prism.languages.markup["doctype"].inside["internal-subset"].inside = Prism.languages.markup;
      Prism.hooks.add("wrap", function(env) {
        if (env.type === "entity") {
          env.attributes["title"] = env.content.replace(/&amp;/, "&");
        }
      });
      Object.defineProperty(Prism.languages.markup.tag, "addInlined", {
        value: function addInlined(tagName, lang) {
          var includedCdataInside = {};
          includedCdataInside["language-" + lang] = {
            pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,
            lookbehind: true,
            inside: Prism.languages[lang]
          };
          includedCdataInside["cdata"] = /^<!\[CDATA\[|\]\]>$/i;
          var inside = {
            "included-cdata": {
              pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
              inside: includedCdataInside
            }
          };
          inside["language-" + lang] = {
            pattern: /[\s\S]+/,
            inside: Prism.languages[lang]
          };
          var def = {};
          def[tagName] = {
            pattern: RegExp(/(<__[^>]*>)(?:<!\[CDATA\[(?:[^\]]|\](?!\]>))*\]\]>|(?!<!\[CDATA\[)[\s\S])*?(?=<\/__>)/.source.replace(/__/g, function() {
              return tagName;
            }), "i"),
            lookbehind: true,
            greedy: true,
            inside
          };
          Prism.languages.insertBefore("markup", "cdata", def);
        }
      });
      Object.defineProperty(Prism.languages.markup.tag, "addAttribute", {
        value: function(attrName, lang) {
          Prism.languages.markup.tag.inside["special-attr"].push({
            pattern: RegExp(
              /(^|["'\s])/.source + "(?:" + attrName + ")" + /\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))/.source,
              "i"
            ),
            lookbehind: true,
            inside: {
              "attr-name": /^[^\s=]+/,
              "attr-value": {
                pattern: /=[\s\S]+/,
                inside: {
                  "value": {
                    pattern: /(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/,
                    lookbehind: true,
                    alias: [lang, "language-" + lang],
                    inside: Prism.languages[lang]
                  },
                  "punctuation": [
                    {
                      pattern: /^=/,
                      alias: "attr-equals"
                    },
                    /"|'/
                  ]
                }
              }
            }
          });
        }
      });
      Prism.languages.html = Prism.languages.markup;
      Prism.languages.mathml = Prism.languages.markup;
      Prism.languages.svg = Prism.languages.markup;
      Prism.languages.xml = Prism.languages.extend("markup", {});
      Prism.languages.ssml = Prism.languages.xml;
      Prism.languages.atom = Prism.languages.xml;
      Prism.languages.rss = Prism.languages.xml;
    }
  });

  // node_modules/prismjs/components/prism-markdown.js
  var require_prism_markdown = __commonJS({
    "node_modules/prismjs/components/prism-markdown.js"() {
      (function(Prism2) {
        var inner = /(?:\\.|[^\\\n\r]|(?:\n|\r\n?)(?![\r\n]))/.source;
        function createInline(pattern) {
          pattern = pattern.replace(/<inner>/g, function() {
            return inner;
          });
          return RegExp(/((?:^|[^\\])(?:\\{2})*)/.source + "(?:" + pattern + ")");
        }
        var tableCell = /(?:\\.|``(?:[^`\r\n]|`(?!`))+``|`[^`\r\n]+`|[^\\|\r\n`])+/.source;
        var tableRow = /\|?__(?:\|__)+\|?(?:(?:\n|\r\n?)|(?![\s\S]))/.source.replace(/__/g, function() {
          return tableCell;
        });
        var tableLine = /\|?[ \t]*:?-{3,}:?[ \t]*(?:\|[ \t]*:?-{3,}:?[ \t]*)+\|?(?:\n|\r\n?)/.source;
        Prism2.languages.markdown = Prism2.languages.extend("markup", {});
        Prism2.languages.insertBefore("markdown", "prolog", {
          "front-matter-block": {
            pattern: /(^(?:\s*[\r\n])?)---(?!.)[\s\S]*?[\r\n]---(?!.)/,
            lookbehind: true,
            greedy: true,
            inside: {
              "punctuation": /^---|---$/,
              "front-matter": {
                pattern: /\S+(?:\s+\S+)*/,
                alias: ["yaml", "language-yaml"],
                inside: Prism2.languages.yaml
              }
            }
          },
          "blockquote": {
            pattern: /^>(?:[\t ]*>)*/m,
            alias: "punctuation"
          },
          "table": {
            pattern: RegExp("^" + tableRow + tableLine + "(?:" + tableRow + ")*", "m"),
            inside: {
              "table-data-rows": {
                pattern: RegExp("^(" + tableRow + tableLine + ")(?:" + tableRow + ")*$"),
                lookbehind: true,
                inside: {
                  "table-data": {
                    pattern: RegExp(tableCell),
                    inside: Prism2.languages.markdown
                  },
                  "punctuation": /\|/
                }
              },
              "table-line": {
                pattern: RegExp("^(" + tableRow + ")" + tableLine + "$"),
                lookbehind: true,
                inside: {
                  "punctuation": /\||:?-{3,}:?/
                }
              },
              "table-header-row": {
                pattern: RegExp("^" + tableRow + "$"),
                inside: {
                  "table-header": {
                    pattern: RegExp(tableCell),
                    alias: "important",
                    inside: Prism2.languages.markdown
                  },
                  "punctuation": /\|/
                }
              }
            }
          },
          "code": [
            {
              pattern: /((?:^|\n)[ \t]*\n|(?:^|\r\n?)[ \t]*\r\n?)(?: {4}|\t).+(?:(?:\n|\r\n?)(?: {4}|\t).+)*/,
              lookbehind: true,
              alias: "keyword"
            },
            {
              pattern: /^```[\s\S]*?^```$/m,
              greedy: true,
              inside: {
                "code-block": {
                  pattern: /^(```.*(?:\n|\r\n?))[\s\S]+?(?=(?:\n|\r\n?)^```$)/m,
                  lookbehind: true
                },
                "code-language": {
                  pattern: /^(```).+/,
                  lookbehind: true
                },
                "punctuation": /```/
              }
            }
          ],
          "title": [
            {
              pattern: /\S.*(?:\n|\r\n?)(?:==+|--+)(?=[ \t]*$)/m,
              alias: "important",
              inside: {
                punctuation: /==+$|--+$/
              }
            },
            {
              pattern: /(^\s*)#.+/m,
              lookbehind: true,
              alias: "important",
              inside: {
                punctuation: /^#+|#+$/
              }
            }
          ],
          "hr": {
            pattern: /(^\s*)([*-])(?:[\t ]*\2){2,}(?=\s*$)/m,
            lookbehind: true,
            alias: "punctuation"
          },
          "list": {
            pattern: /(^\s*)(?:[*+-]|\d+\.)(?=[\t ].)/m,
            lookbehind: true,
            alias: "punctuation"
          },
          "url-reference": {
            pattern: /!?\[[^\]]+\]:[\t ]+(?:\S+|<(?:\\.|[^>\\])+>)(?:[\t ]+(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\)))?/,
            inside: {
              "variable": {
                pattern: /^(!?\[)[^\]]+/,
                lookbehind: true
              },
              "string": /(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\))$/,
              "punctuation": /^[\[\]!:]|[<>]/
            },
            alias: "url"
          },
          "bold": {
            pattern: createInline(/\b__(?:(?!_)<inner>|_(?:(?!_)<inner>)+_)+__\b|\*\*(?:(?!\*)<inner>|\*(?:(?!\*)<inner>)+\*)+\*\*/.source),
            lookbehind: true,
            greedy: true,
            inside: {
              "content": {
                pattern: /(^..)[\s\S]+(?=..$)/,
                lookbehind: true,
                inside: {}
              },
              "punctuation": /\*\*|__/
            }
          },
          "italic": {
            pattern: createInline(/\b_(?:(?!_)<inner>|__(?:(?!_)<inner>)+__)+_\b|\*(?:(?!\*)<inner>|\*\*(?:(?!\*)<inner>)+\*\*)+\*/.source),
            lookbehind: true,
            greedy: true,
            inside: {
              "content": {
                pattern: /(^.)[\s\S]+(?=.$)/,
                lookbehind: true,
                inside: {}
              },
              "punctuation": /[*_]/
            }
          },
          "strike": {
            pattern: createInline(/(~~?)(?:(?!~)<inner>)+\2/.source),
            lookbehind: true,
            greedy: true,
            inside: {
              "content": {
                pattern: /(^~~?)[\s\S]+(?=\1$)/,
                lookbehind: true,
                inside: {}
              },
              "punctuation": /~~?/
            }
          },
          "code-snippet": {
            pattern: /(^|[^\\`])(?:``[^`\r\n]+(?:`[^`\r\n]+)*``(?!`)|`[^`\r\n]+`(?!`))/,
            lookbehind: true,
            greedy: true,
            alias: ["code", "keyword"]
          },
          "url": {
            pattern: createInline(/!?\[(?:(?!\])<inner>)+\](?:\([^\s)]+(?:[\t ]+"(?:\\.|[^"\\])*")?\)|[ \t]?\[(?:(?!\])<inner>)+\])/.source),
            lookbehind: true,
            greedy: true,
            inside: {
              "operator": /^!/,
              "content": {
                pattern: /(^\[)[^\]]+(?=\])/,
                lookbehind: true,
                inside: {}
              },
              "variable": {
                pattern: /(^\][ \t]?\[)[^\]]+(?=\]$)/,
                lookbehind: true
              },
              "url": {
                pattern: /(^\]\()[^\s)]+/,
                lookbehind: true
              },
              "string": {
                pattern: /(^[ \t]+)"(?:\\.|[^"\\])*"(?=\)$)/,
                lookbehind: true
              }
            }
          }
        });
        ["url", "bold", "italic", "strike"].forEach(function(token) {
          ["url", "bold", "italic", "strike", "code-snippet"].forEach(function(inside) {
            if (token !== inside) {
              Prism2.languages.markdown[token].inside.content.inside[inside] = Prism2.languages.markdown[inside];
            }
          });
        });
        Prism2.hooks.add("after-tokenize", function(env) {
          if (env.language !== "markdown" && env.language !== "md") {
            return;
          }
          function walkTokens(tokens) {
            if (!tokens || typeof tokens === "string") {
              return;
            }
            for (var i = 0, l = tokens.length; i < l; i++) {
              var token = tokens[i];
              if (token.type !== "code") {
                walkTokens(token.content);
                continue;
              }
              var codeLang = token.content[1];
              var codeBlock = token.content[3];
              if (codeLang && codeBlock && codeLang.type === "code-language" && codeBlock.type === "code-block" && typeof codeLang.content === "string") {
                var lang = codeLang.content.replace(/\b#/g, "sharp").replace(/\b\+\+/g, "pp");
                lang = (/[a-z][\w-]*/i.exec(lang) || [""])[0].toLowerCase();
                var alias = "language-" + lang;
                if (!codeBlock.alias) {
                  codeBlock.alias = [alias];
                } else if (typeof codeBlock.alias === "string") {
                  codeBlock.alias = [codeBlock.alias, alias];
                } else {
                  codeBlock.alias.push(alias);
                }
              }
            }
          }
          walkTokens(env.tokens);
        });
        Prism2.hooks.add("wrap", function(env) {
          if (env.type !== "code-block") {
            return;
          }
          var codeLang = "";
          for (var i = 0, l = env.classes.length; i < l; i++) {
            var cls = env.classes[i];
            var match = /language-(.+)/.exec(cls);
            if (match) {
              codeLang = match[1];
              break;
            }
          }
          var grammar = Prism2.languages[codeLang];
          if (!grammar) {
            if (codeLang && codeLang !== "none" && Prism2.plugins.autoloader) {
              var id = "md-" + new Date().valueOf() + "-" + Math.floor(Math.random() * 1e16);
              env.attributes["id"] = id;
              Prism2.plugins.autoloader.loadLanguages(codeLang, function() {
                var ele = document.getElementById(id);
                if (ele) {
                  ele.innerHTML = Prism2.highlight(ele.textContent, Prism2.languages[codeLang], codeLang);
                }
              });
            }
          } else {
            env.content = Prism2.highlight(textContent(env.content), grammar, codeLang);
          }
        });
        var tagPattern = RegExp(Prism2.languages.markup.tag.pattern.source, "gi");
        var KNOWN_ENTITY_NAMES = {
          "amp": "&",
          "lt": "<",
          "gt": ">",
          "quot": '"'
        };
        var fromCodePoint = String.fromCodePoint || String.fromCharCode;
        function textContent(html) {
          var text = html.replace(tagPattern, "");
          text = text.replace(/&(\w{1,8}|#x?[\da-f]{1,8});/gi, function(m, code2) {
            code2 = code2.toLowerCase();
            if (code2[0] === "#") {
              var value;
              if (code2[1] === "x") {
                value = parseInt(code2.slice(2), 16);
              } else {
                value = Number(code2.slice(1));
              }
              return fromCodePoint(value);
            } else {
              var known = KNOWN_ENTITY_NAMES[code2];
              if (known) {
                return known;
              }
              return m;
            }
          });
          return text;
        }
        Prism2.languages.md = Prism2.languages.markdown;
      })(Prism);
    }
  });

  // node_modules/prismjs/components/prism-c.js
  var require_prism_c = __commonJS({
    "node_modules/prismjs/components/prism-c.js"() {
      Prism.languages.c = Prism.languages.extend("clike", {
        "comment": {
          pattern: /\/\/(?:[^\r\n\\]|\\(?:\r\n?|\n|(?![\r\n])))*|\/\*[\s\S]*?(?:\*\/|$)/,
          greedy: true
        },
        "string": {
          pattern: /"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"/,
          greedy: true
        },
        "class-name": {
          pattern: /(\b(?:enum|struct)\s+(?:__attribute__\s*\(\([\s\S]*?\)\)\s*)?)\w+|\b[a-z]\w*_t\b/,
          lookbehind: true
        },
        "keyword": /\b(?:_Alignas|_Alignof|_Atomic|_Bool|_Complex|_Generic|_Imaginary|_Noreturn|_Static_assert|_Thread_local|__attribute__|asm|auto|break|case|char|const|continue|default|do|double|else|enum|extern|float|for|goto|if|inline|int|long|register|return|short|signed|sizeof|static|struct|switch|typedef|typeof|union|unsigned|void|volatile|while)\b/,
        "function": /\b[a-z_]\w*(?=\s*\()/i,
        "number": /(?:\b0x(?:[\da-f]+(?:\.[\da-f]*)?|\.[\da-f]+)(?:p[+-]?\d+)?|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?)[ful]{0,4}/i,
        "operator": />>=?|<<=?|->|([-+&|:])\1|[?:~]|[-+*/%&|^!=<>]=?/
      });
      Prism.languages.insertBefore("c", "string", {
        "char": {
          pattern: /'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n]){0,32}'/,
          greedy: true
        }
      });
      Prism.languages.insertBefore("c", "string", {
        "macro": {
          pattern: /(^[\t ]*)#\s*[a-z](?:[^\r\n\\/]|\/(?!\*)|\/\*(?:[^*]|\*(?!\/))*\*\/|\\(?:\r\n|[\s\S]))*/im,
          lookbehind: true,
          greedy: true,
          alias: "property",
          inside: {
            "string": [
              {
                pattern: /^(#\s*include\s*)<[^>]+>/,
                lookbehind: true
              },
              Prism.languages.c["string"]
            ],
            "char": Prism.languages.c["char"],
            "comment": Prism.languages.c["comment"],
            "macro-name": [
              {
                pattern: /(^#\s*define\s+)\w+\b(?!\()/i,
                lookbehind: true
              },
              {
                pattern: /(^#\s*define\s+)\w+\b(?=\()/i,
                lookbehind: true,
                alias: "function"
              }
            ],
            "directive": {
              pattern: /^(#\s*)[a-z]+/,
              lookbehind: true,
              alias: "keyword"
            },
            "directive-hash": /^#/,
            "punctuation": /##|\\(?=[\r\n])/,
            "expression": {
              pattern: /\S[\s\S]*/,
              inside: Prism.languages.c
            }
          }
        }
      });
      Prism.languages.insertBefore("c", "function", {
        "constant": /\b(?:EOF|NULL|SEEK_CUR|SEEK_END|SEEK_SET|__DATE__|__FILE__|__LINE__|__TIMESTAMP__|__TIME__|__func__|stderr|stdin|stdout)\b/
      });
      delete Prism.languages.c["boolean"];
    }
  });

  // node_modules/prismjs/components/prism-css.js
  var require_prism_css = __commonJS({
    "node_modules/prismjs/components/prism-css.js"() {
      (function(Prism2) {
        var string = /(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/;
        Prism2.languages.css = {
          "comment": /\/\*[\s\S]*?\*\//,
          "atrule": {
            pattern: RegExp("@[\\w-](?:" + /[^;{\s"']|\s+(?!\s)/.source + "|" + string.source + ")*?" + /(?:;|(?=\s*\{))/.source),
            inside: {
              "rule": /^@[\w-]+/,
              "selector-function-argument": {
                pattern: /(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,
                lookbehind: true,
                alias: "selector"
              },
              "keyword": {
                pattern: /(^|[^\w-])(?:and|not|only|or)(?![\w-])/,
                lookbehind: true
              }
            }
          },
          "url": {
            pattern: RegExp("\\burl\\((?:" + string.source + "|" + /(?:[^\\\r\n()"']|\\[\s\S])*/.source + ")\\)", "i"),
            greedy: true,
            inside: {
              "function": /^url/i,
              "punctuation": /^\(|\)$/,
              "string": {
                pattern: RegExp("^" + string.source + "$"),
                alias: "url"
              }
            }
          },
          "selector": {
            pattern: RegExp(`(^|[{}\\s])[^{}\\s](?:[^{};"'\\s]|\\s+(?![\\s{])|` + string.source + ")*(?=\\s*\\{)"),
            lookbehind: true
          },
          "string": {
            pattern: string,
            greedy: true
          },
          "property": {
            pattern: /(^|[^-\w\xA0-\uFFFF])(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,
            lookbehind: true
          },
          "important": /!important\b/i,
          "function": {
            pattern: /(^|[^-a-z0-9])[-a-z0-9]+(?=\()/i,
            lookbehind: true
          },
          "punctuation": /[(){};:,]/
        };
        Prism2.languages.css["atrule"].inside.rest = Prism2.languages.css;
        var markup = Prism2.languages.markup;
        if (markup) {
          markup.tag.addInlined("style", "css");
          markup.tag.addAttribute("style", "css");
        }
      })(Prism);
    }
  });

  // node_modules/prismjs/components/prism-objectivec.js
  var require_prism_objectivec = __commonJS({
    "node_modules/prismjs/components/prism-objectivec.js"() {
      Prism.languages.objectivec = Prism.languages.extend("c", {
        "string": {
          pattern: /@?"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"/,
          greedy: true
        },
        "keyword": /\b(?:asm|auto|break|case|char|const|continue|default|do|double|else|enum|extern|float|for|goto|if|in|inline|int|long|register|return|self|short|signed|sizeof|static|struct|super|switch|typedef|typeof|union|unsigned|void|volatile|while)\b|(?:@interface|@end|@implementation|@protocol|@class|@public|@protected|@private|@property|@try|@catch|@finally|@throw|@synthesize|@dynamic|@selector)\b/,
        "operator": /-[->]?|\+\+?|!=?|<<?=?|>>?=?|==?|&&?|\|\|?|[~^%?*\/@]/
      });
      delete Prism.languages.objectivec["class-name"];
      Prism.languages.objc = Prism.languages.objectivec;
    }
  });

  // node_modules/prismjs/components/prism-sql.js
  var require_prism_sql = __commonJS({
    "node_modules/prismjs/components/prism-sql.js"() {
      Prism.languages.sql = {
        "comment": {
          pattern: /(^|[^\\])(?:\/\*[\s\S]*?\*\/|(?:--|\/\/|#).*)/,
          lookbehind: true
        },
        "variable": [
          {
            pattern: /@(["'`])(?:\\[\s\S]|(?!\1)[^\\])+\1/,
            greedy: true
          },
          /@[\w.$]+/
        ],
        "string": {
          pattern: /(^|[^@\\])("|')(?:\\[\s\S]|(?!\2)[^\\]|\2\2)*\2/,
          greedy: true,
          lookbehind: true
        },
        "identifier": {
          pattern: /(^|[^@\\])`(?:\\[\s\S]|[^`\\]|``)*`/,
          greedy: true,
          lookbehind: true,
          inside: {
            "punctuation": /^`|`$/
          }
        },
        "function": /\b(?:AVG|COUNT|FIRST|FORMAT|LAST|LCASE|LEN|MAX|MID|MIN|MOD|NOW|ROUND|SUM|UCASE)(?=\s*\()/i,
        "keyword": /\b(?:ACTION|ADD|AFTER|ALGORITHM|ALL|ALTER|ANALYZE|ANY|APPLY|AS|ASC|AUTHORIZATION|AUTO_INCREMENT|BACKUP|BDB|BEGIN|BERKELEYDB|BIGINT|BINARY|BIT|BLOB|BOOL|BOOLEAN|BREAK|BROWSE|BTREE|BULK|BY|CALL|CASCADED?|CASE|CHAIN|CHAR(?:ACTER|SET)?|CHECK(?:POINT)?|CLOSE|CLUSTERED|COALESCE|COLLATE|COLUMNS?|COMMENT|COMMIT(?:TED)?|COMPUTE|CONNECT|CONSISTENT|CONSTRAINT|CONTAINS(?:TABLE)?|CONTINUE|CONVERT|CREATE|CROSS|CURRENT(?:_DATE|_TIME|_TIMESTAMP|_USER)?|CURSOR|CYCLE|DATA(?:BASES?)?|DATE(?:TIME)?|DAY|DBCC|DEALLOCATE|DEC|DECIMAL|DECLARE|DEFAULT|DEFINER|DELAYED|DELETE|DELIMITERS?|DENY|DESC|DESCRIBE|DETERMINISTIC|DISABLE|DISCARD|DISK|DISTINCT|DISTINCTROW|DISTRIBUTED|DO|DOUBLE|DROP|DUMMY|DUMP(?:FILE)?|DUPLICATE|ELSE(?:IF)?|ENABLE|ENCLOSED|END|ENGINE|ENUM|ERRLVL|ERRORS|ESCAPED?|EXCEPT|EXEC(?:UTE)?|EXISTS|EXIT|EXPLAIN|EXTENDED|FETCH|FIELDS|FILE|FILLFACTOR|FIRST|FIXED|FLOAT|FOLLOWING|FOR(?: EACH ROW)?|FORCE|FOREIGN|FREETEXT(?:TABLE)?|FROM|FULL|FUNCTION|GEOMETRY(?:COLLECTION)?|GLOBAL|GOTO|GRANT|GROUP|HANDLER|HASH|HAVING|HOLDLOCK|HOUR|IDENTITY(?:COL|_INSERT)?|IF|IGNORE|IMPORT|INDEX|INFILE|INNER|INNODB|INOUT|INSERT|INT|INTEGER|INTERSECT|INTERVAL|INTO|INVOKER|ISOLATION|ITERATE|JOIN|KEYS?|KILL|LANGUAGE|LAST|LEAVE|LEFT|LEVEL|LIMIT|LINENO|LINES|LINESTRING|LOAD|LOCAL|LOCK|LONG(?:BLOB|TEXT)|LOOP|MATCH(?:ED)?|MEDIUM(?:BLOB|INT|TEXT)|MERGE|MIDDLEINT|MINUTE|MODE|MODIFIES|MODIFY|MONTH|MULTI(?:LINESTRING|POINT|POLYGON)|NATIONAL|NATURAL|NCHAR|NEXT|NO|NONCLUSTERED|NULLIF|NUMERIC|OFF?|OFFSETS?|ON|OPEN(?:DATASOURCE|QUERY|ROWSET)?|OPTIMIZE|OPTION(?:ALLY)?|ORDER|OUT(?:ER|FILE)?|OVER|PARTIAL|PARTITION|PERCENT|PIVOT|PLAN|POINT|POLYGON|PRECEDING|PRECISION|PREPARE|PREV|PRIMARY|PRINT|PRIVILEGES|PROC(?:EDURE)?|PUBLIC|PURGE|QUICK|RAISERROR|READS?|REAL|RECONFIGURE|REFERENCES|RELEASE|RENAME|REPEAT(?:ABLE)?|REPLACE|REPLICATION|REQUIRE|RESIGNAL|RESTORE|RESTRICT|RETURN(?:ING|S)?|REVOKE|RIGHT|ROLLBACK|ROUTINE|ROW(?:COUNT|GUIDCOL|S)?|RTREE|RULE|SAVE(?:POINT)?|SCHEMA|SECOND|SELECT|SERIAL(?:IZABLE)?|SESSION(?:_USER)?|SET(?:USER)?|SHARE|SHOW|SHUTDOWN|SIMPLE|SMALLINT|SNAPSHOT|SOME|SONAME|SQL|START(?:ING)?|STATISTICS|STATUS|STRIPED|SYSTEM_USER|TABLES?|TABLESPACE|TEMP(?:ORARY|TABLE)?|TERMINATED|TEXT(?:SIZE)?|THEN|TIME(?:STAMP)?|TINY(?:BLOB|INT|TEXT)|TOP?|TRAN(?:SACTIONS?)?|TRIGGER|TRUNCATE|TSEQUAL|TYPES?|UNBOUNDED|UNCOMMITTED|UNDEFINED|UNION|UNIQUE|UNLOCK|UNPIVOT|UNSIGNED|UPDATE(?:TEXT)?|USAGE|USE|USER|USING|VALUES?|VAR(?:BINARY|CHAR|CHARACTER|YING)|VIEW|WAITFOR|WARNINGS|WHEN|WHERE|WHILE|WITH(?: ROLLUP|IN)?|WORK|WRITE(?:TEXT)?|YEAR)\b/i,
        "boolean": /\b(?:FALSE|NULL|TRUE)\b/i,
        "number": /\b0x[\da-f]+\b|\b\d+(?:\.\d*)?|\B\.\d+\b/i,
        "operator": /[-+*\/=%^~]|&&?|\|\|?|!=?|<(?:=>?|<|>)?|>[>=]?|\b(?:AND|BETWEEN|DIV|ILIKE|IN|IS|LIKE|NOT|OR|REGEXP|RLIKE|SOUNDS LIKE|XOR)\b/i,
        "punctuation": /[;[\]()`,.]/
      };
    }
  });

  // node_modules/prismjs/components/prism-python.js
  var require_prism_python = __commonJS({
    "node_modules/prismjs/components/prism-python.js"() {
      Prism.languages.python = {
        "comment": {
          pattern: /(^|[^\\])#.*/,
          lookbehind: true,
          greedy: true
        },
        "string-interpolation": {
          pattern: /(?:f|fr|rf)(?:("""|''')[\s\S]*?\1|("|')(?:\\.|(?!\2)[^\\\r\n])*\2)/i,
          greedy: true,
          inside: {
            "interpolation": {
              pattern: /((?:^|[^{])(?:\{\{)*)\{(?!\{)(?:[^{}]|\{(?!\{)(?:[^{}]|\{(?!\{)(?:[^{}])+\})+\})+\}/,
              lookbehind: true,
              inside: {
                "format-spec": {
                  pattern: /(:)[^:(){}]+(?=\}$)/,
                  lookbehind: true
                },
                "conversion-option": {
                  pattern: /![sra](?=[:}]$)/,
                  alias: "punctuation"
                },
                rest: null
              }
            },
            "string": /[\s\S]+/
          }
        },
        "triple-quoted-string": {
          pattern: /(?:[rub]|br|rb)?("""|''')[\s\S]*?\1/i,
          greedy: true,
          alias: "string"
        },
        "string": {
          pattern: /(?:[rub]|br|rb)?("|')(?:\\.|(?!\1)[^\\\r\n])*\1/i,
          greedy: true
        },
        "function": {
          pattern: /((?:^|\s)def[ \t]+)[a-zA-Z_]\w*(?=\s*\()/g,
          lookbehind: true
        },
        "class-name": {
          pattern: /(\bclass\s+)\w+/i,
          lookbehind: true
        },
        "decorator": {
          pattern: /(^[\t ]*)@\w+(?:\.\w+)*/m,
          lookbehind: true,
          alias: ["annotation", "punctuation"],
          inside: {
            "punctuation": /\./
          }
        },
        "keyword": /\b(?:_(?=\s*:)|and|as|assert|async|await|break|case|class|continue|def|del|elif|else|except|exec|finally|for|from|global|if|import|in|is|lambda|match|nonlocal|not|or|pass|print|raise|return|try|while|with|yield)\b/,
        "builtin": /\b(?:__import__|abs|all|any|apply|ascii|basestring|bin|bool|buffer|bytearray|bytes|callable|chr|classmethod|cmp|coerce|compile|complex|delattr|dict|dir|divmod|enumerate|eval|execfile|file|filter|float|format|frozenset|getattr|globals|hasattr|hash|help|hex|id|input|int|intern|isinstance|issubclass|iter|len|list|locals|long|map|max|memoryview|min|next|object|oct|open|ord|pow|property|range|raw_input|reduce|reload|repr|reversed|round|set|setattr|slice|sorted|staticmethod|str|sum|super|tuple|type|unichr|unicode|vars|xrange|zip)\b/,
        "boolean": /\b(?:False|None|True)\b/,
        "number": /\b0(?:b(?:_?[01])+|o(?:_?[0-7])+|x(?:_?[a-f0-9])+)\b|(?:\b\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\B\.\d+(?:_\d+)*)(?:e[+-]?\d+(?:_\d+)*)?j?(?!\w)/i,
        "operator": /[-+%=]=?|!=|:=|\*\*?=?|\/\/?=?|<[<=>]?|>[=>]?|[&|^~]/,
        "punctuation": /[{}[\];(),.:]/
      };
      Prism.languages.python["string-interpolation"].inside["interpolation"].inside.rest = Prism.languages.python;
      Prism.languages.py = Prism.languages.python;
    }
  });

  // node_modules/prismjs/components/prism-rust.js
  var require_prism_rust = __commonJS({
    "node_modules/prismjs/components/prism-rust.js"() {
      (function(Prism2) {
        var multilineComment = /\/\*(?:[^*/]|\*(?!\/)|\/(?!\*)|<self>)*\*\//.source;
        for (var i = 0; i < 2; i++) {
          multilineComment = multilineComment.replace(/<self>/g, function() {
            return multilineComment;
          });
        }
        multilineComment = multilineComment.replace(/<self>/g, function() {
          return /[^\s\S]/.source;
        });
        Prism2.languages.rust = {
          "comment": [
            {
              pattern: RegExp(/(^|[^\\])/.source + multilineComment),
              lookbehind: true,
              greedy: true
            },
            {
              pattern: /(^|[^\\:])\/\/.*/,
              lookbehind: true,
              greedy: true
            }
          ],
          "string": {
            pattern: /b?"(?:\\[\s\S]|[^\\"])*"|b?r(#*)"(?:[^"]|"(?!\1))*"\1/,
            greedy: true
          },
          "char": {
            pattern: /b?'(?:\\(?:x[0-7][\da-fA-F]|u\{(?:[\da-fA-F]_*){1,6}\}|.)|[^\\\r\n\t'])'/,
            greedy: true
          },
          "attribute": {
            pattern: /#!?\[(?:[^\[\]"]|"(?:\\[\s\S]|[^\\"])*")*\]/,
            greedy: true,
            alias: "attr-name",
            inside: {
              "string": null
            }
          },
          "closure-params": {
            pattern: /([=(,:]\s*|\bmove\s*)\|[^|]*\||\|[^|]*\|(?=\s*(?:\{|->))/,
            lookbehind: true,
            greedy: true,
            inside: {
              "closure-punctuation": {
                pattern: /^\||\|$/,
                alias: "punctuation"
              },
              rest: null
            }
          },
          "lifetime-annotation": {
            pattern: /'\w+/,
            alias: "symbol"
          },
          "fragment-specifier": {
            pattern: /(\$\w+:)[a-z]+/,
            lookbehind: true,
            alias: "punctuation"
          },
          "variable": /\$\w+/,
          "function-definition": {
            pattern: /(\bfn\s+)\w+/,
            lookbehind: true,
            alias: "function"
          },
          "type-definition": {
            pattern: /(\b(?:enum|struct|trait|type|union)\s+)\w+/,
            lookbehind: true,
            alias: "class-name"
          },
          "module-declaration": [
            {
              pattern: /(\b(?:crate|mod)\s+)[a-z][a-z_\d]*/,
              lookbehind: true,
              alias: "namespace"
            },
            {
              pattern: /(\b(?:crate|self|super)\s*)::\s*[a-z][a-z_\d]*\b(?:\s*::(?:\s*[a-z][a-z_\d]*\s*::)*)?/,
              lookbehind: true,
              alias: "namespace",
              inside: {
                "punctuation": /::/
              }
            }
          ],
          "keyword": [
            /\b(?:Self|abstract|as|async|await|become|box|break|const|continue|crate|do|dyn|else|enum|extern|final|fn|for|if|impl|in|let|loop|macro|match|mod|move|mut|override|priv|pub|ref|return|self|static|struct|super|trait|try|type|typeof|union|unsafe|unsized|use|virtual|where|while|yield)\b/,
            /\b(?:bool|char|f(?:32|64)|[ui](?:8|16|32|64|128|size)|str)\b/
          ],
          "function": /\b[a-z_]\w*(?=\s*(?:::\s*<|\())/,
          "macro": {
            pattern: /\b\w+!/,
            alias: "property"
          },
          "constant": /\b[A-Z_][A-Z_\d]+\b/,
          "class-name": /\b[A-Z]\w*\b/,
          "namespace": {
            pattern: /(?:\b[a-z][a-z_\d]*\s*::\s*)*\b[a-z][a-z_\d]*\s*::(?!\s*<)/,
            inside: {
              "punctuation": /::/
            }
          },
          "number": /\b(?:0x[\dA-Fa-f](?:_?[\dA-Fa-f])*|0o[0-7](?:_?[0-7])*|0b[01](?:_?[01])*|(?:(?:\d(?:_?\d)*)?\.)?\d(?:_?\d)*(?:[Ee][+-]?\d+)?)(?:_?(?:f32|f64|[iu](?:8|16|32|64|size)?))?\b/,
          "boolean": /\b(?:false|true)\b/,
          "punctuation": /->|\.\.=|\.{1,3}|::|[{}[\];(),:]/,
          "operator": /[-+*\/%!^]=?|=[=>]?|&[&=]?|\|[|=]?|<<?=?|>>?=?|[@?]/
        };
        Prism2.languages.rust["closure-params"].inside.rest = Prism2.languages.rust;
        Prism2.languages.rust["attribute"].inside["string"] = Prism2.languages.rust["string"];
      })(Prism);
    }
  });

  // node_modules/prismjs/components/prism-swift.js
  var require_prism_swift = __commonJS({
    "node_modules/prismjs/components/prism-swift.js"() {
      Prism.languages.swift = {
        "comment": {
          pattern: /(^|[^\\:])(?:\/\/.*|\/\*(?:[^/*]|\/(?!\*)|\*(?!\/)|\/\*(?:[^*]|\*(?!\/))*\*\/)*\*\/)/,
          lookbehind: true,
          greedy: true
        },
        "string-literal": [
          {
            pattern: RegExp(
              /(^|[^"#])/.source + "(?:" + /"(?:\\(?:\((?:[^()]|\([^()]*\))*\)|\r\n|[^(])|[^\\\r\n"])*"/.source + "|" + /"""(?:\\(?:\((?:[^()]|\([^()]*\))*\)|[^(])|[^\\"]|"(?!""))*"""/.source + ")" + /(?!["#])/.source
            ),
            lookbehind: true,
            greedy: true,
            inside: {
              "interpolation": {
                pattern: /(\\\()(?:[^()]|\([^()]*\))*(?=\))/,
                lookbehind: true,
                inside: null
              },
              "interpolation-punctuation": {
                pattern: /^\)|\\\($/,
                alias: "punctuation"
              },
              "punctuation": /\\(?=[\r\n])/,
              "string": /[\s\S]+/
            }
          },
          {
            pattern: RegExp(
              /(^|[^"#])(#+)/.source + "(?:" + /"(?:\\(?:#+\((?:[^()]|\([^()]*\))*\)|\r\n|[^#])|[^\\\r\n])*?"/.source + "|" + /"""(?:\\(?:#+\((?:[^()]|\([^()]*\))*\)|[^#])|[^\\])*?"""/.source + ")\\2"
            ),
            lookbehind: true,
            greedy: true,
            inside: {
              "interpolation": {
                pattern: /(\\#+\()(?:[^()]|\([^()]*\))*(?=\))/,
                lookbehind: true,
                inside: null
              },
              "interpolation-punctuation": {
                pattern: /^\)|\\#+\($/,
                alias: "punctuation"
              },
              "string": /[\s\S]+/
            }
          }
        ],
        "directive": {
          pattern: RegExp(
            /#/.source + "(?:" + (/(?:elseif|if)\b/.source + "(?:[ 	]*" + /(?:![ \t]*)?(?:\b\w+\b(?:[ \t]*\((?:[^()]|\([^()]*\))*\))?|\((?:[^()]|\([^()]*\))*\))(?:[ \t]*(?:&&|\|\|))?/.source + ")+") + "|" + /(?:else|endif)\b/.source + ")"
          ),
          alias: "property",
          inside: {
            "directive-name": /^#\w+/,
            "boolean": /\b(?:false|true)\b/,
            "number": /\b\d+(?:\.\d+)*\b/,
            "operator": /!|&&|\|\||[<>]=?/,
            "punctuation": /[(),]/
          }
        },
        "literal": {
          pattern: /#(?:colorLiteral|column|dsohandle|file(?:ID|Literal|Path)?|function|imageLiteral|line)\b/,
          alias: "constant"
        },
        "other-directive": {
          pattern: /#\w+\b/,
          alias: "property"
        },
        "attribute": {
          pattern: /@\w+/,
          alias: "atrule"
        },
        "function-definition": {
          pattern: /(\bfunc\s+)\w+/,
          lookbehind: true,
          alias: "function"
        },
        "label": {
          pattern: /\b(break|continue)\s+\w+|\b[a-zA-Z_]\w*(?=\s*:\s*(?:for|repeat|while)\b)/,
          lookbehind: true,
          alias: "important"
        },
        "keyword": /\b(?:Any|Protocol|Self|Type|actor|as|assignment|associatedtype|associativity|async|await|break|case|catch|class|continue|convenience|default|defer|deinit|didSet|do|dynamic|else|enum|extension|fallthrough|fileprivate|final|for|func|get|guard|higherThan|if|import|in|indirect|infix|init|inout|internal|is|isolated|lazy|left|let|lowerThan|mutating|none|nonisolated|nonmutating|open|operator|optional|override|postfix|precedencegroup|prefix|private|protocol|public|repeat|required|rethrows|return|right|safe|self|set|some|static|struct|subscript|super|switch|throw|throws|try|typealias|unowned|unsafe|var|weak|where|while|willSet)\b/,
        "boolean": /\b(?:false|true)\b/,
        "nil": {
          pattern: /\bnil\b/,
          alias: "constant"
        },
        "short-argument": /\$\d+\b/,
        "omit": {
          pattern: /\b_\b/,
          alias: "keyword"
        },
        "number": /\b(?:[\d_]+(?:\.[\de_]+)?|0x[a-f0-9_]+(?:\.[a-f0-9p_]+)?|0b[01_]+|0o[0-7_]+)\b/i,
        "class-name": /\b[A-Z](?:[A-Z_\d]*[a-z]\w*)?\b/,
        "function": /\b[a-z_]\w*(?=\s*\()/i,
        "constant": /\b(?:[A-Z_]{2,}|k[A-Z][A-Za-z_]+)\b/,
        "operator": /[-+*/%=!<>&|^~?]+|\.[.\-+*/%=!<>&|^~?]+/,
        "punctuation": /[{}[\]();,.:\\]/
      };
      Prism.languages.swift["string-literal"].forEach(function(rule) {
        rule.inside["interpolation"].inside = Prism.languages.swift;
      });
    }
  });

  // node_modules/@lexical/code/LexicalCode.dev.js
  var require_LexicalCode_dev = __commonJS({
    "node_modules/@lexical/code/LexicalCode.dev.js"(exports) {
      "use strict";
      var Prism2 = require_prism();
      require_prism_clike();
      require_prism_javascript();
      require_prism_markup();
      require_prism_markdown();
      require_prism_c();
      require_prism_css();
      require_prism_objectivec();
      require_prism_sql();
      require_prism_python();
      require_prism_rust();
      require_prism_swift();
      var utils = require_LexicalUtils();
      var lexical2 = require_Lexical();
      var DEFAULT_CODE_LANGUAGE = "javascript";
      var CODE_LANGUAGE_FRIENDLY_NAME_MAP = {
        c: "C",
        clike: "C-like",
        css: "CSS",
        html: "HTML",
        js: "JavaScript",
        markdown: "Markdown",
        objc: "Objective-C",
        plain: "Plain Text",
        py: "Python",
        rust: "Rust",
        sql: "SQL",
        swift: "Swift",
        xml: "XML"
      };
      var CODE_LANGUAGE_MAP = {
        javascript: "js",
        md: "markdown",
        plaintext: "plain",
        python: "py",
        text: "plain"
      };
      function normalizeCodeLang(lang) {
        return CODE_LANGUAGE_MAP[lang] || lang;
      }
      function getLanguageFriendlyName(lang) {
        const _lang = normalizeCodeLang(lang);
        return CODE_LANGUAGE_FRIENDLY_NAME_MAP[_lang] || _lang;
      }
      var getDefaultCodeLanguage = () => DEFAULT_CODE_LANGUAGE;
      var getCodeLanguages = () => Object.keys(Prism2.languages).filter(
        (language) => typeof Prism2.languages[language] !== "function"
      ).sort();
      var CodeHighlightNode = class extends lexical2.TextNode {
        constructor(text, highlightType, key) {
          super(text, key);
          this.__highlightType = highlightType;
        }
        static getType() {
          return "code-highlight";
        }
        static clone(node) {
          return new CodeHighlightNode(node.__text, node.__highlightType || void 0, node.__key);
        }
        getHighlightType() {
          const self2 = this.getLatest();
          return self2.__highlightType;
        }
        createDOM(config) {
          const element = super.createDOM(config);
          const className = getHighlightThemeClass(config.theme, this.__highlightType);
          utils.addClassNamesToElement(element, className);
          return element;
        }
        updateDOM(prevNode, dom, config) {
          const update = super.updateDOM(prevNode, dom, config);
          const prevClassName = getHighlightThemeClass(config.theme, prevNode.__highlightType);
          const nextClassName = getHighlightThemeClass(config.theme, this.__highlightType);
          if (prevClassName !== nextClassName) {
            if (prevClassName) {
              utils.removeClassNamesFromElement(dom, prevClassName);
            }
            if (nextClassName) {
              utils.addClassNamesToElement(dom, nextClassName);
            }
          }
          return update;
        }
        static importJSON(serializedNode) {
          const node = $createCodeHighlightNode(serializedNode.text, serializedNode.highlightType);
          node.setFormat(serializedNode.format);
          node.setDetail(serializedNode.detail);
          node.setMode(serializedNode.mode);
          node.setStyle(serializedNode.style);
          return node;
        }
        exportJSON() {
          return {
            ...super.exportJSON(),
            highlightType: this.getHighlightType(),
            type: "code-highlight",
            version: 1
          };
        }
        setFormat(format) {
          return this;
        }
      };
      function getHighlightThemeClass(theme, highlightType) {
        return highlightType && theme && theme.codeHighlight && theme.codeHighlight[highlightType];
      }
      function $createCodeHighlightNode(text, highlightType) {
        return new CodeHighlightNode(text, highlightType);
      }
      function $isCodeHighlightNode(node) {
        return node instanceof CodeHighlightNode;
      }
      function getFirstCodeHighlightNodeOfLine(anchor) {
        let currentNode = null;
        const previousSiblings = anchor.getPreviousSiblings();
        previousSiblings.push(anchor);
        while (previousSiblings.length > 0) {
          const node = previousSiblings.pop();
          if ($isCodeHighlightNode(node)) {
            currentNode = node;
          }
          if (lexical2.$isLineBreakNode(node)) {
            break;
          }
        }
        return currentNode;
      }
      function getLastCodeHighlightNodeOfLine(anchor) {
        let currentNode = null;
        const nextSiblings = anchor.getNextSiblings();
        nextSiblings.unshift(anchor);
        while (nextSiblings.length > 0) {
          const node = nextSiblings.shift();
          if ($isCodeHighlightNode(node)) {
            currentNode = node;
          }
          if (lexical2.$isLineBreakNode(node)) {
            break;
          }
        }
        return currentNode;
      }
      var mapToPrismLanguage = (language) => {
        return language != null && Prism2.languages.hasOwnProperty(language) ? language : void 0;
      };
      var LANGUAGE_DATA_ATTRIBUTE = "data-highlight-language";
      var CodeNode = class extends lexical2.ElementNode {
        static getType() {
          return "code";
        }
        static clone(node) {
          return new CodeNode(node.__language, node.__key);
        }
        constructor(language, key) {
          super(key);
          this.__language = mapToPrismLanguage(language);
        }
        createDOM(config) {
          const element = document.createElement("code");
          utils.addClassNamesToElement(element, config.theme.code);
          element.setAttribute("spellcheck", "false");
          const language = this.getLanguage();
          if (language) {
            element.setAttribute(LANGUAGE_DATA_ATTRIBUTE, language);
          }
          return element;
        }
        updateDOM(prevNode, dom) {
          const language = this.__language;
          const prevLanguage = prevNode.__language;
          if (language) {
            if (language !== prevLanguage) {
              dom.setAttribute(LANGUAGE_DATA_ATTRIBUTE, language);
            }
          } else if (prevLanguage) {
            dom.removeAttribute(LANGUAGE_DATA_ATTRIBUTE);
          }
          return false;
        }
        static importDOM() {
          return {
            code: (node) => {
              const isMultiLine = node.textContent != null && /\r?\n/.test(node.textContent);
              return isMultiLine ? {
                conversion: convertPreElement,
                priority: 1
              } : null;
            },
            div: (node) => ({
              conversion: convertDivElement,
              priority: 1
            }),
            pre: (node) => ({
              conversion: convertPreElement,
              priority: 0
            }),
            table: (node) => {
              const table2 = node;
              if (isGitHubCodeTable(table2)) {
                return {
                  conversion: convertTableElement,
                  priority: 4
                };
              }
              return null;
            },
            td: (node) => {
              const td = node;
              const table2 = td.closest("table");
              if (isGitHubCodeCell(td)) {
                return {
                  conversion: convertTableCellElement,
                  priority: 4
                };
              }
              if (table2 && isGitHubCodeTable(table2)) {
                return {
                  conversion: convertCodeNoop,
                  priority: 4
                };
              }
              return null;
            },
            tr: (node) => {
              const tr = node;
              const table2 = tr.closest("table");
              if (table2 && isGitHubCodeTable(table2)) {
                return {
                  conversion: convertCodeNoop,
                  priority: 4
                };
              }
              return null;
            }
          };
        }
        static importJSON(serializedNode) {
          const node = $createCodeNode(serializedNode.language);
          node.setFormat(serializedNode.format);
          node.setIndent(serializedNode.indent);
          node.setDirection(serializedNode.direction);
          return node;
        }
        exportJSON() {
          return {
            ...super.exportJSON(),
            language: this.getLanguage(),
            type: "code",
            version: 1
          };
        }
        insertNewAfter(selection) {
          const children = this.getChildren();
          const childrenLength = children.length;
          if (childrenLength >= 2 && children[childrenLength - 1].getTextContent() === "\n" && children[childrenLength - 2].getTextContent() === "\n" && selection.isCollapsed() && selection.anchor.key === this.__key && selection.anchor.offset === childrenLength) {
            children[childrenLength - 1].remove();
            children[childrenLength - 2].remove();
            const newElement = lexical2.$createParagraphNode();
            this.insertAfter(newElement);
            return newElement;
          }
          const anchor = selection.anchor.getNode();
          const firstNode = getFirstCodeHighlightNodeOfLine(anchor);
          if (firstNode != null) {
            let leadingWhitespace = 0;
            const firstNodeText = firstNode.getTextContent();
            while (leadingWhitespace < firstNodeText.length && /[\t ]/.test(firstNodeText[leadingWhitespace])) {
              leadingWhitespace += 1;
            }
            if (leadingWhitespace > 0) {
              const whitespace = firstNodeText.substring(0, leadingWhitespace);
              const indentedChild = $createCodeHighlightNode(whitespace);
              anchor.insertAfter(indentedChild);
              selection.insertNodes([lexical2.$createLineBreakNode()]);
              indentedChild.select();
              return indentedChild;
            }
          }
          return null;
        }
        canInsertTab() {
          const selection = lexical2.$getSelection();
          if (!lexical2.$isRangeSelection(selection) || !selection.isCollapsed()) {
            return false;
          }
          return true;
        }
        canIndent() {
          return false;
        }
        collapseAtStart() {
          const paragraph = lexical2.$createParagraphNode();
          const children = this.getChildren();
          children.forEach((child) => paragraph.append(child));
          this.replace(paragraph);
          return true;
        }
        setLanguage(language) {
          const writable = this.getWritable();
          writable.__language = mapToPrismLanguage(language);
        }
        getLanguage() {
          return this.getLatest().__language;
        }
      };
      function $createCodeNode(language) {
        return new CodeNode(language);
      }
      function $isCodeNode(node) {
        return node instanceof CodeNode;
      }
      function convertPreElement(domNode) {
        return {
          node: $createCodeNode(),
          preformatted: true
        };
      }
      function convertDivElement(domNode) {
        const div = domNode;
        const isCode = isCodeElement(div);
        return {
          after: (childLexicalNodes) => {
            const domParent = domNode.parentNode;
            if (domParent != null && domNode !== domParent.lastChild) {
              childLexicalNodes.push(lexical2.$createLineBreakNode());
            }
            return childLexicalNodes;
          },
          node: isCode ? $createCodeNode() : null,
          preformatted: isCode
        };
      }
      function convertTableElement() {
        return {
          node: $createCodeNode(),
          preformatted: true
        };
      }
      function convertCodeNoop() {
        return {
          node: null
        };
      }
      function convertTableCellElement(domNode) {
        const cell = domNode;
        return {
          after: (childLexicalNodes) => {
            if (cell.parentNode && cell.parentNode.nextSibling) {
              childLexicalNodes.push(lexical2.$createLineBreakNode());
            }
            return childLexicalNodes;
          },
          node: null
        };
      }
      function isCodeElement(div) {
        return div.style.fontFamily.match("monospace") !== null;
      }
      function isGitHubCodeCell(cell) {
        return cell.classList.contains("js-file-line");
      }
      function isGitHubCodeTable(table2) {
        return table2.classList.contains("js-file-line-container");
      }
      function isSpaceOrTabChar(char) {
        return char === " " || char === "	";
      }
      function findFirstNotSpaceOrTabCharAtText(text, isForward) {
        const length = text.length;
        let offset = -1;
        if (isForward) {
          for (let i = 0; i < length; i++) {
            const char = text[i];
            if (!isSpaceOrTabChar(char)) {
              offset = i;
              break;
            }
          }
        } else {
          for (let i = length - 1; i > -1; i--) {
            const char = text[i];
            if (!isSpaceOrTabChar(char)) {
              offset = i;
              break;
            }
          }
        }
        return offset;
      }
      function getStartOfCodeInLine(anchor) {
        let currentNode = null;
        let currentNodeOffset = -1;
        const previousSiblings = anchor.getPreviousSiblings();
        previousSiblings.push(anchor);
        while (previousSiblings.length > 0) {
          const node = previousSiblings.pop();
          if ($isCodeHighlightNode(node)) {
            const text = node.getTextContent();
            const offset = findFirstNotSpaceOrTabCharAtText(text, true);
            if (offset !== -1) {
              currentNode = node;
              currentNodeOffset = offset;
            }
          }
          if (lexical2.$isLineBreakNode(node)) {
            break;
          }
        }
        if (currentNode === null) {
          const nextSiblings = anchor.getNextSiblings();
          while (nextSiblings.length > 0) {
            const node = nextSiblings.shift();
            if ($isCodeHighlightNode(node)) {
              const text = node.getTextContent();
              const offset = findFirstNotSpaceOrTabCharAtText(text, true);
              if (offset !== -1) {
                currentNode = node;
                currentNodeOffset = offset;
                break;
              }
            }
            if (lexical2.$isLineBreakNode(node)) {
              break;
            }
          }
        }
        return {
          node: currentNode,
          offset: currentNodeOffset
        };
      }
      function getEndOfCodeInLine(anchor) {
        let currentNode = null;
        let currentNodeOffset = -1;
        const nextSiblings = anchor.getNextSiblings();
        nextSiblings.unshift(anchor);
        while (nextSiblings.length > 0) {
          const node = nextSiblings.shift();
          if ($isCodeHighlightNode(node)) {
            const text = node.getTextContent();
            const offset = findFirstNotSpaceOrTabCharAtText(text, false);
            if (offset !== -1) {
              currentNode = node;
              currentNodeOffset = offset + 1;
            }
          }
          if (lexical2.$isLineBreakNode(node)) {
            break;
          }
        }
        if (currentNode === null) {
          const previousSiblings = anchor.getPreviousSiblings();
          while (previousSiblings.length > 0) {
            const node = previousSiblings.pop();
            if ($isCodeHighlightNode(node)) {
              const text = node.getTextContent();
              const offset = findFirstNotSpaceOrTabCharAtText(text, false);
              if (offset !== -1) {
                currentNode = node;
                currentNodeOffset = offset + 1;
                break;
              }
            }
            if (lexical2.$isLineBreakNode(node)) {
              break;
            }
          }
        }
        return {
          node: currentNode,
          offset: currentNodeOffset
        };
      }
      function textNodeTransform(node, editor) {
        const parentNode = node.getParent();
        if ($isCodeNode(parentNode)) {
          codeNodeTransform(parentNode, editor);
        } else if ($isCodeHighlightNode(node)) {
          node.replace(lexical2.$createTextNode(node.__text));
        }
      }
      function updateCodeGutter(node, editor) {
        const codeElement = editor.getElementByKey(node.getKey());
        if (codeElement === null) {
          return;
        }
        const children = node.getChildren();
        const childrenLength = children.length;
        if (childrenLength === codeElement.__cachedChildrenLength) {
          return;
        }
        codeElement.__cachedChildrenLength = childrenLength;
        let gutter = "1";
        let count = 1;
        for (let i = 0; i < childrenLength; i++) {
          if (lexical2.$isLineBreakNode(children[i])) {
            gutter += "\n" + ++count;
          }
        }
        codeElement.setAttribute("data-gutter", gutter);
      }
      var isHighlighting = false;
      function codeNodeTransform(node, editor) {
        if (isHighlighting) {
          return;
        }
        isHighlighting = true;
        if (node.getLanguage() === void 0) {
          node.setLanguage(DEFAULT_CODE_LANGUAGE);
        }
        const nodeKey = node.getKey();
        editor.update(() => {
          updateAndRetainSelection(nodeKey, () => {
            const currentNode = lexical2.$getNodeByKey(nodeKey);
            if (!$isCodeNode(currentNode) || !currentNode.isAttached()) {
              return false;
            }
            const code2 = currentNode.getTextContent();
            const tokens = Prism2.tokenize(code2, Prism2.languages[currentNode.getLanguage() || ""] || Prism2.languages[DEFAULT_CODE_LANGUAGE]);
            const highlightNodes = getHighlightNodes(tokens);
            const diffRange = getDiffRange(currentNode.getChildren(), highlightNodes);
            const {
              from,
              to,
              nodesForReplacement
            } = diffRange;
            if (from !== to || nodesForReplacement.length) {
              node.splice(from, to - from, nodesForReplacement);
              return true;
            }
            return false;
          });
        }, {
          onUpdate: () => {
            isHighlighting = false;
          },
          skipTransforms: true
        });
      }
      function getHighlightNodes(tokens) {
        const nodes = [];
        tokens.forEach((token) => {
          if (typeof token === "string") {
            const partials = token.split("\n");
            for (let i = 0; i < partials.length; i++) {
              const text = partials[i];
              if (text.length) {
                nodes.push($createCodeHighlightNode(text));
              }
              if (i < partials.length - 1) {
                nodes.push(lexical2.$createLineBreakNode());
              }
            }
          } else {
            const {
              content
            } = token;
            if (typeof content === "string") {
              nodes.push($createCodeHighlightNode(content, token.type));
            } else if (Array.isArray(content) && content.length === 1 && typeof content[0] === "string") {
              nodes.push($createCodeHighlightNode(content[0], token.type));
            } else if (Array.isArray(content)) {
              nodes.push(...getHighlightNodes(content));
            }
          }
        });
        return nodes;
      }
      function updateAndRetainSelection(nodeKey, updateFn) {
        const node = lexical2.$getNodeByKey(nodeKey);
        if (!$isCodeNode(node) || !node.isAttached()) {
          return;
        }
        const selection = lexical2.$getSelection();
        if (!lexical2.$isRangeSelection(selection)) {
          updateFn();
          return;
        }
        const anchor = selection.anchor;
        const anchorOffset = anchor.offset;
        const isNewLineAnchor = anchor.type === "element" && lexical2.$isLineBreakNode(node.getChildAtIndex(anchor.offset - 1));
        let textOffset = 0;
        if (!isNewLineAnchor) {
          const anchorNode = anchor.getNode();
          textOffset = anchorOffset + anchorNode.getPreviousSiblings().reduce((offset, _node) => {
            return offset + (lexical2.$isLineBreakNode(_node) ? 0 : _node.getTextContentSize());
          }, 0);
        }
        const hasChanges = updateFn();
        if (!hasChanges) {
          return;
        }
        if (isNewLineAnchor) {
          anchor.getNode().select(anchorOffset, anchorOffset);
          return;
        }
        node.getChildren().some((_node) => {
          if (lexical2.$isTextNode(_node)) {
            const textContentSize = _node.getTextContentSize();
            if (textContentSize >= textOffset) {
              _node.select(textOffset, textOffset);
              return true;
            }
            textOffset -= textContentSize;
          }
          return false;
        });
      }
      function getDiffRange(prevNodes, nextNodes) {
        let leadingMatch = 0;
        while (leadingMatch < prevNodes.length) {
          if (!isEqual(prevNodes[leadingMatch], nextNodes[leadingMatch])) {
            break;
          }
          leadingMatch++;
        }
        const prevNodesLength = prevNodes.length;
        const nextNodesLength = nextNodes.length;
        const maxTrailingMatch = Math.min(prevNodesLength, nextNodesLength) - leadingMatch;
        let trailingMatch = 0;
        while (trailingMatch < maxTrailingMatch) {
          trailingMatch++;
          if (!isEqual(prevNodes[prevNodesLength - trailingMatch], nextNodes[nextNodesLength - trailingMatch])) {
            trailingMatch--;
            break;
          }
        }
        const from = leadingMatch;
        const to = prevNodesLength - trailingMatch;
        const nodesForReplacement = nextNodes.slice(leadingMatch, nextNodesLength - trailingMatch);
        return {
          from,
          nodesForReplacement,
          to
        };
      }
      function isEqual(nodeA, nodeB) {
        if ($isCodeHighlightNode(nodeA) && $isCodeHighlightNode(nodeB)) {
          return nodeA.__text === nodeB.__text && nodeA.__highlightType === nodeB.__highlightType;
        }
        if (lexical2.$isLineBreakNode(nodeA) && lexical2.$isLineBreakNode(nodeB)) {
          return true;
        }
        return false;
      }
      function handleMultilineIndent(type) {
        const selection = lexical2.$getSelection();
        if (!lexical2.$isRangeSelection(selection) || selection.isCollapsed()) {
          return false;
        }
        const nodes = selection.getNodes();
        for (let i = 0; i < nodes.length; i++) {
          const node = nodes[i];
          if (!$isCodeHighlightNode(node) && !lexical2.$isLineBreakNode(node)) {
            return false;
          }
        }
        const startOfLine = getFirstCodeHighlightNodeOfLine(nodes[0]);
        if (startOfLine != null) {
          doIndent(startOfLine, type);
        }
        for (let i = 1; i < nodes.length; i++) {
          const node = nodes[i];
          if (lexical2.$isLineBreakNode(nodes[i - 1]) && $isCodeHighlightNode(node)) {
            doIndent(node, type);
          }
        }
        return true;
      }
      function doIndent(node, type) {
        const text = node.getTextContent();
        if (type === lexical2.INDENT_CONTENT_COMMAND) {
          if (text.length > 0 && /\s/.test(text[0])) {
            node.setTextContent("	" + text);
          } else {
            const indentNode = $createCodeHighlightNode("	");
            node.insertBefore(indentNode);
          }
        } else {
          if (text.indexOf("	") === 0) {
            if (text.length === 1) {
              node.remove();
            } else {
              node.setTextContent(text.substring(1));
            }
          }
        }
      }
      function handleShiftLines(type, event) {
        const selection = lexical2.$getSelection();
        if (!lexical2.$isRangeSelection(selection)) {
          return false;
        }
        const {
          anchor,
          focus
        } = selection;
        const anchorOffset = anchor.offset;
        const focusOffset = focus.offset;
        const anchorNode = anchor.getNode();
        const focusNode = focus.getNode();
        const arrowIsUp = type === lexical2.KEY_ARROW_UP_COMMAND;
        if (!$isCodeHighlightNode(anchorNode) || !$isCodeHighlightNode(focusNode)) {
          return false;
        }
        if (!event.altKey) {
          if (selection.isCollapsed()) {
            const codeNode = anchorNode.getParentOrThrow();
            if (arrowIsUp && anchorOffset === 0 && anchorNode.getPreviousSibling() === null) {
              const codeNodeSibling = codeNode.getPreviousSibling();
              if (codeNodeSibling === null) {
                codeNode.selectPrevious();
                event.preventDefault();
                return true;
              }
            } else if (!arrowIsUp && anchorOffset === anchorNode.getTextContentSize() && anchorNode.getNextSibling() === null) {
              const codeNodeSibling = codeNode.getNextSibling();
              if (codeNodeSibling === null) {
                codeNode.selectNext();
                event.preventDefault();
                return true;
              }
            }
          }
          return false;
        }
        const start = getFirstCodeHighlightNodeOfLine(anchorNode);
        const end = getLastCodeHighlightNodeOfLine(focusNode);
        if (start == null || end == null) {
          return false;
        }
        const range = start.getNodesBetween(end);
        for (let i = 0; i < range.length; i++) {
          const node = range[i];
          if (!$isCodeHighlightNode(node) && !lexical2.$isLineBreakNode(node)) {
            return false;
          }
        }
        event.preventDefault();
        event.stopPropagation();
        const linebreak = arrowIsUp ? start.getPreviousSibling() : end.getNextSibling();
        if (!lexical2.$isLineBreakNode(linebreak)) {
          return true;
        }
        const sibling = arrowIsUp ? linebreak.getPreviousSibling() : linebreak.getNextSibling();
        if (sibling == null) {
          return true;
        }
        const maybeInsertionPoint = arrowIsUp ? getFirstCodeHighlightNodeOfLine(sibling) : getLastCodeHighlightNodeOfLine(sibling);
        let insertionPoint = maybeInsertionPoint != null ? maybeInsertionPoint : sibling;
        linebreak.remove();
        range.forEach((node) => node.remove());
        if (type === lexical2.KEY_ARROW_UP_COMMAND) {
          range.forEach((node) => insertionPoint.insertBefore(node));
          insertionPoint.insertBefore(linebreak);
        } else {
          insertionPoint.insertAfter(linebreak);
          insertionPoint = linebreak;
          range.forEach((node) => {
            insertionPoint.insertAfter(node);
            insertionPoint = node;
          });
        }
        selection.setTextNodeRange(anchorNode, anchorOffset, focusNode, focusOffset);
        return true;
      }
      function handleMoveTo(type, event) {
        const selection = lexical2.$getSelection();
        if (!lexical2.$isRangeSelection(selection)) {
          return false;
        }
        const {
          anchor,
          focus
        } = selection;
        const anchorNode = anchor.getNode();
        const focusNode = focus.getNode();
        const isMoveToStart = type === lexical2.MOVE_TO_START;
        if (!$isCodeHighlightNode(anchorNode) || !$isCodeHighlightNode(focusNode)) {
          return false;
        }
        let node;
        let offset;
        if (isMoveToStart) {
          ({
            node,
            offset
          } = getStartOfCodeInLine(focusNode));
        } else {
          ({
            node,
            offset
          } = getEndOfCodeInLine(focusNode));
        }
        if (node !== null && offset !== -1) {
          selection.setTextNodeRange(node, offset, node, offset);
        }
        event.preventDefault();
        event.stopPropagation();
        return true;
      }
      function registerCodeHighlighting(editor) {
        if (!editor.hasNodes([CodeNode, CodeHighlightNode])) {
          throw new Error("CodeHighlightPlugin: CodeNode or CodeHighlightNode not registered on editor");
        }
        return utils.mergeRegister(editor.registerMutationListener(CodeNode, (mutations) => {
          editor.update(() => {
            for (const [key, type] of mutations) {
              if (type !== "destroyed") {
                const node = lexical2.$getNodeByKey(key);
                if (node !== null) {
                  updateCodeGutter(node, editor);
                }
              }
            }
          });
        }), editor.registerNodeTransform(CodeNode, (node) => codeNodeTransform(node, editor)), editor.registerNodeTransform(lexical2.TextNode, (node) => textNodeTransform(node, editor)), editor.registerNodeTransform(CodeHighlightNode, (node) => textNodeTransform(node, editor)), editor.registerCommand(lexical2.INDENT_CONTENT_COMMAND, (payload) => handleMultilineIndent(lexical2.INDENT_CONTENT_COMMAND), lexical2.COMMAND_PRIORITY_LOW), editor.registerCommand(lexical2.OUTDENT_CONTENT_COMMAND, (payload) => handleMultilineIndent(lexical2.OUTDENT_CONTENT_COMMAND), lexical2.COMMAND_PRIORITY_LOW), editor.registerCommand(lexical2.KEY_ARROW_UP_COMMAND, (payload) => handleShiftLines(lexical2.KEY_ARROW_UP_COMMAND, payload), lexical2.COMMAND_PRIORITY_LOW), editor.registerCommand(lexical2.KEY_ARROW_DOWN_COMMAND, (payload) => handleShiftLines(lexical2.KEY_ARROW_DOWN_COMMAND, payload), lexical2.COMMAND_PRIORITY_LOW), editor.registerCommand(lexical2.MOVE_TO_END, (payload) => handleMoveTo(lexical2.MOVE_TO_END, payload), lexical2.COMMAND_PRIORITY_LOW), editor.registerCommand(lexical2.MOVE_TO_START, (payload) => handleMoveTo(lexical2.MOVE_TO_START, payload), lexical2.COMMAND_PRIORITY_LOW));
      }
      exports.$createCodeHighlightNode = $createCodeHighlightNode;
      exports.$createCodeNode = $createCodeNode;
      exports.$isCodeHighlightNode = $isCodeHighlightNode;
      exports.$isCodeNode = $isCodeNode;
      exports.CODE_LANGUAGE_FRIENDLY_NAME_MAP = CODE_LANGUAGE_FRIENDLY_NAME_MAP;
      exports.CODE_LANGUAGE_MAP = CODE_LANGUAGE_MAP;
      exports.CodeHighlightNode = CodeHighlightNode;
      exports.CodeNode = CodeNode;
      exports.DEFAULT_CODE_LANGUAGE = DEFAULT_CODE_LANGUAGE;
      exports.getCodeLanguages = getCodeLanguages;
      exports.getDefaultCodeLanguage = getDefaultCodeLanguage;
      exports.getEndOfCodeInLine = getEndOfCodeInLine;
      exports.getFirstCodeHighlightNodeOfLine = getFirstCodeHighlightNodeOfLine;
      exports.getLanguageFriendlyName = getLanguageFriendlyName;
      exports.getLastCodeHighlightNodeOfLine = getLastCodeHighlightNodeOfLine;
      exports.getStartOfCodeInLine = getStartOfCodeInLine;
      exports.normalizeCodeLang = normalizeCodeLang;
      exports.registerCodeHighlighting = registerCodeHighlighting;
    }
  });

  // node_modules/@lexical/code/LexicalCode.js
  var require_LexicalCode = __commonJS({
    "node_modules/@lexical/code/LexicalCode.js"(exports, module) {
      "use strict";
      var LexicalCode = true ? require_LexicalCode_dev() : null;
      module.exports = LexicalCode;
    }
  });

  // node_modules/@lexical/markdown/LexicalMarkdown.dev.js
  var require_LexicalMarkdown_dev = __commonJS({
    "node_modules/@lexical/markdown/LexicalMarkdown.dev.js"(exports) {
      "use strict";
      var lexical2 = require_Lexical();
      var code2 = require_LexicalCode();
      var list2 = require_LexicalList();
      var richText = require_LexicalRichText();
      var utils = require_LexicalUtils();
      var link2 = require_LexicalLink();
      function indexBy(list3, callback) {
        const index = {};
        for (const item of list3) {
          const key = callback(item);
          if (index[key]) {
            index[key].push(item);
          } else {
            index[key] = [item];
          }
        }
        return index;
      }
      function transformersByType(transformers) {
        const byType = indexBy(transformers, (t) => t.type);
        return {
          element: byType.element || [],
          textFormat: byType["text-format"] || [],
          textMatch: byType["text-match"] || []
        };
      }
      var PUNCTUATION_OR_SPACE = /[!-/:-@[-`{-~\s]/;
      function createMarkdownExport(transformers) {
        const byType = transformersByType(transformers);
        const textFormatTransformers = byType.textFormat.filter((transformer) => transformer.format.length === 1);
        return () => {
          const output = [];
          const children = lexical2.$getRoot().getChildren();
          for (const child of children) {
            const result = exportTopLevelElements(child, byType.element, textFormatTransformers, byType.textMatch);
            if (result != null) {
              output.push(result);
            }
          }
          return output.join("\n\n");
        };
      }
      function exportTopLevelElements(node, elementTransformers, textTransformersIndex, textMatchTransformers) {
        for (const transformer of elementTransformers) {
          const result = transformer.export(node, (_node) => exportChildren(_node, textTransformersIndex, textMatchTransformers));
          if (result != null) {
            return result;
          }
        }
        return lexical2.$isElementNode(node) ? exportChildren(node, textTransformersIndex, textMatchTransformers) : null;
      }
      function exportChildren(node, textTransformersIndex, textMatchTransformers) {
        const output = [];
        const children = node.getChildren();
        mainLoop:
          for (const child of children) {
            for (const transformer of textMatchTransformers) {
              const result = transformer.export(child, (parentNode) => exportChildren(parentNode, textTransformersIndex, textMatchTransformers), (textNode, textContent) => exportTextFormat(textNode, textContent, textTransformersIndex));
              if (result != null) {
                output.push(result);
                continue mainLoop;
              }
            }
            if (lexical2.$isLineBreakNode(child)) {
              output.push("\n");
            } else if (lexical2.$isTextNode(child)) {
              output.push(exportTextFormat(child, child.getTextContent(), textTransformersIndex));
            } else if (lexical2.$isElementNode(child)) {
              output.push(exportChildren(child, textTransformersIndex, textMatchTransformers));
            }
          }
        return output.join("");
      }
      function exportTextFormat(node, textContent, textTransformers) {
        const frozenString = textContent.trim();
        let output = frozenString;
        const applied = /* @__PURE__ */ new Set();
        for (const transformer of textTransformers) {
          const format = transformer.format[0];
          const tag = transformer.tag;
          if (hasFormat(node, format) && !applied.has(format)) {
            applied.add(format);
            const previousNode = getTextSibling(node, true);
            if (!hasFormat(previousNode, format)) {
              output = tag + output;
            }
            const nextNode = getTextSibling(node, false);
            if (!hasFormat(nextNode, format)) {
              output += tag;
            }
          }
        }
        return textContent.replace(frozenString, output);
      }
      function getTextSibling(node, backward) {
        let sibling = backward ? node.getPreviousSibling() : node.getNextSibling();
        if (!sibling) {
          const parent = node.getParentOrThrow();
          if (parent.isInline()) {
            sibling = backward ? parent.getPreviousSibling() : parent.getNextSibling();
          }
        }
        while (sibling) {
          if (lexical2.$isElementNode(sibling)) {
            if (!sibling.isInline()) {
              break;
            }
            const descendant = backward ? sibling.getLastDescendant() : sibling.getFirstDescendant();
            if (lexical2.$isTextNode(descendant)) {
              return descendant;
            } else {
              sibling = backward ? sibling.getPreviousSibling() : sibling.getNextSibling();
            }
          }
          if (lexical2.$isTextNode(sibling)) {
            return sibling;
          }
          if (!lexical2.$isElementNode(sibling)) {
            return null;
          }
        }
        return null;
      }
      function hasFormat(node, format) {
        return lexical2.$isTextNode(node) && node.hasFormat(format);
      }
      var CAN_USE_DOM = typeof window !== "undefined" && typeof window.document !== "undefined" && typeof window.document.createElement !== "undefined";
      var documentMode = CAN_USE_DOM && "documentMode" in document ? document.documentMode : null;
      CAN_USE_DOM && /Mac|iPod|iPhone|iPad/.test(navigator.platform);
      CAN_USE_DOM && /^(?!.*Seamonkey)(?=.*Firefox).*/i.test(navigator.userAgent);
      CAN_USE_DOM && "InputEvent" in window && !documentMode ? "getTargetRanges" in new window.InputEvent("input") : false;
      var IS_SAFARI = CAN_USE_DOM && /Version\/[\d.]+.*Safari/.test(navigator.userAgent);
      var IS_IOS = CAN_USE_DOM && /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
      var MARKDOWN_EMPTY_LINE_REG_EXP = /^\s{0,3}$/;
      var CODE_BLOCK_REG_EXP = /^```(\w{1,10})?\s?$/;
      function createMarkdownImport(transformers) {
        const byType = transformersByType(transformers);
        const textFormatTransformersIndex = createTextFormatTransformersIndex(byType.textFormat);
        return (markdownString) => {
          const lines = markdownString.split("\n");
          const linesLength = lines.length;
          const root = lexical2.$getRoot();
          root.clear();
          for (let i = 0; i < linesLength; i++) {
            const lineText = lines[i];
            const [codeBlockNode, shiftedIndex] = importCodeBlock(lines, i, root);
            if (codeBlockNode != null) {
              i = shiftedIndex;
              continue;
            }
            importBlocks(lineText, root, byType.element, textFormatTransformersIndex, byType.textMatch);
          }
          const children = root.getChildren();
          for (const child of children) {
            if (isEmptyParagraph(child)) {
              child.remove();
            }
          }
          root.selectEnd();
        };
      }
      function isEmptyParagraph(node) {
        if (!lexical2.$isParagraphNode(node)) {
          return false;
        }
        const firstChild = node.getFirstChild();
        return firstChild == null || node.getChildrenSize() === 1 && lexical2.$isTextNode(firstChild) && MARKDOWN_EMPTY_LINE_REG_EXP.test(firstChild.getTextContent());
      }
      function importBlocks(lineText, rootNode, elementTransformers, textFormatTransformersIndex, textMatchTransformers) {
        const lineTextTrimmed = lineText.trim();
        const textNode = lexical2.$createTextNode(lineTextTrimmed);
        const elementNode = lexical2.$createParagraphNode();
        elementNode.append(textNode);
        rootNode.append(elementNode);
        for (const {
          regExp,
          replace
        } of elementTransformers) {
          const match = lineText.match(regExp);
          if (match) {
            textNode.setTextContent(lineText.slice(match[0].length));
            replace(elementNode, [textNode], match, true);
            break;
          }
        }
        importTextFormatTransformers(textNode, textFormatTransformersIndex, textMatchTransformers);
        if (elementNode.isAttached() && lineTextTrimmed.length > 0) {
          const previousNode = elementNode.getPreviousSibling();
          if (lexical2.$isParagraphNode(previousNode) || richText.$isQuoteNode(previousNode) || list2.$isListNode(previousNode)) {
            let targetNode = previousNode;
            if (list2.$isListNode(previousNode)) {
              const lastDescendant = previousNode.getLastDescendant();
              if (lastDescendant == null) {
                targetNode = null;
              } else {
                targetNode = utils.$findMatchingParent(lastDescendant, list2.$isListItemNode);
              }
            }
            if (targetNode != null && targetNode.getTextContentSize() > 0) {
              targetNode.splice(targetNode.getChildrenSize(), 0, [lexical2.$createLineBreakNode(), ...elementNode.getChildren()]);
              elementNode.remove();
            }
          }
        }
      }
      function importCodeBlock(lines, startLineIndex, rootNode) {
        const openMatch = lines[startLineIndex].match(CODE_BLOCK_REG_EXP);
        if (openMatch) {
          let endLineIndex = startLineIndex;
          const linesLength = lines.length;
          while (++endLineIndex < linesLength) {
            const closeMatch = lines[endLineIndex].match(CODE_BLOCK_REG_EXP);
            if (closeMatch) {
              const codeBlockNode = code2.$createCodeNode(openMatch[1]);
              const textNode = lexical2.$createTextNode(lines.slice(startLineIndex + 1, endLineIndex).join("\n"));
              codeBlockNode.append(textNode);
              rootNode.append(codeBlockNode);
              return [codeBlockNode, endLineIndex];
            }
          }
        }
        return [null, startLineIndex];
      }
      function importTextFormatTransformers(textNode, textFormatTransformersIndex, textMatchTransformers) {
        const textContent = textNode.getTextContent();
        const match = findOutermostMatch(textContent, textFormatTransformersIndex);
        if (!match) {
          importTextMatchTransformers(textNode, textMatchTransformers);
          return;
        }
        let currentNode, remainderNode, leadingNode;
        if (match[0] === textContent) {
          currentNode = textNode;
        } else {
          const startIndex = match.index || 0;
          const endIndex = startIndex + match[0].length;
          if (startIndex === 0) {
            [currentNode, remainderNode] = textNode.splitText(endIndex);
          } else {
            [leadingNode, currentNode, remainderNode] = textNode.splitText(startIndex, endIndex);
          }
        }
        currentNode.setTextContent(match[2]);
        const transformer = textFormatTransformersIndex.transformersByTag[match[1]];
        if (transformer) {
          for (const format of transformer.format) {
            if (!currentNode.hasFormat(format)) {
              currentNode.toggleFormat(format);
            }
          }
        }
        if (!currentNode.hasFormat("code")) {
          importTextFormatTransformers(currentNode, textFormatTransformersIndex, textMatchTransformers);
        }
        if (leadingNode) {
          importTextFormatTransformers(leadingNode, textFormatTransformersIndex, textMatchTransformers);
        }
        if (remainderNode) {
          importTextFormatTransformers(remainderNode, textFormatTransformersIndex, textMatchTransformers);
        }
      }
      function importTextMatchTransformers(textNode_, textMatchTransformers) {
        let textNode = textNode_;
        mainLoop:
          while (textNode) {
            for (const transformer of textMatchTransformers) {
              const match = textNode.getTextContent().match(transformer.importRegExp);
              if (!match) {
                continue;
              }
              const startIndex = match.index || 0;
              const endIndex = startIndex + match[0].length;
              let replaceNode;
              if (startIndex === 0) {
                [replaceNode, textNode] = textNode.splitText(endIndex);
              } else {
                [, replaceNode, textNode] = textNode.splitText(startIndex, endIndex);
              }
              transformer.replace(replaceNode, match);
              continue mainLoop;
            }
            break;
          }
      }
      function findOutermostMatch(textContent, textTransformersIndex) {
        const openTagsMatch = textContent.match(textTransformersIndex.openTagsRegExp);
        if (openTagsMatch == null) {
          return null;
        }
        for (const match of openTagsMatch) {
          const tag = match.replace(/^\s/, "");
          const fullMatchRegExp = textTransformersIndex.fullMatchRegExpByTag[tag];
          if (fullMatchRegExp == null) {
            continue;
          }
          const fullMatch = textContent.match(fullMatchRegExp);
          const transformer = textTransformersIndex.transformersByTag[tag];
          if (fullMatch != null && transformer != null) {
            if (transformer.intraword !== false) {
              return fullMatch;
            }
            const {
              index = 0
            } = fullMatch;
            const beforeChar = textContent[index - 1];
            const afterChar = textContent[index + fullMatch[0].length];
            if ((!beforeChar || PUNCTUATION_OR_SPACE.test(beforeChar)) && (!afterChar || PUNCTUATION_OR_SPACE.test(afterChar))) {
              return fullMatch;
            }
          }
        }
        return null;
      }
      function createTextFormatTransformersIndex(textTransformers) {
        const transformersByTag = {};
        const fullMatchRegExpByTag = {};
        const openTagsRegExp = [];
        const escapeRegExp = `(?<![\\\\])`;
        for (const transformer of textTransformers) {
          const {
            tag
          } = transformer;
          transformersByTag[tag] = transformer;
          const tagRegExp = tag.replace(/(\*|\^)/g, "\\$1");
          openTagsRegExp.push(tagRegExp);
          if (IS_SAFARI || IS_IOS) {
            fullMatchRegExpByTag[tag] = new RegExp(`(${tagRegExp})(?![${tagRegExp}\\s])(.*?[^${tagRegExp}\\s])${tagRegExp}(?!${tagRegExp})`);
          } else {
            fullMatchRegExpByTag[tag] = new RegExp(`(?<![\\\\${tagRegExp}])(${tagRegExp})((\\\\${tagRegExp})?.*?[^${tagRegExp}\\s](\\\\${tagRegExp})?)((?<!\\\\)|(?<=\\\\\\\\))(${tagRegExp})(?![\\\\${tagRegExp}])`);
          }
        }
        return {
          fullMatchRegExpByTag,
          openTagsRegExp: new RegExp((IS_SAFARI || IS_IOS ? "" : `${escapeRegExp}`) + "(" + openTagsRegExp.join("|") + ")", "g"),
          transformersByTag
        };
      }
      function runElementTransformers(parentNode, anchorNode, anchorOffset, elementTransformers) {
        const grandParentNode = parentNode.getParent();
        if (!lexical2.$isRootOrShadowRoot(grandParentNode) || parentNode.getFirstChild() !== anchorNode) {
          return false;
        }
        const textContent = anchorNode.getTextContent();
        if (textContent[anchorOffset - 1] !== " ") {
          return false;
        }
        for (const {
          regExp,
          replace
        } of elementTransformers) {
          const match = textContent.match(regExp);
          if (match && match[0].length === anchorOffset) {
            const nextSiblings = anchorNode.getNextSiblings();
            const [leadingNode, remainderNode] = anchorNode.splitText(anchorOffset);
            leadingNode.remove();
            const siblings = remainderNode ? [remainderNode, ...nextSiblings] : nextSiblings;
            replace(parentNode, siblings, match, false);
            return true;
          }
        }
        return false;
      }
      function runTextMatchTransformers(anchorNode, anchorOffset, transformersByTrigger) {
        let textContent = anchorNode.getTextContent();
        const lastChar = textContent[anchorOffset - 1];
        const transformers = transformersByTrigger[lastChar];
        if (transformers == null) {
          return false;
        }
        if (anchorOffset < textContent.length) {
          textContent = textContent.slice(0, anchorOffset);
        }
        for (const transformer of transformers) {
          const match = textContent.match(transformer.regExp);
          if (match === null) {
            continue;
          }
          const startIndex = match.index || 0;
          const endIndex = startIndex + match[0].length;
          let replaceNode;
          if (startIndex === 0) {
            [replaceNode] = anchorNode.splitText(endIndex);
          } else {
            [, replaceNode] = anchorNode.splitText(startIndex, endIndex);
          }
          replaceNode.selectNext(0, 0);
          transformer.replace(replaceNode, match);
          return true;
        }
        return false;
      }
      function runTextFormatTransformers(anchorNode, anchorOffset, textFormatTransformers) {
        const textContent = anchorNode.getTextContent();
        const closeTagEndIndex = anchorOffset - 1;
        const closeChar = textContent[closeTagEndIndex];
        const matchers = textFormatTransformers[closeChar];
        if (!matchers) {
          return false;
        }
        for (const matcher of matchers) {
          const {
            tag
          } = matcher;
          const tagLength = tag.length;
          const closeTagStartIndex = closeTagEndIndex - tagLength + 1;
          if (tagLength > 1) {
            if (!isEqualSubString(textContent, closeTagStartIndex, tag, 0, tagLength)) {
              continue;
            }
          }
          if (textContent[closeTagStartIndex - 1] === " ") {
            continue;
          }
          const afterCloseTagChar = textContent[closeTagEndIndex + 1];
          if (matcher.intraword === false && afterCloseTagChar && !PUNCTUATION_OR_SPACE.test(afterCloseTagChar)) {
            continue;
          }
          const closeNode = anchorNode;
          let openNode = closeNode;
          let openTagStartIndex = getOpenTagStartIndex(textContent, closeTagStartIndex, tag);
          let sibling = openNode;
          while (openTagStartIndex < 0 && (sibling = sibling.getPreviousSibling())) {
            if (lexical2.$isLineBreakNode(sibling)) {
              break;
            }
            if (lexical2.$isTextNode(sibling)) {
              const siblingTextContent = sibling.getTextContent();
              openNode = sibling;
              openTagStartIndex = getOpenTagStartIndex(siblingTextContent, siblingTextContent.length, tag);
            }
          }
          if (openTagStartIndex < 0) {
            continue;
          }
          if (openNode === closeNode && openTagStartIndex + tagLength === closeTagStartIndex) {
            continue;
          }
          const prevOpenNodeText = openNode.getTextContent();
          if (openTagStartIndex > 0 && prevOpenNodeText[openTagStartIndex - 1] === closeChar) {
            continue;
          }
          const beforeOpenTagChar = prevOpenNodeText[openTagStartIndex - 1];
          if (matcher.intraword === false && beforeOpenTagChar && !PUNCTUATION_OR_SPACE.test(beforeOpenTagChar)) {
            continue;
          }
          const prevCloseNodeText = closeNode.getTextContent();
          const closeNodeText = prevCloseNodeText.slice(0, closeTagStartIndex) + prevCloseNodeText.slice(closeTagEndIndex + 1);
          closeNode.setTextContent(closeNodeText);
          const openNodeText = openNode === closeNode ? closeNodeText : prevOpenNodeText;
          openNode.setTextContent(openNodeText.slice(0, openTagStartIndex) + openNodeText.slice(openTagStartIndex + tagLength));
          const selection = lexical2.$getSelection();
          const nextSelection = lexical2.$createRangeSelection();
          lexical2.$setSelection(nextSelection);
          const newOffset = closeTagEndIndex - tagLength * (openNode === closeNode ? 2 : 1) + 1;
          nextSelection.anchor.set(openNode.__key, openTagStartIndex, "text");
          nextSelection.focus.set(closeNode.__key, newOffset, "text");
          for (const format of matcher.format) {
            if (!nextSelection.hasFormat(format)) {
              nextSelection.formatText(format);
            }
          }
          nextSelection.anchor.set(nextSelection.focus.key, nextSelection.focus.offset, nextSelection.focus.type);
          for (const format of matcher.format) {
            if (nextSelection.hasFormat(format)) {
              nextSelection.toggleFormat(format);
            }
          }
          if (lexical2.$isRangeSelection(selection)) {
            nextSelection.format = selection.format;
          }
          return true;
        }
        return false;
      }
      function getOpenTagStartIndex(string, maxIndex, tag) {
        const tagLength = tag.length;
        for (let i = maxIndex; i >= tagLength; i--) {
          const startIndex = i - tagLength;
          if (isEqualSubString(string, startIndex, tag, 0, tagLength) && string[startIndex + tagLength] !== " ") {
            return startIndex;
          }
        }
        return -1;
      }
      function isEqualSubString(stringA, aStart, stringB, bStart, length) {
        for (let i = 0; i < length; i++) {
          if (stringA[aStart + i] !== stringB[bStart + i]) {
            return false;
          }
        }
        return true;
      }
      function registerMarkdownShortcuts(editor, transformers = TRANSFORMERS) {
        const byType = transformersByType(transformers);
        const textFormatTransformersIndex = indexBy(byType.textFormat, ({
          tag
        }) => tag[tag.length - 1]);
        const textMatchTransformersIndex = indexBy(byType.textMatch, ({
          trigger
        }) => trigger);
        for (const transformer of transformers) {
          const type = transformer.type;
          if (type === "element" || type === "text-match") {
            const dependencies = transformer.dependencies;
            if (!editor.hasNodes(dependencies)) {
              {
                throw Error(`MarkdownShortcuts: missing dependency for transformer. Ensure node dependency is included in editor initial config.`);
              }
            }
          }
        }
        const transform = (parentNode, anchorNode, anchorOffset) => {
          if (runElementTransformers(parentNode, anchorNode, anchorOffset, byType.element)) {
            return;
          }
          if (runTextMatchTransformers(anchorNode, anchorOffset, textMatchTransformersIndex)) {
            return;
          }
          runTextFormatTransformers(anchorNode, anchorOffset, textFormatTransformersIndex);
        };
        return editor.registerUpdateListener(({
          tags,
          dirtyLeaves,
          editorState,
          prevEditorState
        }) => {
          if (tags.has("historic")) {
            return;
          }
          const selection = editorState.read(lexical2.$getSelection);
          const prevSelection = prevEditorState.read(lexical2.$getSelection);
          if (!lexical2.$isRangeSelection(prevSelection) || !lexical2.$isRangeSelection(selection) || !selection.isCollapsed()) {
            return;
          }
          const anchorKey = selection.anchor.key;
          const anchorOffset = selection.anchor.offset;
          const anchorNode = editorState._nodeMap.get(anchorKey);
          if (!lexical2.$isTextNode(anchorNode) || !dirtyLeaves.has(anchorKey) || anchorOffset !== 1 && anchorOffset !== prevSelection.anchor.offset + 1) {
            return;
          }
          editor.update(() => {
            if (anchorNode.hasFormat("code")) {
              return;
            }
            const parentNode = anchorNode.getParent();
            if (parentNode === null || code2.$isCodeNode(parentNode)) {
              return;
            }
            transform(parentNode, anchorNode, selection.anchor.offset);
          });
        });
      }
      var createBlockNode = (createNode) => {
        return (parentNode, children, match) => {
          const node = createNode(match);
          node.append(...children);
          parentNode.replace(node);
          node.select(0, 0);
        };
      };
      var LIST_INDENT_SIZE = 4;
      var listReplace = (listType) => {
        return (parentNode, children, match) => {
          const previousNode = parentNode.getPreviousSibling();
          const listItem = list2.$createListItemNode(listType === "check" ? match[3] === "x" : void 0);
          if (list2.$isListNode(previousNode) && previousNode.getListType() === listType) {
            previousNode.append(listItem);
            parentNode.remove();
          } else {
            const list$1 = list2.$createListNode(listType, listType === "number" ? Number(match[2]) : void 0);
            list$1.append(listItem);
            parentNode.replace(list$1);
          }
          listItem.append(...children);
          listItem.select(0, 0);
          const indent = Math.floor(match[1].length / LIST_INDENT_SIZE);
          if (indent) {
            listItem.setIndent(indent);
          }
        };
      };
      var listExport = (listNode, exportChildren2, depth) => {
        const output = [];
        const children = listNode.getChildren();
        let index = 0;
        for (const listItemNode of children) {
          if (list2.$isListItemNode(listItemNode)) {
            if (listItemNode.getChildrenSize() === 1) {
              const firstChild = listItemNode.getFirstChild();
              if (list2.$isListNode(firstChild)) {
                output.push(listExport(firstChild, exportChildren2, depth + 1));
                continue;
              }
            }
            const indent = " ".repeat(depth * LIST_INDENT_SIZE);
            const listType = listNode.getListType();
            const prefix = listType === "number" ? `${listNode.getStart() + index}. ` : listType === "check" ? `- [${listItemNode.getChecked() ? "x" : " "}] ` : "- ";
            output.push(indent + prefix + exportChildren2(listItemNode));
            index++;
          }
        }
        return output.join("\n");
      };
      var HEADING = {
        dependencies: [richText.HeadingNode],
        export: (node, exportChildren2) => {
          if (!richText.$isHeadingNode(node)) {
            return null;
          }
          const level = Number(node.getTag().slice(1));
          return "#".repeat(level) + " " + exportChildren2(node);
        },
        regExp: /^(#{1,6})\s/,
        replace: createBlockNode((match) => {
          const tag = "h" + match[1].length;
          return richText.$createHeadingNode(tag);
        }),
        type: "element"
      };
      var QUOTE = {
        dependencies: [richText.QuoteNode],
        export: (node, exportChildren2) => {
          if (!richText.$isQuoteNode(node)) {
            return null;
          }
          const lines = exportChildren2(node).split("\n");
          const output = [];
          for (const line of lines) {
            output.push("> " + line);
          }
          return output.join("\n");
        },
        regExp: /^>\s/,
        replace: (parentNode, children, _match, isImport) => {
          if (isImport) {
            const previousNode = parentNode.getPreviousSibling();
            if (richText.$isQuoteNode(previousNode)) {
              previousNode.splice(previousNode.getChildrenSize(), 0, [lexical2.$createLineBreakNode(), ...children]);
              previousNode.select(0, 0);
              parentNode.remove();
              return;
            }
          }
          const node = richText.$createQuoteNode();
          node.append(...children);
          parentNode.replace(node);
          node.select(0, 0);
        },
        type: "element"
      };
      var CODE = {
        dependencies: [code2.CodeNode],
        export: (node) => {
          if (!code2.$isCodeNode(node)) {
            return null;
          }
          const textContent = node.getTextContent();
          return "```" + (node.getLanguage() || "") + (textContent ? "\n" + textContent : "") + "\n```";
        },
        regExp: /^```(\w{1,10})?\s/,
        replace: createBlockNode((match) => {
          return code2.$createCodeNode(match ? match[1] : void 0);
        }),
        type: "element"
      };
      var UNORDERED_LIST = {
        dependencies: [list2.ListNode, list2.ListItemNode],
        export: (node, exportChildren2) => {
          return list2.$isListNode(node) ? listExport(node, exportChildren2, 0) : null;
        },
        regExp: /^(\s*)[-*+]\s/,
        replace: listReplace("bullet"),
        type: "element"
      };
      var CHECK_LIST = {
        dependencies: [list2.ListNode, list2.ListItemNode],
        export: (node, exportChildren2) => {
          return list2.$isListNode(node) ? listExport(node, exportChildren2, 0) : null;
        },
        regExp: /^(\s*)(?:-\s)?\s?(\[(\s|x)?\])\s/i,
        replace: listReplace("check"),
        type: "element"
      };
      var ORDERED_LIST = {
        dependencies: [list2.ListNode, list2.ListItemNode],
        export: (node, exportChildren2) => {
          return list2.$isListNode(node) ? listExport(node, exportChildren2, 0) : null;
        },
        regExp: /^(\s*)(\d{1,})\.\s/,
        replace: listReplace("number"),
        type: "element"
      };
      var INLINE_CODE = {
        format: ["code"],
        tag: "`",
        type: "text-format"
      };
      var BOLD_ITALIC_STAR = {
        format: ["bold", "italic"],
        tag: "***",
        type: "text-format"
      };
      var BOLD_ITALIC_UNDERSCORE = {
        format: ["bold", "italic"],
        intraword: false,
        tag: "___",
        type: "text-format"
      };
      var BOLD_STAR = {
        format: ["bold"],
        tag: "**",
        type: "text-format"
      };
      var BOLD_UNDERSCORE = {
        format: ["bold"],
        intraword: false,
        tag: "__",
        type: "text-format"
      };
      var STRIKETHROUGH = {
        format: ["strikethrough"],
        tag: "~~",
        type: "text-format"
      };
      var ITALIC_STAR = {
        format: ["italic"],
        tag: "*",
        type: "text-format"
      };
      var ITALIC_UNDERSCORE = {
        format: ["italic"],
        intraword: false,
        tag: "_",
        type: "text-format"
      };
      var LINK = {
        dependencies: [link2.LinkNode],
        export: (node, exportChildren2, exportFormat) => {
          if (!link2.$isLinkNode(node)) {
            return null;
          }
          const linkContent = `[${node.getTextContent()}](${node.getURL()})`;
          const firstChild = node.getFirstChild();
          if (node.getChildrenSize() === 1 && lexical2.$isTextNode(firstChild)) {
            return exportFormat(firstChild, linkContent);
          } else {
            return linkContent;
          }
        },
        importRegExp: /(?:\[([^[]+)\])(?:\(([^(]+)\))/,
        regExp: /(?:\[([^[]+)\])(?:\(([^(]+)\))$/,
        replace: (textNode, match) => {
          const [, linkText, linkUrl] = match;
          const linkNode = link2.$createLinkNode(linkUrl);
          const linkTextNode = lexical2.$createTextNode(linkText);
          linkTextNode.setFormat(textNode.getFormat());
          linkNode.append(linkTextNode);
          textNode.replace(linkNode);
        },
        trigger: ")",
        type: "text-match"
      };
      var ELEMENT_TRANSFORMERS = [HEADING, QUOTE, CODE, UNORDERED_LIST, ORDERED_LIST];
      var TEXT_FORMAT_TRANSFORMERS = [INLINE_CODE, BOLD_ITALIC_STAR, BOLD_ITALIC_UNDERSCORE, BOLD_STAR, BOLD_UNDERSCORE, ITALIC_STAR, ITALIC_UNDERSCORE, STRIKETHROUGH];
      var TEXT_MATCH_TRANSFORMERS = [LINK];
      var TRANSFORMERS = [...ELEMENT_TRANSFORMERS, ...TEXT_FORMAT_TRANSFORMERS, ...TEXT_MATCH_TRANSFORMERS];
      function $convertFromMarkdownString(markdown2, transformers = TRANSFORMERS) {
        const importMarkdown = createMarkdownImport(transformers);
        return importMarkdown(markdown2);
      }
      function $convertToMarkdownString(transformers = TRANSFORMERS) {
        const exportMarkdown = createMarkdownExport(transformers);
        return exportMarkdown();
      }
      exports.$convertFromMarkdownString = $convertFromMarkdownString;
      exports.$convertToMarkdownString = $convertToMarkdownString;
      exports.BOLD_ITALIC_STAR = BOLD_ITALIC_STAR;
      exports.BOLD_ITALIC_UNDERSCORE = BOLD_ITALIC_UNDERSCORE;
      exports.BOLD_STAR = BOLD_STAR;
      exports.BOLD_UNDERSCORE = BOLD_UNDERSCORE;
      exports.CHECK_LIST = CHECK_LIST;
      exports.CODE = CODE;
      exports.ELEMENT_TRANSFORMERS = ELEMENT_TRANSFORMERS;
      exports.HEADING = HEADING;
      exports.INLINE_CODE = INLINE_CODE;
      exports.ITALIC_STAR = ITALIC_STAR;
      exports.ITALIC_UNDERSCORE = ITALIC_UNDERSCORE;
      exports.LINK = LINK;
      exports.ORDERED_LIST = ORDERED_LIST;
      exports.QUOTE = QUOTE;
      exports.STRIKETHROUGH = STRIKETHROUGH;
      exports.TEXT_FORMAT_TRANSFORMERS = TEXT_FORMAT_TRANSFORMERS;
      exports.TEXT_MATCH_TRANSFORMERS = TEXT_MATCH_TRANSFORMERS;
      exports.TRANSFORMERS = TRANSFORMERS;
      exports.UNORDERED_LIST = UNORDERED_LIST;
      exports.registerMarkdownShortcuts = registerMarkdownShortcuts;
    }
  });

  // node_modules/@lexical/markdown/LexicalMarkdown.js
  var require_LexicalMarkdown = __commonJS({
    "node_modules/@lexical/markdown/LexicalMarkdown.js"(exports, module) {
      "use strict";
      var LexicalMarkdown = true ? require_LexicalMarkdown_dev() : null;
      module.exports = LexicalMarkdown;
    }
  });

  // src/maple-editor.js
  var import_lexical2 = __toESM(require_Lexical());
  var import_plain_text = __toESM(require_LexicalPlainText());
  var import_list = __toESM(require_LexicalList());
  var import_link = __toESM(require_LexicalLink());
  var import_table = __toESM(require_LexicalTable());
  var import_overflow = __toESM(require_LexicalOverflow());
  var import_rich_text = __toESM(require_LexicalRichText());
  var import_mark = __toESM(require_LexicalMark());
  var import_hashtag = __toESM(require_LexicalHashtag());
  var import_code = __toESM(require_LexicalCode());
  var import_markdown = __toESM(require_LexicalMarkdown());

  // src/Maple/lexical.js
  var import_lexical = __toESM(require_Lexical());
  var NumberNode = class extends import_lexical.TextNode {
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
      return isUpdated;
    }
  };

  // src/maple-editor.js
  function initPlainText(editor, initialEditorState) {
    return import_plain_text.default.registerPlainText(editor);
  }
  function initMarkdownShortCuts(editor, transformers = import_markdown.default.TRANSFORMERS) {
    return import_markdown.default.registerMarkdownShortcuts(editor, transformers);
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
            this.#editor = import_lexical2.default.createEditor({
              onError: (err) => this.dispatchEvent(
                new CustomEvent("maple-editor-error", { detail: err })
              ),
              nodes: [
                import_lexical2.default.LineBreakNode,
                import_lexical2.default.ParagraphNode,
                import_lexical2.default.TextNode,
                import_link.default.LinkNode,
                import_rich_text.HeadingNode,
                import_rich_text.QuoteNode,
                import_list.default.ListNode,
                import_list.default.ListItemNode,
                import_code.default.CodeHighlightNode,
                import_code.default.CodeNode,
                import_hashtag.default.HashtagNode,
                import_mark.default.MarkNode,
                import_overflow.default.OverflowNode,
                import_table.default.TableNode,
                import_table.default.TableCellNode,
                import_table.default.TableRowNode,
                import_link.default.AutoLinkNode,
                NumberNode
              ]
            });
          }
          this.#editor.setRootElement(this.#rootEl);
          this.#editorListeners.push(initMarkdownShortCuts(this.#editor));
          this.#editorListeners.push(initPlainText(this.#editor));
          this.#editor.registerUpdateListener(({ editorState }) => {
            editorState.read(() => {
              const root = import_lexical2.default.$getRoot();
              console.log(root.getTextContent());
            });
          });
        });
      }
      disconnectedCallback() {
        this.#editorListeners.forEach(function(removeListener) {
          removeListener();
        });
        this.#editor.setRootElement(null);
      }
    }
  );

  // src/index.js
  window.Elm.Main.init({
    node: document.getElementById("elm-root")
  });
})();
/**
 * Prism: Lightweight, robust, elegant syntax highlighting
 *
 * @license MIT <https://opensource.org/licenses/MIT>
 * @author Lea Verou <https://lea.verou.me>
 * @namespace
 * @public
 */
