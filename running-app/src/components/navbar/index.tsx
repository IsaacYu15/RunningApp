import { Link } from "react-router-dom";
import styled from "styled-components";
import { Routes as RouteNames } from "../../constants/routes";

const Navbar = () => {
  return (
    <Container>
      <StyledLink to={RouteNames.HOME}>Home</StyledLink>
      <StyledLink to={RouteNames.HISTORY}>History</StyledLink>
      <StyledLink to={RouteNames.RECORD}>Record</StyledLink>
      <StyledLink to={RouteNames.LOGIN}>Login</StyledLink>
    </Container>
  );
};

const Container = styled.nav`
  position: fixed;
  width: 100%;
  right: 0;
  top: 0;

  z-index: 99;

  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 15px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  transition: color 0.3s ease;
`;

export default Navbar;
