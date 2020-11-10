import React, { useState } from 'react';
import axios from 'axios';

const FileUpload = () => {
  // If you are using TypeScript the state will be
  // const [file, setFile] = useState<FileList | null>(null);
  const [file, setFile] = useState(null);

  const { register, handleSubmit } = useForm()


  const submitFile = async () => {
    try {
      if (!file) {
        throw new Error('Select a file first!');
      }
      const formData = new FormData();
      console.log("======= submitFile 0 =======!", file[0])
      formData.append('file', file[0]);
      await axios.post("/api/test-upload", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      // handle success
    } catch (error) {
      // handle error
    }
  };

  const onSubmit = async (data) => {
    const formData = new FormData()
    formData.append("picture", data.picture[0])

    // const res = await fetch("http://192.168.0.150:4000/picture", {
    // const res = await fetch("http://localhost:4000/picture", {
    const res = await fetch("/api/localUpload", {
      method: "POST",
      body: formData
    }).then(res => res.json())
    alert(JSON.stringify(res))
  }

  return (
    <div>
      <form onSubmit={submitFile}>
        <label>Upload file</label>
        <input type="file" onChange={event => setFile(event.target.files)} />
        <button type="submit">Send</button>
      </form>

      <p>-----------------------</p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>UPLOAD FILE LOCAL FOLDER</h2>
        <input
          ref={register}
          type="file"
          name="picture"
        />
        <button>Submit file</button>
      </form>
    </div>
  );
};

export default FileUpload;