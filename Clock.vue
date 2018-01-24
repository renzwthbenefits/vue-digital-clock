<template>
  <time class="clock">
    <span class="clock__hour">{{ hours }}</span><!--
    --><span v-if="!blink || seconds % 2 === 0">:</span><!--
    --><span v-else>&nbsp;</span><!--
    --><span class="clock__minutes">{{ minutes }}</span><!--
        --><span v-if="!blink || (seconds % 2 === 0 && displaySeconds)">:</span><!--
    --><span v-else-if="displaySeconds">&nbsp;</span><!--
    --><span v-if="displaySeconds" class="clock__seconds">{{ seconds }}</span><!--
     --><span v-if="displayMeridian" class="clock_meridian">{{ meridian }}</span>
  </time>
</template>

<script>
function padZero(number) {
  if (number < 10) {
    return '0' + number;
  }
  return number;
}

function fixHours(hours) {
 if (hours > 12) {
   return hours -= 12;
 } else if (hours === 0) {
   return 12;
 }
 return hours;
}

function getDate() {
  return new Date();
}

function getSeconds() {
  return padZero(getDate().getSeconds());
}

function getMinutes() {
  return padZero(getDate().getMinutes());
}

function getHour() {
  return padZero(fixHours(getDate().getHours()));
}

function getMeridian() {
  return getDate.getHours() >= 12 ? 'PM' : 'AM';
}

module.exports = {
  name: 'clock',

  props: ['blink', 'displaySeconds', 'displayMeridian'],

  data: function data() {
    return {
      ticker: null,
      minutes: getMinutes(),
      hours: getHour(),
      seconds: getSeconds(),
      meridian: getMeridian(),
    };
  },

  created: function created() {
    var _this = this;

    this.ticker = setInterval(function ticker() {
      _this.minutes = getMinutes();
      _this.hours = getHour();
      _this.seconds = getSeconds();
      _this.meridian = getMeridian();
    }, 1000);
  },

  destroyed: function destroyed() {
    clearInterval(this.ticker);
  },

};
</script>
