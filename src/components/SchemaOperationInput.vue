<template>
    <div>
        <input-swich-entity :options="operationOptions"
            :value="result"
            @change="change($event)"/>
    </div>
</template>

<script>
import InputSwichEntity from "./InputSwichEntity.vue";
export default {
    name: "SchemaOperationInput",
    components: { InputSwichEntity },
    props: {
        label: {
            type: String,
            default: 'Operation'
        },
        mode: {
            type: String,
            default: 'sign'
        },
        value: {
            type: String,
            default: '+'
        }
    },
    data: function () {
        return {
            innerValue: 0,
            operationOptions: [
                {
                    value: 1,
                    entity: '&plus;'
                },
                {
                    value: 2,
                    entity: '&times;'
                },
                {
                    value: 3,
                    entity: '&divide;'
                }
            ],
            operationMap: {
                1: {
                    sign: '+',
                    key: 'add'
                },
                2: {
                    sign: '*',
                    key: 'multiply'
                },
                3: {
                    sign: '/',
                    key: 'devide'
                }
            }
        }
    },
    computed: {
        valueNorm: function () {
            for (const [index, item] of Object.entries(this.operationMap)) {
                if (item[this.mode] === this.value) {
                    return index
                }
            }
            return 0
        },
        result: function () {
            if (this.innerValue) {
                return this.innerValue
            }
            return this.valueNorm
        }
    },
    methods: {
        change: function (value) {
            if (this.innerValue === value) {
                return
            }
            this.innerValue = value
            this.$emit('change', this.operationMap[value][this.mode])
        }
    }
};
</script>

<style></style>
