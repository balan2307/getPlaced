<template>

<div class="paginationComponents">

<ul>
    <li v-for="(page,index) in pages" :key="index"  :class="currentpage == (index+1) ? 'activepage' : ''">
        <router-link :class="currentpage == (index+1) ? 'linkactive' : ''"  :to="pageLink(index)"  >{{index+1}}</router-link>

    </li>
</ul>



</div>
  
</template>

<script>
export default {
    name:'PaginationSection',
    props:['pages'],
    data()
    {
        return{
            currentpage: this.$route.query.page || 1
        }

    },
    methods:{
        pageLink(index) {
      return `${this.$route.path}?page=${index + 1}`;
    }
    }
  
}
</script>

<style scoped>


#displayallposts{
    margin-top: 10px;


}

#tab span,#tab a{
    width: 100%;
    display: inline-block;
}

.paginationComponents
{
    display: flex;
    justify-content: center;
}

.paginationComponents ul
{
    /* border: 1px solid red; */
    list-style: none;
    display: flex;
    padding: 0;

    
    

}
.paginationComponents li
{
    /* border: 1px solid rgb(29, 19, 19); */
    padding: 8px;
    border: 1px solid #bbaaaa;
    background-color: white;



}

.paginationComponents li:hover
{
    /* border: 1px solid rgb(29, 19, 19); */

    background-color: rgb(224, 216, 216);

    color: white;



}

.activepage{
    background-color:#b7b7b7!important;
}
.linkactive
{
    color:white;
}
a{
    color:black;
}

a:hover{
    text-decoration: none;
    color: white;

}


</style>