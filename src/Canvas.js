import { useRef, useState, useEffect } from 'react'
import './Canvas.css'

export default function Canvas() {

    const canvasRef = useRef(null)
    const ctxRef = useRef(null)
    const [isDrawing, setIsDrawing] = useState(false)
    const [lineColor, setLineColor] = useState('#000000')
    const [lineWidth, setLineWidth] = useState(3)
    const [variants, setVariants] = useState([])

    useEffect(()=> {
        const canvas = canvasRef.current
        canvas.width = window.innerWidth * 2
        canvas.height = window.innerHeight * 2
        canvas.style.width = `${window.innerWidth}px`
        canvas.style.height = `${window.innerHeight}px`

        const ctx = canvas.getContext('2d')
        ctx.scale(2,2)
        ctx.lineCap = 'round'
        ctxRef.current = ctx
    }, [])

    useEffect(()=> {
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        ctx.strokeStyle = lineColor
        ctxRef.current = ctx
    }, [lineColor])

    useEffect(()=> {
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        ctx.lineWidth = lineWidth
        ctxRef.current = ctx
    }, [lineWidth])

    useEffect(()=>{
        const hex = lineColor.substring(1)
        fetch(`https://www.thecolorapi.com/scheme?hex=${hex}&mode=monochrome&count=6`)
        .then(res => res.json())
        .then(data=> setVariants(data.colors))
        .catch(err=> console.log(err))
    }, [lineColor])


    const changeLineColor = e => {
        setLineColor(e.target.value)
    }

    const changeLineWidth = e => {
        setLineWidth(e.target.value)
    }

    const startDrawing = ({nativeEvent}) => {
        const {offsetX, offsetY} = nativeEvent
        ctxRef.current.beginPath()
        ctxRef.current.moveTo(offsetX, offsetY)
        setIsDrawing(true)
    }

    const finishDrawing = () => {
        ctxRef.current.closePath()
        setIsDrawing(false)
    }

    const draw = ({nativeEvent}) => {
        if(!isDrawing) return

        const {offsetX, offsetY} = nativeEvent
        ctxRef.current.lineTo(offsetX, offsetY)
        ctxRef.current.stroke()
    }

    return (
        <>  
            <aside className='drawingTools'>
                <div>
                    <label htmlFor='colorPicker'>Selected Color</label>
                    <input type='color' id='colorPicker' name='colorPicker' aria-label='chooseColor' 
                        value={lineColor} onChange={changeLineColor}/>
                </div>
                <div className='variantSelect'>
                    {variants && variants.map((variant, i) => (
                        <div key={i} className='colorSwatch' style={{backgroundColor:`${variant.hex.value}`}} 
                            onClick={()=>setLineColor(variant.hex.value)}></div>
                    ))}
                </div>
                <div>
                    <label htmlFor='widthSlider'>Brush Width</label>
                    <input type='range' id='widthSlider' name='widthSlider' aria-label='chooseLineWidth' 
                        min='1' max='20' value={lineWidth} onChange={changeLineWidth}/>
                </div>
            </aside>
            <canvas 
                onMouseDown = {startDrawing} 
                onMouseUp = {finishDrawing}
                onMouseMove = {draw}
                ref = {canvasRef}
            />
        </>
    )
}
