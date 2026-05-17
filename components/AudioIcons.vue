<template>
  <div class="audio-icons flex flex-wrap">
    <!-- Binaural Icons -->
    <audio-icon
      v-for="sound in audio?.binaural || []"
      :key="sound.sound_id"
      audio-type="binaural"
      :audio-id="sound.sound_id"
      :no-text="noText"
    />
    <!-- Music Icons -->
    <audio-icon
      v-for="sound in audio?.music || []"
      :key="sound.sound_id"
      audio-type="music"
      :audio-id="sound.sound_id"
      :no-text="noText"
    />
    <!-- Sounds Icons -->
    <audio-icon
      v-for="sound in audio?.sounds || []"
      :key="sound.sound_id"
      audio-type="sound"
      :audio-id="sound.sound_id"
      :no-text="noText"
    />
  </div>
</template>

<script>
import icons from '~/mixins/icons';

export default {
  name: 'audio-icons',

  mixins: [icons],

  props: {
    audio: {
      type: Object,
      default: () => ({}),
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
        backgroundColor: this.iconData.bg,
      };
    },
  },
};
</script>
