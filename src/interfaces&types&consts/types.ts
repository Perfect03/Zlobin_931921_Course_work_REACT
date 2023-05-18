export type TrainerType = 'auto' | 'static';

export type Operator = '⊕' | '∨' | '∧' | '~' | '←' | '∕' | '→' | '↓';

export interface XNode {
  index: number;
  bool: boolean;
}
