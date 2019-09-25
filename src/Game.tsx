import React, {
  FunctionComponent,
  useContext,
  useReducer,
  useState,
  useEffect,
} from 'react';
import { Alert, Button, Typography, Spin } from 'antd';
import _ from 'lodash';
import { CardTypes, GameConfigContext } from './GameConfiguration';
import { BlankCard, CardColor, CardImage, Row } from './Card';

type Distribution = {
  // array containing existing values of cards (e.g. ['king', 'four', 'jack'])
  cardValues: number[] | string[];

  // 2D array storing the value of each card, with 1 potential null value if the number of cards is odd
  // eg: [
  //       [0, 2, 2],
  //       [1, 0, 1],
  //     ]
  board: (number | null)[][];
};

const distribute = (
  cardType: CardTypes,
  size: number,
  cardWidth: number,
): Distribution => {
  const nCards = Math.floor(size ** 2 / 2);
  const cardIdxs = _.range(nCards);
  const cards = [...cardIdxs, ...cardIdxs];
  const deck = _.shuffle(size ** 2 % 2 ? [...cards, null] : cards);
  let cardValues: number[] | string[];
  if (cardType === CardTypes.Color) {
    cardValues = cardIdxs.map((n: number) => (n * 360) / nCards);
  } else {
    // CardTypes.Image
    cardValues = cardIdxs.map(
      () =>
        `https://picsum.photos/seed/${Math.random()
          .toString(36)
          .substring(7)}/${cardWidth}/${cardWidth}`,
    );
  }
  return {
    cardValues,
    board: _.chunk(deck, size),
  };
};

type State = {
  attempts: number;
  foundPairs: boolean[]; // pairIndexes that are found
  activeTile1: [number, number] | null;
  activeTile2: [number, number] | null;
};

const initialGameState = (nbPairs: number) => ({
  attempts: 0,
  foundPairs: _.range(nbPairs).map(() => false),
  activeTile1: null,
  activeTile2: null,
});

enum Actions {
  Click,
  ClearActive,
  Reset,
}

type Action =
  | {
      type: Actions.Click;
      value: [number, number];
    }
  | { type: Actions.ClearActive }
  | { type: Actions.Reset };

const Game: FunctionComponent<{ width: number }> = ({ width }) => {
  const [context, setContext] = useContext(GameConfigContext);
  const { size, cardType } = context!;
  const cardWidth = Math.floor(width / size) - 6;
  const nbPairs = Math.floor(size ** 2 / 2);
  const [distribution, setDistribution] = useState<Distribution | null>(null);

  const [seed, setSeed] = useState(Math.random()); // this is used to trigger a new distribution on change
  useEffect(() => {
    setDistribution(distribute(cardType, size, cardWidth));
  }, [cardType, cardWidth, size, seed]);

  // This reducer controls the card flipping
  const [gameState, gameReducer] = useReducer<
    (prevsState: State, action: Action) => State
  >((prevState, action) => {
    if (!distribution) return prevState;
    if (action.type === Actions.Reset) return initialGameState(nbPairs);
    if (action.type === Actions.ClearActive)
      return {
        ...prevState,
        activeTile1: null,
        activeTile2: null,
      };

    // Click on card
    if (prevState.activeTile2) return prevState;

    const [y, x] = action.value;
    const clickedCardIdx = distribution.board[y][x];
    if (clickedCardIdx === null) return prevState;
    if (prevState.foundPairs[clickedCardIdx]) return prevState;
    if (!prevState.activeTile1) {
      return {
        ...prevState,
        activeTile1: [y, x],
      };
    }
    if (y === prevState.activeTile1[0] && x === prevState.activeTile1[1])
      return prevState;
    const activeValueIdx =
      distribution.board[prevState.activeTile1[0]][prevState.activeTile1[1]];
    if (distribution.board[y][x] === activeValueIdx)
      return {
        attempts: prevState.attempts + 1,
        activeTile1: null,
        activeTile2: null,
        foundPairs: prevState.foundPairs.map(
          (isRevealed, valueIdx) => isRevealed || valueIdx === activeValueIdx,
        ),
      };
    setTimeout(() => gameReducer({ type: Actions.ClearActive }), 300);
    return {
      ...prevState,
      attempts: prevState.attempts + 1,
      activeTile2: [y, x],
    };
  }, initialGameState(nbPairs));

  if (!distribution) return <Spin />;
  return (
    <div>
      <Typography.Title>Play</Typography.Title>
      <Button onClick={() => setContext({ ...context, config: true })}>
        Reconfigure
      </Button>
      <Button
        style={{ marginLeft: '15px' }}
        onClick={() => {
          setSeed(Math.random());
          gameReducer({ type: Actions.Reset });
        }}
      >
        New game
      </Button>
      <Button
        style={{ marginLeft: '15px' }}
        onClick={() => gameReducer({ type: Actions.Reset })}
      >
        Restart this game
      </Button>
      {gameState.foundPairs.every(isFound => isFound) ? (
        <Alert
          style={{ marginTop: '5px' }}
          type="success"
          message={
            <>
              You won in {gameState.attempts} attempts.{' '}
              <a
                onClick={() => {
                  setSeed(Math.random());
                  gameReducer({ type: Actions.Reset });
                }}
              >
                New game?
              </a>
            </>
          }
        />
      ) : (
        <Alert
          style={{ marginTop: '5px' }}
          type="info"
          message={'Attempts: ' + gameState.attempts}
        />
      )}
      <div style={{ marginTop: '10px' }}>
        {_.range(size).map(y => (
          <Row key={`${y}`}>
            {_.range(context.size).map(x => {
              const pairIdx = distribution.board[y][x];
              if (pairIdx === null)
                return <BlankCard key={x} cardWidth={cardWidth} />;
              const active = !!(
                (gameState.activeTile1 &&
                  y === gameState.activeTile1[0] &&
                  x === gameState.activeTile1[1]) ||
                (gameState.activeTile2 &&
                  y === gameState.activeTile2[0] &&
                  x === gameState.activeTile2[1])
              );
              const onClick = () =>
                gameReducer({ type: Actions.Click, value: [y, x] });
              return cardType === CardTypes.Color ? (
                <CardColor
                  key={x}
                  cardWidth={cardWidth}
                  active={active}
                  found={gameState.foundPairs[pairIdx]}
                  pairIdx={pairIdx}
                  nbPairs={nbPairs}
                  onClick={onClick}
                />
              ) : (
                <CardImage
                  key={x}
                  cardWidth={cardWidth}
                  active={active}
                  found={gameState.foundPairs[pairIdx]}
                  onClick={onClick}
                  url={distribution.cardValues[pairIdx].toString()}
                />
              );
            })}
          </Row>
        ))}
      </div>
      {// For images to be loaded before the cards are clicked
      cardType === CardTypes.Image && (
        <div style={{ display: 'none' }}>
          {(distribution.cardValues as string[]).map(url => (
            <img src={url} alt="" key={url} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Game;
