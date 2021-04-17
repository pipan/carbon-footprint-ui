<template>
    <div>
        <div class="tag tag--square" :class="colorClass">
            <span class="entity-icon entity-icon--m" v-html="entity"></span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'OperationTag',
    components: {},
    props: {
        value: {
            type: [ String ],
            default: ''
        }
    },
    data: function () {
        return {
            types: {
                '*': {
                    name: 'multiply',
                    entity: '&times;',
                    colorClass: 'tag--blue'
                },
                '/': {
                    name: 'divide',
                    entity: '&divide;',
                    colorClass: 'tag--green'
                },
                '+': {
                    name: 'add',
                    entity: '&plus;',
                    colorClass: 'tag--teal'
                }
            }
        }
    },
    computed: {
        type: function () {
            if (!this.types[this.value]) {
                return false
            }
            return this.types[this.value]
        },
        entity: function () {
            if (!this.type) {
                return ''
            }
            return this.type.entity
        },
        colorClass: function () {
            if (!this.type) {
                return ''
            }
            return this.type.colorClass
        }
    }
}
</script>

<style></style>
