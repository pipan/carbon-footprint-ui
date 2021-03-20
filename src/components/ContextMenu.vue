<template>
    <div @click.stop class="context">
        <div class="gap--s">
            <button @click="open()" class="btn btn--circle">
                <span class="material-icons">more_vert</span>
            </button>
        </div>
        <div class="context__menu abs abs--top abs--right" :class="{hide: !visible}">
            <div class="gap--s row right">
                <button @click="close()" class="btn btn--circle">
                    <span class="material-icons">more_vert</span>
                </button>
            </div>
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ContextMenu',
    props: ['opened'],
    data: function() {
        return {
            visible: false
        }
    },
    created: function () {
        if (!this.opened) {
            return;
        }
        this.open();
    },
    destroyed: function () {
        this.close();
    },
    methods: {
        open: function () {
            if (this.visible) {
                return;
            }
            this.visible = true
            document.addEventListener('click', this.close);
        },
        close: function () {
            if (!this.visible) {
                return;
            }
            this.visible = false;
            document.removeEventListener('click', this.close);
        }
    }
}
</script>

<style></style>
