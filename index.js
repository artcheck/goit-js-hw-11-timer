class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.selector = selector;
    this.targetDate = targetDate;

    this.refs = {
      daysElem: document.querySelector(
        `${this.selector} span[data-value="days"]`
      ),
      hoursElem: document.querySelector(
        `${this.selector} span[data-value="hours"]`
      ),
      minsElem: document.querySelector(
        `${this.selector} span[data-value="mins"]`
      ),
      secsElem: document.querySelector(
        `${this.selector} span[data-value="secs"]`
      ),
    };
  }
  changeDate() {
    const time = Date.parse(this.targetDate) - Date.parse(new Date());
    if (time > 0) {
      this.calculateTime(time);
    } else {
      this.viewError();
    }
  }
  calculateTime(time) {
    const days = Math.floor(time / (1000 * 60 * 60 * 24));
    const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((time % (1000 * 60)) / 1000);
    this.renderElems(days, hours, mins, secs);
  }

  renderElems(days, hours, mins, secs) {
    this.refs.daysElem.textContent = String(days).padStart(2, "0");
    this.refs.hoursElem.textContent = String(hours).padStart(2, "0");
    this.refs.minsElem.textContent = String(mins).padStart(2, "0");
    this.refs.secsElem.textContent = String(secs).padStart(2, "0");
  }
  run() {
    this.changeDate();
    setInterval(() => {
      this.changeDate();
    }, 1000);
  }
  viewError() {
    document.querySelector(this.selector).textContent = "Timer is over";
  }
}

const timer = new CountdownTimer({
  selector: "#timer-1",
  targetDate: new Date("Dec 22, 2021"),
});

timer.run();
