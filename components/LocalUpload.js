import React from 'react';
import { useForm } from 'react-hook-form'

export default function LocalUpload() {
  const { register, handleSubmit } = useForm()

  const onSubmit = async (data) => {
    const formData = new FormData()
    formData.append("picture", data.picture[0])

    console.log(">>>>>>>>LocalUpload", formData)

    const res = await fetch("/api/localUpload", {
      method: "POST",
      body: formData
    }).then(res => res.json())
    alert(JSON.stringify(res))
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>UPLOAD FILE LOCAL</h2>
        <p>/home/jdiaz/repos/personal/homeinventory/components/localUpload.js</p>
        <input
          ref={register}
          type="file"
          name="picture"
        />
        <button>Submit file</button>
      </form>
      <br />
      <br />
    </div>
  );
}
