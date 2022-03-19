<template>
  <StandardLayout>
    <template v-slot:header>Spiele</template>
    <template v-slot:main>
      <div class="container row input-group pb-2 mb-2">
        <label for="dateInput" class="col-form-label mr-2">Datum</label>
        <input id="dateInput"
               type="date"
               class="form-control col-4"
               v-model="inputDate"
               autofocus/>
      </div>
      <div v-for="region in regions"
           :key="region">
        <span class="h4">{{ region }}</span>
        <div v-for="challenge in getChallengesByRegion(region)"
             :key="challenge">
          <span class="font-weight-bold">{{ challenge }}</span>
          <div class="table">
            <div class="d-table-row" v-for="match in getMatchesByChallenge(challenge)" :key="match.id">
              <div class="d-table-cell">{{ match.id }}</div>
              <div class="d-table-cell" @click="toggleFeatured(match)">
                <fas icon="exclamation-circle" size="1x"
                     :class="{'text-secondary': !match.featured, 'text-danger':match.featured}"/>
              </div>
              <div class="d-table-cell small">
                <span v-if="match.matchStateEnum === 0" class="badge-pill badge-secondary">geplant</span>
                <span v-if="match.matchStateEnum === 1" class="badge-pill badge-success">bereit</span>
                <span v-if="match.matchStateEnum === 2" class="badge-pill badge-warning">läuft</span>
                <span v-if="match.matchStateEnum === 3" class="badge-pill badge-info">beendet</span>
                <span v-if="match.matchStateEnum === 4" class="badge-pill badge-danger">abgesagt</span>
                <span v-if="match.matchStateEnum === 5" class="badge-pill badge-danger">verschoben</span>
                <span v-if="match.matchStateEnum === 6" class="badge-pill badge-danger">abgebrochen</span>
              </div>
              <div class="d-table-cell">
                {{ $luxon(match.start, "HH:mm") }}
              </div>
              <div class="d-table-cell">{{ match.team1 }}</div>
              <div class="d-table-cell">{{ match.team2 }}</div>
              <div class="d-table-cell" :class="{'text-warning': isLive(match)}">
                <div v-if="match.goalsTeam1 >= 0">
                  {{ match.goalsTeam1 }}:{{ match.goalsTeam2 }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </StandardLayout>
</template>
<script>
import StandardLayout from "@/layouts/StandardLayout";
import {mapActions} from "vuex";

export default {
  data() {
    return {
      unixTime: new Date().getTime(),
      matches: []
    }
  },
  computed: {
    inputDate: {
      get() {
        return this.$luxon(new Date(this.unixTime).toISOString(), 'yyyy-MM-dd')
      },
      set(dateStr) {
        this.unixTime = this.$luxon(dateStr, 'millis')
      }
    },
    regions() {
      let res = []
      this.matches.forEach(m => {
        if (res.indexOf(m.region) < 0)
          res.push(m.region)
      })
      return res
    }
  },
  methods: {
    ...mapActions(['handleError']),
    getChallengesByRegion(region) {
      let res = []
      this.matches.forEach(m => {
        if (m.region === region && res.indexOf(m.challenge) < 0)
          res.push(m.challenge)
      })
      return res
    },
    getMatchesByChallenge(challenge) {
      let res = []
      this.matches.forEach(m => {
        if (m.challenge === challenge && res.indexOf(m) < 0)
          res.push(m)
      })
      return res
    },
    isLive(match) {
      return match.matchStateEnum === 2
    },
    load() {
      let start = this.unixTime
      let end = this.unixTime
      this.$api.get(`/schedule/${start}/${end}`).then(result => {
        this.matches = result.data
      }).catch(error => this.handleError(error))
    },
    async toggleFeatured(match) {
      await this.$api.post(`/matches/${match.id}`, null, {
        params: {
          featured: !match.featured
        }
      })
      this.load()
    }
  },
  watch: {
    unixTime() {
      this.load()
    }
  },
  mounted() {
    this.load()
  },
  components: {StandardLayout}
}
</script>

<style>
.d-table-cell {
  padding-right: 1.6em;
}

.live {
  color: deeppink;
}
</style>
