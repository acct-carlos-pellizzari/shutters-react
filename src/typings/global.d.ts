import { Element } from 'p5';
declare module 'p5' {
  interface Element {
    /**
     * The .<a href="#/p5.Element/input">input()</a> function is called when any user input is
     * detected with an element. The input event is often used
     * to detect keystrokes in a input element, or changes on a
     * slider element. This can be used to attach an element specific
     * event listener.
     *
     * @method input
     * @param  {Function|Boolean} fxn function to be fired when any user input is
     *                                detected within the element.
     *                                if `false` is passed instead, the previously
     *                                firing function will no longer fire.
     * @chainable
     * @example
     * <div><code>
     * // Open your console to see the output
     * function setup() {
     *   createCanvas(100, 100);
     *   background('grey');
     *   let inp = createInput('');
     *   inp.position(0, 0);
     *   inp.size(100);
     *   inp.input(myInputEvent);
     * }
     *
     * function myInputEvent() {
     *   console.log('you are typing: ', this.value());
     * }
     * </code></div>
     *
     * @alt
     * no display.
     */
    input(fxn);

    
  }
}
