<template>
      <div class="post-rating">
      <div class="rate-components">

        <img src="@/assets/upvote.svg" alt="Icon" v-show="!ups" style="margin-bottom: 5px;" @click="upvoted"/> 
        <img src="@/assets/upvote-solid.svg" alt="Icon" v-show="ups" style="margin-bottom: 5px;" @click="upvoted"/> 



      <span class="post-vote">{{ vote}}</span>
    

      <img src="@/assets/downvote-solid.svg" alt="Icon" v-show="downs" style=" margin-top:9px;" @click="downvoted" /> 
      <img src="@/assets/downvote.svg" alt="Icon" v-show="!downs" style=" margin-top:9px;" @click="downvoted" /> 




      </div>

    </div>
</template>

<script>
import { boolean } from 'webidl-conversions';

// const icons={
//   'home':bxChild
// }

export default {
    name:'VotingWidget',
    data()
    {
        return{
            upvote:0,
            downvote:0,
            upvotetype:'',
            downvotetype:'',
            ups:this.userupvoted,
            downs:this.userdownvoted,
        
 
        }
    },
    props:{
      vote:{
        type:Number,
        default:0
      },
      userupvoted:{
        type:boolean,
        default:false
      },
      userdownvoted:{
        type:boolean,
        default:false
      }

    },
    computed:{

    },
    methods:{
        upvoted()
        {
         
            if(this.ups==true)
            {
      
              this.ups=false;
              this.$emit('upvote',{up:-1,dw:0});
            }
            else
            {
    
              if(this.downs) {
          
                this.$emit('upvote',{up:1,dw:-1});

              }
              else   this.$emit('upvote',{up:1,dw:0});
              this.ups=true
              this.downs=false
            
              
            }
            
          

        },
        downvoted()
        {
           

             if(this.downs==true)
            {
       
              this.downs=false;
              this.$emit('downvote',{up:0,dw:-1});
            }
            else
            {
    
              if(this.ups){

        
               this.$emit('downvote',{up:-1,dw:1});

              }
              else this.$emit('downvote',{up:0,dw:1});
              this.downs=true
              this.ups=false
              

            }
            
       
        }
    }

    

}
</script>

<style>
#up
{
    border:1px solid red
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


.post-vote
{
  font-weight: bold;
  font-size: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
 
}


@media only screen and (max-width: 585px) {
 
  .post-rating
  {

    width: 10%;
  }
 

}




</style>