<script setup lang="ts">
import { format } from 'date-fns';
import { bases, Distances } from '~~/lib/bases';
import indicators from '~~/lib/indicators';
import { Fire, useFires } from '~~/stores/fires';
import { useTheme } from '~~/stores/theme';

const rankingColors = ['#4caf50', '#ffeb3b', '#f44336'];
const rankingDesc = [
  'Not critical',
  'Critical in the next 24 hours',
  'Critical',
];
const props = defineProps<{ data: Fire }>();
const theme = useTheme();
const fires = useFires();

const getForecastTime = (date: string, offset: number): string => {
  const d = new Date(date);
  d.setMinutes(offset);
  return format(d, 'MM-dd HH:mm');
};

const downloadPdf = () => {
  window.open(
    `https://gwis.jrc.ec.europa.eu/proxy?url=https://gwis-reports.s3.eu-west-1.amazonaws.com/effis/SingleFirereport-${props.data.id.toString()}-rev_0.pdf`
  );
};
</script>

<template>
  <div id="compared-fire">
    <v-card class="mx-auto rounded-t-lg" :color="theme.primary">
      <template v-slot:title>
        <div
          style="
            display: flex;
            align-items: center;
            justify-content: space-between;
          "
        >
          <div style="display: flex; align-items: center">
            <v-icon icon="mdi-fire"></v-icon>
            <p style="margin-left: 1rem">Fire {{ data.id }}</p>
          </div>
          <div>
            <v-btn
              icon
              border="none"
              variant="flat"
              color="transparent"
              @click="() => fires.setCompareReduced(true)"
            >
              <v-icon icon="mdi-minus" size="x-large"></v-icon>
            </v-btn>
            <v-btn
              icon
              border="none"
              variant="flat"
              color="transparent"
              @click="() => fires.toggleCompare(data)"
            >
              <v-icon icon="mdi-close" size="x-large"></v-icon>
            </v-btn>
          </div>
        </div>
      </template>

      <div
        style="
          display: flex;
          align-items: baseline;
          justify-content: space-between;
        "
      >
        <v-card-title>
          {{
            props.data.effis_data.admlvl3 ||
            props.data.effis_data.country ||
            'N. A.'
          }}
        </v-card-title>
        <v-card-subtitle>
          {{ props.data.effis_data.iso2 || '--' }}
        </v-card-subtitle>
      </div>

      <div class="box little-box">
        <v-card-subtitle> Location </v-card-subtitle>
        <v-card-text>{{
          [
            props.data.effis_data.country,
            props.data.effis_data.admlvl3 || '',
            props.data.effis_data.admlvl4 || '',
            props.data.effis_data.admlvl5 || '',
          ]
            .filter((frame) => !!frame)
            .join(' / ')
        }}</v-card-text>
      </div>

      <div class="box little-box">
        <v-card-subtitle> Ranking </v-card-subtitle>
        <v-card-text :style="`color: ${rankingColors[props.data.ranking]}`">{{
          rankingDesc[props.data.ranking]
        }}</v-card-text>
      </div>

      <div class="box mid-box">
        <v-card-subtitle> Ranking indicators </v-card-subtitle>
        <v-card-text>
          <div class="ranking-line">
            <p>People</p>
            <p
              :style="`color: ${
                indicators.info('people', props.data.indicators.people).color
              }`"
            >
              {{ indicators.info('people', props.data.indicators.people).text }}
            </p>
          </div>

          <div class="ranking-line">
            <p>Infrastructures</p>
            <p
              :style="`color: ${
                indicators.info(
                  'infrastructures',
                  props.data.indicators.infrastructures
                ).color
              }`"
            >
              {{
                indicators.info(
                  'infrastructures',
                  props.data.indicators.infrastructures
                ).text
              }}
            </p>
          </div>

          <div class="ranking-line">
            <p>Protected areas</p>
            <p
              :style="`color: ${
                indicators.info('protected', props.data.indicators.protected)
                  .color
              }`"
            >
              {{
                indicators.info('protected', props.data.indicators.protected)
                  .text
              }}
            </p>
          </div>

          <div class="ranking-line">
            <p>Size</p>
            <p
              :style="`color: ${
                indicators.info('size', props.data.indicators.size).color
              }`"
            >
              {{ indicators.info('size', props.data.indicators.size).text }}
            </p>
          </div>

          <div class="ranking-line">
            <p>Terrain</p>
            <p
              :style="`color: ${
                indicators.info('upland', props.data.indicators.upland).color
              }`"
            >
              {{ indicators.info('upland', props.data.indicators.upland).text }}
            </p>
          </div>
        </v-card-text>
      </div>

      <div class="box little-box">
        <v-card-subtitle> Fire size </v-card-subtitle>
        <v-card-text> {{ props.data.effis_data.area }} ha </v-card-text>
      </div>

      <div class="box little-box">
        <v-card-subtitle> Initial date / Last update </v-card-subtitle>
        <v-card-text>
          {{ props.data.effis_data.initialdate.slice(0, 10) }} /
          {{ props.data.effis_data.finaldate.slice(0, 10) }}
        </v-card-text>
      </div>

      <div class="box little-box">
        <v-card-subtitle> Coordinates </v-card-subtitle>
        <v-card-text>
          [{{ props.data.effis_data.centroid.coordinates[0].toFixed(6) }},
          {{ props.data.effis_data.centroid.coordinates[1].toFixed(6) }}]
        </v-card-text>
      </div>

      <div class="box big-box">
        <v-card-subtitle> Fire perimeter </v-card-subtitle>
        <v-card-text style="height: 100%; width: 100%">
          <PerimeterChart
            :center="props.data.effis_data.centroid.coordinates as [number, number]"
            :loading="false"
            :error="false"
            :perimeter="props.data.effis_data.shape.coordinates"
          ></PerimeterChart>
        </v-card-text>
      </div>

      <div class="box little-box">
        <v-card-subtitle> PDF Report </v-card-subtitle>
        <v-card-text>
          <v-btn size="small" @click="downloadPdf()">Download</v-btn>
        </v-card-text>
      </div>

      <div class="box mid-box">
        <v-card-subtitle> Distance from bases </v-card-subtitle>
        <v-card-text>
          <div style="display: flex; flex-wrap: nowrap">
            <b style="width: 80%">Base</b>
            <b style="width: 80%">Distance [km]</b>
            <b style="width: 100%">Est. Time [hh:mm]</b>
          </div>
          <div v-for="base in bases" style="display: flex">
            <p style="width: 80%">{{ base.name }}</p>
            <p style="width: 80%">
              {{
                Distances.distance(
                  base.coordinates,
                  props.data.effis_data.centroid.coordinates as [number, number]
                )
              }}
            </p>
            <p style="width: 100%">
              {{
                Distances.estimatedTime(
                  Distances.distance(
                    base.coordinates,
                    props.data.effis_data.centroid.coordinates as [
                      number,
                      number
                    ]
                  )
                ).toFixed(0)
              }}
            </p>
          </div>
        </v-card-text>
      </div>

      <div class="box chart-box">
        <v-card-subtitle>Fire weather index</v-card-subtitle>
        <v-card-text>
          <FWI
            :coordinates="props.data.effis_data.centroid.coordinates as [number, number]"
            :from="props.data.effis_data.initialdate.slice(0, 10)"
            :to="props.data.effis_data.finaldate.slice(0, 10)"
          ></FWI>
        </v-card-text>
      </div>

      <div class="box chart-box">
        <v-card-subtitle>Evolution of perimeter length</v-card-subtitle>
        <v-card-text>
          <PerimeterEvolution :data="data"></PerimeterEvolution>
        </v-card-text>
      </div>

      <div class="box extra-big-box">
        <v-card-subtitle>Fire perimeter evolution forecast</v-card-subtitle>
        <v-card-text>
          <ForecastChart :data="data"></ForecastChart>
        </v-card-text>
      </div>

      <div class="box big-box">
        <v-card-subtitle>Forecast</v-card-subtitle>
        <v-card-text class="scrollable" style="flex: 1">
          <div
            v-if="data.dss_data.length > 1"
            style="display: flex; flex-direction: column"
          >
            <div style="display: flex">
              <b style="width: 100%">Date/time</b>
              <b style="width: 100%">Pop.</b>
              <b style="width: 100%">Built up. [m<sup>2</sup>]</b>
            </div>
            <div v-for="f in data.dss_data.slice(12)">
              <div style="display: flex">
                <p style="width: 100%">
                  {{ getForecastTime(f.date, f.duration_minutes) }}
                </p>
                <p style="width: 100%">{{ f.forecast.pop_total.toString() }}</p>
                <p style="width: 100%">
                  {{ f.forecast.built_up_area.toString() }}
                </p>
              </div>
            </div>
          </div>
          <NoData v-else></NoData>
        </v-card-text>
      </div>

      <div class="box big-box">
        <v-card-subtitle>Landcover damages</v-card-subtitle>
        <v-card-text>
          <LandcoverDamages
            class="scrollable"
            :data="props.data"
          ></LandcoverDamages>
        </v-card-text>
      </div>
    </v-card>
  </div>
</template>

<style scoped>
#compared-fire {
  width: 400px;
  min-width: 400px;
  border-radius: 4px;
  z-index: 1000;
  margin-right: 1rem;
}

.box {
  display: flex;
  flex-direction: column;
}

.box > v-card-text {
  flex: 1;
}

.little-box {
  margin-top: 0.5rem;
  height: 80px;
  max-height: 80px;
  min-height: 80px;
}

.mid-box {
  margin-top: 0.5rem;
  height: 150px;
  max-height: 150px;
  min-height: 150px;
}

.big-box {
  margin-top: 0.5rem;
  height: 300px;
  max-height: 300px;
  min-height: 300px;
}

.extra-big-box {
  margin-top: 0.5rem;
  height: 500px;
  max-height: 500px;
  min-height: 500px;
}

.chart-box {
  margin-top: 0.5rem;
  height: 250px;
  max-height: 250px;
  min-height: 250px;
}

.scrollable {
  overflow-y: scroll;
}

.scrollable::-webkit-scrollbar {
  width: 0.3em;
  background-color: transparent;
}

.scrollable::-webkit-scrollbar-thumb {
  background-color: #000000;
}

.scrollable::-webkit-scrollbar-thumb:hover {
  background-color: #555;
}

.ranking-line {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
