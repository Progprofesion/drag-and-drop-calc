import './palette.scss';

const Pallete = () => {
    return (
        <section className='pallete'>
            <div className="pallete__display">
                <div className="pallete__display-wrapp"></div>
            </div>
            <div className="pallete__operations">
                <div className="pallete__operations-wrapp">
                    <button className="pallete__operations-buttons">/</button>
                    <button className="pallete__operations-buttons">x</button>
                    <button className="pallete__operations-buttons">-</button>
                    <button className="pallete__operations-buttons">+</button>
                </div>
            </div>
        </section>
    )
}

export default Pallete