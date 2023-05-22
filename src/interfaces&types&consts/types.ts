export type Trainer = 'Karnaugh' | 'Table';

export type TrainerType = 'auto' | 'static';

export type Operator = '⊕' | '∨' | '∧' | '~' | '←' | '/' | '→' | '↓';

export interface Result {
  count: number;
  progress: number[];
}

export interface XNode {
  index: number;
  bool: boolean;
}
