<template>
  <a class="au-button" :class="componentClasses" @click="$emit('click')">
    <slot name="prefix" />
    <div class="au-button-text">{{ text }}</div>
    <slot name="postfix" />
  </a>
</template>

<script>
export default {
  name: 'au-button',

  props: {
    text: {
      type: String,
      default: '',
    },
    small: {
      type: Boolean,
      default: false,
    },
    secondary: {
      type: Boolean,
      default: false,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    componentClasses() {
      return [
        {
          'size-small': this.small,
          secondary: this.secondary,
          readonly: this.readonly,
        },
      ];
    },
  },
};
</script>

<style lang="scss" scoped>
.au-button {
  display: inline-flex;
  padding: 12px 20px;
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
  justify-content: center;
  text-align: center;
  letter-spacing: 0.3px;
  border-radius: 24px;
  background-image: linear-gradient(to bottom, #7632ed, #a655f6);
  color: #fff;
  transition: all 0.25s linear;
  user-select: none;
  cursor: pointer;

  &:hover {
    background-image: linear-gradient(to bottom, #a655f6, #7632ed);
  }

  &.size-small {
    padding: 8px 16px;
    line-height: 20px;
  }

  &.secondary {
    background-image: none;

    &:hover {
      background-image: none;
    }
  }

  &.readonly {
    pointer-events: none;
  }
}

@media screen and (max-width: 360px) {
  .au-button {
    font-size: 14px;
    line-height: 16px;
    font-weight: 400;
    padding: 6px 12px;
    border-radius: 12px;
  }
}
</style>
