<template>
  <div class="shopcart-wrapper">
    <div class="shopcart">
      <div
        class="content"
        @click="showshopCart"
        :style="selectedFoodsArray.length === 0 ? { 'pointer-events' : 'none' } : {}"
      >
        <div class="content-left">
          <div class="logo-wrapper">
            <div class="logo">
              <i
                class="iconfont icon-shopping-cart"
                :style="selectedFoodsArray.length === 0 ? { 'pointer-events': 'none' } : {'color': '#FFFFFF', 'background': '#86B902'}"
              ></i>
              <div class="shop-num" v-show="selectedFoodsArray.length">{{ totalCount }}</div>
            </div>
          </div>
          <div class="nochoice" v-show="!selectedFoodsArray.length">您还未选购商品</div>
          <div class="total-price" v-show="selectedFoodsArray.length && totalPrice">
            <span>￥</span>
            {{ totalPrice }}
          </div>
        </div>
        <div class="content-right">
          <button
            class="pay"
            @click="pay"
            :style="selectedFoodsArray.length === 0 ? { 'pointer-events': 'none' } : {'color': '#FFFFFF', 'background': '#86B902'}"
          >去下单</button>
        </div>
      </div>

      <div class="shopcart-list" v-show="listShow && selectedFoodsArray.length">
        <div class="list-header">
          <div class="title">已选商品</div>
          <div @click="empty" class="clear">
            <img src="../../assets/reset.svg" alt="" class="reset-icon">
            <span class="empty">清空</span>
          </div>
        </div>
        <div class="list-content">
          <ul>
            <li v-for="food in selectedFoodsArray" >
              <span class="name">{{ food.name }}</span>
              <div class="price">
                <div class="food-price">
                  <span>¥</span>
                  {{ food.price * food.count }}
                </div>
                <cartcontrol :food="food" :selectedFoodsArray="selectedFoodsArray"></cartcontrol>
               
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <transition name="fade">
      <div class="list-mask"  v-show="listShow &&totalCount >0" @click="showshopCart" ></div>
    </transition>
  </div>
</template>
<script>
import cartcontrol from '../cartcontrol/cartControl'
export default {
  name: "shopCart",
  components: {
    cartcontrol
  },
  props: {
    selectedFoodsArray: {
      type: Array,
      default: []
    },
    
  },
  data() {
    return {
      totalCount: 0,
      totalPrice: 0,
      listShow: false
    };
  },
  
  methods: {
    hideList() {
      // this.$set(listShow,false)
        this.listShow = !this.listShow;
      }
    ,
    empty() {
      this.$emit("clearShopCar", true);
    },
    showshopCart() {
      this.listShow = !this.listShow;
    },
    pay() {
      alert('您需要支付' + this.totalPrice +'元');
    }
  },
  watch: {
    selectedFoodsArray: {
      handler(oldVal, newVal) {
        this.totalPrice = 0;
        this.totalCount = 0;
        for (var i = 0; i < newVal.length; i++) {
          this.totalPrice += newVal[i].count * newVal[i].price;
          this.totalCount += newVal[i].count;
        }
      },
      deep: true
    }
  }
};
</script>
<style scoped>
/* .shopcart-wrapper {
  position: relative;
} */
.shopcart {
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 100000;
  width: 750px;
  height: 130px;
  background-color: #333;
}
.content {
  display: flex;
}
.content-left {
  flex: 1;
}
.logo-wrapper {
  position: relative;
  top: -40px;
  left: 30px;
  width: 150px;
  height: 150px;
  box-sizing: border-box;
  border-radius: 50%;
  background: #333;
}
.logo {
  padding-top: 10px;
}
.icon-shopping-cart {
  font-size: 50px;
  line-height: 130px;
  padding: 27px 24px;
  background: #5b5b5b;
  border: 1px solid #333333;
  border-radius: 50%;
  color: #c1c1c1;
}
.nochoice {
  position: relative;
  top: -100px;
  left: 35px;
  font-size: 30px;
  color: #c1c1c1;
  letter-spacing: 0;
  line-height: 30px;
}
.content-right {
  flex: 0 0 250px;
  margin-top: 20px;
  /* background: #333; */
}
.pay {
  width: 210px;
  height: 80px;
  font-size: 30px;
  color: #c1c1c1;
  letter-spacing: 0;
  text-align: center;
  line-height: 30px;
  background: #5b5b5b;
  border-radius: 8px;
  border: none;
}

.shopcart-list {
  position: absolute;
  left: 0;
  top: 0;
  z-index: -1;
  width: calc(100vw + 10px);
  transform: translate3d(0, -100%, 0);
  max-height: 800px;
  overflow-y: scroll;

}
.list-header {
  /* position: fixed; */
  /* width: calc(100vw -20px); */
  z-index: 30;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100px;
  background: #ffffff;
  box-shadow: 0 -5px 10px 0 rgba(0, 0, 0, 0.05);
  line-height: 40px;
  padding: 0 32px;
  border-bottom: 1px solid rgba(7, 17, 27, 0.1);
}
.title {
  font-size: 36px;
  color: #454545;
  letter-spacing: 0;
  text-align: center;
  line-height: 36px;
}

.reset-icon {
  width: 28px;
  height: 28px;
  padding-top: 8px;
}
.empty {
  font-size: 30px;
  color: #999999;
  letter-spacing: 0;
  text-align: right;
  line-height: 30px;
}
.list-content {
  overflow: hidden;
  background: #fff;
  z-index: 20;
}

.list-content li {
  display: flex;
  justify-content: space-between;
  height: 114px;
  align-items: center;
  padding: 0 32px;
  font-size: 0.3rem;
  color: #000;
  font-weight: bold;
}
.food {
  position: relative;
  padding: 12px 0;
  box-sizing: border-box;
}
.name {
  font-size: 30px;
  color: #454545;
  letter-spacing: 0;
  line-height: 30px;
}
.price {
  display: flex;
  align-items: center;
}
.food-price {
  font-size: 30px;
  color: #ef5350;
  letter-spacing: 0;
  line-height: 30px;
  text-align: left;
  margin-right: 32px;
}
.food-price span {
  font-size: 20px;
}
.cartControl-wrapper {
  position: absolute;
  right: 0;
  bottom: 6px;
}

.shop-num {
  width: 34px;
  height: 34px;
  position: fixed;
  font-style: normal;
  font-size: 20px;
  padding: 5px;
  border-radius: 50%;
  line-height: 34px;
  left: 1.6rem;
  bottom: 120px;
  background: #ef5350;
  color: #fff;
}
.total-price {
  color: #fff;
  letter-spacing: 0;
  line-height: 48px;
  font-size: 48px;
  position: relative;
  top: -100px;
  display: inline-block;
  text-align: center;
}
.total-price span {
  font-size: 30px;
}
.list-mask {
  position: fixed;
  top: 0px;
  left: 0;
  width: 750px;
  height: 100%;
  opacity: 0.4;
  background: #000;
  z-index: 1;
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
  background: #fff;
}
</style>

