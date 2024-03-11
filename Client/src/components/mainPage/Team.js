import React ,{useState} from 'react';
import './Team.css';
import { TeamData } from './TeamData';
import rArrow from '../../assets/rArrow.png'
import lArrow from '../../assets/lArrow.png'
const TeamSection = () => {

    const [selected,setSelected] =useState(0);
    const tLength =TeamData.length;
  return (
            <div className='team'>
                <div className='left-t'>
                    <span>TEAM</span>
                    
                    <span style={{color:"white",fontSize:"40px"}}>
                       {TeamData[selected].about}
                    </span>
                    <span>
                        <span style={{color:"black",fontSize:"30px"}}>
                            {TeamData[selected].name}
                            
                        </span>{" "}

                        <br></br>
                        {TeamData[selected].status}
                    </span>
                </div>
                <div className='right-t'>
                <div className='border-1'></div>
                <div className='border-2'></div>
                    <img src={TeamData[selected].image} />
                    <div className='arrows'>
                        <div className='arrows-left'>
                        <img  onClick={()=>{
                            selected==0 
                            ? setSelected(tLength-1)
                            : setSelected((prev) => prev-1);
                        }} src={lArrow} /></div>
                        <div className='arrow-right'>
                        <img onClick={()=>{
                            selected==tLength-1 
                          ? setSelected(0)
                          :setSelected((prev)=>prev+1);
                        }} src={rArrow} /></div>
                    </div>
                    </div>
                </div>

            
  );
};

export default TeamSection;
