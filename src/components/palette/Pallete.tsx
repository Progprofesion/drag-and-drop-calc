import { ReactNode, useEffect, useState } from "react";
import { useGetDropDbQuery } from "../api/apiSlice";
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from 'src/store/index';
import { setDropState, setHugState } from "src/store/reducer/dropStore";
// import { setCalckState } from "src/store/reducer/calcStore";

import useDrop from 'src/hooks/useDrop';
import useElementHandler from 'src/hooks/useElementHandler';
import useStartOverLeaveEnd from "src/hooks/useStartOverLeaveEnd";
import useDelete from "src/hooks/useDelete";


import './palette.scss';

type Tboard = {
    id: number
    items: []
    preventDefault: () => void
    target: any
}

type Titem = {
    type: string
    item: {}
    id: number
    operations: {}
    numbers: {}
    titleEqually: string
    titleOperations: string
    titleNumbers: string
    map: (Item: {}) => any
}


const Pallete = () => {

    const {
        data = [],
        isSuccess
    } = useGetDropDbQuery(null);

    const [result, setResult] = useState(0);
    const [operation, setOperation] = useState('');
    const [firstNumber, setFirstNumber] = useState('');
    const [secondNumber, setSecondNumber] = useState('');
    const [flag, setFlag] = useState(false);

    const dispatch = useDispatch();
    const dropState = useSelector((state: RootState) => state.dropStore.dropState);
    const dataClone = JSON.parse(JSON.stringify(dropState))

    useEffect(() => {
        dispatch(setDropState(data))
        setFlag(true)
    }, [isSuccess])


    const { dropHandler } = useDrop();
    const { dropElementHandler } = useElementHandler();
    const { doubleClickHandler } = useDelete();
    const {
        dragStartHandler,
        dragOverHandler,
        dragLeaveHandlear,
        dragEndHandler
    } = useStartOverLeaveEnd();

    const handleInputNumber = (e: any) => {
        if (operation) {
            setSecondNumber(e);
            setResult(null as any);
            console.log(secondNumber, "second number");
        } else if (!operation) {
            setFirstNumber(e);
            setResult(null as any);
            setFlag(true)
            console.log(firstNumber, "first number");
        }
    };

    const handleCalculate = () => {
        let result;

        switch (operation) {
            case '+':
                result = parseFloat(firstNumber) + parseFloat(secondNumber);
                break;
            case '-':
                result = parseFloat(firstNumber) - parseFloat(secondNumber);
                break;
            case 'x':
                result = parseFloat(firstNumber) * parseFloat(secondNumber);
                break;
            case '/':
                result = parseFloat(firstNumber) / parseFloat(secondNumber);
                break;
            default:
                result = 0;
        }

        setResult(result.toFixed(2) as any);
        setOperation("")
        setSecondNumber("")
    };

    // const vision = () => {


    //     if (firstNumber) {
    //         return firstNumber
    //     } else if (secondNumber) {
    //         return secondNumber
    //     } else if (result) {
    //         return result
    //     }


    // }
    // firstNumber ? firstNumber : "" || secondNumber ? secondNumber : "" || result ? result : ""

    const elements: ReactNode = dataClone.map((board: Tboard) => {
        return <div
            onDragOver={(e) => dragOverHandler(e, board)}
            onDrop={(e) => dropElementHandler(e, board)}
            onDragLeave={e => dragLeaveHandlear(e, board)}
            key={board.id}
            className="pallete__wrapp">
            {
                board.items.map((item: Titem) => {
                    switch (item.type) {
                        case 'input':
                            return <div
                                onDoubleClick={(e) => doubleClickHandler(e, board, item)}
                                onDragOver={(e) => dragOverHandler(e, board)}
                                onDragLeave={e => dragLeaveHandlear(e, board)}
                                onDragStart={(e) => dragStartHandler(e, board, item)}
                                onDragEnd={(e) => dragEndHandler(e, board, item)}
                                onDrop={(e) => dropHandler(e, board, item)}
                                draggable={true}
                                key={item.id}
                                className="pallete__display">
                                <span className="pallete__span">
                                    <div></div>
                                    <div></div>
                                </span>
                                <input
                                    value={result ? result : 0 || secondNumber ? secondNumber : 0 || firstNumber ? firstNumber : 0}
                                    onChange={handleInputNumber}
                                    lang="16"
                                    placeholder="0"
                                    type="tel"
                                    className="pallete__display-input" />
                            </div>;
                        case 'operations':
                            return <div
                                onDoubleClick={(e) => doubleClickHandler(e, board, item)}
                                onDragOver={(e) => dragOverHandler(e, board)}
                                onDragLeave={e => dragLeaveHandlear(e, board)}
                                onDragStart={(e) => dragStartHandler(e, board, item)}
                                onDragEnd={(e) => dragEndHandler(e, board, item)}
                                onDrop={(e) => dropHandler(e, board, item)}
                                draggable={true}
                                key={item.id}
                                className="pallete__operations">
                                <span className="pallete__span">
                                    <div></div>
                                    <div></div>
                                </span>
                                <div
                                    className="pallete__operations-wrapp">
                                    {(item.operations as Titem).map(((item: Titem) =>
                                        <button
                                            onClick={(e: any) => {
                                                setOperation(e.target.value)

                                            }}
                                            value={item.titleOperations}
                                            key={item.titleOperations}
                                            className="pallete__operations-buttons">{item.titleOperations}</button>
                                    ))}
                                </div>
                            </div>
                        case 'dial':
                            return <div
                                onDoubleClick={(e) => doubleClickHandler(e, board, item)}
                                onDragOver={(e) => dragOverHandler(e, board)}
                                onDragLeave={e => dragLeaveHandlear(e, board)}
                                onDragStart={(e) => dragStartHandler(e, board, item)}
                                onDragEnd={(e) => dragEndHandler(e, board, item)}
                                onDrop={(e) => dropHandler(e, board, item)}
                                draggable={true}
                                key={item.id}
                                className="pallete__dial">
                                <span className="pallete__span">
                                    <div></div>
                                    <div></div>
                                </span>
                                <div className="pallete__dial-wrapp">
                                    {(item.numbers as Titem).map((item: Titem) =>
                                        <button
                                            onClick={(e: any) => {
                                                handleInputNumber(e.target.value)
                                            }}
                                            value={item.titleNumbers}
                                            key={item.titleNumbers}
                                            className="pallete__dial-button">{item.titleNumbers}</button>
                                    )}
                                </div>
                            </div>
                        case 'equally':
                            return <div
                                onDoubleClick={(e) => doubleClickHandler(e, board, item)}
                                onDragOver={(e) => dragOverHandler(e, board)}
                                onDragLeave={e => dragLeaveHandlear(e, board)}
                                onDragStart={(e) => dragStartHandler(e, board, item)}
                                onDragEnd={(e) => dragEndHandler(e, board, item)}
                                onDrop={(e) => dropHandler(e, board, item)}
                                draggable={true}
                                key={item.id}
                                className="pallete__equally">
                                <span className="pallete__span">
                                    <div></div>
                                    <div></div>
                                </span>
                                <button
                                    onClick={() => handleCalculate()}
                                    className="pallete__equally-wrapp">{item.titleEqually}</button>
                            </div>
                        default:
                            return null;
                    }
                }
                )}
        </div>

    });


    return (

        <section className="pallete">
            {elements}
        </section>
    )
}

export default Pallete

