import styled from 'styled-components';

export const Container = styled.div`
  border: solid 1px #dddddd;
  background-color: #ffffff;
`;

export const Content = styled.div`
  height: 64px;
  margin: 0 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  nav {
    display: flex;
    align-items: center;

    img {
      margin-right: 10px;
      padding-right: 20px;
      border-right: 1px solid #eee;
    }

    a {
      margin: 0 10px;
      font-weight: bold;
      color: #999999;
      transition: all 300ms;

      &.active {
        color: #444444;
      }
    }
  }

  aside {
    display: flex;
    align-items: center;
  }
`;

export const Profile = styled.div`
  display: flex;

  div {
    text-align: right;
    margin-right: 10px;

    strong {
      display: block;
      color: #666666;
      font-size: 14px;
    }

    button {
      margin-top: 2px;
      font-size: 14px;
      border: none;
      color: #de3b3b;
    }
  }
`;
