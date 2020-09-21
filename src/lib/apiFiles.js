import axios from "axios";

export const createNewFile = async fileData => {

  const formData = new FormData();
  formData.append('file', fileData.fileUpload[0]);
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  };

  const { data } = await axios.post('/api/files', formData, config);

  // const hasFiles = true
  // const formDataWithFiles = hasFiles ? new FormData() : undefined;
  // if (formDataWithFiles) {
  //   // axios will automatically set the content-type to multipart/form-data if the
  //   // data param is a FormData object
  //   // otherwise, it will use application/json
  //   // (study the Dev Tools > Network tab > XHR tab headers)
  //   Object.keys(modifiedFields)
  //     .forEach(field => formDataWithFiles.append(field, modifiedFields[field]));
  // }

  // const { data } = await axios({
  //   method: 'POST',
  //   url: '/api/files',
  //   data: hasFiles ? formDataWithFiles : modifiedFields,
  //   headers: {
  //     ...axios.defaults.headers,
  //     ...headers,
  //   },
  // });

  // return data;
};
