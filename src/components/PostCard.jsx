import React from 'react';
import appwriteService from '../appwrite/config';
import { Link } from 'react-router-dom';


function PostCard({ $id, title, featuredImage, slug }) {
    

    return (
<Link to={`/post/${slug}`} className="w-full sm:w-1/2 lg:w-1/3 p-3">

            <div className="bg-zinc-900 text-zinc-100 rounded-xl border border-zinc-700 hover:border-red-600 transition-shadow hover:shadow-xl hover:scale-[1.02] duration-200 overflow-hidden h-full flex flex-col p-4 ">

                {/* Image */}
                <div className="w-full h-48 mb-4 rounded-md overflow-hidden border border-zinc-800 aspect-video">
                    <img
                        src={appwriteService.getFileView(featuredImage)}
                        alt={title}
                        className="w-full h-full object-cover"
                    />
                </div>

               

                {/* Title */}
                <h2 className="text-xl font-semibold mb-1 line-clamp-2 mt-5">
                    {title}
                </h2>

                {/* ID  */}
                <div className="flex items-center justify-center text-sm text-zinc-400 mt-2">
                    <span className="truncate max-w-[80%]">{slug || $id}</span>
                  
                </div>

               
            </div>
        </Link>
    );
}

export default PostCard;


