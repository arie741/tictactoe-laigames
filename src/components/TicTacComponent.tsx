import { setgid } from "process";
import { FC, useState } from "react";
import Tic from "./Tic";

interface Props {
  ai: boolean;
}

const TicTacComponent: FC<Props> = ({ ai }) => {
  const [gridState, setGridState] = useState<number[]>([
    0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]);
  const [currentTurn, setCurrentTurn] = useState<number>(1);
  const [finish, setFinish] = useState<[boolean, number]>([false, 0]);

  const resetHandle = ():void => {
    setCurrentTurn(1)
    setGridState([
        0, 0, 0, 0, 0, 0, 0, 0, 0,
      ])
    setFinish([false, 0])
  }

  const onClickHandle = (index: number): void => {
    if (finish[0]) {
      return;
    }
    let newGridState: number[] = [...gridState];
    newGridState[index] = currentTurn;

    if (!ai) {
      setCurrentTurn(currentTurn === 1 ? 2 : 1);
    }

    //AI Turn
    if (ai) {
      let available_grids: number[] = [];
      newGridState.map((item, index) => {
        if (item === 0) {
          available_grids.push(index);
        }
      });
      newGridState[
        available_grids[Math.floor(Math.random() * available_grids.length)]
      ] = 2;
      setGridState(newGridState);
    }
    //AI Turn - End

    setGridState(newGridState);

    //Win Conditions
    let win_condition_horizontal_1 = (turn: number): boolean =>
      newGridState[0] === turn &&
      newGridState[1] === turn &&
      newGridState[2] === turn;
    let win_condition_horizontal_2 = (turn: number): boolean =>
      newGridState[3] === turn &&
      newGridState[4] === turn &&
      newGridState[5] === turn;
    let win_condition_horizontal_3 = (turn: number): boolean =>
      newGridState[6] === turn &&
      newGridState[7] === turn &&
      newGridState[8] === turn;

    let win_condition_vertical_1 = (turn: number): boolean =>
      newGridState[0] === turn &&
      newGridState[3] === turn &&
      newGridState[6] === turn;
    let win_condition_vertical_2 = (turn: number): boolean =>
      newGridState[1] === turn &&
      newGridState[4] === turn &&
      newGridState[7] === turn;
    let win_condition_vertical_3 = (turn: number): boolean =>
      newGridState[2] === turn &&
      newGridState[5] === turn &&
      newGridState[8] === turn;

    let win_condition_diagonal_1 = (turn: number): boolean =>
      newGridState[0] === turn &&
      newGridState[4] === turn &&
      newGridState[8] === turn;
    let win_condition_diagonal_2 = (turn: number): boolean =>
      newGridState[2] === turn &&
      newGridState[4] === turn &&
      newGridState[6] === turn;

    if (
      win_condition_horizontal_1(1) ||
      win_condition_horizontal_2(1) ||
      win_condition_horizontal_3(1) ||
      win_condition_vertical_1(1) ||
      win_condition_vertical_2(1) ||
      win_condition_vertical_3(1) ||
      win_condition_diagonal_1(1) ||
      win_condition_diagonal_2(1)
    ) {
      setFinish([true, 1]);
      return;
    }

    if (
      win_condition_horizontal_1(2) ||
      win_condition_horizontal_2(2) ||
      win_condition_horizontal_3(2) ||
      win_condition_vertical_1(2) ||
      win_condition_vertical_2(2) ||
      win_condition_vertical_3(2) ||
      win_condition_diagonal_1(2) ||
      win_condition_diagonal_2(2)
    ) {
      setFinish([true, 2]);
      return;
    }
    //Win Conditions - End

    //Finish Conditions
    if (newGridState.filter((item) => item === 0).length === 0) {
        setFinish([true, 0]);
        return;
      }
    //Finish Conditions - End
  };

  const parse_winner = (winner: number): string => {
    switch (winner) {
      case 1:
        return "X";
        break;
      case 2:
        return "O";
        break;
      default:
        return "Nobody";
        break;
    }
  };

  return (
    <>
      <div className="row">
        <h1>{finish[0] ? parse_winner(finish[1]) + " Won" : ""}</h1>
      </div>
      <div className="row">
        {gridState.map((grid, index) => {
          return (
            <div key={index} className="col-4">
              <Tic index={index} onClickHandle={onClickHandle} tic={grid} />
            </div>
          );
        })}
      </div>
      <button className="btn btn-primary mx-auto block" onClick={() => resetHandle()}>Reset</button>
    </>
  );
};

export default TicTacComponent;
