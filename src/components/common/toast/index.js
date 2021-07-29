
import Toast from './Toast'
const obj = {
}

obj.install = function (Vue) {
    //1.创建构造器
    const toastContrustor = Vue.extend(Toast)


    //2.new 的方式 根据构造器 创建一个新的 组件对下
    const toast = new toastContrustor()

    //3.将创建的组件对象手动的挂在到某一元素上
    toast.$mount(document.createElement('div'))
    //4.toast.$el对应的就是div   
    document.body.appendChild(toast.$el)

    Vue.prototype.$toast = toast

}



export default obj