<template>
    <div class="row">
        <input
            id="footprint-name"
            class="input"
            type="text"
            step="any"
            name="name"
            autocomplete="off"
            @input="onInputChange($event.target.value)"
            v-model="inputValue" />
        <div class="gap-left--m" v-if="hasScales">
            <select
                v-model="selectValue"
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
        value: [ Number, String ]
    },
    data: function () {
        return {
            inputValue: this.$options.filters.unitValue(this.value, this.unitId),
            selectValue: this.$options.filters.unitLabelId(this.value, this.unitId),
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
            return this.$store.getters['unit/scaleMap'][this.selectValue]
        }
    },
    watch: {
        scales: function (newValue) {
            let isSelectedValueValid = false
            for (let scale of newValue) {
                if (scale.id === this.selectValue) {
                    isSelectedValueValid = true
                }
            }
            if (!isSelectedValueValid) {
                this.selectValue = newValue[0].id
            }
        }
    },
    methods: {
        onInputChange: function (value) {
            value = parseFloat(value)
            if (!this.selectedScale) {
                this.change(value)
                return
            }
            this.change(value * this.selectedScale.multiplier)
        },
        onSelectChange: function () {
            if (!this.selectedScale) {
                this.change(this.inputValue)
                return
            }
            this.change(this.inputValue * this.selectedScale.multiplier)
        },
        change: function (value) {
            this.$emit('change', value)
        }
    }
}
</script>

<style></style>
