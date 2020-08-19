import React from "react";
import { Link, graphql, useStaticQuery } from "gatsby";
import styled from "styled-components";
import { WideContainer } from "./container";
import useNavigationData, { NavItem } from "../../queries/useNavigationData";

const Head = styled.div`
  line-height: 56px;
`;

const Title = styled(Link)`
  align-self: center;
`;

const Logo = styled.img`
  padding: 0;
  margin: 0;
  display: block;
`;

const Nav = styled.nav`
  display: flex;
  flex-direction: column;

  @media screen and (min-width: ${({ theme }) => theme.screen.md}) {
    flex-direction: row;
  }
`;

const NavLinks = styled.div`
  margin-left: auto;
  display: flex;
  justify-content: center;

  @media screen and (max-width: ${({ theme }) => theme.screen.sm}) {
    margin: 0 auto;
  }
`;

const NavLink = styled(Link)`
  color: ${({ theme }) => theme.color.textColor};
  text-decoration: none;
  align-self: center;

  &:not(:last-child) {
    margin-right: ${({ theme }) => theme.size.spacing};
  }

  &:visited {
    color: ${({ theme }) => theme.color.textColor};
  }

  @media screen and (min-width: ${({ theme }) => theme.screen.md}) {
    margin-left: ${({ theme }) => theme.size.spacing};
  }
`;

const Header: React.FC = () => {
  const navigation = useNavigationData();
  const query = useStaticQuery(graphql`
    query LogoQuery {
      logoImage: file(name: { eq: "echo-karriere" }) {
        childImageSharp {
          fixed(width: 160, height: 70) {
            src
            srcSet
            base64
          }
        }
      }
    }
  `);

  return (
    <Head>
      <WideContainer>
        <Nav>
          <Title to="/">
            <Logo
              src={query.logoImage.childImageSharp.fixed.base64}
              srcSet={query.logoImage.childImageSharp.fixed.srcSet}
              alt="echo karriere logo"
            />
          </Title>
          <NavLinks>
            {navigation.map((nav: NavItem) => (
              <NavLink to={nav.link} key={nav.link}>
                {nav.title}
              </NavLink>
            ))}
          </NavLinks>
        </Nav>
      </WideContainer>
    </Head>
  );
};

export default Header;
