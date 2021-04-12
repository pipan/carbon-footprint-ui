<template>
    <div class="row top interactive" :class="{'interactive--disabled': disabled}" @click="select()">
        <button class="btn btn--drag">
            <span class="material-icons md-18">drag_indicator</span>
        </button>
        <div class="column flex gap-left--s">
            <div class="row space-between gap-v--s">
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
            <div class="row gap-bottom--s small" v-if="hasInputs">
                <input-button v-for="(input, index) of item.model.inputs"
                    :key="index"
                    :name="input.name"
                    :secondary="getInputSecondary(input.id)"
                    :disabled="disabled"
                    @click="selectInput(input.id)"/>
            </div>
        </div>
    </div>
</template>

<script>
import InputButton from './InputButton.vue';

class DefaultType {
    getTag(item) {
        if (typeof item === 'string' || item instanceof String) {
            let parts = item.split(":")
            return parts[0]
        }
        return item.type
    }

    getName(item) {
        if (typeof item === 'string' || item instanceof String) {
            let parts = item.split(":")
            return parts[1]
        }
        return item.value
    }
}

class ComponentType {
    getTag() {
        return 'function'
    }

    getName(item) {
        return item.model.name
    }
}

export default {
    name: 'ComponentFactor',
    components: { InputButton },
    props: {
        item: [ Object, String ],
        operation: {
            type: [String, Boolean ],
            default: false
        },
        componentIndex: [ String, Number ],
        disabled: {
            type: Boolean,
            default: false
        }
    },
    data: function () {
        return {
            adapters: {
                default: new DefaultType(),
                function: new ComponentType()
            }
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
        tag: function () {
            if (this.adapters[this.type]) {
                return this.adapters[this.type].getTag(this.item)
            }
            return this.adapters.default.getTag(this.item)
        },
        name: function () {
            if (this.adapters[this.type]) {
                return this.adapters[this.type].getName(this.item)
            }
            return this.adapters.default.getName(this.item)
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
        },
        hasInputs: function () {
            return this.type === 'function' && this.item.model.inputs.length > 0
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
            this.$emit('select')
        },
        selectInput: function (inputId) {
            if (this.disabled) {
                return
            }
            this.$emit('selectInput', inputId)
        }
    }
}
</script>

<style></style>
