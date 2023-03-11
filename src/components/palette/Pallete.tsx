import { useState } from "react";
import './palette.scss';

const Pallete = (): JSX.Element => {

    const [boards, setBoards] = useState([
        { id: 1, items: [{}, {}, {}, {}] },
        { id: 2, items: [{}, {}, {}, {}] }
    ])

    return (
        <>
            {
                boards.map(() =>
                    <section className='pallete'>
                        <div className="pallete__display">
                            <input type="text" className="pallete__display-input" />
                        </div>
                        <div className="pallete__operations">
                            <div className="pallete__operations-wrapp">
                                <button className="pallete__operations-buttons">/</button>
                                <button className="pallete__operations-buttons">x</button>
                                <button className="pallete__operations-buttons">-</button>
                                <button className="pallete__operations-buttons">+</button>
                            </div>
                        </div>
                        <div className="pallete__dial">
                            <div className="pallete__dial-wrapp">
                                <button className="pallete__dial-button">9</button>
                                <button className="pallete__dial-button">8</button>
                                <button className="pallete__dial-button">7</button>
                                <button className="pallete__dial-button">6</button>
                                <button className="pallete__dial-button">5</button>
                                <button className="pallete__dial-button">4</button>
                                <button className="pallete__dial-button">3</button>
                                <button className="pallete__dial-button">2</button>
                                <button className="pallete__dial-button">1</button>
                                <button className="pallete__dial-button">0</button>
                                <button className="pallete__dial-button">,</button>
                            </div>
                        </div>
                        <div className="pallete__equally">
                            <div className="pallete__equally-wrapp">=</div>
                        </div>
                    </section>
                )
            }
        </>
    )
}

export default Pallete