import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CommonService } from '../service/common.service';

@Component({
  selector: 'outputMaterials',
  templateUrl: './outputMaterials.component.html',
  styleUrls: ['./outputMaterials.component.css'],
})
export class OutputMaterials implements OnInit, OnDestroy {
  public originalMaterialsPpm: string = '';
  public outputMaterialsPpm: string = '';
  public outputMaterialsVolume = '';
  public waterVolume = '';
  public originalVolume = '';

  private subscription!: Subscription;

  constructor(private commonService: CommonService) {}

  ngOnInit() {
    // イベント登録
    // サービスで共有しているデータが更新されたら発火されるイベントをキャッチする
    this.subscription = this.commonService.waterVolume$.subscribe((msg) => {
      this.waterVolume = this.commonService.getValue_waterVolume();
      this.originalVolume = this.commonService.getValue_originalVolume();
    });

    this.subscription = this.commonService.inputMaterialsPpm$.subscribe(
      (msg) => {
        if (msg == '') {
          this.originalMaterialsPpm = '';
        } else {
          this.originalMaterialsPpm = '(' + msg + 'ppm)';
        }
      }
    );
  }

  ngOnDestroy() {
    //  リソースリーク防止のため CommonService から subcribe したオブジェクトを破棄する
    this.subscription.unsubscribe();
  }

  onKey_outputMaterialsPpm(event: any) {
    // without type info
    this.outputMaterialsPpm = event.target.value;
    this.commonService.onNotifySharedDataChanged_outputMaterialsPpm(
      this.outputMaterialsPpm
    );
  }

  onKey_outputMaterialsVolume(event: any) {
    // without type info
    this.outputMaterialsVolume = event.target.value;
    this.commonService.onNotifySharedDataChanged_outputMaterialsVolume(
      this.outputMaterialsVolume
    );
  }

  calculate() {
    let inputMaterialsPpm = this.commonService.getValue_inputMaterialsPpm();
    let outputMaterialsPpm = this.commonService.getValue_outputMaterialsPpm();
    let outputMaterialsVolume =
      this.commonService.getValue_outputMaterialsVolume();
    let waterVolume: Number;
    let originalVolume: Number;

    originalVolume =
      Math.floor(
        ((Number(outputMaterialsPpm) * 100000) / Number(inputMaterialsPpm)) *
          Number(outputMaterialsVolume)
      ) / 100000;

    waterVolume =
      Math.floor(
        Number(outputMaterialsVolume) *
          (100000 -
            (Number(outputMaterialsPpm) * 100000) / Number(inputMaterialsPpm))
      ) / 100000;

    this.commonService.onNotifySharedDataChanged_originalVolume(
      String(originalVolume)
    );

    this.commonService.onNotifySharedDataChanged_waterVolume(
      String(waterVolume)
    );

    console.log('calculate');
  }
}
