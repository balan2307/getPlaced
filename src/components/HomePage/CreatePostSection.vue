<!-- Card which will be displayed in the right side of the homepage ,it will have create post button -->

<template>
    <div id="createpost">
        <div id="header">

        </div>
        <div id="info">
            <h5 class="mb-3">Welcome {{ getUserName }}!!</h5>
            <p>Want to share your interview experience and help the community?</p>

        </div>
        <hr id="divider">
      

        <div id="postBtn">
            <router-link :to="`/user/posts/${getUid}/add`" > <b-button variant="primary"  size="md">Create Post</b-button></router-link>
           
        </div>
      
    </div>
</template>

<script>

import {mapGetters} from 'vuex'

export default {
    name:'CreatePostCard',
    computed:
    {  ...mapGetters(['getUid','getUserName'])
        
    }

}
</script>

<style>

#createpost
{
  /* border:1px solid #41ca25; */
  /* width: 50%; */
  height: 50%;
  /* width: 70%; */
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  background-color:white;
  border-radius: 5px;

  position: fixed;
  width: 20%;

  
}

#postBtn
{
    /* border: 1px solid red; */
    height: 20%;
    display: flex;
    justify-content: center;
    align-items: center;
}

#postBtn .btn
{

    border-radius: 1rem;
    width: 80%;
}
#postBtn a{
    display: flex;
    justify-content: center;
    width: 100%;
}

#info
{
    height: 60%;

    padding: 10px;
}
#info p{
    font-size: 1rem
};

#divider
{
    width: 90%;
    border: 1px solid #ddd3d3;
    border-top: 1px solid rgb(155 58 58 / 10%);
}

#header
{
    height: 10%;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;

    background-color: #ddd3d3;

}

@media only screen and (max-width: 1065px) {
 
    #postBtn .btn
{

    font-size: 15px;
}



}


</style>