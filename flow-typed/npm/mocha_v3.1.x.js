// flow-typed signature: 6b82cf8c1da27b4f0fa7a58e5ed5babf
// flow-typed version: edf70dde46/mocha_v3.1.x/flow_>=v0.22.x

type TestFunction = ((done: () => void) => void | Promise<mixed>);

declare var describe : {
    (name:string, spec:() => void): void;
    only(description:string, spec:() => void): void;
    skip(description:string, spec:() => void): void;
    timeout(ms:number): void;
};

declare var context : typeof describe;

declare var it : {
    (name:string, spec?:TestFunction): void;
    only(description:string, spec:TestFunction): void;
    skip(description:string, spec:TestFunction): void;
    timeout(ms:number): void;
};

declare function before(method : TestFunction):void;
declare function beforeEach(method : TestFunction):void;
declare function after(method : TestFunction):void;
declare function afterEach(method : TestFunction):void;
