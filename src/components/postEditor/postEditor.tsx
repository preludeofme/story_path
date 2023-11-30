import React, { useEffect, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Button } from "@mui/material";
import Image from "next/image";
import axios from "axios";

const PostEditor: React.FC = () => {
  const [content, setContent] = useState<string>("");
  const [blobImg, setBlobImg] = useState<string>("");
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
  const myURL = "https://aoswchlkodefxg8r.public.blob.vercel-storage.com/image-XcB2Rk5bu5yX8gzUsyZweBXIhi2oCJ.png";

  useEffect(() => {
    const getImage = async () => {
      const response = await axios.get(`/api/images?url=${myURL}`);
      setBlobImg(response.data);
    };
    getImage();
  }, []);

  const uploadImage = (blobInfo: BlobInfo, progress: (percent: number) => void): Promise<string> => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      const formData = new FormData();
      formData.append("file", blobInfo.blob(), blobInfo.filename());

      xhr.open("POST", "/api/images", true); // Updated endpoint
      xhr.upload.onprogress = (e) => {
        progress((e.loaded / e.total) * 100);
      };
      xhr.onload = () => {
        if (xhr.status === 200) {
          const response = JSON.parse(xhr.responseText);
          resolve(response.imageUrl); // Ensure this matches the key in your response that contains the image URL
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
        apiKey="88q63nivq7o7jxmfk5812qk5uvqya2qzmjur28ucmhxbt1r5"
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
      <Button onClick={() => console.log(content)}>Post Thought</Button>
      {blobImg !== "" && <Image alt="Vercel Blob Image" src={blobImg} fill />}
    </div>
  );
};

export default PostEditor;
