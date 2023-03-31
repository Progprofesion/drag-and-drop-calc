import { EventType } from "@testing-library/react";
import { useState, useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'src/store/index';
import { setCurrentBoard, setCurrentItem, setDisabledDrop } from "src/store/reducer/dropStore";
import { TuseDelete } from "src/hooks/useDelete";

type TchildNodes = {
    style: {
        boxShadow: string
        cursor: string
    }
    draggable: boolean
}

type TNodeElement = {
    style: {
        cursor: string
        boxShadow: string
    }
}



export type TdragOverHandler = {
    preventDefault: () => void
    target: {
        style: {
            display: string
        }
        className: string
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
                bottom: string
                display: string
                top: string
            }
            firstChild: {
                style: {
                    display: string
                    top: string
                    bottom: string
                }
            }
        }
        parentNode: {
            firstChild: {
                firstChild: {
                    style: {
                        display: string
                        top: string
                    }
                }
            }
        }
    }
}

type TdragLeaveHandlear = {

}



type TQuerySelectorAll = (selector: string) => NodeListOf<any>;

export type TuseStartOverLeaveEnd = {
    type: string
    e: EventType
    id: number
    items: []
    target: {
        className: {}
        parentNode: {
            style: {
                zIndex: string
                height: string
            }
            childNodes: []
            firstChild: {
                firstChild: {
                    style: {
                        display: string
                        top: string
                    }
                }
            }
        }
        parentElement: {
            childNodes: TchildNodes[]

        }
        previousSibling: {
            style: {
                boxShadow: string
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
            draggable: boolean
            style: {
                display: string
                top: string
                bottom: string
                cursor: string
            }
            firstChild: {
                style: {
                    display: string
                    top: string
                    cursor: string
                    bottom: string
                }
            }
        }
        style: {
            opacity: string
            cursor: string
            boxShadow: string
            maxHeight: string
            border: string
            width: string
            display: string
        }
        draggable: boolean
        querySelectorAll: TQuerySelectorAll
        childNodes: []
    }
    preventDefault: () => void
    stopPropagation: () => void
    operations: []
    numbers: []
    titleEqually: string
}


const useStartOverLeaveEnd = () => {

    const palleteWrapp: HTMLDivElement | null = document.querySelector(".pallete__wrapp");

    const dropState = useSelector((state: RootState) => state.dropStore.dropState);
    const disabledDrop = useSelector((state: RootState) => state.dropStore.disabledDrop);

    const dataClone = JSON.parse(JSON.stringify(dropState))
    const dispatch = useDispatch();

    const [disabledSpan, setDisabledSpan] = useState<boolean>(false)

    const dragStartHandler = (e: React.DragEvent<HTMLDivElement>, board: { id: number }, item: {}): void => {
        dispatch(setCurrentBoard(board))
        dispatch(setCurrentItem(item))

        const board2: NodeListOf<HTMLAnchorElement> = document.querySelectorAll(".pallete__wrapp")

        if (dataClone[1].items.length === 0) {
            board2[1].style.background = " #F0F9FF"
        }


        if (board.id === 1 && e.currentTarget.className === "pallete__display") {
            // подсветка для инпута в начало массива
            setDisabledSpan(true)
        }

        if (board.id === 1) {
            (e.currentTarget.parentNode as HTMLElement).style.zIndex = "-1"
        }

        if (board.id === 2) {
            palleteWrapp!.style.zIndex = "-1"
        }
    }

    const dragOverHandler = (e: React.DragEvent<HTMLDivElement>, board: { id: number }) => {
        e.preventDefault();
        //  два практически одинаковых условия_________
        if (e.currentTarget.className === "pallete__wrapp" && e.currentTarget.lastChild && disabledSpan) {
            (e.currentTarget.firstChild!.firstChild! as HTMLElement).style.display = "block";
            (e.currentTarget.firstChild!.firstChild! as HTMLElement).style.top = "-7px";
            (e.currentTarget.firstChild!.firstChild! as HTMLElement).style.bottom = "unset";
        }

        const helper = (e: any) => {
            if (e.target.className === "pallete__wrapp" && e.target.lastChild && !disabledSpan) {
                (e.currentTarget.lastChild.firstChild as HTMLElement).style.display = "block";
                (e.currentTarget.lastChild.firstChild as HTMLElement).style.top = "unset";
                (e.currentTarget.lastChild.firstChild as HTMLElement).style.bottom = "7px";
            }
        }

        helper(e)


        // if (e.target.className === "pallete__wrapp" && e.target.lastChild && !disabledSpan) {
        //     e.currentTarget.lastChild.firstChild.style.display = "block"
        //     e.currentTarget.lastChild.firstChild.style.top = "unset"
        //     e.currentTarget.lastChild.firstChild.style.bottom = "7px"

        // }



        // для подсветки места дропа pallete__display при наведении на элементы 
        if (e.currentTarget.className !== "pallete__wrapp" && e.currentTarget && disabledSpan) {
            (e.currentTarget.parentNode!.firstChild!.firstChild as HTMLElement).style.display = "block";
            (e.currentTarget.parentNode!.firstChild!.firstChild as HTMLElement).style.top = "-7px";
            (e.currentTarget.firstChild as HTMLElement).style.bottom = "unset"

        }
        // для подсветки места №1 дропа у НЕ pallete__display
        if (e.currentTarget.className !== "pallete__wrapp" && e.currentTarget.firstChild && !disabledSpan && e.currentTarget.className !== "pallete__display") {
            (e.currentTarget.firstChild as HTMLElement).style.display = "block";
            (e.currentTarget.firstChild as HTMLElement).style.top = "0px";
        }


        if (board && board.id === 2) {
            if (e.currentTarget.className === "pallete__span" && dataClone[1].items.length > 0 && !disabledSpan) {
                e.currentTarget.style.display = "block"
            }

            if (e.currentTarget.className === "pallete__display" && dataClone[1].items.length > 0 && !disabledSpan) {
                (e.currentTarget.firstChild as HTMLElement).style.display = "block";
                (e.currentTarget.firstChild as HTMLElement).style.top = "unset";
                (e.currentTarget.firstChild as HTMLElement).style.bottom = "6px";

            }


            if (e.currentTarget.className === "pallete__operations" && dataClone[1].items.length > 1 && !disabledSpan) {
                (e.currentTarget.firstChild as HTMLElement).style.display = "block";
                (e.currentTarget.firstChild as HTMLElement).style.top = "-7.5px";
                (e.currentTarget.firstChild as HTMLElement).style.bottom = "unset";
                setDisabledSpan(false)

            }
            if (e.currentTarget.className === "pallete__dial" && dataClone[1].items.length > 1 && !disabledSpan) {
                (e.currentTarget.firstChild as HTMLElement).style.display = "block";
                (e.currentTarget.firstChild as HTMLElement).style.top = "-7.5px";
                (e.currentTarget.firstChild as HTMLElement).style.bottom = "unset";
                setDisabledSpan(false)
            }
            if (e.currentTarget.className === "pallete__equally" && dataClone[1].items.length > 1 && !disabledSpan) {
                (e.currentTarget.firstChild as HTMLElement).style.display = "block";
                (e.currentTarget.firstChild as HTMLElement).style.top = "-7.5px";
                (e.currentTarget.firstChild as HTMLElement).style.bottom = "unset";
                setDisabledSpan(false)
            }
        }

    }


    const dragLeaveHandlear = (e: React.DragEvent<HTMLDivElement>, board: {}) => {

        if (e.currentTarget.className === "pallete__wrapp" && e.currentTarget.firstChild) {
            (e.currentTarget.firstChild.firstChild as HTMLElement).style.display = "none"
        }

        if (e.currentTarget.className === "pallete__display") {
            (e.currentTarget.firstChild as HTMLElement).style.display = "none"

        }
        if (e.currentTarget.className === "pallete__operations") {
            (e.currentTarget.firstChild as HTMLElement).style.display = "none"
        }
        if (e.currentTarget.className === "pallete__dial") {
            (e.currentTarget.firstChild as HTMLElement).style.display = "none"
        }
        if (e.currentTarget.className === "pallete__equally") {
            (e.currentTarget.firstChild as HTMLElement).style.display = "none"
        }
    }

    const dragEndHandler = (e: React.DragEvent<HTMLDivElement>, board: { id: number }, item: {}) => {

        setDisabledSpan(false)

        const board2: any = document.querySelectorAll(".pallete__wrapp")
        if (dataClone[1].items.length >= 0) {
            board2[1].style.background = "none"
        }

        // убирает место дропа
        board2[1].childNodes.forEach((item: { firstChild: { style: { display: string } } }) => {
            item.firstChild.style.display = "none"
        })

        if (board.id === 1 && disabledDrop) {
            e.currentTarget.style.opacity = "50%";
            e.currentTarget.draggable = false;
            e.currentTarget.style.cursor = "not-allowed";
            e.currentTarget.style.boxShadow = "none";
            (e.currentTarget as EventTarget & HTMLDivElement).querySelectorAll<HTMLElement>('.pallete__display-input').forEach((node: TNodeElement) => {
                node.style.cursor = "not-allowed";
            });
            (e.currentTarget as EventTarget & HTMLDivElement).querySelectorAll<HTMLElement>('.pallete__operations-buttons').forEach((node: TNodeElement) => {
                node.style.cursor = "not-allowed";
            });
            (e.currentTarget as EventTarget & HTMLDivElement).querySelectorAll<HTMLElement>('.pallete__operations').forEach((node: TNodeElement) => {
                node.style.cursor = "not-allowed"
                node.style.boxShadow = "none"
            });
            (e.currentTarget as EventTarget & HTMLDivElement).querySelectorAll<HTMLElement>('.pallete__dial-button').forEach((node: TNodeElement) => node.style.cursor = "not-allowed")
            if (e.currentTarget.className === "pallete__display") {
                e.currentTarget.style.boxShadow = "none"
            };
            dispatch(setDisabledDrop(false));
        };

        (e.currentTarget.childNodes as NodeListOf<HTMLElement>).forEach((item: TNodeElement) => {
            item.style.boxShadow = "none";
        });

        (e.currentTarget.parentNode as HTMLElement).style.zIndex = "1"
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