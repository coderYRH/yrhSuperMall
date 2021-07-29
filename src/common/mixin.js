import { debounce } from '@/common/util'


export const itemListenerMixin = {
    data() {
        return {
            itemImageListener: null,
        }
    },
    mounted() {
        //防抖动
        const refresh = debounce(this.$refs.scroll.refresh, 200);
        this.itemImageListener = () => {
            refresh();
        };
        this.$bus.$on("imageLoadItem", this.itemImageListener);
        console.log("mixin自动挂载");

    },
}

export const backTopMixin = {
    data() {
        return {
            isShowBackTop: false
        }
    },
    methods: {
        backClick() {
            this.$refs.scroll.scrollTo(0, 0);
        },

        backTopListener(position) {
            //监控什么时候显示回到顶部按钮
            this.isShowBackTop = -position.y > 1000;

        }
    },
}