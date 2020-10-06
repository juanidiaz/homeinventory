import { useRef } from "react";

export default function login() {

  const [message, setMessage] = React.useState(null);

  const nameRef = useRef(null);
  const passRef = useRef(null);

  async function handleLogic() {
    const resp = await fetch("http://localhost:3000/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: nameRef.current.value,
        password: passRef.current.value
      })
    })

    const json = await resp.json();
    setMessage(json)

    console.log("INFO", json);
  }

  return (
    <div>
      <h1>CREATE NEW USER</h1>
      {JSON.stringify(message)}
      <input type="text" placeholder="username" ref={nameRef} />
      <input type="password" placeholder="password" ref={passRef} />
      <button onClick={handleLogic}>LOGIN</button>
    </div>
  )

};
