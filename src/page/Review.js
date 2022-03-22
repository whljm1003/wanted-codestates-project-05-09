import React, { useState, useEffect } from "react";
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
  const [data, setData] = useState([]);

  useEffect(() => {
    const newdata = [...data];
    switch (sort) {
      case 0:
        setData(dataInfo);
        break;
      case 1:
        setData(newdata.sort((a, b) => b.createDt - a.createDt));
        break;
      case 2:
        setData(newdata.sort((a, b) => b.comments.length - a.comments.length));
        break;
      case 3:
        setData(newdata.sort(() => Math.random() - 0.5));
        break;
      default:
        setData(dataInfo);
    }
  }, [sort]);
  return (
    <Wrapper>
      <Header />
      <Tab sort={sort} setSort={setSort} view={view} setView={setView} />
      {view === "grid" && <GridView data={data} />}
      {view === "list" && <ListView data={data} />}
    </Wrapper>
  );
}

export default Review;

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  max-width: 420px;
  margin: 0 auto;
  /* height: 100vh; */
  overflow: hidden;
`;
