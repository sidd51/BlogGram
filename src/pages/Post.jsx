import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);


    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData?.userData);
   
    const isAuthor = post && userData ? post.userId === userData.$id : false;
;
   const [summary, setSummary]=useState("");
   const [loading, setLoading]=useState(false);

   const handleSummarize= async()=>{
     const response= await fetch("/api/summarize",{
      method: "POST",
      headers:{ "Content-Type": "application/json"},
      body: JSON.stringify({text: value}),
     });
     const data=await response.json();
     console.log(data);
     setSummary(data.summary);
     setLoading(false);
      };

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
    }, [slug, navigate,userData]);

    

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

return post ? (
  <div className="bg-gray-50 min-h-screen py-10 px-4">
    <Container>
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">

        {/* Post Image */}
        <div className="w-full">
          <img
            src={appwriteService.getFileView(post.featuredImage)}
            alt={post.title}
            className="w-full max-h-[420px] object-cover"
          />
        </div>

        {/* Post Body */}
        <div className="p-6 sm:p-10 space-y-6">

          {/* Title */}
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
              {post.title}
            </h1>

            {/* Meta Info */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-6 mt-3 text-sm text-gray-500">
              <p>
                <span className="font-medium text-gray-600">Slug:</span>{" "}
                {post.slug}
              </p>

              <p>
                <span className="font-medium text-gray-600">Author:</span>{" "}
                {post?.authorName || "Anonymous"}
              </p>
            </div>
          </div>

          {/* Divider */}
          <hr className="border-gray-200" />

          {/* Content */}
          <div className=" max-w-none text-gray-800  text-base sm:text-lg">
           <div className="prose prose-lg max-w-none">
         {parse(post.content)}
          </div>

          </div>

          {/* Actions */}
          {isAuthor && (
            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
              <Link to={`/edit-post/${post.$id}`}>
                <Button className="px-5 py-2 rounded-lg bg-white border border-gray-300 
                !text-black hover:bg-gray-100 transition">
                  Edit
                </Button>
              </Link>

              <Button
                onClick={deletePost}
                className="px-5 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
              >
                Delete
              </Button>
            </div>
          )}
        </div>
      </div>
    </Container>
  </div>
) : null;

}
