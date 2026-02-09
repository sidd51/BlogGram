import conf from '../conf/conf.js';
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);

        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    // ✅ Create a new post with unique ID
    async createPost({ title, slug, content, featuredImage, status, userId, authorName }) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                ID.unique(), 
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                    authorName,
                    slug 
                }
            );
        } catch (error) {
            console.log("Appwrite service :: createPost :: error", error);
        }
    }

    // ✅ Update using real document $id
    async updatePost(id, { title, content, featuredImage, status, authorName, slug }) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                id, 
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    authorName,
                    slug 
                }
            );
        } catch (error) {
            console.log("Appwrite service :: updatePost :: error", error);
        }
    }

    // ✅ Delete using real document $id
    async deletePost(id) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                id
            );
            return true;
        } catch (error) {
            console.log("Appwrite service :: deletePost :: error", error);
            return false;
        }
    }

    // ✅ Get a post by slug field (not ID)
    async getPost(slug) {
        try {
            const response = await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                [Query.equal("slug", slug)]
            );

            return response.documents[0]; // first match
        } catch (error) {
            console.log("Appwrite service :: getPost :: error", error);
            return null;
        }
    }
    async getPostById(id) {
  try {
    return await this.databases.getDocument(
      conf.appwriteDatabaseId,
      conf.appwriteCollectionId,
      id
    );
  } catch (error) {
    console.log("Appwrite service :: getPostById :: error", error);
    return null;
  }
}
    // ✅ Get all posts (or filtered)
    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries
            );
        } catch (error) {
            console.log("Appwrite service :: getPosts :: error", error);
            return false;
        }
    }

    // ✅ File upload service
    async uploadFile(file) {
        try {
            const result = await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            );
            console.log("✅ File uploaded successfully:", result);
            return result;
        } catch (error) {
            console.error("❌ Appwrite uploadFile error:", error);
            return false;
        }
    }

    // ✅ Delete uploaded file
    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            );
            return true;
        } catch (error) {
            console.log("Appwrite service :: deleteFile :: error", error);
            return false;
        }
    }

    // ✅ Get preview URL for a file
    getFileView(fileId) {
        return this.bucket.getFileView(conf.appwriteBucketId, fileId);
    }
}

const service = new Service();
export default service;
