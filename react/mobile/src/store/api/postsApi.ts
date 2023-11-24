import {createApi} from "@reduxjs/toolkit/query/react";
import {addDoc, collection, deleteDoc, doc, getDocs, updateDoc,} from "firebase/firestore";

import {db} from "../../../firebase-config";

const firebaseBaseQuery = async ({baseUrl, url, method, body}) => {
    switch (method) {
        case "GET": {
            const snapshot = await getDocs(collection(db, url));
            const data = snapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}));
            return {data};
        }

        case "POST": {
            const docRef = await addDoc(collection(db, url), body);
            return {data: {id: docRef.id, ...body}};
        }

        case "DELETE": {
            const docDelRef = await deleteDoc(doc(db, url, body));
            return {data: {id: docDelRef}};
        }

        case "PUT": {
            await updateDoc(doc(db, url, body.id), body);
            return {data: {...body}};
        }

        default:
            throw new Error(`Unhandled method ${method}`);
    }
};

export const postsApi = createApi({
    reducerPath: "postsApi",
    baseQuery: firebaseBaseQuery,
    tagTypes: ["posts"],
    endpoints: (builder) => ({
        createPost: builder.mutation({
            query: ({post}) => ({
                baseUrl: "",
                url: "posts",
                method: "POST",
                body: post,
            }),
            invalidatesTags: ["posts"],
        }),
        getPosts: builder.query({
            query: () => ({
                baseUrl: "",
                url: "posts",
                method: "GET",
                body: "",
            }),
            providesTags: ["posts"],
        }),
        deletePost: builder.mutation({
            query: (id) => ({
                baseUrl: "",
                url: "posts",
                method: "DELETE",
                body: id,
            }),
            invalidatesTags: ["posts"],
        }),
        updatePost: builder.mutation({
            query: ({post}) => ({
                baseUrl: "",
                url: "posts",
                method: "PUT",
                body: post,
            }),
            invalidatesTags: ["posts"],
        }),
    }),
});

// Export our Queries and Mutations here.
export const {
    useCreatePostMutation,
    useGetPostsQuery,
    useDeletePostMutation,
    useUpdatePostMutation,
} = postsApi;