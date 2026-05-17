<template>
  <div class="audio-icon" :class="{ noText }">
    <AuIcon
      :icon="iconUrl"
      :size="20"
      class="audio-icon-sprite"
      :style="iconStyle"
    />
    <p v-if="!noText" class="audio-icon-text">
      {{ lngIcon(iconData.id) }}
    </p>
  </div>
</template>

<script>
import language from '~/mixins/language';
import icons from '~/mixins/icons';

export default {
  name: 'audio-icon',

  mixins: [language, icons],

  props: {
    audioType: {
      type: String,
      default: 'sound', // music, binaural
    },
    audioId: {
      type: String,
      required: true,
    },
    noText: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    iconData() {
      return this.getIconById(this.audioId);
    },

    iconStyle() {
      return {
        color: this.iconData?.icon_color,
      };
    },

    iconUrl() {
      if (this.audioType === 'sound') return `sprite-${this.iconData.icon_svg}`;
      if (this.audioType === 'binaural') return 'sprite-brainwaves';
      return 'sprite-music';
    },
  },
};
</script>
