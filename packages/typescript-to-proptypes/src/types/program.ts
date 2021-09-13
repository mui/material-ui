import { Component } from './component';

export interface Program {
  body: Component[];
}

export function createProgram(body: Component[] = []): Program {
  return {
    body,
  };
}
