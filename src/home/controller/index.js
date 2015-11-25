'use strict';

import Base from './base.js';

export default class extends Base {

  indexAction(){
    return this.display();
  }

  /**
   * fe action
   * @return {Promise} []
   */
  async feAction(){
    let xueyuanModel = this.model('xueyuan');
    let data = await xueyuanModel.where({type: "前端", status: "on"}).order('id asc').select();
    let envokedData = {};
    data.forEach(d => {
      envokedData[d.id] = d;
      envokedData[d.id]['score'] = 0;
    });

    let allscore = await this.model('score').select();
    allscore.forEach(function (s) {
      if (!envokedData[s.xueyuan_id]) return;
      if (undefined ==  envokedData[s.xueyuan_id]['score']) {
        envokedData[s.xueyuan_id]['score'] = s.score;
      } else {
        envokedData[s.xueyuan_id]['score'] += s.score;
      }
    });
    this.assign('list', data);
    //auto render template file index_index.html
    return this.display('index');
  }

  /**
   * be action
   * @return {Promise} []
   */
  async beAction(){
    let xueyuanModel = this.model('xueyuan');
    let data = await xueyuanModel.where({type: "后端", status: "on"}).order('id asc').select();
    let envokedData = {};
    data.forEach(d => {
      envokedData[d.id] = d;
      envokedData[d.id]['score'] = 0;
    });

    let allscore = await this.model('score').select();
    allscore.forEach(function (s) {
      if (!envokedData[s.xueyuan_id]) return;
      if (undefined ==  envokedData[s.xueyuan_id]['score']) {
        envokedData[s.xueyuan_id]['score'] = s.score;
      } else {
        envokedData[s.xueyuan_id]['score'] += s.score;
      }
    });
    this.assign('list', data);
    //auto render template file index_index.html
    return this.display('index');
  }

  async firedAction(){
    let xueyuanModel = this.model('xueyuan');
    let data = await xueyuanModel.where({status: "off"}).order('id asc').select();
    this.assign('list', data);
    //auto render template file index_index.html
    return this.display('fired');
  }

}