'use strict';

import Base from './base.js';

export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  indexAction(){
    //auto render template file index_index.html
    return this.display();
  }

  async modifyAction() {
    let id = this.post('id'),
        realname = this.post('realname'),
        tel = this.post('tel'),
        xh = this.post('xh'),
        qq = this.post('qq');

    if (id) {
      let affected = await this.model('xueyuan').where({id: id}).update({
        realname: realname,
        tel: tel,
        xh: xh,
        qq: qq
      });
      return this.success('fire ok, rows: ' + affected);
    } else {
      return this.fail('fail');
    }
  }

  async fireAction() {
    let id = this.post('fireId');
    if (id) {
      let affected = await this.model('xueyuan').where({id: id}).update({
        status: 'off'
      });
      return this.success('fire ok, rows: ' + affected);
    } else {
      return this.fail('fail');
    }
  }
  async restoreAction() {
    let id = this.post('fireId');
    if (id) {
      let affected = await this.model('xueyuan').where({id: id}).update({
        status: 'on'
      });
      return this.success('fire ok, rows: ' + affected);
    } else {
      return this.fail('fail');
    }
  }
}