<template>
  <div
    id="application-container"
    class="application bg-main"
    :class="`route-${$route.name.split('-')[0]}`"
    itemscope
    itemtype="https://schema.org/WebSite"
  >
    <div class="section pb-10">
      <h1 class="text-center pb-4">Генератор Белого Шума</h1>

      <div class="sound-mixer">
        <div
          v-for="sound in iconsSounds"
          :key="sound.id"
          class="sound-mixer-control"
          :class="{ active: isActive(sound.id) }"
        >
          <div
            class="sound-mixer-icon-wrap"
            :title="iconNames[`icon_${sound.id}`]"
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
          <div class="sound-mixer-volume-text">Громкость</div>

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

export default Vue.extend({
  name: 'index-page',

  data: () => ({
    mixLimit: 8,
    volumeSettings: {},

    trackList: [],

    iconNames: {
      "icon_006_light_rain": "Лёгкий Дождь",
      "icon_029_heavy_rain": "Сильный Дождь",
      "icon_033_thunderstorm": "Гроза",
      "icon_002_birds": "Птицы",
      "icon_050_forest": "Лес",
      "icon_004_campfire": "Костер",
      "icon_008_urban_rain": "Городской Дождь",
      "icon_079_seagulls": "Чайки",
      "icon_056_night": "Ночь",
      "icon_043_fire_crackles": "Треск огня",
      "icon_015_owls": "Совы",
      "icon_035_cicadas": "Цикады ",
      "icon_081_brushing_hair": "Расчёсывание волос",
      "icon_082_wind_chimes": "Ветровые колокольчики",
      "icon_093_fizzy_drink": "Газированный напиток",
      "icon_032_popcorn": "Попкорн",
      "icon_094_city_ambience": "Городская Атмосфера",
      "icon_062_coffee_shop": "Кофейня",
      "icon_058_rustling_leaves": "Шелест Листьев",
      "icon_089_wind_surge": "Порыв Ветра",
      "icon_019_white_noise": "Белый шум",
      "icon_026_train": "Поезд",
      "icon_053_winds": "Ветры",
      "icon_020_wind_in_trees": "Ветер в деревьях",
      "icon_003_brown_noise": "Коричневый шум",
      "icon_047_truck_engine": "Двигатель грузовика",
      "icon_100_boiling": "Кипение",
      "icon_001_bath_filling": "Наполнение ванны",
      "icon_014_pink_noise": "Розовый шум",
      "icon_088_green_noise": "Зеленый шум",
      "icon_037_river_stream": "Речной поток",
      "icon_078_shower": "Душ",
      "icon_066_cavern": "Пещера",
      "icon_069_ocean": "Океан",
      "icon_038_waterfall": "Водопад",
      "icon_064_hot_tub": "Джакузи",
      "icon_010_crickets": "Сверчки",
      "icon_048_whales": "Киты",
      "icon_030_keyboard": "Клавиатура",
      "icon_087_elvish_whispers": "Шепот эльфов",
      "icon_067_frogs": "Лягушки",
      "icon_085_air_conditioner": "Кондиционер",
      "icon_028_heartbeat": "Сердцебиение",
      "icon_086_vinyl_crackle": "Треск винила",
      "icon_084_wolf": "Волк",
      "icon_073_oscillating_fan": "Вентилятор с осцилляцией",
      "icon_083_hair_dryer": "Фен для волос",
      "icon_023_grandfather_clock": "Часы кукушка",
      "icon_036_rain_on_roof": "Дождь по крыше",
      "icon_102_rain_nature": "Дождь в природе",
      "icon_101_rain_tent": "Дождь по палатке",
      "icon_095_horses": "Лошади",
      "icon_096_rain_on_window": "Дождь по окну",
      "icon_099_cuckoo": "Кукушка",
      "icon_098_kasatka": "Косатка",
      "icon_054_cat_purring": "Мурлыканье кота",
      "icon_ambient_01": "Мирное и расслабляющее",
      "icon_ambient_piano_01": "Мир пианино-мечты",
      "icon_guitar_01": "Сказки о мирной гитаре",
      "icon_jazz_01": "Цвета полуночи",
      "icon_lofi_01": "Lo-Fi треки для учебы",
      "icon_classical_piano_01": "Классическое охлаждение",
      "icon_baby_01": "Засыпай, детка",
      "icon_ambient_02": "Струящаяся атмосфера",
      "icon_meditation_01": "Бесконечный мир",
      "icon_relaxing_piano_01": "Трогательные моменты",
      "icon_baby_03": "Спокойной ночи, маленький Ангел",
      "icon_baby_02": "Сияние луны",
      "icon_baby_04": "Счастливые мечты",
      "icon_piano_lullaby_01": "Сладкая пианина колыбельная",
      "icon_flute_01": "Флейта Музыка для Медитации",
      "icon_harp_01": "Арфа для духовного равновесия",
      "icon_yoga_01": "Исцеление души",
      "icon_yoga_02": "Новое йога-расслабление",
      "icon_celtic_01": "Горный восход",
      "icon_lofi_02": "lofi песни для лучшего сна"
    },

    
    soundsIcons: [
      {
        id: '006_light_rain',
        icon_svg: 'ico_light_rain.svg',
        bg: '#233B65',
        bg_active: '#2FA6E9',
        icon_color: '#2FA6E9',
        icon_color_active: '#202044',
      },
      {
        id: '029_heavy_rain',
        icon_svg: 'ico_heavy_rain.svg',
        bg: '#233B65',
        bg_active: '#2FA6E9',
        icon_color: '#2FA6E9',
        icon_color_active: '#202044',
      },
      {
        id: '033_thunderstorm',
        icon_svg: 'ico_thunderstorm.svg',
        bg: '#233B65',
        bg_active: '#2FA6E9',
        icon_color: '#2FA6E9',
        icon_color_active: '#202044',
      },
      {
        id: '002_birds',
        icon_svg: 'ico_birds.svg',
        bg: '#483243',
        bg_active: '#E77A3D',
        icon_color: '#E77A3D',
        icon_color_active: '#202044',
      },
      {
        id: '050_forest',
        icon_svg: 'ico_forest.svg',
        bg: '#2F3F45',
        bg_active: '#6ABD4B',
        icon_color: '#6ABD4B',
        icon_color_active: '#202044',
      },
      {
        id: '004_campfire',
        icon_svg: 'ico_campfire.svg',
        bg: '#2F3F45',
        bg_active: '#6ABD4B',
        icon_color: '#6ABD4B',
        icon_color_active: '#202044',
      },
      {
        id: '008_urban_rain',
        icon_svg: 'ico_urban_rain.svg',
        bg: '#233B65',
        bg_active: '#2FA6E9',
        icon_color: '#2FA6E9',
        icon_color_active: '#202044',
      },
      {
        id: '079_seagulls',
        icon_svg: 'ico_seagulls.svg',
        bg: '#483243',
        bg_active: '#E77A3D',
        icon_color: '#E77A3D',
        icon_color_active: '#202044',
      },
      {
        id: '056_night',
        icon_svg: 'ico_night.svg',
        bg: '#2F3F45',
        bg_active: '#6ABD4B',
        icon_color: '#6ABD4B',
        icon_color_active: '#202044',
      },
      {
        id: '043_fire_crackles',
        icon_svg: 'ico_fire_crackles.svg',
        bg: '#2F3F45',
        bg_active: '#6ABD4B',
        icon_color: '#6ABD4B',
        icon_color_active: '#202044',
      },
      {
        id: '015_owls',
        icon_svg: 'ico_owls.svg',
        bg: '#483243',
        bg_active: '#E77A3D',
        icon_color: '#E77A3D',
        icon_color_active: '#202044',
      },
      {
        id: '035_cicadas',
        icon_svg: 'ico_cicadas.svg',
        bg: '#483243',
        bg_active: '#E77A3D',
        icon_color: '#E77A3D',
        icon_color_active: '#202044',
      },
      {
        id: '081_brushing_hair',
        icon_svg: 'ico_hair_brush.svg',
        bg: '#482852',
        bg_active: '#E9498C',
        icon_color: '#E9498C',
        icon_color_active: '#202044',
      },
      {
        id: '082_wind_chimes',
        icon_svg: 'ico_wind_chimes.svg',
        bg: '#482852',
        bg_active: '#E9498C',
        icon_color: '#E9498C',
        icon_color_active: '#202044',
      },
      {
        id: '093_fizzy_drink',
        icon_svg: 'ico_fizzy_drink.svg',
        bg: '#482852',
        bg_active: '#E9498C',
        icon_color: '#E9498C',
        icon_color_active: '#202044',
      },
      {
        id: '032_popcorn',
        icon_svg: 'ico_popcorn.svg',
        bg: '#482852',
        bg_active: '#E9498C',
        icon_color: '#E9498C',
        icon_color_active: '#202044',
      },
      {
        id: '094_city_ambience',
        icon_svg: 'ico_city_ambience.svg',
        bg: '#453D45',
        bg_active: '#DAB24A',
        icon_color: '#DAB24A',
        icon_color_active: '#202044',
      },
      {
        id: '062_coffee_shop',
        icon_svg: 'ico_coffee_shop.svg',
        bg: '#453D45',
        bg_active: '#DAB24A',
        icon_color: '#DAB24A',
        icon_color_active: '#202044',
      },
      {
        id: '058_rustling_leaves',
        icon_svg: 'ico_rustling_leaves.svg',
        bg: '#353669',
        bg_active: '#8B8DFC',
        icon_color: '#8B8DFC',
        icon_color_active: '#202044',
      },
      {
        id: '089_wind_surge',
        icon_svg: 'ico_wind_surge.svg',
        bg: '#353669',
        bg_active: '#8B8DFC',
        icon_color: '#8B8DFC',
        icon_color_active: '#202044',
      },
      {
        id: '019_white_noise',
        icon_svg: 'ico_noise_1.svg',
        bg: '#482A47',
        bg_active: '#E95454',
        icon_color: '#E95454',
        icon_color_active: '#202044',
      },
      {
        id: '026_train',
        icon_svg: 'ico_train.svg',
        bg: '#453D45',
        bg_active: '#DAB24A',
        icon_color: '#DAB24A',
        icon_color_active: '#202044',
      },
      {
        id: '053_winds',
        icon_svg: 'ico_winds.svg',
        bg: '#353669',
        bg_active: '#8B8DFC',
        icon_color: '#8B8DFC',
        icon_color_active: '#202044',
      },
      {
        id: '020_wind_in_trees',
        icon_svg: 'ico_wind_in_trees.svg',
        bg: '#353669',
        bg_active: '#8B8DFC',
        icon_color: '#8B8DFC',
        icon_color_active: '#202044',
      },
      {
        id: '003_brown_noise',
        icon_svg: 'ico_noise_2.svg',
        bg: '#482A47',
        bg_active: '#E95454',
        icon_color: '#E95454',
        icon_color_active: '#202044',
      },
      {
        id: '047_truck_engine',
        icon_svg: 'ico_truck_engine.svg',
        bg: '#453D45',
        bg_active: '#DAB24A',
        icon_color: '#DAB24A',
        icon_color_active: '#202044',
      },
      {
        id: '100_boiling',
        icon_svg: 'ico_boiling_water.svg',
        bg: '#293C53',
        bg_active: '#4CAA8E',
        icon_color: '#4CAA8E',
        icon_color_active: '#202044',
      },
      {
        id: '001_bath_filling',
        icon_svg: 'ico_bath_filling.svg',
        bg: '#293C53',
        bg_active: '#4CAA8E',
        icon_color: '#4CAA8E',
        icon_color_active: '#202044',
      },
      {
        id: '014_pink_noise',
        icon_svg: 'ico_noise_3.svg',
        bg: '#482A47',
        bg_active: '#E95454',
        icon_color: '#E95454',
        icon_color_active: '#202044',
      },
      {
        id: '088_green_noise',
        icon_svg: 'ico_noise_4.svg',
        bg: '#482A47',
        bg_active: '#E95454',
        icon_color: '#E95454',
        icon_color_active: '#202044',
      },
      {
        id: '037_river_stream',
        icon_svg: 'ico_river_stream.svg',
        bg: '#233B65',
        bg_active: '#2FA6E9',
        icon_color: '#2FA6E9',
        icon_color_active: '#202044',
      },
      {
        id: '078_shower',
        icon_svg: 'ico_shower.svg',
        bg: '#293C53',
        bg_active: '#4CAA8E',
        icon_color: '#4CAA8E',
        icon_color_active: '#202044',
      },
      {
        id: '066_cavern',
        icon_svg: 'ico_cavern.svg',
        bg: '#233B65',
        bg_active: '#2FA6E9',
        icon_color: '#2FA6E9',
        icon_color_active: '#202044',
      },
      {
        id: '069_ocean',
        icon_svg: 'ico_ocean.svg',
        bg: '#233B65',
        bg_active: '#2FA6E9',
        icon_color: '#2FA6E9',
        icon_color_active: '#202044',
      },
      {
        id: '038_waterfall',
        icon_svg: 'ico_waterfall.svg',
        bg: '#233B65',
        bg_active: '#2FA6E9',
        icon_color: '#2FA6E9',
        icon_color_active: '#202044',
      },
      {
        id: '064_hot_tub',
        icon_svg: 'ico_hot_tub.svg',
        bg: '#293C53',
        bg_active: '#4CAA8E',
        icon_color: '#4CAA8E',
        icon_color_active: '#202044',
      },
      {
        id: '010_crickets',
        icon_svg: 'ico_crickets.svg',
        bg: '#483243',
        bg_active: '#E77A3D',
        icon_color: '#E77A3D',
        icon_color_active: '#202044',
      },
      {
        id: '048_whales',
        icon_svg: 'ico_whales.svg',
        bg: '#483243',
        bg_active: '#E77A3D',
        icon_color: '#E77A3D',
        icon_color_active: '#202044',
      },
      {
        id: '030_keyboard',
        icon_svg: 'ico_keyboard.svg',
        bg: '#482852',
        bg_active: '#E9498C',
        icon_color: '#E9498C',
        icon_color_active: '#202044',
      },
      {
        id: '087_elvish_whispers',
        icon_svg: 'ico_whispers.svg',
        bg: '#482852',
        bg_active: '#E9498C',
        icon_color: '#E9498C',
        icon_color_active: '#202044',
      },
      {
        id: '067_frogs',
        icon_svg: 'ico_frog.svg',
        bg: '#483243',
        bg_active: '#E77A3D',
        icon_color: '#E77A3D',
        icon_color_active: '#202044',
      },
      {
        id: '085_air_conditioner',
        icon_svg: 'ico_ac.svg',
        bg: '#293C53',
        bg_active: '#4CAA8E',
        icon_color: '#4CAA8E',
        icon_color_active: '#202044',
      },
      {
        id: '028_heartbeat',
        icon_svg: 'ico_heartbeat.svg',
        bg: '#482852',
        bg_active: '#E9498C',
        icon_color: '#E9498C',
        icon_color_active: '#202044',
      },
      {
        id: '086_vinyl_crackle',
        icon_svg: 'ico_vinyl_crackle.svg',
        bg: '#482852',
        bg_active: '#E9498C',
        icon_color: '#E9498C',
        icon_color_active: '#202044',
      },
      {
        id: '084_wolf',
        icon_svg: 'ico_wolf.svg',
        bg: '#483243',
        bg_active: '#E77A3D',
        icon_color: '#E77A3D',
        icon_color_active: '#202044',
      },
      {
        id: '073_oscillating_fan',
        icon_svg: 'ico_fan.svg',
        bg: '#293C53',
        bg_active: '#4CAA8E',
        icon_color: '#4CAA8E',
        icon_color_active: '#202044',
      },
      {
        id: '083_hair_dryer',
        icon_svg: 'ico_hair_dryer.svg',
        bg: '#293C53',
        bg_active: '#4CAA8E',
        icon_color: '#4CAA8E',
        icon_color_active: '#202044',
      },
      {
        id: '023_grandfather_clock',
        icon_svg: 'ico_grandfather_clock.svg',
        bg: '#293C53',
        bg_active: '#4CAA8E',
        icon_color: '#4CAA8E',
        icon_color_active: '#202044',
      },
      {
        id: '036_rain_on_roof',
        icon_svg: 'ico_rain_on_roof.svg',
        bg: '#233B65',
        bg_active: '#2FA6E9',
        icon_color: '#2FA6E9',
        icon_color_active: '#202044',
      },
      {
        id: '102_rain_nature',
        icon_svg: 'ico_rain_drops.svg',
        bg: '#233B65',
        bg_active: '#2FA6E9',
        icon_color: '#2FA6E9',
        icon_color_active: '#202044',
      },
      {
        id: '101_rain_tent',
        icon_svg: 'ico_rain_on_tent.svg',
        bg: '#233B65',
        bg_active: '#2FA6E9',
        icon_color: '#2FA6E9',
        icon_color_active: '#202044',
      },
      {
        id: '095_horses',
        icon_svg: 'ico_horse.svg',
        bg: '#483243',
        bg_active: '#E77A3D',
        icon_color: '#E77A3D',
        icon_color_active: '#202044',
      },
      {
        id: '096_rain_on_window',
        icon_svg: 'ico_rain_on_window.svg',
        bg: '#233B65',
        bg_active: '#2FA6E9',
        icon_color: '#2FA6E9',
        icon_color_active: '#202044',
      },
      {
        id: '099_cuckoo',
        icon_svg: 'ico_cuckoo.svg',
        bg: '#483243',
        bg_active: '#E77A3D',
        icon_color: '#E77A3D',
        icon_color_active: '#202044',
      },
      {
        id: '098_kasatka',
        icon_svg: 'ico_orca.svg',
        bg: '#483243',
        bg_active: '#E77A3D',
        icon_color: '#E77A3D',
        icon_color_active: '#202044',
      },
      {
        id: '054_cat_purring',
        icon_svg: 'ico_cat_purring.svg',
        bg: '#483243',
        bg_active: '#E77A3D',
        icon_color: '#E77A3D',
        icon_color_active: '#202044',
      },
      {
        id: 'ambient_01',
        music_config: 'ambient_01',
        title_loc: 'music_title_ambient_01',
        bg: '#483243',
        icon_color: '#E77A3D',
      },
      {
        id: 'ambient_piano_01',
        music_config: 'ambient_piano_01',
        title_loc: 'music_title_ambient_piano_01',
        bg: '#353669',
        icon_color: '#8B8DFC',
      },
      {
        id: 'jazz_01',
        music_config: 'jazz_01',
        title_loc: 'music_title_jazz_01',
        bg: '#233B65',
        icon_color: '#2FA6E9',
      },
      {
        id: 'classical_piano_01',
        music_config: 'classical_piano_01',
        title_loc: 'music_title_classical_piano_01',
        bg: '#293C53',
        icon_color: '#4CAA8E',
      },
      {
        id: 'flute_01',
        music_config: 'flute_01',
        title_loc: 'music_title_flute_01',
        bg: '#453D45',
        icon_color: '#DAB24A',
      },
      {
        id: 'lofi_01',
        music_config: 'lofi_01',
        title_loc: 'music_title_lofi_01',
        bg: '#2F3F45',
        icon_color: '#6ABD4B',
      },
      {
        id: 'guitar_01',
        music_config: 'guitar_01',
        title_loc: 'music_title_guitar_01',
        bg: '#483243',
        icon_color: '#E77A3D',
      },
      {
        id: 'baby_01',
        music_config: 'baby_01',
        title_loc: 'music_title_baby_01',
        bg: '#353669',
        icon_color: '#8B8DFC',
      },
      {
        id: 'meditation_01',
        music_config: 'meditation_01',
        title_loc: 'music_title_meditation_01',
        bg: '#293C53',
        icon_color: '#4CAA8E',
      },
      {
        id: 'lofi_02',
        music_config: 'lofi_02',
        title_loc: 'music_title_lofi_02',
        bg: '#233B65',
        icon_color: '#2FA6E9',
      },
      {
        id: 'ambient_02',
        music_config: 'ambient_02',
        title_loc: 'music_title_ambient_02',
        bg: '#482A47',
        icon_color: '#E95454',
      },
      {
        id: 'relaxing_piano_01',
        music_config: 'relaxing_piano_01',
        title_loc: 'music_title_relaxing_piano_01',
        bg: '#453D45',
        icon_color: '#DAB24A',
      },
      {
        id: 'baby_03',
        music_config: 'baby_03',
        title_loc: 'music_title_baby_03',
        bg: '#483243',
        icon_color: '#E77A3D',
      },
      {
        id: 'harp_01',
        music_config: 'harp_01',
        title_loc: 'music_title_harp_01',
        bg: '#2F3F45',
        icon_color: '#6ABD4B',
      },
      {
        id: 'yoga_01',
        music_config: 'yoga_01',
        title_loc: 'music_title_yoga_01',
        bg: '#353669',
        icon_color: '#8B8DFC',
      },
      {
        id: 'baby_02',
        music_config: 'baby_02',
        title_loc: 'music_title_baby_02',
        bg: '#293C53',
        icon_color: '#4CAA8E',
      },
      {
        id: 'baby_04',
        music_config: 'baby_04',
        title_loc: 'music_title_baby_04',
        bg: '#353669',
        icon_color: '#8B8DFC',
      },
      {
        id: 'piano_lullaby_01',
        music_config: 'piano_lullaby_01',
        title_loc: 'music_title_piano_lullaby_01',
        bg: '#483243',
        icon_color: '#E77A3D',
      },
      {
        id: 'celtic_01',
        music_config: 'celtic_01',
        title_loc: 'music_title_celtic_01',
        bg: '#483243',
        icon_color: '#E77A3D',
      },
      {
        id: 'yoga_02',
        music_config: 'yoga_02',
        title_loc: 'music_title_yoga_02',
        bg: '#2F3F45',
        icon_color: '#6ABD4B',
      }
    ],
  }),

  computed: {
    iconsSounds() {
      return this.soundsIcons.filter(
        (_) => !_.music_config && !_.description_loc
      );
    },
  },

  methods: {
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
      this.trackList.forEach((_) => {
        this.changeVolume({ sound_id: _.sound_id, volume });
        this.volumeSettings[_.sound_id] = volume;
      });
    },

    // Mixer Functions
    async pushSound({ sound_id, volume }) {
      const url =  `/sounds/m4a/${sound_id}.m4a`;

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
#application-container {
  background-image: url('~/assets/ui/panda-chibi.svg');
  background-repeat: no-repeat;
  background-position: 99% 99%;
}

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
