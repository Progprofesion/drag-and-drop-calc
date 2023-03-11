import Hug from '../hug/Hug';
import Pallete from '../palette/Pallete';
import Canvas from '../canvas/Canvas';

import './app.scss'

const App = () => {
    return (
        <main className='app'>
            <div className="container">
                <section className="main">
                    <Hug />
                    <Pallete />
                    <Canvas />
                </section>

            </div>
        </main>
    )
}

export default App;