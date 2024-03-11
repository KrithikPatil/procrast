import React from 'react';
import './Features.css'
import c1Img from '../../assets/withPie.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
export default function Features(){
    return(
        <div className='TeamI'>
        <div className='Feat-heading'>
        <h1> FEATURES:</h1>
        
        </div>
        
        <div className='cont-1'>
            <ul id="Fcards">
                <li className='Fcard' id='Fcard1'>
                    <div className='Fc-body'>
                        <h2>Real-Time Analysis</h2>
                        <p> This site Analyzes your way of working <br></br>and provides you your daily analysis<br>
                        </br>so that you can grow in your life</p>
                    </div>
                    <div className="c1-img">
                        <img src=" "/>
                    
                    </div>
                </li>
                <li className='Fcard' id='Fcard2'>
                    <div className='Fc-body'>
                    <h2>AI-Proctored System</h2>
                        <p> U will be proctored by our AI <br></br>So that the analysis will be precise</p>
                    </div>
                </li>
                <li className='Fcard' id='Fcard3'>
                    <div className='Fc-body'>
                        <h2>hello2</h2>
                    </div>
                </li>
                <li className='Fcard' id='Fcard4'>
                    <div className='Fc-body'>
                        <h2>hello3</h2>
                    </div>
                </li>
            </ul>
        </div>
        </div>
        

    )
}