
import  Router from 'vue-router'
// import AllPosts from '../components/HomePage/DisplayPosts.vue'
import  HomeRightSection from '../components/HomePage/RightSection'
import PostDetail from '../components/PostExpand/PostDetail'
import AllPosts from '../components/HomePage/Allposts.vue'


const router=new Router({
    mode:'history',
    routes:[
        {
            name:'HomeMain',
            path:'/',
            components:{
                'main':AllPosts,
                'side':HomeRightSection
            }
        }
        ,
        {
            name:'PostDetail',
            path:'/post/:id',
            components:{
                'main':PostDetail,
                'side':HomeRightSection
            }
        }
    ]
})

export default router;