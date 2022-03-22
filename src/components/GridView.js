import styled from "styled-components";

function GridView({ data }) {
  return (
    <Wrapper>
      {data?.map((item) => (
        <div className="container" key={item.id}>
          <img className="photo" alt="img" src={item.productImg} />
        </div>
      ))}
    </Wrapper>
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
