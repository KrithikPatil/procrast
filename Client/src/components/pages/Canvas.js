import React from 'react'
import './Canvas.css';
import { Tldraw } from 'tldraw';
import Todo from './Todo';
const Canvas = () => {
  return (
    <div style={{
        position:'fixed',
        inset:'0'
    }}>

      < Tldraw />

    </div>
  )
}

export default Canvas
