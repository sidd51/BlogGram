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
  <div className="bg-zinc-700 text-black min-h-screen p-2">
    <Container>
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-4 sm:p-6 relative">

                     {/* Post Image */}
        <div className="w-full mb-4 rounded-md overflow-hidden border border-gray-300 shadow">
          <img
            src={appwriteService.getFileView(post.featuredImage)}
            alt={post.title}
            className="w-full max-h-[400px] object-contain rounded-md"
          />
        </div>
                     {/* Post Title & ID */}
        <h1 className="text-2xl sm:text-3xl font-extrabold text-red-500 mb-1">{post.title}</h1>
        <h3 className="text-sm sm:text-base text-zinc-500 mb-4">{post.$id}</h3>
                       

                    <h3 className="text-sm sm:text-base text-zinc-500 mb-4">
  Posted by: {post.authorEmail || "Anonymous"}
</h3>

                    

     
        {/* Post Content */}
        <div className="prose max-w-none text-sm sm:text-base font-serif leading-relaxed text-gray-800">
          {parse(post.content)}
        </div>

                     {/* Edit/Delete Buttons (moved below content) */}
        {isAuthor && (
          <div className="flex justify-end gap-3 mt-6">
            <Link to={`/edit-post/${post.$id}`}>
              <Button
                bgColor="bg-white"
                className="!text-red-500 px-1 py-1 rounded-md border border-red-400 hover:!text-red-600"
              >
                Edit
              </Button>
            </Link>
            <Button
              bgColor="bg-white"
              className="!text-red-500 px-1 py-1 rounded-md border border-red-400 hover:!text-red-600"
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
