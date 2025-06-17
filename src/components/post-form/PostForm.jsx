import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const submit = async (data) => {
        if (post) {
            const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;

            if (file) {
                appwriteService.deleteFile(post.featuredImage);
            }

            const dbPost = await appwriteService.updatePost(post.$id, {
                ...data,
                featuredImage: file ? file.$id : undefined,
            });

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`);
            }
        } else {
            const file = await appwriteService.uploadFile(data.image[0]);

            if (file) {
                const fileId = file.$id;
                data.featuredImage = fileId;

                if (!userData || !userData.$id) {
                    console.error("❌ User data missing");
                    return;
                }

                const dbPost = await appwriteService.createPost({ ...data, userId: userData.$id,  });

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            }
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap bg-white p-4 rounded shadow-md">
            {/* Left Side - Title, Slug, Content */}
            <div className="w-full lg:w-2/3 px-2 font-semibold">
                <Input
                    label="Title "
                    placeholder="Enter title"
                    className="mb-4 font-light"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug "
                    placeholder="Auto-generated slug"
                    className="mb-4 font-light"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE
                    label="Content "
                    name="content"
                    control={control}
                    defaultValue={getValues("content")}
                />
            </div>

            {/* Right Side - Image, Status, Submit */}
            <div className="w-full lg:w-1/3 px-2 mt-6 lg:mt-0 ">
                <Input
                    label="Featured Image "
                    type="file"
                    className="mb-4 border border-black rounded"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFileView(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg border border-red-500"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button
                    type="submit"
                    className="w-full bg-red-600 text-white hover:bg-red-700 transition rounded"
                >
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
}
