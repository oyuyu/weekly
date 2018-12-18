import config from '../common/config';

const getRouteSet = (data => {
  let arr = [];
  data.forEach(value => {
    if (value.children) {
      value.children.forEach(value => {
        arr.push(value.path);
      })
    } else {
      arr.push(value.path);
    }
  });
  return arr;
})(config);

const getRouteMap = (data => {
  let obj = {};
  data.forEach(value => {
    if (value.children) {
      let role = value.role;
      value.children.forEach(value => {
        obj[value.path] = {
          component: value.component,
          role,
        }
      })
    } else {
      obj[value.path] = {
        component: value.component,
        role: value.role
      };
    }
  });
  return obj;
})(config);

export {
  getRouteSet,
  getRouteMap,
}
