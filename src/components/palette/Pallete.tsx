import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import Canvas from '../canvas/Canvas';

import { RootState } from "@/store";

import { setDb, setCurrenBoard, setCurrentItem } from "../../store/reducer/reducerDb";

import './palette.scss';
import '../canvas/canvas.scss';

const Pallete = () => {

    const stateDb = useSelector((state: RootState) => state.reducerDb.stateDb);
    const currentBoard = useSelector((state: RootState) => state.reducerDb.currentBoard);
    const currentItem = useSelector((state: RootState) => state.reducerDb.currentItem);

    let cloneDb = JSON.parse(JSON.stringify(stateDb))
    // console.log(cloneDb)

    const dispatch = useDispatch()

    const dragOverHandler: any = (e: any) => {
        e.preventDefault();
        if (e.target.className === "pallete__display") {
            e.target.style.borderBottom = "10px solid #5D5FEF"
        }
        if (e.target.className === "pallete__operations") {
            e.target.style.borderBottom = "10px solid #5D5FEF"
        }
        if (e.target.className === "pallete__dial") {
            e.target.style.borderBottom = "10px solid #5D5FEF"
        }
        if (e.target.className === "pallete__equally") {
            e.target.style.borderBottom = "10px solid #5D5FEF"
        }
    }
    const dragLeaveHandlear: any = (e: any) => {
        e.target.style.borderBottom = "none"
    }
    const dragStartHandler: any = (e: any, board: any, item: any) => {
        dispatch(setCurrenBoard(board))
        dispatch(setCurrentItem(item))
    }
    const dragEndHandler: any = (e: any) => {
        e.target.style.borderBottom = "none"
        e.target.style.opacity = "50%"
    }
    const dropHandler: any = (e: any, board: any, item: never) => {
        e.preventDefault();
        e.target.style.borderBottom = "none"
        if (board.id === 2) {
            let set = new Set() as any;

            let john = { name: "John" };
            let pete = { name: "Pete" };
            let mary = { name: "Mary" };

            // считаем гостей, некоторые приходят несколько раз
            set.add(john);
            set.add(pete);
            set.add(mary);
            set.add(john);
            set.add(mary);
            set.add(currentItem)
            for (let user of set) {
                console.log(user); // John (потом Pete и Mary)
                // console.log(board.items[0])
            }

            // if (!set.has(item)) {
            const dropIndex = board.items.indexOf(item)
            board.items.splice(dropIndex, 0, currentItem + 1)
            dispatch(setDb(cloneDb.map((b: any) => {
                if (b.id === board.id) {
                    return board
                }
                if (b.id === currentBoard.id) {
                    return currentBoard
                }
                return b
            })))
            console.log(item)
            // }


        };

        if (e.target.className === "boardTest") {
            e.target.style.display = "none"
            e.target.style.zIndex = "-1"
        }


    }
    const doubleClickHandler = (e: any, board: any) => {
        e.preventDefault()
        let testCurrent = currentBoard.items.slice()
        const currentIndex = testCurrent.indexOf(currentItem)
        testCurrent.splice(currentIndex, 1)

    }

    const dropElementHandler = (e: any, board: any) => {

        if (board.id === 2) {
            board.items.push(currentItem)
            dispatch(setDb(cloneDb.map((b: any) => {
                if (b.id === board.id) {
                    return board
                }
                if (b.id === currentBoard.id) {
                    return currentBoard
                }
                return b
            })))
        }

        if (e.target.className === "boardTest") {
            e.target.style.border = "none"
        }
    }


    const elements: any = cloneDb.map((board: any) => {
        return <div
            onDragOver={(e) => dragOverHandler(e)}
            onDrop={(e) => dropElementHandler(e, board)}
            key={board.id}
            className="boardTest">
            {
                board.items.map((item: any) => {
                    switch (item.type) {
                        case 'input':
                            return <div
                                onDoubleClick={(e) => doubleClickHandler(e, board)}
                                onDragOver={(e) => dragOverHandler(e)}
                                onDragLeave={e => dragLeaveHandlear(e)}
                                onDragStart={(e) => dragStartHandler(e, board, item)}
                                onDragEnd={(e) => dragEndHandler(e)}
                                onDrop={(e) => dropHandler(e, board, item)}
                                draggable={true}
                                key={item.id}
                                className="pallete__display">
                                <input placeholder="0" type="text" className="pallete__display-input" />
                            </div>;
                        case 'operations':
                            return <div
                                onDoubleClick={(e) => doubleClickHandler(e, board)}
                                onDragOver={(e) => dragOverHandler(e)}
                                onDragLeave={e => dragLeaveHandlear(e)}
                                onDragStart={(e) => dragStartHandler(e, board, item)}
                                onDragEnd={(e) => dragEndHandler(e)}
                                onDrop={(e) => dropHandler(e, board, item)}
                                draggable={true}
                                key={item.id}
                                className="pallete__operations">
                                <div className="pallete__operations-wrapp">
                                    {item.operations?.map(((item: any) =>
                                        <button
                                            key={item.titleOperations}
                                            className="pallete__operations-buttons">{item.titleOperations}</button>
                                    ))}
                                </div>
                            </div>
                        case 'dial':
                            return <div
                                onDoubleClick={(e) => doubleClickHandler(e, board)}
                                onDragOver={(e) => dragOverHandler(e)}
                                onDragLeave={e => dragLeaveHandlear(e)}
                                onDragStart={(e) => dragStartHandler(e, board, item)}
                                onDragEnd={(e) => dragEndHandler(e)}
                                onDrop={(e) => dropHandler(e, board, item)}
                                draggable={true}
                                key={item.id}
                                className="pallete__dial">
                                <div className="pallete__dial-wrapp">
                                    {item.numbers?.map((item: any) =>
                                        <button
                                            key={item.titleNumbers}
                                            className="pallete__dial-button">{item.titleNumbers}</button>
                                    )}
                                </div>
                            </div>
                        case 'equally':
                            return <div
                                onDoubleClick={(e) => doubleClickHandler(e, board)}
                                onDragOver={(e) => dragOverHandler(e)}
                                onDragLeave={e => dragLeaveHandlear(e)}
                                onDragStart={(e) => dragStartHandler(e, board, item)}
                                onDragEnd={(e) => dragEndHandler(e)}
                                onDrop={(e) => dropHandler(e, board, item)}
                                draggable={true}
                                key={item.id}
                                className="pallete__equally">
                                <div className="pallete__equally-wrapp">{item.titleEqually}</div>
                            </div>
                        default:
                            return null;
                    }
                }
                )}
        </div>

    });


    return (

        <section className="pallet">
            <div className="pallete__wrapp">
                {elements}
            </div>
        </section>
    )
}

export default Pallete