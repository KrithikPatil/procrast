import React, { useEffect } from 'react';
import './Home.css';
import img1 from '../../assets/bg.png';

function Home() {
    
    useEffect(() => {
        const bgAnimation = document.getElementById('bgAnimation');
        const numberOfColorBoxes = 400;

        for (let i = 0; i < numberOfColorBoxes; i++) {
            const colorBox = document.createElement('div');
            colorBox.classList.add('colorBox');
            bgAnimation.appendChild(colorBox);
        }
    }, []); // Empty dependency array ensures the effect runs only once after initial render

    return (
        <div className='container'>
            <div className='bgAnimation' id='bgAnimation'>
                <div className='backgroundAnim'></div>
            </div>
            <div className="text">
                <div className='img-1'>
                <img src={img1} />

                </div>
           
            </div>
            
                <div className="card">
                <h1>Success is</h1>
                    <div className="scroller">
                        <span>
                        Cool<br/>
                        Art<br/>
                        Intruiging<br/>
                        Challenging
                        </span>
                    </div>
                </div>
                
        </div>
    );
}

export default Home;
