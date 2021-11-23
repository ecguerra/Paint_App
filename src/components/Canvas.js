import { useRef, useState, useEffect } from 'react'
import Form from 'react-validation/build/form'
import Input from 'react-validation/build/input'
import { savePainting } from '../services/painting.service'
import '../css/Canvas.css'

const cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME

export default function Canvas() {
    const form = useRef()
    const canvasRef = useRef(null)
    const ctxRef = useRef(null)
    const [isDrawing, setIsDrawing] = useState(false)
    const [lineColor, setLineColor] = useState('#000000')
    const [lineWidth, setLineWidth] = useState(3)
    const [variants, setVariants] = useState(null)

    const [title, setTitle] = useState(null)
    const [url, setUrl] = useState(null)

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

    const onChangeTitle = e => {
        setTitle(e.target.value)
    }

    const prepImage = async()=> {
        const canvas = canvasRef.current
        const imageBlob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'))
        const formData = new FormData()
        formData.append('image', imageBlob, 'image.png')

        const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
            method: 'POST',
            body: formData
        })

        if(res.ok) {
            console.log('Successfully uploaded')
        } else {
            console.log('An error occurred while uploading')
        }

        // console.log(url)
    }

    const handleSave = e => {
        e.preventDefault()
        // const canvas = canvasRef.current
        // const canvasData = canvas.toDataURL('image/png')
        // setUrl(canvasData)
        // console.log(url)

        prepImage()

        // savePainting(title, url).then((response) => 
        // {
        //     console.log(response)
        // },
        // err => {
        //     console.log(err)
        // })
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
                <div>
                    <button onClick={()=>{setLineColor('#FFFFFF')}}>Eraser</button>
                </div>
                <div>
                    <Form ref={form} onSubmit={handleSave} encType="multipart/form-data">
                        <Input 
                            type='text'
                            name='title'
                            value={title}
                            onChange={onChangeTitle}
                        />
                        <Input
                            type='submit'
                            name='submit'
                            value='Save your Painting'
                        />
                    </Form>
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
