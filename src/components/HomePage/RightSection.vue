<template>
  <div id="rightsection">

    <div id="createpost">
        <div id="header">

        </div>
        <div id="info">
            <h4>Home</h4>
            <p>Your personal frontpage. Come here to check in with your favorite communities</p>

        </div>
        <hr id="divider">
      

        <div id="postBtn">
            <b-button variant="primary"  size="md">Create Post</b-button>
        </div>
      
    </div>
  </div>
</template>

<script>

export default {
    name:'HomeRightSection'
};
</script>

<style>
#createpost
{
  /* border:1px solid #41ca25; */
  /* width: 50%; */
  height: 45%;
  width: 70%;
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  background-color:white;
  border-radius: 5px;
}

#rightsection
{
    height: 80vh;
    width: 50%;
    display: flex;
    justify-content: left;
    padding-left: 30px;
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

#rightsection

{
    display: none;
}
/* 
#createpost
{
    height: 60%;
} */

}


/* @media only screen and (max-width: 690px) {
 
 #postBtn .btn
{

 font-size: 15px;
}

#createpost
{
 height: 80%;
}

} */

</style>
