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

export const usersApi = createApi({
    reducerPath: "usersApi",
    baseQuery: firebaseBaseQuery,
    tagTypes: ["users"],
    endpoints: (builder) => ({
        // För att skapa en ny user. Anropas såhär createUser({ user: { firstName: firstName, lastName: lastName }})
        createUser: builder.mutation({
            query: ({user}) => ({
                baseUrl: "",
                url: "users",
                method: "POST",
                body: user,
            }),
            invalidatesTags: ["users"],
        }),
        // För att hämta alla befintliga users
        getUsers: builder.query({
            query: () => ({
                baseUrl: "",
                url: "users",
                method: "GET",
                body: "",
            }),
            providesTags: ["users"],
        }),
        // För att radera en user baserat på id. Anropas såhär: deleteUser(id)
        deleteUser: builder.mutation({
            query: (id) => ({
                baseUrl: "",
                url: "users",
                method: "DELETE",
                body: id,
            }),
            invalidatesTags: ["users"],
        }),
        // För att uppdatera en user. Anropas såhär updateUser({ user: { id: user.id, firstName: firstName, lastName: lastName }})
        updateUser: builder.mutation({
            query: ({user}) => ({
                baseUrl: "",
                url: "users",
                method: "PUT",
                body: user,
            }),
            invalidatesTags: ["users"],
        }),
    }),
});

// Exportera våra Queries och Mutations här.
export const {
    useCreateUserMutation,
    useGetUsersQuery,
    useDeleteUserMutation,
    useUpdateUserMutation,
} = usersApi;
