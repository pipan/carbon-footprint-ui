<template>
    <div class="row top interactive" :class="{'interactive--disabled': disabled}" @click="select()">
        <button class="btn btn--drag">
            <span class="material-icons md-18">drag_indicator</span>
        </button>
        <div class="column flex gap-left--s">
            <div class="row space-between gap-v--s">
                <div class="row middle">
                    <operation-tag v-if="hasOperation"
                        class="gap-right--s"
                        :value="operation"/>
                    <div class="gap-right--m thin">{{ item.name }}</div>
                </div>
                <div class="tag tag--secondary tag--transparent">{{ item.tag }}</div>
            </div>
            <div class="row gap-bottom--s small" v-if="hasInputs">
                <input-button v-for="input of item.inputs"
                    :key="input.id"
                    :name="input.primary"
                    :secondary="input.secondary"
                    :disabled="disabled"
                    @click="selectInput(input)"/>
            </div>
        </div>
    </div>
</template>

<script>
import InputButton from './InputButton.vue';
import OperationTag from './OperationTag.vue';

export default {
    name: 'SchemaStackItem',
    components: { InputButton, OperationTag },
    props: {
        item: [ Object ],
        operation: {
            type: [ String ],
            default: ''
        },
        reference: [ String ],
        disabled: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        type: function () {
            if (typeof this.item === 'string' || this.item instanceof String) {
                let parts = this.item.split(":")
                return parts[0]
            }
            return this.item.type
        },
        hasOperation: function () {
            return this.operation !== ''
        },
        hasInputs: function () {
            return this.item.inputs.length > 0
        }
    },
    methods: {
        getInputSecondary: function (inputId) {
            let inputReference = this.item.inputs[inputId]
            if (!inputReference) {
                return 'default'
            }

            let referenceSchema = this.$store.getters['draft/reference'](this.componentIndex, inputReference)
            if (!referenceSchema || referenceSchema.default) {
                return 'default'
            }
            
            return 'custom'
        },
        select: function () {
            if (this.disabled) {
                return
            }
            this.$emit('selectItem', this.reference)
        },
        selectInput: function (input) {
            if (this.disabled) {
                return
            }
            this.$emit('selectInput', input)
        }
    }
}
</script>

<style></style>
