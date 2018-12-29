<template>
  <transition name="slide-right">
      <div class="content">
          <div class="content-wrapper" v-if="bookAvailable">
              <div class="content-item" v-for="(item,index) in navigation.toc" 
                        @click="jumpTo(item.href)"
                        :key="index">
                <span class="text">{{item.label}}</span>

              </div>
          </div>
          <div class="empty" v-else>
              加载中...
          </div>
      </div>
  </transition>
</template>

<script>

  export default {
    name:'',
    props:{
        ifShowContent: {
            type: Boolean,
            default: false
        },
        navigation: Object,
        bookAvailable: Boolean
    },
    data () {
      return {

      };
    },

    components: {},

    computed: {},

    beforeMount() {},

    mounted() {
       
    },

    methods: {
        jumpTo(target){
            this.$emit('jumpTo',target)
        }
    },

    watch: {}

  }

</script>
<style lang='scss' scoped>
@import '../assets/styles/global';
.content{
    position: absolute;
    top: 0;
    left: 0;
    z-index: 102;
    width: 80%;
    height: 100%;
    background: #fff;
    .content-wrapper{
        display: flex;
        flex-direction: column;
        padding:  0 0 0 px2rem(20);
        box-sizing: border-box;
        height: 100%;
        overflow: auto;
        .content-item{
            display: flex;
            height: px2rem(30);
            margin: 0 0 px2rem(4) 0;
            align-items: center;
            .text{
                font-size: px2rem(14);
            }
        }
    }
    .empty{
        display: flex;
        width: 100%;
        height: 100%;
        font-size: px2rem(24);
        @include center;
    }
}
</style>