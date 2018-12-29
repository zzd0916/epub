<template>
   <transition name="slide-down">
        <div class="title-wrapper" v-show="ifTitleAndMenuShow">
            <div class="left">
                <span class="icon-back icon"></span>
            </div>
            <div class="right">
                <div class="icon-wrapper">    
                    <span class="icon-user icon"></span>
                </div>  
                <div class="icon-wrapper">    
                    <span class="icon-quit icon"></span>
                </div>  
            </div>
        </div>
    </transition>
</template>

<script>

  export default {
    name:'',
    props:{
        ifTitleAndMenuShow: {
          type: Boolean,
          default: false
        }
    },
    data () {
      return {

      };
    },

    components: {},

    computed: {},

    beforeMount() {},

    mounted() {},

    methods: {},

    watch: {}

  }

</script>
<style lang='scss' scoped>
@import '../assets/styles/global';
.title-wrapper{
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    width: 100%;
    height: px2rem(48);
    z-index: 101;
    background: white;
    box-shadow: 0 px2rem(8) px2rem(8) rgba(0,0,0,.15);
    .left{
        flex: 0 0 px2rem(60);
        @include center;
        .icon-back{
            font-size: px2rem(14);
        }
    }
    .right{
        flex: 1;
        display: flex;
        justify-content: flex-end;
        .icon-wrapper{
            flex: 0 0 px2rem(40);
            @include center;
            .icon-user{
                font-size: px2rem(24);
            }
            .icon-quit{
                font-size: px2rem(20);
            }
        }
    }
}
</style>