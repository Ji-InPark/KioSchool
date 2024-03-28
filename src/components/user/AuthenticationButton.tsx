import React from 'react';
import useAuthentication from '@hooks/useAuthentication';
import { NavLinkItem } from '@components/common/nav/NavBar';
import styled from '@emotion/styled';

const LogoutText = styled.p`
  text-decoration: none;
  padding-left: 33px;
  color: inherit;
  cursor: pointer;
  text-align: center;
  font-size: 24px;
  font-weight: 400;
`;

function AuthenticationButton() {
  const { logout, isLoggedIn } = useAuthentication();

  return (
    <>
      {isLoggedIn() ? (
        <LogoutText
          onClick={() => {
            logout().then(() => {
              location.reload();
            });
          }}
        >
          Logout
        </LogoutText>
      ) : (
        <>
          <NavLinkItem to={'/login'}>Login</NavLinkItem>
          <br />
          <NavLinkItem to={'/register'}>Sign Up</NavLinkItem>{' '}
        </>
      )}
    </>
  );
}

export default AuthenticationButton;
