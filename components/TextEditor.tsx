"use client";
import React, { FC } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { ClassicEditor, Essentials, Paragraph, Bold, Italic } from "ckeditor5";
import { FormatPainter } from "ckeditor5-premium-features";

import "ckeditor5/ckeditor5.css";
import "ckeditor5-premium-features/ckeditor5-premium-features.css";
const editorConfiguration = {
  licenseKey:
    "eyJhbGciOiJFUzI1NiJ9.eyJleHAiOjE3NjU3NTY3OTksImp0aSI6ImM3MTUyMDFkLWUzNWQtNGMzOC04OGY0LTBjZTAzMGNhZTNhMiIsImxpY2Vuc2VkSG9zdHMiOlsiMTI3LjAuMC4xIiwibG9jYWxob3N0IiwiMTkyLjE2OC4qLioiLCIxMC4qLiouKiIsIjE3Mi4qLiouKiIsIioudGVzdCIsIioubG9jYWxob3N0IiwiKi5sb2NhbCJdLCJ1c2FnZUVuZHBvaW50IjoiaHR0cHM6Ly9wcm94eS1ldmVudC5ja2VkaXRvci5jb20iLCJkaXN0cmlidXRpb25DaGFubmVsIjpbImNsb3VkIiwiZHJ1cGFsIl0sImxpY2Vuc2VUeXBlIjoiZGV2ZWxvcG1lbnQiLCJmZWF0dXJlcyI6WyJEUlVQIiwiQk9YIl0sInZjIjoiYmI3NWE4NDUifQ.6EaGyrfgqslS1F88PxQNemzMt4ALBG_1i8cwh_fJ5jS0VSScsM-XS1GnovKc6XLoOBBvSVF_rdoKjoTu9uxEkA", // Or 'GPL'.
  plugins: [Essentials, Paragraph, Bold, Italic, FormatPainter],
  toolbar: [
    "heading",
    "|",
    "bold",
    "italic",
    "link",
    "bulletedList",
    "numberedList",
    "|",
    "outdent",
    "indent",
    "|",
    "imageUpload",
    "blockQuote",
    "insertTable",
    "mediaEmbed",
    "undo",
    "redo",
  ],
};

type Props = {
  initialData: string;
};

const TextEditor: FC<Props> = ({ initialData }) => {
  return (
    <CKEditor
      editor={ClassicEditor}
      config={editorConfiguration}
      data={initialData}
      onChange={(event, editor) => {
        const data = editor.getData();
        console.log({ event, editor, data });
      }}
    />
  );
};

export default TextEditor;
