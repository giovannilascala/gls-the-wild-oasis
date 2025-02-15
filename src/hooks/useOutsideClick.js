import { useEffect, useRef } from "react";

function useOutsideClick(hanlder, listenCapturing = true) {
  const ref = useRef();
  useEffect(() => {
    function handleClick(e) {

      if (ref.current && !ref.current.contains(e.target))
        hanlder();

    }

    document.addEventListener("click", handleClick, listenCapturing);

    return () => document.removeEventListener("click", handleClick, listenCapturing);
  }, [hanlder, listenCapturing]);

  return { ref };
}

export { useOutsideClick };