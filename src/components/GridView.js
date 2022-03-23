import React, { useState, useEffect, useRef, useCallback } from "react";
import styled from "styled-components";
import Loader from "./Loader";

function GridView({ data }) {
  const [list, setList] = useState(data.slice(0, 20));
  const [isLoading, setIsLoading] = useState(false);
  const loadRef = useRef(null);
  const observerRef = useRef(null);

  const getMoreItem = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setList((list) => list.concat(data.slice(list.length, list.length + 10)));
  };

  const onIntersect = useCallback(
    async (entry, observer) => {
      if (entry[0].isIntersecting) {
        observer.unobserve(entry[0].target);
        await getMoreItem();
        observer.observe(entry[0].target);
      }
    },
    [list]
  );

  useEffect(() => {
    if (loadRef.current) {
      observerRef.current = new IntersectionObserver(onIntersect, {
        threshold: 0.4,
      });
      observerRef.current.observe(loadRef.current);
    }
    return () => observerRef.current && observerRef.current.disconnect();
  }, [onIntersect]);

  useEffect(async () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <>
      {isLoading && <Loader />}
      <Wrapper>
        {list?.map((item, index) => (
          <div className="container" key={index}>
            <img className="photo" alt="img" src={item.productImg} />
          </div>
        ))}

        <Load ref={loadRef}></Load>
      </Wrapper>
    </>
  );
}

export default GridView;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-column-gap: 2px;
  grid-row-gap: 2px;
  height: 85vh;
  padding: 2px;
  .container {
    height: 150px;
  }
  .photo {
    width: 100%;
    height: 100%;
  }
`;

const Load = styled.div`
  bottom: 0;
  display: block;
  height: 50px;
  width: 100%;
  z-index: 10;
`;
