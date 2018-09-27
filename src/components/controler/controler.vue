<template>
  <div class="controler">
    <div class="decrease" @click="decrease($event)">-</div>
    <div class="num">{{good.count}}</div>
    <div class="increase" @click="increase($event)">+</div>
  </div>
</template>

<script>
import Vue from 'vue'
export default {
  props: {
    good: {
      type: Object,
      default: function () {
        return []
      }
    }
  },
  data () {
    return {
    }
  },
  methods: {
    increase (e) {
      if (!e._constructed) {
        return
      }
      if (!this.good.count) {
        Vue.set(this.good, 'count', 1)
      } else {
        this.good.count++
      }
      this.$emit('changeCount', this.good, 'increase')
    },
    decrease (e) {
      if (!e._constructed) {
        return
      }
      this.good.count--
      this.$emit('changeCount', this.good, 'decrease')
    }
  }
}
</script>

<style lang="stylus" scoped>
  .controler
    position absolute
    right 2rem
    bottom 1.5rem
    display flex
    .decrease
      width 2.44rem;
      height 2.07rem;
      color rgba(80, 80, 80, 1);
      font-size 1.4rem;
      line-height 150%;
      border rgba(217, 216, 216, 1) solid 1px;
      text-align center;
    .num
      width 4.26rem;
      height 2.07rem;
      color rgba(80, 80, 80, 1);
      font-size 1.4rem;
      line-height 150%;
      border rgba(217, 216, 216, 1) solid 1px;
      text-align center;
    .increase
      width 2.44rem;
      height 2.07rem;
      color rgba(80, 80, 80, 1);
      font-size 1.4rem;
      line-height 150%;
      border rgba(217, 216, 216, 1) solid 1px;
      text-align center;

</style>
