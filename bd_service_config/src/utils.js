export default {
  validate_template(value, template, name = 'object') {
    for (let key in template) {
      if (value.hasOwnProperty(key)) {
        //如果是一个对象则递归验证
        if (typeof(template[key]) === 'object') {
          if (!this.validate_template(value[key], template[key], `${name}.${key}`)) {
            return false
          }
        } else {
          //判断是不是对应的类型
          if (!(typeof(value[key]) === typeof(template[key]))) {
            console.error(`${name}.${key} 的类型应该是 ${typeof(template[key])} 而不是 ${typeof(value[key])} `);
            return false
          }
        }
      } else {
        console.error(`缺少 ${name}.${key} `);
        return false;
      }
    }
    return true;
  },


  // 对象复制方法，包括数组
  copy(obj) {
    if (!(obj instanceof Object)) {
      return obj;
    }
    if (obj instanceof Array) {
      let newobj = Array(obj.length);
      for (let index in obj) {
        newobj[index] = this.copy(obj[index])
      }
      return newobj;
    } else {
      let newobj = {};
      for (var attr in obj) {
        newobj[attr] = this.copy(obj[attr]);
      }
      return newobj;
    }
  }
}
