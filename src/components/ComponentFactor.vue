<template>
    <div class="row middle interactive" @click="$emit('click', $event)">
        <button class="btn btn--drag">
            <span class="material-icons">drag_indicator</span>
        </button>
        <div class="row flex space-between gap-left--s">
            <div class="row middle">
                <div class="gap-right--s" v-if="hasOperation">
                    <div class="tag tag--square tag--blue" v-if="isMultiplication">
                        <span class="entity-icon entity-icon--m">&times;</span>
                    </div>
                    <div class="tag tag--square tag--teal" v-if="isAddition">
                        <span class="entity-icon entity-icon--m">&plus;</span>
                    </div>
                    <div class="tag tag--square tag--green" v-if="isDivision">
                        <span class="entity-icon entity-icon--m">&divide;</span>
                    </div>
                </div>
                <div class="gap-right--m thin">{{ name }}</div>
            </div>
            <div class="tag tag--secondary">{{ tag }}</div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ComponentFactor',
    props: {
        item: [ Object, String ],
        operation: {
            type: [String, Boolean ],
            default: false
        }
    },
    computed: {
        tag: function () {
            if (typeof this.item === 'string' || this.item instanceof String) {
                let parts = this.item.split(":")
                return parts[0]
            }
            return this.item.type
        },
        name: function () {
            if (typeof this.item === 'string' || this.item instanceof String) {
                let parts = this.item.split(":")
                return parts[1]
            }
            return this.item.value
        },
        isMultiplication: function () {
            return this.operation === '*'
        },
        isAddition: function () {
            return this.operation === '+'
        },
        isDivision: function () {
            return this.operation === '/'
        },
        hasOperation: function () {
            return this.operation !== false
        }
    },
    methods: {
        select: function (value) {
            if (value === this.value) {
                return
            }
            this.$emit('change', value)
        }
    }
}
</script>

<style></style>
