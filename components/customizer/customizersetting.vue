<template>
  <a
    class="nav-link"
    :class="{ 'active show': customizer == 'settings' }"
    id="c-pills-home-tab"
    @click="openCustomizerSetting('settings')"
    href="javascript:void(0)"
    style="margin: 0 10px"
  >
    <div class="settings">
      <i class="icon-settings"></i>
    </div>
  </a>
</template>

<script>
  import { mapState } from "pinia";
  import { useMenuStore } from "~~/store/menu";

  export default {
    name: "CustomSetting",
    computed: {
      ...mapState(useMenuStore, {
        customizer: "customizer",
      }),
    },
    methods: {
      openCustomizerSetting(val) {
        useMenuStore().customizer = val;
      },
    },
  };
</script>
