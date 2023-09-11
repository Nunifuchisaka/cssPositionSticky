import $ from 'jquery';
import _ from 'underscore';

export default class {
  
  #$el;
  #$page;
  #obs;
  #intersectingElements = [];
  
  constructor(el) {
    const self = this;
    this.#$el = $(el);
    this.#$page = this.#$el.find('.js_page');
    
    this.#obs = new IntersectionObserver(function(entries){
      for ( let i = 0; i < entries.length; i++ ) {
        const $me = $(entries[i].target),
              index = self.#$page.index($me);
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
    
    this.#$page.each(function(){
      self.#obs.observe(this);
    });
  }
  
  #change() {
    this.#removeCurrentClass();
    const last = this.#intersectingElements.slice(-1)[0];
    if ( 'number' === typeof last ) {
      this.#$el.addClass('current_' + last);
    }
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
