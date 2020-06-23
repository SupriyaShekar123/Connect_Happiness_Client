import React, { useEffect, useState } from "react";
import axios from "axios";

export default function SSEClient() {
  console.log("TESTING N!N@N#");

  const [state, setstate] = useState([]);

  React.useEffect(() => {
    let eventSource = new EventSource("http://localhost:4000/stream");
    eventSource.onmessage = (e) => console.log(e.data);
  }, []);

  const updateProdutList = (product) => {
    setstate([...product]);
  };

  console.log("VAlue of state ", state);
  return (
    <div>
      {console.log("state va", state)}
      Hello
    </div>
  );
}
