import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'risk'
})
export class RiskPipe implements PipeTransform {

  transform(riskLevel:number): string {
    if(riskLevel >=0 && riskLevel <=3){
      return "Low";
    }
    else if(riskLevel >= 4 && riskLevel <=6){
      return "Medium";
    }
    else if(riskLevel >=7 && riskLevel <=10){
      return "High";
    }
    return "Cannot be determined";
  }

}
