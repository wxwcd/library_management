const axios = require('axios')
const assert = require('assert')
const setting = require('./setting/config')

axios.defaults.baseURL = setting.url;
describe('category', function () {
  let temp;
  let tempName;
  it('new ', async function () {
    let data = {
      name: 'test' + new Date().getTime()
    }
    await axios.post('/api/category/create', data, setting.requestH)
      .then(res => {
        if (data.name === res.data.name) {
          temp = res.data._id
          assert.ok('sucess')
        } else
          assert.fail("result isn't correct")
      })
      .catch(error => {
        assert.fail(error)
      })
  });
  it('modify ', async function () {
    tempName = 'modify' + new Date().getTime()
    let data = {
      _id: temp,
      name: tempName
    }
    await axios.post('/api/category/update', data, setting.requestH)
      .then(res => {
        if (res.data.ok === 1) {
          assert.ok('success')
        } else
          assert.fail("result isn't correct")
      })
      .catch(error => {
        assert.fail(error)
      })
  });
  it('get ', async function () {
    let url = '/api/category/list?' + `name=${tempName}`
    await axios.get(url, setting.requestH)
      .then(res => {
        if (res.data.rows[0]['name'] === tempName) {
          assert.ok('success')
        } else
          assert.fail("result isn't correct")
      })
      .catch(error => {
        assert.fail(error)
      })
  });
  it('delete ', async function () {
    let data = {"ids": [`${temp}`]};

    let config = {
      method: 'delete',
      url: 'http://127.0.0.1:7001/api/category/remove',
      headers: {
        'Cookie': setting.requestH.headers.Cookie
      },
      data: data
    };

    await axios(config)
      .then(function (response) {
        if (response.data.ok === 1) {
          assert.ok('success')
        } else
          assert.fail("result isn\'t correct")
      })
      .catch(function (error) {
        assert.fail(error)
      });

  });
})
