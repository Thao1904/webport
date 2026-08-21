"use client";

import { Editor } from "@tinymce/tinymce-react";

type Props = {
  value?: string;
  setValue: (content:string) => void;
};

export default function RichTextEditor({
  value = "",
  setValue
}: Props) {

  return (
    <Editor
      apiKey={"0mgevuw9gjqlg21p2uy92m7ss0mz5iu8f2udhpdwxf8jegp1"}
      value={value}
      onEditorChange={(content) => {
        setValue(content);
      }}
      init={{
        height: 500,
        menubar: true,
        plugins: [
          "advlist",
          "autolink",
          "lists",
          "link",
          "image",
          "charmap",
          "preview",
          "anchor",
          "searchreplace",
          "visualblocks",
          "code",
          "fullscreen",
          "insertdatetime",
          "media",
          "table",
          "help",
          "wordcount",
        ],
        toolbar:
          "undo redo | blocks | " +
          "bold italic underline | " +
          "alignleft aligncenter alignright alignjustify | " +
          "bullist numlist | link image media | code",
      }}
    />
  );
}