export default class Slide {
  constructor(slide, wrapper) {
    this.slide = document.querySelector(slide);
    this.wrapper = document.querySelector(wrapper);
    this.position = {
      finalPosition: 0,
      startX: 0,
      movement: 0,
    };
  }

  moveSlide(positionX) {
    this.position.movePosition = positionX;
    this.slide.style.transform = `translate3d(${positionX}px, 0, 0)`;
  }

  updatePosition(clientX) {
    this.position.movement = (this.position.startX - clientX) * 1.6;
    return this.position.finalPosition - this.position.movement;
  }

  onStart(event) {
    let movetype;
    if (event.type === "mousedown") {
      event.preventDefault();
      this.position.startX = event.clientX;
      movetype = "mousemove";
    } else {
      this.position.startX = event.changedTouches[0].clientX;
      movetype = "touchmove";
    }
    this.wrapper.addEventListener(movetype, this.onMove);
  }

  onMove(event) {
    const pointerPosition =
      event.type === "mousemove"
        ? event.clientX
        : event.changedTouches[0].clientX;
    const finalPosition = this.updatePosition(pointerPosition);
    this.moveSlide(finalPosition);
  }

  onEnd(event) {
    const movetype = event.type === "mouseup" ? "mousemove" : "touchmove";
    this.wrapper.removeEventListener(movetype, this.onMove);
    this.position.finalPosition = this.position.movePosition;
  }

  addSlideEvents() {
    this.wrapper.addEventListener("mousedown", this.onStart);
    this.wrapper.addEventListener("touchstart", this.onStart);

    this.wrapper.addEventListener("mouseup", this.onEnd);
    this.wrapper.addEventListener("touchend", this.onEnd);
  }

  bindEvents() {
    this.onStart = this.onStart.bind(this);
    this.onMove = this.onMove.bind(this);
    this.onEnd = this.onEnd.bind(this);
  }

  init() {
    this.bindEvents();
    this.addSlideEvents();
    return this;
  }
}
