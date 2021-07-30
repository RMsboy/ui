<template>
    <transition name="rm-alert-fade">
        <div 
        class="rm-alert"
        :class="[typeClass,center?'is-center':'','is-'+effect]"
        >
        <i class="rm-alert-icon" :class="[iconClass,isBigIcon ]" v-if="showIcon"></i>
        <div class="rm-alert-content">
            <span class="rm-alert-title" :class="[isBoldTitle]" v-if="title || $slots.title">
                <slot name="title">{{title}}</slot>
            </span>
            <p class="rm-alert-descrition" v-if="$slots.default && !description"><slot></slot></p>
            <p class="rm-alert-descrition" v-if="description && !$slots.default">{{ description }}</p>
            <i classs="rm-alert-closebtn" :class="{ 'is-customed' : closeText !== '','rm-icon-close':closeText === ''}" v-show="closeable" @click="close()">{{closeText}}</i>
        </div>
        </div>
    </transition>
</template>
<script>
const TYPE_CLASSES_MAP={
    'success':'rm-icon-success',
    'warning': 'rm-icon-warning',
    'error': 'rm-icon-error'
}
export default {
    name:'RmAlert',
    props:{
        type:{
            type:String,
            default:''
        },
        center:Boolean,
        effect:{
            type:String,
            default:'light',
            validator:function(value){
                return ['light','dark'].indexOf(value) !== -1;
            }
        },
        description: {
            type: String,
            default: ''
        },
        showIcon: Boolean,
        closable:{
            type:Boolean,
            default:true
        },
        closeText:{
            type:String,
            default:''
        },
        title:{
            type:String,
            default:''
        }
    },
    computed:{
        typeClass(){
            return `rm-alert--${this.type}`
        },
        iconClass(){
            return TYPE_CLASSES_MAP[this.type] || 'rm-icon-info';
        },
        isBigIcon(){
            return this.description || this.$slots.default ? 'is-big' : '';
        },
        isBoldTitle(){
            return this.description || this.$slots.default ? 'is-bold' : '';
        }
    },
    methods:{
        close(){
            this.visible = false ;
            this.$emit('close')
        }
    },
    data(){
        return{
            visible:true
        }
    }

}
</script>
<style scoped  lang="scss">
.rm-alert{

}

</style>