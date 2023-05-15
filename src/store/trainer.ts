import { makeAutoObservable } from 'mobx';
import { TrainerType } from '../interfaces&types&consts/types';

class Counter {
  trainerType = 'auto';
  constructor() {
    makeAutoObservable(this);
  }

  switch(type: TrainerType) {
    this.trainerType = type;
  }
}
