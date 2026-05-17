<template>
  <div
    :class="componentClasses"
    @click="$emit('click', $event)"
    @mouseover="$emit('mouseover', $event)"
    @mouseenter="$emit('mouseenter', $event)"
    @mouseleave="$emit('mouseleave', $event)"
    @mousemove="$emit('mousemove', $event)"
  >
    <div
      :class="{ 'has-icon': !!icon || $slots.icon }"
      class="au-input-content"
    >
      <slot name="icon" />

      <AuIcon
        v-if="icon"
        class="au-select-icon"
        :icon="icon"
        :size="iconSize"
        :class="{ 'au-icon-error': hasErrors }"
      />

      <input
        ref="input"
        :type="type"
        :placeholder="placeholder"
        :name="name"
        :required="required"
        :value="value"
        :disabled="disabled || readonly"
        :maxlength="maxlength"
        :min="min"
        :max="max"
        autocomplete="off"
        @change="onChange"
        @input="onInput"
        @focus="onFocus"
        @focusin="onFocusin"
        @focusout="onFocusout"
        @keyup.enter="$emit('keyup-enter')"
      />

      <AuIcon
        v-if="clearable && value"
        class="au-input-clear fake-link"
        icon="sprite-close"
        :size="clearIconSize"
        @click.native.stop="onClear"
      />

      <slot name="postfix" />
    </div>
  </div>
</template>

<script>
import uniqueId from 'lodash/uniqueId';

export default {
  name: 'au-input',

  model: {
    prop: 'value',
    event: 'input',
  },

  props: {
    value: {
      type: [String, Number, Array],
      default: null,
    },
    placeholder: {
      type: String,
      default: null,
    },
    name: {
      type: String,
      default: uniqueId(),
    },
    inputErrors: {
      type: Array,
      default: () => [],
    },
    type: {
      type: String,
      default: 'text',
    },
    maxlength: {
      type: Number,
      default: null,
    },
    icon: {
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
    readonly: {
      type: Boolean,
      default: false,
    },
    autofocus: {
      type: Boolean,
      default: false,
    },
    clearable: {
      type: Boolean,
      default: false,
    },

    fullWidth: {
      type: Boolean,
      default: false,
    },
    small: {
      type: Boolean,
      default: false,
    },
    emitEvent: {
      type: Boolean,
      default: false,
    },
    min: {
      type: [Number, String],
      default: null,
    },
    max: {
      type: [Number, String],
      default: null,
    },
  },

  data: () => ({
    isFocused: false,
    nextItemText: null,
  }),

  computed: {
    componentClasses() {
      return [
        this.$options.name,
        {
          'is-focused': this.isFocused,
          'is-full-width': this.fullWidth,
          'is-small': this.small,
          'is-disabled': this.disabled,
          'is-error': this.hasErrors,
          'has-postfix': this.$slots.postfix,
        },
      ];
    },

    iconSize() {
      if (this.small) return 16;

      return 20;
    },

    clearIconSize() {
      if (this.small) return 14;

      return 16;
    },

    hasErrors() {
      return this.inputErrors?.length;
    },
  },

  mounted() {
    if (this.autofocus) {
      this.$nextTick(() => {
        this.$refs.input.focus();
      });
    }
  },

  methods: {
    onClick(event) {
      if (this.emitEvent) this.$emit('click', event);
    },

    onInput(event) {
      if (this.emitEvent) this.$emit('input', event);
      else this.$emit('input', event.target.value);
    },

    onClear(event) {
      if (this.emitEvent) this.$emit('input', event);
      else this.$emit('input', null);
      this.$emit('clear');
    },

    onChange(event) {
      if (this.emitEvent) this.$emit('change', event);
      else this.$emit('change', event.target.value);
    },

    onFocus(event) {
      if (this.emitEvent) this.$emit('focus', event);
      else this.$emit('focus', event.target.value);
    },

    onFocusin(event) {
      this.isFocused = true;
      if (this.emitEvent) this.$emit('focus', event);
      else {
        this.$emit('focusin');
      }
    },

    onFocusout(event) {
      this.isFocused = false;
      if (this.emitEvent) this.$emit('focusout', event);
      else {
        this.$emit('focusout');
      }
    },

    addNextItem() {
      if (!this.nextItemText) return;

      if (Array.isArray(this.value)) {
        const arr = [...this.value];

        arr.push(this.nextItemText);
        this.$emit('input', arr);

        this.nextItemText = null;
      } else {
        this.$emit('input', [this.nextItemText]);
        this.nextItemText = null;
      }
    },

    removeChip(index) {
      if (this.disabled || this.readonly) return;

      if (Array.isArray(this.value)) {
        const arr = [...this.value];

        arr.splice(index, 1);
        this.$emit('input', arr);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.au-input {
  position: relative;
  display: flex;
  flex-direction: column;

  .au-input-content {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    height: 36px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    padding: 0 8px 0 12px;
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 6px;
    transition: border-color linear 0.15s;

    &.has-icon {
      padding-left: 32px;
    }

    .au-select-icon {
      position: absolute;
      left: 7px;
    }
  }

  input {
    width: 100%;
    height: 100%;
    border: none;
    background-color: transparent;
    font-size: 16px;
    font-weight: 400;
    outline: none;

    &::placeholder {
      color: rgba(255, 255, 255, 0.6);
      font-weight: normal;
    }

    &[disabled] {
      pointer-events: none;
    }
  }

  &.is-disabled {
    opacity: 0.5;
    cursor: not-allowed;

    .au-input-clear {
      user-select: none;
    }
  }

  &.is-error {
    .au-input-content {
      border: 1px solid #dc2821;
      background-color: #fff1f0;
    }
  }

  &.is-focused {
    .au-input-content {
      border-color: rgba(255, 255, 255, 0.4);
    }
  }

  &.is-full-width {
    width: 100%;
  }

  &.is-small {
    .au-input-content {
      height: 24px;
      padding: 0 10px;
      border-radius: 4px;

      &.has-icon {
        padding-left: 26px;
      }

      .au-select-icon {
        position: absolute;
        top: 50%;
        left: 6px;
        transform: translateY(-50%);
      }
    }

    input {
      font-size: 12px;
    }
  }

  .au-input-clear {
    position: absolute;
    right: 8px;
    cursor: pointer;

    &:hover {
      opacity: 0.7;
    }
  }

  &.has-postfix {
    .au-input-clear {
      right: 32px;
    }
  }
}
</style>
