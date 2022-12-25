<!-- Individual post -->
<template>
  <b-card class="mb-2 user-post">
    <div class="post-rating">
      <div class="rate-components">

      <box-icon style="margin-bottom: 5px;" name='upvote'></box-icon>
      <span class="post-vote">5</span>
      <box-icon style=" margin-top:9px;" name='downvote'></box-icon>
      </div>

    </div>
    <div class="post-content">
      <b-card-text class="post-time">
        Posted by u/BadExtension1309 7 hours ago
      </b-card-text>
      <h5 class="post-title">How do I display user data from a database?</h5>
      <b-img class="post-img" src="https://images.unsplash.com/photo-1671726374905-7d2f959acb9d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60" fluid-grow alt="Fluid-grow image"></b-img>
      <b-card-text>
        For my project, I wanted to display some information that I kept inside
        a database. However for the user to log in and sign up I used some of
        the functions that I imported from the firebase authentication. If I
        wanted to display some data like the user's username that is stored in
        the database how would I be able to grab it and display it?
      </b-card-text>

      <div class="post-btn">
        <!-- <b-button>
          <font-awesome-icon icon="fa-regular  fa-thumbs-up"  size="lg" />
         </b-button>


        <b-button class="thumsdown-btn" > <font-awesome-icon icon="fa-regular  fa-thumbs-down"  size="lg" /></b-button> -->

      </div>

    </div>
  </b-card>
</template>

<script>
export default {
  name: "UserPost",
};
</script>

<style>

.card-body {
  display: flex;

  background-color: rgb(255, 255, 255);
  padding: 0 !important;
  border-radius: 5px;
  /* border: 1px solid red; */
  
}

.card
{
    border-radius: 1rem!important;
}

.user-post
{
    /* border-radius: 15px; */
    /* border-radius:0!important; */
}


.post-rating {
  width: 5%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f2f2f2;
  border-top-left-radius: 5px;
  border-bottom-right-radius: 5px;
}

.post-time {
  color: #aba6a2;
}

.post-title {
  font-weight: 600;
}
.post-content {
  width: 95%;
  padding: 10px;
}

.post-btn
{
  
  display: flex;
  width: 50%;

}
.post-btn .btn:hover
{
  background-color: rgb(124, 114, 114);
  border: none;


}
.post-btn .btn
{
  background-color: white;
  border: none;

}

.post-vote
{
  font-weight: bold;
  font-size: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
 
}
.post-img
{
    max-height: 400px;

}

.post-btn .btn
{
  background-color: white;
  color: black;
  border: none;


}
.post-rating
{
  display: flex;
  flex-direction: column;
  justify-content: start;
 
}
.rate-components
{

  margin-top:20px
}

/* .post-rating .rate-components
{

  display: flex;
  flex-direction: columns;
  align-content: flex-start;
} */


.thumsdown-btn
{
  margin-left: 20px;

}

@media only screen and (max-width: 585px) {
  .post-content
  {
    width: 90%;
  }
  .post-rating
  {

    width: 10%;
  }

}
</style>
