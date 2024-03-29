import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";
import { Navigate } from "react-router-dom";

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
    ["clean"],
  ],
};

function CreatePost() {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [redirect, setRedirect] = useState(false);
  
  async function handlePostCreation(event) {
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("file", files[0]);
    event.preventDefault();

    const response = await fetch("http://localhost:1050/api/users/create", {
      method: "POST",
      body: data,
      credentials:'include'
    });
    console.log("res = ",response);
    if(response.ok){
      setRedirect(true)
    }
  }


  if(redirect) {
    return <Navigate to="/" />
  }

  return (
    <div>
      <h1>Create Post</h1>
      <form onSubmit={handlePostCreation}>
        <input
          name="title"
          value={title}
          placeholder="Title"
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        />
        <input
          name="summary"
          value={summary}
          placeholder="Summary"
          onChange={(event) => {
            setSummary(event.target.value);
          }}
        />
        {/* <input
          type="file"
          onChange={(event) => {
            setFiles(event.target.files);
          }}
        /> */}
        <ReactQuill
          value={content}
          onChange={(newValue) => {
            setContent(newValue);
          }}
          modules={modules}
        ></ReactQuill>
        <button style={{marginTop:'5px'}}>Create Post</button>
      </form>
    </div>
  );
}

export default CreatePost;
