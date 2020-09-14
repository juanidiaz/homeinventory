import { useRef } from 'react';
const WINDOW_USER_SCRIPT_VARIABLE = "__USER__";

export default function login() {

  const [message, setMessage] = React.useState(null);

  const nameRef = useRef(null);
  const passRef = useRef(null);

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
    <div>
      HERE >>> {JSON.stringify(message)}
      <input type="text" placeholder="username" ref={nameRef} defaultValue="nacho3"/>
      <input type="password" placeholder="password" ref={passRef} defaultValue="password"/>
      <button onClick={handleLogic}>LOGIN</button>
    </div>
  )

};
