<script setup lang="ts">
import { Fire } from '~~/stores/fires';

const props = defineProps<{
  data: Fire;
}>();
</script>

<template>
  <div style="display: flex; flex-direction: column">
    <div style="display: flex; justify-content: space-between">
      <b>Name</b>
      <b>Value [%]</b>
    </div>
    <div style="display: flex; justify-content: space-between">
      <p>Broad leaf forest</p>
      <p>
        {{ (props.data.effis_data.broadleaved_forest_percent || 0).toFixed(1) }}
      </p>
    </div>
    <div style="display: flex; justify-content: space-between">
      <p>Conifer</p>
      <p>
        {{ (props.data.effis_data.coniferous_forest_percent || 0).toFixed(1) }}
      </p>
    </div>
    <div style="display: flex; justify-content: space-between">
      <p>Mixed forests</p>
      <p>
        {{ (props.data.effis_data.mixed_forest_percent || 0).toFixed(1) }}
      </p>
    </div>
    <div style="display: flex; justify-content: space-between">
      <p>Transitional woodland-shrubland</p>
      <p>
        {{
          (props.data.effis_data.transitional_vegetation_percent || 0).toFixed(
            1
          )
        }}
      </p>
    </div>
    <div style="display: flex; justify-content: space-between">
      <p>Artificial surfaces</p>
      <p>
        {{ (props.data.effis_data.artificial_percent || 0).toFixed(1) }}
      </p>
    </div>
    <div style="display: flex; justify-content: space-between">
      <p>Other land cover</p>
      <p>
        {{ (props.data.effis_data.other_percent || 0).toFixed(1) }}
      </p>
    </div>
    <div style="display: flex; justify-content: space-between">
      <p>Other natural areas</p>
      <p>
        {{ (props.data.effis_data.other_natural_percent || 0).toFixed(1) }}
      </p>
    </div>
    <div style="display: flex; justify-content: space-between">
      <p>Natura 2K</p>
      <p>
        {{ (props.data.effis_data.natura2k_percent || 0).toFixed(1) }}
      </p>
    </div>
    <div style="display: flex; justify-content: space-between">
      <p>Sclerophyll</p>
      <p>
        {{
          (
            props.data.effis_data.sclerophillous_vegetation_percent || 0
          ).toFixed(1)
        }}
      </p>
    </div>
    <div style="display: flex; justify-content: space-between">
      <p>Agricolture areas</p>
      <p>
        {{ (props.data.effis_data.agriculture_percent || 0).toFixed(1) }}
      </p>
    </div>
  </div>
</template>
