import React from 'react';
import styled from 'styled-components';

interface CardProps {
  readonly cardWidth: number;
}

export const Card = styled.div<CardProps>`
  height: ${({ cardWidth }) => cardWidth}px;
  width: ${({ cardWidth }) => cardWidth}px;
  margin: 5px;
  padding: 5px;
  text-align: center;
`;

export const BlankCard = styled(Card)`
  visibility: hidden;
`;

interface InteractiveCardProps {
  readonly active: boolean;
  readonly found: boolean;
}

export const InteractiveCard = styled(Card)<InteractiveCardProps>`
background-color: lightgrey;
  outline: ${({ active }) => (active ? '10px solid black' : 'none')};
  /* 
  background-color: ${({ active, found }) =>
    active || found ? 'white' : 'lightgrey'};
   visibility: ${({ found }) => (found ? 'hidden' : 'visible')};
*/
`;

interface CardColorProps {
  readonly pairIdx: number;
  readonly nbPairs: number;
}

export const CardColor = styled(InteractiveCard)<CardColorProps>`
  background-color: ${({ active, found, pairIdx, nbPairs }) =>
    active || found
      ? `hsl(${(360 * pairIdx) / nbPairs}, 100%, 50%)`
      : 'lightgrey'};
`;

interface CardImageProps {
  readonly url: string;
}
export const CardImage = styled(InteractiveCard)<CardImageProps>`
  background-image: ${({ url, found, active }) =>
    active || found ? `url("${url}")` : 'none'};
`;

export const Row = styled.div`
  display: flex;
  justify-content: center;
`;
