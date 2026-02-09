import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Container, PostCard } from '../components';
import appwriteService from "../appwrite/config";
import authService from "../appwrite/auth";
import { Query } from "appwrite";

function MyPosts() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchMyPosts() {
            try {
                const user = await authService.getCurrentUser();
                if (!user) {
                    navigate("/login"); 
                    return;
                }

                const response = await appwriteService.getPosts([
                    Query.equal("userId", user.$id),
                ]);

                if (response) {
                    setPosts(response.documents);
                }
            } catch (error) {
                console.error("Error fetching user posts:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchMyPosts();
    }, [navigate]);

    if (loading) {
        return <div className="text-center text-white py-10">Loading your posts...</div>;
    }

    return (
        <div className="w-full py-6">
            <Container>
                <h1 className="text-2xl font-bold text-red-500 mb-4">My Posts</h1>
                {posts.length > 0 ? (
                    <div className="flex flex-wrap -mx-1">
                        {posts.map((post) => (
                            <div key={post.$id} className="w-full sm:w-1/2 lg:w-1/4 px-1 mb-2">
                                <PostCard {...post} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-300">You haven't posted anything yet.</p>
                )}
            </Container>
        </div>
    );
}

export default MyPosts;

