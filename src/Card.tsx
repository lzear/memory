import React from 'react';
import styled from 'styled-components';

interface CardProps {
  readonly cardWidth: number;
}

export const Card = styled.div<CardProps>`
  height: ${({ cardWidth }) => cardWidth}px;
  width: ${({ cardWidth }) => cardWidth}px;
  margin: 5px;
  padding: 0;
`;

export const BlankCard = styled(Card)`
  visibility: hidden;
`;

interface InteractiveCardProps {
  readonly active: boolean;
  readonly found: boolean;
  readonly onClick: () => void;
}

export const InteractiveCard = styled(Card)<InteractiveCardProps>`
  background-color: lightgrey;
  outline: ${({ active }) => (active ? '10px solid black' : 'none')};
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
export const CardImage: React.FC<
  CardProps & CardImageProps & InteractiveCardProps
> = ({ active, found, url, cardWidth, onClick }) => {
  return (
    <InteractiveCard
      active={active}
      found={found}
      onClick={onClick}
      cardWidth={cardWidth}
    >
      <img
        alt=""
        src={url}
        style={{
          display: 'block',
          height: cardWidth,
          width: cardWidth,
          opacity: active || found ? 1 : 0,
        }}
      />
    </InteractiveCard>
  );
};

export const Row = styled.div`
  display: flex;
  justify-content: center;
`;
