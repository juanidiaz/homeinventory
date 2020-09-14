import { Form, Button } from 'react-bootstrap';
import fetch from 'isomorphic-unfetch';
import Router from 'next/router';

const WINDOW_USER_SCRIPT_VARIABLE = "__USER__";

export default function login() {

  const [loginInfo, setLoginInfo] = React.useState({});

  const handleChange = name => value => {
    setLoginInfo({
      ...loginInfo,
      [name]: value.target.value
    })
  }

  async function handleClickLogin(e) {
    e.preventDefault()

    const resp = await fetch(window.location.origin + '/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(loginInfo)
    })

    const json = await resp.json();

    if (resp.status === 200) {
      if (json.success && typeof window !== "undefined") {
        window[WINDOW_USER_SCRIPT_VARIABLE] = json.data || {};
      }

      if (typeof ctx !== "undefined" && ctx.req) {
        ctx.res.writeHead(200, {
          Location: origin + '/'
        });
        ctx.res.end();
      } else {
        Router.replace('/');
      }
    }
  };

  return (
    <>
      <div className="justify-content-center">
        <Form>

          <Form.Group controlId="formUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" placeholder="Enter username" onChange={handleChange("name")} />
          </Form.Group>
          {/* 
          <Form.Group controlId="formEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" onChange={handleChange("email")} />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
 */}
          <Form.Group controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" onChange={handleChange("password")} />
          </Form.Group>

          <Button variant="primary" type="submit" disabled={!loginInfo.name || !loginInfo.password} onClick={handleClickLogin}>
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
