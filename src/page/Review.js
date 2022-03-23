import React, { useState, useEffect, useCallback, useRef } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import Tab from "../components/Tab";
import ListView from "../components/ListView";
import GridView from "../components/GridView";
import { useDispatch, useSelector } from "react-redux";
import TopBtn from "../components/TopBtn";
function Review() {
  const dataInfo = useSelector((state) => state.data.data);
  const [sort, setSort] = useState(0);
  const [view, setView] = useState("grid");
  const [isLoading, setIsLoading] = useState(false);
  const container = useRef();
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, [dataInfo]);

  return (
    <Wrapper>
      <Container ref={container}>
        <Header />
        <Tab sort={sort} setSort={setSort} view={view} setView={setView} />
        {view === "grid" && <GridView data={dataInfo} isLoading={isLoading} />}
        {view === "list" && <ListView data={dataInfo} isLoading={isLoading} />}
      </Container>
      <TopBtn container={container} />
    </Wrapper>
  );
}

export default Review;
const Wrapper = styled.div`
  position: relative;
  max-width: 600px;
  margin: 0 auto;
`;

const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  max-width: 420px;
  margin: 0 auto;
  height: 100vh;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;
