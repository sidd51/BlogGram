import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../components";
import { useSelector } from "react-redux";
import { Query } from "appwrite";

function Home() {
  const [posts, setPosts] = useState([]);

  // Get logged-in user data from Redux
  const userData = useSelector((state) => state.auth.userData?.userData);

  // Fetch all active posts for any logged-in user
  useEffect(() => {
    if (userData?.$id) {
      appwriteService
        .getPosts([
          Query.equal("status", "active") 
        ])
        .then((posts) => {
          if (posts) {
            setPosts(posts.documents);
          }
        })
        .catch((error) => {
          console.log("Error fetching posts:", error);
        });
    }
  }, [userData]);

  // If user is not logged in
  if (!userData) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <h1 className="text-2xl font-bold text-gray-700">
            Please log in to view posts
          </h1>
        </Container>
      </div>
    );
  }

  return (
    <div className="w-full py-8">
      <Container>
        {/* If no posts found */}
        {posts.length === 0 ? (
          <div className="text-center text-gray-600 text-xl">
            No active posts available right now.
          </div>
        ) : (
          <div className="flex flex-wrap -mx-2">
            {posts.map((post) => (
              <div
                key={post.$id}
                className="w-full sm:w-1/2 lg:w-1/4 px-2 mb-6"
              >
                <PostCard {...post} />
              </div>
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}

export default Home;
