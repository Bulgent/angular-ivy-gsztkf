import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CommonService } from '../service/common.service';

@Component({
  selector: 'inputMaterials',
  templateUrl: './inputMaterials.component.html',
  styleUrls: ['./inputMaterials.component.css'],
})
// implements  OnDestroy
export class InputMaterials {
  public inputMaterialsPpm: string = '';

  private subscription!: Subscription;

  constructor(private commonService: CommonService) {}

  onKey_inputMaterialsPpm(event: any) {
    // without type info
    this.inputMaterialsPpm = event.target.value;
    this.commonService.onNotifySharedDataChanged_inputMaterialsPpm(
      this.inputMaterialsPpm
    );
  }
}
