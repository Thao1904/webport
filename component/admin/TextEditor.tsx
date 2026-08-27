"use client";

import { Editor } from "@tinymce/tinymce-react";

type Props = {
  value?: string;
  setValue: (content: string) => void;
  storageFolder: string;
};

export default function RichTextEditor({ value = "", setValue, storageFolder }: Props) {
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
        images_upload_handler: async (blobInfo: any) => {
          const blob = blobInfo.blob();

          // Blob -> base64
          const base64 = await new Promise<string>((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = () => {
              resolve(reader.result as string);
            };

            reader.onerror = reject;

            reader.readAsDataURL(blob);
          });

          const response = await fetch("/api/uploads", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              base64,
              storageFolder: storageFolder,
            }),
          });

          if (!response.ok) {
            const error = await response.json().catch(() => null);

            throw new Error(error?.error || "Upload image failed");
          }

          const url = await response.json();

          // Backend của bạn đang return string
          return url;
        },
      }}
    />
  );
}
