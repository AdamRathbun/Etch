import React, { useState, useEffect } from 'react'
// import { Typography, TextField, Button } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import { updatePost } from '../../actions/posts'
// import { CirclePicker } from "react-color";

import useStyles from './styles'
// import { commentPost } from '../../actions/posts'

const Canvas = ( { post, comments, version } ) => {
    const classes=useStyles()
    const dispatch = useDispatch();

    // const [width, setWidth] = useState(post.width)
    
    useEffect(() => {
        if(document.getElementById('canvas')){
            const canvas=document.getElementById('canvas')
            // canvas.width=window.innerWidth-60;
            canvas.width = post.width
            canvas.height= post.height

            // console.log(canvas)
            let context=canvas.getContext("2d")
            // console.log(context)

            context.fillStyle='white'
            context.fillRect(0, 0, canvas.width, canvas.height)
        
            let draw_color='#fded64'
            let draw_width=6
            let is_drawing=false

            // draw path for undo, note index starts at -1
            let restoreArray=[]
            let restoreIndex=-1

            // draw
            canvas.addEventListener('touchstart', start, false)
            canvas.addEventListener('touchmove', draw, false)
            canvas.addEventListener('mousedown', start, false)
            canvas.addEventListener('mousemove', draw, false)

            canvas.addEventListener('touchend', stop, false)
            canvas.addEventListener('mouseup', stop, false)
            canvas.addEventListener('mouseout', stop, false)

            // pick colors
            document.querySelector('.yellow').addEventListener('click', ()=>{draw_color='#fded64'})
            document.querySelector('.red').addEventListener('click', ()=>{draw_color='#d94645'})

            // change pen size
            document.querySelector('.penRange1').addEventListener('click', ()=>{draw_width=6})
            document.querySelector('.penRange2').addEventListener('click', ()=>{draw_width=18})

            // clear and undo
            document.querySelector('.clearCanvas').addEventListener('click', clearCanvas)
            document.querySelector('.undoCanvas').addEventListener('click', undoCanvas)

            // save canvas
            document.querySelector('.saveCanvas').addEventListener('click', saveCanvas)

            // page load paint canvas with image
            document.addEventListener('beforeunload', copyImageToCanvas)
        
            function start(event){
                // console.log('start event')
                is_drawing=true;
                context.beginPath();

                let rect = this.getBoundingClientRect()

                context.moveTo(event.clientX-rect.left, 
                               event.clientY-rect.top);

                event.preventDefault();
            }

            function draw(event){
                // console.log('draw event')
                if(is_drawing){
                    let rect = this.getBoundingClientRect()
                    context.lineTo(event.clientX-rect.left, 
                        event.clientY-rect.top);
                        
                    context.strokeStyle = draw_color
                    context.lineWidth = draw_width
                    context.lineCap = 'round'
                    context.lineJoin = 'round'
                    context.stroke()
                    // console.log('drawing')
                }
                event.preventDefault()
            }

            function stop (event){
                // console.log('stop event')
                if (is_drawing){
                    context.stroke()
                    context.closePath()
                    is_drawing=false
                }
                event.preventDefault()

                // draw path/restore
                if (event.type!=='mouseout'){
                    restoreArray.push(context.getImageData(0, 0, canvas.width, canvas.height))
                    restoreIndex+=1
                }
                // console.log(restoreArray)
                
            }
        
        // clear function. note it clears the background as well. may have to look up a way that doesn't clear the image
        function clearCanvas(){
            // console.log('clear - clearing canvas')
            context.clearRect(0, 0, canvas.width, canvas.height);

            restoreArray=[]
            restoreIndex=-1
            copyImageToCanvas()
        }
        
        // async function clearCanvas(){
        //     await context.clearRect(0, 0, canvas.width, canvas.height);

        //     restoreArray=[]
        //     restoreIndex=-1
        //     copyImageToCanvas()
        // }

        // undo 
        function undoCanvas(){
            // console.log('start undoing')
            if (restoreIndex<=0){
                // console.log('undo - clearing canvas')
                clearCanvas()
            }else{
                // console.log(post.comments)
                // console.log('undoing last action')
                restoreIndex-=1
                restoreArray.pop()
                // restores data from last spot
                context.putImageData(restoreArray[restoreIndex], 0,  0)
            }
        }

        // save canvas
        function saveCanvas(){
            // if (post.version===version){
            //     let editedImg=canvas.toDataURL("image/jpeg", 1.0)
 
            //     dispatch(updatePost(post._id, {...post, selectedFile: editedImg, comments:comments}));
            //     alert('Changes saved!')
            //     console.log(post.version, version)
            // }else{
            //     alert('Image outdated, refresh.')
            // }
            let editedImg=canvas.toDataURL("image/jpeg", 1.0)
 
            dispatch(updatePost(post._id, {...post, selectedFile: editedImg, comments:comments}));
            alert('Changes saved!')
        }

        // copying image to function
        function copyImageToCanvas(){
            // console.log('attempting to draw.')
            let img = new Image()
            img.src = post.selectedFile
            context.drawImage(
                img, 0, 0, canvas.width, canvas.height
            )
            // console.log('drawing.')
        }

        // setTimeout(()=>{
        //     copyImageToCanvas()
        // })

        // const isCanvasBlank = function() {
        //     const pixelBuffer = new Uint32Array(
        //       context.getImageData(0, 0, canvas.width, canvas.height).data.buffer
        //     );
          
        //     return !pixelBuffer.some(color => color !== 0);
        //   }
        //   console.log(isCanvasBlank())

        // window.onload = copyImageToCanvas()
        canvas.onload = copyImageToCanvas()

        }
        
    }, [])

    return (
        <div>
            <div className={classes.field+' '+classes.generalBody}>

                <canvas className={classes.canvas} id='canvas' ></canvas>
                <div className={classes.tools}>
                    <button className={`undoCanvas ${classes.button}`} type='button'>Undo</button>
                    <button className={`clearCanvas ${classes.button}`} type='button'>Clear</button>
                    <button className={`saveCanvas ${classes.button}`} type='button'>Save</button>
                    
                    <div className={`yellow ${classes.colorField}`} style={{ background: '#fded64' }}></div>
                    <div className={`red ${classes.colorField}`} style={{ background: '#d94645' }}></div>

                    <div className={`penRange1 ${classes.penRange1}`} style={{ background: 'black' }}></div>
                    <div className={`penRange2 ${classes.penRange2}`} style={{ background: 'black' }}></div>

                </div>
            </div>
        </div>
    )
}

export default Canvas