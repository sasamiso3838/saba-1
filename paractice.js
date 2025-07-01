import { EditorView, basicSetup } from "@codemirror/basic-setup";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { javascript } from "@codemirror/lang-javascript";

// エディタの作成
let htmlEditor = new EditorView({
    doc: "",
    extensions: [basicSetup, html()],
    parent: document.getElementById("html-editor")
});

let cssEditor = new EditorView({
    doc: "",
    extensions: [basicSetup, css()],
    parent: document.getElementById("css-editor")
});

let jsEditor = new EditorView({
    doc: "",
    extensions: [basicSetup, javascript()],
    parent: document.getElementById("js-editor")
});

// プルダウンからテンプレートを挿入
// プルダウンからテンプレートを追加（上書きから追加に変更）
function insertTemplate(selectId, editor) {
    const select = document.getElementById(selectId);
    select.addEventListener("change", () => {
        const value = select.value;
        if (value) {
            const endPos = editor.state.doc.length;
            editor.dispatch({
                changes: { from: endPos, to: endPos, insert: "\n" + value }
            });
            select.selectedIndex = 0; // 初期化
        }
    });
}


insertTemplate("html-template", htmlEditor);
insertTemplate("css-template", cssEditor);
insertTemplate("js-template", jsEditor);

// 実行プレビュー
window.runPreview = function () {
    const htmlCode = htmlEditor.state.doc.toString();
    const cssCode = cssEditor.state.doc.toString();
    const jsCode = jsEditor.state.doc.toString();

    const previewFrame = document.getElementById("preview");
    const previewDocument = previewFrame.contentDocument || previewFrame.contentWindow.document;

    previewDocument.open();
    previewDocument.write(`
    <!DOCTYPE html>
    <html lang="ja">
    <head>
      <meta charset="UTF-8">
      <style>${cssCode}</style>
    </head>
    <body>
      ${htmlCode}
      <script>${jsCode}<\/script>
    </body>
    </html>
  `);
    previewDocument.close();
};
