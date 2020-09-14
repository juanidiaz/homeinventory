import { useRef } from 'react';
import { Form, Button } from 'react-bootstrap';

const WINDOW_USER_SCRIPT_VARIABLE = "__USER__";

export default function login() {

  const [message, setMessage] = React.useState(null);

  const nameRef = useRef(null);
  const passRef = useRef(null);

  async function handleClickLogin() {

  };
  
  async function handleLogic() {

    const resp = await fetch(window.location.origin + '/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: nameRef.current.value,
        password: passRef.current.value
      })
    })

    const json = await resp.json();

    if (typeof window !== "undefined") {
      window[WINDOW_USER_SCRIPT_VARIABLE] = json.data || {};
    }

    setMessage(json)

    console.log("INFO", json);
  }

  return (
    <>
      <div className="justify-content-center">
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={handleClickLogin}>
          Submit
        </Button>
      </Form>

{/* 
        HERE >>> {JSON.stringify(message)}
        <input type="text" placeholder="username" ref={nameRef} defaultValue="nacho3" />
        <input type="password" placeholder="password" ref={passRef} defaultValue="password" />
        <button onClick={handleLogic}>LOGIN</button>
 */}
      </div>
    </>
  )

};
