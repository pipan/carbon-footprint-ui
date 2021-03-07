<template>
    <div>
        <div class="container">
            <app-context></app-context>
            <div class="column center" style="position:relative; top: 160px">
                <img src="/image/404.svg" />
                <div class="thin gap-top--l">Page you are looking for had not been found</div>
            </div>
        </div>
        <div class="abs abs--bottom abs--left abs--right gap--l">
            <logo></logo>
        </div>
    </div>
</template>

<script>
import AppContext from '../components/AppContext.vue';
import Logo from '../components/Logo.vue';
export default {
  name: "NotFound",
  components: { AppContext, Logo },
};
</script>

<style></style>
