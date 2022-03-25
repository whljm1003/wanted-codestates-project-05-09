import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FaArrowCircleUp } from "react-icons/fa";
function TopBtn({ container }) {
  const [ScrollY, setScrollY] = useState(0);
  const [BtnStatus, setBtnStatus] = useState(false);
  const handleFollow = () => {
    setScrollY(container.current.scrollTop);
    if (ScrollY > 100) {
      setBtnStatus(true);
    } else {
      setBtnStatus(false);
    }
  };
  const handleTop = () => {
    container.current.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setScrollY(0);
    setBtnStatus(false);
  };
  useEffect(() => {
    const current = container.current;
    const watch = () => {
      current.addEventListener("scroll", handleFollow);
    };
    watch();
    return () => {
      current.removeEventListener("scroll", handleFollow);
    };
  });

  return (
    <>
      <Btn show={BtnStatus} onClick={handleTop}>
        <Icon />
      </Btn>
    </>
  );
}

export default TopBtn;

const Btn = styled.button`
  background: none;
  position: absolute;
  bottom: 20px;
  right: 20px;
  opacity: ${({ show }) => (show ? "1" : "0")};
  z-index: ${({ show }) => (show ? "999" : "-10")};
  border: 0;
  outline: 0;
  cursor: pointer;
`;
const Icon = styled(FaArrowCircleUp)`
  font-size: 2.5rem;
`;
