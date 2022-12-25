<!-- Profile Card which will be displayed in the right side of the homepage ,it will show user info -->
<template>
     <div id="userprofile">
        <div id="header">

        </div>
        <div id="info">
            <b-img class="profile-image" src="https://picsum.photos/300/150/?image=41" fluid alt="Fluid image"></b-img>
            <div id="user-info">
                <div>
            <h4 id="username">BadExtension</h4>
            <hr>
            <p> <span>Name: </span>Esakki  </p>
            <p> <span>College: </span>SIES GST </p>
            <p><span>University: </span>Mumbai </p>
            <p><span>Year of Graduation: </span>2023 </p>
            <p><span>Joined on </span>25-12-2022 </p>
            </div>

            </div>

        </div>
        <hr id="divider">
      

        <div id="postBtn">
            <b-button variant="primary"  size="md">Follow</b-button>
            <b-button variant="primary"  size="md"> <router-link to="/profile/1/update">Update</router-link> </b-button>
        </div>
      
    </div>
  
</template>

<script>
export default {
    name:'UserProfileCard'

}
</script>

<style>


#userprofile
{
  /* border:1px solid #41ca25; */
  /* width: 50%; */
  height: 85%;
  width: 70%;
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  background-color:white;
  border-radius: 5px;
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


#postBtn .btn a
{

    text-decoration: none;
    color: white;
}

#info
{
    height: 60%;

    padding: 10px;
}

#info p span
{
    font-weight: 400;
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
    height: 25%;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;

    background-color: #33a8ff;
}

#user-info
{
    position: relative;
    bottom: 60px;
    display: flex;
    justify-content: center;
    /* text-align: center; */
}

#username
{
    font-weight:600;
    font-size: 20px;
    text-align: center;
}

.profile-image
{
    border-radius: 50%;
    width: 130px;
    height: 130px;
    position: relative;
    margin-bottom: 10px;
    left: 29%;
    bottom: 60px;
}

@media only screen and (max-width: 1065px) {
 
    #postBtn .btn
{

    font-size: 15px;
}



}


@media only screen and (max-width: 1235px) {
 
.profile-image
{
    left: 24%;
}


}

</style>