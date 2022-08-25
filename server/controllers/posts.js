import mongoose from 'mongoose';
import PostMessage from '../models/postMessage.js'


//get posts. async b.c it takes time to grab the data
export const getPosts = async (req, res)=>{
    
    try{
        const postMessages=await PostMessage.find();

        console.log(postMessages);

        //returning postMessages as an array after a 200 OK status
        res.status(200).json(postMessages);
    }catch(error){
        res.status(404).json({message: error.message})
    }
}

//create posts. 
export const createPost = async (req, res) => {
    //req.body is built-in
    const post = req.body;
    const newPost = new PostMessage(post)
    console.log('creating posts in controllers')
    try {
        await newPost.save()

        //201=new creation
        res.status(201).json(newPost)
    } catch (error) {
        //409=conflict
        res.status(409).json({message:error.message})
    }
}

//update posts. the request is made to the post of the right id (ex. /posts/111 and the 111 would fill the id below)
export const updatePost = async (req, res) => {
    //desctructuring + renaming id to _id for mongoose id
    const { id: _id } = req.params;

    const post = req.body;

    //check if a post with that id exists
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id, bucko.')

    //if that post id is valid, then update the post
    //note the update data would come from req.body from above (note it's data from frontend). new: true so it gets the updated version of the post.
    //also updated findByIdAndUpdate(_id, post, { new: true } to current
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

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id, bucko.')

    //returns a post matching the id
    const post = await PostMessage.findById(id)
    //grabs post from above. and remember {new:true} b.c it's an update
    const updatedPost = await PostMessage.findByIdAndUpdate(id, { likeCount: post.likeCount +1 }, { new: true } )

    res.json(updatedPost);
}