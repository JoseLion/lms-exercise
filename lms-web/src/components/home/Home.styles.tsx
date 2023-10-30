import { Card } from "@blueprintjs/core";
import styled from "styled-components";

export const HomeView = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  margin: auto;
`;

export const WelcomeCard = styled(Card)`
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 20vw;
`;

export const ButtonRow = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 100%;
`;

export const HomeModal = styled(Card)`
  left: calc(50% - 25vw / 2);
  min-height: 60%;
  top: 10%;
  width: 25vw;
`;
