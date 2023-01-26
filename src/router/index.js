
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
import onCampus from '@/components/HomePage/PostSection/onCampus'
import offCampus from '@/components/HomePage/PostSection/offCampus'
import SearchedResult from '@/components/HomePage/SearchedResult'
import UserInfoTab from "@/components/Profile/UserInfoTab.vue"
import store from '@/store';
import NotFound from '@/components/Utils/NotFound'
import {authUser} from '@/services/auth.js'
// import { eventBus } from "@/main";

const router=new Router({
    mode:'history',
    routes:[
        {
            name:'HomeMain',
            path:'/',
            components:{
                'main':AllPosts,
                'side':CreatePostCard
            },
            children:[
                {
                    name:'onCampusSection',
                    path:'onCampus',
                    component:onCampus
                },
                   {
                    name:'offCampusSection',
                    path:'offcampus',
                    component:offCampus
                }
            ]
        }
        ,
       
            {
                path: '/oncampus',
                component: onCampus,
                // props: (route) => ({ page: route.query.page }),
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
                'side':UserProfileCard
            }
        },
        {
            name:'UserProfile',
            path:'/user/profile/:id',
            components:{
                'main':UserPosts,
                'side':UserProfileCard,
               
            }
          
        },
        {
            name:'UserProfileEdit',
            path:'/user/profile/:id/edit',
            components:{
                'main':ProfileForm,
                'side':UserProfileCard,
                 'top':UserInfoTab
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
            name:'searchedPosts',
            path:'/posts',
            components:{
                'main':SearchedResult,
                'side':CreatePostCard
            },
            // props: {
            //     'main': {
            //         searchTerm:'search',
                 
            //     }
            // }


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

        },
        { path: '*', components: {
           'main': NotFound
         } }

     
    ]
})


router.beforeEach(async(to, from, next) => {


      // this route requires auth, check if logged in
      // if not, redirect to login page.

      try{
      if(to.name=='PostForm'  || to.name=='UserProfileEdit' )
      {
        
        console.log("inside check")
        const reqId=to.params.id;
        const userID=store.getters.getUid;
        if(reqId!=userID)
        {
            console.log("Unauthrouzzed")
            // eventBus.$emit("UnAuth")
            store.commit('setAuthorized', false)
            throw new Error("UnAuthorized access")
        }
      }
    }
    catch(err)
    {
        console.log("error inside router",err)
    
        next({ path:'/oncampus'});

       
    }
  
      if(to.name!='LoginPage' && to.name!='RegisterPage') {
    
    
      let tokenAuth=false;
  
      if(store.getters.isAuthenticated){
   
        try
        {
        
       await authUser(localStorage.getItem('token'));
    
       tokenAuth=true;
        }
        catch(err)
        {
           
           
            tokenAuth=false;

        }
    }

 
 
        if( !store.getters.isAuthenticated || !tokenAuth)
        {
           
            store.dispatch( 'logout' )
            return next({
                name: 'LoginPage'
            });

        }
        else {
           
          
                return next();
            
        }
    
    } 
    next();



})



export default router;