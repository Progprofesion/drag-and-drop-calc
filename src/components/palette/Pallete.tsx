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

    const boardTest: any = document.querySelector(".boardTest")
    const display: any = document.querySelectorAll(".pallete__display")
    const operations: any = document.querySelectorAll(".pallete__operations")

    const [currentBoard, setCurrenBoard] = useState(null) as any
    const [currentItem, setCurrentItem] = useState(null) as any
    const [disabled, setDisabled] = useState(false) as any
    const [disabledShadow, setDisabledShadow] = useState(false) as any
    const [dragOverDisplay, setDragOverDisplay] = useState(false) as any
    const [styleDabl, setStyleDabl] = useState(false) as any
    // console.log(boards[1].items)

    const dragOverHandler: any = (e: any, board: any) => {
        e.preventDefault();
        if (board && board.id === 2) {
            if (e.target.className === "pallete__display") {
                setDragOverDisplay(true)
                e.target.firstChild.style.display = "block"
                e.target.firstChild.style.top = "unset"
                e.target.firstChild.style.bottom = "-6px"
            }
            if (e.target.className === "pallete__operations") {
                e.target.firstChild.style.display = "block"
                setDragOverDisplay(false)
            }
            if (e.target.className === "pallete__dial") {
                e.target.firstChild.style.display = "block"
                setDragOverDisplay(false)
            }
            if (e.target.className === "pallete__equally") {
                e.target.firstChild.style.display = "block"
                setDragOverDisplay(false)
            }
            if (board.id === 1) {
                e.target.parentNode.style.zIndex = "-1"
            }

        }

    }
    const dragLeaveHandlear: any = (e: any, board: any) => {
        e.target.style.borderTop = "none"
        if (e.target.className === "pallete__display") {
            setDragOverDisplay(true)
            e.target.firstChild.style.display = "none"
        }
        if (e.target.className === "pallete__operations") {
            e.target.firstChild.style.display = "none"
        }
        if (e.target.className === "pallete__dial") {
            e.target.firstChild.style.display = "none"
        }
        if (e.target.className === "pallete__equally") {
            e.target.firstChild.style.display = "none"
        }
    }
    const dragStartHandler: any = (e: any, board: any, item: any) => {
        setCurrenBoard(board)
        setCurrentItem(item)

        const board2: any = document.querySelectorAll(".boardTest")
        if (boards[1].items.length === 0) {
            board2[1].style.background = " #F0F9FF"
        }
        if (board.id === 1) {
            e.target.parentNode.style.zIndex = "-1"
        }
        if (board.id === 2) {
            boardTest.style.zIndex = "-1"
        }
    }

    const dragEndHandler: any = (e: any, board: any) => {
        const board2: any = document.querySelectorAll(".boardTest")
        if (boards[1].items.length >= 0) {
            board2[1].style.background = "none"
        }

        // if (board.id === 1 && disabledShadow) {
        //     // e.target.style.boxShadow = "none"
        //     // e.target.style.opacity = "50%"
        //     setDisabledShadow(false)
        // }

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
            if (e.target.className === "pallete__display") {
                setDragOverDisplay(true)
            }
            setDisabled(false)
        }
        e.target.childNodes.forEach((child: any) => {
            child.style.boxShadow = "none"
        })
        e.target.parentNode.style.zIndex = "1"
        boardTest.style.zIndex = "1"

    }

    const dropHandler: any = (e: any, board: any, item: any) => {
        e.preventDefault();
        e.stopPropagation();
        setDisabledShadow(true)
        if (e.target.className === "pallete__display") {
            e.target.firstChild.style.display = "none"
        }
        if (e.target.className === "pallete__operations") {
            e.target.firstChild.style.display = "none"
        }
        if (e.target.className === "pallete__dial") {
            e.target.firstChild.style.display = "none"
        }
        if (e.target.className === "pallete__qually") {
            e.target.firstChild.style.display = "none"
        }
        e.target.firstChild.style.display = "none"
        if (currentBoard.id === 1 && currentItem.id !== 1) {
            // запрет на перетаскивание элементов в 1 доску
            setTimeout(() => {
                e.target.parentNode.childNodes.forEach((item: any) => {
                    item.style.boxShadow = "none"
                })
            })
            if (board.id === 2 && e.target.className !== "pallete__display") {
                const dropIndex = board.items.indexOf(item)
                board.items.splice(dropIndex, 0, currentItem)

                setTimeout(() => {
                    if (e.target.previousSibling) {
                        e.target.previousSibling.style.boxShadow = "none"
                    }
                }, 0)
                // флаг для работы перетаскивания, при наведении на айтем во второй доске board.id === 2.
                setDisabled(true)
            }
            if (e.target.className === "pallete__display") {
                const dropIndex = board.items.indexOf(item)
                board.items.splice(dropIndex + 1, 0, currentItem)
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


        if (currentBoard.id === 1 && currentItem.id === 1) {
            const currentIndex = currentBoard.items.indexOf(currentItem)
            currentBoard.items.splice(currentIndex, 0, 1)
            if (board.id === 2) {
                board.items.unshift(currentItem)
                setTimeout(() => {
                    // нужно для отмены тени у инпута при аншифте на эелемент
                    e.target.parentElement.childNodes[0].style.boxShadow = "none"
                    e.target.parentElement.childNodes[0].style.cursor = "not-allowed"
                    e.target.parentElement.childNodes[0].draggable = false

                }, 0)
                // флаг для работы перетаскивания, при наведении на айтем во второй доске board.id === 2.
                setDisabled(true)
            }

        }

        if (currentBoard.id === 2 && board.id === 2) {


            if (e.target.className === "pallete__display") {

                const currentIndex = currentBoard.items.indexOf(currentItem)
                currentBoard.items.splice(currentIndex, 1, 1)
                const dropIndex = board.items.indexOf(item)
                board.items.splice(dropIndex + 1, 0, currentItem)
            }
            // смена позиции карточки в текущей доске
            if (!dragOverDisplay) {
                const currentIndex = currentBoard.items.indexOf(currentItem)
                currentBoard.items.splice(currentIndex, 1)
                const dropIndex = board.items.indexOf(item)
                board.items.splice(dropIndex, 0, currentItem)
                // e.target.parentElement.childNodes[0].style.cursor = "not-allowed"
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
        e.target.style.borderTop = "none"
    }



    const dropElementHandler = (e: any, board: any) => {
        e.preventDefault();
        e.stopPropagation();
        if (currentBoard.id === 1) {
            setDisabled(false)
        }
        // флаг для работы перетаскивания, только в доску для перетаскивания board.id === 2.
        if (board.id === 2) {
            setTimeout(() => {
                e.target.childNodes.forEach((item: any) => {
                    item.style.boxShadow = "none"
                })
            }, 0)
            setDisabled(true)
        }
        if (board.id === 2) {
            if (currentItem.id === 1) {
                board.items.unshift(currentItem)
                setTimeout(() => {
                    e.target.firstChild.firstChild.style.cursor = "not-allowed"
                    e.target.firstChild.style.cursor = "not-allowed"
                    e.target.firstChild.draggable = false
                }, 0)
            }
            if (currentItem.id !== 1) {
                board.items.push(currentItem)
                setTimeout(() => {
                    e.target.firstChild.firstChild.style.cursor = "not-allowed"
                }, 0)
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
        }
    }


    const doubleClickHandler = (e: any, board: any, item: any) => {
        e.preventDefault()
        const dial: any = document.querySelector(".pallete__dial")
        const buttons: any = document.querySelectorAll(".pallete__dial-button")
        const operations: NodeListOf<Element> = document.querySelectorAll(".pallete__operations")
        const equally = document.querySelectorAll(".pallete__equally")
        // setStyleDabl(true)
        // console.log(boards[0].items.id)
        // console.log(operations[0].parentNode)
        if (board.id === 2 && item.id === 2) {
            operations.forEach((item: any) => {
                item.style.cursor = "grab"
                item.style.opacity = "100%"
                item.style.boxShadow = "0px 2px 4px rgba(0, 0, 0, 0.06), 0px 4px 6px rgba(0, 0, 0, 0.1)"
                operations.forEach((item: any) => {
                    item.draggable = true
                })
            })

        }
        if (board.id === 2 && item.id === 3) {
            dial.style.cursor = "grab"
            dial.style.opacity = "100%"
            dial.draggable = "true"
            dial.style.boxShadow = "0px 2px 4px rgba(0, 0, 0, 0.06), 0px 4px 6px rgba(0, 0, 0, 0.1)"
            buttons.forEach((item: any) => {
                item.style.cursor = "grab"

            })

        }
        if (board.id === 2 && item.id === 4) {
            equally.forEach((item: any) => {
                item.style.cursor = "grab"
                item.style.opacity = "100%"
                item.draggable = "true"
                item.style.boxShadow = "0px 2px 4px rgba(0, 0, 0, 0.06), 0px 4px 6px rgba(0, 0, 0, 0.1)"
            })

        }


        if (board.id === 2 && e.target.className !== "pallete__display") {
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
    }

    const onUpHandler = (e: any) => {

    }

    const onClickHandler = (e: any) => {

    }

    const mouseEnterHandler = (e: any, board: any) => {

    }

    const onOtherHandler = (e: any, board: any) => {


    }

    const onMoveHandler = (e: any) => {

    }


    const elements: any = boards.map((board: any) => {
        return <div
            onDragOver={(e) => dragOverHandler(e)}
            onDrop={(e) => dropElementHandler(e, board)}
            onMouseEnter={(e) => mouseEnterHandler(e, board)}
            onMouseLeave={(e) => onOtherHandler(e, board)}
            key={board.id}
            className="boardTest">
            {
                board.items.map((item: any) => {
                    switch (item.type) {
                        case 'input':
                            return <div
                                onMouseMove={(e) => onMoveHandler(e)}
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
                                <span className="pallete__span"></span>
                                <input
                                    placeholder="0"
                                    type="tel"
                                    className="pallete__display-input" />
                            </div>;
                        case 'operations':
                            return <div
                                onMouseMove={(e) => onMoveHandler(e)}
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
                                <span className="pallete__span"></span>
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
                                onMouseMove={(e) => onMoveHandler(e)}
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
                                <span className="pallete__span"></span>
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
                                onMouseMove={(e) => onMoveHandler(e)}
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
                                <span className="pallete__span"></span>
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