<template>
  <div class="shopcart">
    <div class="header">
      <div class="wrapper">
        <p class="title">我的购物车</p>
        <span class="manage"></span>
        <span class="sum">共{{count}}件宝贝</span>
      </div>
    </div>
    <div class="content" ref="goods">
      <ul class="goods">
        <li ref="goodLi" class="good-item" :key="index" v-for="(good,index) in goods" v-show="good.count > 0">
          <div class="left">
            <span class="per-icon icon" @click="selectItem($event,good)"></span>
          </div>
          <div class="right">
            <div class="line"></div>
            <div class="flex-box">
              <div class="left">
                <img class="img" src="./61.png" alt="">
              </div>
              <div class="right">
                <p class="desc">{{good.name}}</p>
                <span class="price">￥{{good.price}}</span>
              </div>
              <Controler :good="good" @changeCount="getTotalPrice"></Controler>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="bottom">
      <div class="up">
        <span class="icon" :class="{'selectedClass': selectedAll}" @click="selectAll"></span>
        <span class="desc">全选</span>
        <span class="sum">合计：￥{{totalPrice}}</span>
        <span class="calc" @click="pay">结算</span>
      </div>
      <div class="down">
        <div class="left active pageIcon" @click="selectPage($event)">
          <span class="home fa fa-home"></span>
          <span class="desc">主页</span>
        </div>
        <div class="center pageIcon" @click="selectPage($event)">
          <span class="cart fa fa-shopping-cart"></span>
          <span class="desc">购物车</span>
        </div>
        <div class="right pageIcon" @click="selectPage($event)">
          <span class="user fa fa-user"></span>
          <span class="desc">未登录</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import BScroll from 'better-scroll'
import Controler from 'components/controler/controler'

export default {
  data () {
    return {
      goods: [
        {
          name: '好粥道',
          count: 1,
          price: 10
        },
        {
          name: '合味道',
          count: 1,
          price: 20
        },
        {
          name: '天地壹号',
          count: 1,
          price: 5
        },
        {
          name: '可口可乐',
          count: 1,
          price: 5
        }
      ],
      selectedAll: false,
      pageIcon: [],
      totalPrice: 0,
      count: 4,
      hasSelectGoods: false
    }
  },
  components: {
    Controler
  },
  methods: {
    selectItem (event, good) {
      this.selectedAll = false
      // 不存在此属性 添加 且置位选中状态
      if (good.selected === undefined) {
        Vue.set(good, 'selected', true)
      } else if (good.selected) {
        good.selected = false
      } else if (!good.selected) {
        good.selected = true
      }
      if (good.selected) {
        event.target.style.backgroundColor = 'rgba(190, 189, 189, 1)'
        this.totalPrice += good.count * good.price
      } else {
        event.target.style.backgroundColor = 'rgb(255,255,255)'
        this.totalPrice -= good.count * good.price
      }
      this.totalPrice = this.totalPrice < 0 ? 0 : this.totalPrice
    },
    selectAll () {
      this.selectedAll = !this.selectedAll
      this.totalPrice = 0
      for (let i = 0; i < this.selectIcon.length; i++) {
        if (this.selectedAll) {
          this.totalPrice += this.goods[i].price * this.goods[i].count
          this.goods[i].selected = true
          this.selectIcon[i].style.backgroundColor = 'rgba(190, 189, 189, 1)'
        } else {
          this.goods[i].selected = false
          this.selectIcon[i].style.backgroundColor = 'rgb(255,255,255)'
        }
      }
    },
    selectPage (event) {
      for (let i = 0; i < this.pageIcon.length; i++) {
        this.pageIcon[i].style.color = '#ddd'
      }
      event.path[1].style.color = '#000'
    },
    pay () {
      let deleteArr = []
      for (let i = 0; i < this.goods.length; i++) {
        if (this.goods[i].selected) {
          deleteArr.push(i)
        }
        this.selectIcon[i].style.backgroundColor = 'rgb(255,255,255)'
      }
      deleteArr.forEach((val) => {
        this.goods.splice(val, deleteArr.length)
      })
      this.count = this.goods.length
      alert(`成功支付${this.totalPrice}元！ `)
      this.totalPrice = 0
    },
    _initScroll () {
      this.scroll = new BScroll(this.$refs.goods, {
        click: true
      })
    },
    getTotalPrice (good, behavior) {
      if (good.count === 0) {
        this.count--
      }
      // 如果未选中任何商品 不做处理
      if (!good.selected) {
        return
      }
      if (good.count !== 0) {
        if (behavior === 'increase') {
          this.totalPrice += good.price
        } else {
          this.totalPrice -= good.price
        }
      } else {
        this.totalPrice -= good.price
      }
    }
  },
  mounted () {
    this.selectIcon = document.getElementsByClassName('per-icon')
    this.pageIcon = document.getElementsByClassName('pageIcon')
    this.pageDesc = document.getElementsByClassName('pageDesc')
    this.$nextTick(() => {
      this._initScroll()
    })
  }
}
</script>

<style lang="stylus" scoped>
  .shopcart
    position relative
    width 100%
    height 100%
    .header
      position relative
      width: 100%;
      height: 10rem;
      color: rgba(80, 80, 80, 1);
      background-color: rgba(233, 100, 100, 1);
      font-size: 0.88rem;
      line-height: 150%;
      text-align: center;
      .wrapper
        position relative
        width 90%
        height 100%
        margin 0 auto
        .title, .manage, .sum
          position absolute
          color: rgba(255, 255, 255, 1);
          line-height: 150%;
          text-align: center;
        .title
          left: 0;
          top: 1rem;
          font-weight bold
          font-size 2.5rem
        .manage
          right 0
          top 2rem
          font-size 1.4rem
        .sum
          left 0
          top 5rem
          font-size 1.4rem
    .content
      height 34.5rem
      margin 0 auto
      width 100%
      background #fdf9f9
      overflow hidden
      .goods
        position relative
        margin 0 auto
        .good-item
          display flex
          padding-top 2rem
          position relative
          margin 1rem auto
          width 90%
          height 10.39rem
          border-radius 1.03rem
          box-shadow 0rem 0.07rem 0.07rem 0rem rgba(241, 234, 234, 0.5);
          text-align: center
          background #fff
          &:first-child
            margin-top 0
          .left
            display flex
            justify-content center
            align-items center
            width 3.2rem
            height 100%
            .icon
              width 1.2rem
              height 1.2rem
              border 1px solid rgba(190, 189, 189, 1)
              border-radius 50%
              &.selectedClass
                background rgba(190, 189, 189, 1)
          .right
            height 100%
            flex 1 auto
            .line
              width 90%
              height 0.08rem
              background rgba(153, 153, 153, 1)
            .flex-box
              display flex
              align-items center
              box-sizing border-box
              height 100%
              .left
                width 6rem
                height 6rem
                img
                  width 100%
                  height 100%
              .right
                position relative
                flex 1 auto
                margin-left 1rem
                .desc
                  display: -webkit-box;
                  -webkit-line-clamp: 2;
                  -webkit-box-orient: vertical;
                  overflow hidden
                  text-overflow ellipsis
                  margin-top 2rem
                  width 16rem;
                  height 3.4rem
                  font-size 2rem
                  text-align: left
                .price
                  position absolute
                  left 0
                  bottom 1.65rem
                  font-size 1.8rem
                  text-align left
    .bottom
      height 10rem
      width 100%
      position fixed
      left 0
      bottom 0
      .up
        display flex
        align-items center
        width 100%
        height 4.8rem
        border-top rgba(159, 156, 156, 0.5)
        box-shadow 0.12rem -0.23rem 1.17rem 0rem rgba(159, 156, 156, 0.5);
        .sum
          margin-left 8rem
          margin-right 1rem
          font-size 1.4rem
        .calc
          width 7.28rem;
          height 4.19rem;
          text-align: center
          line-height 4.19rem
          color #fff
          background rgba(233, 100, 100, 1)
          border-radius 2rem
          font-size 1.4rem
          text-shadow rgba(0, 0, 0, 0.5) 0rem 0.2rem 0.2rem;
        .icon
          display inline-block
          font-size 0
          margin-left 2.6rem
          margin-right 1rem
          width 1.2rem
          height 1.2rem
          border 1px solid rgba(190, 189, 189, 1)
          border-radius 50%
          &.selectedClass
            background rgba(190, 189, 189, 1)
        .desc
          font-size 1.4rem
      .down
        display flex
        justify-content space-around
        align-items center
        width 100%
        height 5.2rem
        border-top 1px solid rgba(204, 204, 204, 1)
        .left, .center, .right
          color #ddd
          &.active
            color #000
        .desc
          width 3rem
          display block
          text-align: center
        .home, .cart, .user
          text-align: center
          display inline-block
          font-size 2.8rem
          width 2.8rem
          height 2.8rem

</style>
