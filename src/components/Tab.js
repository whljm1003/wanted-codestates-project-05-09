import React from "react";
import styled, { css } from "styled-components";
import { BsGrid3X3 } from "react-icons/bs";
import { TiThListOutline } from "react-icons/ti";
import { useDispatch } from "react-redux";
import { sortedData } from "../store/dataSlice";
const sortTag = ["최신순", "좋아요 많은순", "댓글 많은순", "랜덤순"];
function Tab({ sort, setSort, view, setView }) {
  const dispatch = useDispatch();
  const changeSort = (index) => {
    setSort(index);
    dispatch(sortedData(index));
  };

  const changeTab = (tab) => setView(tab);
  return (
    <>
      <SortSeciton>
        {sortTag.map((tag, index) => (
          <SortTab
            key={index}
            selected={sort === index}
            onClick={() => changeSort(index)}
          >
            {tag}
          </SortTab>
        ))}
      </SortSeciton>
      <ViewSection>
        <ViewTab selected={view === "grid"} onClick={() => changeTab("grid")}>
          <BsGrid3X3 className="icon" size={24} />
        </ViewTab>
        <ViewTab selected={view === "list"} onClick={() => changeTab("list")}>
          <TiThListOutline className="icon" size={24} />
        </ViewTab>
      </ViewSection>
    </>
  );
}

export default Tab;

const SortSeciton = styled.div`
  ${({ theme }) => theme.common.flexRow}
  width: 100%;
  height: 2rem;
`;
const SortTab = styled.button`
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
const ViewSection = styled.div`
  ${({ theme }) => theme.common.flexRow}
  width: 100%;
  height: 3rem;
  margin: 0.5rem 0;
`;

const ViewTab = styled.span`
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
