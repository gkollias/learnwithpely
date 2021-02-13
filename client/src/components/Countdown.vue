<template>
  <div class="base-timer">
    <svg
      class="base-timer__svg"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g class="base-timer__circle">
        <circle
          class="base-timer__path-elapsed"
          cx="50"
          cy="50"
          r="45"
        />
        <path
          id="base-timer-path-remaining"
          stroke-dasharray="283"
          class="base-timer__path-remaining ${remainingPathColor}"
          d="
          M 50, 50
          m -45, 0
          a 45,45 0 1,0 90,0
          a 45,45 0 1,0 -90,0
        "
        />
      </g>
    </svg>
    <span
      id="base-timer-label"
      class="base-timer__label"
    >{{ formatTime(
      timeLeft
    ) }}</span>
  </div>
</template>

<script>
const FULL_DASH_ARRAY = 283;
const WARNING_THRESHOLD = 5;
const ALERT_THRESHOLD = 3;

const COLOR_CODES = {
  info: {
    color: 'green',
  },
  warning: {
    color: 'orange',
    threshold: WARNING_THRESHOLD,
  },
  alert: {
    color: 'red',
    threshold: ALERT_THRESHOLD,
  },
};

const TIME_LIMIT = 10;
// const remainingPathColor = COLOR_CODES.info.color;

export default {
  props: {
    restartTimer: {
      type: Boolean,
      default: false,
    },
    timerStopped: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      timePassed: 0,
      timeLeft: TIME_LIMIT,
      timerInterval: null,
    };
  },

  watch: {
    restartTimer() {
      this.initTimer();
    },
    // timerStopped(val) {
    //   // eslint-disable-next-line no-console
    //   console.log('in watch 2');
    //   if (val) {
    //     this.initTimer();
    //   }
    // },
  },
  mounted() {
    const { info } = COLOR_CODES;
    document
      .getElementById('base-timer-path-remaining')
      .classList.add(info.color);
    this.startTimer();
  },
  methods: {
    onTimesUp() {
      clearInterval(this.timerInterval);
    },
    startTimer() {
      this.timerInterval = setInterval(() => {
        // eslint-disable-next-line no-multi-assign
        this.timePassed = this.timePassed += 1;
        this.timeLeft = TIME_LIMIT - this.timePassed;
        document.getElementById('base-timer-label').innerHTML = this.formatTime(
          this.timeLeft,
        );
        this.setCircleDasharray();
        this.setRemainingPathColor(this.timeLeft);

        if (this.timeLeft === 0 || this.timerStopped) {
          this.onTimesUp();
        }
      }, 1000);
    },
    formatTime(time) {
      const minutes = Math.floor(time / 60);
      let seconds = time % 60;

      if (seconds < 10) {
        seconds = `0${seconds}`;
      }

      return `${minutes}:${seconds}`;
    },
    setRemainingPathColor(timeLeftParam) {
      const { alert, warning, info } = COLOR_CODES;
      if (timeLeftParam <= alert.threshold) {
        document
          .getElementById('base-timer-path-remaining')
          .classList.remove(warning.color);
        document
          .getElementById('base-timer-path-remaining')
          .classList.add(alert.color);
      } else if (timeLeftParam <= warning.threshold) {
        document
          .getElementById('base-timer-path-remaining')
          .classList.remove(info.color);
        document
          .getElementById('base-timer-path-remaining')
          .classList.add(warning.color);
      } else {
        document
          .getElementById('base-timer-path-remaining')
          .classList.add(info.color);
      }
    },
    calculateTimeFraction() {
      const rawTimeFraction = this.timeLeft / TIME_LIMIT;
      return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
    },
    setCircleDasharray() {
      const circleDasharray = `${(
        this.calculateTimeFraction() * FULL_DASH_ARRAY
      ).toFixed(0)} 283`;
      document
        .getElementById('base-timer-path-remaining')
        .setAttribute('stroke-dasharray', circleDasharray);
    },
    initTimer() {
      this.timePassed = 0;
      this.timeLeft = TIME_LIMIT;
      this.timerInterval = null;
      const { alert, info } = COLOR_CODES;

      document.getElementById('base-timer-label').innerHTML = this.formatTime(
        this.timeLeft,
      );
      document
        .getElementById('base-timer-path-remaining')
        .classList.remove(alert.color);
      document
        .getElementById('base-timer-path-remaining')
        .classList.add(info.color);
      this.startTimer();
    },
  },
};
</script>
<style>
body {
  font-family: sans-serif;
}

.base-timer {
  position: relative;
  width: 100px;
  height: 100px;
}

.base-timer__svg {
  transform: scaleX(-1);
}

.base-timer__circle {
  fill: none;
  stroke: none;
}

.base-timer__path-elapsed {
  stroke-width: 7px;
  stroke: grey;
}

.base-timer__path-remaining {
  stroke-width: 7px;
  stroke-linecap: round;
  transform: rotate(90deg);
  transform-origin: center;
  transition: 1s linear all;
  fill-rule: nonzero;
  stroke: currentColor;
}

.base-timer__path-remaining.green {
  color: rgb(65, 184, 131);
}

.base-timer__path-remaining.orange {
  color: orange;
}

.base-timer__path-remaining.red {
  color: red;
}

.base-timer__label {
  position: absolute;
  width: 100px;
  height: 100px;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
}
</style>
