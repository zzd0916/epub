<template>
    <div class="ebook">
        <TitleBar :ifTitleAndMenuShow="ifTitleAndMenuShow"></TitleBar>
        <div class="read-wrapper">
            <div id="read"></div>
            <div class="mask">
                <div class="left" @click="prevPage"></div>
                <div class="center" @click="toggleTitleAndMenuShow"></div>
                <div class="right" @click="nextPage"></div>
            </div>
        </div>
       <MenuBar :ifTitleAndMenuShow="ifTitleAndMenuShow" 
                :fontSizeList = "fontSizeList"
                :defaultFontSize = "defaultFontSize"
                :themeList = "themeList"
                :bookAvailable = "bookAvailable"
                :defaultTheme = "defaultTheme"
                :navigation = "navigation"
                @setFontSize = "setFontSize"
                @setTheme = "setTheme"
                @onProgressChange = "onProgressChange"
                @jumpTo = "jumpTo"
                ref="menuBar"></MenuBar>
  </div> 
</template>

<script>
import TitleBar from './components/TitleBar'
import MenuBar from './components/MenuBar'
//导入阅读器引擎
import Epub from 'epubjs'
// global.epub = Epub
const DOWNLOAD_URL = '/14818.epub'
export default {
    name:'ebook',
    props:[''],
    data () {
        return {
            ifTitleAndMenuShow: false,
            //字体列表
            fontSizeList:[
                {fontSize: 12},
                {fontSize: 14},
                {fontSize: 16},
                {fontSize: 18},
                {fontSize: 20},
                {fontSize: 22},
                {fontSize: 24},
            ],
            //默认颜色
            defaultFontSize: 14,
            //主题列表
            themeList:[
                {
                    name:'default',
                    style:{
                        body:{
                            'color': '#000',
                            'background': '#fff'
                        }
                    }
                },
                {
                    name:'eye',
                    style:{
                        body:{
                            'color': '#000',
                            'background': '#ceeaba'
                        }
                    }
                },
                {
                    name:'night',
                    style:{
                        body:{
                            'color': '#fff',
                            'background': '#000'
                        }
                    }
                },
                {
                    name:'gold',
                    style:{
                        body:{
                            'color': '#000',
                            'background': 'rgb(241,236,226)'
                        }
                    }
                }
            ],
            defaultTheme:0,
            //locations对象是否生成
            bookAvailable: false,
            navigation:{}
        };
    },

    components: {
        TitleBar,
        MenuBar
    },

    computed: {},

    beforeMount() {},

    mounted() {
        this.showEpub();
    },

    methods: {
        //电子书的解析与渲染
        showEpub(){
            //生成book
            this.book = new Epub(DOWNLOAD_URL)
            //生成Rendition para1 挂载id para2 options
            this.rendition = this.book.renderTo('read',{
                width: window.innerWidth,
                height: window.innerHeight,
            })
            
            //通过Renditon.display渲染电子书
            this.rendition.display();

            //获取Theme对象
            this.themes = this.rendition.themes;
            //设置默认字体大小
            this.setFontSize(this.defaultFontSize);

            //this.themes.register(name,styles) 将主题注册到themes里面
            //this.themes.select(name) 切换主题
            this.registerTheme();
            this.setTheme(this.defaultTheme);

            //获取location对象 this.book.locations 默认不会生成
            //通过epubjs 的钩子函数实现 locations 
            this.book.ready.then(()=>{
                this.navigation = this.book.navigation;
                return this.book.locations.generate(); //生成locations对象
            }).then((res) => {
                this.locations = this.book.locations;
                // this.onProgressChange(50)
                this.bookAvailable = true;
            })

           
        },
        //上一页
        prevPage(){
            if(this.ifTitleAndMenuShow){
                this.ifTitleAndMenuShow = false;
            }
            if(this.rendition)  this.rendition.prev();
        },
        //下一页
        nextPage(){
            if(this.ifTitleAndMenuShow){
                this.ifTitleAndMenuShow = false;
            }
            if(this.rendition) this.rendition.next();
        },
        toggleTitleAndMenuShow(){
            this.ifTitleAndMenuShow = !this.ifTitleAndMenuShow;
            if(!this.ifTitleAndMenuShow){
                this.$refs.menuBar.hideSetting();
            }
        },
        setFontSize(fontSize){
            this.defaultFontSize = fontSize;
            if(this.themes){
                this.themes.fontSize(fontSize + "px")
            }
        },
        //注册主题
        registerTheme(){
            this.themeList.forEach(theme => {
                this.themes.register(theme.name,theme.style);
            });
        },
        //切换主题
        setTheme(index){
            this.defaultTheme = index;
            this.themes.select(this.themeList[index].name);
        },
        //进度条变化 (0 -100 进度条变化)
        onProgressChange(progress){
            // console.log("进度条：" + progress)
            const percentage = progress /100;
            const location  = percentage > 0? this.locations.cfiFromPercentage(percentage) : 0;
            this.rendition.display(location);
        },
        //跳转目录
        jumpTo(href){
            this.rendition.display(href);
            this.hideTitleAndMenu();
        },
        hideTitleAndMenu(){
            this.ifTitleAndMenuShow = false;
        }
    },

    watch: {}

}

</script>

<style lang='scss' scoped>
@import './assets/styles/global';
.ebook{
    position: relative;
    .read-wrapper{
        .mask{
            position: absolute;
            top:0;
            left: 0;
            z-index: 100;
            display: flex;
            width: 100%;
            height: 100%;
            .left{
                flex: 0 0 px2rem(100);
            }
            .center{
                flex: 1;
            }
            .right{
                flex: 0 0 px2rem(100);
            }
        }
    }
}
</style>