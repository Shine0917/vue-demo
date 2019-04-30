<template>
  <div>
    <!-- <v-header/> -->
    <div class="goods">
      <div class="menu-wrapper" >
        <ul class="menu-content">
          <li v-for="(item,index) in goods"
              class="menu-item"
              :key="item.id"
              @click="selectFood(index),selectedName(item)"
              :style="changeStyle(item, index)"
          >
            <span :style="listStyle(item, index)">{{item.name}}</span>
          </li>
        </ul>
      </div>

      <div class="foods-wrapper" ref="foodsWrapper">
        <ul>
          <li v-for="food in foodslist" class="food-item" :key="food.id">
            <div class="image">
              <img :src="food.image" alt>
            </div>
            <div class="content">
              <p class="name">{{ food.name }}</p>
              <p class="desc">{{ food.description }}</p>
              <div class="price-wrapper">
                <div class="price">
                  <span>¥</span>
                  {{ food.price }}
                </div>
                <div class="cartcontrol-wrapper">
                  <cartcontrol :food="food" :selectedFoodsArray = 'selectedFoodsArray' ></cartcontrol>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>

    </div>
      <shopCart :selectedFoodsArray = 'selectedFoodsArray' @clearShopCar="clearFoods"></shopCart>

  </div>
</template>

<script>
  import Header from "./header/header.vue";
  import cartcontrol from "./cartcontrol/cartControl.vue";
  import shopCart from './shopcart/shopCart'
  const response = require("../../static/goods.json");
  const ERR_OK = 0;
  export default {
    name: "orderList",
    data() {
      return {
        goods: [],
        foodslist: [],
        highName: "",
        styleObjectSelected: {
          background: '#fff',
          'border-left': '4px solid #86B902',
          'padding-left':'15px',
          'color': "#86B902",
          'font-weight': 'bold',
          width:'120px'
        },
        styleObjectSelected2: {
          background: '#fff'
        },
        styleObject:{
          'border-left': '4px solid #F8F8F8',
          'padding-left':'15px'
        },
        selectedFoodsArray: [],
        listShow:false,
      };
    },
    components: {
      "v-header": Header,
      cartcontrol,
      shopCart
    },
    created() {
      if (response.errno === ERR_OK) {
        this.goods = response.data; //拿到数据
        console.log("goods", this.goods);
        this.foodslist = this.goods[1].foods;
      }
    },
    methods: {
      listStyle: function(item, index) {
        if (item === this.highName) {
          return this.styleObjectSelected;

        } else if (this.highName === "" && index === 1) {
          return this.styleObjectSelected;
        } else {
          return this.styleObject;
        }
      },
      changeStyle: function(item, index){
        if(item === this.highName){
          return this.styleObjectSelected2;
        }else if (this.highName === "" && index === 1) {
          return this.styleObjectSelected2;
        } else {
          return {};
        }
      },
      selectMenu(index, event) {
        if (!event._constructed) {
          return;
          var foodsList = this.$refs.foodsList;
          // console.log("食物清单：", foodsList);
          var el = foodsList[index];
        }
      },
      selectFood(index) {
        this.foodslist = this.goods[index].foods;
        // console.log(index);
        // console.log(this.foodslist);
        this.highName = this.goods[index].name;
      },
      selectedName(selectedName) {
        this.highName = selectedName;
      },
     
      clearFoods: function (val) {
        if(val){
          var temp = this.goods;
          for(var i = 0; i < temp.length; i++){
            for(var j = 0; j < temp[i].foods.length; j++){
              temp[i].foods[j].count = 0;
            }
          }
          this.selectedFoodsArray = [];
        }
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .goods {
    display: flex;
    position: absolute;
    top: 0;
    /* top: 88px; */
    width: 100%;
    overflow: hidden;
    bottom:130px;
    z-index: -50;
  }
  .menu-wrapper {
    margin-top: 12px;
    flex: 0 0 184px;
    width: 184px;
    background-color: #f8f8f8;
    position: fixed;
    height: 100vh;
    /* height: 1000px; */
  }
  .menu-content {
    height: 100vh;
    /* height: calc(100vh - 430px); */
  }
  .menu-item {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 118px;
    width: 184px;
    text-align: center;
    font-size: 30px;
    color: #454545;
    letter-spacing: 0;
    line-height: 40px;
  }

  .foods-wrapper {
    flex: 1;
    margin-top: 34px;
    margin-left: 208px;
    overflow-y: scroll;
    /* margin-bottom: 130px; */
    /* width: calc(100vw + 10px); */
    overflow: hidden;
    z-index: 10;
    /* bottom: 130px; */
    height: calc(100vh -130px);
    /* height: 100%; */
  }
  .image img {
    width: 180px;
    height: 180px;
  }
  .food-item {
    display: flex;
    margin-bottom: 24px;
  }
  .food-item:last-child {
    margin-bottom: 130px;
  }
  .content {
    flex: 1;
    margin-top: 10px;
    margin-left: 16px;
  }
  .name {
    font-size: 30px;
    color: #454545;
    letter-spacing: 0;
    line-height: 36px;
    text-align: left;
    margin: 0 auto;
  }
  .desc {
    font-size: 22px;
    color: #999999;
    letter-spacing: 0;
    line-height: 22px;
    margin-top: 10px;
    text-align: left;
  }
  .price-wrapper {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: nowrap;
    bottom: 15px;
    align-items: center;
    margin-top: 57px;
    margin-right: 37px;
  }
  .price {
    font-size: 30px;
    color: #ef5350;
    letter-spacing: 0;
    line-height: 40px;
    text-align: left;
    left: 0;
    display: flex;
    vertical-align: middle;
  }
  .price span {
    font-size: 20px;
  }
  
.cartcontrol-wrapper {
  position: absolute;
  right: 32px;
}
  
</style>
