import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import Tab from "../components/Tab";
import ListView from "../components/ListView";
import GridView from "../components/GridView";
import { useDispatch, useSelector } from "react-redux";
function Review() {
  const dataInfo = useSelector((state) => state.data.data);
  const [sort, setSort] = useState(0);
  const [view, setView] = useState("grid");
  return (
    <Wrapper>
      <Header />
      <Tab sort={sort} setSort={setSort} view={view} setView={setView} />
      {view === "grid" && <GridView data={dataInfo} />}
      {view === "list" && <ListView data={dataInfo} />}
    </Wrapper>
  );
}

export default Review;

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  max-width: 420px;
  margin: 0 auto;
  height: 100vh;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;
