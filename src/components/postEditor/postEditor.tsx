import React, { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";

const PostEditor: React.FC = () => {
  const [content, setContent] = useState<string>("");

  const handleEditorChange = (content: string) => {
    setContent(content);
  };
  interface BlobInfo {
    id: () => string;
    name: () => string;
    filename: () => string;
    blob: () => Blob;
    base64: () => string;
    blobUri: () => string;
    uri: () => string | undefined;
  }

  const uploadImage = (blobInfo: BlobInfo, progress: (percent: number) => void): Promise<string> => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      const formData = new FormData();
      formData.append("file", blobInfo.blob(), blobInfo.filename());

      xhr.open("POST", "YOUR_BACKEND_ENDPOINT", true);
      xhr.upload.onprogress = (e) => {
        progress((e.loaded / e.total) * 100);
      };
      xhr.onload = () => {
        if (xhr.status === 200) {
          const response = JSON.parse(xhr.responseText);
          resolve(response.imageUrl); // Replace with the actual URL key in your response
        } else {
          reject("Image upload failed");
        }
      };
      xhr.onerror = () => {
        reject("Image upload failed");
      };
      xhr.send(formData);
    });
  };

  return (
    <div>
      <Editor
        initialValue="<p>Initial content</p>"
        init={{
          height: 500,
          menubar: false,
          plugins: [
            "advlist autolink lists link image charmap print preview anchor",
            "searchreplace visualblocks code fullscreen",
            "insertdatetime media table paste code help wordcount",
            "image", // Include this line if not already included
          ],
          toolbar:
            "undo redo | formatselect | " +
            "bold italic | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "help | image",
          content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          images_upload_handler: uploadImage,
        }}
        onEditorChange={handleEditorChange}
      />
      <button onClick={() => console.log(content)}>Log Content</button>
    </div>
  );
};

export default PostEditor;
