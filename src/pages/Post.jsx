import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const [authorName, setAuthorName] = useState("");
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);
    const isAuthor = post && userData ? post.userId === userData.$id : false;

   

  

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) {
                    setPost(post);

                  
                } else {
                    navigate("/");
                }
            });
        } else {
            navigate("/");
        }
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className=" bg-zinc-700 text-black min-h-screen p-2">
            <Container>
                <div className="max-w-12xl m-10 bg-white rounded-lg shadow-xl  p-6 relative">
                    {/* Image */}
                    <div className="flex justify-center mb-6">
                        <img
                            src={appwriteService.getFileView(post.featuredImage)}
                            alt={post.title}
                            className="rounded-2xl max-h-[500px] w-full object-contain border border-gray-300 shadow-md"
                        />
                    </div>

                    {/* Title */}
                    <h1 className="text-3xl font-extrabold text-red-500 mb-1">{post.title}</h1>

                   
                        <h3 className="text-lg text-zinc-500 ">
                          {post.$id}
                        </h3>
                       

                
                    

                    {/* Content */}
                    <div className="prose max-w-none text-md font-serif leading-relaxed text-gray-800">
                        {parse(post.content)}
                    </div>

                    {/* Edit/Delete */}
                    {isAuthor && (
                        <div className="absolute right-6 bottom-6 flex gap-3">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-white" className="!text-red-500 px-2 py-0 rounded-lg outline-dashed hover:! text-red-700 transition-transform duration-200">
                                    Edit
                                </Button>
                            </Link>
                            <Button
                                bgColor="bg-white"
                                className=" !text-red-500 px-2 py-0 rounded-lg outline-dashed"
                                onClick={deletePost}
                            >
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
            </Container>
        </div>
    ) : null;
}
