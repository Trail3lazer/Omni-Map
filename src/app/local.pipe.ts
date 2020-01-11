import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "local"
})
export class LocalPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return "file:///" + value;
  }

}
