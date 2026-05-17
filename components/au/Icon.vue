<template>
  <span class="au-icon-wrap">
    <!-- case for mdi-icon or fa-icon... -->
    <i
      v-if="!isSvgPath && !getAssetsUrl && !isSpriteSvg"
      :class="classList"
      :title="title"
      :style="styles"
    />

    <!-- case for sprite usage via @nuxtjs/svg-sprite loader -->
    <svg-icon
      v-if="isSpriteSvg"
      :key="spriteSvgName"
      :name="spriteSvgName"
      :style="styles"
      :title="title"
      class="au-icon__svg"
    />

    <!-- case for path only passed in props.icon -->
    <svg
      v-else-if="isSvgPath"
      class="au-icon__svg"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      role="img"
      aria-hidden="true"
    >
      <path :d="icon" />
    </svg>
    <!-- case for svg passed from @/assets -->
    <div
      v-else-if="getAssetsUrl"
      :class="getAssetsUrl"
      :title="title"
      :style="assetsSvgstyles"
    />
  </span>
</template>

<script>
function isSvgPath(iconPath) {
  if (iconPath) {
    return (
      /^[mzlhvcsqta]\s*[-+.0-9][^mlhvzcsqta]+/i.test(iconPath) &&
      /[\dz]$/i.test(iconPath) &&
      iconPath.length > 4
    );
  }

  return false;
}

export default {
  name: 'au-icon',

  props: {
    icon: {
      type: String,
      default: null,
    },
    title: {
      type: String,
      default: null,
    },
    size: {
      type: Number,
      default: null,
    },
    color: {
      type: String,
      default: null,
    },
    keepColors: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    classList() {
      return [
        this.$options.name,
        {
          [`icon-${this.icon}`]: this.icon && !this.icon.includes('fa-'),
          fa: this.icon && this.icon.includes('fa-'),
          'fa-fw': this.icon && this.icon.includes('fa-'),
          [this.icon]: this.icon && this.icon.includes('fa-'),
          [`mdi ${this.icon}`]: this.icon && this.icon.includes('mdi-'),
        },
      ];
    },

    isSpriteSvg() {
      return this.icon && this.icon.indexOf('sprite') !== -1;
    },

    spriteSvgName() {
      const arr = this.icon.split('-');
      if (arr.length < 2) return null;
      return arr.pop();
    },

    isSvgPath() {
      const isSVG = isSvgPath(this.icon);

      return isSVG;
    },

    styles() {
      return {
        width: `${this.size}px`,
        height: `${this.size}px`,
        color: this.color || 'inherit',
        fontSize: `${this.size}px`,
      };
    },

    assetsSvgstyles() {
      const iconUrl = this.getAssetsUrl;
      const mask = `no-repeat center/contain url('${iconUrl}')`;

      return {
        width: `${this.size}px`,
        height: `${this.size}px`,
        color: 'inherit',
        fontSize: `${this.size}px`,
        '-webkit-mask': mask,
        mask,
        background: this.keepColors
          ? `no-repeat center/contain transparent url('${iconUrl}')`
          : null,
        backgroundColor: this.keepColors ? null : this.color || 'currentColor',
      };
    },

    getAssetsUrl() {
      let images = null;

      if (this.icon && this.icon.startsWith('icon')) {
        images = `/assets/${this.icon}.svg`;
      }

      return images || null;
    },
  },
};
</script>

<style lang="scss" scoped>
$default-size: 12px;

.au-icon-wrap {
  display: inline-flex;
}

.au-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  width: $default-size;
  height: $default-size;
  box-sizing: border-box;
  transition: background-color 0.15s linear;
}

.au-icon__svg {
  display: inline-block;
  width: 24px;
  height: 24px;

  fill: currentColor;
  box-sizing: border-box;
}
</style>
