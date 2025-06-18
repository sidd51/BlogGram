import React, {useEffect, useState} from 'react'
import {Container, PostForm} from '../components'
import appwriteService from "../appwrite/config";
import { useNavigate,  useParams } from 'react-router-dom';

function EditPost() {
    const [post, setPosts] = useState(null)
    const {id} = useParams()
    const navigate = useNavigate()

        useEffect(() => {
        appwriteService.getPostById(id).then((post) => {
            if (post) setPosts(post);
            else navigate("/");
        });
        }, [id]);
        
  return post ? (
    <div className='py-8'>
        <Container>
            <PostForm post={post} />
        </Container>
    </div>
  ) : null
}

export default EditPost