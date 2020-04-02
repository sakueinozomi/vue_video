<template>
  <div class="player">
    <h1>{{ msg }}</h1>
  </div>
  
</template>

<script>
// @ is an alias to /src
export default {
  name: 'Player',
  data() {
    return {
      msg: 'player_page'
    }
  },
}
</script>
