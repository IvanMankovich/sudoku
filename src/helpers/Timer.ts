import { makeAutoObservable } from "mobx";

export enum TimerState {
  initial = "initial",
  running = "running",
  stopped = "stopped",
}

export class Timer {
  state: TimerState = TimerState.initial;
  startTimeStamp: number = 0;
  stopTimeStamp: number = 0;
  time: number = 0;

  constructor() {
    makeAutoObservable(this);
  }

  // reset(): void {
  //   this.state = TimerState.initial;
  //   this.startTimeStamp = 0;
  //   this.stopTimeStamp = 0;
  //   this.time = 0;
  // }

  // run(): void {
  //   this.state = TimerState.running;
  //   this.startTimeStamp = +new Date() - this.time;
  //   this.updateTime();
  // }

  // stop(): void {
  //   this.state = TimerState.stopped;
  //   this.stopTimeStamp = +new Date();
  // }

  // updateTime(): void {
  //   this.time = +new Date() - this.startTimeStamp;

  //   if (this.state === TimerState.running) {
  //     this.tick();
  //   }
  // }

  // getTime(): number {
  //   return this.time;
  // }

  // tick(): void {
  //   setTimeout(() => {
  //     this.updateTime();
  //   }, 1000);
  // }

  // for autoupding timer

  reset(): void {
    this.state = TimerState.initial;
    this.startTimeStamp = 0;
    this.stopTimeStamp = 0;
    this.time = 0;
  }

  run(): void {
    this.state = TimerState.running;
    this.startTimeStamp = +new Date() - this.time;
  }

  stop(): void {
    this.state = TimerState.stopped;
    this.stopTimeStamp = +new Date();
    this.time = this.stopTimeStamp - this.startTimeStamp;
  }

  getTime(): number {
    return +new Date() - this.startTimeStamp;
  }

  getResult(): number {
    return this.time;
  }
}
