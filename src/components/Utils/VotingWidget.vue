<template>
      <div class="post-rating">
      <div class="rate-components">
        <!-- <p>{{ ups }}</p>
        <p>{{ downs }}</p> -->
      
      <box-icon v-show="!ups" style="margin-bottom: 5px;" @click="upvoted" name='upvote'></box-icon>
      <box-icon v-show="ups" style="margin-bottom: 5px;"  @click="upvoted" type="solid" name='upvote'></box-icon>
      <span class="post-vote">{{ vote}}</span>
      <box-icon  v-show="downs" style=" margin-top:9px;" @click="downvoted"  type="solid" name='downvote'></box-icon>
      <box-icon  v-show="!downs"   style=" margin-top:9px;"  @click="downvoted"  name='downvote'></box-icon>
      </div>

    </div>
</template>

<script>
import { boolean } from 'webidl-conversions';

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
            downs:this.userdownvoted
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
            // this.upvote+=1;
            // this.ups=!this.ups;
            // this.downs=false;

            if(this.ups==true)
            {
              // console.log("upvote if")
              // this.upvote-=1;
              this.ups=false;
              this.$emit('upvote',{up:-1,dw:0});
            }
            else
            {
              // console.log("upvote else")
              // this.upvote+=1;
              if(this.downs) {
                // this.downvote-=1;
                this.$emit('upvote',{up:1,dw:-1});

              }
              else   this.$emit('upvote',{up:1,dw:0});
              this.ups=true
              this.downs=false
            
              
            }
            
          

        },
        downvoted()
        {
            // this.downvote+=1;
            // this.downs=!this.downs;
            //  this.ups=false;

             if(this.downs==true)
            {
              // console.log("upvote if")
              // this.downvote-=1;
              this.downs=false;
              this.$emit('downvote',{up:0,dw:-1});
            }
            else
            {
              // console.log("upvote else")
              // this.downvote+=1;
              if(this.ups){

              //  this.upvote-=1;
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