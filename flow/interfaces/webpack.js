declare var module : {
  hot : {
    accept(path:string, callback:() => void): void;
  };
};

declare var require: any;
