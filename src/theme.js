// color
const colors = {
  white: '#ffff',
  lightWhite: '#DADADA',
  black: '#010101',
  grey: '#999999',
};

// 자주 사용하는 스타일 속성
const common = {
  flexRow: `
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  flexColumn: `
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,
};

const theme = {
  colors,
  common,
};

export default theme;
