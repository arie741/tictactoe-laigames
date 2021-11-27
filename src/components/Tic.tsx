import {FC, useState} from "react"

interface TicProps {
    tic: number | null
    index: number
    onClickHandle: (index: number) => void
}

const Tic:FC<TicProps> = ({tic, index, onClickHandle}):JSX.Element => {
    const ticOnClick = (index: number):void => {
        if(tic === 0){
            onClickHandle(index)
        }
    }

    const tic_content = () => {
        switch(tic){
            case 0:
                return "";
                break;
            case 1:
                return <img className="center" src="./img/x.jpg" alt="" width="90px" height="90px"/>
                break;
            case 2:
                return <img className="center" src="./img/o.png" alt="" width="90px" height="90px"/>
                break;
            default:
                return ""
                break;
        }
    }

    return (
        <div className={(tic === 0 ? "tic-open" : "tic-closed") + " tic"} onClick={() => ticOnClick(index)}>{tic_content()}</div>
        )
}

export default Tic;