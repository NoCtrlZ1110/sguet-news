import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import history from "../../services/history";

const NotFound = () => {
  const [count, setCount] = useState(5);
  useEffect(() => {
    const intervalId = setInterval(() => {
      let time = count;
      setCount(time - 1);
      if (!count) history.push("/");
    }, 1000);

    return () => clearInterval(intervalId);
  }, [count]);

  return (
    <div className="text-center">
      <br />
      <br />
      <h1
        style={{
          color: "#ffffff",
          fontSize: 55,
          fontWeight: 500,
          fontFamily: "Bungee",
        }}
        id="shadow"
      >
        404 NOT FOUND <FontAwesomeIcon icon={faCoffee}></FontAwesomeIcon>
      </h1>
      <h2 style={{ color: "#ffffff" }}>
        Bạn sẽ được chuyển về trang chủ sau {count} giây!
      </h2>
    </div>
  );
};

export default NotFound;
