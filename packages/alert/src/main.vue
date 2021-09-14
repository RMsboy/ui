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
            return `rm-alert-${this.type}`
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
            visible:true,
            closeable: false
        }
    }

}
</script>
<style scoped  lang="scss">
// .rm-alert{
//     display: flex;
//     align-items: center;
//     width: 500px;
//     .rm-alert-icon{
        
//     }
//     .rm-alert-content{
//         .rm-alert-title{
//             font-size: 18px;
//             margin: 0;
//         }
//         .rm-alert-descrition{
//             font-size: 14px;
//             margin: 5px;
//         }
//     }
// }
// .rm-alert--success{
//      background: $--alert-success-color;
// }
// .rm-icon-success{
//     color: #4bdf10;
// }
// .rm-alert--warning{
//      background: $--alert-warning-color;
// }
// .rm-icon-warning{
//     color: hsl(32, 87%, 47%);
// }
// .rm-alert--error{
//      background: $--alert-danger-color;
// }
// .rm-icon-error{
//     color: hsl(0, 92%, 49%);
// }
// .is-big{
//     font-size: 20px;
// }
@import "../../theme-chalk/mixins/mixins.scss";

@include b(alert){
    width: 100%;
    padding: $--alert-padding;
    margin: 0;
    box-sizing: border-box;
    border-radius: $--alert-border-radius;
    position: relative;
    background-color: $--color-white;
    overflow: hidden;
    opacity: 1;
    display: flex;
    align-items: center;
    transition: opacity .2s;

    @include when(light){
        .rm-alert-closebtn{
            color: $--color-text-placeholder;
        }
    }
    @include when(dark){
         .rm-alert-closebtn {
            color: $--color-white;
        }
         .rm-alert-description {
             color: $--color-white;
        }
    }
    @include when(center){
        justify-content: center;
    }
    @include m(success){
        &.is-light{
            background-color: $--alert-success-color;
            color:$--color-success;
            .el-alert-descripition{
                color:$--color-success;
            }
        }
        &.is-dark {
            background-color: $--color-success;
            color: $--color-white;
        }
    }
      @include m(warning){
        &.is-light{
            background-color: $--alert-warning-color;
            color:$--color-warning;
            .el-alert-descripition{
                color:$--color-warning;
            }
        }
        &.is-dark {
            background-color: $--color-warning;
            color: $--color-white;
        }
    }
      @include m(error){
        &.is-light{
            background-color: $--alert-danger-color;
            color:$--color-danger;
            .el-alert-descripition{
                color:$--color-danger;
            }
        }
        &.is-dark {
            background-color: $--color-danger;
            color: $--color-white;
        }
    }
}
</style>