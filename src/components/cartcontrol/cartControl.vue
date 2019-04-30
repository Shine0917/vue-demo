<template>
  <div >
    <div class="cart-sub" @click="subCart(food)" v-show="food.count > 0">
      <span>-</span>
    </div>
    <span class="cart-count" v-show="food.count > 0">{{ food.count }}</span>
    <div class="cart-add" @click="addCart(food)">
      <span>+</span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    food: {
      type: Object
    },
    selectedFoodsArray: {
      type:Array
    },
    // listShow: {
    //   type:Boolean
    // }
  },
  methods: {
   addCart(foods) {
      foods.count += 1;
      if (this.selectedFoodsArray.indexOf(foods) === -1) {
        this.selectedFoodsArray.push(foods);
      }
    },
    subCart(foodObject) {
      Array.prototype.indexOf = function(val) {
        for (var i = 0; i < this.length; i++) {
          if (this[i] == val) return i;
        }
        return -1;
      };
      Array.prototype.remove = function(val) {
        var index = this.indexOf(val);
        if (index > -1) {
          this.splice(index, 1);
        }
      };
      foodObject.count -= 1;
      if (foodObject.count === 0) {
        this.selectedFoodsArray.remove(foodObject);
      
      }
    }
  }
};
</script>
<style scoped>
.cart-add {
  display: inline-block;
  width: 40px;
  height: 40px;
  background: #86b902;
  border-radius: 8px;
  color: #fff;
  line-height: 40px;
}
.cart-add span {
  font-size: 30px;
  width: 20px;
  height: 20px;
}

.cart-sub {
  display: inline-block;
  width: 36px;
  height: 36px;
  background: #fff;
  border-radius: 8px;
  color: #fff;
  line-height: 40px;
  border: 2px solid #86b902;
}
.cart-sub span {
  font-size: 28px;
  color: #86b902;
  width: 20px;
  height: 20px;
}
.cart-count {
  display: inline-block;
  vertical-align: middle;
  width: 40px;
  height: 40px;
  font-size: 28px;
  color: #454545;
  letter-spacing: 0;
  text-align: center;
  line-height: 40px;
}

</style>
