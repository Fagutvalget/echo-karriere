import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import styled from "styled-components";
import { Container } from "../common/container";

import aboutUrl from "../../assets/about.svg";
import hiringUrl from "../../assets/hiring.svg";
import studentsUrl from "../../assets/students.svg";
import { math } from "polished";

const Wrapper = styled.div`
  background: url("/images/mountains.svg");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  background-color: ${props => props.theme.brand.color5};
  height: 60vh;
  margin-bottom: ${props => math(`${props.theme.size.spacing} * 4`)};
`;

const Hello = styled.div`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, -50%);
  color: ${props => props.theme.color.textColor};
  text-align: center;
  width: 100vw;

  @media screen and (min-width: ${props => props.theme.screen.sm}) {
    bottom: 15%;
  }

  @media screen and (min-width: ${props => props.theme.screen.md}) {
    bottom: 50%;
  }
`;

const Art = styled.figure`
  margin: 0;
  max-width: ${props => math(`${props.theme.screen.md} / 2`)};
  width: 100%;
`;

type GridType = {
  readonly inverse?: boolean;
};

const Grid = styled.div<GridType>`
  display: grid;
  grid-template-columns: 3fr 2fr;
  grid-gap: ${props => math(`${props.theme.size.spacing} * 2`)};
  text-align: right;
  align-items: center;
  justify-items: center;
  margin: ${props => props.theme.size.spacing} 0;
  ${props =>
    props.inverse &&
    `
    text-align: left;
    grid-template-columns: 2fr 3fr;
  `}

  h2 {
    margin-bottom: 16px;
  }

  @media (max-width: ${props => props.theme.screen.md}) {
    grid-template-columns: 1fr;
    text-align: left;

    &:last-child {
      margin-bottom: ${props => props.theme.size.spacing};
    }

    ${props =>
      props.inverse &&
      `
        ${Art} {
          order: 2;
        }
    `}
  }
`;

const Intro: React.FC = () => {
  const { apiLanding: data } = useStaticQuery(graphql`
    query IntroPage {
      apiLanding {
        title
        subtitle
        about
        for_companies
        for_students
      }
    }
  `);

  return (
    <>
      <Wrapper>
        <Hello>
          <h1>{data.title}</h1>
          <h2>{data.subtitle}</h2>
        </Hello>
      </Wrapper>
      <Container>
        <Grid>
          <div>
            <h2>Om echo karriere</h2>
            <div dangerouslySetInnerHTML={{ __html: data.about }} />
          </div>
          <Art>
            <img
              src={aboutUrl}
              alt="Four persons standing around with a small dog in front."
            />
          </Art>
        </Grid>
        <Grid inverse>
          <Art>
            <img
              src={hiringUrl}
              alt="Art showing a person looking at online resumes."
            />
          </Art>
          <div>
            <h2>For bedrifter</h2>
            <div dangerouslySetInnerHTML={{ __html: data.for_companies }} />
          </div>
        </Grid>
        <Grid>
          <div>
            <h2>For studenter</h2>
            <div dangerouslySetInnerHTML={{ __html: data.for_students }} />
          </div>
          <Art>
            <img src={studentsUrl} alt="A graduation cap." />
          </Art>
        </Grid>
      </Container>
    </>
  );
};

export default Intro;
