import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";

export const NotFound = () => {
  const [count, setCount] = useState(5);
  useEffect(() => {
    const intervalId = setInterval(() => {
      let time = count;
      setCount(time - 1);
      if (!count) window.location.href = "/";
    }, 1000);

    return () => clearInterval(intervalId);
  }, [count]);

  return (
    <div className="text-center">
      <br />
      <br />
      <h1>
        <strong>
          404 NOT FOUND <FontAwesomeIcon icon={faCoffee}></FontAwesomeIcon>
        </strong>
      </h1>
      <h2>Bạn sẽ được chuyển về trang chủ sau {count} giây!</h2>
    </div>
  );
};
