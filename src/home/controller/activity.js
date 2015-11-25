'use strict';

import Base from './base.js';

export default class extends Base {
  /**
   * index action
   * 显示有多少activity
   * @return {Promise} []
   */
  indexAction(){
    //auto render template file index_index.html
    return this.display();
  }

  async addAction() {
    //姓名
    //啥活动
    //分数

    let xueyuan_id = this.post('xueyuan_id'),
        activity = this.post('activity'),
        score = parseInt(this.post('score'));
    let modelActivity = this.model('activity');
    let insertId, _act = await modelActivity.where({activity_name: activity}).find();
    if (!_act['activity_id']) {
      insertId = await modelActivity.add({activity_name: activity});
    } else {
      //do nothing
      insertId = _act.activity_id;
    }
    let xueyuan = await this.model('xueyuan').where({id: xueyuan_id}).find();
    if (!xueyuan['realname']) {
      return this.fail('找不到这个人');
    }

    let modelScore = this.model('score');
    await modelScore.add({
      xueyuan_id: xueyuan_id,
      score: score,
      activity_id: insertId,
      ts: +new Date()
    });
    return this.success('success');
  }
}