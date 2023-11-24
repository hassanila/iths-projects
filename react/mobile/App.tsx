import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {I18nextProvider} from "react-i18next";
import {ToastProvider} from "react-native-toast-notifications";
import {Provider, useSelector} from "react-redux";
import {PersistGate} from "redux-persist/integration/react";
import {Ionicons} from '@expo/vector-icons';

import i18n from "./i18n";
import {Settings} from "./src/screens/Settings/Settings";
import {LoginUserForm} from "./src/screens/LoginUserForm/LoginUserForm";
import {EditUserForm} from "./src/screens/EditUserForm/EditUserForm";
import {AddUserForm} from "./src/screens/AddUserForm/AddUserForm";
import {UserInfo} from "./src/screens/UserInfo/UserInfo";
import UsersList from "./src/screens/UsersList/UsersList";
import {persistor, store} from "./src/store/store";

import {AddPostForm} from "./src/screens/AddPostForm/AddPostForm";
import {EditPostForm} from "./src/screens/EditPostForm/EditPostForm";
import {PostInfo} from "./src/screens/PostInfo/PostInfo";
import PostsList from "./src/screens/PostsList/PostsList";

const UsersListStack = createNativeStackNavigator();
const PostsListStack = createNativeStackNavigator();

const UsersListStackScreen = () => {
    return (
        <UsersListStack.Navigator>
            <UsersListStack.Screen name="UsersList" component={UsersList} options={{title: 'Users'}}/>
            <UsersListStack.Screen name="UserInfo" component={UserInfo} options={{title: 'User Info'}}/>
            <UsersListStack.Screen name="AddUserForm" component={AddUserForm} options={{title: 'Add User'}}/>
            <UsersListStack.Screen name="EditUserForm" component={EditUserForm} options={{title: 'Edit User'}}/>
        </UsersListStack.Navigator>
    );
};


const PostsListStackScreen = () => {
    return (
        <PostsListStack.Navigator>
            <PostsListStack.Screen name="PostsList" component={PostsList} options={{title: 'Posts'}}/>
            <PostsListStack.Screen name="PostInfo" component={PostInfo} options={{title: 'Post Info'}}/>
            <PostsListStack.Screen name="AddPostForm" component={AddPostForm} options={{title: 'Add Post'}}/>
            <PostsListStack.Screen name="EditPostForm" component={EditPostForm} options={{title: 'Edit Post'}}/>
        </PostsListStack.Navigator>
    );
}


const Tab = createBottomTabNavigator();

const NavigationWrapper = () => {
    const loggedInAs = useSelector((state: any) => state.auth.loggedInAs);

    return (
        <NavigationContainer>
            <Tab.Navigator screenOptions={{
                tabBarLabelStyle: {
                    fontSize: 15
                },
            }}>
                <Tab.Screen
                    name="UsersListStack"
                    component={UsersListStackScreen}
                    options={{
                        headerShown: false,
                        title: 'Users',
                        tabBarIcon: ({color, size}) => (
                            <Ionicons name="people" color={color} size={size}/>
                        ),
                    }}
                />
                <Tab.Screen
                    name="PostsListStack"
                    component={PostsListStackScreen}
                    options={{
                        headerShown: false,
                        title: 'Posts',
                        tabBarIcon: ({color, size}) => (
                            <Ionicons name="list" color={color} size={size}/>
                        ),
                    }}
                />
                <Tab.Screen
                    name="LoginUserForm"
                    component={LoginUserForm}
                    options={{
                        title: loggedInAs ? 'Profile' : 'Login',
                        tabBarIcon: ({color, size}) => (
                            <Ionicons name={loggedInAs ? "person" : "log-in"} color={color} size={size}/>
                        ),
                    }}
                />
                <Tab.Screen
                    name="Settings"
                    component={Settings}
                    options={{
                        tabBarIcon: ({color, size}) => (
                            <Ionicons name="settings" color={color} size={size}/>
                        ),
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
};

export default function App() {
    return (
        <ToastProvider>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <I18nextProvider i18n={i18n}>
                        <NavigationWrapper/>
                    </I18nextProvider>
                </PersistGate>
            </Provider>
        </ToastProvider>
    );
}
