'use client';

import { Editor } from '@tinymce/tinymce-react';
import { useRef } from 'react';

export default function TinyEditor() {
  const editorRef = useRef<any>(null);

  const handleSave = () => {
      console.log(editorRef.current.getContent());
  }
  
  return (
    <>
    
    <Editor
      apiKey="0mgevuw9gjqlg21p2uy92m7ss0mz5iu8f2udhpdwxf8jegp1"
      onInit={(_, editor) => {
        editorRef.current = editor;
      }}
      init={{
        height: 500,
        menubar: true,

        plugins: [
          'advlist',
          'autolink',
          'lists',
          'link',
          'image',
          'charmap',
          'preview',
          'anchor',
          'searchreplace',
          'visualblocks',
          'code',
          'fullscreen',
          'insertdatetime',
          'media',
          'table',
          'help',
          'wordcount',
        ],

        toolbar:
          'undo redo | blocks | ' +
          'bold italic underline | ' +
          'alignleft aligncenter alignright alignjustify | ' +
          'bullist numlist outdent indent | ' +
          'table image media link | ' +
          'code fullscreen',

        content_style: `
          body {
            font-family: Arial, sans-serif;
            font-size: 16px;
          }
        `,
      }}
    />
    <button onClick={handleSave}>
        Save
      </button>
    </>
  );
}