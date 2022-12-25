
import  Router from 'vue-router'
// import AllPosts from '../components/HomePage/DisplayPosts.vue'
// import  HomeRightSection from '../components/HomePage/RightSection'
import PostDetail from '../components/PostExpand/PostDetail'
import AllPosts from '../components/HomePage/Allposts.vue'
import CreatePostCard from '../components/HomePage/CreatePostSection'
import UserProfileCard from '../components/Profile/UserInfo'
import UserPosts from '../components/Profile/UserPosts'
import PostForm from '../components/Forms/Posts/CreatePost'
import ProfileForm from '../components/Forms/Profile/ProfileForm'
import LoginPage from '../components/Auth/Login'
import RegisterPage from '../components/Auth/Register'

const router=new Router({
    mode:'history',
    routes:[
        {
            name:'HomeMain',
            path:'/',
            components:{
                'main':AllPosts,
                'side':CreatePostCard
            }
        }
        ,
        {
            name:'PostDetail',
            path:'/post/:id',
            components:{
                'main':PostDetail,
                'side':CreatePostCard
            }
        },
        {
            name:'UserProfile',
            path:'/profile/:id',
            components:{
                'main':UserPosts,
                'side':UserProfileCard
            }
        },
        {
            name:'UserProfile',
            path:'/profile/:id/update',
            components:{
                'main':ProfileForm,
                'side':UserProfileCard
            }
        }
        ,
        {
            name:'PostForm',
            path:'/posts/add',
            components:{
                'main':PostForm,
                'side':UserProfileCard
            }

        },
        {
            name:'LoginPage',
            path:'/login',
            components:{
                auth:LoginPage
                
            }

        },
        {
            name:'RegisterPage',
            path:'/register',
            components:{
                auth:RegisterPage
                
            }

        }

     
    ]
})

export default router;