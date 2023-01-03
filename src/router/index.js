
import  Router from 'vue-router'
// import AllPosts from '../components/HomePage/DisplayPosts.vue'
// import  HomeRightSection from '../components/HomePage/RightSection'
import PostDetail from '../components/PostExpand/PostDetail'
import AllPosts from '../components/HomePage/Allposts.vue'
import TaggedPosts from '../components/HomePage/TaggedPosts'
import CreatePostCard from '../components/HomePage/CreatePostSection'
import UserProfileCard from '../components/Profile/UserInfo'
import UserPosts from '../components/Profile/UserPosts'
import PostForm from '../components/Forms/Posts/CreatePost'
import ProfileForm from '../components/Forms/Profile/ProfileForm'
import LoginPage from '../components/Auth/Login'
import RegisterPage from '../components/Auth/Register'
import PostEditForm from '../components/Forms/Posts/EditPost'

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
            name:'PostTagged',
            path:'/posts/:tag',
            components:{
                'main':TaggedPosts,
                'side':CreatePostCard
            }
        },
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
            path:'/user/profile/:id',
            components:{
                'main':UserPosts,
                'side':UserProfileCard
            }
        },
        {
            name:'UserProfileEdit',
            path:'/user/profile/:id/edit',
            components:{
                'main':ProfileForm,
                'side':UserProfileCard
            }
        }
        ,
        {
            name:'PostForm',
            path:'/user/posts/:id/add',
            components:{
                'main':PostForm,
                'side':CreatePostCard
            }

        },
        {
            name:'PostEdit',
            path:'/user/post/:id',
            components:{
                'main':PostEditForm,
                'side':CreatePostCard
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