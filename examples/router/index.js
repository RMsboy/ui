import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

let router = new VueRouter({
    routes:[
        {path:'/yifan',name:'yifan',component:()=>import('../components/test-one.vue')},
        {path:'/yihua',name:'yihua',component:()=>import('../components/yihua-test.vue')}
    ]
})
export default router