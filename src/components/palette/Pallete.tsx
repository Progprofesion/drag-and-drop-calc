import { useState, useEffect } from "react";
// import {useEffect} from 'react-redux';'
// import { useSelector, useDispatch } from "react-redux";


// import { RootState } from "@/store";

// import { setDb, setCurrenBoard, setCurrentItem } from "../../store/reducer/calcStore";

import './palette.scss';


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


    const pallete: any = document.querySelector(".pallete");
    const palleteWrapp: any = document.querySelector(".pallete__wrapp");
    const display: any = document.querySelectorAll(".pallete__display");
    const operations: any = document.querySelectorAll(".pallete__operations");
    const dial: any = document.querySelectorAll(".pallete__dial");
    const equally: any = document.querySelectorAll(".pallete__equally");

    const [currentBoard, setCurrenBoard] = useState(null) as any
    const [currentItem, setCurrentItem] = useState(null) as any
    const [disabled, setDisabled] = useState(false) as any

    const [dragOverDisplay, setDragOverDisplay] = useState(false) as any
    const [disabledCurrenItem, setDisabledCurrenItem] = useState(false) as any
    const [disabledSpan, setDisabledSpan] = useState(false) as any
    const [disabledLastChildPadding, setDisabledLastChildPadding] = useState(false) as any

    useEffect(() => {
        // setDisabledSpan(true)
    }, [])


    const dragStartHandler: any = (e: any, board: any, item: any) => {
        setCurrenBoard(board)
        setCurrentItem(item)

        const board2: any = document.querySelectorAll(".pallete__wrapp")

        if (boards[1].items.length === 0) {
            board2[1].style.background = " #F0F9FF"
        }


        if (board.id === 1 && e.target.className === "pallete__display") {
            setDisabledSpan(true)

        }

        if (board.id === 1) {
            e.target.parentNode.style.zIndex = "-1"
            if (board.id === 1) {
                setDisabledCurrenItem(true)
            }
            if (board.id === 2) {
                setDisabledCurrenItem(false)
            }
        }

        if (board.id === 2) {
            palleteWrapp.style.zIndex = "-1"
        }
    }
    // console.log(disabledSpan)

    const dragOverHandler: any = (e: any, board: any) => {
        e.preventDefault();

        //  две практически одинаковые функции_________
        if (e.target.className === "pallete__wrapp" && e.target.lastChild && disabledSpan) {
            // console.log(disabledSpan)

            // if
            e.target.firstChild.firstChild.style.display = "block"
            // ?????????????????????????
            e.target.firstChild.firstChild.style.top = "-7px"
            // ?????????????????????????
            // setDisabledSpan(false)
        }

        if (e.target.className !== "pallete__wrapp" && e.target.lastChild) {
            // console.log(disabledSpan)

            if (e.target.firstChild.firstChild) {
                e.target.firstChild.firstChild.style.display = "block"
                // ?????????????????????????
                e.target.firstChild.firstChild.style.top = "-7px"
            }

            // ?????????????????????????
            // setDisabledSpan(false)
        }



        // ?????????????????????????????????????????????

        if (e.target.className === "pallete__wrapp" && e.target.lastChild && !disabledSpan) {
            // setDragOverDisplay(false)
            // if
            e.target.lastChild.firstChild.style.display = "block"
            // ?????????????????????????
            e.target.lastChild.firstChild.style.top = "unset"
            // ?????????????????????????
            e.target.lastChild.firstChild.style.bottom = "7px"
            setDisabledSpan(false)
        }
        if (e.target.className !== "pallete__wrapp" && e.target.lastChild && disabledSpan) {

            // setDragOverDisplay(false)
            // if
            e.target.parentNode.firstChild.firstChild.style.display = "block"
            // ?????????????????????????
            e.target.parentNode.firstChild.firstChild.style.top = "-7px"
            // ?????????????????????????
            // e.target.parentNode.firstChild.firstChild.style.bottom = "7px"
            // setDisabledSpan(false)

        }
        // _________________________________
        // }, 0)

        if (board && board.id === 2) {

            if (e.target.className === "pallete__display" && boards[1].items.length > 0 && !disabledSpan) {
                e.target.firstChild.style.display = "block"
                e.target.firstChild.style.top = "unset"
                e.target.firstChild.style.bottom = "5px"
            }


            if (e.target.className === "pallete__operations" && boards[1].items.length > 1 && !disabledSpan) {
                e.target.firstChild.style.display = "block"
                e.target.firstChild.style.top = "-7px"
                setDragOverDisplay(false)
                setDisabledSpan(false)
                // palleteIStina.childNodes[1].lastChild.firstChild.style.display = "none"
            }
            if (e.target.className === "pallete__dial" && boards[1].items.length > 1 && !disabledSpan) {
                e.target.firstChild.style.display = "block"
                e.target.firstChild.style.top = "-7px"
                setDragOverDisplay(false)
                setDisabledSpan(false)
                // palleteIStina.childNodes[1].lastChild.firstChild.style.display = "none"
            }
            if (e.target.className === "pallete__equally" && boards[1].items.length > 1 && !disabledSpan) {
                e.target.firstChild.style.display = "block"
                e.target.firstChild.style.top = "-7px"
                setDragOverDisplay(false)
                setDisabledSpan(false)
                // palleteIStina.childNodes[1].lastChild.firstChild.style.display = "none"
            }
            if (board.id === 1) {
                e.target.parentNode.style.zIndex = "-1"
            }
        }
    }

    const dragLeaveHandlear: any = (e: any, board: any) => {
        // e.target.style.borderTop = "none"
        // if (e.target.firstChild.firstChild) {
        //     console.log(e.target)
        //     e.target.firstChild.firstChild.style.display = "none"
        // }

        if (e.target.className === "pallete__wrapp") {
            // setDragOverDisplay(true)
            e.target.firstChild.firstChild.style.display = "none"
        }

        if (e.target.className === "pallete__display") {
            // setDragOverDisplay(true)
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



    const dragEndHandler: any = (e: any, board: any, item: any) => {

        setDisabledSpan(false)

        const board2: any = document.querySelectorAll(".pallete__wrapp")
        if (boards[1].items.length >= 0) {
            board2[1].style.background = "none"
        }

        // убирает место дропа
        board2[1].childNodes.forEach((item: any) => {
            item.firstChild.style.display = "none"
        })

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
            e.target.querySelectorAll('.pallete__operations').forEach((node: any) => {
                node.style.cursor = "not-allowed"
                node.style.boxShadow = "none"
            })
            e.target.querySelectorAll('.pallete__dial-button').forEach((node: any) => node.style.cursor = "not-allowed")
            if (e.target.className === "pallete__display") {
                setDragOverDisplay(true)
                e.target.style.boxShadow = "none"
            }
            setDisabled(false)

        }

        e.target.childNodes.forEach((child: any) => {
            child.style.boxShadow = "none"
        })

        e.target.parentNode.style.zIndex = "1"
        palleteWrapp.style.zIndex = "1"


        // setTimeout(() => {
        //     e.target.childNodes.forEach((item: any) => {
        //         console.log(item.firstChild)
        //         item.firstChild.style.display = "none"
        //     })
        // }, 0)


    }

    const dropHandler: any = (e: any, board: any, item: any) => {
        e.preventDefault();
        e.stopPropagation();
        // console.log(e.target)


        setTimeout(() => {
            const operationsCurrent: any = document.querySelectorAll(".pallete__operations")
            const dialCurrent: any = document.querySelectorAll(".pallete__dial");
            const equallyCurrent: any = document.querySelectorAll(".pallete__equally");
            const displayCurrent: any = document.querySelectorAll(".pallete__display");

            //-------------------------- стили для расширения карточки

            e.target.parentNode.style.height = "448px"
            // console.log(boards)
            // if(item.id === board.l)
            if (board.items.length >= 4) {
                // console.log(e.target.parentNode)
                e.target.parentNode.style.height = "448px"
                // e.target.style.marginTop = "-1px"
                // e.target.style.paddingBottom = "0px"
                setDisabledLastChildPadding(true)
            }


            // DISPLAY
            if (currentItem.id === 1 && boards[1].items.length <= 4) {
                displayCurrent[1].style.marginTop = "0px"
                displayCurrent[1].style.paddingBottom = "12px"
                displayCurrent[1].style.height = "72px"
            }

            // OPERATIONS
            if (currentItem.id === 2 && boards[1].items.length <= 4) {
                operationsCurrent[1].style.marginTop = "0px"
                operationsCurrent[1].style.paddingBottom = "12px"
                operationsCurrent[1].style.height = "68px"
            }

            // DIAL 
            if (currentItem.id === 3 && boards[1].items.length <= 4) {
                dialCurrent[1].style.marginTop = "0px"
                dialCurrent[1].style.paddingBottom = "12px"
                dialCurrent[1].style.height = "237px"
            }

            // EQUALLY 
            if (currentItem.id === 4 && boards[1].items.length <= 4) {
                equallyCurrent[1].style.marginTop = "0px"
                equallyCurrent[1].style.paddingBottom = "12px"
                equallyCurrent[1].style.height = "84px"
            }
        }, 0)

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

        if (e.target.firstChild) {
            e.target.firstChild.style.display = "none"
        }


        if (currentBoard.id === 1 && currentItem.id === 1) {
            setDisabled(true)
            if (board.id === 2) {
                board.items.unshift(currentItem)
                setTimeout(() => {
                    // нужно для отмены тени у инпута при аншифте на эелемент
                    e.target.parentElement.childNodes[0].style.boxShadow = "none"
                    e.target.parentElement.childNodes[0].style.cursor = "not-allowed"
                    e.target.parentElement.childNodes[0].draggable = false

                }, 0)
            }


        }


        if (currentBoard.id === 1 && currentItem.id !== 1) {
            setDisabled(true)
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

        if (currentBoard.id === 2 && board.id === 2) {

            setTimeout(() => {
                setDisabled(false)

            }, 0)

            if (e.target.className === "pallete__display") {
                const currentIndex = currentBoard.items.indexOf(currentItem)
                currentBoard.items.splice(currentIndex, 1)
                const dropIndex = board.items.indexOf(item)
                board.items.splice(dropIndex + 1, 0, currentItem)
            }

            // ????????????????????????????????????
            // if (e.target.className !== "pallete__display" && currentItem.id !== 1) {
            //     const currentIndex = currentBoard.items.indexOf(currentItem)
            //     currentBoard.items.splice(currentIndex, 1, 1)
            //     const dropIndex = board.items.indexOf(item)
            //     board.items.splice(dropIndex + 1, 0, currentItem)
            // }


            // смена позиции карточки в текущей доске
            if (e.target.className !== "pallete__display") {
                const currentIndex = currentBoard.items.indexOf(currentItem)
                currentBoard.items.splice(currentIndex, 1)
                const dropIndex = board.items.indexOf(item)
                board.items.splice(dropIndex, 0, currentItem)
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
    }



    const dropElementHandler = (e: any, board: any) => {
        e.preventDefault();
        e.stopPropagation();
        setTimeout(() => {
            const operationsCurrent: any = document.querySelectorAll(".pallete__operations")
            const dialCurrent: any = document.querySelectorAll(".pallete__dial");
            const equallyCurrent: any = document.querySelectorAll(".pallete__equally");
            const displayCurrent: any = document.querySelectorAll(".pallete__display");

            //-------------------------- стили для расширения карточки

            e.target.childNodes.forEach((item: any) => {
                // console.log(item)
                item.style.paddingBottom = "12px"
                item.style.marginTop = "0px"

                // DISPLAY
                if (currentItem.id === 1) {
                    displayCurrent[1].style.marginTop = "0px"
                    // displayCurrent[1].style.paddingBottom = "12px"
                    displayCurrent[1].style.height = "72px"
                }

                // OPERATIONS
                if (currentItem.id === 2) {
                    operationsCurrent[1].style.marginTop = "0px"
                    // operationsCurrent[1].style.paddingBottom = "12px"
                    operationsCurrent[1].style.height = "68px"
                }

                // DIAL 
                if (currentItem.id === 3) {
                    dialCurrent[1].style.marginTop = "0px"
                    // dialCurrent[1].style.paddingBottom = "12px"
                    dialCurrent[1].style.height = "237px"
                    // console.log(boards[1].items.length)
                }

                // EQUALLY 
                if (currentItem.id === 4) {
                    equallyCurrent[1].style.marginTop = "0px"
                    // equallyCurrent[1].style.paddingBottom = "12px"
                    equallyCurrent[1].style.height = "84px"
                }

            })


            if (board.items.length > 2) {

                e.target.style.maxHeight = "448px"
                // e.target.lastChild.style.marginTop = "-1px"
                // e.target.lastChild.style.paddingBottom = "0px"
            }

        }, 0)

        e.target.childNodes.forEach((item: any) => {
            item.firstChild.style.display = "none"
        })

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


        if (e.target.className === "pallete__wrapp") {
            e.target.style.border = "none"
            // ???????????????????????????
            // setTimeout(() => {
            //     console.log(e.target.lastChild.firstChild)
            //     // e.target.lastChild.firstChild.style.display = "block"
            // }, 0)
        }
    }

    const doubleClickHandler = (e: any, board: any, item: any) => {
        e.preventDefault()
        const dial: any = document.querySelector(".pallete__dial")
        const buttons: any = document.querySelectorAll(".pallete__dial-button")
        const operations: NodeListOf<Element> = document.querySelectorAll(".pallete__operations")
        const equally = document.querySelectorAll(".pallete__equally")

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
            board.items.splice(currentIndex, 1)
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
            onDrop={(e) => dropElementHandler(e, board)}
            onDragLeave={e => dragLeaveHandlear(e, board)}
            key={board.id}
            className="pallete__wrapp">
            {
                board.items.map((item: any) => {
                    switch (item.type) {
                        case 'input':
                            return <div
                                // onMouseDown={(e) => e.preventDefault()}
                                onDoubleClick={(e) => doubleClickHandler(e, board, item)}
                                onDragOver={(e) => dragOverHandler(e, board)}
                                onDragLeave={e => dragLeaveHandlear(e, board)}
                                onDragStart={(e) => dragStartHandler(e, board, item)}
                                onDragEnd={(e) => dragEndHandler(e, board, item)}
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
                                onDoubleClick={(e) => doubleClickHandler(e, board, item)}
                                onDragOver={(e) => dragOverHandler(e, board)}
                                onDragLeave={e => dragLeaveHandlear(e, board)}
                                onDragStart={(e) => dragStartHandler(e, board, item)}
                                onDragEnd={(e) => dragEndHandler(e, board, item)}
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
                                onDoubleClick={(e) => doubleClickHandler(e, board, item)}
                                onDragOver={(e) => dragOverHandler(e, board)}
                                onDragLeave={e => dragLeaveHandlear(e, board)}
                                onDragStart={(e) => dragStartHandler(e, board, item)}
                                onDragEnd={(e) => dragEndHandler(e, board, item)}
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
                                onDoubleClick={(e) => doubleClickHandler(e, board, item)}
                                onDragOver={(e) => dragOverHandler(e, board)}
                                onDragLeave={e => dragLeaveHandlear(e, board)}
                                onDragStart={(e) => dragStartHandler(e, board, item)}
                                onDragEnd={(e) => dragEndHandler(e, board, item)}
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

        <section className="pallete">
            {elements}
        </section>
    )
}

export default Pallete

