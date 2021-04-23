<template>
    <header-layout
        title="500"
        :back-url="{ name: 'index' }">
        <div style="height: calc(100vh - 66px)">
            <div class="container">
                <div class="column center" style="position:relative; top: 160px">
                    <img src="/image/500.svg" />
                    <div class="thin gap-top--l">{{ description }}</div>
                </div>
            </div>
            <div class="abs abs--bottom abs--left abs--right gap--l">
                <app-logo/>
            </div>
        </div>
    </header-layout>
</template>

<script>
import AppLogo from '../components/AppLogo.vue';
import HeaderLayout from './layouts/HeaderLayout.vue';
export default {
    name: "ServerError",
    components: { AppLogo, HeaderLayout },
    props: {
        description: {
            type: String,
            default: 'Something went wrong'
        }
    }
};
</script>

<style></style>
