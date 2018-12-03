<template>
  <div>
    <date-time-picker :model.sync="start"/>
    <date-time-picker :model.sync="end"/>
  </div>
</template>

<script>
import DateTimePicker from 'vue-datetime-picker';
export default {
  name: 'DateRangePicker',
  components: [
    DateTimePicker
  ],
  data() {
    return {
      start: null,
      end: null,
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  
</style>
