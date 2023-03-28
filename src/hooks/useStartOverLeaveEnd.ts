import { EventType } from "@testing-library/react";
import { useState } from "react"
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'src/store/index';
import { setCurrentBoard, setCurrentItem } from "src/store/reducer/dropStore";


type QuerySelectorAll = (selector: string) => NodeListOf<Element>;

type TuseStartOverLeaveEnd = {
    e: EventType
    target: {
        className: {}
        parentNode: {
            style: {
                zIndex: string
            }
            firstChild: {
                firstChild: {
                    style: {
                        display: string
                        top: string
                    }
                }
            }
        }
        lastChild: {
            firstChild: {
                style: {
                    display: string
                    top: string
                    bottom: string
                }
            }
        }
        firstChild: {
            style: {
                display: string
                top: string
                bottom: string
            }
            firstChild: {
                style: {
                    display: string
                    top: string
                }
            }
        }
        style: {
            opacity: string
            cursor: string
            boxShadow: string
        }
        draggable: boolean
        querySelectorAll: QuerySelectorAll
        childNodes: []
    }
    id: number
    preventDefault: () => void
}

const useStartOverLeaveEnd = () => {

    const palleteWrapp: HTMLDivElement | null = document.querySelector(".pallete__wrapp");

    const dropState = useSelector((state: RootState) => state.dropStore.dropState);
    const currentBoard = useSelector((state: RootState) => state.dropStore.currentBoard);

    const dataClone = JSON.parse(JSON.stringify(dropState))
    const dispatch = useDispatch();

    const [disabled, setDisabled] = useState<boolean>(false)
    const [disabledSpan, setDisabledSpan] = useState<boolean>(false)


    const dragStartHandler: any = (e: TuseStartOverLeaveEnd, board: TuseStartOverLeaveEnd, item: TuseStartOverLeaveEnd) => {
        dispatch(setCurrentBoard(board))
        dispatch(setCurrentItem(item))

        const board2: NodeListOf<HTMLAnchorElement> = document.querySelectorAll(".pallete__wrapp")

        if (dataClone[1].items.length === 0) {
            board2[1].style.background = " #F0F9FF"
        }


        if (board.id === 1 && e.target.className === "pallete__display") {
            setDisabledSpan(true)
        }

        if (board.id === 1) {
            e.target.parentNode.style.zIndex = "-1"
        }

        if (board.id === 2) {
            palleteWrapp!.style.zIndex = "-1"
        }
    }
    // console.log(disabledSpan)

    const dragOverHandler: any = (e: TuseStartOverLeaveEnd, board: { id: number }) => {
        e.preventDefault();

        //  две практически одинаковые функции_________
        if (e.target.className === "pallete__wrapp" && e.target.lastChild && disabledSpan) {
            e.target.firstChild.firstChild.style.display = "block"
            e.target.firstChild.firstChild.style.top = "-7px"
        }

        // if (e.target.className !== "pallete__wrapp" && e.target.lastChild) {

        //     if (e.target.firstChild.firstChild) {
        //         e.target.firstChild.firstChild.style.display = "block"
        //         e.target.firstChild.firstChild.style.top = "-7px"
        //     }
        // }

        if (e.target.className === "pallete__wrapp" && e.target.lastChild && !disabledSpan) {
            e.target.lastChild.firstChild.style.display = "block"
            e.target.lastChild.firstChild.style.top = "unset"
            e.target.lastChild.firstChild.style.bottom = "7px"
        }

        if (e.target.className !== "pallete__wrapp" && e.target.lastChild && disabledSpan) {
            e.target.parentNode.firstChild.firstChild.style.display = "block"
            e.target.parentNode.firstChild.firstChild.style.top = "-7px"

        }


        if (board && board.id === 2) {

            if (e.target.className === "pallete__display" && dataClone[1].items.length > 0 && !disabledSpan) {
                e.target.firstChild.style.display = "block"
                e.target.firstChild.style.top = "unset"
                e.target.firstChild.style.bottom = "5px"
            }


            if (e.target.className === "pallete__operations" && dataClone[1].items.length > 1 && !disabledSpan) {
                e.target.firstChild.style.display = "block"
                e.target.firstChild.style.top = "-7px"
                setDisabledSpan(false)

            }
            if (e.target.className === "pallete__dial" && dataClone[1].items.length > 1 && !disabledSpan) {
                e.target.firstChild.style.display = "block"
                e.target.firstChild.style.top = "-7px"
                setDisabledSpan(false)
            }
            if (e.target.className === "pallete__equally" && dataClone[1].items.length > 1 && !disabledSpan) {
                e.target.firstChild.style.display = "block"
                e.target.firstChild.style.top = "-7px"
                setDisabledSpan(false)
            }
            // if (board.id === 1) {
            // e.target.parentNode.style.zIndex = "-1"
            // }
        }

    }

    const dragLeaveHandlear: any = (e: TuseStartOverLeaveEnd) => {

        if (e.target.className === "pallete__wrapp" && e.target.firstChild) {
            e.target.firstChild.firstChild.style.display = "none"
            // e.target.lastChild.firstChild.style.display = "none"
        }

        if (e.target.className === "pallete__display") {
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

    const dragEndHandler: any = (e: TuseStartOverLeaveEnd, board: { id: number }) => {

        setDisabledSpan(false)

        const board2: any = document.querySelectorAll(".pallete__wrapp")
        if (dataClone[1].items.length >= 0) {
            board2[1].style.background = "none"
        }

        // убирает место дропа
        board2[1].childNodes.forEach((item: { firstChild: { style: { display: string } } }) => {
            item.firstChild.style.display = "none"
        })

        if (board.id === 1) {
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
                e.target.style.boxShadow = "none"
            }
            setDisabled(false)

        }

        e.target.childNodes.forEach((child: { style: { boxShadow: string } }) => {
            child.style.boxShadow = "none"
        })

        e.target.parentNode.style.zIndex = "1"
        palleteWrapp!.style.zIndex = "1"

    }


    return {
        dragStartHandler,
        dragOverHandler,
        dragLeaveHandlear,
        dragEndHandler
    }
}

export default useStartOverLeaveEnd