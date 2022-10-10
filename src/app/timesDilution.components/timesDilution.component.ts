import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CommonService } from '../service/common.service';

@Component({
  selector: 'timesDilution',
  templateUrl: './timesDilution.component.html',
  styleUrls: ['./timesDilution.component.css'],
})
export class TimesDilution {
  constructor(private commonService: CommonService) {}
  calculate() {
    let inputMaterialsPpm = this.commonService.getValue_inputMaterialsPpm();
    let outputMaterialsPpm = this.commonService.getValue_outputMaterialsPpm();
    let outputMaterialsVolume =
      this.commonService.getValue_outputMaterialsVolume();
    let waterVolume: Number;
    let originalVolume: Number;

    originalVolume =
      ((Number(outputMaterialsPpm) * 100000) /
        Number(inputMaterialsPpm) /
        100000) *
      Number(outputMaterialsVolume);
    waterVolume =
      Number(outputMaterialsVolume) *
      (1 -
        (Number(outputMaterialsPpm) * 100000) /
          Number(inputMaterialsPpm) /
          100000);

    this.commonService.onNotifySharedDataChanged_originalVolume(
      String(originalVolume)
    );

    this.commonService.onNotifySharedDataChanged_waterVolume(
      String(waterVolume)
    );

    console.log('calculate');
  }
}
