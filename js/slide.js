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
    event.preventDefault();
    this.position.startX = event.clientX;
    this.wrapper.addEventListener("mousemove", this.onMove);
  }

  onMove(event) {
    const finalPosition = this.updatePosition(event.clientX);
    this.moveSlide(finalPosition);
  }

  onEnd(event) {
    this.wrapper.removeEventListener("mousemove", this.onMove);
    this.position.finalPosition = this.position.movePosition;
  }

  addSlideEvents() {
    this.wrapper.addEventListener("mousedown", this.onStart);
    this.wrapper.addEventListener("mouseup", this.onEnd);
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
