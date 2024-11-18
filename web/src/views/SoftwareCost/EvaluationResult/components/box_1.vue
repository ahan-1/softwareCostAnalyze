<script>
/**
 * 盒子
 *  */
import {
    defineComponent,
    ref,
    getCurrentInstance,
    reactive,
    toRef,
    computed,
    onMounted,
    onActivated,
    watch,
} from 'vue';

export default defineComponent({
    components: {},
    props: {
        dataInfo: {
            type: Object,
            default: () => {
                return {};
            },
        },
    },
    setup(props) {
        const dataContainer = reactive({
            loading: false,
        });
        watch(
            [toRef(props, 'dataInfo')],
            () => {
                return;
                let dataInfo = props.dataInfo.data || [];
            },
            {
                immediate: true,
            },
        );
        return {
            dataContainer,
        };
    },
});
</script>

<template>
    <div class="box-cp-container">
        <div class="container">

        </div>
    </div>
</template>

<style lang="scss" scoped>
.box-cp-container {
    width: 100%;
    height: 100%;
    padding: 0.938rem;
    box-sizing: border-box;
    > .container {
        background-color: rgba(0, 128, 255, 0.313);
        width: 100%;
        height: 100%;
        font-size: 1.25rem;
        color: white;
        padding: 0.938rem;
        box-sizing: border-box;
        border-radius: 0.5rem;
        > * {
            margin: 0 15px 0 0;
            line-height: 1.2;
            &:last-child {
                margin: 0;
            }
        }
    }
}
</style>
