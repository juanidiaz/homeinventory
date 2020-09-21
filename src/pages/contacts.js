import { getAuth } from '../../utils/common';
import { useForm } from 'react-hook-form';
import useFetch from "react-fetch-hook";
import { createNewFile } from '../lib/apiFiles';

export default function contactsPage(props) {

  const { user } = props
  const { register, handleSubmit } = useForm();

  // const Component = () => {
  //   const { isLoading, data } = useFetch("http://localhost:3000/api/categories");
  //   const [stuff, setStuff] = React.useState({});
  //   console.log(" STUFF ", { isLoading, data })

  //   // React.useEffect(() => data ? setStuff([data.data]) : null, [isLoading]);

  //   // if(!isLoading) setStuff(data.data);

  //   return isLoading ? (
  //     <div>Loading...</div>
  //   ) : (
  //       <ul>
  //         {
  //           data.data.map(thisData => {
  //             return <li key={thisData._id}>{thisData.name}</li>
  //           })
  //         }
  //       </ul>
  //     );
  // };

  const onSubmit = (data) => {
    console.log("SELECTED FILES\n", data);
    // http://localhost:3000/api/files

    createNewFile(data).then(sentData => {
      console.log("SENT!!", sentData)
    })

    // evt.preventDefault();
    // //making a post request with the fetch API
    // fetch('/api/files', {
    //   method: 'POST',
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({
    //     firstName: this.state.firstName
    //   })
    // })
    //   .then(response => response.json())
    //   .then(data => console.log(data))
    //   .catch(error => console.log(error))
  }

  const onFormSubmit = event => {
    event.preventDefault() // Stop form submit

    console.log("\n\n<<<<<<<<<<<<<<<<<<<<<<<\n", event.target)
    // this.fileUpload(this.state.file).then((response) => {
    //   console.log('rD', response.data)
    // })
  }

  return (
    <div>
      <div>
        <h3>Upload test</h3>

        <h2>With Node.js <code>"http"</code> module</h2>
        <form
          action="http://localhost:3000/api/files"
          encType="multipart/form-data"
          method="post">
          <div>Text field title: <input type="text" name="title" /></div>
          <div>File: <input type="file" name="multipleFiles" multiple /></div>
          <input type="submit" value="Upload" />
        </form>

        <hr></hr>

        {/* <form action="fileupload" method="post" encType="multipart/form-data">
          <input type="file" name="filetoupload" />
          <input type="submit" />
        </form> */}
        <form
          // onSubmit={event => onFormSubmit(event)}
          onSubmit={handleSubmit(onSubmit)}
          encType="multipart/form-data"
          // encType="multipart/form-data"
        >
          <input ref={register} type="file" name="fileUpload" multiple/>
          <button>Submit</button>
        </form>
      </div>

      {/* <div>Hello {JSON.stringify(json)}</div> */}
      {/* <div>Hello {JSON.stringify(user._id)}</div>
      <div>===================</div>
      <div>{Component()}</div>
      <div>===================</div> */}

    </div>
  )
};

contactsPage.getInitialProps = async (ctx) => getAuth(ctx);