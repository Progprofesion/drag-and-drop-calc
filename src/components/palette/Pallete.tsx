import { useState } from "react";
// import { useSelector, useDispatch } from "react-redux";

// import Canvas from '../canvas/Canvas';

// import { RootState } from "@/store";

// import { setDb, setCurrenBoard, setCurrentItem } from "../../store/reducer/reducerDb";

import './palette.scss';
import '../canvas/canvas.scss';

import './board.scss';
import { boolean } from "yargs";

const Pallete = () => {

    const [boards, setBoards] = useState([
        {
            id: 1, title: "первый", items: [
                { id: 1, title: "первый-первый", type: "input" },
                { id: 2, title: "первый-второй", type: "operations", operations: [{ titleOperations: "/" }, { titleOperations: "x" }, { titleOperations: "-" }, { titleOperations: "+" }] },
                { id: 3, title: "первый-третий", type: "dial", numbers: [{ titleNumbers: "7" }, { titleNumbers: "8" }, { titleNumbers: "9" }, { titleNumbers: "4" }, { titleNumbers: "5" }, { titleNumbers: "6" }, { titleNumbers: "1" }, { titleNumbers: "2" }, { titleNumbers: "3" }, { titleNumbers: "0" }, { titleNumbers: "," }] },
                { id: 4, title: "первый-четвертый", type: "equally", titleEqually: "=" }]
        },
        { id: 2, title: "второй", items: [] }
    ]);

    const [currentBoard, setCurrenBoard] = useState(null) as any
    const [currentItem, setCurrentItem] = useState(null) as any

    const [disabled, setDisabled] = useState(true);

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
        setCurrenBoard(board)
        setCurrentItem(item)
    }
    const dragEndHandler: any = (e: any, board: any) => {
        e.target.style.borderBottom = "none"
        if (board.id === 1) {
            e.target.style.opacity = "50%"

        }
    }
    const dropHandler: any = (e: any, board: any, item: any) => {
        e.preventDefault();
        e.stopPropagation();
        setDisabled(false)
        if (board.id === 2) {
            const currentIndex = currentBoard.items.indexOf(currentItem)
            currentBoard.items.splice(currentIndex, 1)
            const dropIndex = board.items.indexOf(item)
            board.items.splice(dropIndex + 1, 0, currentItem)
            setBoards(boards.map((b: any) => {
                if (b.id === board.id) {
                    return board
                }
                if (b.id === currentBoard.id) {
                    return currentBoard
                }
                return b
            }))
        }
        e.target.style.borderBottom = "none"

    }
    const doubleClickHandler = (e: any, board: any) => {
        e.preventDefault()

        if (board.id === 2) {
            const currentIndex = board.items.indexOf(currentItem)
            board.items.splice(currentIndex, 1)
            board.items.push(currentItem)
            console.log(currentItem)
            setBoards(boards.map((b: any) => {
                if (b.id === board.id) {
                    return board
                }
                if (b.id === currentBoard.id) {
                    return currentBoard
                }
                return b
            }))
        }
    }

    const dropElementHandler = (e: any, board: any) => {
        e.preventDefault();
        e.stopPropagation();
        board.items.push(currentItem)
        console.log(disabled)
        if (board.id === currentBoard.id) {
            const currentIndex = currentBoard.items.indexOf(currentItem)
            currentBoard.items.splice(currentIndex, 1)
        }

        setBoards(boards.map((b: any) => {
            if (b.id === board.id) {
                return board
            }
            if (b.id === currentBoard.id) {
                return currentBoard
            }
            return b
        }))
        e.target.style.borderBottom = "none"
        if (e.target.className === "boardTest") {
            e.target.style.border = "none"
            e.target.style.zIndex = "1"
        }

    }

    const elements: any = boards.map((board: any) => {
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
                                onDragEnd={(e) => dragEndHandler(e, board)}
                                onDrop={(e) => dropHandler(e, board, item)}
                                draggable={disabled}
                                key={item.id}
                                className="pallete__display">
                                <input disabled={true} placeholder="0" type="tel" className="pallete__display-input" />
                            </div>;
                        case 'operations':
                            return <div
                                onDoubleClick={(e) => doubleClickHandler(e, board)}
                                onDragOver={(e) => dragOverHandler(e)}
                                onDragLeave={e => dragLeaveHandlear(e)}
                                onDragStart={(e) => dragStartHandler(e, board, item)}
                                onDragEnd={(e) => dragEndHandler(e, board)}
                                onDrop={(e) => dropHandler(e, board, item)}
                                draggable={disabled}
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
                                onDragEnd={(e) => dragEndHandler(e, board)}
                                onDrop={(e) => dropHandler(e, board, item)}
                                draggable={disabled}
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
                                onDragEnd={(e) => dragEndHandler(e, board)}
                                onDrop={(e) => dropHandler(e, board, item)}
                                draggable={disabled}
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