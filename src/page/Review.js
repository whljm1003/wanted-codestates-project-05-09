import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import Header from "../components/Header";
import { BsGrid3X3 } from "react-icons/bs";
import { TiThListOutline } from "react-icons/ti";
import ListView from "../components/ListView";
import GridView from "../components/GridView";
const hashTag = ["최신순", "좋아요 많은순", "댓글 많은순", "랜덤순"];
function Review() {
  const [hash, setHash] = useState(0);
  const [tab, setTab] = useState("grid");
  const changeHash = (index) => setHash(index);
  const changeTab = (tab) => setTab(tab);
  return (
    <Wrapper>
      <Header />
      <HashTag>
        {hashTag.map((tag, index) => (
          <Tag
            key={index}
            selected={hash === index}
            onClick={() => changeHash(index)}
          >
            {tag}
          </Tag>
        ))}
      </HashTag>
      <TabSection>
        <Tab selected={tab === "grid"} onClick={() => changeTab("grid")}>
          <BsGrid3X3 className="icon" size={24} />
        </Tab>
        <Tab selected={tab === "list"} onClick={() => changeTab("list")}>
          <TiThListOutline className="icon" size={24} />
        </Tab>
      </TabSection>
      {tab === "grid" && <GridView />}
      {tab === "list" && <ListView />}
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
const HashTag = styled.div`
  ${({ theme }) => theme.common.flexRow}
  width: 100%;
  height: 2rem;
`;
const Tag = styled.button`
  ${({ theme }) => theme.common.flexRow}
  border: 1.8px solid ${({ theme }) => theme.colors.black};
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 800;
  padding: 0.4rem;
  margin-right: 0.6rem;
  cursor: pointer;
  ${({ selected }) =>
    selected &&
    css`
      background-color: ${({ theme }) => theme.colors.black};
      color: ${({ theme }) => theme.colors.white};
    `}
`;
const TabSection = styled.div`
  ${({ theme }) => theme.common.flexRow}
  width: 100%;
  height: 3rem;
  margin: 0.5rem 0;
`;

const Tab = styled.span`
  ${({ theme }) => theme.common.flexRow}
  width: 50%;
  height: 100%;
  cursor: pointer;
  border-bottom: 2px solid ${({ theme }) => theme.colors.grey};
  .icon {
    color: ${({ theme }) => theme.colors.grey};
  }
  ${({ selected }) =>
    selected &&
    css`
      .icon {
        color: ${({ theme }) => theme.colors.black};
      }
      border-bottom: 2px solid ${({ theme }) => theme.colors.black};
    `}
`;
