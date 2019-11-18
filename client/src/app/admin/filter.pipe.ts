import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(arr: any[], prop: any, value: any , method:Method): any {
    if (arr) {
      if (!value) {
        return arr
      } else {
        return arr.filter(obj => this.filter(obj[prop],value, method))
      }
    } else {
      return []
    }
  }

  filter(source :string, target :string, method:Method) : boolean {
    console.log(source);
    console.log(target);
    switch(method) {
      case "includes" : return source.includes(target)
      case "equal"  : return source === target
      case "not-equal" : return source !== target
    }
  }
}

type Method ="includes" | "equal" | "not-equal"