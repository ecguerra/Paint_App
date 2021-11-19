import { useRef, useState, useEffect } from 'react'

export default function Canvas() {

    const canvasRef = useRef(null)
    const ctxRef = useRef(null)
    const [isDrawing, setIsDrawing] = useState(false)
    const [lineColor, setLineColor] = useState('#000000')
    const [lineWidth, setLineWidth] = useState(3)

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
            <input type='color' id='colorPicker' name='colorPicker' aria-label='chooseColor' 
                value={lineColor} onChange={changeLineColor}/>
            <input type='range' id='widthSlider' name='widthSlider' aria-label='chooseLineWidth' 
                min='1' max='20' value={lineWidth} onChange={changeLineWidth}/>
            <canvas 
                onMouseDown = {startDrawing} 
                onMouseUp = {finishDrawing}
                onMouseMove = {draw}
                ref = {canvasRef}
            />
        </>
    )
}
