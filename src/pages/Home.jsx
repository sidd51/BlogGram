import React, { useEffect, useState } from 'react';
import appwriteService from "../appwrite/config";
import { Container, PostCard } from '../components';
import { useSelector } from 'react-redux';
import { Query } from "appwrite";
function Home() {
    const [posts, setPosts] = useState([]);
     const userData = useSelector((state) => state.auth.userData?.userData);
   
    useEffect(() => {
        if (userData?.$id) {
            appwriteService
                .getPosts([
                    // Only fetch posts by logged-in user
                    Query.equal("status", "active"),
                    Query.equal("userId", userData.$id)
                ])
                .then((posts) => {
                    if (posts) {
                        setPosts(posts.documents);
                    }
                });
        }
    }, [userData]);

    // Show message if no user is logged in
    if (!userData) {
        return (
            <div className="w-full py-8 mt-4 text-center ">
                <Container>
                    <div className="flex justify-center">
                        <h1 className="text-2xl font-bold text-gray-700">
                            Please log in to view your posts
                        </h1>
                    </div>
                </Container>
            </div>
        );
    }
    return (
        <div className="w-full py-8 ">
            <Container>
                <div className="flex flex-wrap -mx-2">
                    {posts.map((post) => (
                        <div
                            key={post.$id}
                            className="w-full sm:w-1/2 lg:w-1/4 px-1 mb-5 shadow-sm"
                        >
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
}

export default Home;
