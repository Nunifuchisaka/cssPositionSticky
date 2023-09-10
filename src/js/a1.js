import $ from 'jquery';
import _ from 'underscore';

$(function(){
  
  $('.container_1').each(function(){
    new Container_1(this);
  });
  
});


class Container_1 {
  
  #$el;
  #$page_1;
  #obs;
  #intersectingElements = [];
  
  constructor(el) {
    console.group('Container_1');
    const self = this;
    this.#$el = $(el);
    this.#$page_1 = this.#$el.find('.page_1');
    //console.log('this.#$page_1', this.#$page_1);
    console.groupEnd();
    
    this.#obs = new IntersectionObserver(function(entries){
      for ( let i = 0; i < entries.length; i++ ) {
        const $me = $(entries[i].target),
              index = self.#$page_1.index($me);
        if( entries[i].isIntersecting ){
          //console.log(index, '交差した');
          self.#intersectingElements.push(index);
        } else {
          //console.log(index, '外れた');
          self.#intersectingElements = _.without(self.#intersectingElements, index);
        }
        self.#change();
      }
    }, {
        threshold: .2
      }
    );
    
    this.#$page_1.each(function(){
      self.#obs.observe(this);
    });
  }
  
  #change() {
    console.group('Container_1: change');
    console.log('intersectingElements', this.#intersectingElements);
    this.#removeCurrentClass();
    const last = this.#intersectingElements.slice(-1)[0];
    if ( 'number' === typeof last ) {
      this.#$el.addClass('current_' + last);
    }
    console.groupEnd();
  }
  
  #removeCurrentClass() {
    const self = this,
          klass = this.#$el.attr('class');
    const currentClass = [];
    _.each(klass.split(' '), function(v){
      if ( 0 === v.indexOf('current_') ) {
        currentClass.push(v);
      }
    });
    //console.log('currentClass', currentClass);
    if ( currentClass.length ) {
      currentClass.forEach(function(v){
        self.#$el.removeClass(v);
      });
    }
  }
  
}
