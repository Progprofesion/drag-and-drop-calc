import { useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import './canvas.scss';

import { setDb, setCurrenBoard, setCurrentItem } from "../../store/reducer/reducerDb";

const Canvas = () => {
    const stateDb = useSelector((state: RootState) => state.reducerDb.stateDb);
    const currentBoard = useSelector((state: RootState) => state.reducerDb.currentBoard);
    const currentItem = useSelector((state: RootState) => state.reducerDb.currentItem);

    let cloneDb = JSON.parse(JSON.stringify(stateDb))

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
    const dragStartHandler: any = (board: any, item: any) => {
        dispatch(setCurrenBoard(board))
        dispatch(setCurrentItem(item))
    }
    const dragEndHandler: any = (e: any) => {
        e.target.style.borderBottom = "none"
        e.target.style.opacity = "50%"

    }
    const dropHandler: any = (e: any, board: any, item: any) => {
        e.preventDefault();
        e.target.style.borderBottom = "none"
        if (board.id === 2) {
            const dropIndex = board.items.indexOf(item)
            board.items.splice(dropIndex + 1, 0, currentItem)
        }
        dispatch(setDb(cloneDb.map((b: any) => {
            if (b.id === board.id) {
                return board
            }
            if (b.id === currentBoard.id) {
                return currentBoard
            }
            return b
        })))

        // if (e.target.className === "canvas") {
        //     e.target.style.display = "none"
        // }


    }
    const doubleClickHandler = (e: any) => {
        e.preventDefault()
        const currentIndex = currentBoard.items.indexOf(currentItem)
        currentBoard.items.splice(currentIndex, 1)

    }

    return (
        <>
            {cloneDb.map((board: any) => {
                if (board.items)
                    return board.items.map((item: any) => {
                        switch (item.type) {
                            case 'canvas':
                                return <section
                                    onDragOver={(e) => dragOverHandler(e)}
                                    onDragLeave={e => dragLeaveHandlear(e)}
                                    onDragStart={(e) => dragStartHandler(e, board, item)}
                                    onDragEnd={(e) => dragEndHandler(e)}
                                    onDrop={(e) => dropHandler(e, board, item)}
                                    key={item.id}
                                    className="canvas" >
                                </section >
                            default:
                                return null;
                        }
                    }
                    )
            })}
        </>
    )
}

export default Canvas