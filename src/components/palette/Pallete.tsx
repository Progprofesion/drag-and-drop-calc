import { useState } from "react";
import './palette.scss';
import '../canvas/canvas.scss';

const Pallete = () => {

    const [boards, setBoards] = useState([
        {
            id: 1, items: [
                { id: 1, type: "input" },
                { id: 2, type: "operations", operations: [{ titleOperations: "/" }, { titleOperations: "x" }, { titleOperations: "-" }, { titleOperations: "+" }] },
                { id: 3, type: "dial", numbers: [{ titleNumbers: "7" }, { titleNumbers: "8" }, { titleNumbers: "9" }, { titleNumbers: "4" }, { titleNumbers: "5" }, { titleNumbers: "6" }, { titleNumbers: "1" }, { titleNumbers: "2" }, { titleNumbers: "3" }, { titleNumbers: "0" }, { titleNumbers: "," }] },
                { id: 4, type: "equally", titleEqually: "=" }]
        },
        { id: 2, items: [{ id: 5, type: 'canvas' }] }
    ]);

    const [currentBoard, setcurrenBoard] = useState(null) as any
    const [currentItem, setCurrentItem] = useState(null) as any

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
        setcurrenBoard(board)
        setCurrentItem(item)
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
        setBoards(boards.map(b => {
            if (b.id === board.id) {
                return board
            }
            if (b.id === currentBoard.id) {
                return currentBoard
            }
            return b
        }))

        // if (e.target.className === "canvas") {
        //     e.target.style.display = "none"
        // }


    }
    const doubleClickHandler = (e: any) => {
        e.preventDefault()
        const currentIndex = currentBoard.items.indexOf(currentItem)
        currentBoard.items.splice(currentIndex, 1)

    }

    console.log(boards[1].items)

    const elements: any = boards.map((board) => {
        if (board.items)
            return board.items.map(item => {
                switch (item.type) {
                    case 'input':
                        return <div
                            onDoubleClick={(e) => doubleClickHandler(e)}
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
                            onDoubleClick={(e) => doubleClickHandler(e)}
                            onDragOver={(e) => dragOverHandler(e)}
                            onDragLeave={e => dragLeaveHandlear(e)}
                            onDragStart={(e) => dragStartHandler(e, board, item)}
                            onDragEnd={(e) => dragEndHandler(e)}
                            onDrop={(e) => dropHandler(e, board, item)}
                            draggable={true}
                            key={item.id}
                            className="pallete__operations">
                            <div className="pallete__operations-wrapp">
                                {item.operations?.map((item =>
                                    <button
                                        key={item.titleOperations}
                                        className="pallete__operations-buttons">{item.titleOperations}</button>
                                ))}
                            </div>
                        </div>
                    case 'dial':
                        return <div
                            onDoubleClick={(e) => doubleClickHandler(e)}
                            onDragOver={(e) => dragOverHandler(e)}
                            onDragLeave={e => dragLeaveHandlear(e)}
                            onDragStart={(e) => dragStartHandler(e, board, item)}
                            onDragEnd={(e) => dragEndHandler(e)}
                            onDrop={(e) => dropHandler(e, board, item)}
                            draggable={true}
                            key={item.id}
                            className="pallete__dial">
                            <div className="pallete__dial-wrapp">
                                {item.numbers?.map(item =>
                                    <button
                                        key={item.titleNumbers}
                                        className="pallete__dial-button">{item.titleNumbers}</button>
                                )}
                            </div>
                        </div>
                    case 'equally':
                        return <div
                            onDoubleClick={(e) => doubleClickHandler(e)}
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
            )
    });


    return (

        <section className="pallet">
            {elements}
            {boards.map((board) => {
                if (board.items)
                    return board.items.map(item => {
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
                                    <div className="canvas__drop">
                                    </div>
                                </section >
                            default:
                                return null;
                        }
                    }
                    )
            })}
        </section>
    )
}

export default Pallete