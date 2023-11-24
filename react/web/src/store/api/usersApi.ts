import {createApi} from '@reduxjs/toolkit/query/react';
import {db} from '../../../firebase-config';
import {addDoc, collection, getDocs, deleteDoc, doc} from "firebase/firestore";

const firebaseBaseQuery = async ({baseUrl, url, method, body}) => {
    switch (method) {
        case 'GET':
            const snapshot = await getDocs(collection(db, url));
            const data = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
            return {data};

        case 'POST':
            const docRef = await addDoc(collection(db, url), body);
            return {data: {id: docRef.id, ...body}};

        case 'DELETE':
                await deleteDoc(doc(collection(db, url), body.userId));
                return;

        default:
            throw new Error(`Unhandled method ${method}`);
    }
};

export const usersApi = createApi({
    reducerPath: 'usersApi',
    baseQuery: firebaseBaseQuery,
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: () => ({
                baseUrl: '',
                url: 'users',
                method: 'GET',
                body: ""
            }),
        }),
        createUser: builder.mutation({
            query: ({user}) => ({
                baseUrl: '',
                url: 'users',
                method: 'POST',
                body: user
            }),
        }),
        deleteUser: builder.mutation({
            query: ({userId}) => ({
                baseUrl: '',
                url: 'users',
                method: 'DELETE',
                body: {userId}
            }),
        })
    }),
});

export const {useGetUsersQuery, useCreateUserMutation, useDeleteUserMutation} = usersApi;