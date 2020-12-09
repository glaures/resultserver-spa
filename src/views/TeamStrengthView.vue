<template>
  <div class="container small">
    <div class="h1">Stärke-Management</div>
    <div class="form-row justify-content-start mt-3">
      <div class="form-group col-auto">
        <label for="regionSelector">Region</label>
        <select v-model="region"
                id="regionSelector"
                class="form-input ml-2">
          <option v-for="r in regions"
                  :key="r">
            {{ r }}
          </option>
        </select>
      </div>
      <div class="form-group col-auto ml-2">
        <label for="challengeSelector">Wettbewerb</label>
        <select v-model="challenge"
                id="challengeSelector"
                class="form-input ml-2">
          <option v-for="c in challenges"
                  :key="c.id"
                  :value="c">
            {{ c.name }}
          </option>
        </select>
      </div>
    </div>
    <div v-if="challenge">
      <div class="card">
        <div class="card-header py-1">Einstellungen</div>
        <div class="card-body py-1">
          <div class="form-row">
            <div class="form-group input-group-sm col-3">
              <label for="minStrengthInput">Minimale Zielstärke</label>
              <input v-model.number="settings.minStrength"
                     id="minStrengthInput"
                     class="form-control"
                     type="number"
                     min="0"
                     :max="settings.maxStrength"/>
            </div>
            <div class="form-group input-group-sm col-3">
              <label for="minStrengthInput">Maximale Zielstärke</label>
              <input v-model.number="settings.maxStrength"
                     id="maxStrengthInput"
                     class="form-control"
                     type="number"
                     :min="settings.minStrength"
                     max="100"/>
            </div>
            <div class="form-group input-group-sm col-3">
              <label for="flatFactorInput">Faltungsgrad</label>
              <input v-model.number="settings.flatFactor"
                     id="flatFactorInput"
                     class="form-control"
                     type="number"
                     min="0"
                     max="10"/>
            </div>
            <div class="form-group input-group-sm col-3">
              <label for="challengeLevelInput">Liga-Level</label>
              <input v-model.number="settings.challenge.level"
                     id="challengeLevelInput"
                     class="form-control"
                     type="number"
                     min="1"
                     max="10"/>
            </div>
          </div>
        </div>
      </div>
      <table class="table table-sm mt-2">
        <tr>
          <th>Team</th>
          <th v-for="(snapshot, idx) in snapshots"
              :key="snapshot.id">
            <button v-if="idx > 0"
                    class="btn btn-sm btn-outline-danger ml-1"
                    @click="deleteSnapshot(snapshot)">
              <fas icon="times-circle"
                   size="1x">
              </fas>
            </button>
          </th>
          <th>
            <button class="btn btn-sm btn-outline-info"
                    @click="addSnapshot">
              <fas icon="plus-circle"
                   size="1x">
              </fas>
            </button>
          </th>
          <th>Stärke</th>
        </tr>
        <tr v-for="(team, idx) in teams" :key="team.name">
          <th scope="col">
            <div class="d-inline-flex">
              <cld-image
                  :publicId="team.cloudinaryId"
                  width="20"
                  height="20"
                  crop="fill"
                  dpr="auto"
                  responsive="true"/>
              <span class="ml-2">{{ team.name }}</span>
            </div>
          </th>
          <td v-for="(value, vIdx) in team.values"
              :key="team.id + '.values[' + vIdx + ']'">
            <input type="number"
                   v-model.number="team.values[vIdx]"
                   min="0"
                   @change="updateSnapshotValue(vIdx, idx, $event)"/>
          </td>
          <td></td>
          <th scope="col">{{ strength(idx) }}</th>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      regions: [],
      region: '',
      challenges: [],
      challenge: '',
      settings: {
        id: 0,
        minStrength: 0,
        maxStrength: 100,
        flatFactor: 0,
        challenge: {
          level: 1
        }
      },
      teams: [],
      snapshots: []
    }
  },
  computed: {
    snapshotCount() {
      return this.snapshots.length;
    },
    maxFlattenedAverage() {
      let max = 0;
      this.teams.forEach(t => {
        let sum = t.values.reduce((sum, v) => sum + v);
        let avg = sum / this.snapshotCount;
        max = Math.max(max, avg);
      });
      for (let flatRuns = 0; flatRuns < this.settings.flatFactor; flatRuns++)
        max = Math.sqrt(max);
      return max;
    },
    minFlattenedAverage() {
      let min = Number.MAX_VALUE;
      this.teams.forEach(t => {
        let sum = t.values.reduce((sum, v) => sum + v);
        let avg = sum / this.snapshotCount;
        min = Math.min(min, avg);
      });
      for (let flatRuns = 0; flatRuns < this.settings.flatFactor; flatRuns++)
        min = Math.sqrt(min);
      return min;
    }
  },
  methods: {
    flattenedAverage(teamIdx) {
      let sum = this.teams[teamIdx].values
          .reduce((sum, v) => sum + v);
      let average = sum / this.snapshotCount;
      for (let flatRuns = 0; flatRuns < this.settings.flatFactor; flatRuns++)
        average = Math.sqrt(average);
      return Number(average);
    },
    strength(teamIdx) {
      let flattenedAvg = this.flattenedAverage(teamIdx);
      flattenedAvg -= this.minFlattenedAverage;
      let percentProjection = flattenedAvg ? flattenedAvg / (this.maxFlattenedAverage - this.minFlattenedAverage) : 0;
      return (this.settings.maxStrength -
          (this.settings.maxStrength - this.settings.minStrength) * percentProjection)
          .toFixed(0)
    },
    updateSnapshotValue(idx, vIdx, $event) {
      this.snapshots[idx].values[vIdx].value = parseFloat($event.target.value);
      this.saveSnapshot(this.snapshots[idx]);
    },
    updateView(viewData) {
      this.settings = viewData.settings;
      this.teams = viewData.teams;
      this.snapshots = viewData.snapshots;
    },
    saveSnapshot(snapshot) {
      this.$api.post('/teamstrengthsnapshots', snapshot).then(response => {
        this.updateView(response.data)
      }).catch(error => this.$emit('error', error.response.data));
    },
    addSnapshot() {
      this.$api.put('/teamstrengthsnapshots', null, {
        params: {
          c: this.challenge.id
        }
      }).then(response => {
        this.updateView(response.data)
      });
    },
    deleteSnapshot(snapshot) {
      this.$api.delete('/teamstrengthsnapshots', {
        params: {
          s: snapshot.id
        }
      }).then(response => {
        this.updateView(response.data)
      });
    }
  },
  watch: {
    region(r) {
      this.$api.get('/challenges', {
        params: {
          region: r
        }
      }).then(response => {
        this.challenges = response.data;
      })
    },
    challenge(c) {
      this.$api.get('/teamstrengthsview', {
        params: {
          c: c.id
        }
      }).then(response => {
        this.updateView(response.data);
      }).catch(error => this.$emit('error', error.response.data));
    },
    settings: {
      handler(newVal, oldVal) {
        if (oldVal.id != 0)
          this.$api.post('/teamstrengthsettings', this.settings);
      },
      deep: true
    }
  },
  mounted() {
    this.$api.get('/regions').then(response => {
      this.regions = response.data;
    })
  }
}
</script>

<style>
td {
  border-left: 1px solid lightgrey;
}

input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>