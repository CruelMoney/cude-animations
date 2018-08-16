/*
 * promiseSerial resolves Promises sequentially.
 * @example
 * const urls = ['/url1', '/url2', '/url3']
 * const funcs = urls.map(url => () => $.ajax(url))
 *
 * promiseSerial(funcs)
 *   .then(console.log)
 *   .catch(console.error)
 */
const promiseSequence = funcs =>
  funcs.reduce((promise, func) =>
    promise.then(result => func().then(Array.prototype.concat.bind(result))),
    Promise.resolve([]));


const runAnimationSequence = (animations) => {
  !!window.animation &&  cancelAnimationFrame(window.animation);

  return new Promise((resolve, reject)=> {
    
    let initTimestamp;
    let animation;
    let duration = animations.reduce((max, a) => Math.max(a.duration, max), 0);
    let offset = animations.reduce((offset, a) => (a.offset + offset), -animations[0].offset);
    duration += offset; // add the offset

    const animationHandler = timestamp => {
      const td = timestamp - initTimestamp;
      const timeleft = duration - td;
      if(timeleft > 0){
        animations.forEach((animation, idx) => {
          const offset = idx*animation.offset;
          animation.animationHandler(timestamp-offset, initTimestamp);
        });
        animation = window.requestAnimationFrame(animationHandler);
        window.animation = animation; 
      }else{
        cancelAnimationFrame(animation);
        resolve();
      }
    }

    animation = window.requestAnimationFrame(timestamp => {
      initTimestamp = timestamp;
      animationHandler(timestamp, initTimestamp, resolve);
    });
  });
}

export{
  promiseSequence,
  runAnimationSequence
}