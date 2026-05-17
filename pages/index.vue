<template>
  <div
    id="application-container"
    class="application bg-main"
    :class="`route-${$route.name.split('-')[0]}`"
    itemscope
    itemtype="https://schema.org/WebSite"
  >
    <div class="section pb-10">
      <h1 class="text-center pb-4">{{ lng('mixer') }}</h1>

      <div class="sound-mixer">
        <div
          v-for="sound in iconsSounds"
          :key="sound.id"
          class="sound-mixer-control"
          :class="{ active: isActive(sound.id) }"
        >
          <div
            class="sound-mixer-icon-wrap"
            :title="lngIcon(sound.id)"
            :style="iconStyle(sound)"
            @click="onIconClick(sound)"
          >
            <AuIcon
              :icon="`sprite-${sound.icon_svg}`"
              :size="48"
              class="audio-icon-sprite"
            />
          </div>
        </div>
      </div>

      <div class="sound-mixer-volume" :class="{ open: trackList.length }">
        <div class="sound-mixer-volume-wrap">
          <div class="sound-mixer-volume-text">Volume</div>

          <div class="flex items-center">
            <div class="sound-mixer-volume-icon">
              <au-icon icon="sprite-notes" :size="36" />
            </div>

            <div class="sound-mixer-volume-slider">
              <AuRangeSlider
                :value="0.5"
                :min="0"
                :max="1"
                :interval="0.05"
                @input="onChangeVolume($event)"
              />
            </div>
          </div>

          <div class="sound-mixer-volume-more">
            <a
              href="https://apps.apple.com/us/app/white-noise-deluxe-sleep-club/id1626279143"
              target="_blank"
              class="dark-link"
              @click="onOpenApp('sounds')"
            >
              More sound settings
            </a>
          </div>
        </div>
      </div>
    </div>

    <audio
      v-for="track in trackList.filter((_) => !!_.url)"
      :id="`audio${track.sound_id}`"
      :key="track.sound_id"
      :src="track.url"
      preload="none"
      loop
    />
  </div>
</template>

<script>
import Vue from 'vue';
import debounce from 'lodash/debounce';
import language from '~/mixins/language';
import icons from '~/mixins/icons';

export default Vue.extend({
  name: 'index-page',

  mixins: [language, icons],

  data: () => ({
    showPromoDrawer: false,
    showCookiesDrawer: false,
    mixLimit: 8,
    volumeSettings: {},

    trackList: [],
    isPlaying: false,
    musicPlaylists: {
      ambient_01: {
        audio:
          'https://static.sleepclub.app/music/ambient_01/warriors_rest.mp3',
      },
      ambient_piano_01: {
        audio:
          'https://static.sleepclub.app/music/ambient_piano_01/healing_piano.mp3',
      },
      guitar_01: {
        audio:
          'https://static.sleepclub.app/music/guitar_01/acoustic_sunset.mp3',
      },
      jazz_01: {
        audio:
          'https://static.sleepclub.app/music/jazz_01/these_romantic_feelings.mp3',
      },
      lofi_01: {
        audio:
          'https://static.sleepclub.app/music/lofi_01/evening_forest_2m24s.mp3',
      },
      classical_piano_01: {
        audio:
          'https://static.sleepclub.app/music/classical_piano_01/goldberg_variations__bwv_988___03___variatio_2_a_1_clav_.mp3',
      },
      baby_01: {
        audio_m4a:
          'https://static.sleepclub.app/music/baby_01/tell_me_a_story.m4a',
      },
      ambient_02: {
        audio_m4a:
          'https://static.sleepclub.app/music/ambient_02/ambient_flight.m4a',
      },
      meditation_01: {
        audio_m4a:
          'https://static.sleepclub.app/music/meditation_01/meditation_mood.m4a',
      },
      relaxing_piano_01: {
        audio:
          'https://static.sleepclub.app/music/relaxing_piano_01/honor_the_fallen.mp3',
      },
      baby_03: {
        audio_m4a:
          'https://static.sleepclub.app/music/baby_03/meditation_in_the_rain.m4a',
      },
      baby_02: {
        audio_m4a:
          'https://static.sleepclub.app/music/baby_02/the_shining_of_the_moon.m4a',
      },
      baby_04: {
        audio_m4a:
          'https://static.sleepclub.app/music/baby_04/falling_for_you.m4a',
      },
      piano_lullaby_01: {
        audio:
          'https://static.sleepclub.app/music/piano_lullaby_01/always_and_forever.mp3',
      },
      flute_01: {
        audio:
          'https://static.sleepclub.app/music/flute_01/enchanting_sonata.mp3',
      },
      harp_01: {
        audio_m4a: 'https://static.sleepclub.app/music/harp_01/reiki_water.m4a',
      },
      yoga_01: {
        audio_m4a:
          'https://static.sleepclub.app/music/yoga_01/qi_gong_healing.m4a',
      },
      yoga_02: {
        audio_m4a:
          'https://static.sleepclub.app/music/yoga_02/forest_inhabitant.m4a',
      },
      celtic_01: {
        audio_m4a:
          'https://static.sleepclub.app/music/celtic_01/the_scottish_sunrise.m4a',
      },
      lofi_02: {
        audio: 'https://static.sleepclub.app/music/lofi_02/her_dreams.mp3',
      },
    },
  }),

  computed: {
    iconsSounds() {
      return this.soundsIcons.filter(
        (_) => !_.music_config && !_.description_loc
      );
    },
  },

  watch: {
    $route(to, from) {
      // console.log('🍌 Route change 🍌', from.name, '->', to.name);
      this.isPlaying = false;
      this.trackList = [];
      window.scrollTo(0, 0);
    },
  },

  created() {
    this.getAllCookies();
  },

  methods: {
    // Player methods
    async mapTracklist(channel) {
      if (!channel) return;

      this.trackList = Object.entries(channel.media.audio)
        .map((entry) =>
          entry[1].map((sound) => ({
            ...sound,
            url: this.buildTrackUrl(entry[0], sound.sound_id),
          }))
        )
        .flat(1);

      // console.log('🎵 Mapping tracklist: ', this.trackList);
      await this.$nextTick();
    },

    buildTrackUrl(category = 'sounds', id) {
      let url = '';

      if (category === 'sounds') {
        url = `/sounds/m4a/${id}.m4a`;
      } else if (category === 'music') {
        url =
          this.musicPlaylists[id]?.audio ||
          this.musicPlaylists[id]?.audio_m4a ||
          '';
      } else if (category === 'binaural') {
        url = `/binaural/m4a/${id}.m4a`;
      }

      return url;
    },

    togglePlay() {
      if (this.isPlaying) {
        this.isPlaying = false;

        this.trackList.forEach((_) => {
          const audio = document.getElementById(`audio${_.sound_id}`);

          if (audio) audio.pause();
        });
      } else {
        this.isPlaying = true;

        this.trackList.forEach((_) => {
          const audio = document.getElementById(`audio${_.sound_id}`);

          if (audio) {
            audio.volume = _.volume;
            audio.load();
            audio.play();
          }
        });
      }
    },

    // Mixer UI
    onIconClick(sound) {
      const limitReached = this.mixLimit <= this.trackList.length;
      const indexInTrackList = this.trackList.findIndex(
        (_) => sound.id === _.sound_id
      );

      if (indexInTrackList >= 0 && limitReached) {
        this.removeSound(indexInTrackList);
      } else if (indexInTrackList >= 0) {
        this.removeSound(indexInTrackList);
      } else if (!limitReached) {
        this.pushSound({
          sound_id: sound.id,
          volume: this.volumeSettings[sound.id] || 0.5,
        });
      } else if (limitReached) {
        this.removeSound(0);
        this.pushSound({
          sound_id: sound.id,
          volume: this.volumeSettings[sound.id] || 0.5,
        });
      } else {
        console.log('🎵 Track Limit Reached!');
      }
    },

    isActive(sound_id) {
      return this.trackList.some((_) => _.sound_id === sound_id);
    },

    iconStyle(sound) {
      const isActive = this.isActive(sound.id);

      return {
        color: isActive ? sound.icon_color_active : sound.icon_color,
        backgroundColor: isActive ? sound.bg_active : 'rgba(0, 0, 0, 0.6)',
        // backgroundColor: isActive ? sound.bg_active : sound.bg,
      };
    },

    onChangeVolume(volume) {
      if (window.innerWidth < 481) {
        this.debouncedNewTab();
      }

      this.trackList.forEach((_) => {
        this.changeVolume({ sound_id: _.sound_id, volume });
        this.volumeSettings[_.sound_id] = volume;
      });
    },

    debouncedNewTab: debounce(function ufW() {
      this.onOpenApp('sounds_volume');
      window
        .open(
          'https://apps.apple.com/us/app/white-noise-deluxe-sleep-club/id1626279143',
          '_blank'
        )
        .focus();
    }, 500),

    // Mixer Functions
    async pushSound({ sound_id, volume }) {
      const url = this.buildTrackUrl('sounds', sound_id);

      this.trackList.push({
        sound_id,
        url,
      });

      await this.$nextTick();

      this.playSound(sound_id, volume);
    },

    async removeSound(index) {
      this.trackList.splice(index, 1);
    },

    playSound(sound_id, volume = 0.5) {
      const audio = document.getElementById(`audio${sound_id}`);

      if (audio) {
        audio.volume = volume;
        audio.load();
        audio.play();
      }
    },

    changeVolume({ sound_id, volume }) {
      const audio = document.getElementById(`audio${sound_id}`);

      if (audio) {
        audio.volume = volume;
      }
    },

    // Cookies
    getAllCookies() {
      if (typeof document === 'undefined') return;

      const promoIsOld =
        parseInt(
          (Date.now() - this.getCookie('scwPromoDate')) / 60 / 60 / 24 / 1000,
          10
        ) > 1;

      this.showPromoDrawer = !this.getCookie('scwPromoDate') || promoIsOld;
      this.showCookiesDrawer = !this.getCookie('scwCookieConsent');
    },

    getCookie(name) {
      if (typeof document === 'undefined') return false;

      const data = document.cookie?.split('; ').find((_) => _.includes(name));
      const value = data?.split('=')[1] || false;

      return value;
    },

    // Drawers
    onConfirmConsent() {
      document.cookie = 'scwCookieConsent=true';
      this.getAllCookies();
    },

    onClosePromo() {
      document.cookie = `scwPromoDate=${Date.now()}`;
      this.getAllCookies();
    },
  },
});
</script>

<style lang="scss">
.route-mixer {
  &.bg-main {
    background-color: #0c0c1b;
  }
}

@media screen and (max-width: 480px) {
  .route-mixer {
    h1 {
      font-size: 5vw;
      text-align: center;
    }
  }
}
</style>

<style lang="scss" scoped>
.sound-mixer {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  max-width: 940px;
  margin: auto;
}

.sound-mixer-control {
  position: relative;
  text-align: center;
  width: 100px;
  height: 100px;
  margin: 4px 8px 12px;

  .sound-mixer-icon-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    border-radius: 8px;
    cursor: pointer;
  }
}

.sound-mixer-volume {
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 80;
  width: 100%;
  height: 180px;
  padding: 24px var(--section-padding) 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: var(--radius) var(--radius) 0 0;
  background-color: var(--background-medium);
  transition: all 0.4s ease-out;
  transform: translateY(100%);

  &.open {
    transform: translateY(0);
  }

  .sound-mixer-volume-wrap {
    width: 910px;
  }

  .sound-mixer-volume-text {
    width: 100%;
    padding-bottom: 8px;
    font-size: 18px;
  }
  .sound-mixer-volume-more {
    padding-top: 8px;
    text-align: center;
  }

  .sound-mixer-volume-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 64px;
    height: 64px;
    margin-right: 16px;
    background-color: var(--background-main);
    border-radius: var(--radius-small);
  }

  .sound-mixer-volume-slider {
    display: flex;
    align-items: center;
    width: 100%;
    height: 64px;
    padding: 0 20px;
    background-color: var(--background-main);
    border-radius: var(--radius-small);
  }
}

@media screen and (max-width: 1080px) {
  .sound-mixer {
    max-width: 780px;
  }

  .sound-mixer-control {
    width: 80px;
    height: 80px;
  }

  .sound-mixer-volume {
    .sound-mixer-volume-wrap {
      width: 90vw;
      max-width: 750px;
    }
  }
}

@media screen and (max-width: 480px) {
  .sound-mixer {
    margin-left: -1vw;
    margin-right: -1vw;
  }

  .sound-mixer-control {
    width: 21vw;
    height: 21vw;
    margin: 1vw;
  }

  .sound-mixer-volume {
    padding: 16px var(--section-padding-mobile);

    .sound-mixer-volume-icon {
      margin-right: 8px;
    }
  }
}

@media screen and (max-width: 380px) {
  .sound-mixer-control {
    .audio-icon-sprite {
      transform: scale(0.85);
    }
  }
}
</style>
