import { useRef, useState, useEffect } from 'react'

export default function Canvas() {

    const canvasRef = useRef(null)
    const ctxRef = useRef(null)
    const [isDrawing, setIsDrawing] = useState(false)

    useEffect(()=> {
        const canvas = canvasRef.current
        canvas.width = window.innerWidth * 2
        canvas.height = window.innerHeight * 2
        canvas.style.width = `${window.innerWidth}px`
        canvas.style.height = `${window.innerHeight}px`

        const ctx = canvas.getContext('2d')

        // These will all be variables the user can change
        ctx.scale(2,2)
        ctx.lineCap = 'round'
        ctx.strokeStyle = 'black'
        ctx.lineWidth = 5

        ctxRef.current = ctx
    }, [])

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
        <canvas 
            onMouseDown = {startDrawing} 
            onMouseUp = {finishDrawing}
            onMouseMove = {draw}
            ref = {canvasRef}
        />
    )
}
