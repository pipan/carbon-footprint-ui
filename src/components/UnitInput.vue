<template>
    <div class="row">
        <input
            id="footprint-name"
            class="input"
            type="number"
            step="any"
            name="name"
            autocomplete="off"
            @input="onInputChange($event.target.value)"
            v-model="inputValue"
            v-app-autofocus="autofocus"/>
        <div class="gap-left--m" v-if="hasScales">
            <select
                v-model="scaleValue"
                @change="onSelectChange($event.target.value)">
                <option
                    v-for="scale of scales"
                    :key="scale.id"
                    :value="scale.id">{{ scale.label }}</option>
            </select>
        </div>
    </div>
</template>

<script>
export default {
    name: 'UnitInput',
    props: {
        unitId: [ Number, String ],
        value: [ Number, String ],
        autofocus: {
            type: Boolean,
            default: false
        }
    },
    data: function () {
        return {
            inputValue: 1,
            scaleValue: false,
        }
    },
    computed: {
        unit: function () {
            return this.$store.getters['unit/map'][this.unitId]
        },
        scales: function () {
            if (!this.unit) {
                return []
            }
            return this.unit.scales
        },
        hasScales: function () {
            return this.scales && this.scales.length > 1
        },
        selectedScale: function () {
            return this.$store.getters['unit/scaleMap'][this.scaleValue]
        }
    },
    watch: {
        scales: function (newValue) {
            console.log("scales")
            if (!newValue) {
                this.onSelectChange(false)
                return
            }
            this.onSelectChange(newValue[0].id)
        }
    },
    methods: {
        update: function () {
            this.inputValue = this.$options.filters.unitValue(this.value, this.unitId)
            this.scaleValue = this.$options.filters.unitLabelId(this.value, this.unitId)
        },
        notify: function () {
            if (!this.selectedScale) {
                this.$emit(this.inputValue)
                return
            }
            this.$emit('change', this.inputValue * this.selectedScale.multiplier / this.selectedScale.devider)
        },
        onInputChange: function (value) {
            value = parseFloat(value)
            this.inputValue = value
            this.notify()
        },
        onSelectChange: function (value) {
            this.scaleValue = value
            this.notify()
        }
    },
    created: function() {
        this.update()
    }
}
</script>

<style></style>
