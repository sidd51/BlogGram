import React from 'react';
import appwriteService from '../appwrite/config';
import { Link } from 'react-router-dom';

function PostCard({ $id, title, featuredImage, slug }) {

    return (
        <Link
            to={`/post/${slug}`}
            className="w-full sm:w-1/2 lg:w-1/3 p-4"
        >
            <div
                className="
                group h-full flex flex-col overflow-hidden
                rounded-2xl border border-gray-200
                bg-white
                shadow-sm hover:shadow-xl
                transition-all duration-300
                hover:-translate-y-1
                "
            >
                {/* Image Section */}
                <div className="relative w-full h-52 overflow-hidden">
                    <img
                        src={appwriteService.getFileView(featuredImage)}
                        alt={title}
                        className="
                        w-full h-full object-cover
                        transition-transform duration-500
                        group-hover:scale-105
                        "
                    />

                    {/* Soft overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-white/70 via-transparent to-transparent" />
                </div>

                {/* Content Section */}
                <div className="flex flex-col flex-grow p-5">

                    {/* Title */}
                    <h2
                        className="
                        text-lg sm:text-xl font-semibold
                        text-gray-800 leading-snug
                        line-clamp-2
                        group-hover:text-red-500
                        transition-colors duration-300
                        "
                    >
                        {title}
                    </h2>

                    <div className="flex-grow" />

                    {/* Footer */}
                    <div className="mt-4 flex items-center justify-between text-sm text-gray-500">

                        <span className="truncate max-w-[75%]">
                            {slug || $id}
                        </span>

                        <span
                            className="
                            text-red-500 font-medium
                            opacity-0 group-hover:opacity-100
                            transition-opacity duration-300
                            "
                        >
                            Read →
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default PostCard;
