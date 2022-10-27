import React, { useEffect, useMemo, useRef, useState } from "react";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useFormikContext } from "formik";
import "react-quill/dist/quill.snow.css";
import { useToast } from "../../context/toastContext";
import { handleUpload } from "../../utils/handleUpload";
import shortid from "shortid";
import Loader from "../Loader";
import dynamic from "next/dynamic";
// const Editor: any = dynamic(() => import("react-quill"), { ssr: false });
const Editor: any = dynamic(
  async () => {
    const { default: RQ } = await import("react-quill");
    return ({ forwardedRef, ...props }: any) => (
      <RQ ref={forwardedRef} {...props} />
    );
  },
  {
    ssr: false,
  }
);
Editor.displayName = "MyComponent";

export default function AppFormEditor({ name }) {
  const quillRef: any = useRef(false);
  const toast: any = useToast();
  const imageHandler = (e) => {
    const editor = quillRef.current.getEditor();
    console.log(editor);
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      if (/^image\//.test(file.type)) {
        setuploadingImage(true);
        await handleUpload({
          file: file,
          key: `lessons/${shortid.generate()}-${file.name}`,
        }).then((e) => {
          setuploadingImage(false);
          const url = e;
          editor.insertEmbed(editor.getSelection(), "image", url);
        });
      } else {
        toast.show({ tiltle: "You could only upload images." });
      }
    };
  };

  const { setFieldValue, values } = useFormikContext();
  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          ["bold", "italic", "underline", "strike"],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
          ],
          ["image", "link"],
          [
            {
              color: [
                "#000000",
                "#e60000",
                "#ff9900",
                "#ffff00",
                "#008a00",
                "#0066cc",
                "#9933ff",
                "#ffffff",
                "#facccc",
                "#ffebcc",
                "#ffffcc",
                "#cce8cc",
                "#cce0f5",
                "#ebd6ff",
                "#bbbbbb",
                "#f06666",
                "#ffc266",
                "#ffff66",
                "#66b966",
                "#66a3e0",
                "#c285ff",
                "#888888",
                "#a10000",
                "#b26b00",
                "#b2b200",
                "#006100",
                "#0047b2",
                "#6b24b2",
                "#444444",
                "#5c0000",
                "#663d00",
                "#666600",
                "#003700",
                "#002966",
                "#3d1466",
              ],
            },
          ],
        ],
        handlers: {
          image: imageHandler,
        },
      },
    }),
    []
  );
  const [uploadingImage, setuploadingImage] = useState(false);
  return (
    <div className="relative mt-4 min-h-[200px]">
      {uploadingImage && (
        <div className="w-full flex items-center border border-gray-200 z-50 justify-center h-full absolute top-0 bg-white bg-opacity-80">
          <Loader small primary />
        </div>
      )}
      <Editor
        theme="snow"
        modules={modules}
        forwardedRef={quillRef}
        value={values[name]}
        onChange={(e) => {
          setFieldValue(name, e);
        }}
      />
    </div>
  );
}
