import { useState } from "react";
// import { useSelector, useDispatch } from "react-redux";

// import Canvas from '../canvas/Canvas';

// import { RootState } from "@/store";

// import { setDb, setCurrenBoard, setCurrentItem } from "../../store/reducer/reducerDb";

import './palette.scss';
import '../canvas/canvas.scss';

import './board.scss';

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
    ]) as any;

    const [currentBoard, setCurrenBoard] = useState(null) as any
    const [currentItem, setCurrentItem] = useState(null) as any
    const [disabled, setDisabled] = useState(false) as any

    const dragOverHandler: any = (e: any, board: any) => {
        e.preventDefault();
        if (board && board.id === 2) {
            if (e.target.className === "pallete__display") {
                e.target.style.borderTop = "10px solid #5D5FEF"
            }
            if (e.target.className === "pallete__operations") {
                e.target.style.borderTop = "10px solid #5D5FEF"
            }
            if (e.target.className === "pallete__dial") {
                e.target.style.borderTop = "10px solid #5D5FEF"
            }
            if (e.target.className === "pallete__equally") {
                e.target.style.borderTop = "10px solid #5D5FEF"
            }
        }

    }
    const dragLeaveHandlear: any = (e: any) => {
        e.target.style.borderTop = "none"
    }
    const dragStartHandler: any = (e: any, board: any, item: any) => {
        setCurrenBoard(board)
        setCurrentItem(item)
    }

    const dragEndHandler: any = (e: any, board: any) => {
        if (board.id === 1 && disabled) {
            e.target.style.opacity = "50%"
            e.target.draggable = false
            e.target.style.cursor = "not-allowed"
            e.target.style.boxShadow = "none"
            e.target.firstChild.style.cursor = "not-allowed"
            e.target.querySelectorAll('.pallete__operations-buttons').forEach((node: any) => {
                node.style.cursor = "not-allowed"
            })
            e.target.querySelectorAll('.pallete__dial-button').forEach((node: any) => node.style.cursor = "not-allowed")
            setDisabled(false)
        }
        e.target.childNodes.forEach((child: any) => {
            child.style.boxShadow = "none"
        })

        e.target.childNodes.forEach((child: any) => {
            child.style.boxShadow = "none"
        })
    }

    const dropHandler: any = (e: any, board: any, item: any) => {
        e.preventDefault();
        e.stopPropagation();
        // e.target.style.background = "aliceblue"
        if (currentBoard.id === 1) {
            const currentIndex = currentBoard.items.indexOf(currentItem)
            currentBoard.items.splice(currentIndex, 0, 1)
            // запрет на перетаскивание элементов в 1 доску
            if (board.id === 2) {
                const dropIndex = board.items.indexOf(item)
                board.items.splice(dropIndex, 0, currentItem)
                // флаг для работы перетаскивания, при наведении на айтем во второй доске board.id === 2.
                setDisabled(true)
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
        }

        if (currentBoard.id === 2 && board.id === 2) {
            const currentIndex = currentBoard.items.indexOf(currentItem)
            currentBoard.items.splice(currentIndex, 1, 1)
            const dropIndex = board.items.indexOf(item)
            board.items.splice(dropIndex, 0, currentItem)
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
        e.target.style.borderTop = "none"
    }



    const dropElementHandler = (e: any, board: any, item: any) => {
        e.preventDefault();
        e.stopPropagation();
        // console.log(e.target.firstChild)
        setTimeout(() => {
            e.target.lastChild.style.boxShadow = "none"
        }, 0)
        // e.target.childNodes.forEach((item: any) => {
        //     if (item) {
        //         item.style.boxShadow = "none"
        //     }
        // })
        // e.target.previousSibling.firstChild.style.background = "red"
        // e.target.style.background = "red"
        if (currentBoard.id === 1) {
            setDisabled(false)
        }
        // флаг для работы перетаскивания, только в доску для перетаскивания board.id === 2.
        if (board.id === 2) {
            setDisabled(true)
        }
        if (board.id === 2) {
            board.items.push(currentItem)
        }
        if (currentBoard.id === 2 && board.id === 2) {
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

    const doubleClickHandler = (e: any, board: any, item: any) => {
        e.preventDefault()
        if (board.id === 2) {
            const currentIndex = board.items.indexOf(item)
            board.items.splice(currentIndex, 1, 1)
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

    const elements: any = boards.map((board: any) => {
        return <div
            onDragOver={(e) => dragOverHandler(e)}
            onDrop={(e) => dropElementHandler(e, board, board.item)}
            key={board.id}
            className="boardTest">
            {
                board.items.map((item: any) => {
                    switch (item.type) {
                        case 'input':
                            return <div
                                onDoubleClick={(e) => doubleClickHandler(e, board, item)}
                                onDragOver={(e) => dragOverHandler(e, board)}
                                onDragLeave={e => dragLeaveHandlear(e)}
                                onDragStart={(e) => dragStartHandler(e, board, item)}
                                onDragEnd={(e) => dragEndHandler(e, board)}
                                onDrop={(e) => dropHandler(e, board, item)}
                                draggable={true}
                                key={item.id}
                                className="pallete__display">
                                <input
                                    placeholder="0"
                                    type="tel"
                                    className="pallete__display-input" />
                            </div>;
                        case 'operations':
                            return <div
                                onDoubleClick={(e) => doubleClickHandler(e, board, item)}
                                onDragOver={(e) => dragOverHandler(e, board)}
                                onDragLeave={e => dragLeaveHandlear(e)}
                                onDragStart={(e) => dragStartHandler(e, board, item)}
                                onDragEnd={(e) => dragEndHandler(e, board)}
                                onDrop={(e) => dropHandler(e, board, item)}
                                draggable={true}
                                key={item.id}
                                className="pallete__operations">
                                <div
                                    className="pallete__operations-wrapp">
                                    {item.operations?.map(((item: any) =>
                                        <button
                                            key={item.titleOperations}
                                            className="pallete__operations-buttons">{item.titleOperations}</button>
                                    ))}
                                </div>
                            </div>
                        case 'dial':
                            return <div
                                onDoubleClick={(e) => doubleClickHandler(e, board, item)}
                                onDragOver={(e) => dragOverHandler(e, board)}
                                onDragLeave={e => dragLeaveHandlear(e)}
                                onDragStart={(e) => dragStartHandler(e, board, item)}
                                onDragEnd={(e) => dragEndHandler(e, board)}
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
                                onDoubleClick={(e) => doubleClickHandler(e, board, item)}
                                onDragOver={(e) => dragOverHandler(e, board)}
                                onDragLeave={e => dragLeaveHandlear(e)}
                                onDragStart={(e) => dragStartHandler(e, board, item)}
                                onDragEnd={(e) => dragEndHandler(e, board)}
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