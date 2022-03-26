import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Loader from "./Loader";
import ReactLoading from "react-loading";

function GridView({ data }) {
  const [list, setList] = useState(data.slice(0, 20));
  const [isLoading, setIsLoading] = useState(false);
  const [isScroll, setIsScroll] = useState(false);
  const loadRef = useRef(null);
  const observerRef = useRef(null);
  const navigate = useNavigate();
  // 상세 페이지 이동
  const ClickedItem = (item) => {
    navigate(`/detail/${item.id}`);
  };
  // 무한 스크롤
  const onIntersect = useCallback(
    async (entry, observer) => {
      if (entry[0].isIntersecting) {
        observer.unobserve(entry[0].target);
        await new Promise((resolve) => setTimeout(resolve, 500));
        setList((list) =>
          list.concat(data.slice(list.length, list.length + 10))
        );
        observer.observe(entry[0].target);
      }
    },
    [data]
  );

  useEffect(() => {
    if (loadRef.current && !isLoading && list.length !== data.length) {
      setIsScroll(true);
      observerRef.current = new IntersectionObserver(onIntersect, {
        threshold: 0.4,
      });
      if (isScroll) {
        observerRef.current.observe(loadRef.current);
      }
    }
    return () => {
      setIsScroll(false);
      observerRef.current && observerRef.current.disconnect();
    };
  }, [list, data, isScroll, isLoading, onIntersect]);

  useEffect(() => {
    setList(data.slice(0, 20));
  }, [data]);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  return (
    <>
      <Wrapper>
        {isLoading && <Loader />}
        {list?.map((item, index) => (
          <div
            className="container"
            key={index}
            onClick={() => ClickedItem(item)}
          >
            <img
              loading="lazy"
              className="photo"
              alt={item.productImg[0]}
              src={item.productImg[0]}
            />
          </div>
        ))}
      </Wrapper>
      <Load ref={loadRef}>
        {isScroll && !isLoading && (
          <InfiniteLoading type="spin" color="#2f3640" />
        )}
      </Load>
    </>
  );
}

export default GridView;
const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-column-gap: 2px;
  grid-row-gap: 2px;
  padding: 2px;
  position: relative;
  .container {
    height: 150px;
    cursor: pointer;
  }
  .photo {
    width: 100%;
    height: 100%;
  }
`;
const Load = styled.div`
  ${({ theme }) => theme.common.flexRow};
  width: 100%;
  height: 100px;
  background-color: ${({ theme }) => theme.colors.white};
`;
const InfiniteLoading = styled(ReactLoading)`
  width: 3rem;
  height: 3rem;
  z-index: 999;
`;
