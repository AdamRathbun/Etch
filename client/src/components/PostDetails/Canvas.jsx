import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { updatePost } from '../../actions/posts'

import useStyles from './styles'

const Canvas = ( { post, comments } ) => {
    const classes=useStyles()
    const dispatch = useDispatch();
    
    useEffect(() => {
        if(document.getElementById('canvas')){
            const canvas=document.getElementById('canvas')
            canvas.width = post.width
            canvas.height= post.height

            let context=canvas.getContext("2d")

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
                is_drawing=true;
                context.beginPath();

                let rect = this.getBoundingClientRect()

                context.moveTo(event.clientX-rect.left, 
                               event.clientY-rect.top);

                event.preventDefault();
            }

            function draw(event){
                if(is_drawing){
                    let rect = this.getBoundingClientRect()
                    context.lineTo(event.clientX-rect.left, 
                        event.clientY-rect.top);
                        
                    context.strokeStyle = draw_color
                    context.lineWidth = draw_width
                    context.lineCap = 'round'
                    context.lineJoin = 'round'
                    context.stroke()
                }
                event.preventDefault()
            }

            function stop (event){
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
                
            }
        
        // clear function
        function clearCanvas(){
            context.clearRect(0, 0, canvas.width, canvas.height);

            restoreArray=[]
            restoreIndex=-1
            copyImageToCanvas()
        }

        // undo 
        function undoCanvas(){
            if (restoreIndex<=0){
                clearCanvas()
            }else{

                restoreIndex-=1
                restoreArray.pop()
                // restores data from last spot
                context.putImageData(restoreArray[restoreIndex], 0,  0)
            }
        }

        // save canvas
        function saveCanvas(){
            let editedImg=canvas.toDataURL("image/jpeg", 1.0)
 
            dispatch(updatePost(post._id, {...post, selectedFile: editedImg, comments:comments}));
            alert('Changes saved!')
        }

        // copying image to function
        function copyImageToCanvas(){
            let img = new Image()
            img.src = post.selectedFile
            context.drawImage(
                img, 0, 0, canvas.width, canvas.height
            )
        }

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
