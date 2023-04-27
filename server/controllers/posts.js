import mongoose from 'mongoose';
import PostMessage from '../models/postMessage.js'


//create posts. 
export const createPost = async (req, res) => {
    const post = req.body;
    // specifies the creator userId and creation date for each post
    const newPostMessage = new PostMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString(), users: [req.userId]  } )
    console.log('creating posts in controllers')
    try {
        await newPostMessage.save()

        //201=new creation
        res.status(201).json(newPostMessage)
    } catch (error) {
        //409=conflict
        res.status(409).json({message:error.message})
    }
}

//update posts. the request is made to the post of the right id
export const updatePost = async (req, res) => {
    //desctructuring + renaming id to _id for mongoose id
    const { id: _id } = req.params;

    const post = req.body;

    //check if a post with that id exists
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id, bucko.')

    //if that post id is valid, then update the post
    //note the update data would come from req.body from above (note it's data from frontend)
    const updatedPost = await PostMessage.findByIdAndUpdate(_id, {...post, _id}, { new: true })
    
    res.json(updatedPost)
}

//delete posts. 
export const deletePost = async (req, res) => {

    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id, bucko.')
    
    await PostMessage.findByIdAndRemove(id)

    res.json({ message: 'Project post deleted.' })
}

//liking posts.
export const likePost = async (req, res) => {
    const { id } = req.params

    if(!req.userId) return res.json({message: 'Unauthenticated.'})

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id.')

    const post = await PostMessage.findById(id)

    // check if person has already liked
    const index = post.likes.findIndex((id)=> id===String(req.userId))
    if(index===-1){
        post.likes.push(req.userId)
    }else{
        post.likes.filter((id)=> id!==req.userId)
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true } )
    
    res.json(updatedPost);
}


export const getPost = async (req, res)=>{
    const{ id } = req.params
    try{
        const post=await PostMessage.findById(id);

        res.status(200).json(post);
    }catch(error){
        res.status(404).json({message: error.message})
    }
}

export const commentPost = async (req, res) => {
    const { id } = req.params
    const { value } = req.body
    // finds the post the comment goes on
    const post = await PostMessage.findById(id)

    // goes into the comments for the post and pushes the comment
    post.comments.push(value)

    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new:true })

    res.json(updatedPost)
}

//get posts. async b.c it takes time to grab the data
export const getPosts = async (req, res)=>{
    
    try{
        const postMessages = await PostMessage.find({ users: req.userId })

        res.status(200).json(postMessages);
    }catch(error){
        res.status(404).json({message: error.message})
    }
}
