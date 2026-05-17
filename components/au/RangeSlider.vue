<template>
  <div :class="classObject">
    <div class="range-slider-box" :class="{ 'dots-reverse': value[1] < max }">
      <vue-slider
        v-model="model"
        :min="min"
        :max="max"
        :enable-cross="false"
        :interval="interval"
        :height="2"
        tooltip="none"
      >
        <!--<template #dot="{ index }">
          <div
            class="vue-slider-dot dot"
            v-if="index === 0"
          />

          <div
            class="vue-slider-dot dot right"
            v-else-if="index === 1"
          />
        </template>-->
      </vue-slider>
    </div>
  </div>
</template>

<script>
import VueSlider from 'vue-slider-component/dist-css/vue-slider-component.umd.min';

export default {
  name: 'au-range-slider',

  components: {
    VueSlider,
  },

  props: {
    value: {
      type: [Array, Number],
      default: null,
    },
    min: {
      type: Number,
      default: 0,
    },
    max: {
      type: Number,
      default: 0,
    },
    interval: {
      type: Number,
      default: 1,
    },
    label: {
      type: String,
      default: null,
    },
    tooltip: {
      type: String,
      default: null,
    },

    required: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    inline: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    classObject() {
      return [
        this.$options.name,
        {
          'is-disabled': this.disabled,
          'is-single': this.isSingle,
          inline: this.inline,
        },
      ];
    },

    model: {
      get() {
        return this.value;
      },

      set(newValue) {
        this.$emit('input', newValue);
      },
    },

    isSingle() {
      return typeof this.value === 'number';
    },
  },

  methods: {
    onInputSingle(value) {
      const result = parseInt(value);
      if (!Number.isInteger(result)) {
        this.$emit('input', this.min);
        return;
      }

      if (result === this.value) return;

      if (result > this.max) this.$emit('input', this.max);
      if (result < this.min) this.$emit('input', this.min);
      this.$emit('input', result);
    },

    onInputValue(value = 0, index) {
      const arr = [...this.value];

      if (
        index === 0 &&
        (!value ||
          value <= this.min ||
          value >= this.max ||
          !Number.isInteger(value))
      ) {
        arr[index] = this.min;
      } else if (
        index === 1 &&
        (!value ||
          value >= this.max ||
          value <= this.min ||
          !Number.isInteger(value))
      ) {
        arr[index] = this.max;
      } else {
        arr[index] = value;
      }

      this.$emit('input', arr);
    },
  },
};
</script>

<style lang="scss" scoped>
// Default styles
::v-deep {
  .vue-slider-dot {
    position: absolute;
    z-index: 4;
    -webkit-transition: all 0s;
    transition: all 0s;

    &:last-child {
      z-index: 3;
    }
  }

  .vue-slider-dot:focus {
    outline: none;
  }

  .vue-slider-dot-tooltip {
    position: absolute;
    visibility: hidden;
  }

  .vue-slider-dot-hover:hover .vue-slider-dot-tooltip,
  .vue-slider-dot-tooltip-show {
    visibility: visible;
  }

  .vue-slider-dot-tooltip-top {
    top: -10px;
    left: 50%;
    -webkit-transform: translate(-50%, -100%);
    transform: translate(-50%, -100%);
  }

  .vue-slider-dot-tooltip-bottom {
    left: 50%;
    bottom: -10px;
    -webkit-transform: translate(-50%, 100%);
    transform: translate(-50%, 100%);
  }

  .vue-slider-dot-tooltip-left {
    top: 50%;
    left: -10px;
    -webkit-transform: translate(-100%, -50%);
    transform: translate(-100%, -50%);
  }

  .vue-slider-dot-tooltip-right {
    top: 50%;
    right: -10px;
    -webkit-transform: translate(100%, -50%);
    transform: translate(100%, -50%);
  }

  .vue-slider-marks {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .vue-slider-mark {
    position: absolute;
    z-index: 1;
  }

  .vue-slider-ltr .vue-slider-mark,
  .vue-slider-rtl .vue-slider-mark {
    top: 50%;
    width: 0;
    height: 100%;
  }

  .vue-slider-ltr .vue-slider-mark-step,
  .vue-slider-rtl .vue-slider-mark-step {
    top: 0;
  }

  .vue-slider-ltr .vue-slider-mark-label,
  .vue-slider-rtl .vue-slider-mark-label {
    top: 100%;
    margin-top: 10px;
  }

  .vue-slider-ltr .vue-slider-mark {
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
  }

  .vue-slider-ltr .vue-slider-mark-step {
    left: 0;
  }

  .vue-slider-ltr .vue-slider-mark-label {
    left: 50%;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);
  }

  .vue-slider-rtl .vue-slider-mark {
    -webkit-transform: translate(50%, -50%);
    transform: translate(50%, -50%);
  }

  .vue-slider-rtl .vue-slider-mark-step {
    right: 0;
  }

  .vue-slider-rtl .vue-slider-mark-label {
    right: 50%;
    -webkit-transform: translateX(50%);
    transform: translateX(50%);
  }

  .vue-slider-btt .vue-slider-mark,
  .vue-slider-ttb .vue-slider-mark {
    left: 50%;
    width: 100%;
    height: 0;
  }

  .vue-slider-btt .vue-slider-mark-step,
  .vue-slider-ttb .vue-slider-mark-step {
    left: 0;
  }

  .vue-slider-btt .vue-slider-mark-label,
  .vue-slider-ttb .vue-slider-mark-label {
    left: 100%;
    margin-left: 10px;
  }

  .vue-slider-btt .vue-slider-mark {
    -webkit-transform: translate(-50%, 50%);
    transform: translate(-50%, 50%);
  }

  .vue-slider-btt .vue-slider-mark-step {
    top: 0;
  }

  .vue-slider-btt .vue-slider-mark-label {
    top: 50%;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
  }

  .vue-slider-ttb .vue-slider-mark {
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
  }

  .vue-slider-ttb .vue-slider-mark-step {
    bottom: 0;
  }

  .vue-slider-ttb .vue-slider-mark-label {
    bottom: 50%;
    -webkit-transform: translateY(50%);
    transform: translateY(50%);
  }

  .vue-slider-mark-label,
  .vue-slider-mark-step {
    position: absolute;
  }

  .vue-slider {
    position: relative;
    display: block;
    -webkit-box-sizing: content-box;
    box-sizing: content-box;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }

  .vue-slider-rail {
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: 2px;
    background-color: rgba(255, 255, 255, 0.1);
    -webkit-transition-property: width, height, left, right, top, bottom;
    transition-property: width, height, left, right, top, bottom;
  }

  .vue-slider-process {
    border-radius: 2px;
    position: absolute;
    z-index: 1;
  }
}

.dots-reverse {
  ::v-deep {
    .vue-slider-dot:last-child {
      z-index: 4;
    }
  }
}

// Custom styles
.au-range-slider {
  display: flex;
  flex-direction: column;
  width: 100%;
  font-family: inherit;

  // Component Styles
  .range-slider-box {
    display: flex;
    align-items: center;
    width: 100%;
    height: 32px;
    padding: 0 0;
    font-size: 13px;
    border-radius: 2px;
  }

  .range-slider-min {
    min-width: 7px;
    margin-right: 12px;
    text-align: left;
  }

  .range-slider-max {
    min-width: 14px;
    margin-left: 12px;
    text-align: right;
  }

  // New styles
  .range-value {
    flex: 0 0 auto;
    width: 44px;
  }

  &.inline {
    flex-direction: row;
    align-items: center;
    width: auto;
    min-width: 380px;

    .au-control-label {
      margin-bottom: 0;
      margin-right: 8px;
    }

    .range-value {
      margin-right: 8px;
    }
  }

  // vue-slider-component styles
  &::v-deep {
    .vue-slider {
      width: 100% !important;
    }

    .vue-slider-dot {
      width: 28px !important;
      height: 28px !important;
      background-color: white;
      border-radius: 50%;
      cursor: pointer;
    }

    .vue-slider-process {
      background-color: white;
    }
  }

  &::v-deep.is-disabled {
    user-select: none;
    pointer-events: none;

    .vue-slider-dot {
      border-color: #888;
    }

    .vue-slider-process {
      background-color: #888;
    }

    .vue-slider-rail {
      background-color: #888;
    }
  }
}
</style>
