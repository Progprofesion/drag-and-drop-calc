import { ReactNode, useEffect } from "react";
import { useGetDropDbQuery } from "../api/apiSlice";
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from 'src/store/index';
import { setDropState } from "src/store/reducer/dropStore";
import { setOperation } from "src/store/reducer/calcStore";

import useDrop from 'src/hooks/useDrop';
import useElementHandler from 'src/hooks/useElementHandler';
import useStartOverLeaveEnd from "src/hooks/useStartOverLeaveEnd";
import useDelete from "src/hooks/useDelete";
import useCalc from "src/hooks/useCalc";


import './palette.scss';

type Tboard = {
    id: number
    items: []
    preventDefault: () => void
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
}


const Pallete = () => {

    const {
        data = [],
        isSuccess
    } = useGetDropDbQuery(null);

    const dispatch = useDispatch();
    const dropState = useSelector((state: RootState) => state.dropStore.dropState);
    const calcResult = useSelector((state: RootState) => state.calcStore.calcResult);
    const firstNumbers = useSelector((state: RootState) => state.calcStore.firstNumbers);
    const secondNumbers = useSelector((state: RootState) => state.calcStore.secondNumbers);

    const dataClone = JSON.parse(JSON.stringify(dropState))

    useEffect(() => {
        dispatch(setDropState(data))
        // eslint-disable-next-line
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

    const { handleInputNumber, handleCalculate, arrNumbers } = useCalc();


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
                                    value={calcResult ? calcResult : 0 || secondNumbers !== "" ? secondNumbers : 0 || firstNumbers !== "" ? firstNumbers : 0}
                                    onChange={(e) => handleInputNumber(e)}
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
                                    {(item.operations as []).map(((item: Titem) =>
                                        <button
                                            onClick={(e: React.MouseEvent) => {
                                                dispatch(setOperation((e.target as HTMLTextAreaElement).value))
                                                arrNumbers()
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
                                    {(item.numbers as []).map((item: Titem) =>
                                        <button
                                            onClick={(e: React.MouseEvent) => handleInputNumber((e.target as HTMLTextAreaElement).value as string)}
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

