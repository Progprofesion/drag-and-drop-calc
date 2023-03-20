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
            id: 1, title: "board1", items: [
                { id: 1, title: "input", type: "input" },
                { id: 2, title: "operations", type: "operations", operations: [{ titleOperations: "/" }, { titleOperations: "x" }, { titleOperations: "-" }, { titleOperations: "+" }] },
                { id: 3, title: "dial", type: "dial", numbers: [{ titleNumbers: "7" }, { titleNumbers: "8" }, { titleNumbers: "9" }, { titleNumbers: "4" }, { titleNumbers: "5" }, { titleNumbers: "6" }, { titleNumbers: "1" }, { titleNumbers: "2" }, { titleNumbers: "3" }, { titleNumbers: "0" }, { titleNumbers: "," }] },
                { id: 4, title: "equally", type: "equally", titleEqually: "=" }]
        },
        { id: 2, title: "board2", items: [] }
    ]) as any;

    const boardTest = document.querySelector(".boardTest")

    const [currentBoard, setCurrenBoard] = useState(null) as any
    const [currentItem, setCurrentItem] = useState(null) as any
    const [disabled, setDisabled] = useState(false) as any
    const [disabledBoard, setDisabledBoard] = useState(true) as any

    const dragOverHandler: any = (e: any, board: any) => {
        e.preventDefault();
        if (board && board.id === 2) {
            if (e.target.className === "pallete__operations") {
                e.target.style.borderTop = "10px solid #5D5FEF"
            }
            if (e.target.className === "pallete__dial") {
                e.target.style.borderTop = "10px solid #5D5FEF"
            }
            if (e.target.className === "pallete__equally") {
                e.target.style.borderTop = "10px solid #5D5FEF"
            }
            // для смены высоты 
        }

    }
    const dragLeaveHandlear: any = (e: any, board: any) => {
        e.target.style.borderTop = "none"
        // при наведении саму на себя или на элементы багаеться.
        if (board.id === 1) {
            e.target.parentNode.style.zIndex = "-1"
        }
        if (board.id === 2) {
            // e.target.parentNode.style.zIndex = "1"
        }
    }
    const dragStartHandler: any = (e: any, board: any, item: any) => {
        setCurrenBoard(board)
        setCurrentItem(item)

        // if (board.id === 1) {
        //     e.target.parentNode.style.zIndex = "-1"
        // }
        // if (board.id === 2) {

        //     e.target.parentNode.style.zIndex = "-1"
        // }

    }

    const dragEndHandler: any = (e: any, board: any) => {
        if (board.id === 1 && disabled) {
            e.target.style.opacity = "50%"
            e.target.draggable = false
            e.target.style.cursor = "not-allowed"
            e.target.style.boxShadow = "none"
            e.target.querySelectorAll('.pallete__display-input').forEach((node: any) => {
                node.style.cursor = "not-allowed"
            })
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
        if (board.id === 1) {
            e.target.parentNode.style.zIndex = "1"
        }
        console.log(e.target)
    }

    const dropHandler: any = (e: any, board: any, item: any) => {
        e.preventDefault();
        e.stopPropagation();
        if (currentBoard.id === 1) {
            const currentIndex = currentBoard.items.indexOf(currentItem)
            currentBoard.items.splice(currentIndex, 0, 1)
            // запрет на перетаскивание элементов в 1 доску
            if (board.id === 2) {
                const dropIndex = board.items.indexOf(item)
                board.items.splice(dropIndex, 0, currentItem)
                setTimeout(() => {
                    if (e.target.previousSibling) {
                        // console.log(e.target.parentNode)
                        // возможно поможет для запрета наведения на инпут
                        // исправиитт при перетаскивании на инпут нет стилей ???????????
                        // setDisabledBoard(true)
                        e.target.previousSibling.style.boxShadow = "none"
                    }

                }, 0)

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

        if (currentBoard.id === 2 && board.id === 2 && currentItem.id !== 1) {
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



    const dropElementHandler = (e: any, board: any) => {
        e.preventDefault();
        e.stopPropagation();
        const dial = e.target.querySelector(".pallete__dial")
        e.target.previousSibling.style.zIndex = "1"
        if (currentBoard.id === 1) {
            setDisabled(false)
        }
        // флаг для работы перетаскивания, только в доску для перетаскивания board.id === 2.
        if (board.id === 2) {

            // e.target.
            // if (dial) {
            setTimeout(() => {
                // console.log(dial)
                if (dial) {
                    dial.style.height = "237px"
                    dial.style.marginTop = "0px"
                    dial.style.paddingTop = "12px"
                }
                e.target.style.boxShadow = "none"
                e.target.childNodes.forEach((item: any) => {
                    item.style.boxShadow = "none"
                })
            }, 0)
            // }


            setDisabled(true)
        }
        if (board.id === 2) {
            if (currentItem.id === 1) {
                board.items.unshift(currentItem)
                setTimeout(() => {
                    e.target.firstChild.firstChild.style.cursor = "not-allowed"
                    // e.target.firstChild.style.zIndex = "-1"
                    e.target.firstChild.style.cursor = "not-allowed"
                    e.target.firstChild.draggable = false

                }, 0)
            }
            if (currentItem.id !== 1) {
                board.items.push(currentItem)
                // const currentIndex = currentBoard.items.indexOf(currentItem)
                // board.items.splice(currentIndex, 0, currentItem)
            }
        }
        // отмена копирования элементов в второй доске
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

    const onDownHandler = (e: any, board: any) => {
        if (disabledBoard) {
            // if (board && board.id === 1) {
            // e.target.parentNode.style.zIndex = "-1"
            // setDisabledBoard(true)
        }
        // if (boards.id) {
        if (currentBoard && board.id === 1) {
            // e.target.parentNode.style.zIndex = "-1"
            // setDisabledBoard(true)
        }

        // if (currentBoard && board.id === 2) {
        //     console.log(e.target)
        //     e.target.parentNode.style.zIndex = "-1"
        //     setDisabledBoard(true)
        // }

        // }
        // console.log(e.target)
        // }
    }

    const onUpHandler = (e: any) => {
        // console.log(disabled)
        // e.target.parentNode.style.zIndex = "1"
    }

    const onClickHandler = (e: any) => {
        // console.log(e.target)
        // e.target.parentNode.style.zIndex = "1"
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
                                onClick={(e: any) => onClickHandler(e)}
                                onMouseDown={(e) => onDownHandler(e, board)}
                                onMouseUp={(e) => onUpHandler(e)}
                                onDoubleClick={(e) => doubleClickHandler(e, board, item)}
                                onDragOver={(e) => dragOverHandler(e, board)}
                                onDragLeave={e => dragLeaveHandlear(e, board)}
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
                                onClick={(e: any) => onClickHandler(e)}
                                onMouseDown={(e) => onDownHandler(e, board)}
                                onMouseUp={(e) => onUpHandler(e)}
                                onDoubleClick={(e) => doubleClickHandler(e, board, item)}
                                onDragOver={(e) => dragOverHandler(e, board)}
                                onDragLeave={e => dragLeaveHandlear(e, board)}
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
                                onClick={(e: any) => onClickHandler(e)}
                                onMouseDown={(e) => onDownHandler(e, board)}
                                onMouseUp={(e) => onUpHandler(e)}
                                onDoubleClick={(e) => doubleClickHandler(e, board, item)}
                                onDragOver={(e) => dragOverHandler(e, board)}
                                onDragLeave={e => dragLeaveHandlear(e, board)}
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
                                onClick={(e: any) => onClickHandler(e)}
                                onMouseDown={(e) => onDownHandler(e, board)}
                                onMouseUp={(e) => onUpHandler(e)}
                                onDoubleClick={(e) => doubleClickHandler(e, board, item)}
                                onDragOver={(e) => dragOverHandler(e, board)}
                                onDragLeave={e => dragLeaveHandlear(e, board)}
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