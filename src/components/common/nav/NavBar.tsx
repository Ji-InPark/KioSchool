import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import kioLogo from '../../../resources/image/kioLogo.png';
import userDefaultProfileImage from '../../../resources/image/userDefaultProfileImage.png';
import AuthenticationButton from '@components/user/AuthenticationButton';

const NavContainer = styled.div`
  z-index: 1003;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  top: 0;
  left: 0;
  right: 0;
  position: fixed;
`;

const AccountLink = styled(Link)`
  width: 60px;
  height: 60px;
`;

const NavContent = styled.div`
  margin: 15px 24px 40px 24px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const NavLilnkContainer = styled.div`
  display: flex;
  flex-direciont: row;
  justify-content: space-between;
  align-items: center;
`;

const NavLinkItemContainer = styled.div`
  padding-right: 40px;
  width: 75%;
  display: flex;
  flex-direciont: row;
  align-items: center;
`;

export const NavLinkItem = styled(Link)`
  text-decoration: none;
  text-align: center;
  font-size: 24px;
  font-weight: 400;
  padding: 0 0 0 33px;
  color: inherit;
  cursor: pointer;
  width: 100px;
  height: 43px;
  line-height: 43px;
  text-align: center;
`;

interface NavBarProps {
  logoSize: 'small' | 'medium';
}

const sizeMap: { [key in NavBarProps['logoSize']]: { width: string; height: string } } = {
  small: { width: '125px', height: '60px' },
  medium: { width: '170px', height: '80px' },
};

function NavBar({ logoSize }: NavBarProps) {
  return (
    <NavContainer>
      <NavContent>
        <Link to={'/'}>
          <img src={kioLogo} {...sizeMap[logoSize]} alt="Kio Logo" />
        </Link>

        <NavLilnkContainer>
          <NavLinkItemContainer>
            <NavLinkItem to={'/info'}>Info</NavLinkItem>
            <AuthenticationButton />
          </NavLinkItemContainer>

          <AccountLink to={'/register-account'}>
            <img src={userDefaultProfileImage} width="60px" height="60px" />
          </AccountLink>
        </NavLilnkContainer>
      </NavContent>
    </NavContainer>
  );
}

export default NavBar;
